const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../Middleware/authMiddleware');
const roleCheck = require('../Middleware/roleMiddleware');

router.get('/', auth, roleCheck(['ADMIN']), async (req, res) => {
  const logs = await prisma.auditLog.findMany({ include: { user: true, student: true }, orderBy: { timestamp: 'desc' } });
  res.json(logs);
});

module.exports = router;