import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/contact
 *
 * Handles contact form submissions.
 *
 * SETUP OPTIONS (choose one and uncomment):
 *
 * Option A — Resend (recommended):
 *   npm install resend
 *   Set RESEND_API_KEY in .env.local
 *
 * Option B — SendGrid:
 *   npm install @sendgrid/mail
 *   Set SENDGRID_API_KEY in .env.local
 *
 * Option C — Nodemailer (SMTP):
 *   npm install nodemailer @types/nodemailer
 *   Set SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local
 *
 * For now, the route logs the submission and returns success.
 * Replace the TODO section with your preferred email service.
 */

interface ContactPayload {
  name:    string;
  email:   string;
  org?:    string;
  message: string;
  useCase?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();

    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────────────────────────
    // TODO: Replace this section with your email service integration.
    // ─────────────────────────────────────────────────────────────────
    //
    // Example with Resend:
    //
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Abyss AI Labs <noreply@abyssailabs.com>',
    //   to: 'hello@abyssailabs.com',
    //   subject: `New inquiry from ${body.name} — ${body.useCase || 'General'}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${body.name}</p>
    //     <p><strong>Email:</strong> ${body.email}</p>
    //     <p><strong>Organization:</strong> ${body.org || 'N/A'}</p>
    //     <p><strong>Use Case:</strong> ${body.useCase || 'N/A'}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${body.message}</p>
    //   `,
    // });
    //
    // ─────────────────────────────────────────────────────────────────

    // Log submission for development (remove in production)
    console.log('[Contact Form Submission]', {
      name:    body.name,
      email:   body.email,
      org:     body.org,
      useCase: body.useCase,
      message: body.message.slice(0, 100) + '...',
    });

    return NextResponse.json(
      { message: 'Message received. We\'ll be in touch within 24 hours.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('[Contact API Error]', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}
