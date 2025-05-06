const con = require("../database/database");

exports.UserRitrive = async (req, res) => {
  
  let page = parseInt(req.query.page) || 2;
  let limit = parseInt(req.query.limit) || 10;
  let offset = (page - 1) * limit;
  console.log(req.user_id);
  const queary = `SELECT * FROM userData ORDER BY RAND() LIMIT  ?,?`;
  con.query(queary, [offset, limit], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
  
};
