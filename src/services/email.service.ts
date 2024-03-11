import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';

export default class EmailService {
    static transporter: Transporter | null

    static wrapedSendMail(mailOptions: SendMailOptions) : Promise<{ success: boolean; error?: Error; result?: any }> {
        return new Promise((resolve, reject)=>{
            EmailService.transporter?.sendMail(mailOptions, (error, result) => {
                if (error) {
                    console.log(`Error is ${error}`);
                    
                    reject({ success: false, error });
                } 
                else {
                    resolve({ success: true, result });
                }
            });
       });
    }

    static async initialize() {
        if(EmailService.transporter != null) {
            return;
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            // host:'mail.itaxeasy.com',
            // port:465,
            // secure:false,
            auth: {
                user: process.env.OPT_EMAIL,
                pass: process.env.OTP_PASS
            },
            // tls: {
            //     // do not fail on invalid certs
            //     rejectUnauthorized: false
            // },
        });

        await transporter.verify();

        EmailService.transporter = transporter;
    }

    static async sendMail(recipient: string, subject: string, body: string) {
        try {
            await EmailService.initialize();

            const mailOptions = {
                from: `support@itaxeasy.com`,
                to: recipient,
                subject,
                text: body,
            };
            
            const { success, error } = await EmailService.wrapedSendMail(mailOptions);

            if(!success) {
                throw error;
            }
            
            return { success: true, message: 'Email sent' };
        } catch(e) {
            console.error(e);

            return { success: false, message: 'Could not send email.' };
        }
    }

}