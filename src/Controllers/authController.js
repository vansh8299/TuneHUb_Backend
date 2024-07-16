const authService = require("../Services/authService");
exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const message = await authService.register(email, password, role);
    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const token = await authService.login(email, password, role);

    res.json(token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getUserProfile = async (req, res) => {
  try {
    const user = await authService.getUserProfile(req.user._id);
    if (!user) {
      res.json({ message: "user not found" });
    }
    res.json(user);
  } catch (error) {
    res.json({ message: error.message });
  }
};
