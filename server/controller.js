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
      res
        .status(200)
        .send({
          message: "Registered & Logged In",
          user: req.session.user,
          loogedIn: true
        });
    } catch (err) {
      res.status(500).send({ message: "Failed to Register" });
    }
  }
};
