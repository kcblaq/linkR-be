export const env = {
    MONGODB_URI: process.env.MONGODB_URI || "",
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || "",
    SIB_API_KEY: process.env.SIB_API_KEY || "",
    SIB_SMTP_EMAIL: process.env.SIB_SMTP_EMAIL || "",
    SIB_SMTP_PASSWORD: process.env.SIB_SMTP_PASSWORD || "",
    SENDINBLUE_API_KEY: process.env.SENDINBLUE_API_KEY || "",

    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,

    SESSION_SECRET: process.env.SESSION_SECRET
}