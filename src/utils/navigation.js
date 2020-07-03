import { StackActions } from 'react-navigation';

export function resetStack(navitagion, routeName, params = {}) {
  const resetActions = StackActions.reset({
    index: 0,
    actions: [StackActions.push({ routeName, params })],
  });

  navitagion.dispatch(resetActions);
}
