import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { Category } from '../entity/Category';

export class CategoryController {
  async save(request: Request, response: Response) {
    const category = Category.create(request.body as Category);

    const errors = await validate(category);
    if (errors.length > 0) {
      response.status(400).send(errors);
      return;
    }

    const categoryRepository = getRepository(Category);
    try {
      await categoryRepository.save(category);
    } catch (e) {
      response.status(500).send(e);
      return;
    }

    response.status(201).send('Category created');
  }

  public async all(_: Request, response: Response) {
    const categories = await getRepository(Category).find({
      select: ['Id', 'Name'],
    });
    response.send(categories);
  }

  public async get(request: Request, response: Response) {
    const { categoryId } = request.params;

    const categoryRepository = getRepository(Category);
    try {
      const category = await categoryRepository.findOneOrFail(
        categoryId,
        {
          select: ['Id', 'Name'],
        },
      );
      response.send(category);
    } catch (error) {
      response.status(404).send('category not found');
    }
  }
}
