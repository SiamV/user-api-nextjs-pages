import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient('mongodb+srv://test2:qazqaz1234@test2.87cvhy1.mongodb.net/test2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  req.dbClient = client;
  req.db = client.db('MCT');
  return next();
}

const middleware = nextConnect();
//- error src\lib\database.js (15:30) @ nextConnect
// - error Error [TypeError]: (0 , next_connect__WEBPACK_IMPORTED_MODULE_1__.default) is not a function
//     at eval (webpack-internal:///(api)/./src/lib/database.js:22:76) {
//   digest: undefined
// }

middleware.use(database);

export default middleware;
