//require dependecies
var express = require("express");
var nodemailer = require("nodemailer");
//var burger = require("../models/burger"); model will be here

var router = express.Router();

//route for getting index page
router.get("/", function (req, res) {
  res.render("index");
});

//route for getting portfolio page
router.get("/portfolio", function (req, res) {
  res.render("portfolio");
});

//route for getting contact page
router.get("/contact", function (req, res) {
  res.render("contact");
});

//routes for posting info from contact
router.post("/send", function (req, res) {
  const output = `
  <p>You have a new contact request</>
  <h3>Contact details</h3>
  <ul>
    <li>First name: ${req.body.fName}</li>
    <li>Last name: ${req.body.lName}</li>
    <li>Company name: ${req.body.company}</li>
    <li>Phone number: ${req.body.phone}</li>
    <li>Email address: ${req.body.email}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
  `;
  const autoEmail = `
  <h3>Contact request confirmation</h3>
  <p>Hey ${req.body.fName},</p>
  <p>Thank you for submitting your request. I will get back to you as sooner as possible through this email or your phone number: ${req.body.phone}. if your phone number has changed, please email me back with your new phone number.</p>
  <p>Thank you,</p>
  <p>Janvier Mbilizi</p>
  <p>Full stack software engineer</p>
  `;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    service: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "janviermbilizi@gmail.com", // generated ethereal user
      pass: "janixsto", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: '"Janvier Mbilizi" <janviermbilizi@gmail.com>', // sender address
    to: req.body.email, // list of receivers
    subject: "Confirmation", // Subject line
    html: autoEmail, // html body
  };

  let contactRequest = {
    from: '"Portfolio" <janviermbilizi@gmail.com>', // sender address
    to: "janviermbilizi@gmail.com", // list of receivers
    subject: "Contact request", // Subject line
    html: output, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.render("contact", {
      msg: "Contact request has been submitted!",
    });
  });
  //send an inform the team or me that someone request to be
  transporter.sendMail(contactRequest, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });

  console.log(req.body);
});

module.exports = router;
