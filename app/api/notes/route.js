import { NextResponse } from 'next/server';
import serverStorage, { STORAGE_KEYS } from '../../utils/serverStorage';

export async function GET() {
  try {
    const notes = serverStorage.getData(STORAGE_KEYS.NOTES);
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, content } = await request.json();
    const note = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Get existing notes and add new one
    const notes = serverStorage.getData(STORAGE_KEYS.NOTES);
    notes.push(note);
    
    // Save updated notes
    serverStorage.saveData(STORAGE_KEYS.NOTES, notes);
    
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
  }
}