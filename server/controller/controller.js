const con = require("../database/database");
const jwt = require("jsonwebtoken");
const AgeCal = require("../middleware/webtoken");

exports.Signup = async (req, res) => {
  const { email, pass, Igender, wgender, firstR, lastR } = req.body;

  const InsertQuery = `INSERT INTO
  userData(Email,Pass,Gendar,wantGendar,ageRange,Varified,Primumuser,accountstatus)
   VALUES ("${email}","${pass}","${Igender}","${wgender}","${
    firstR + "," + lastR
  }","${false}","${false}","${false}");`;
  con.query(InsertQuery, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else if (result) {
      let Token = jwt.sign(
        { user_id: result.insertId, email, accountstatus: 0, premium: 0 },
        process.env.secret
      );
      let info = {
        user_id: result.insertId,
        email,
        accountstatus: 0,
        premium: 0,
      };
      res.status(200).json({ info, Token });
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
          let info = {
            user_id: result[0].user_id,
            email: result[0].Email,
            accountstatus: result[0].accountstatus,
            premium: result[0].Primumuser,
          };
          let Token = jwt.sign(info, process.env.secret);

          res.status(200).json({ info, Token });
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
  const { Name, DateOfBarth, Location } = req.body.aboutme;
  const myage = AgeCal.calculateAge(DateOfBarth);

  const { mypartner, aboutI } = req.body.partner;
  const Itemdata = req.body.item;
  let qu = `UPDATE userData SET 
  Name=?,Age=?, DateOfBarth=?, Location=?,
  Intarast=?, Bio=?, AboutPartner=?,accountstatus=? WHERE user_id=?`;
  const values = [
    Name,
    myage,
    DateOfBarth,
    Location,
    JSON.stringify(Itemdata),
    aboutI,
    mypartner,
    true,
    req.user_id,
  ];
  con.query(qu, values, (err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const Info = {
        user_id: req.user_id,
        email: req.email,
        accountstatus: 1,
        premium: 0,
      };
      res.status(200).json(Info);
    }
  });
};

//profile uploader;
exports.ProfileUploader = async (req, res) => {
  const fileName = req.file?.filename;

  const queary = `UPDATE userData SET Profile="${fileName}" WHERE user_id=${req.user_id}`;
  con.query(queary, (err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({ data: "ok" });
    }
  });
};

//get myprofile data
exports.Myprofiledata = async (req, res) => {
  try {
    let ID = req.user_id;
    let id = req.body.id;

    let qu = `SELECT *FROM userData WHERE user_id=${id || ID}`;
    con.query(qu, (err, result) => {
      if (err) {
        res.status(500), json(err);
      } else {
        res.status(200).json(result[0]);
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//About me from data update
exports.UpdateAboutMe = async (req, res) => {
  let id = req.user_id;
  let data = JSON.stringify(req.body);

  let qu = `UPDATE userData SET AboutMe =?  wHERE user_id=?`;
  let value = [data, id];
  con.query(qu, value, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

//Intarest myprofile data update
exports.MyprofileInterestDataUpdate = async (req, res) => {
  let id = req.user_id;
  let data = JSON.stringify(req.body);
  let qu = `UPDATE userData SET Intarast =?  wHERE user_id=?`;
  let value = [data, id];
  con.query(qu, value, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

exports.LookingForDataUpdate = async (req, res) => {
  let id = req.user_id;

  let data = req.body.mypertener;
  let qu = "UPDATE userData SET  	AboutPartner=? WHERE user_id=?";
  let value = [data, id];
  con.query(qu, value, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

//Private photo Insert
exports.PrivatePhotoupload = async (req, res) => {
  let id = req.user_id;
  const fileName = req.file?.filename;
  const qu = `INSERT INTO multimedia (status,photo,user_id)
   VALUES('private',"${fileName}",${id})`;

  con.query(qu, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json({ msg: "ok" });
    }
  });
};

// Public Photo upload update
exports.PublicPhotoUpload = async (req, res) => {
  let id = req.user_id;
  const fileName = req.file?.filename;
  const qu = `INSERT INTO multimedia (status,photo,user_id)
   VALUES('public',"${fileName}",${id})`;

  con.query(qu, (err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({ msg: "ok" });
    }
  });
};
//  api function CoverPhoto update
exports.CoverPhotoUpdate = async (req, res) => {
  const fileName = req.file?.filename;

  const queary = `UPDATE userData SET Coverphoto="${fileName}" WHERE user_id=${req.user_id}`;
  con.query(queary, (err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({ data: "ok" });
    }
  });
};
