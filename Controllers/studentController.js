
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.getAll = async (req, res) => {
  const students = await prisma.student.findMany();
  res.json(students);
};

exports.create = async (req, res) => {
  const { name, email, class: studentClass, gender } = req.body;  
  const photo = req.file ? req.file.filename : req.body.photo;
  const student = await prisma.student.create({
    data: { name, email, class: studentClass, gender, photo }
  });
  res.json(student);
};

exports.getById = async (req, res) => {
  const student = await prisma.student.findUnique({ where: { id: +req.params.id } });
  res.json(student);
};

exports.update = async (req, res) => {
  const studentBefore = await prisma.student.findUnique({ where: { id: +req.params.id } });
  const student = await prisma.student.update({ where: { id: +req.params.id }, data: req.body });
  res.json(student);
};

exports.remove = async (req, res) => {
  const student = await prisma.student.delete({ where: { id: +req.params.id } });
  res.json({ message: "Deleted" });
};