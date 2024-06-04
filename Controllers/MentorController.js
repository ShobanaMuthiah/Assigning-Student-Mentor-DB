import Mentor from "../Models/Mentor.js";
import Student from "../Models/Student.js";

export const CreateMentor=async (req, res) => {
  const newMentor = new Mentor(req.body);
  try {
    const mentor = await newMentor.save();
    res.json(mentor);
  } catch (err) {
    res.status(500).send(err);
  }
};
export const getAMentor=async (req,res)=>{
  try {
    
    const ID=req.params.id;
    const mentor=await Mentor.findById({_id:ID});
    if(mentor.matchedCount===0){
      res.status(404).json({message:"mentor not found"})
    }
    res.status(200).json({message:"successfully fetch data",data:mentor})

  } catch (error) {
    res.status(500).json({message:"Internal server Error"})
    
  }

}

export const getMentor=async (req,res)=>{
    const mentorDetails=await Mentor.find();
    console.log(mentorDetails)
    if(mentorDetails.matchedCount===0){
      res.status(404).json({message:"There is no more data inserted yet"})
    }

    res.status(200).json({message:"successfully fetch data",data:mentorDetails})
}

export const delMentor=async(req,res)=>{
  try {
    const menId=req.params.id;
    const ment=await Mentor.deleteOne({_id:menId});
    if(ment.matchedCount===0){
        res.status(404).json({message:"not found"})
    }
res.status(200).json({message:"data deleted",data:ment})
    
  } catch (error) {
    res.status(500).json({error:error})
    
  }
}
export const AssignMentor = async (req, res) => {
  try {
      const studId = req.params.id;
      const { mentor } = req.body;

      // Find the student by ID
      const student = await Student.findById(studId);
      if (!student) {
          return res.status(404).json({ message: "Student not found" });
      }

      // Find the mentor by name
      const mentorDoc = await Mentor.findOne({ name: mentor });
      if (!mentorDoc) {
          return res.status(404).json({ message: "Mentor not found" });
      }

      // Check if the student has a current mentor
      if (student.mentor) {
        
          // Add the current mentor to the PreviousMentor array if it exists
          await Student.updateOne(
              { _id: studId },
              {  PrevMentor: student.mentor  }
          );
      }

      // Assign the new mentor
      student.mentor = mentorDoc.name;
      await student.save();

      // Return the updated student data
      return res.status(200).json({ message: "Mentor assigned", data: student });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
  }
};

    


export const AssignStudentOfMentor = async (req, res) => {
    // Extract mentor ID from URL parameters
    try {
      const mentorId = req.params.id;
      const { students } = req.body;

      const mentor = await Mentor.findById(mentorId);
      if (!mentor) {
          return res.status(404).json({ message: "Mentor not found" });
      }

      const studentsToUpdate = await Student.find({ _id: { $in: students } });

      for (let student of studentsToUpdate) {
          if (student.mentor) {
              const previousMentor = await Mentor.findOne({ name: student.mentor });
              if (previousMentor) {
                  previousMentor.students = previousMentor.students.filter(sId => sId.toString() !== student._id.toString());
                  await previousMentor.save();
              }
          }

          student.PrevMentor = student.mentor;
          student.mentor = mentor.name;
          await student.save();
      }

      mentor.students = mentor.students.concat(students.filter(sId => !mentor.students.includes(sId)));
      await mentor.save();

      res.status(200).json({ message: "Students assigned to mentor", data: mentor });
  } catch (error) {
      console.error('Error assigning students:', error);
      res.status(500).json({ message: "Internal server error" });
  }}
