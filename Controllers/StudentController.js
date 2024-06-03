import Student from "../Models/Student.js";

//creating or posting student details into the db
export const CreateStudent=async (req, res) => {
    const newStudent = new Student(req.body);
    try {
      const student = await newStudent.save();
      res.json(student);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  export const delStudent=async(req,res)=>{
    try {
      const studId=req.params.id;
      const stud=await Mentor.deleteOne({_id:studId});
      if(stud.matchedCount===0){
          res.status(404).json({message:"not found"})
      }
  res.status(200).json({message:"data deleted",data:stud})
  
      
    } catch (error) {
      res.status(500).json({error:error})
      
    }
  }

  //get student details
  export const getStudent=async (req,res)=>{
    const studDetails=await Student.find();
    console.log(studDetails)
    if(studDetails.length===0){
      res.status(200).json({message:"There is no more data inserted yet"})
    }
    res.status(200).json({message:"data fetched sucessfully",data:studDetails})
}


  export const WithoutMentor=async (req,res)=>{
    try {
        const students=await Student.find({mentor:{$exists:false}})
        res.status(200).json({message:"data fetched",data:students})

    } catch (error) {
     res.status(500).json({message:"Internal Server Error"})   
    }
}

export const FindPreviousMentor=async (req,res)=>{
  const id=req.params.id;
  
      try {
          // Find the student by ID and populate the mentor field
          const student = await Student.findById(id).populate('PrevMentor');
          if (!student) {
              return res.status(404).json({ message: "Student not found" });
          }
  if(!student.PrevMentor){
    res.status(200).json({message:"No more Previous Mentor for this student"})
  }          // Return the student details along with the populated mentor details
          res.status(200).json({
              message: "Previous mentor of the student fetched successfully",
              Previous_Mentor: student.PrevMentor
          });
      } catch (error) {
          console.error("Internal server error:", error);
          res.status(500).json({ message: "Internal server error", error: error.message });
      }
  };