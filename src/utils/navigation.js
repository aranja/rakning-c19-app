import { StackActions } from 'react-navigation';

export function resetStack(navitagion, routeName) {
  const resetActions = StackActions.reset({
    index: 0,
    actions: [StackActions.push({ routeName })],
  });

  navitagion.dispatch(resetActions);
}
