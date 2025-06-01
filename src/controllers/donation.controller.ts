import { Request, Response } from 'express';
import { CreateDonationUseCase } from '@/useCases/donation/createDonation.usecase';
import { ListDonationsUseCase } from '@/useCases/donation/listDonations.usecase';
import { ListDonationRequestsUseCase } from '@/useCases/donation/listDonationRequests.usecase';
import { AcceptDonationUseCase } from '@/useCases/donation/acceptDonation.usecase';
import { UpdateSentAtUseCase } from '@/useCases/donation/updateSentAt.usecase';
import { CompleteDonationUseCase } from '@/useCases/donation/completeDonation.usecase';
import DonationEntity from '@/entities/donation.entity';
import { ProductRepository } from '@/repositories/product.repository';
import { AppError } from '@/@errors/AppError';

export class DonationController {
  constructor(
    private createDonationUseCase: CreateDonationUseCase,
    private listDonationsUseCase: ListDonationsUseCase,
    private listDonationRequestsUseCase: ListDonationRequestsUseCase,
    private acceptDonationUseCase: AcceptDonationUseCase,
    private updateSentAtUseCase: UpdateSentAtUseCase,
    private completeDonationUseCase: CompleteDonationUseCase,
    private productRepository: ProductRepository,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { productId, ongId, quantity, measure } = req.body;

      const donation = new DonationEntity({
        productId,
        ongId,
        quantity,
        measure,
        completed: false,
      });

      const createdDonation = await this.createDonationUseCase.execute(donation);

      return res.status(201).json(createdDonation);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      console.log('req.query');
      const { productId, ongId } = req.query;

      const filters = {
        productId: productId ? Number(productId) : undefined,
        ongId: ongId ? Number(ongId) : undefined,
      };

      const donations = await this.listDonationsUseCase.execute(filters);

      return res.status(200).json(donations);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listDonationRequests(req: Request, res: Response): Promise<Response> {
    try {
      console.log('req.query');
      const { donorId, ongId } = req.query;

      const filters = {
        donorId: donorId && !isNaN(Number(donorId)) ? Number(donorId) : undefined,
        ongId: ongId && !isNaN(Number(ongId)) ? Number(ongId) : undefined,
      };

      const donations = await this.listDonationRequestsUseCase.execute(filters);
      return res.json(donations);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listDonations(req: Request, res: Response): Promise<Response> {
    try {
      const { donorId } = req.query;  
      
      if (!donorId) {
        throw new AppError('ID do doador é obrigatório', 400);
      }

      const id = Number(donorId);

      const products = await this.productRepository.findDonorProducts(id);
      return res.json(products);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async acceptDonation(req: Request, res: Response): Promise<Response> {
    try {
      const { donationId } = req.query;
      const id = Number(donationId);

      if (isNaN(id)) {
        throw new AppError('ID da doação inválido', 400);
      }

      const updatedDonation = await this.acceptDonationUseCase.execute(id);
      return res.json(updatedDonation);
    } catch (error: any) {
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }

  async updateSentAt(req: Request, res: Response): Promise<Response> {
    try {
      const { donationId } = req.query;
      const id = Number(donationId);

      if (isNaN(id)) {
        throw new AppError('ID da doação inválido', 400);
      }

      const updatedDonation = await this.updateSentAtUseCase.execute(id);
      return res.json(updatedDonation);
    } catch (error: any) {
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }

  async completeDonation(req: Request, res: Response): Promise<Response> {
    try {
      const { donationId } = req.query;
      const id = Number(donationId);

      if (isNaN(id)) {
        throw new AppError('ID da doação inválido', 400);
      }

      const updatedDonation = await this.completeDonationUseCase.execute(id);
      return res.json(updatedDonation);
    } catch (error: any) {
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }
}