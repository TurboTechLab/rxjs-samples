import { fromEvent, map } from 'rxjs';

export const start = fromEvent(document.getElementById('start'), 'click').pipe(
  map((v) => 'start')
);
export const pause = fromEvent(document.getElementById('pause'), 'click').pipe(
  map((v) => 'pause')
);
export const reset = fromEvent(document.getElementById('reset'), 'click').pipe(
  map((v) => 'reset')
);
