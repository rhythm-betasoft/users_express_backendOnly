import {Request,Response} from "express";
import { AppDataSource } from "../dataSource";
import { Announcement } from "../entity/Announcement";
import {User} from "../entity/User"

const announcementRepository=AppDataSource.getRepository(Announcement);
const userRepository=AppDataSource.getRepository(User);

export class AnnouncementController{
    async createAnnouncement(req:Request,res:Response){
        const{title,content,userId}=req.body;
        const user=await userRepository.findOneBy({id:userId});
        if(!user||user.role !== "admin"){
        return    res.status(403).json("Only Admins are allowed to share announcements")
        }
        const announcement=announcementRepository.create({title,content,author:user})
        await announcementRepository.save(announcement);

    return res.status(201).json(announcement);
    }

    async getAllAnnouncements(req:Request,res:Response){
        try{
            const announcements=await announcementRepository.find({relations:["author"]})
            return res.status(200).json(announcements)
        }
        catch(error){
            console.log("error Fetching")
            return res.status(400).json("Error Fetching announcements")
        }
    }
}