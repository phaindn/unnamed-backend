import { Router } from 'express';
import { INext, IRequest, IResponse } from '../../interfaces/vendors';
import Locals from '../../providers/Locals';

const router = Router()

router.get('/check', (req: IRequest, res: IResponse, next: INext) => {
	return res.json({
		message: Locals.config().name,
		time: Date.now()
	});
})

export default router;
