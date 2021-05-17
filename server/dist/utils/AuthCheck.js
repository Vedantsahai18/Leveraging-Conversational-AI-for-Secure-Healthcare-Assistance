"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDoctor = exports.IsPatient = exports.IsAuthenticated = void 0;
function IsAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    return res.redirect('/');
}
exports.IsAuthenticated = IsAuthenticated;
function IsPatient(req, res, next) {
    if (req.isAuthenticated() && req.user.schema === 'Patient')
        return next();
    return res.redirect('/');
}
exports.IsPatient = IsPatient;
function IsDoctor(req, res, next) {
    if (req.isAuthenticated() && req.user.schema === 'Doctor')
        return next();
    return res.redirect('/');
}
exports.IsDoctor = IsDoctor;
//# sourceMappingURL=AuthCheck.js.map