export default function (context, inject) {
  let mapLoaded = !true
  let mapWaiting = null
  addScript()

  inject('maps', {
    showMap,
  })

  function addScript() {
    const script = document.createElement('script')
    script.src =
      'https:maps.googleapis.com/maps/api/js?key=AIzaSyCFIDdK19LZC_2PsiWOpEtgWdxx4Lhawoo&libraries=places&callback=initMap'
    script.async = true
    window.initMap = initMap
    document.head.appendChild(script)
  }

  function initMap() {
    mapLoaded = true

    if (mapWaiting) {
      const { canvas, lat, lng } = mapWaiting
      renderMap(canvas, lat, lng)
      mapWaiting = null
    }
  }

  function showMap(canvas, lat, lng) {
    mapLoaded
      ? renderMap(canvas, lat, lng)
      : (mapWaiting = { canvas, lat, lng })
  }

  const renderMap = (canvas, lat, lng) => {
    const mapOptions = {
      zoom: 18,
      disableDefaultUI: true,
      zoomcontrol: true,
      center: new window.google.maps.LatLng(lat, lng),
    }
    const map = new window.google.maps.Map(canvas, mapOptions)
    const position = new window.google.maps.LatLng(lat, lng)
    const marker = new window.google.maps.Marker({ position })
    marker.setMap(map)
  }
}
