import mongoose from "mongoose"
import logger from "../utility/log";

export const mongoConnection =async () => {
    let dbUrl= process.env.DB_URL || 'mongodb://127.0.0.1:27017/MERN'
    // `mongodb+srv://raxitbambharoliya:raxit08@cluster0.h789rwv.mongodb.net/lampMERN`
    mongoose.connect(dbUrl);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        logger.info('Connected to MongoDB 💓💓💓 ');
    });
}
