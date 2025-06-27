import { Router } from 'express';
import { TransporterController } from '@/controllers/transporter.controller';
import { TransporterService } from '@/useCases/transporter/transporter.service';
import { DonationRepository } from '@/repositories/donation.repository';
import knex from '@/config/database';
import { authenticateToken } from '@/middlewares/auth.middleware';

const router = Router();
const donationRepository = new DonationRepository(knex);
const transporterService = new TransporterService(donationRepository);
const transporterController = new TransporterController(transporterService);

router.use(authenticateToken);

router.get('/available', transporterController.listAvailable.bind(transporterController));
router.put('/accept/:id', transporterController.accept.bind(transporterController));
router.get('/in-progress', transporterController.inProgress.bind(transporterController));
router.put('/complete/:id', transporterController.complete.bind(transporterController));

export const transporterRoutes = router; 