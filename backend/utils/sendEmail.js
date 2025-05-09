import nodemailer from 'nodemailer'

export const sendEmail = async(options) => {
    const tranporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        }
    })
    const mailOptions = {
        from: '',
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await tranporter.sendMail(mailOptions);
}