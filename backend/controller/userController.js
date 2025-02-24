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
  sendToken(user, 201, res);
});

export const loginUser = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new HandleError("Email or password cannot be empty", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new HandleError("Invalid Email or password", 401));
  }

  const isPasswordValid = await user.verifyPassword(password);
  if (!isPasswordValid) {
    return next(new HandleError("Invalid Email or password", 401));
  }
  sendToken(user, 200, res);
});

// Logout
export const logout = handleAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "succesfully logged out",
  });
});

// Reset Password
export const requestPasswordReset = handleAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new HandleError("User doens't exist", 400));
  }

  let resetToken;

  try {
    resetToken = user.generatePasswordResetToken();
    await user.save({validateBeforeSave: false});
  } catch (error) {
    return next(
      new HandleError("Could not save reset token, please try again later", 500)
    );
  }

  const resetPasswordUrl = `http://localhost/api/v1/reset/${resetToken}`;
  const message = `Use the following link to reset your password: ${resetPasswordUrl}. 
  \n\n This link will expire in 30 minutes. \n\n If you didn't request a password
  reset, please ignore this message.`

  try {
    
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({validateBeforeSave: false});
    return next(
      new HandleError("Email couldn't be sent, please try again later", 500)
    );
  }
});
