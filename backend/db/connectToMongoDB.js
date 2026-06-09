import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        const uri = process.env.MONGO_DB_URI;
        await mongoose.connect(uri); // No options required for Node.js Driver 4.0+
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};



export default connectToMongoDB