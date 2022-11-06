

var nodemailer = require('nodemailer');
class EmailController {
    sendEmail = async (req, res, next) => {
console.log(req.body);

        var transporter = nodemailer.createTransport({
            // service: 'cruxtech.in',
            host:'smtp-mail.outlook.com',
            port:587,
            // secure:false,
            auth: {
              user: 'itaxeasy@hotmail.com',
              pass: process.env.OUTLOOK_PASSWORD
            }
          });
          var mailOptions = {
            from: 'itaxeasy@hotmail.com',
            to: req.body.email,
            subject: req.body.subject,
            text: req.body.text
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.status(500).json({
                    status: "error",
                    message: "email not sent",
                    error:error
                })
            } else {
              console.log('Email sent: ' + info.response);
              res.status(200).json({
                status: "success",
                message: "email sent",
                info:info
            })
            }
          });
    }

}

module.exports = new EmailController();