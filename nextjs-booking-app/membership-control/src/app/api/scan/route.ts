// src/app/api/scan/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Member from "@/models/Member";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subjectID } = body;

    await connectToDB();
    const member = await Member.findOne({ subjectID });

    if (!member) {
      return NextResponse.json({ success: false, message: "Member not found" }, { status: 404 });
    }

    if (!member.active) {
      return NextResponse.json({ success: false, message: "Membership inactive" }, { status: 403 });
    }

    member.attendance.push(new Date());
    await member.save();

    return NextResponse.json({ success: true, message: "Attendance recorded" });
  } catch (err) {
    console.error("❌ Error in POST /api/scan:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
