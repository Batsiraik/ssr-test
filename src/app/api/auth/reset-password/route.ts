import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, generateToken } from '@/lib/auth';
// Phone validation removed - using simple validation
import { z } from 'zod';

const resetPasswordSchema = z.object({
  phone: z.string().min(8, 'Phone number is required'),
  code: z.string().length(6, 'OTP must be 6 digits'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, code, newPassword } = resetPasswordSchema.parse(body);

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
      // Handle test OTP - find user and update password
      const user = await prisma.user.findUnique({
        where: { phone: formattedPhone }
      });

      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      // Hash new password
      const hashedPassword = await hashPassword(newPassword);

      // Update password
      const updatedUser = await prisma.user.update({
        where: { phone: formattedPhone },
        data: { password: hashedPassword },
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
        message: 'Password reset successfully',
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

    // Find user
    const user = await prisma.user.findUnique({
      where: { phone: formattedPhone }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    const updatedUser = await prisma.user.update({
      where: { phone: formattedPhone },
      data: { password: hashedPassword },
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
      message: 'Password reset successfully',
      user: {
        ...updatedUser,
        phone: updatedUser.phone.replace('+263', '')
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

    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
