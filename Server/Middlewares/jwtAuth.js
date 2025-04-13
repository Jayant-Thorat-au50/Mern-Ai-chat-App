import JWT from "jsonwebtoken";

export const jwtAuth = async (req, res, next) => {
  const token = req.headers.token || req.body.token;

  console.log(req.body)
  
  

  if (!token) {
    return res.status(400).json({
      error: "unauthorized user plaese login again",
    });
  }

  const decoded =  JWT.verify(token, process.env.JWT_SECRET);

    if(!decoded){
      res.status(401).json({message: "Invalid token"})
    }
  req.user = decoded;
  req.user

  next();
};
