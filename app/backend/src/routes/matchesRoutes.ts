import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { inProgress } = req.query;

  if (inProgress !== undefined) {
    return matchController.getAllByInProgress(req, res);
  }

  return matchController.getAllMatches(req, res);
});

export default router;
