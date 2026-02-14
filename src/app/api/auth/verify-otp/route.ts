import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateToken } from '@/lib/auth';
// Phone validation removed - using simple validation
import { z } from 'zod';

const verifyOTPSchema = z.object({
  phone: z.string().min(8, 'Phone number is required'),
  code: z.string().length(6, 'OTP must be 6 digits'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, code } = verifyOTPSchema.parse(body);

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

    // Check for test OTP (mock test phone)
    if (formattedPhone === '+263771234567' && code === '123456') {
      // Handle test OTP - find user and activate
      const user = await prisma.user.findUnique({
        where: { phone: formattedPhone }
      });

      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      // Activate user account
      const updatedUser = await prisma.user.update({
        where: { phone: formattedPhone },
        data: { isActive: true },
        select: {
          id: true,
          fullName: true,
          phone: true,
          city: true,
          isActive: true,
        }
      });

      // Generate JWT token
      const token = generateToken({
        id: updatedUser.id,
        phone: updatedUser.phone,
        fullName: updatedUser.fullName,
      });

      // Create session (6 months)
      await prisma.session.create({
        data: {
          userId: updatedUser.id,
          token,
          expiresAt: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000),
        }
      });

      return NextResponse.json({
        message: 'Account verified successfully',
        user: {
          ...updatedUser,
          phone: updatedUser.phone.replace('+263', '')
        },
        token
      });
    }

    // Find the OTP record
    const otpRecord = await prisma.oTP.findFirst({
      where: {
        phone: formattedPhone,
        code,
        expiresAt: {
          gt: new Date()
        }
      }
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    // Activate user account
    const user = await prisma.user.update({
      where: { phone: formattedPhone },
      data: { isActive: true },
      select: {
        id: true,
        fullName: true,
        phone: true,
        city: true,
        isActive: true,
      }
    });

    // Delete the used OTP
    await prisma.oTP.delete({
      where: { id: otpRecord.id }
    });

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      phone: user.phone,
      fullName: user.fullName,
    });

    // Create session (6 months)
    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000),
      }
    });

    return NextResponse.json({
      message: 'Account verified successfully',
      user: {
        ...user,
        phone: user.phone.replace('+263', '')
      },
      token
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('OTP verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
