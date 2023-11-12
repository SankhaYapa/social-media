import express from 'express';
import {
  createTaxi,
  updateTaxi,
  deleteTaxi,
  getTaxi,
  getTaxis,
} from '../controllers/taxi.js';

const router = express.Router();

// Create a new taxi
router.post('/', createTaxi);

// Update an existing taxi
router.put('/:id', updateTaxi);

// Delete a taxi
router.delete('/:id', deleteTaxi);

// Get a specific taxi
router.get('/:id', getTaxi);

// Get a list of taxis
router.get('/', getTaxis);

export default router;
