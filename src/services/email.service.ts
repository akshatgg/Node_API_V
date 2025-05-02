import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';

export default class EmailService {
    static transporter: Transporter | null;

    static wrapedSendMail(mailOptions: SendMailOptions): Promise<{ success: boolean; error?: Error; result?: any }> {
        return new Promise((resolve, reject) => {
            EmailService.transporter?.sendMail(mailOptions, (error, result) => {
                if (error) {
                    console.error(`Email sending error: ${error}`);
                    reject({ success: false, error });
                } else {
                    resolve({ success: true, result });
                }
            });
        });
    }

    static async initialize() {
        if (EmailService.transporter != null) {
            return;
        }

        const user = process.env.OPT_EMAIL;
        const pass = process.env.OTP_PASS;

        if (!user || !pass) {
            throw new Error('Missing email credentials');
        }

        const transporter = nodemailer.createTransport({
            host: 'smtpout.secureserver.net',
            port: 465,
            secure: true,
            auth: {
                user,
                pass,
            },
        });

        try {
            await transporter.verify();
            console.log("Transporter verified successfully");
        } catch (err) {
            console.error("Transporter verification failed", err);
            throw err;
        }

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

            if (!success) throw error;

            return { success: true, message: 'Email sent' };
        } catch (e) {
            console.error('Email sending failed:', e);
            return { success: false, message: 'Could not send email.' };
        }
    }
}
