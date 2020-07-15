if (navigator.geolocation) {
  /// Using Maps to place the Post in a specific location
  navigator.geolocation.getCurrentPosition(locate);
  function locate(attr) {
    // getting your location
    let x = attr.coords.longitude;
    let y = attr.coords.latitude;

    // generating the map
    let mymap = L.map("map").setView([y, x], 13);
    L.tileLayer(
      `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`,
      {
        attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiaXZva2EiLCJhIjoiY2tjbHA4M2F2MGFlOTM0bTgyM3hyMHEyYyJ9.lqP4sj-NuMFUXAkZI125_w",
      }
    ).addTo(mymap);
    // adding the ' You are Here '

    let red = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const yourlocation = L.marker([y, x], { icon: red }).addTo(mymap);
    yourlocation.bindPopup("<h3>You are Here</h3>").openPopup();

    eventLocation = L.marker([$("#posty").val(), $("#postx").val()]).addTo(
      mymap
    );
    eventLocation.bindPopup("<h4>Event Location</h4>");
  }
}
// else it removes the map
else {
  $("#map").remove();
}
