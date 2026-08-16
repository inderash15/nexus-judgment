// src/lib/email.ts

export type EmailPayload = {
  to: string;
  subject: string;
  candidateName: string;
  ticketId: string;
  eventDate: string;
  eventName: string;
  eventTime: string;
  venue: string;
  department: string;
  className?: string;
  rank: number;
  score: number;
  percentage: number;
};

export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    const senderName = process.env.BREVO_SENDER_NAME || "NexusPro";
    
    // Test mode fallback
    if (process.env.EMAIL_MODE === "development" || !apiKey || apiKey.includes("your_brevo_api_key_here")) {
      console.log(`[EMAIL MOCK - DEVELOPMENT MODE] Sending email to: ${payload.to}`);
      console.log(`[EMAIL MOCK] Subject: ${payload.subject}`);
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, messageId: `mock_message_id_${Date.now()}` };
    }

    if (!senderEmail) {
      throw new Error("BREVO_SENDER_EMAIL is not configured.");
    }

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #111827; margin-bottom: 5px; font-size: 24px;">CONGRATULATIONS!</h2>
          <p style="color: #4b5563; font-size: 16px; margin: 0;">YOU HAVE BEEN SHORTLISTED</p>
        </div>
        
        <p style="color: #374151; font-size: 16px;">Hello <strong>${payload.candidateName}</strong>,</p>
        <p style="color: #374151; font-size: 16px;">Congratulations! You have been shortlisted for ${payload.eventName}.</p>
        <p style="color: #374151; font-size: 16px;">Your official entry ticket is ready.</p>
        
        <div style="background-color: #1f2937; color: #ffffff; padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0; border: 2px dashed #4b5563;">
          <h3 style="margin: 0 0 20px 0; font-size: 20px; letter-spacing: 2px; color: #e5e7eb;">SELECTION STATUS: SELECTED</h3>
          
          <div style="text-align: left; background-color: #374151; padding: 20px; border-radius: 8px;">
            <p style="margin: 0 0 10px 0; font-size: 18px;"><strong>Candidate:</strong> ${payload.candidateName}</p>
            <p style="margin: 0 0 10px 0; font-size: 16px; color: #9ca3af;"><strong>Department:</strong> <span style="color: #f3f4f6;">${payload.department}</span></p>
            ${payload.className ? `<p style="margin: 0 0 10px 0; font-size: 16px; color: #9ca3af;"><strong>Class:</strong> <span style="color: #f3f4f6;">${payload.className}</span></p>` : ''}
            <p style="margin: 0 0 10px 0; font-size: 16px; color: #9ca3af;"><strong>Rank:</strong> <span style="color: #f3f4f6;">#${payload.rank}</span></p>
            <p style="margin: 0 0 10px 0; font-size: 16px; color: #9ca3af;"><strong>Score:</strong> <span style="color: #f3f4f6;">${payload.score} / 25</span></p>
            <p style="margin: 0 0 10px 0; font-size: 16px; color: #9ca3af;"><strong>Percentage:</strong> <span style="color: #f3f4f6;">${payload.percentage.toFixed(1)}%</span></p>
            <hr style="border: 0; border-top: 1px solid #4b5563; margin: 15px 0;">
            <p style="margin: 0 0 10px 0; font-size: 16px; color: #9ca3af;"><strong>Ticket ID:</strong> <span style="color: #f3f4f6;">${payload.ticketId}</span></p>
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #9ca3af;"><strong>Date:</strong> ${payload.eventDate}</p>
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #9ca3af;"><strong>Time:</strong> ${payload.eventTime}</p>
            <p style="margin: 0; font-size: 14px; color: #9ca3af;"><strong>Venue:</strong> ${payload.venue}</p>
          </div>
        </div>
        
        <div style="margin-top: 30px;">
          <h3 style="color: #111827; font-size: 18px;">EVENT INSTRUCTIONS</h3>
          <p style="color: #374151; font-size: 16px;">Please arrive at least 15 minutes before the event time. Bring this ticket (digital or printed) for entry verification.</p>
        </div>
        
        <div style="margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">Regards,</p>
          <p style="color: #111827; font-size: 16px; font-weight: bold; margin: 5px 0 0 0;">${senderName} Team</p>
        </div>
      </div>
    `;

    const textContent = `
CONGRATULATIONS! YOU HAVE BEEN SHORTLISTED

Hello ${payload.candidateName},

Congratulations! You have been shortlisted for ${payload.eventName}.
Your official entry ticket is ready.

SELECTION STATUS: SELECTED
Candidate: ${payload.candidateName}
Department: ${payload.department}
${payload.className ? `Class: ${payload.className}` : ''}
Rank: #${payload.rank}
Score: ${payload.score} / 25
Percentage: ${payload.percentage.toFixed(1)}%

Ticket ID: ${payload.ticketId}
Date: ${payload.eventDate}
Time: ${payload.eventTime}
Venue: ${payload.venue}

EVENT INSTRUCTIONS
Please arrive at least 15 minutes before the event time. Bring this ticket (digital or printed) for entry verification.

Regards,
${senderName} Team
    `;

    const body: any = {
      sender: { name: senderName, email: senderEmail },
      to: [{ email: payload.to, name: payload.candidateName }],
      subject: payload.subject,
      htmlContent,
      textContent
    };

    if (process.env.BREVO_REPLY_TO_EMAIL) {
      body.replyTo = { email: process.env.BREVO_REPLY_TO_EMAIL, name: senderName };
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[BREVO EMAIL ERROR]", data);
      return { success: false, error: data.message || "Failed to send email" };
    }

    return { success: true, messageId: data.messageId };
  } catch (err: any) {
    console.error("[BREVO EMAIL EXCEPTION]", err.message);
    return { success: false, error: err.message };
  }
}

