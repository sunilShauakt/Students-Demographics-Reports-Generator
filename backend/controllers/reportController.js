const PDFDocument = require('pdfkit');
const Student = require('../models/Student');
const User = require('../models/User'); // Ensure User model is imported
const State = require('../models/State');
const City = require('../models/City');

// Generate and download student demography report
exports.downloadReport = async (req, res) => {
  try {
    const students = await Student.find()
      .populate('user_id', 'username')
      .populate('state_id', 'name')
      .populate('city_id', 'name');

    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', 'attachment; filename=student_report.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    doc.fontSize(20).text('Student Demography Report', { align: 'center' });
    doc.moveDown();

    students.forEach((student, index) => {
      doc.fontSize(12).text(`Roll No: ${student.roll_no}`);
      doc.text(`Name: ${student.name}`);
      doc.text(`Degree Level: ${student.degree_level}`);
      doc.text(`Gender: ${student.gender}`);
      doc.text(`Employment Status: ${student.employment_status}`);
      doc.text(`Added By: ${student.user_id.username}`);
      doc.text(`State: ${student.state_id.name}`);
      doc.text(`City: ${student.city_id.name}`);
      doc.moveDown();

      if (index !== students.length - 1) {
        doc.addPage();
      }
    });

    doc.end();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Generate and download a single student's report
exports.downloadSingleUserReport = async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findById(studentId)
      .populate('user_id', 'username')
      .populate('state_id', 'name')
      .populate('city_id', 'name');

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', `attachment; filename=student_${student.roll_no}_report.pdf`);
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    doc.fontSize(20).text('Student Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Roll No: ${student.roll_no}`);
    doc.text(`Name: ${student.name}`);
    doc.text(`Degree Level: ${student.degree_level}`);
    doc.text(`Gender: ${student.gender}`);
    doc.text(`Employment Status: ${student.employment_status}`);
    doc.text(`Added By: ${student.user_id.username}`);
    doc.text(`State: ${student.state_id.name}`);
    doc.text(`City: ${student.city_id.name}`);

    doc.end();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
