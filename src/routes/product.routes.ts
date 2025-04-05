import { Router } from 'express';
import { ProductController } from '@/controllers/product.controller';
import { CreateProductUseCase } from '@/useCases/product/createProduct.usecase';
import { ListProductsUseCase } from '@/useCases/product/listProducts.usecase';
import { FindProductByIdUseCase } from '@/useCases/product/findProductById.usecase';
import { ProductRepository } from '@/repositories/product.repository';
import knex from '@/config/database';

const router = Router();

const productRepository = new ProductRepository(knex);
const createProductUseCase = new CreateProductUseCase(productRepository);
const listProductsUseCase = new ListProductsUseCase(productRepository);
const findProductByIdUseCase = new FindProductByIdUseCase(productRepository);
const productController = new ProductController(
  createProductUseCase,
  listProductsUseCase,
  findProductByIdUseCase
);

router.post('/', productController.create.bind(productController));
router.get('/', productController.list.bind(productController));
router.get('/:id', productController.findById.bind(productController));

export const productRoutes = router; 