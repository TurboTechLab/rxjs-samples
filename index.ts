import './style.css';
import { merge, switchMap, tap, of } from 'rxjs';
import { interval, EMPTY, startWith } from 'rxjs';
import { start, pause, reset } from './button-events';

const tickDuration = 1000;
let counterValue = 0;

const tickStopwatch = () => {
  counterValue++;
  document.getElementById('stopwatch').innerText = counterValue + '';
};
const resetStopwatch = () => {
  counterValue = 0;
  document.getElementById('stopwatch').innerText = counterValue + '';
};

const stopwatch = merge(start, pause, reset)
  .pipe(
    startWith('reset'),
    tap((status) => console.log(status)),
    //Switch between multiple observables
    switchMap((status) => {
      if (status == 'reset') {
        resetStopwatch();
        return EMPTY;
      } else if (status == 'pause') {
        return EMPTY;
      } else {
        return interval(tickDuration);
      }
    }),
    tap((v) => tickStopwatch())
  )
  .subscribe();
