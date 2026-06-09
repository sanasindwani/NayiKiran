import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['Government', 'Private', 'Charter'],
    required: true
  },
  address: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  facilities: [{
    type: String
  }],
  contact: {
    phone: String,
    email: String,
    website: String
  },
  established: {
    type: Number,
    min: 1800,
    max: new Date().getFullYear()
  },
  grades: [{
    type: String
  }],
  totalStudents: {
    type: Number,
    min: 0
  },
  studentTeacherRatio: {
    type: Number,
    min: 0
  },
  affiliation: {
    type: String
  },
  description: {
    type: String
  },
  images: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create 2dsphere index for location-based queries
schoolSchema.index({ location: '2dsphere' });

// Create text index for search functionality
schoolSchema.index({ 
  name: 'text', 
  address: 'text', 
  type: 'text',
  description: 'text'
});

const School = mongoose.model('School', schoolSchema);

export default School;
