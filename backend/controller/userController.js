import handleAsyncError from "../middleware/handleAsyncError.js";
import HandleError from "../utils/handleError.js";
import User from "../models/userModel.js";
import { sendToken } from "../utils/jwtToken.js";

export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is temp id",
      url: "This is temp url",
    },
  });
  sendToken(user, 201, res)
});

export const loginUser = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return next(new HandleError("Email or password cannot be empty", 400));
  }
  
  const user = await User.findOne({email}).select("+password");
  if(!user){
    return next(new HandleError("Invalid Email or password", 401))
  }

  const isPasswordValid = await user.verifyPassword(password);
  if(!isPasswordValid){
    return next(new HandleError("Invalid Email or password", 401))
  }
  sendToken(user, 200, res)
});
