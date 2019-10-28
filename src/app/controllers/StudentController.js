import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    const { email } = req.body;

    const checkStudent = await Student.findOne({ where: { email } });

    if (checkStudent) {
      return res
        .status(400)
        .json({ error: 'This email already belongs to a student' });
    }

    const student = await Student.create(req.body);

    const { name, age, height, weight } = student;

    return res.json({
      name,
      email,
      age,
      height,
      weight,
    });
  }

  async update(req, res) {
    console.log(req.params.id);
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    const { email, name, age, weight, height } = req.body;

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }
    if (email) {
      const checkNewEmail = await Student.findOne({ where: { email } });

      if (checkNewEmail) {
        return res
          .status(400)
          .json({ error: 'This email already belongs to a student' });
      }
    }

    const updatedStudent = await student.update(req.body);

    const { id } = updatedStudent;
    return res.json({
      id,
      name,
      email,
      weight,
      height,
      age,
    });
  }
}

export default new StudentController();
