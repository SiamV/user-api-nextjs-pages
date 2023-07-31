import DbConnect from '../../../lib/dbConnect'
import UserDB from '../../../models/UsersModel'

export default async function Handler(req, res) {
  const { method } = req

  await DbConnect()

  switch (method) {
    case 'GET':
      try {
        const users = await UserDB.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(404).json({ success: false })
      }
      break
    case 'POST':
      try {
        const user = await UserDB.create(
          req.body
        ) /* create a new model in the database */
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        res.status(404).json({ success: false })
      }
      break
    default:
      res.status(404).json({ success: false })
      break
  }
}
