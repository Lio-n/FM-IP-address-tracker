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
  const ipAddressEl = document.querySelector(".ipAddress__para");
  const locationEl = document.querySelector(".location__para");
  const timezoneEl = document.querySelector(".timezone__para");
  const ispEl = document.querySelector(".isp__para");

  const { ip, city, region, postalCode, timezone, isp, lat, lng } = inputApi;

  ipAddressEl.textContent = ip;
  locationEl.textContent = `${city}, ${region}${
    postalCode ? ", " + postalCode : ""
  }`;
  timezoneEl.textContent = "UTC " + timezone;
  ispEl.textContent = isp;

  myMap.flyTo([lat, lng], 15);
  L.marker([lat, lng]).addTo(myMap);
};

(function main() {
  const formEl = document.querySelector(".form");
  const inputEl = formEl.querySelector(".form__input");

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    getApiData(inputEl.value);
    inputEl.value = "";
  });
})();
