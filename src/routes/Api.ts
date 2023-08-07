import { Router } from 'express';
import * as expressJwt from 'express-jwt';

import Locals from '../providers/Locals';

import HomeController from '../controllers/Api/Home';


const router = Router();

router.get('/', HomeController.index);

export default router;
