import express from 'express';
import { AssignMentor, AssignStudentOfMentor, CreateMentor, delMentor, getAMentor, getMentor } from '../Controllers/MentorController.js';
import { CreateStudent, FindPreviousMentor, WithoutMentor, delStudent, getAStudent, getStudent } from '../Controllers/StudentController.js';

const router=express.Router();

router.post('/mentor',CreateMentor)

router.get('/mentor',getMentor)
router.get('/mentor/:id',getAMentor)


router.get('/student',getStudent)
router.get('/student/:id',getAStudent)

router.post('/student',CreateStudent)

router.get('/studentwithoutmentor',WithoutMentor)
router.get('/previousmentor/:id',FindPreviousMentor)

router.put('/assignstudents/:id',AssignStudentOfMentor)
router.put('/assignmentor/:id',AssignMentor)

router.delete('/mentordel/:id',delMentor);
router.delete('/studentdel/:id',delStudent)


export default router;