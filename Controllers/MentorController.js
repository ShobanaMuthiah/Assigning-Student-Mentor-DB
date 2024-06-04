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
const prev=await Student.findById({_id:students})
    // Update PrevMentor field for students who already have a mentor
    await Student.updateMany(
        { _id:students}, {PrevMentor:prev.mentor }
    );


    // Update mentor field for students
    await Student.updateMany(
        { _id:students},
        { mentor: mentor.name }
    );

    await Mentor.updateMany(
      { _id:mentorId},
      { students:students }
  );
  const updated=await Mentor.findById({_id:mentorId})

    res.status(200).json({ message: "Students assigned to mentor",data:updated});
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
}
}
