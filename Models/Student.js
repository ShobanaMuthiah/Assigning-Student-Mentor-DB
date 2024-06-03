import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: String,
  mentor: String,
  PrevMentor:String
});

 const Student= mongoose.model('Student', StudentSchema);
 export default Student;

// import mongoose from 'mongoose';

// const StudentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   mentor: { type: String, default: null }  // Store mentor name directly
// });

// const Student = mongoose.model('Student', StudentSchema);
// export default Student;
