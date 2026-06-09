import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  uploadDocument,
  updateDocumentOCR,
  getUserDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  downloadDocument,
  getDocumentStats
} from '../controllers/document.controller.js';
import authenticateUser from '../middleware/authenticateUser.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp',
    'application/pdf',
    'text/plain',
    'text/rtf'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, PDFs, and text files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Apply authentication middleware to all routes
router.use(authenticateUser);

// POST /api/documents/upload - Upload document
router.post('/upload', upload.single('document'), uploadDocument);

// PUT /api/documents/:id/ocr - Update document with OCR results
router.put('/:id/ocr', updateDocumentOCR);

// GET /api/documents - Get user's documents with filtering
router.get('/', getUserDocuments);

// GET /api/documents/stats - Get document statistics
router.get('/stats', getDocumentStats);

// GET /api/documents/:id - Get specific document
router.get('/:id', getDocumentById);

// PUT /api/documents/:id - Update document metadata
router.put('/:id', updateDocument);

// DELETE /api/documents/:id - Delete document
router.delete('/:id', deleteDocument);

// GET /api/documents/:id/download - Download document file
router.get('/:id/download', downloadDocument);

export default router;
