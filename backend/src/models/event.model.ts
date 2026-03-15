import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  location: string;
  eventDate: Date;
  capacity: number;
  attendees: mongoose.Types.ObjectId[];
  waitlist: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },

  description: { type: String, required: true },

  location: { type: String, required: true },

  eventDate: { type: Date, required: true },

  capacity: { type: Number, required: true },

  attendees: [{ type: mongoose.Schema.Types.ObjectId, res: 'User' }],
  waitlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model<IEvent>("Event",EventSchema);