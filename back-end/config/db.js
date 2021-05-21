import mongoose from "mongoose";
mongoose
  .connect(
    `mongodb+srv://dimer:mitsubishi@cluster0.7lpcn.mongodb.net/dimer?retryWrites=true&w=majority`,
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
