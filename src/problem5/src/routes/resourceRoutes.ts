import { Router } from 'express';
import * as resourceController from '../controllers/resourceController';

const router = Router();

router.post('/', resourceController.createResource);
router.get('/', resourceController.listResources);
router.get('/:id', resourceController.getResource);
router.put('/:id', resourceController.updateResource);
router.delete('/:id', resourceController.deleteResource);

export default router;
