import { NextResponse } from 'next/server';

// In-memory storage for notes
let notes = [];

import { Storage, STORAGE_KEYS } from '../../../public/js/storage';

export async function GET() {
  try {
    const notes = Storage.getData(STORAGE_KEYS.NOTES);
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
    const notes = Storage.getData(STORAGE_KEYS.NOTES);
    notes.push(note);
    
    // Save updated notes
    Storage.saveData(STORAGE_KEYS.NOTES, notes);
    
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
  }
}