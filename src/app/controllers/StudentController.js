import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            age: Yup.number().required(),
            weight: Yup.boolean().required(),
            height: Yup.boolean().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Invalid data' });
        }

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

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email().required(),
            age: Yup.number(),
            weight: Yup.boolean(),
            height: Yup.boolean(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Invalid data' });
        }

        // if (!req.body.email) {
        //     return res.status(400).json({ error: "You must type student's email" });
        // }
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
