const { PrismaClient } = require('../prisma/generated/prisma/client.js');

const prisma = new PrismaClient();

module.exports = prisma;


