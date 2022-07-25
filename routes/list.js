import express from 'express';
import { getLists,getList,getOwnLists,createList,updateList,deleteList} from '../controlers/list.js';

const router = express.Router();
import auth from '../middleware/auth.js'


router.get('/', getLists);
router.get('/',auth, getOwnLists);
router.post('/',auth, createList);
router.get('/:id',auth, getList);
router.patch('/:id',auth, updateList);
router.delete('/:id',auth, deleteList);
 
export default router;
