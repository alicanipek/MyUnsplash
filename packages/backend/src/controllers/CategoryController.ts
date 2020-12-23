import { Category } from './../entity/Category';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';

export class CategoryController {
    async save(request: Request, response: Response) {
        let category = Category.create(request.body as Category);

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
        let categories = await getRepository(Category).find({
            select: ['Id', 'Name'],
        });
        response.send(categories);
    }

    public async get(request: Request, response: Response) {
        const categoryId = request.params['categoryId'];

        const categoryRepository = getRepository(Category);
        try {
            const category = await categoryRepository.findOneOrFail(
                categoryId,
                {
                    select: ['Id', 'Name'],
                }
            );
            response.send(category);
        } catch (error) {
            response.status(404).send('category not found');
        }
    }
}
