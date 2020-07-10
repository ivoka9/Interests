console.log("work");
console.log($(".table").length);
console.log($(".usertable").length);

// it removes any elements that are already in the user base
for (let i = 0; i < $(".usertable").length; i++) {
  for (let j = 0; j < $(".table").length; j++) {
    if ($(".usertable").eq(i).val() === $(".table").eq(j).val()) {
      const hide = $(".table").eq(j);
      const remove = hide.attr("id");

      $(".usertable").eq(i).attr("id", hide.attr("id"));
      $(`#${remove}`).remove();
    }
  }
}
// adds new elements to the user base
$(".table").on("click", (event) => {
  const remove = event.target.id;

  const value = $(`#${remove}`).val();
  const id = $(`#${remove}`).attr("id");

  $(`#${remove}`).remove();

  $("#userinterets").append(
    `<input class="usertable" onclick="usertable(this.id)" id="${id}" value="${value}"></input>`
  );
});

// removes elements from the user base and adds them to the main base
$(".usertable").on("click", (event) => {
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
function usertable(id) {
  const value = $(`#${id}`).val();

  $(`#${id}`).remove();

  $("#allintersts").append(
    `<input class="table" onclick='table(this.id)' id="${id}" value="${value}" />`
  );
}

function table(id) {
  const value = $(`#${id}`).val();

  $(`#${id}`).remove();

  $("#userinterets").append(
    `<input class="table" onclick='usertable(this.id)' id="${id}" value="${value}" />`
  );
}

// sends the data back to the server so we can create
// his new interests list/array

$("#save").on("click", () => {
  let arr = [];
  for (let i = 0; i < $(".usertable").length; i++) {
    arr.push($(".usertable").eq(i).attr("id"));
  }

  const options = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(arr),
  };
  fetch("/interests/api", options);
});
