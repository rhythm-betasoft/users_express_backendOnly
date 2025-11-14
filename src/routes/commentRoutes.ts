import {Router} from 'express'
import {CommentController} from '../controllers/commentController'
const router=Router()
const commentcontroller=new CommentController();
router.post('/comment',commentcontroller.createComment);
router.get('/comment/:announcementId',commentcontroller.getComments);
export default router;
