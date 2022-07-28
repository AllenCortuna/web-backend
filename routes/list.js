import express from 'express';
import { getLists,getList,getOwnLists,createList,updateList,deleteList} from '../controlers/list.js';

const router = express.Router();
// import auth from '../middleware/auth.js'


router.get('/', getLists);
router.get('/', getOwnLists);
router.post('/', createList);
router.get('/:id', getList);
router.patch('/:id', updateList);
router.delete('/:id', deleteList);
 
export default router;
