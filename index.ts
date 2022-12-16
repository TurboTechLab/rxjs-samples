import './style.css';
import { merge, switchMap, tap } from 'rxjs';
import { interval, EMPTY, startWith } from 'rxjs';
import { start, pause, reset } from './button-events'

const speed = 1000;
let counterValue = 0;

const updateStopwatch = () => {
  document.getElementById('stopwatch').innerText = counterValue + '';
};

const stopwatch = merge(start, pause, reset)
  .pipe(
    startWith('reset'),
    tap((status) => console.log(status)),
    
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
