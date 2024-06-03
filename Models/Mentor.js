import mongoose from 'mongoose';

const MentorSchema = new mongoose.Schema({
  name: String,
  students: []
});

const Mentor= mongoose.model('Mentor', MentorSchema);
 export default Mentor;

