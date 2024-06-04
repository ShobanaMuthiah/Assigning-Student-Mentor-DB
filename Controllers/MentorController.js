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
    if(mentor.length===0){
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
    if(mentorDetails.length===0){
      res.status(200).json({message:"There is no more data inserted yet"})
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
export const AssignMentor=async (req,res)=>{

    try{
        
    const studId=req.params.id;
    const {mentor}=req.body;
const current=await Student.findOne({_id:studId})
        const mentors=await Mentor.findOne({name:mentor})

        const students=await Student.findOne({mentor:{$exists:false}})
        if(students){
            await Student.updateOne({_id:studId},{$set:{ mentor:mentors.name}})
            const update=await Student.findById({_id:studId})
res.status(200).json({message:"mentor assigned",data:update})
        }
        const stud=await Student.findOne({mentor:{$exists:true}})
       if(stud){
        if(stud.PrevMentor){
        await Student.updateOne({_id:studId},{$addToSet:{PrevMentor:stud.mentor}})
        }

        else{

          await Student.updateOne({_id:studId},{$set:{PrevMentor:current.mentor}})
        }
        await Student.updateOne({_id:studId},{$addToSet:{ mentor:mentors.name}})
            const updates=await Student.findById({_id:studId})
res.status(200).json({message:"mentor assigned",data:updates})
       }
    }
    catch(error){
        res.status(500).json({message:"internal server error"})

    }
}

    


export const AssignStudentOfMentor = async (req, res) => {
  const { students } = req.body;  // Expect a single student name in the request body
  const mentorId = req.params.id;  // Extract mentor ID from URL parameters
  try {
  
    // Find the mentor by ID
    const mentors = await Mentor.findById({_id:mentorId});

    // Find the student by _id

    console.log(`Finding student with name: ${students}`);
    let student = await Student.findOne({ _id:students });

   
   // Check if the student already has a mentor
   if (student.mentor) {
    console.log(`Student ${students} already assigned to mentor: ${student.mentor}`);
    res.status(404).json({ message: "Student has already been assigned to a mentor" });
  }
    // Assign the mentor to the student
    student.mentor = mentors.name;  // Use the mentor's ObjectId
    await student.save();
    console.log(`Assigned mentor ${mentors.name} to student ${students}`);

    // Update the mentor's students array using updateOne
    await Mentor.updateOne(
      { _id: mentorId },
      {$addToSet:{students: student._id}} // add many students for a mentor
    );
    console.log(`Updated mentor's students array with student ${students}`);
    // Fetch the updated mentor to include in the response
    const updatedMentor = await Mentor.find({_id:mentorId});

    res.status(200).json({ message: 'Student assigned to mentor', data:  updatedMentor  });
  } catch  {
    res.status(500).json({ message: "Internal Server Error"});
  }
}
