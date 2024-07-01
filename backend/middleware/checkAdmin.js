module.exports = function (req, res, next) {
    if (req.user.role != 'ADMIN') {
      return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }
    next();
  };
  