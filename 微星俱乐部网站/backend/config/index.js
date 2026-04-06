module.exports = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'msi-club-secret-key-2026',
    jwtExpiresIn: '7d',
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 27017,
        name: process.env.DB_NAME || 'msi_club',
        username: process.env.DB_USERNAME || '',
        password: process.env.DB_PASSWORD || ''
    },
    upload: {
        maxSize: 5 * 1024 * 1024,
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif']
    },
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true
    }
};
