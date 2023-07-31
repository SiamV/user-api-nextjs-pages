import mongoose from 'mongoose'

mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
  "name": {
    type: String,
    require: true
  },
  "email": {
    type: String,
    require: true
  },
  "password": {
    type: String,
    require: true
  },
  "register_date": {
    type: String,
    require: true
  },
}, {
  versionKey: false
})

const UserDB = mongoose.models.UserDB || mongoose.model('UserDB', UserSchema);
export default UserDB
