const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    try {
      const db = req.app.get("db");
      const { username, hash } = req.body;
      const user = db.find_user([username]);
      //checking if username is already in use
      if (user.length > 0) {
        return res.status(400).send({ message: "username in use" });
      }
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(hash, salt);
      const newUser = await db.create_user({ username, password });
      req.session.user = newUser[0];
      delete newUser[0].password;
      res.status(200).send({
        message: "Registered & Logged In",
        user: req.session.user,
        loogedIn: true
      });
    } catch (err) {
      res.status(500).send({ message: "Failed to Register" });
    }
  },
  getSession: (req, res) => {
    if (req.session) {
      res.status(200).send(req.session);
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send({ message: "Your Logged Out" });
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    try {
      const user = await db.find_username([username]);
      var result = bcrypt.compareSync(password, user[0].hash);
      // console.log("hit", user);
      if (result) {
        //deleting user password then putting user info on session
        delete user[0].password;
        req.session.user = user[0];
        return res.status(200).send({
          message: "Logged In",
          user: req.session.user,
          loggedIn: true
        });
      }
    } catch (err) {
      res.status(500).send({ message: "Failed to Login" });
    }
  }
};
