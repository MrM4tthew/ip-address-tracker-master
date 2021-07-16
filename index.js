L.mapbox.accessToken = 'pk.eyJ1IjoibWF0dGhld2Jlbm5ldHQiLCJhIjoiY2tyNjAweHppMDEzMzJvbmk1b2ZpajE0eiJ9.7sXQRU5CbWw6vragnwDsIg'
var mapboxTiles = L.tileLayer(`https://api.mapbox.com/styles/v1/matthewbennett/ckr605j1x1xsr17qfmf8nhn9b/tiles/256/{z}/{x}/{y}@2x?access_token=${L.mapbox.accessToken}`, {
    attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    tileSize: 512,
    zoomOffset: -1
});

var blackIcon = L.icon({
    iconUrl: './images/icon-location.svg',
});



const mymap = L.map('mapid').addLayer(mapboxTiles).setView([51.505, -0.09], 13);
const marker = L.marker([51.505, -0.09], { icon: blackIcon }).addTo(mymap);

const inputIp = document.getElementById('inputIp')
const btn = document.getElementById('btn')

const ipAddress = document.getElementById('ipAddress')
const place = document.getElementById('location')
const timezone = document.getElementById('timezone')
const isp = document.getElementById('isp')

async function getIpResult() {


    const getIp = inputIp.value;
    const dataPromise = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_PubNNnUuyUdRzdCJGHO3dlAD2764k&ipAddress=${getIp}`)

    console.log(getIp)

    const data = await dataPromise.json()

    ipAddress.innerText = `${getIp}`
    place.innerText = `${data.location.city} ${data.location.postalCode}`
    timezone.innerText = `${data.location.timezone}`
    isp.innerText = `${data.isp}`

    marker.setLatLng([data.location.lat, data.location.lng])

    mymap.panTo(new L.LatLng(data.location.lat, data.location.lng));

}

btn.addEventListener("click", (e) => {
    e.preventDefault()
    getIpResult()
})

function handleError(err) {
    console.log("Error");
    console.log(err);
}