const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER_PASSWORD}@cluster0.7lpcn.mongodb.net/dimer?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("connected to mongo db");
  })
  .catch((err) => {
    console.log("fail to connect to mongo db", err);
  });
