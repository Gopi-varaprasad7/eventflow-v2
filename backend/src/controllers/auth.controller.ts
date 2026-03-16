import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import env from 'dotenv';

env.config();

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const exist = await User.find({ email });
    if (email) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPass,
    });
    res.status(201).json({
      message: 'User registered',
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'No user found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });

    res.json({
      message: 'Login succesfull',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
