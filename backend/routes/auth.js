const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

//SIGN-UP

router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = new User({ email, username, password: hashPassword });
    await user.save().then(() => res.status(200).json({ user: user }));
  } catch (error) {
    res.status(400).json({ message: "User already exists" });
    console.log("user already exists", error);
  }
});

//SIGN-IN

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found, Please Sign-up." });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (error) {
    res.status(400).json({ message: "User does not exist." });
  }
});

module.exports = router;
