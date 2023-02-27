const nodemailer = require("nodemailer");

const confirmationMail = (options) => {
  
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'anish.cubematchclaritaz@gmail.com',
      pass: 'bysshyczzahijleu',
    },
  });
  transporter.verify().then(console.log).catch(console.error);
  

  const mailOptions = {
    from: 'Cubematch- Claritaz',
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = confirmationMail;
