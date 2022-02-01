import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not Valid" });
    }
  } else {
    return res.status(401).json({ msg: "No Token, Authorization denied" });
  }
};

export default authMiddleware;
