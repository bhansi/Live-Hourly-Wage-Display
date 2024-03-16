let input_wage = document.getElementById("input-wage");
let input_currency = document.getElementById("input-currency");

let inputgroup_wage = document.getElementById("inputgroup-wage");
let inputgroup_currency = document.getElementById("inputgroup-currency");

let output_time = document.getElementById("output-time");
let output_usd = document.getElementById("output-usd");
let output_cad = document.getElementById("output-cad");

let btn_stop = document.getElementById("btn-stop");
let btn_pause = document.getElementById("btn-pause");
let btn_play = document.getElementById("btn-play");

let interval;
let start_time;
let elapsed_time;

let wage_usd;
let wage_cad;
let earnings_usd;

function startInterval() {
  start_time = new Date().getTime();
  interval = setInterval(updateInterval, 1);
}

function updateInterval() {
  updateOutputTime();
  updateOutputUSD();
  updateOutputCAD();
}

function updateOutputTime() {
  let current_time = new Date().getTime();
  elapsed_time = current_time - start_time;

  let milliseconds = elapsed_time % 1000;
  let seconds = Math.floor(elapsed_time / 1000) % 60;
  let minutes = Math.floor(elapsed_time / 1000 / 60) % 60;
  let hours = Math.floor(elapsed_time / 1000 / 60 / 60);

  output_time.innerText = leadingZero(hours) + ":" + leadingZero(minutes) + ":" + leadingZero(seconds) + "." + leadingZeros(milliseconds);
}

function updateOutputUSD() {
  earnings_usd = wage_usd * (elapsed_time / 1000 / 60 / 60);
  output_usd.innerText = "USD: $" + (Math.round(earnings_usd * 100) / 100).toFixed(2);
}

function updateOutputCAD() {
  let earnings_cad = earnings_usd * parseFloat(input_currency.value);
  output_cad.innerText = "CAD: $" + (Math.round(earnings_cad * 100) / 100).toFixed(2);
}

function leadingZero(number) {
  return (number < 10 ? "0" : "") + number;
}

function leadingZeros(number) {
  return (number < 10 ? "00" : number < 100 ? "0" : "") + number;
}

function inputFieldHandler() {
  if(input_wage.value && input_currency.value) {
    btn_play.disabled = false;
  }
  else {
    btn_play.disabled = true;
  }
}

function playButtonHandler() {
  btn_play.disabled = true;
  btn_pause.disabled = false;
  btn_stop.disabled = false;

  inputgroup_wage.classList.add("d-none");
  inputgroup_currency.classList.add("d-none");

  output_time.classList.remove("d-none");
  output_usd.classList.remove("d-none");
  output_cad.classList.remove("d-none");

  wage_usd = parseFloat(input_wage.value);
  wage_cad = parseFloat(input_currency.value) * wage_usd;

  startInterval();
}

input_wage.addEventListener("change", inputFieldHandler);
input_currency.addEventListener("change", inputFieldHandler);

btn_play.addEventListener("click", playButtonHandler);
