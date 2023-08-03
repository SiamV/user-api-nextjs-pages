import UserDB from "../models/UsersModel";
import dbConnect from "../lib/dbConnect"; //how connect DB here? We don't have a handler to put her.

class EndPoints {
    async metodGetAll() {
        try {
            const users = await UserDB.find({}); /* find all the data in our database */
            res.status(200).json({ success: true, data: users });
        } catch (error) {
            res.status(400).json({ success: false });
        }
    };
}

export const GetEndPoints = new EndPoints;
