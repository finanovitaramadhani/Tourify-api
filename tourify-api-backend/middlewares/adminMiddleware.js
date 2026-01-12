module.exports = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Akses ditolak. Hanya admin."
    });
  }
  next();
};

module.exports = (req, res, next) => {
  console.log("ROLE USER:", req.user.role);
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Akses ditolak. Hanya admin." });
  }
  next();
};
