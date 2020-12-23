import { Category } from './../entity/Category';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from './../entity/Post';

export class PostController {
    async save(request: Request, response: Response) {
        console.log(request.body['Categories']);
        let post = Post.create(request.body as Post);

        post.User = request.session.user!;
        post.Categories = request.body['Categories'] as Category[];

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

        const postRepository = getRepository(Post);
        try {
            const post = await postRepository.findOneOrFail(postId, {
                relations: ['Categories', 'User'],
            });
            response.send(post);
        } catch (error) {
            response.status(404).send('post not found');
        }
    }
}
