import { Router } from 'express';
import { DonationController } from '@/controllers/donation.controller';
import { CreateDonationUseCase } from '@/useCases/donation/createDonation.usecase';
import { ListDonationsUseCase } from '@/useCases/donation/listDonations.usecase';
import { ListDonationRequestsUseCase } from '@/useCases/donation/listDonationRequests.usecase';
import { DonationRepository } from '@/repositories/donation.repository';
import { ProductRepository } from '@/repositories/product.repository';
import knex from '@/config/database';

const router = Router();

const donationRepository = new DonationRepository(knex);
const productRepository = new ProductRepository(knex);
const createDonationUseCase = new CreateDonationUseCase(donationRepository, productRepository);
const listDonationsUseCase = new ListDonationsUseCase(donationRepository);
const listDonationRequestsUseCase = new ListDonationRequestsUseCase(donationRepository);

const donationController = new DonationController(
  createDonationUseCase,
  listDonationsUseCase,
  listDonationRequestsUseCase,
);

// Rota para solicitar uma doação
router.post('/', donationController.create.bind(donationController));

// Rota para listar doações com filtros
router.get('/', donationController.list.bind(donationController));

// Rota para listar solicitações de doação
router.get('/requests', donationController.listDonationRequests.bind(donationController));

export const donationRoutes = router;
