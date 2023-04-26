let config = {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    jwt:{
        expiryTime: (process.env.JWT_EXPIRY_TIME)?process.env.JWT_EXPIRY_TIME:0, //Eg - "10h" or "20d" or "120s"
        secretKey: "test"
    },
    finvu: {
        baseUrl: "https://loantap.fiulive.finfactor.co.in/finsense/API/V1",
    },
    sequelize: {
        dialect : 'mysql',
        logging : false,
        replication: {
            read: [{
                host: process.env.RDS_RO_HOST,
                username: process.env.RDS_RO_USERNAME,
                password: process.env.RDS_RO_PASSWORD,
                database: process.env.RDS_DATABASE
            }],
            write: {
                host: process.env.RDS_RW_HOST,
                username: process.env.RDS_RW_USERNAME,
                password: process.env.RDS_RW_PASSWORD,
                database: process.env.RDS_DATABASE
            }
        },
        dialectOptions: {
            charset: 'utf8mb4'
        },
        pool: {
            maxConnections: process.env.RDS_MAX_CONNECTIONS,
            maxIdleTime: 2000
        },
    }
};

module.exports = config;