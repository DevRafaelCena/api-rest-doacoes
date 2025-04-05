import { Request, Response, NextFunction } from 'express';
import { CreateProductUseCase } from '@/useCases/product/createProduct.usecase';
import { ListProductsUseCase, ListProductsFilters } from '@/useCases/product/listProducts.usecase';
import { FindProductByIdUseCase } from '@/useCases/product/findProductById.usecase';
import { createProductSchema } from '@/dtos/createProductDto';
import { z } from 'zod';

export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly findProductByIdUseCase: FindProductByIdUseCase
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
} 