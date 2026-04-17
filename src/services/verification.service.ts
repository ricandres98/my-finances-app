import bcrypt from "bcrypt"
import { config } from "@/config";
import { sequelize } from "@/libs/sequelize";
import { TOKEN_TYPES, VerificationToken } from "@/types/verificationToken.type";
import { generateNumericCode } from "@/utils/generateNumericCode";
import { userService } from "./user.service";
import { Model } from "sequelize";
import { PendingUser } from "@/types/user.types";

const verificationService = {
  generateVerificationToken: async (email: VerificationToken["email"]) => {
    // Verificar si ese usuario ya existe en la DB
    const isUserInDB = await userService.find(email);

    if (isUserInDB) {
      throw new Error("Usuario ya registrado");
    }

    // Verificar si ya existe un token asociado a dicho email
    const existingCode = await sequelize.models.VerificationToken.findOne({
      where: {
        email,
      }
    });

    // Si existe se elimina la entrada para crear un nuevo código
    if (existingCode) {
      existingCode.destroy();
    }

    const code = generateNumericCode(6);

    // ELIMINAR CONSOLE.LOG AL IMPLEMENTAR ENVIO DE EMAIL
    console.log("---------------> CODIGO DE VERIFICACION: ", code);

    // Enviar token por email
    // -----


    // Hashear Token
    const hashedCode = await bcrypt.hash(code, config.hashingSaltRound);

    // Almacenar token en DB
    const expirationDate = new Date(Date.now() + 20 * 60 * 1000); // Vence en 20 minutos

    const newToken = await sequelize.models.VerificationToken.create({
      email,
      token: hashedCode,
      type: TOKEN_TYPES.EMAIL_VERIFICATION,
      expires: expirationDate
    });

    return newToken.dataValues.id as number;
  },

  validateVerificationToken: async (email: VerificationToken["email"], token: VerificationToken["token"]) => {
    // Validar si el código existe
    const existingCode = await sequelize.models.VerificationToken.findOne<Model<VerificationToken>>({
      where: {
        email,
      }
    });

    if (!existingCode) {
      throw new Error("Código inválido");
    }
    
    // Validar si el código ha expirado
    if (existingCode.dataValues.expires < new Date()) {
      existingCode.destroy();
      throw new Error("Código expirado");
    }

    // Validar el tipo de código
    if (existingCode.dataValues.type !== TOKEN_TYPES.EMAIL_VERIFICATION) {
      throw new Error("Código inválido");
    }

    const storedToken = existingCode.dataValues.token;
    
    const isVerified = await bcrypt.compare(token, storedToken);

    console.log("====> RESULTADO VERIFICACIÓN DE CÓDIGO: ", isVerified);

    return isVerified;
  },

  savePendingUser: async (username: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, config.hashingSaltRound);

    await sequelize.models.PendingUser.create({
      username,
      email,
      passwordHash: hashedPassword,
    });
  },

  editPendingUser: async (username: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, config.hashingSaltRound);

    const pendingUser = await sequelize.models.PendingUser.findOne({
      where: {
        email,
      }
    });

    await pendingUser?.update({
      email,
      username,
      password: hashedPassword,
    });
  },

  getPendingUser: async (email: string) => {
    return await sequelize.models.PendingUser.findOne<Model<PendingUser>>({
      where: {
        email
      }
    });
  },

  findEmailByTokenId: async (tokenId: number) => {
    const verificationToken = await sequelize.models.VerificationToken.findOne({
      where: {
        id: tokenId,
      }
    });

    return verificationToken ? verificationToken.dataValues.email : null;
  }
};

export { verificationService }