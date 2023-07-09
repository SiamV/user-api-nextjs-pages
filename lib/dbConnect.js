import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://avers3452:CNnjXyGvwzcVO85a@cluster0.hvvtq6e.mongodb.net/usersapi"

const dbConnect = async () => mongoose.connect(MONGODB_URI);

export default dbConnect;
