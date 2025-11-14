import {Router} from 'express'
import { AnnouncementController } from '../controllers/announcementController'
const router=Router();
const announcementcontroller= new AnnouncementController();
router.post('/announcement',announcementcontroller.createAnnouncement)
router.get('/announcement',announcementcontroller.getAllAnnouncements)
export default router;