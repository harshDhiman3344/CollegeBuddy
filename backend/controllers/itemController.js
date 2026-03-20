import Item from "../models/Item.js";
import User from "../models/User.js";

export const createItem = async (req, res) => {
  try {
    const { title, description, price, clerkId } = req.body;

    if (!title || !description || !price || !clerkId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const item = new Item({
      title,
      description,
      price,
      seller: user._id,
    });

    await item.save();
    await item.populate("seller", "username email clerkId");

    res.status(201).json({
      success: true,
      item,
      message: "Item created successfully",
    });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({
      success: false,
      message: "Error creating item",
      error: error.message,
    });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate("seller", "username email clerkId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching items",
      error: error.message,
    });
  }
};

export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id).populate("seller", "username email clerkId");

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching item",
      error: error.message,
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { clerkId } = req.body;

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    const seller = await User.findById(item.seller);
    if (seller.clerkId !== clerkId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this item",
      });
    }

    await Item.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting item",
      error: error.message,
    });
  }
};
