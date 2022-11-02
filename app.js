//*------------------Create map(Leaflet API)-----------------------
let map = L.map("map");
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const form = document.querySelector("form");
const input = form.querySelector("#ip-input");
const ip = document.querySelector("#ip");
const locationName = document.querySelector("#location");
const timezone = document.querySelector("#timezone");
const isp = document.querySelector("#isp");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  removeMarker();

  addData(input.value);

  event.target.reset();
});

//*-------------------Initial IP adress----------------------
import("https://api.ipify.org?format=jsonp&callback=getIP");

const getIP = (json) => {
  addData(json.ip);
};

//*------------------Get IP data (Ipify API)-----------------------
const getIpData = async (ip) => {
  const resp = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_s8zcxuIa4sQq9XDCBQJopRLMLdy9X&ipAddress=${ip}`
  );
  const data = await resp.json();
  return data;
};

const addData = async (initIp) => {
  const data = await getIpData(initIp);

  //*------------------Getting coordinates by IP-----------------------
  addMarker(data.location.lat, data.location.lng);
  map.setView([data.location.lat, data.location.lng], 13); //Centers map by coordinates

  //*------------------Main info by IP-----------------------
  ip.innerHTML = data.ip;
  isp.innerHTML = data.isp;
  locationName.innerHTML = `${data.location.city}, ${data.location.region}, ${data.location.geonameId}`;
  timezone.innerHTML = `UTC ${data.location.timezone}`;
};

const addMarker = (lat, lon) => {
  const marker = L.marker([lat, lon]).addTo(map);
};

const removeMarker = () => {
  const marker = document.querySelector(".leaflet-marker-icon");
  const markerShadow = document.querySelector(".leaflet-marker-shadow");

  if (marker) {
    marker.remove();
    markerShadow.remove();
  }
};
