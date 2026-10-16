import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email, code) {
  try {
    await resend.emails.send({
      from: "TeamsApp <noreply@teamsapp.uk>",
      to: email,
      subject: "Your verification code",
      html: `
        <p>Your verification code is:</p>
        <h2 style="font-size: 24px; font-weight: bold;">${code}</h2>
        <p>This code expires in 10 minutes.</p>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error("EMAIL SEND ERROR:", err);
    return { success: false, error: err };
  }
}
