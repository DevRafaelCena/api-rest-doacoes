import { Request, Response } from 'express';
import { TransporterService } from '@/useCases/transporter/transporter.service';

export class TransporterController {
  constructor(private transporterService: TransporterService) {}

  async listAvailable(req: Request, res: Response) {
    console.log('Fetching available donations for transporters');
    const donations = await this.transporterService.listAvailable();
    return res.json(donations);
  }

  async accept(req: Request, res: Response) {
    const { id } = req.params;
    const transporterId = (req as any).user.id; // Corrigido para evitar erro de tipagem
    const donation = await this.transporterService.accept(Number(id), transporterId);
    return res.json(donation);
  }

  async inProgress(req: Request, res: Response) {
    const transporterId = (req as any).user.id;
    const donations = await this.transporterService.inProgress(transporterId);
    return res.json(donations);
  }

  async complete(req: Request, res: Response) {
    const { id } = req.params;
    const transporterId = (req as any).user.id;
    const donation = await this.transporterService.complete(Number(id), transporterId);
    return res.json(donation);
  }
}
