import type { Request, Response } from 'express';
import Event from '../models/event.model.js';

export const registerEvent = async (req: Request, res: Response) => {
  const { eventId, userId } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.attendees.length < event.capacity) {
      event.attendees.push(userId);
      await event.save();
      return res.json({
        message: 'Registered successfully',
      });
    } else {
      event.waitlist.push(userId);

      await event.save();

      return res.json({
        message: 'Event full. Added to waitlist',
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'registration unsuccesfull' });
  }
};
