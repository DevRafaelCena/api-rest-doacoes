import { Router } from 'express';
import { UserUseCase } from '@/useCases/user.usecase';
import { UserController } from '@/controllers/user.controller';
import { UserService } from '@/services/user.service';
import { UserRepository } from '@/repositories/user.repository';
import knex from '@/config/database';
import { DonorRepository } from '@/repositories/donor.repository';
import { AdressController } from '@/controllers/address.controller';
import { AddressUseCase } from '@/useCases/address.usecase';
import { AddressService } from '@/services/address.service';
import { OngRepository } from '@/repositories/ong.repository';
import { TransporterRepository } from '@/repositories/transporter.repository';
import { AddressRepository } from '@/repositories/address.repository';

export const userRouter = Router();

const userRepository = new UserRepository(knex);
const donorRepository = new DonorRepository(knex);
const ongRepository = new OngRepository(knex);
const transporterRepository = new TransporterRepository(knex);
const addressRepository = new AddressRepository(knex);

const userService = new UserService(
  userRepository,
  donorRepository,
  transporterRepository,
  ongRepository,
);
const addressService = new AddressService(
  addressRepository,
  userRepository,
  donorRepository,
  ongRepository,
  transporterRepository,
);

const addressUseCase = new AddressUseCase(addressService);
const userUseCase = new UserUseCase(userService);

const userController = new UserController(userUseCase);
const addressController = new AdressController(addressUseCase);

userRouter.post('/', (req, res, next) => userController.register(req, res, next));

userRouter.post('/address', (req, res, next) => addressController.register(req, res, next));
