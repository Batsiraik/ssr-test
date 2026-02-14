import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, generateToken } from '@/lib/auth';
// Phone validation removed - using simple validation
// SMS functionality removed - using mock OTP for now
import { z } from 'zod';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().min(8, 'Phone number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  city: z.string().min(2, 'City is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phone, password, city } = registerSchema.parse(body);

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

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { phone: formattedPhone }
    });

    if (existingUser) {
      return NextResponse.json(
        { 
          error: 'This phone number is already registered. If this is your number, please login or recover your password if you forgot it.',
          code: 'PHONE_EXISTS'
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user (inactive until OTP verification)
    const user = await prisma.user.create({
      data: {
        fullName,
        phone: formattedPhone,
        password: hashedPassword,
        city,
        isActive: false, // Will be activated after OTP verification
      },
      select: {
        id: true,
        fullName: true,
        phone: true,
        city: true,
        isActive: true,
      }
    });

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
      message: 'Registration successful. Please verify your phone number with the OTP sent.',
      user: {
        ...user,
        phone: formattedPhone.replace('+263', '') // Return without +263 for display
      }
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
