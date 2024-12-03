document.addEventListener("DOMContentLoaded", () => {
  const darkMoon = document.querySelector(".dark-moon-button");
  const hourItem = document.querySelectorAll(".hours-box");
  const container = document.querySelector(".container");
  const blackWhite = document.querySelector(".black-white");
  const imgs = document.querySelectorAll("img");
  const darkHour = document.querySelectorAll(".d-hour");
  const gradus = document.querySelector(".gradus");
  const feels_gradus = document.querySelector(".feels-gradus");
  const senriceHour = document.querySelector(".senrice-hour");
  const senrsetHour = document.querySelector(".sunset-hour");
  const imgCounditon = document.querySelector(".sunny_img");
  const humidity = document.querySelector(".humidity");
  const wind_speed = document.querySelector(".wind-speed");
  const pressure = document.querySelector(".pressure");
  const uv = document.querySelector("uv");
  const form = document.querySelector("form");
  // const current_location = document.querySelector(".current-location");
  let footer_first_box = document.querySelector(".footer-first-box");

  darkMoon.addEventListener("click", () => {
    darkMoon.classList.toggle("light");
    blackWhite.classList.toggle("black-white-right");
    container.classList.toggle("moon");
    gradus.classList.toggle("gradus-moon");

    hourItem.forEach((e) => {
      e.classList.toggle("sunny-hour");
    });
    imgs.forEach((i) => {
      i.classList.toggle("box-shadow-dark");
    });
    darkHour.forEach((d) => {
      d.classList.toggle("dark-hour");
    });
  });

  const apiKey = "c5a9d37ed4574a83ae3110852240312";
  const baseURL = `http://api.weatherapi.com/v1`;

  async function choosingWeather(endPoint, q) {
    let response = await fetch(`${baseURL}/${endPoint}?key=${apiKey}&q=${q}`);
    let data = await response.json();
    console.log(data);
    gradus.textContent = `${data.current.temp_c}°C`;
    feels_gradus.textContent = data.current.feelslike_c;
    senriceHour.textContent = data.forecast.forecastday[0].astro.sunrise;
    senrsetHour.textContent = data.forecast.forecastday[0].astro.sunset;
    imgCounditon.src = `http:${data.current.condition.icon}`;
    humidity.textContent = data.current.humidity + "%";
    wind_speed.textContent = data.current.wind_kph;
    pressure.textContent = data.current.pressure_mb;
    uv.textContent = data.current.uv;
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let city = e.target[0].value;
    choosingWeather("forecast.json", city);
    forecastDays("forecast.json", city, 5);
    form.reset();
  });

  async function forecastDays(endPoint, q, days) {
    footer_first_box.innerHTML = "";
    let daysWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let response = await fetch(
      `${baseURL}/${endPoint}?key=${apiKey}&q=${q}&days=${days}`
    );
    let data = await response.json();
    data.forecast.forecastday.forEach((day) => {
      let date = new Date(day.date);
      let oneDay = document.createElement("div");
      oneDay.classList.add("days-item");
      oneDay.innerHTML = `
      <img src=${day.day.condition.icon} alt="icon" />
      <p class="days-degry">${day.day.mintemp_c}°C<p/>
      <p class="days-degry">${daysWeek[date.getDay() - 1]}, ${date.getDate()} ${
        months[date.getMonth()]
      }</p>
      `;

      footer_first_box.append(oneDay);
    });
    console.log(data.forecast.forecastday);
  }
  forecastDays("forecast.json", "London", 5);
});
