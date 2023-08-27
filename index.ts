// Mode Change
enum MODE {
  Count, // StopWatch
  Watch,
}

// MODE
let appMode: MODE = MODE.Count;
// Spend Time from Start
let timeCount: number = 0;
// Status
let isRunning: boolean = false;
// ID
let timerID: number = 0;
let timerID2: number = 0;
// display
const elmCount: HTMLElement = document.querySelector("#count")!;
// Button to start
const elmStart: HTMLElement = document.querySelector("#start")!;
// button to reset
const elmReset: HTMLElement = document.querySelector("#reset")!;
// Date display
const elmDate: HTMLElement = document.querySelector("#date")!;

/**
 * Event Handler
 */

// Initialize APP
const onPageLoad = () => {
  // Erase date
  elmDate.style.visibility = "hidden";
  updateView();
};
// Start
const onStart = () => {
  if (appMode === MODE.Count) {
    // status stop
    if (isRunning === false) {
      startTimer(10);
    } else {
      stopTimer(timerID);
    }
  }
};
const onReset = () => {
  if (appMode === MODE.Count) {
    stopTimer(timerID);
    resetCount();
    updateView(timeCount);
  }
};

const onChangeMode = () => {
  changeMode();
  if (appMode === MODE.Count) {
    resetCount();
    updateView();
  } else if (appMode === MODE.Watch) {
    startTimer(1000);
    updateView();
  }
};

/**
 * Event Listener
 */
window.addEventListener("load", onPageLoad);
elmStart.addEventListener("click", onStart);
elmReset.addEventListener("click", onReset);
elmReset.addEventListener("dblclick", onChangeMode);

/**
 * Define function
 */
function updateView(timeCount: number = 0) {
  if (appMode === MODE.Count) {
    if (timeCount > 60 * 60 * 1000 - 1) {
      timeCount = 60 * 60 * 1000 - 1;
    }
    const mm: string = Math.floor(timeCount / 1000 / 60)
      .toString()
      .padStart(2, "0");
    const ss: string = (Math.floor(timeCount / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const ms: string = (timeCount % 1000)
      .toString()
      .padStart(3, "0")
      .slice(0, 2);
    const count: string = mm + ":" + ss + "<small>" + ms + "<small>";
    elmCount.innerHTML = count;
  } else if (appMode === MODE.Watch) {
    const now: Date = new Date();
    const year: string = now.getFullYear().toString();
    const month: string = (now.getMonth() + 1).toString().padStart(2, "0");
    const date: string = now.getDate().toString().padStart(2, "0");
    const dayOfWeek: string[] = [
      "SUN",
      "MON",
      "TUE",
      "WED",
      "THU",
      "FRI",
      "SAT",
    ];

    const day: string = dayOfWeek[now.getDay()];  //NOT getDATE!!
    const today: string =
      year + "." + month + "." + date + " <small>" + day + "</small>";
    elmDate.innerHTML = today;
    // Time
    const hh: string = now.getHours().toString().padStart(2, "0");
    const mm: string = now.getMinutes().toString().padStart(2, "0");
    const ss: string = now.getSeconds().toString().padStart(2, "0");
    const time: string = hh + ":" + mm + "<small>" + ss + "</small>";
    elmCount.innerHTML = time;
  }
}

// start StopWatch
function startTimer(interval: number = 1000) {
  if (appMode === MODE.Count) {
    timerID = setInterval(() => {
      timeCount += interval;
      updateView(timeCount);
    }, interval);
    isRunning = true;
  } else if (appMode === MODE.Watch) {
    timerID2 = setInterval(() => {
      updateView();
    }, interval);
  }
}

function stopTimer(timerID: number) {
  if (appMode === MODE.Count) {
    clearInterval(timerID);
    isRunning = false;
  } else if (appMode === MODE.Watch) {
    clearInterval(timerID);
    isRunning = false;
  }
}

function resetCount() {
  if (appMode === MODE.Count) {
    timeCount = 0;
  }
}

function changeMode() {
  if (appMode === MODE.Count) {
    appMode = MODE.Watch;
    elmDate.style.visibility = "visible";
  } else if (appMode === MODE.Watch) {
    appMode = MODE.Count;
    elmDate.style.visibility = "hidden";
  }
}
