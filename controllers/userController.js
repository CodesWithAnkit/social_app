const User = require("../models/User");

exports.login = () => {};

exports.logout = () => {};

exports.register = function(req, res) {
  let user = new User(req.body);
  user.register();
  if (user.errors.length) {
    res.send(user.errors);
  } else {
    res.send("Congrates, there are no errors");
  }

  res.send("Thanks for trying to register");
};

exports.home = (req, res) => {
  res.render("home-guest");
};
