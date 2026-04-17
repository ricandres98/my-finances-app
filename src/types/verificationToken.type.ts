enum TOKEN_TYPES {
  EMAIL_VERIFICATION = "email_verification",
  PASSWORD_RESET = "password_reset"
}

type VerificationToken = {
  id: number,
  email: string,
  token: string,
  type: TOKEN_TYPES,
  expires: Date,
  createdAt: Date,
}

export type { VerificationToken };
export { TOKEN_TYPES};