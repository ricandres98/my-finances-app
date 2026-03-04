const config = {
    nodeEnv: process.env.NODE_ENV || 'development',
    postgresDb: process.env.POSTGRES_DB,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    hashingSaltRound: Number(process.env.HASHING_SALT_ROUND),
    jwtSecret: process.env.JWT_SECRET,
}

export { config };