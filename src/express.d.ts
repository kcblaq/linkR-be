import { ObjectId } from 'mongodb'; // or the appropriate type for your MongoDB _id

declare global {
  namespace Express {
    interface User {
      _id: ObjectId;
      // Add other properties of your user object here
    }

    interface Request {
      user?: User;
    }
  }
}