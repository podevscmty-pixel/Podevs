import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 1. Save to Supabase
    const { error: supabaseError } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }]);

    if (supabaseError && supabaseError.code !== '23505') {
      console.error('Supabase error:', supabaseError);
      return NextResponse.json({ error: 'Failed to save subscriber' }, { status: 500 });
    }

    // 2. Send Welcome Email via Resend
    // NOTE: On free tier, you can only send to yourself unless you verify your domain.
    // If domain isn't verified, this might fail for external emails.
    const { data, error: resendError } = await resend.emails.send({
      from: 'PODEVS <onboarding@resend.dev>', // Change to your verified domain later
      to: [email],
      subject: 'Welcome to the PODEVS Community! 🚀',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #ff8a00;">Welcome to PODEVS!</h2>
          <p>Hi there,</p>
          <p>Thanks for joining the PODEVS community. We're excited to have you on board!</p>
          <p>Every week, we'll send you curated resources, community updates, and technical insights to help you grow as a developer.</p>
          <div style="margin: 30px 0; padding: 20px; background: #fff8f0; border-radius: 8px; border-left: 4px solid #ff8a00;">
            <strong>What's Next?</strong><br/>
            Check out our latest workshops and events to start building your portfolio today.
          </div>
          <p>If you have any questions, just reply to this email. We're here to help!</p>
          <p>Stay curious,<br/><strong>Team PODEVS</strong></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">&copy; 2026 PODEVS. All rights reserved.</p>
        </div>
      `,
    });

    if (resendError) {
      console.error('Resend error:', resendError);
      // We don't return error here because the user is already subscribed in DB
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('Subscription error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
