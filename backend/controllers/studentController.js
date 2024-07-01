const Student = require('../models/Student');

// Add a new student - Only accessible by admins
exports.addStudent = async (req, res) => {
  const {
    roll_no,
    state_id,
    city_id,
    degree_level,
    name,
    gender,
    employment_status
  } = req.body;

  try {
    // Ensure the roll_no is unique
    let student = await Student.findOne({ roll_no });
    if (student) {
      return res.status(400).json({ msg: 'Roll number already exists' });
    }

    // Create new student
    student = new Student({
      roll_no,
      user_id: req.user.id,
      state_id,
      city_id,
      degree_level,
      name,
      gender,
      employment_status
    });

    await student.save();
    res.json({ msg: 'Student added successfully', student });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a student - Only accessible by admins
exports.updateStudent = async (req, res) => {
  const { studentId } = req.params;
  const {
    roll_no,
    state_id,
    city_id,
    degree_level,
    name,
    gender,
    employment_status
  } = req.body;

  try {
    let student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    student.roll_no = roll_no || student.roll_no;
    student.state_id = state_id || student.state_id;
    student.city_id = city_id || student.city_id;
    student.degree_level = degree_level || student.degree_level;
    student.name = name || student.name;
    student.gender = gender || student.gender;
    student.employment_status = employment_status || student.employment_status;

    await student.save();
    res.json({ msg: 'Student updated successfully', student });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Remove a student - Only accessible by admins
exports.removeStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    let student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    await student.deleteOne();
    res.json({ msg: 'Student removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Fetch all students - Only accessible by admins
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('user_id', 'username').populate('state_id', 'name').populate('city_id', 'name');

    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getStudentCountByGenderAndState = async (req, res) => {
    try {
      const countByGenderAndState = await Student.aggregate([
        {
          $group: {
            _id: { gender: '$gender', state: '$state_id' },
            count: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: 'states',
            localField: '_id.state',
            foreignField: '_id',
            as: 'state',
          },
        },
        {
          $unwind: '$state',
        },
        {
          $project: {
            _id: 0,
            gender: '$_id.gender',
            state: '$state.name',
            count: 1,
          },
        },
      ]);
  
      res.json(countByGenderAndState);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
