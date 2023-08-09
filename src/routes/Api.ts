import { Router } from 'express';
import * as expressJwt from 'express-jwt';

import Locals from '../providers/Locals';

import V1 from '../controllers/v1'


const router = Router();

router.get('/v1/', V1.index);

export default router;
