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
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique:false
  },
  messages: {
    type: [{
      role: String,
      content: String,
      _id: false
    }],  
    required: true,
    default: [{
      "role": "system",
      "content": "\"You are a doctor tasked with diagnosing patient conditions based on their symptoms and medical history. Carefully listen to the patient's description of their symptoms, consider possible conditions, and provide a diagnosis. If the condition appears serious or life-threatening, strongly advise the patient to seek immediate medical attention.\""
    },
    {
      "role": "assistant",
      "content": "I'm ready to see the patient. Please go ahead and describe your symptoms and medical history. What brings you to see me today?"
    }]  // Initialize with the boilerplate message
  },
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


