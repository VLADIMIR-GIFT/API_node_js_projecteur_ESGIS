exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Accès interdit" });
    }
  };
  
  exports.isTeacher = (req, res, next) => {
    if (req.user && req.user.role === "teacher") {
      next();
    } else {
      res.status(403).json({ message: "Accès interdit" });
    }
  };
  
  exports.isStudent = (req, res, next) => {
    if (req.user && req.user.role === "student") {
      next();
    } else {
      res.status(403).json({ message: "Accès interdit" });
    }
  };