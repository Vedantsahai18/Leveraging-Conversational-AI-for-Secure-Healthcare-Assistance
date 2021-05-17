import UserModel from '../models/user.models';
declare global {
    namespace Express {
        interface User extends UserModel {
        }
    }
}
export default function PassportModelsGenerate(): Promise<void>;
//# sourceMappingURL=Passport.d.ts.map