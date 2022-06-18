const User = require("../Model/User");

exports.signUpRoute = async (req, res, next) => {
  const { email, password } = req.body;

  const emailRegexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  // console.log(emailRegexp.test(emailToValidate));
  try {
    if (!email) {
      return res
        .status(200)
        .json({ status: false, message: "Plz fill the email" });
    }
    if (!password) {
      return res
        .status(200)
        .json({ status: false, message: "Plz fill the password" });
    }
    if (!emailRegexp.test(email)) {
      res.status(200).json({ status: false, message: "Email is not valid" });
      return false;
    }
    if (!regularExpression.test(password)) {
      res.status(200).json({
        status: false,
        message:
          "plz fill valid password  */ fill one lowercase,one uppercase, one digit,valid 6 to 16",
      });
      return false;
    }
    const result = await User.create({
      email: email,
      password: password,
    });

    if (result) {
      return res.status(201).json({
        status: true,
        message: "user is successfull register",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({ status: false,
      message: "user is not registered",data: error });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(500).json({status: false, message: "Invalid Credentials" });
  }

  // if (password === "") {
  //   return res.status(500).json({ message: "Please enter valid password" });
  // }

  try {
    const result = await User.findOne({
      where: { email: email, password: password },
    });
    if (!result) {
      return res.status(500).json({status: false, message: "Invalid email or password" });
    }
    return res.status(200).json({
      status: true,
      message: "Login successfully",
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false,message: "Error occurs, Please try again", data: error });
  }
};

