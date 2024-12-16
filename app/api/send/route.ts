import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_6FHQ1PNq_JNzXrmuNGJQCfZ9CYvGJ2jCt');

console.log("API Route Loaded: /api/send"); // Log when the file is loaded

export async function GET() {
  // console.log("Request method:", req.method); // Log request method
  // console.log("Headers:", req.headers); // Log headers

  try {
    // const body = await req.json();
    // console.log("Request body:", body); // Log the incoming body
    
    // const { email } = body;

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@dev.sledgehammerdevelopmentteam.uk>',
      to: ['yassermagelna@gmail.com'],
      subject: 'Hello world',
      text: 'This is a POST request test',
    });

    if (error) {
      console.error("Error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({ message: "Email sent successfully", data });

  } catch (error) {
    console.error("Caught exception:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
