export function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            const err = new Error('You do not have permission to perform this action');
            err.status = 403;
            return next(err);
        }
        return next();
    }
}