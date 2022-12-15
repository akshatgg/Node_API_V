

var nodemailer = require('nodemailer');
class EmailController {
    sendEmail = async (req, res, next) => {
console.log(req.body);

        var transporter = nodemailer.createTransport({
            // service: 'cruxtech.in',
            host:'webmail.itaxeasy.com',
            port:465,
            // secure:false,
            auth: {
              user: 'support@itaxeasy.com',
              pass: "Sonali@1996"
            },
            tls: {
              // do not fail on invalid certs
              rejectUnauthorized: false
          },
          });
          var mailOptions = {
            from: 'support@itaxeasy.com',
            // to: req.body.email,
            to: "vineetkaimau@gmail.com",
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