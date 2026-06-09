import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
    trim: true
  },
  originalName: {
    type: String,
    required: true,
    trim: true
  },
  mimeType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  extractedText: {
    type: String,
    default: ''
  },
  confidence: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  wordCount: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: ['Legal', 'Education', 'Government', 'Medical', 'Financial', 'Personal', 'Other'],
    default: 'Other'
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  sharedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  metadata: {
    width: Number,
    height: Number,
    pages: Number,
    language: String,
    processingTime: Number
  },
  status: {
    type: String,
    enum: ['uploading', 'processing', 'completed', 'error'],
    default: 'uploading'
  },
  errorMessage: {
    type: String
  }
}, {
  timestamps: true
});

// Create text index for search functionality
documentSchema.index({ 
  extractedText: 'text', 
  originalName: 'text', 
  tags: 'text' 
});

// Create compound index for user and status
documentSchema.index({ uploadedBy: 1, status: 1 });

// Create index for tags
documentSchema.index({ tags: 1 });

// Create index for category
documentSchema.index({ category: 1 });

const Document = mongoose.model('Document', documentSchema);

export default Document;
