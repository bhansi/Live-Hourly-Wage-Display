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

input_wage.addEventListener("change", () => {
  if(input_wage.value && input_currency.value) {
    btn_play.disabled = false;
  }
  else {
    btn_play.disabled = true;
  }
});

input_currency.addEventListener("change", () => {
  if(input_wage.value && input_currency.value) {
    btn_play.disabled = false;
  }
  else {
    btn_play.disabled = true;
  }
});

btn_play.addEventListener("click", () => {
  btn_play.disabled = true;
  btn_pause.disabled = false;
  btn_stop.disabled = false;

  inputgroup_wage.classList.add("d-none");
  inputgroup_currency.classList.add("d-none");

  output_time.classList.remove("d-none");
  output_usd.classList.remove("d-none");
  output_cad.classList.remove("d-none");

  let wage_usd = parseFloat(input_wage.value);
  let wage_cad = parseFloat(input_currency.value) * wage_usd;

  let start_time = new Date().getTime();
  let counter = 0;

  interval = setInterval(
    () => {
      var current_time = new Date().getTime();
      var elapsed_time = current_time - start_time;
      console.log(Math.floor(elapsed_time / 1000));
      var seconds = Math.floor(elapsed_time / 1000) % 60;
      var minutes = Math.floor(elapsed_time / 1000 / 60) % 60;
      var hours = Math.floor(elapsed_time / 1000 / 60 / 60);
      output_time.innerText = leadingZero(hours) + ":" + leadingZero(minutes) + ":" + leadingZero(seconds);
    },
    1000
  );
});

function leadingZero(number) {
  return (number < 10 ? "0" : "") + number;
}
