import express from 'express';
import { getExperiences, getExperienceById } from '../controllers/experiencesController.js';
import { createBooking } from '../controllers/bookingsController.js';
import { validatePromo } from '../controllers/promoController.js';

const router = express.Router();

router.get('/experiences', getExperiences);
router.get('/experiences/:id', getExperienceById);
router.post('/bookings', createBooking);
router.post('/promo/validate', validatePromo);

export default router;
