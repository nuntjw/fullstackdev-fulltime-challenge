import AUTH_TOKEN from "app/constants/authToken";

const authApiKey = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).end();

  if (authorization.replace(/Bearer /, "") !== AUTH_TOKEN.TOKEN) {
    return res.status(401).end();
  }

  next();
};

export default authApiKey;
