export function getActiveCommands(a, b, c) {
  let d = new Map();
  function e(a) {
    a.forEach((a, b) => {
      let c = d.get(b);
      if (c) {
        let e = c.every((a) => {
          return a.shouldStopPropagation === !1;
        });
        e && c.push(a);
      } else d.set(b, [a]);
    });
  }

  // eslint-disable-next-line no-self-assign
  a = a;
  while (a) {
    let f = a && a.getCommandMap();
    e(f);
    a = a && a.getParent();
  }
  b && e(b.getCommandMap());
  c && e(c.getCommandMap());
  return d;
}
