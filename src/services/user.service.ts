import { config } from "@/config";
import { sequelize } from "@/libs/sequelize";
import { CreateUserDto, User } from "@/types/user.types";
import bcrypt from "bcrypt";
import { Model } from "sequelize";

const userService = {
	async create(data: CreateUserDto): Promise<[null, number] | [Error, null]> {
		try {
			const { email, password, username } = data;
			const userExists = await this.find(email);

			if (userExists) {
				return [new Error("Email ya registrado"), null]
			}

			const newUser = await sequelize.models.User.create({
				email,
				username,
				password: await bcrypt.hash(password, config.hashingSaltRound),
			});
			return [null, newUser.dataValues.id as number];

		} catch(error) {
			return [error as Error, null];
		}
	},

	async find(email: User["email"]): Promise<Model<User> | null> {
		return await sequelize.models.User.findOne({ where: { email: email } })
	},

	delete() { },

	update() { },
}

export { userService };