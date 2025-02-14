import handleAsyncError from "../middleware/handleAsyncError.js";
import HandleError from "../utils/handleError.js";
import User from "../models/userModel.js";

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

  const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    user,
    token,
  });
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
  const token = user.getJWTToken();
  res.status(200).json({
    success: true,
    user,
    token
  })
});
