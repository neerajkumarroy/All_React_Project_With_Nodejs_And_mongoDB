import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const connection = async () => {
    const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.zh42dct.mongodb.net/`;

    try {
        await mongoose.connect(URL);         
        console.log("Database connected successfully");
        
    } catch (err) {
        console.log("Error occurred during the database connection.", err);
    }
};

export default connection;
