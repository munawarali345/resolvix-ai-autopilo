
// backend/src/scripts/seedAdmin.ts
import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user.model.js';
import { env } from '../config/validateEnv.js';

const createAdmin = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log('MongoDB connected');

    const hashedPassword = await bcrypt.hash('admin345@', 10);

    const admin = await UserModel.create({
      name: 'Admin User',
      email: 'admin@resolvixAi.com',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin created:', admin.email);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();