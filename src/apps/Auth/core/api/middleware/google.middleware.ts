import { NextFunction, Request, Response } from 'express';

export const isGoogleAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};
