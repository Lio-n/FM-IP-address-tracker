/* IP Address -- Location -- Timezone -- Isp  */
const myMap = L.map("map").setView([0, 0], 1);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(myMap);

const getApiData = (input) => {
  let locationInfo = {};
  const API_KEY = "at_cSnqfEYbfF5Qq6yPKYjYrg5OKPbfk";
  const Dir = input == Number ? `ipAddress=${input}` : `domain=${input}`;
  fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&${Dir}`)
    .then((e) => {
      return e.json();
    })
    .then((e) => {
      locationInfo = {
        ip: e.ip,
        city: e.location.city,
        region: e.location.region,
        postalCode: e.location.postalCode,
        timezone: e.location.timezone,
        isp: e.isp, // Internet Service Provider
        lat: e.location.lat,
        lng: e.location.lng,
      };
      addElementsDom(locationInfo);
    });
};

const addElementsDom = (inputApi) => {
  const ipAddress = document.querySelector(".ipAddress__para");
  const location = document.querySelector(".location__para");
  const timezone = document.querySelector(".timezone__para");
  const isp = document.querySelector(".isp__para");

  ipAddress.textContent = inputApi.ip;
  location.textContent =
    inputApi.city +
    ", " +
    inputApi.region +
    (inputApi.postalCode ? ", " + inputApi.postalCode : "");
  console.log(inputApi.postalCode);
  timezone.textContent = "UTC " + inputApi.timezone;
  isp.textContent = inputApi.isp;

  myMap.flyTo([inputApi.lat, inputApi.lng], 15);
  L.marker([inputApi.lat, inputApi.lng]).addTo(myMap);
};

(function main() {
  const form = document.querySelector(".form");
  const input = form.querySelector(".form__input");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    getApiData(input.value);
    input.value = "";
  });
})();
