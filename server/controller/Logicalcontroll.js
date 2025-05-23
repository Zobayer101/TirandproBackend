const con = require("../database/database");
const jwt = require("jsonwebtoken");
exports.UserRitrive = async (req, res) => {
  let page = parseInt(req.query.page) || 2;
  let limit = parseInt(req.query.limit) || 10;
  let offset = (page - 1) * limit;

  const queary = `SELECT   u.user_id,
    u.Name,
    u.Age,
    u.Profile,
    u.Varified,
    u.Online,
    COUNT(m.media_id) AS media_count
    
    FROM userData u
    LEFT JOIN multimedia m ON u.user_id = m.user_id
    GROUP BY u.user_id
     ORDER BY RAND() LIMIT  ?,?`;
  con.query(queary, [offset, limit], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      
      res.status(200).json(result);
    }
  });
};

exports.FromGaccount = async (req, res) => {
  let findquery = `SELECT *FROM userData WHERE email="${req.email}"`;
  con.query(findquery, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      if (result.length > 0) {
        let info = {
          user_id: result[0].user_id,
          email: result[0].Email,
          accountstatus: result[0].accountstatus,
          premium: result[0].Primumuser,
        };
        let Token = jwt.sign(info, process.env.secret);
        res.status(200).json({ info, Token });
      } else {
        let Inquery = `INSERT INTO
  userData(Email,Gendar,wantGendar,Varified,Primumuser,accountstatus)
   VALUES ("${req.email}","${req.body.Geander.mygen}","${
          req.body.Geander.yourgen
        }","${false}","${false}","${false}");`;
        con.query(Inquery, (err, output) => {
          if (err) {
            res.status(500).json(err);
          } else {
            let info = {
              user_id: output.insertId,
              email: req.email,
              accountstatus: 0,
              premium: 0,
            };
            let Token = jwt.sign(info, process.env.secret);
            res.status(200).json({ info, Token });
          }
        });
      }
      //console.log(result);
    }
  });
};
