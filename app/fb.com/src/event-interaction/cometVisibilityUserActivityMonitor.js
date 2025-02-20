import { Visibility } from './visibility';

export const cometVisibilityUserActivityMonitor = {
  isUserActive: () => {
    return Visibility.visibility.isHidden() === false;
  },

  subscribe: (a) => {
    const b = Visibility.visibility.addListener(Visibility.visibility.HIDDEN, () => {
      return a && a(false);
    });
    const d = Visibility.visibility.addListener(Visibility.visibility.VISIBLE, () => {
      return a && a(true);
    });
    return function () {
      b && b.remove();
      d && d.remove();
    };
  },
};
