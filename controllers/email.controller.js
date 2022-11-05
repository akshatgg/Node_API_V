

var nodemailer = require('nodemailer');
class EmailController {
    sendEmail = async (req, res, next) => {


        var transporter = nodemailer.createTransport({
            // service: 'cruxtech.in',
            host:'smtp-mail.outlook.com',
            // port:587,
            // secure:false,
            auth: {
              user: 'itaxeasy@hotmail.com',
              pass: 'sonali@231096@'
            }
          });
          var mailOptions = {
            from: 'mycrux11@gmail.com',
            to: "vineetkaimau@gmail.com",
            subject: "data.subject",
            text: "data.msg"
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.status(500).json({
                    status: "error",
                    message: "email not sent",
                })
            } else {
              console.log('Email sent: ' + info.response);
              res.status(200).json({
                status: "success",
                message: "email sent",
            })
            }
          });
    }

}

module.exports = new EmailController();