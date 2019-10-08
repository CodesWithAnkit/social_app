const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");

router.get("/", userController.home);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.get("/about", (req, res) => {
  res.send("This is our about us page");
});
module.exports = router;

// It is the routers job to list out all of the urls routs that we are on lookout for
