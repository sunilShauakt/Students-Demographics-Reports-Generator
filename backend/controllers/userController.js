const User = require("../models/User");
const sendMail = require("../utils/mailer");

// Fetch all users with a specific status
exports.getUsersByStatus = async (req, res) => {
  const { status } = req.query;

  // Check if status is valid
  if (!["pending", "approved", "rejected", "all"].includes(status)) {
    return res.status(400).json({ msg: "Invalid status" });
  }

  try {
    let users;
    if (status === "all") {
      users = await User.find({ role: "USER" });
    } else {
      users = await User.find({ role: "USER", status });
    }

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update user status
exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  // Check if status is valid
  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({ msg: "Invalid status" });
  }

  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.status = status;
    await user.save();

    // Send email to user about status update
    const subject = "Account Status Update";
    const text = `Hello ${user.firstName},\n\nYour account status has been updated to: ${status}.\n\nBest regards,\nYour Team`;

    await sendMail(user.email, subject, text);

    res.json({ msg: "User status updated and email sent", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Fetch the count of users according to their status
exports.getUserCountByStatus = async (req, res) => {
  try {
    const countByStatus = await User.aggregate([
      { $match: { role: "USER" } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = countByStatus.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    // Ensure all statuses are included in the response
    const allStatuses = ["pending", "approved", "rejected"];
    allStatuses.forEach((status) => {
      if (!result[status]) {
        result[status] = 0;
      }
    });

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
