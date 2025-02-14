import JWT from "jsonwebtoken";

export const jwtAuth = async (req, res, next) => {
  const token = req.cookies.token;

  console.log(token);
  

  if (!token) {
    return res.status(400).json({
      error: "unauthorized user plaese login again",
    });
  }

  const payload =  JWT.verify(token, process.env.JWT_SECRET);

  req.user = payload;

  next();
};
