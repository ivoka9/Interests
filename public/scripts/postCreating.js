// adds new elements to the user base
let counter = 0;
let eventLocation = L.marker([0, 0]);

$(".table").on("click", (event) => {
  console.log(counter);
  if (counter + 1 < 7) {
    counter++;

    const remove = event.target.id;

    const value = $(`#${remove}`).val();
    const id = $(`#${remove}`).attr("id");

    $(`#${remove}`).remove();

    $("#postinterests").append(
      `<input class="posttable btn btn-info rounded btn-interest" onclick="posttable(this.id)" id="${id}" value="${value}"></input>`
    );
  }
});

// removes elements from the user base and adds them to the main base
$(".posttable").on("click", (event) => {
  counter--;
  const remove = event.target.id;

  const value = $(`#${remove}`).val();
  const id = $(`#${remove}`).attr("id");

  $(`#${remove}`).remove();

  $("#allintersts").append(
    `<input class="table" onclick='table(this.id)' id="${id}" value="${value}" />`
  );
});

// those do the same as the upper two functions  , just with the onclick
// event instead of using the Jquery selector
function posttable(id) {
  counter--;
  const value = $(`#${id}`).val();

  $(`#${id}`).remove();

  $("#allintersts").append(
    `<input class="table " onclick='table(this.id)' id="${id}" value="${value}" />`
  );
}

function table(id) {
  if (counter + 1 < 7) {
    counter++;
    const value = $(`#${id}`).val();

    $(`#${id}`).remove();

    $("#postinterests").append(
      `<input class="posttable btn btn-info rounded btn-interest " onclick='posttable(this.id)' id="${id}" value="${value}" />`
    );
  }
}

// search box function

$("#search").on("keyup", () => {
  const value = $("#search").val();
  for (let i = 0; i < $(".table").length; i++) {
    const box = $(".table").eq(i).val();
    console.log(box.indexOf(value));
    if (box.indexOf(value) != 0) {
      $(".table").eq(i).css("display", "none");
    } else {
      $(".table").eq(i).css("display", "block");
    }
  }
});

// live input
$("#title").on("keyup", () => {
  $("#title-live").text($("#title").val());
});

$("#url").on("keyup", () => {
  $("#img-live").attr("src", $("#url").val());
});

$("#des").on("keyup", () => {
  $("#des-live").text($("#des").val());
});

// sends the data back to the server so we can create
// his new interests list/array

$("#create").on("click", async (element) => {
  let arr = [];
  for (let i = 0; i < $(".posttable").length; i++) {
    arr.push($(".posttable").eq(i).val());
  }
  Title = $("#title");
  Descrpiton = $("#des");
  if (!flagCheck(Title, Descrpiton, arr)) {
    element.preventDefault();

    return console.log("err");
  }
  Url = $("#url").val();
  data = {
    arr: arr,
    Title: Title.val(),
    Descrpiton: Descrpiton.val(),
    Url: Url,
    postX: $("#postx").val(),
    postY: $("#posty").val(),
  };
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  };
  await fetch("/post/create", options);
});

flagCheck = (Title, Descrpiton, arr) => {
  $("#des").css("border", "1px solid black");
  $("#title").css("border", "1px solid black");
  $("#control").css("border", "none");
  $("#interestflag").children("h6").remove();

  let flag = false;
  if (Title.val().length < 3) {
    $("#title").css("border", "1px solid red");

    $("#title").attr(
      "placeholder",
      "Enter a Title (must be more then 2 letters)"
    );
    flag = true;
  }
  if (Descrpiton.val().length < 3) {
    $("#des").css("border", "1px solid red");

    $("#des").attr(
      "placeholder",
      "Enter a Descrpiton (must be more then 2 letters)"
    );
    flag = true;
  }
  if (arr.length == 0) {
    $("#control").css("border", "1px solid red");
    $("#interestflag").append(
      "<h6 id='removeMe'> please add some interests so other users can see it</h6>"
    );
    $("#removeMe").css("font-weight", "normal");
    $("#removeMe").css("color", "red");

    flag = true;
  }
  if (flag) return false;

  return true;
};

// check to see if the user has geolocation
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
    yourlocation.bindPopup("<h5>You are Here</h5>").openPopup();

    // adding the event location
    function onMapClick(e) {
      let courdinates = e.latlng;

      eventLocation.remove();
      eventLocation = L.marker([courdinates.lat, courdinates.lng]).addTo(mymap);
      eventLocation.bindPopup("<h5>Event Location</h5>").openPopup();

      //appends it to the hidden inputs
      $("#postx").val(courdinates.lng);
      $("#posty").val(courdinates.lat);
    }

    mymap.on("click", onMapClick);
  }
}
// else it removes the map and the text
else {
  console.log("else");
  $("#map").remove();
  $("#maptext").remove();
}
