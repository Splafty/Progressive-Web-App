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

function showMap()
{

}

function shareReport()
{

}