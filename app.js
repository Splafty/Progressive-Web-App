let lat, lng;

async function initCamera()
{

}

async function capturePhoto()
{

}

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      lat = position.coords.latitude;
      lng = position.coords.longitude;

      document.getElementById('lat').textContent = lat.toFixed(6);
      document.getElementById('lng').textContent = lng.toFixed(6);
      document.getElementById('gpsStatus').textContent = "Status: lokalizacja pobrana";

      showMap();
    },
    (err) => {
      document.getElementById('gpsStatus').textContent = "Błąd GPS";
      console.error(err);
    }
  );
}

function showMap() {
  const map = L.map('map').setView([lat, lng], 13);
 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
 
  L.marker([lat, lng]).addTo(map)
    .bindPopup('Miejsce zgłoszenia')
    .openPopup();
}

 
 
function shareReport() {
  if (navigator.share) {
    navigator.share({
      title: 'Zgłoszenie miejskie',
      text: `Problem w lokalizacji: ${lat}, ${lng}`,
      url: location.href
    });
  } else {
    alert('Web Share API nieobsługiwane');
  }
}

