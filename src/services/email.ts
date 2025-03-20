import dotenv from "dotenv";
import * as SibApiV3Sdk from '@sendinblue/client';
import axios from 'axios';

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




export async function sendEmailWithTemplate(
	to: string,
	params: Record<string, any>,
	templateId: number
) {
	try {
		
        const response = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
                sender: { email: 'kcblack22@gmail.com' },
                to: [{ email: to }],
                templateId,
                params,
            },
            {
                headers: {
                    'accept': 'application/json',
                    'api-key': process.env.BREVO_API_KEY,
                    'content-type': 'application/json',
                }
            }
        )

		return { success: true, message: `Email sent` };
	} catch (error: any) {
		console.error("Error sending email:", error);
		return { success: false, error: error?.message };
	}
}




  