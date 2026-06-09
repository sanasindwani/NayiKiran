import express from 'express';
import {
  getAllSchools,
  getSchoolById,
  createSchool,
  updateSchool,
  deleteSchool,
  getNearbySchools
} from '../controllers/school.controller.js';

const router = express.Router();

// GET /api/schools - Get all schools with optional filtering
router.get('/', getAllSchools);

// GET /api/schools/nearby - Get nearby schools by location
router.get('/nearby', getNearbySchools);

// GET /api/schools/:id - Get school by ID
router.get('/:id', getSchoolById);

// POST /api/schools - Create new school
router.post('/', createSchool);

// PUT /api/schools/:id - Update school
router.put('/:id', updateSchool);

// DELETE /api/schools/:id - Delete school (soft delete)
router.delete('/:id', deleteSchool);

export default router;
