// adds new elements to the user base
let counter = 0;
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
    arr.push($(".posttable").eq(i).attr("id"));
  }
  Title = $("#title");
  Descrpiton = $("#des");
  if (!flagCheck(Title, Descrpiton)) {
    element.preventDefault();

    return console.log("err");
  }
  Url = $("#url").val();
  data = {
    arr: arr,
    Title: Title.val(),
    Descrpiton: Descrpiton.val(),
    Url: Url,
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

flagCheck = (Title, Descrpiton) => {
  if (Title.val().length < 3 || Descrpiton.val().length < 3) return false;
  return true;
};
