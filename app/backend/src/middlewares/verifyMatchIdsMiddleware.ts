import { Request, Response, NextFunction } from 'express';
import IMatch from '../Interfaces/IMatch';

export default class ValidateMatchMiddleware {
  static validateIds(req: Request, res: Response, next: NextFunction): Response | void {
    const newMatch: IMatch = req.body;

    if (newMatch.homeTeamId === newMatch.awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    return next();
  }
}
