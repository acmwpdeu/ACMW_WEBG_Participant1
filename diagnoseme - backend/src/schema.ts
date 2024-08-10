import mongoose, { Schema } from 'mongoose';

// Define the User schema
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  chats: [{
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true  // Automatically add `createdAt` and `updatedAt` fields
});

// Define the Chat schema
const chatSchema = new Schema({
    messages: [{
      sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      text: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }, {
    timestamps: true  // Automatically add `createdAt` and `updatedAt` fields
  });
  

// Create a model using the schema
export const User = mongoose.model('User', userSchema);
export const Chat = mongoose.model('Chat', chatSchema);


