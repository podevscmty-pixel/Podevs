import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Use the Service Role Key to bypass RLS securely on the backend
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    if (!supabaseServiceKey) {
      console.error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const { error } = await supabaseAdmin
      .from('messages')
      .insert([
        { name, email, subject, message }
      ]);

    if (error) {
      console.error("Error inserting message:", error);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    // Send email notification to the PODEVS team
    try {
      const gmailUser = process.env.GMAIL_USER;
      const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

      if (gmailUser && gmailAppPassword) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: gmailUser,
            pass: gmailAppPassword,
          },
        });

        await transporter.sendMail({
          from: `"PODEVS Contact Form" <${gmailUser}>`,
          to: gmailUser,
          replyTo: email,
          subject: `📩 New Contact: ${subject || 'General Inquiry'} — from ${name}`,
          html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 1px solid #222; border-radius: 12px; overflow: hidden;">
              <div style="background: linear-gradient(135deg, #ff8a00, #e67600); padding: 28px 32px;">
                <h1 style="color: #fff; margin: 0; font-size: 20px; font-weight: 700;">New Message from PODEVS.org</h1>
              </div>
              <div style="padding: 32px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; color: #888; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #222; width: 100px;">From</td>
                    <td style="padding: 12px 0; color: #fff; font-size: 15px; border-bottom: 1px solid #222;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; color: #888; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #222;">Email</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #222;"><a href="mailto:${email}" style="color: #ff8a00; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; color: #888; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #222;">Subject</td>
                    <td style="padding: 12px 0; color: #fff; font-size: 15px; border-bottom: 1px solid #222;">${subject || 'General Inquiry'}</td>
                  </tr>
                </table>
                <div style="margin-top: 24px;">
                  <p style="color: #888; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Message</p>
                  <div style="background: #111; border: 1px solid #222; border-radius: 8px; padding: 20px; color: #ddd; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</div>
                </div>
                <div style="margin-top: 28px; text-align: center;">
                  <a href="mailto:${email}?subject=Re: ${subject || 'Your inquiry to PODEVS'}" style="display: inline-block; background: #ff8a00; color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">Reply to ${name}</a>
                </div>
              </div>
              <div style="padding: 16px 32px; background: #050505; text-align: center;">
                <p style="color: #555; font-size: 12px; margin: 0;">This email was sent automatically from the PODEVS contact form.</p>
              </div>
            </div>
          `,
        });
      }
    } catch (emailErr) {
      // Don't fail the request if email fails — the message is already saved in DB
      console.warn("Email notification failed:", emailErr);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("API Route Error:", err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
