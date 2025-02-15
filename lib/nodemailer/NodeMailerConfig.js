import nodemailer from 'nodemailer'
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
user:'sheikhahmed45670@gmail.com',
pass:'tsxz kygn pdck inld'
    }
})

export async function sendMail(to,subject,text){
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
    };

    return transporter.sendMail(mailOptions);
}

