const express = require('express');
const router = express.Router();
const studentController = require('../Controllers/studentController');
const authController = require('../Controllers/authController');
const auth = require('../Middleware/authMiddleware');
const roleCheck = require('../Middleware/roleMiddleware');
const upload = require('../utils/multer');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/getAllStudents', auth, roleCheck(['ADMIN', 'TEACHER']), studentController.getAll);
router.post('/students', auth, roleCheck(['ADMIN']), studentController.create);
router.get('/students/:id', auth, studentController.getById);
router.put('/students/:id', auth, roleCheck(['ADMIN']), studentController.update);
router.delete('/students/:id', auth, roleCheck(['ADMIN']), studentController.remove);

router.post('/upload', auth, upload.single('photo'), studentController.create);

module.exports = router;