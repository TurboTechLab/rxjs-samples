import './style.css';

import { merge, map, fromEvent, startWith } from 'rxjs';


const start = fromEvent(document.getElementById('start'),'click')
              .pipe(map(v=>'start'));
const pause = fromEvent(document.getElementById('pause'),'click')
              .pipe(map(v=>'pause'));
const reset = fromEvent(document.getElementById('reset'),'click')
              .pipe(map(v=>'reset'));

const stopwatch = merge(start, pause, reset)
  .pipe(
    startWith('reset'),
    map((name) => `Hello, ${name}!`))
  .subscribe(console.log);

// Open the console in the bottom right to see results.
