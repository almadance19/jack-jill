// src/app/api/test-create/route.ts
import { connectToDB } from '@/lib/db';
import Member from '@/models/Member';

export async function GET() {
  try {
    await connectToDB();

    const newMember = await Member.create({
      subjectID: "test123",
      name: "Test User",
      email: "test@example.com",
      active: true,
      attendance: [],
    });

    return new Response(JSON.stringify(newMember), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create test member", { status: 500 });
  }
}
  