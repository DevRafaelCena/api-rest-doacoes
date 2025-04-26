import { Request, Response } from 'express';
import { CreateDonationUseCase } from '@/useCases/donation/createDonation.usecase';
import { ListDonationsUseCase } from '@/useCases/donation/listDonations.usecase';
import { ListDonationRequestsUseCase } from '@/useCases/donation/listDonationRequests.usecase';
import DonationEntity from '@/entities/donation.entity';

export class DonationController {
  constructor(
    private createDonationUseCase: CreateDonationUseCase,
    private listDonationsUseCase: ListDonationsUseCase,
    private listDonationRequestsUseCase: ListDonationRequestsUseCase,
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
}
