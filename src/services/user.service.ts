import { config } from "@/config";
import { sequelize } from "@/libs/sequelize";
import { CreateUserDto, User } from "@/types/user.types";
import bcrypt from "bcrypt";
import { Model } from "sequelize";

const userService = {
	async create(data: CreateUserDto, options?: { hashPassword: boolean }) {
		try {
			const { email, password, username } = data;
			const userExists = await this.find(email);

			if (userExists) {
				return {
					success: false,
					message: "Email ya registrado",
					error: new Error("Email ya registrado"),
				}
			}

			const newUser = await sequelize.models.User.create({
				email,
				username,
				password: options?.hashPassword ? await bcrypt.hash(password, config.hashingSaltRound) : password,
			});
			return {
				success: true,
				message: newUser.dataValues.id as number,
				error: null
			}

		} catch(error) {
			return {
				success: false,
				message: (error as Error).message,
				error: new Error((error as Error).message),
			}
		}
	},

	async find(email: User["email"]): Promise<Model<User> | null> {
		return await sequelize.models.User.findOne({ where: { email: email } })
	},
	
	async findByIdRaw(id: User["id"]): Promise<User> {
		return await sequelize.models.User.findOne({ where: { id }, raw: true }) as unknown as User;
	},

	delete() { },

	update() { },
}

export { userService };