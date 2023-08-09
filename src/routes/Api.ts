import { Router } from 'express';
// import * as expressJwt from 'express-jwt';

import V1 from '../controllers/v1'


const router = Router();

router.use('/v1', V1);

router.get('*', (req, res, next) => {
    return res.status(404).json({
        message: 'Route not found'
    })
})

export default router;
