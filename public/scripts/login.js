$("#login-btn").on("click", () => {
  $("#login").css("left", "50px");
  $("#register").css("left", "450px");
  $("#hero-box-button-active").css("left", "0px");
});

$("#register-btn").on("click", () => {
  $("#login").css("left", "-400px");
  $("#register").css("left", "50px");
  $("#hero-box-button-active").css("left", "110px");
});
