let lat, lng, imageData;

async function initCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.getElementById('video');
    video.srcObject = stream;
 
    document.getElementById('cameraStatus').textContent = "Status: kamera aktywna";
 
  } catch (err) {
    console.error('Camera error:', err);
  }
}
 
window.addEventListener('load', initCamera);

async function capturePhoto() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  const video = document.getElementById('video');
  video.srcObject = stream;
 
  setTimeout(() => {
    const canvas = document.getElementById('canvas');
    const photo = document.getElementById('photo');
 
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
 
    imageData = canvas.toDataURL('image/png');
    photo.src = imageData;
 
    stream.getTracks().forEach(track => track.stop());
 
    getLocation();
  }, 2000);
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

