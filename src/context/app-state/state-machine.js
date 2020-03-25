import { Machine, assign } from 'xstate';

const appStateMachine = Machine(
  {
    id: 'appStateMachine',
    initial: 'active',
    context: {
      becameInactiveAt: null,
      onWakeUp: [],
    },
    on: {
      ADD_REACTIVATE_FUNCTION: { actions: 'addOnWakeUpFn' },
      REMOVE_REACTIVATE_FUNCTION: { actions: 'removeOnWakeUpFn' },
    },
    states: {
      inactive: {
        on: {
          FOCUS: [
            {
              actions: ['onWakeUp'],
              cond: 'hasBeenInactiveForALongTime',
              target: 'active',
            },
            {
              target: 'active',
            },
          ],
        },
      },
      active: {
        entry: ['resetCurrentTime'],
        exit: ['setCurrentTime'],

        on: {
          BLUR: {
            target: 'inactive',
          },
        },
      },
    },
  },
  {
    actions: {
      onWakeUp: ({ onWakeUp }) => {
        onWakeUp.forEach(fn => fn());
      },
      addOnWakeUpFn: assign({
        onWakeUp: ({ onWakeUp }, { fn }) => {
          if (typeof fn !== 'function') {
            return onWakeUp;
          }

          return [...onWakeUp, fn];
        },
      }),
      removeOnWakeUpFn: assign({
        onWakeUp: ({ onWakeUp }, { fn }) => {
          return onWakeUp.filter(hook => hook !== fn);
        },
      }),
      resetCurrentTime: assign({ becameInactiveAt: null }),
      setCurrentTime: assign({ becameInactiveAt: Date.now }),
    },
    guards: {
      hasBeenInactiveForALongTime: ({ becameInactiveAt }) => {
        // Is true after being inactive for more than 5 minutes.
        return becameInactiveAt && Date.now() - becameInactiveAt > 300000;
      },
    },
  },
);

export default appStateMachine;
