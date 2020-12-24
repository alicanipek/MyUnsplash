import { Category } from './../entity/Category';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from './../entity/Post';

export class PostController {
    async save(request: Request, response: Response) {
        if (!request.file) {
            response.sendStatus(400);
            return;
        }
        let post = Post.create(request.body as Post);

        let file = request.file;

        post.User = request.session.user!;
        post.Categories = JSON.parse(request.body['Categories']) as Category[];
        post.ImagePath = file.path;

        const errors = await validate(post);
        if (errors.length > 0) {
            response.status(400).send(errors);
            return;
        }

        const postRepository = getRepository(Post);
        try {
            await postRepository.save(post);
        } catch (e) {
            response.status(500).send(e);
            return;
        }

        response.status(201).send('Post created');
    }

    public async all(request: Request, response: Response) {
        let posts = await getRepository(Post)
            .createQueryBuilder('Post')
            .where({ User: request.session.user })
            .leftJoin('Post.User', 'User')
            .leftJoin('Post.Categories', 'Category')
            .addSelect([
                'Category.Id',
                'Category.Name',
                'User.Id',
                'User.UserName',
                'User.Email',
            ])
            .getMany();
        response.send(posts);
    }

    public async get(request: Request, response: Response) {
        const postId = request.params['postId'];
        try {
            const post = await getRepository(Post)
                .createQueryBuilder('Post')
                .where({ Id: postId })
                .leftJoin('Post.User', 'User')
                .leftJoin('Post.Categories', 'Category')
                .addSelect([
                    'Category.Id',
                    'Category.Name',
                    'User.Id',
                    'User.UserName',
                    'User.Email',
                ])
                .getMany();
            response.send(post);
        } catch (error) {
            response.status(404).send('post not found');
        }
    }
}
