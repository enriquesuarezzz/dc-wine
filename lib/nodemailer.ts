import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider here
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or an app password
  },
})

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: string, // Add HTML parameter
): Promise<void> => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text, // Plain text email
      html, // HTML email
    })
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
