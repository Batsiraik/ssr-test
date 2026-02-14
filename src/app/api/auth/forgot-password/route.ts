import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
// Phone validation removed - using simple validation
// SMS functionality removed - using mock OTP for now
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  phone: z.string().min(8, 'Phone number is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone } = forgotPasswordSchema.parse(body);

    // Simple phone validation and formatting
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 8 || cleanPhone.length > 9) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Format phone number with +263 prefix
    const formattedPhone = `+263${cleanPhone}`;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { phone: formattedPhone },
      select: { id: true, fullName: true, phone: true, isActive: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'No account found with this phone number' },
        { status: 404 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account not activated. Please verify your phone number first.' },
        { status: 400 }
      );
    }

    // Generate OTP (mock implementation)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`[MOCK] OTP for ${formattedPhone}: ${otp}`);

    // Store OTP in database for verification
    await prisma.oTP.create({
      data: {
        phone: formattedPhone,
        code: otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      }
    });

    return NextResponse.json({
      message: 'OTP sent to your phone number. Please check your SMS.',
      phone: formattedPhone.replace('+263', '') // Return without +263 for display
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
