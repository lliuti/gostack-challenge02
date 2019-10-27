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
        if (!req.body.email) {
            return res.status(400).json({ error: "You must type student's email" });
        }
        const { email, name, new_email, age, weight, height } = req.body;
        
        const student = await Student.findOne({ where: { email: email } });

        if (!student) {
            return res.status(400).json({ error: 'Student not found' });
        }
        if (new_email) {
            const checkNewEmail = await Student.findOne({ where: { email : new_email } });

            if (checkNewEmail) {
                return res.status(400).json({ error: 'This email already belongs to a student' });
            }

            req.body.email = new_email;
        }
    
        const updatedStudent = await student.update(req.body);

        return res.json(updatedStudent);
    };
}

export default new StudentController();
