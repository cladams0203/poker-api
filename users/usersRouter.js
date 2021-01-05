const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("./usersModel");
const { generateToken, validateToken } = require("../middleware");

router.post("/register", (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 6);
  Users.findByEmail(user.email).then((found) => {
    if (found) {
      res.status(401).json({ message: "Email already exists" });
    } else {
      Users.insert(user)
        .then((newUser) => {
          const token = generateToken(newUser);
          delete newUser.password;
          res
            .status(201)
            .json({ message: "Registration Successful", token, user: newUser });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: "Unable to register user", error: err.message });
        });
    }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  !email || !password
    ? res.status(403).json({ message: "Please provide email and password" })
    : Users.findByEmail(email)
        .then((user) => {
          if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            delete user.password;
            res.status(200).json({ message: "Login Successful", token, user });
          }
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: "Unable to login user", error: err.message });
        });
});

router.get("/", validateToken, (req, res) => {
  const id = req.user.id;
  Users.findById(id)
    .then((user) => {
      delete user.password;
      res.status(200).json(user);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "unable to find user ", error: err.message });
    });
});

module.exports = router;
