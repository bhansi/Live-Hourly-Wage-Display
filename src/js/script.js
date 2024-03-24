let input_wage = document.getElementById("input-wage");
let input_currency = document.getElementById("input-currency");

let output_time = document.getElementById("output-time");
let output_usd = document.getElementById("output-usd");
let output_cad = document.getElementById("output-cad");

let btn_start = document.getElementById("btn-start");
let btn_pause = document.getElementById("btn-pause");
let btn_reset = document.getElementById("btn-reset");

let happy_cat = document.getElementById("happy-cat");

let interval;
let start_time;
let elapsed_time;
let paused_time = 0;

let wage_usd;
let wage_cad;
let earnings_usd;

let happy_cat_displayed_at = 0;
let happy_cat_displayed = false;

function startInterval() {
  start_time = new Date().getTime() - paused_time;
  interval = setInterval(updateInterval, 1);
}

function updateInterval() {
  updateOutputTime();
  updateOutputUSD();
  updateOutputCAD();
}

function stopInterval() {
  clearInterval(interval);
  paused_time = new Date().getTime() - start_time;
  interval = null;
}

function updateOutputTime() {
  let current_time = new Date().getTime();
  elapsed_time = current_time - start_time;

  let seconds = Math.floor(elapsed_time / 1000) % 60;
  let minutes = Math.floor(elapsed_time / 1000 / 60) % 60;
  let hours = Math.floor(elapsed_time / 1000 / 60 / 60);

  if(!happy_cat_displayed && minutes > happy_cat_displayed_at && minutes % 15 == 0) {
    displayHappyCat(minutes);
  }
  else if(happy_cat_displayed && seconds > 0 && seconds % 5 == 0) {
    hideHappyCat();
  }

  output_time.innerText = leadingZero(hours) + ":" + leadingZero(minutes) + ":" + leadingZero(seconds);
}

function updateOutputUSD() {
  earnings_usd = wage_usd * (elapsed_time / 1000 / 60 / 60);
  output_usd.innerText = "$" + (Math.round(earnings_usd * 100) / 100).toFixed(2);
}

function updateOutputCAD() {
  let earnings_cad = earnings_usd * parseFloat(input_currency.value);
  output_cad.innerText = "$" + (Math.round(earnings_cad * 100) / 100).toFixed(2);
}

function leadingZero(number) {
  return (number < 10 ? "0" : "") + number;
}

function displayHappyCat(time) {
  happy_cat_displayed = true;
  happy_cat_displayed_at = time;
  happy_cat.classList.remove("d-none");
}

function hideHappyCat() {
  happy_cat_displayed = false;
  happy_cat.classList.add("d-none");
}

function inputFieldHandler(e) {
  if((e.target === input_wage || e.target === input_currency) && (!e.target.value.isNaN)) {
    if(input_wage.value && input_currency.value) {
      btn_start.disabled = false;
    }
    else {
      btn_start.disabled = true;
    }
  }
}

function startButtonHandler() {
  btn_start.disabled = true;
  btn_pause.disabled = false;
  btn_reset.disabled = false;

  input_wage.disabled = true;
  input_currency.disabled = true;

  wage_usd = parseFloat(input_wage.value);
  wage_cad = parseFloat(input_currency.value) * wage_usd;

  startInterval();
}

function pauseButtonHandler() {
  btn_start.disabled = false;
  btn_pause.disabled = true;
  btn_reset.disabled = false;

  stopInterval();
}

function resetButtonHandler() {
  btn_start.disabled = true;
  btn_pause.disabled = true;
  btn_reset.disabled = true;

  input_wage.disabled = false;
  input_currency.disabled = false;

  input_wage.value = "";
  input_currency.value = "";

  happy_cat_displayed_at = 0;
  happy_cat_displayed = false;

  stopInterval();
  paused_time = 0;
}

input_wage.addEventListener("keyup", inputFieldHandler);
input_currency.addEventListener("keyup", inputFieldHandler);

btn_start.addEventListener("click", startButtonHandler);
btn_pause.addEventListener("click", pauseButtonHandler);
btn_reset.addEventListener("click", resetButtonHandler);
