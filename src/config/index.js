require("dotenv").config();
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
                host: process.env.DB_HOST,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            }],
            write: {
                host: process.env.DB_HOST,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            }
        },
        dialectOptions: {
            charset: 'utf8mb4'
        },
        pool: {
            maxConnections: process.env.RDS_MAX_CONNECTIONS,
            maxIdleTime: 2000
        },
    },
    development: {
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        dialect : 'mysql'
    }
};

module.exports = config;