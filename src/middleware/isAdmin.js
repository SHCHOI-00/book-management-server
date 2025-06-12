// src/middleware/isAdmin.js
module.exports = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: '관리자만 접근 가능합니다.' });
  }
  next();
};
