import { NextResponse } from 'next/server';
import storage from '../../utils/storage';

export async function GET() {
  try {
    const studyPlans = storage.get('study_plans') || [];
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
    
    // Get existing study plans and add new one
    const studyPlans = storage.get('study_plans') || [];
    studyPlans.push(studyPlan);
    
    // Save updated study plans
    storage.set('study_plans', studyPlans);
    
    return NextResponse.json(studyPlan);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create study plan' }, { status: 500 });
  }
}