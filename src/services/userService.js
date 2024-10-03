const UserRepository = require("../repositories/userRepository");

class UserService {
	async registerUser(userData) {
		const { documentNumber, username } = userData;

		const existingUserByDocument = await UserRepository.findByDocumentNumber(
			documentNumber
		);
		if (existingUserByDocument) {
			throw new Error(
				"The Document Number " + documentNumber + " is already registered."
			);
		}

		const existingUserByUsername = await UserRepository.findByUsername(
			username
		);
		if (existingUserByUsername) {
			throw new Error("The username " + username + " is already taken.");
		}

		return UserRepository.createUser(userData);
	}

	async loginUser(userData) {
		const { password, username } = userData;
		const existingUserByUsername = await UserRepository.findByUsername(
			username
		);

		if (
			existingUserByUsername == null ||
			existingUserByUsername.password !== password
		) {
			throw new Error("error en usuario usuario o contraseña.");
		}
	}
}

module.exports = new UserService();
