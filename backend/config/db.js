import mongoose from "mongoose";

const connectDB = async()=>{
    // console.log(process.env.MONGO_URI)
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo Db connected on ${conn.connection.host}`)
    } catch (error) {
        console.log("errrrrror: ", error)
        process.exit(1);
    }


};

export default connectDB;