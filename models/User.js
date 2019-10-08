const usersCollection = require("../db").collection("user");
const validator = require("validator");
let User = function(data) {
  this.data = data;
  this.errors = [];
};

User.prototype.cleanUp = function() {
  if (typeof this.data.username != "string") {
    this.data.username = "";
  }
  if (typeof this.data.email != "string") {
    this.data.email = "";
  }
  if (typeof this.data.password != "string") {
    this.data.password = "";
  }

  // Get rid of any bogus peoperties
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password
  };
};

User.prototype.validate = function() {
  if (this.data.username == "") {
    this.errors.push("You must Provide a username.");
  }
  if (
    this.data.username != "" &&
    !validator.isAlphanumeric(this.data.username)
  ) {
    this.errors.push("Username only contain letters and number");
  }
  if (!validator.isEmail(this.data.email)) {
    this.errors.push("You must Provide a valid email address.");
  }
  if (this.data.password == "") {
    this.errors.push("You must Provide a password.");
  }
  if (this.data.password.length > 0 && this.data.password.length < 12) {
    this.errors.push("Password must be at least 12 characters");
  }
  if (this.data.password.length > 100) {
    this.errors.push("Password cannot exceed 100 charachters.");
  }
  if (this.data.username.length > 0 && this.data.username.length < 3) {
    this.errors.push("Username must be at least 12 characters");
  }
  if (this.data.username.length > 50) {
    this.errors.push("Username cannot exceed 50 charachters.");
  }
};

User.prototype.login = function(callback) {
  this.cleanUp();
  usersCollection.findOne(
    { username: this.data.username },
    (err, attemptedUser) => {
      if (attemptedUser && attemptedUser.password == this.data.password) {
        callback("Congratas");
      } else {
        callback("Invalid username");
      }
    }
  );
};
User.prototype.register = function() {
  // Step #1: Validate user data

  this.cleanUp();
  this.validate();
  // Step #2: only if there are no validation errors, then save the user data into a database

  if (!this.errors.length) {
    usersCollection.insertOne(this.data);
  }
};
module.exports = User;
