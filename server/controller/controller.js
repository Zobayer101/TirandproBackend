const con = require("../database/database");

exports.Signup = async (req, res) => {
  const { email, pass, Igender, wgender, firstR, lastR } = req.body;

  console.log(req.body);

  const InsertQuery = `INSERT INTO
  userData(Email,Pass,Gendar,wantGendar,ageRange,Varified,Primumuser,accountstatus)
   VALUES ("${email}","${pass}","${Igender}","${wgender}","${
    firstR + "," + lastR
  }","${false}","${false}","${false}");`;
  con.query(InsertQuery, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else if (result) {
      console.log(result.insertId);
      res.status(200).json({
        user_id: result.insertId,
        email,
        accountstatus: 0,
        premium: 0,
      });
    }
  });
};

exports.LoginData = async (req, res) => {
  const { email, pass } = req.body;
  const getquery = `SELECT * FROM userData WHERE email="${email}"`;
  con.query(getquery, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      if (result.length > 0) {
        if (result[0].Pass == pass) {
          res.status(200).json({
            user_id: result[0].user_id,
            email: result[0].Email,
            accountstatus: result[0].accountstatus,
            premium: result[0].Primumuser,
          });
        } else {
          res.status(200).json({ errmsg: "wrong password !" });
        }
      } else {
        res.status(200).json({ errmsg: "use not found" });
      }
    }
  });
};

//modal value will update
// exports.UpdateData = async (req, res) => {
//   // const { profile, id } = req.body;
//   console.log(req.body);
//   res.json("ok");
//   // const dbquery = `UPDATE userData SET profile ="${profile}"  wHERE id=${id} `;
//   // con.query(dbquery, (err) => {
//   //   if (err) {
//   //     res.status(500).json(err);
//   //   } else {
//   //     res.status(200).json("ok");
//   //   }
//   // });
// };
exports.MoreDataAdd = async (req, res) => {
  console.log(req.body);
  res.status(200).json("ok");
};

//profile uploader;
exports.ProfileUploader = async (req, res) => {
  res.send("ok");
};
