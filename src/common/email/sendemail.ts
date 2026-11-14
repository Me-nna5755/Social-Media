
import nodemailer, { Mail } from "nodemailer";
import { env } from "../../config/env.service";


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.appEmail,
        pass: env.appPassword
    }
});

export const sendEmail = async  ({to,subject,html}:Mail.Options) =>{
    const info = await transporter.sendMail({
        from:`"Social Media App"<${env.appEmail}>`,
        to,
        subject,
        html
    })
    console.log("email send" ,info.messageId);
    
}