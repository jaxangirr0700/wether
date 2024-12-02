document.addEventListener("DOMContentLoaded", () => {
  const darkMoon = document.querySelector(".dark-moon-button");
  const hourItem = document.querySelectorAll(".hours-box");
  const container = document.querySelector(".container");
  const blackWhite = document.querySelector(".black-white");
  const imgs = document.querySelectorAll("img");
  const darkHour = document.querySelectorAll(".d-hour");
  const gradus = document.querySelector(".gradus");

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
});
