import Document from '../models/document.model.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Upload document
export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { originalname, filename, mimetype, size, path: filePath } = req.file;

    // Create document record
    const document = new Document({
      filename,
      originalName: originalname,
      mimeType: mimetype,
      size,
      filePath,
      uploadedBy: req.user._id,
      status: 'processing'
    });

    await document.save();

    res.status(201).json({
      success: true,
      data: document,
      message: 'Document uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading document',
      error: error.message
    });
  }
};

// Update document with OCR results
export const updateDocumentOCR = async (req, res) => {
  try {
    const { documentId } = req.params;
    const { extractedText, confidence, wordCount, tags, category, metadata } = req.body;

    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    // Check if user owns the document
    if (document.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this document'
      });
    }

    // Update document with OCR results
    document.extractedText = extractedText || '';
    document.confidence = confidence || 0;
    document.wordCount = wordCount || 0;
    document.tags = tags || [];
    document.category = category || 'Other';
    document.metadata = metadata || {};
    document.status = 'completed';

    await document.save();

    res.json({
      success: true,
      data: document,
      message: 'Document updated with OCR results'
    });
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating document',
      error: error.message
    });
  }
};

// Get all documents for user
export const getUserDocuments = async (req, res) => {
  try {
    const { 
      search, 
      category, 
      tags, 
      page = 1, 
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    let query = { uploadedBy: req.user._id };

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by tags
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : tags.split(',');
      query.tags = { $in: tagArray };
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const documents = await Document.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('uploadedBy', 'username fullName');

    const total = await Document.countDocuments(query);

    res.json({
      success: true,
      data: documents,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching documents',
      error: error.message
    });
  }
};

// Get document by ID
export const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id)
      .populate('uploadedBy', 'username fullName');

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    // Check if user owns the document or it's public
    if (document.uploadedBy._id.toString() !== req.user._id.toString() && !document.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this document'
      });
    }

    res.json({
      success: true,
      data: document
    });
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching document',
      error: error.message
    });
  }
};

// Update document metadata
export const updateDocument = async (req, res) => {
  try {
    const { tags, category, isPublic } = req.body;

    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    // Check if user owns the document
    if (document.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this document'
      });
    }

    // Update fields
    if (tags) document.tags = Array.isArray(tags) ? tags : tags.split(',');
    if (category) document.category = category;
    if (typeof isPublic === 'boolean') document.isPublic = isPublic;

    await document.save();

    res.json({
      success: true,
      data: document,
      message: 'Document updated successfully'
    });
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating document',
      error: error.message
    });
  }
};

// Delete document
export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    // Check if user owns the document
    if (document.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this document'
      });
    }

    // Delete file from filesystem
    try {
      if (fs.existsSync(document.filePath)) {
        fs.unlinkSync(document.filePath);
      }
    } catch (fileError) {
      console.error('Error deleting file:', fileError);
    }

    // Delete document record
    await Document.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting document',
      error: error.message
    });
  }
};

// Download document file
export const downloadDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    // Check if user owns the document or it's public
    if (document.uploadedBy.toString() !== req.user._id.toString() && !document.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to download this document'
      });
    }

    // Check if file exists
    if (!fs.existsSync(document.filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Set headers for download
    res.setHeader('Content-Disposition', `attachment; filename="${document.originalName}"`);
    res.setHeader('Content-Type', document.mimeType);

    // Send file
    res.sendFile(path.resolve(document.filePath));
  } catch (error) {
    console.error('Error downloading document:', error);
    res.status(500).json({
      success: false,
      message: 'Error downloading document',
      error: error.message
    });
  }
};

// Get document statistics
export const getDocumentStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const stats = await Document.aggregate([
      { $match: { uploadedBy: userId } },
      {
        $group: {
          _id: null,
          totalDocuments: { $sum: 1 },
          totalSize: { $sum: '$size' },
          totalWords: { $sum: '$wordCount' },
          avgConfidence: { $avg: '$confidence' },
          categoryBreakdown: {
            $push: '$category'
          }
        }
      }
    ]);

    const categoryStats = await Document.aggregate([
      { $match: { uploadedBy: userId } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    const tagStats = await Document.aggregate([
      { $match: { uploadedBy: userId } },
      { $unwind: '$tags' },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      success: true,
      data: {
        overview: stats[0] || {
          totalDocuments: 0,
          totalSize: 0,
          totalWords: 0,
          avgConfidence: 0
        },
        categoryBreakdown: categoryStats,
        topTags: tagStats
      }
    });
  } catch (error) {
    console.error('Error fetching document stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching document statistics',
      error: error.message
    });
  }
};
