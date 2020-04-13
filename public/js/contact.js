var submitBotton = $("#submit");
var form = $("#contactForm");

$.ajax({
  url: "https://janvier-mbilizi.herokuapp.com/",
  type: "POST",
  headers: { Accept: "application/json;" },
  data: {
    subject: "subject",
    message: "some body text",
  },
}).done(function (res) {
  console.log(res); // it shows your email sent message.
});

submitBotton.on("submit", function () {
  form.reset();
});
