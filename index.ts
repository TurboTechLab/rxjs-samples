import './style.css';
import { merge, switchMap, tap, of } from 'rxjs';
import { interval, EMPTY, startWith } from 'rxjs';
import { start, pause, reset } from './button-events';

const speed = 100;
let counterValue = 0;

const updateStopwatch = () => {
  document.getElementById('stopwatch').innerText = counterValue+'';
};

const stopwatch = merge(start, pause, reset)
  .pipe(
    startWith('reset'),
    tap((status) => console.log(status)),
    //Switch between multiple observables
    switchMap((status) => {
      if (status == 'reset') {
        counterValue = 0;
        return of(counterValue);
      } else if (status == 'pause') {
        return EMPTY;
      } else {
        return interval(speed).pipe(tap((v) => counterValue++));
      }
    }),
    tap((v) => updateStopwatch())
  )
  .subscribe();
