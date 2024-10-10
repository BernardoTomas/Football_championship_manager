import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import ValidateAuth from '../middlewares/validateAuthTokenMiddleware';
import ValidateMatchMiddleware from '../middlewares/verifyMatchIdsMiddleware';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { inProgress } = req.query;

  if (inProgress !== undefined) {
    return matchController.getAllByInProgress(req, res);
  }

  return matchController.getAllMatches(req, res);
});

router.patch(
  '/:id/finish',
  ValidateAuth.validateAuthToken,
  (req: Request, res: Response) => matchController.updateMatchEnd(req, res),
);

router.patch(
  '/:id',
  ValidateAuth.validateAuthToken,
  (req: Request, res: Response) => matchController.updateMatchScore(req, res),
);

router.post(
  '/',
  ValidateAuth.validateAuthToken,
  ValidateMatchMiddleware.validateIds,
  (req: Request, res: Response) => matchController.createNewMatch(req, res),
);

export default router;
