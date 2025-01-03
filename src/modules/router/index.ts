import {
  adminRoutes,
  categoryRoutes,
  FileRoutes,
  googleRoutes,
  ProductRoutes,
  userRoutes,
} from 'apps';
import { Router } from 'express';
import { DevRoutes } from 'modules/features';

export class RouterModule {
  private static router: Router;

  public static getRouter(): Router {
    if (!RouterModule.router) {
      RouterModule.router = Router();
      RouterModule.initializeRoutes();
    }
    return RouterModule.router;
  }

  private static initializeRoutes(): void {
    RouterModule.router.use('', DevRoutes);
    RouterModule.router.use('/user', userRoutes);
    RouterModule.router.use('/google', googleRoutes);
    RouterModule.router.use('/admin', adminRoutes);
    RouterModule.router.use('/category', categoryRoutes);
    RouterModule.router.use('/file', FileRoutes);
    RouterModule.router.use('/product', ProductRoutes);
  }
}
