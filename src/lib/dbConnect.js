import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI

const dbConnect = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // If DB is connected use current connection
    return handler(req, res);
  }
  // Else use new db connection
  await mongoose.connect(`${MONGODB_URI}`);
  return handler(req, res);
};

export default dbConnect;
