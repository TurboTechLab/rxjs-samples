import './style.css';
import { merge, map, switchMap } from 'rxjs';
import { interval, EMPTY, fromEvent, startWith } from 'rxjs';

const start = fromEvent(document.getElementById('start'), 'click').pipe(
  map((v) => 'start')
);
const pause = fromEvent(document.getElementById('pause'), 'click').pipe(
  map((v) => 'pause')
);
const reset = fromEvent(document.getElementById('reset'), 'click').pipe(
  map((v) => 'reset')
);
const speed = 1000;
let counterValue = 0;

const stopwatch = merge(start, pause, reset)
  .pipe(
    startWith('reset'),
    switchMap((status) => {
      if (status == 'reset') {
        return EMPTY.pipe(startWith(0));
      }else  if (status == 'pause') {
          return EMPTY;
      } else {
        return interval(speed);
      }
    })
  )
  .subscribe(console.log);

// Open the console in the bottom right to see results.
