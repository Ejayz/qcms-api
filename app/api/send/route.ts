import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_6FHQ1PNq_JNzXrmuNGJQCfZ9CYvGJ2jCt');

console.log("API Route Loaded: /api/send");

export async function POST(req: NextRequest) {
  console.log("Request method:", req.method);
  console.log("Headers:", req.headers);
  
  try {
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const body = await req.json();
    console.log("Request body:", body);

    // Validate email
    if (!body.email) {
      console.error("Missing email field in request body");
      return NextResponse.json(
        { error: "Missing 'email' in request body" },
        { status: 400 }
      );
    }

    const { email } = body;

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@dev.sledgehammerdevelopmentteam.uk>',
      to: [email],
      subject: 'Verify Your Email Address',
      text: `Your verification code is: ${verificationCode}`,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({ message: "Email sent successfully", data });

  } catch (error) {
    console.error("Caught exception:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
}
