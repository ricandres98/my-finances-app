import { config } from "@/config";
import { sequelize } from "@/libs/sequelize";
import { CreateUserDto, User } from "@/types/user.types";
import bcrypt from "bcrypt";

class UserService {
	async create(data: CreateUserDto): Promise<[null, true] | [Error, null]> {
		try {
			const { email, password, username } = data;
			const userExists = await this.find(email);

			if (userExists) {
				return [new Error("Email ya registrado"), null]
			}

			await sequelize.models.User.create({
				email,
				username,
				password: await bcrypt.hash(password, config.hashingSaltRound),
			});
			return [null, true];

		} catch(error) {
			return [error as Error, null];
		}
	}

	async find(email: User["email"]) {
		return await sequelize.models.User.findOne({ where: { email: email } })
	}

	delete() { }

	update() { }
}

export { UserService };