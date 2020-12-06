const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "")
    const decode = jwt.verify(token, "himanshurahi")
    req.user = decode
    next()
  } catch (error) {
    res.status(401).send({msg : "Access Denied"});
  }
};

module.exports = auth
