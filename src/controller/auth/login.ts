import { Response, Request } from "express";
import { User, UserInterface } from "../../model/user";
import { tokenGenerator } from "../../utils/jwt";

export async function login(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body;

  try {
    const user = (await User.findOne({ email })) as UserInterface | null;
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const userId = user.id;
    const token = tokenGenerator(userId, "365d");
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}