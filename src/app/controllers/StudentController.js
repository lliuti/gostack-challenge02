import Student from '../models/Student';

class StudentController {
    async store(req, res) {
        const { email } = req.body;

        const checkStudent = await Student.findOne({ where: { email: email } });
       
        if (checkStudent) {
            return res.status(400).json({ error: 'This email already belongs to a student' });
        }

        const student = await Student.create(req.body);

        const { name, age, height, weight } = student;

        return res.json({ name, email, age, height, weight });
    };

    async update(req, res) {
        return res.status(200).json({ ok: true });
    };
}

export default new StudentController();
