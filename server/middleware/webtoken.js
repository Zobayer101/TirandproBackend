const jwt = require("jsonwebtoken");

exports.VarifieadToken = (req, res, next) => {
  try {
    
    //console.log(req.headers.token);
    if (req.body?.Gaccount) {
      let decode = jwt.decode(req.headers.token);

      req.email = decode.email;
      req.name = decode.name;
      return next();
    } else {
      let token = req.headers.token.split(`"`)[1];

      let decode = jwt.verify(token, process.env.secret);
      req.user_id = decode?.user_id;
      req.email = decode?.email;
      req.accountstatus = decode?.accountstatus;
      req.premium = decode?.premium;
      return next();
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ err: "somthing want wrong !" });
  }
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
