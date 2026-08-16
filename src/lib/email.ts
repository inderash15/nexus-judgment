// src/lib/email.ts

/**
 * Minimal Email Provider Abstraction
 * In a real environment, this would integrate with Resend, SendGrid, etc.
 * using environment variables like process.env.EMAIL_API_KEY.
 */

export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if we have real credentials
    const apiKey = process.env.EMAIL_API_KEY;
    const provider = process.env.EMAIL_PROVIDER || "mock";
    
    if (provider === "mock" || !apiKey) {
      // Development / Mock mode
      console.log(`[EMAIL MOCK] Sending email to: ${payload.to}`);
      console.log(`[EMAIL MOCK] Subject: ${payload.subject}`);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate random failure 5% of the time to test error handling
      if (Math.random() < 0.05) {
        throw new Error("Mock SMTP connection timeout");
      }
      
      return { success: true };
    }

    // Real Provider (e.g. Resend)
    // const res = await fetch("https://api.resend.com/emails", { ... })
    // ...
    
    return { success: true };
  } catch (err: any) {
    console.error("[EMAIL ERROR]", err.message);
    return { success: false, error: err.message };
  }
}
