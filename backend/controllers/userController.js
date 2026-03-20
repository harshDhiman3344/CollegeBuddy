import User from "../models/User.js";

export const syncUser = async (req, res) => {
  try {
    const { clerkId, username, email } = req.body;

    if (!clerkId || !username || !email) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = new User({
        clerkId,
        username,
        email,
      });
      await user.save();
    }

    res.status(200).json({
      success: true,
      user,
      message: "User synced successfully",
    });
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({
      success: false,
      message: "Error syncing user",
      error: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { clerkId } = req.params;

    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};
