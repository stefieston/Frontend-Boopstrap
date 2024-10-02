const path = require("path");
const UserService = require("../services/userService");

class RegisterController {
	getRegisterPage(req, res) {
		res.sendFile(path.join(__dirname, "../views/register.html"));
	}

	async register(req, res) {
		try {
			const userData = req.body;
			const user = await UserService.registerUser(userData);
			res.status(201).json(user);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
}

module.exports = new RegisterController();
