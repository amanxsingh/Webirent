import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import Template from '@/models/Template';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { templateId, customerDetails } = await request.json();
    
    if (!templateId || !customerDetails) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Find the template
    const template = await Template.findById(templateId);
    if (!template) {
      return NextResponse.json(
        { message: 'Template not found' },
        { status: 404 }
      );
    }
    
    // Create the order
    const order = await Order.create({
      user: session.user.id,
      template: templateId,
      customerDetails,
      totalPrice: template.price,
      status: 'pending',
    });
    
    // Populate the template details for the response
    const populatedOrder = await Order.findById(order._id).populate('template');
    
    return NextResponse.json(
      { 
        message: 'Order created successfully',
        order: populatedOrder
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { message: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await connectDB();
    
    // Get all orders for the current user
    const orders = await Order.find({ user: session.user.id })
      .populate('template')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { message: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}