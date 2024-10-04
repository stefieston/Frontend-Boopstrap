const UserRepository = require("../repositories/userRepository");

class UserService {
	async registerUser(userData) {
		const { documentNumber, userName } = userData;

		const existingUserByDocument = await UserRepository.findByDocumentNumber(
			documentNumber
		);
		if (existingUserByDocument) {
			throw new Error(
				"The Document Number " + documentNumber + " is already registered."
			);
		}

		const existingUserByUserName = await UserRepository.findByUserName(
			userName
		);
		if (existingUserByUserName) {
			throw new Error("The username " + userName + " is already taken.");
		}

		return UserRepository.createUser(userData);
	}

	async loginUser(userData) {
		const { password, userName } = userData;
		const existingUserByUserName = await UserRepository.findByUserName(
			userName
		);

		if (existingUserByUserName == null) {
			throw new Error("Error the username does not exist.");
		}

		if (existingUserByUserName.password !== password) {
			throw new Error("The password is incorrect.");
		}
	}
}

module.exports = new UserService();
