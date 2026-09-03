import { createServerFn } from "@tanstack/react-start";

export const sendEnquiryFn = createServerFn({ method: "POST" })
  .validator((data: { name: string; email: string; phone?: string; interest: string; message: string }) => data)
  .handler(async ({ data }) => {
    try {
      console.log("Checking API Key exists:", !!process.env.RESEND_API_KEY, "Value starts with:", process.env.RESEND_API_KEY?.substring(0, 3));

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "ETEMAAD100 Website <onboarding@resend.dev>",
          to: "laraibrafique090@gmail.com",
          subject: `New Inquiry: ${data.interest} from ${data.name}`,
          html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #060C14; border: 1px solid #1a2235; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
          
          <tr>
            <td align="center" style="padding: 40px 20px 30px; border-bottom: 1px solid #1a2235;">
              <img src="https://eetemaad100group.vercel.app/logo.png" alt="ETEMAAD100 Group" width="80" style="display: block; max-width: 80px; border: 0;" />
              <h1 style="color: #A4F4FD; font-size: 22px; font-weight: 400; margin: 20px 0 0; text-transform: uppercase; letter-spacing: 2px;">New Inquiry Received</h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 30px 40px 40px;">
              <p style="color: #94a3b8; font-size: 15px; margin-top: 0; margin-bottom: 30px; text-align: center;">You have received a new message from the ETEMAAD100 Group website.</p>
              
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0A1128; border: 1px solid #1e293b; border-radius: 8px; padding: 25px;">
                
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 1px solid #1e293b;">
                    <p style="margin: 0 0 5px 0; color: #A4F4FD; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Name</p>
                    <p style="margin: 0; color: #ffffff; font-size: 16px;">${data.name}</p>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 20px 0; border-bottom: 1px solid #1e293b;">
                    <p style="margin: 0 0 5px 0; color: #A4F4FD; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Email</p>
                    <p style="margin: 0; font-size: 16px;"><a href="mailto:${data.email}" style="color: #e2e8f0; text-decoration: none;">${data.email}</a></p>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 20px 0; border-bottom: 1px solid #1e293b;">
                    <p style="margin: 0 0 5px 0; color: #A4F4FD; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Phone</p>
                    <p style="margin: 0; font-size: 16px;"><a href="tel:${data.phone}" style="color: #e2e8f0; text-decoration: none;">${data.phone || 'N/A'}</a></p>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 20px 0; border-bottom: 1px solid #1e293b;">
                    <p style="margin: 0 0 5px 0; color: #A4F4FD; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Interest</p>
                    <p style="margin: 0; color: #ffffff; font-size: 16px;">${data.interest}</p>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding-top: 20px;">
                    <p style="margin: 0 0 8px 0; color: #A4F4FD; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                    <p style="margin: 0; color: #cbd5e1; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.message ? data.message.replace(/\n/g, '<br>') : 'No message provided.'}</p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 30px; background-color: #020617; border-top: 1px solid #1a2235;">
              
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
                <tr>
                  <td align="center" style="font-size: 14px;">
                    <a href="https://eetemaad100group.vercel.app/" style="color: #A4F4FD; text-decoration: none; font-weight: bold; letter-spacing: 0.5px;">Visit Website</a>
                    <span style="color: #475569; margin: 0 10px;">|</span>
                    <a href="https://wa.me/923219876910" style="color: #A4F4FD; text-decoration: none; font-weight: bold; letter-spacing: 0.5px;">WhatsApp</a>
                    <span style="color: #475569; margin: 0 10px;">|</span>
                    <a href="tel:03219876910" style="color: #A4F4FD; text-decoration: none; font-weight: bold; letter-spacing: 0.5px;">0321 9876910</a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; color: #475569; font-size: 12px;">This is an automated notification from the ETEMAAD100 Group website.</p>
              <p style="margin: 8px 0 0; color: #475569; font-size: 12px;">&copy; ${new Date().getFullYear()} ETEMAAD100 Group. All Rights Reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
          `,
        }),
      });

      if (res.ok) {
        return { success: true };
      } else {
        const error = await res.text();
        console.error("Resend API error:", error);
        return { success: false, error: "Failed to send email" };
      }
    } catch (error) {
      console.error("Error sending email:", error);
      return { success: false, error: "Internal server error" };
    }
  });