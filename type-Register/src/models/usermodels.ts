import mongoose, { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import  jwt from 'jsonwebtoken';

// Define an interface for the User document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateToken(): string;
}

// Create a schema for the User
const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

// Pre-save middleware to hash the password
userSchema.pre('save', async function (next) {
  const user = this as IUser;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(); // Pass error to next middleware
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate token
userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username, // Use 'username' instead of 'name' to match the schema
      email: this.email,
    },
    process.env.ACCESS_TOKENS_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKENS_EXPIRY,
    }
  );
};

// Create and export the User model
const User = model<IUser>('User_test', userSchema);
export default User;
