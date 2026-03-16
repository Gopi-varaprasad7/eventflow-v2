import { Request, Response } from "express";
import Event from '../models/event.model';
import { AuthRequest } from '../middlewares/auth.middleware';

export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, location, eventDate, capacity } = req.body;
    const event = await Event.create({
      title,
      description,
      location,
      eventDate,
      capacity,
      createdBy: req.user.id
    });
    res.status(201).json({
      message: "Event created",
      event
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};