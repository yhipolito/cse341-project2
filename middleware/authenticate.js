const isAuthenticated = (req, res, next) => {
    // Use Passport's built-in check or check if req.user exists
    if (!req.isAuthenticated() || req.user === undefined) {
        return res.status(401).json("You do not have access.");
    }
    next();
};

module.exports = {
    isAuthenticated
};
