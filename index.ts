import './style.css';
import { merge, map, switchMap, tap } from 'rxjs';
import { interval, EMPTY, fromEvent, startWith } from 'rxjs';

const speed = 1000;
let counterValue = 0;

const start = fromEvent(document.getElementById('start'), 'click').pipe(
  map((v) => 'start')
);
const pause = fromEvent(document.getElementById('pause'), 'click').pipe(
  map((v) => 'pause')
);
const reset = fromEvent(document.getElementById('reset'), 'click').pipe(
  map((v) => 'reset')
);
const updateStopwatch = () => {
  document.getElementById('stopwatch').innerText = counterValue + '';
};

const stopwatch = merge(start, pause, reset)
  .pipe(
    startWith('reset'),
    tap((status) => console.log),
    switchMap((status) => {
      if (status == 'reset') {
        counterValue = 0;
        return EMPTY.pipe(startWith(counterValue));
      } else if (status == 'pause') {
        return EMPTY;
      } else {
        return interval(speed).pipe(tap((v) => counterValue++));
      }
    }),
    tap((v) => updateStopwatch())
  ).subscribe();

// Open the console in the bottom right to see results.
