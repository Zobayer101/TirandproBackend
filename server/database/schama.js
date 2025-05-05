exports.TableCreates = (con) => {
  const aboutquery = `CREATE TABLE  IF NOT EXISTS aboutme (
            about_id INT  AUTO_INCREMENT PRIMARY KEY,
            Livein VARCHAR(20),
            Language VARCHAR(20),
            Relationship VARCHAR(20),
            Kid BOOLEAN,
            Smoke VARCHAR(10),
            Drink VARCHAR(10),
            Height VARCHAR(10),
            Bodytype VARCHAR(10),
            Eyes VARCHAR(10),
            Hair VARCHAR(10),
            
            create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
  //Create a table
  con.query(aboutquery, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`UserData table create successfuly !`);

      const userQuary = `CREATE TABLE IF NOT EXISTS
    userData (
           user_id INT AUTO_INCREMENT PRIMARY KEY,
            Email VARCHAR(50),
            Pass VARCHAR(100),
            Name VARCHAR(50),
            Age VARCHAR(20),
            Gendar VARCHAR(20),
            DateOfBarth DATE,
            Profile VARCHAR(100),
            Bio VARCHAR(700),
            AboutPartner VARCHAR(800),
            Intarast JSON,
            Varified BOOLEAN,
            Online BOOLEAN,
            Coverphoto VARCHAR(100),
            PrivatePhoto JSON,
            PublicePhoto JSON,
            Primumuser BOOLEAN,
            about_id INT,
            FOREIGN KEY (about_id) REFERENCES aboutme(about_id) ON DELETE CASCADE,
            create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

                );`;
      //-------------------------------------------

      con.query(userQuary, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("about table created");
        }
      });
    }
  });
};
