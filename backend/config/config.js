var Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(['development', 'production', 'test', 'provision'])
        .default('development'),
    MONGO_HOST: Joi.string().required().description('Mongo DB host url'),
    MONGO_PORT: Joi.number().default(27017),
    WEB3_PROVIDER: Joi.required().description('Web3 provier required to connect etherem network'),
    CONTRACT_ABI: Joi.required().description('Contract ABI required for smart contract'),
    CONTRACT_ACCOUNT: Joi.required().description('Contract account required for smart contract'),
    GAS_PRICE: Joi.number().default(1),
    GAS_LIMIT: Joi.number().default(100000)
}).unknown()
.required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
};

const config = {
    env: envVars.NODE_ENV,
    jwtSecret: envVars.JWT_SECRET,
    mongo: {
        host: envVars.MONGO_HOST,
        port: envVars.MONGO_PORT
    },
    web3Provider: envVars.WEB3_PROVIDER,
    contractABI: envVars.CONTRACT_ABI,
    contractAccount: envVars.CONTRACT_ACCOUNT,
    system: {
        address: envVars.SYSTEM_ADDRESS,
        keyStore: envVars.SYSTEM_KEYSTORE,
        account: envVars.SYSTEM_ACCOUNT
    },
    testAccounts: envVars.TEST_ACCOUNTS,
    commonPassword: envVars.COMMON_PASSWORD,
    gasPrice: envVars.GAS_PRICE,
    gasLimit: envVars.GAS_LIMIT
};

module.exports = config;