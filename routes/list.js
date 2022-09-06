import express from 'express';
import { getLists,getList,getOwnLists,createList,updateList,deleteList, getListsBySearch} from '../controlers/list.js';

const router = express.Router();
import auth from '../middleware/auth.js'

// WARN: secure route
router.get('/', getLists);
router.get('/ownLists/:myid', getOwnLists);
router.get('/search', getListsBySearch);
router.get('/:id', getList);

router.post('/', createList);
router.get('/:id', getList);
router.patch('/:id', updateList);
router.delete('/:id', deleteList);
 
export default router;
