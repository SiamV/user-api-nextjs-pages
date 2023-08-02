import dbConnect from '../../../lib/dbConnect';
import UserDB from '../../../models/UsersModel';

const handler = async (req, res) => {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const user = await UserDB.findById(id)
        if (!user) {;
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(404).json({ success: false });
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const user = await UserDB.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(404).json({ success: false });
      }
      break;

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedUser = await UserDB.deleteOne({ _id: id });
        if (!deletedUser) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(404).json({ success: false });
      }
      break;

    default:
      res.status(404).json({ success: false })
      break;
  }
}

export default dbConnect(handler);
