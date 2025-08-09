// src/models/Member.ts
import mongoose, { Schema, model, models } from 'mongoose';

const MemberSchema = new Schema({
  name: String,
  email: String,
  subjectID: { type: String, unique: true },
  active: Boolean,
  membershipType: String,
  attendance: [{ type: Date }] // ✅ This tracks attendance times
});

const Member = models.Member || model("Member", MemberSchema);
export default Member;
// This file defines the Member model with fields for name, email, subjectID, active status, membership type, and attendance.
// The attendance field is an array of dates to track when the member attended classes.