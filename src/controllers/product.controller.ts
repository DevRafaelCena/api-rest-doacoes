import { Request, Response, NextFunction } from 'express';
import { CreateProductUseCase } from '@/useCases/product/createProduct.usecase';
import { ListProductsUseCase, ListProductsFilters } from '@/useCases/product/listProducts.usecase';
import { FindProductByIdUseCase } from '@/useCases/product/findProductById.usecase';
import { UpdateProductUseCase } from '@/useCases/product/updateProduct.usecase';
import { createProductSchema } from '@/dtos/createProductDto';
import { z } from 'zod';
import { ProductRepository } from '@/repositories/product.repository';
import { AppError } from '@/errors/AppError';

export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private productRepository: ProductRepository,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = createProductSchema.parse(req.body);

      const product = await this.createProductUseCase.execute(validatedData);

      return res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({
          message: 'Erro de validação',
          errors: error.errors,
        });
      }

      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const filters: ListProductsFilters = {
        categoryId: req.query.categoryId ? Number(req.query.categoryId) : undefined,
        title: req.query.title as string | undefined,
        donorId: req.query.donorId ? Number(req.query.donorId) : undefined,
      };

      const products = await this.listProductsUseCase.execute(filters);

      return res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const product = await this.findProductByIdUseCase.execute(Number(id));

      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async listAvailableProducts(req: Request, res: Response): Promise<Response> {
    try {
      const { categoryId, title } = req.query;

      console.log('listar produtos disponíveis', { categoryId, title });

      const filters = {
        categoryId: categoryId ? Number(categoryId) : undefined,
        title: title as string | undefined,
      };

      const products = await this.productRepository.findAvailableProducts(filters);

      return res.json(products);
    } catch (error: any) {
      console.error('Erro ao listar produtos disponíveis:', error);
      return res.status(400).json({ error: error.message });
    }
  }

  async getProductDetails(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const productId = Number(id);

      console.log('detalhe produto');

      if (isNaN(productId)) {
        throw new AppError('ID do produto inválido', 400);
      }

      const product = await this.productRepository.findProductDetails(productId);

      if (!product) {
        throw new AppError('Produto não encontrado', 404);
      }

      return res.json(product);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getDonorProducts(req: Request, res: Response): Promise<Response> {
    try {
      const { donorId } = req.params;
      const id = Number(donorId);

      if (isNaN(id)) {
        throw new AppError('ID do doador inválido', 400);
      }

      const products = await this.productRepository.findDonorProducts(id);
      return res.json(products);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const productId = Number(id);

      if (isNaN(productId)) {
        throw new AppError('ID do produto inválido', 400);
      }

      const validatedData = createProductSchema.partial().parse(req.body);

      const updatedProduct = await this.updateProductUseCase.execute(productId, validatedData);

      return res.json(updatedProduct);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({
          message: 'Erro de validação',
          errors: error.errors,
        });
      }

      next(error);
    }
  }
}
