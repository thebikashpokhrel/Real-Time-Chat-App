import mongoose from "mongoose";
export const dbConnect = async () => {
  try {
    if (mongoose.connection.readyState) {
      console.log("Already connected to the database");
      return;
    }
    await mongoose.connect(process.env.MONGODB_CONNECTION_URI!);
    mongoose.connection.on("connected", () => {
      console.log("Connected to database successfully");
    });

    mongoose.connection.on("error", (error) => {
      console.log("Could not connect to database");
      throw error;
    });
  } catch (error: unknown) {
    console.log("Internal server error");
    throw error;
  }
};
