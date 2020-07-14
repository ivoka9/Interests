/// Maps button action
$("#galery-btn").css("outline", "none");
$("#maps-btn").css("outline", "none");

$("#galery-btn").on("click", () => {
  $("#map").css("left", "-100vw");
  $("#hero-box-button-active").css("left", "0px");

  setTimeout(() => {
    $("#container").css("display", "block");
  }, 100);
});

$("#maps-btn").on("click", () => {
  console.log("map");
  $("#map").css("left", "0");
  $("#hero-box-button-active").css("left", "110px");
  $("#galery-btn").prop("disabled", true);

  setTimeout(() => {
    $("#container").css("display", "none");
    $("#galery-btn").prop("disabled", false);
  }, 500);
});

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

    const yourlocation = L.marker([y, x]).addTo(mymap);
    yourlocation.bindPopup("<h3>You are Here</h3>").openPopup();
    const postx = $(".postX");
    const posty = $(".postY");
    const postTitle = $(".title");
    for (let i = 0; i < postx.length; i++) {
      let event = L.marker([posty.eq(i).val(), postx.eq(i).val()]).addTo(mymap);
      event.bindPopup(`<h3>${postTitle.eq(i).val()}</h3>`);
    }
  }
}
// else it removes the map
else {
  $("#map").remove();
}
