const jwt = require("jsonwebtoken");

exports.VarifieadToken = (req, res, next) => {
  try {
    let token = req.headers.token.split(`"`)[1];

    let decode = jwt.verify(token, process.env.secret);

    req.user_id = decode.user_id;
    req.email = decode.email;
    req.accountstatus = decode.accountstatus;
    req.premium = decode.premium;
    next();
  } catch (error) {
    res.status(404).json({ err: "somthing want wrong !" });
  }
  // if (!req.headers.token) {
  //   next();
  // }
};

exports.calculateAge = (dateString) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  // Check if birthday hasn't occurred yet this year
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};
