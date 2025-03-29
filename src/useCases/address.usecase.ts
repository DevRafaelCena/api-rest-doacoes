import { CreateAddressDTO } from '@/dtos/createAddressDto';
import { AddressService } from '@/services/address.service';

export class AddressUseCase {
  constructor(private readonly addressService: AddressService) {}

  async createOrUpdateAddress(data: CreateAddressDTO) {
    return this.addressService.register(data);
  }
}
