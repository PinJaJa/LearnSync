import { NextResponse } from 'next/server';

// In-memory storage for study plans
let studyPlans = [];

export async function GET() {
  try {
    return NextResponse.json(studyPlans);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch study plans' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, description, startDate, endDate } = await request.json();
    const studyPlan = {
      id: Date.now().toString(),
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    studyPlans.push(studyPlan);
    return NextResponse.json(studyPlan);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create study plan' }, { status: 500 });
  }
}