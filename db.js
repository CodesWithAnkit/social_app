const mongodb = require("mongodb");

const connectionString =
  "mongodb+srv://webans:13a11a0501@cluster0-eya59.mongodb.net/social_app_data?retryWrites=true&w=majority";
mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    module.exports = client.db();
    const app = require("./app");
    app.listen(3000);
  }
);
