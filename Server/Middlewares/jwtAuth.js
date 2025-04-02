import JWT from "jsonwebtoken";

export const jwtAuth = async (req, res, next) => {
  const token = req.headers.token || req.cookies.token;

  if (!token) {
    return res.status(400).json({
      error: "unauthorized user plaese login again",
    });
  }

  const decoded =  JWT.verify(token, process.env.JWT_SECRET);

    if(!decoded){
      res.status(401).json({error: "Invalid token"})
    }
  req.user = decoded;
  req.user

  next();
};
