import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Template from '@/models/Template';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const prompt = url.searchParams.get('prompt') || '';
    const category = url.searchParams.get('category') || '';
    
    await connectDB();
    
    let query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    // If there's a prompt, we'd ideally use a more sophisticated search
    // For now, we'll do a simple text search on name and description
    if (prompt) {
      const searchRegex = new RegExp(prompt, 'i');
      query.$or = [
        { name: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { tags: { $in: [searchRegex] } }
      ];
    }
    
    const templates = await Template.find(query).sort({ isPopular: -1, createdAt: -1 });
    
    return NextResponse.json({ templates });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { message: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}