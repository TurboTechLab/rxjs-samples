import './style.css';
import { merge, switchMap, tap } from 'rxjs';
import { interval, EMPTY, startWith } from 'rxjs';
import { start, pause, reset } from './button-events';

let  tickerValue = 0;
const tickDuration = 1000;

const tickStopwatch = () => {
  tickerValue++;
  document.getElementById('stopwatch').innerText = tickerValue + '';
};
const resetStopwatch = () => {
  tickerValue = 0;
  document.getElementById('stopwatch').innerText = tickerValue + '';
};

const stopwatch = merge(start, pause, reset)
  .pipe(
    startWith('reset'),
    tap((status) => {
      console.log(status);
      if(status == 'reset'){ resetStopwatch();}
    }),

    //Switch between multiple observables
    switchMap((status) => 
      (status == 'start')? interval(tickDuration) : EMPTY      
    ),

    tap((tick) => tickStopwatch())
  )
  .subscribe();
