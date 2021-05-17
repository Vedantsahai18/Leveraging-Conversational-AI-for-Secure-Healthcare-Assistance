declare module 'express-session' {
    interface SessionData {
        user: UserModel;
        client_token: string;
    }
}
import { Router } from 'express';
import UserModel from '../models/user.models';
declare const router: Router;
export default router;
//# sourceMappingURL=index.d.ts.map