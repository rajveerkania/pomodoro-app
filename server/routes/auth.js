const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Sign Up

router.post("/signup", async (req, res) => {
  try {
    const { uid, email, password } = req.body;
    const hashpassword = bcrypt.hashSync(password);
    const user = new User({ uid, email, password: hashpassword });
    await user.save().then(() => res.status(200).json({ email: email }));
  } catch (error) {
    res
      .status(400)
      .json({ message: "The username/email has already been registered!" });
  }
});

// Sign In

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ message: "Please Signup first!" });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      res.status(403).json({ message: "Incorrect Password" });
    }

    // To Display every detail of the user other than password
    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (error) {}
});

module.exports = router;
