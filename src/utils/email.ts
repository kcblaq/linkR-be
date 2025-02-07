import dotenv from "dotenv";
import * as SibApiV3Sdk from '@sendinblue/client';

dotenv.config();

// Initialize the API instance
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Set your API key
const apiKey = process.env.BREVO_API_KEY;
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, apiKey as string);

export const sendEmail = async (
    to: string,
    templateId: number,
    params: Record<string, string | number>
) => {
    try {
        // Create a new SendSmtpEmail instance
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        // Set up the email data
        sendSmtpEmail.to = [{
            email: to,
        }];

        // Set template ID and parameters
        sendSmtpEmail.templateId = templateId;
        sendSmtpEmail.params = params;

        // Send the email
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        // console.log('Email sent successfully. Message ID:', data);
        return data;

    } catch (err) {
        console.error('Error sending email:', err);
        if (err instanceof Error) {
            throw new Error(`Failed to send email: ${err.message}`);
        } else {
            throw new Error('Failed to send email with an unknown error');
        }
    }
};

// const transporter = nodemailer.createTransport({
//     host: "smtp-relay.brevo.com",
//     port: 587,
//     secure: false,
//     auth: {
//         user: process.env.BREVO_USERNAME,
//         pass: process.env.BREVO_KEY,
//     },
// });

// export const sendEmail = async (
//     to: string,
//     templateId: number,
//     params: Record<string, string | number>
// ) => {
//     try {
//         await new Promise((resolve, reject) => {
//             transporter.verify((error, success) => {
//                 if (error) {
//                     console.log(`SMTP Connection Error: ${error}`);
//                     reject(error);
//                 } else {
//                     console.log("Server is ready to take messages");
//                     resolve(success);
//                 }
//             });
//         });

//         // Send email with Brevo template
//         const info = await transporter.sendMail({
//             from: '"LinkR Group" <kcblack22@gmail.com>',
//             to: to,
//             headers: {
//                 'X-Mailin-Tag': 'Welcome Email',  // Optional tag
//                 'X-Mailin-Template': templateId.toString()
//             },
//             // Don't set subject/html here - they come from template
//             templateId: templateId,
//             params: {
//                 ...params,
//                 // Any additional parameters your template needs
//             }
//         } as nodemailer.SendMailOptions);

//         console.log("Message sent: %s", info);
//         return info;
//     } catch (err) {
//         console.error(err);
//         if (err instanceof Error) {
//             throw new Error(`Failed to send email: ${err.message}`);
//         } else {
//             throw new Error('Failed to send email with an unknown error');
//         }
//     }
// };