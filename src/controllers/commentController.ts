import { Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { Comment } from "../entity/Comment";
import { User } from "../entity/User";
import { Announcement } from "../entity/Announcement";

const commentRepository = AppDataSource.getRepository(Comment);
const userRepository = AppDataSource.getRepository(User);
const announcementRepository = AppDataSource.getRepository(Announcement);

export class CommentController {
  async createComment(req: Request, res: Response) {
    const { content, userId, announcementId } = req.body;

    const user = await userRepository.findOneBy({ id: userId });
    const announcement = await announcementRepository.findOneBy({ id: announcementId });

    if (!user || !announcement) {
      return res.status(404).json("User or Announcement not found");
    }

    const comment = commentRepository.create({ content, author: user, announcement });
    await commentRepository.save(comment);

    return res.status(201).json(comment);
  }

  async getComments(req: Request, res: Response) {
    const { announcementId } = req.params;
    const comments = await commentRepository.find({
      where: { announcement: { id: Number(announcementId) } },
      relations: ["author"],
    });
    return res.json(comments);
  }
}