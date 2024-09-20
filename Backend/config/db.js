import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://dadben08:Joseph12@cluster0.hw1nm.mongodb.net/Spicy-del"
    )
    .then(() => console.log("Connected to MongoDB"));
};
