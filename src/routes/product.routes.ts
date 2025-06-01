import { Router } from 'express';
import { ProductController } from '@/controllers/product.controller';
import { CreateProductUseCase } from '@/useCases/product/createProduct.usecase';
import { ListProductsUseCase } from '@/useCases/product/listProducts.usecase';
import { FindProductByIdUseCase } from '@/useCases/product/findProductById.usecase';
import { UpdateProductUseCase } from '@/useCases/product/updateProduct.usecase';
import { ProductRepository } from '@/repositories/product.repository';
import knex from '@/config/database';
import { authenticateToken } from '@/middlewares/auth.middleware';

const router = Router();

const productRepository = new ProductRepository(knex);
const createProductUseCase = new CreateProductUseCase(productRepository);
const listProductsUseCase = new ListProductsUseCase(productRepository);
const findProductByIdUseCase = new FindProductByIdUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);

const productController = new ProductController(
  createProductUseCase,
  listProductsUseCase,
  findProductByIdUseCase,
  updateProductUseCase,
  productRepository,
);

router.use(authenticateToken);

router.post('/', productController.create.bind(productController));
router.put('/:id', productController.update.bind(productController));

router.get('/', productController.list.bind(productController));

//router.get('/available', productController.listAvailableProducts.bind(productController));

router.get('/details/:id', productController.getProductDetails.bind(productController));

router.get('/:id', productController.findById.bind(productController));

router.get('/donor/:donorId', productController.getDonorProducts.bind(productController));

export const productRoutes = router;
