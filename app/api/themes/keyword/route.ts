import { NextResponse } from 'next/server';
export async function GET() {
    
      return NextResponse.json({ keywords: ["s", "2", "w", "e"] });
  }

