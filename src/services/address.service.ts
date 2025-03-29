import { AppError } from '@/@errors/AppError';
import { CreateAddressDTO } from '@/dtos/createAddressDto';
import AddressEntity from '@/entities/address.entity';
import { UserRole } from '@/enums/user-role';
import { IAddressRepository } from '@/repositories/address.repository';
import { IDonorRepository } from '@/repositories/donor.repository';
import { IOngRepository } from '@/repositories/ong.repository';
import { ITransporterRepository } from '@/repositories/transporter.repository';
import { IUserRepository } from '@/repositories/user.repository';

export class AddressService {
  constructor(
    private readonly addressRepository: IAddressRepository,
    private readonly userRepository: IUserRepository,
    private readonly donorRepository: IDonorRepository,
    private readonly ongRepository: IOngRepository,
    private readonly transporterRepository: ITransporterRepository,
  ) {}

  async register(data: CreateAddressDTO) {
    const user = await this.userRepository.findUserById(data.userId);
    if (!user) throw new AppError('User not found', 404);

    const roleHandlers = {
      [UserRole.DONOR]: () => this.donorRepository.findDonorByUserId(user.id as number),
      [UserRole.TRANSPORTER]: () =>
        this.transporterRepository.findTransporterByUserId(user.id as number),
      [UserRole.ONG]: () => this.ongRepository.findOngByUserId(user.id as number),
    };

    const userRole = await roleHandlers[user.role]?.();

    if (!userRole) throw new AppError('User role not found', 404);

    const address = new AddressEntity({
      id: userRole.addressId,
      ...data,
    });

    if (userRole.addressId) {
      await this.addressRepository.updateAddress(address);
    } else {
      if (!(await this.addressRepository.createAddress(address))) {
        throw new AppError('Error creating address', 500);
      }
    }

    return address;
  }
}
