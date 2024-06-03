import express from 'express';
import { AssignMentor, AssignStudentOfMentor, CreateMentor, getMentor } from '../Controllers/MentorController.js';
import { CreateStudent, FindPreviousMentor, WithoutMentor, getStudent } from '../Controllers/StudentController.js';

const router=express.Router();

router.post('/mentor',CreateMentor)
router.get('/mentor',getMentor)

router.get('/student',getStudent)
router.post('/student',CreateStudent)

router.get('/studentwithoutmentor',WithoutMentor)
router.get('/previousmentor/:id',FindPreviousMentor)

router.put('/assignstudents/:id',AssignStudentOfMentor)
router.put('/assignmentor/:id',AssignMentor)


export default router;