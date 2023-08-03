import dbConnect from '../../../lib/dbConnect';
import UserDB from '../../../models/UsersModel';
// import { GetEndPoints } from '../../../servicesEndPoints/endPoins';

const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      /* GetEndPoints.metodGetAll() */
      try {
        const users = await UserDB.find({}); /* find all the data in our database */
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const user = await UserDB.create(req.body) /* create a new model in the database */
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(404).json({ success: false });
      break;
  }
}

export default dbConnect(handler);
