const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Data = require('../models/Details');
const { body, validationResult } = require('express-validator');

// router.get('/', (req, res) => {

//     res.json([])
// })
// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
// router.get('/fetchallnotes', fetchuser, async (req, res) => {
//     try {
//         const notes = await Note.find({ user: req.user.id });
//         res.json(notes)
//     }
//     catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// })

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/adddata', fetchuser, [
    body('age', 'age'), 
    body('gender', 'gender'),
    body('dob', 'dob'),
    body('mobile_number', 'mobile_number').isLength({min: 10}),],
    async (req, res) => {
        try {

            const { age, gender, dob, mobile_number } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const data = new Data({
                age, gender, dob, mobile_number, user: req.user.id
            })
            const savedData = await data.save()

            res.json(savedData)

        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
})

// ROUTE 3: Update the existing Note using: PUT "/api/notes/addnote". Login required 
router.put('/updatedata/:id', fetchuser, async (req, res) => {
    try {

        const {age, gender, dob, mobile_number } = req.body;
        // Create a new note Object
        const newNote = {};
        if (age) {
            newNote.age = age;
        }
        if (gender) {
            newNote.gender = gender;
        }
        if (dob) {
            newNote.dob = dob;
        }
        if (mobile_number) {
            newNote.mobile_number = mobile_number;
        }
        // Find the note to be Updated and update it

        let data = await Data.findById(req.params.id);
        if (!data) {
            return res.status(404).send('Not found');
        }
        // note.user.toString is given the user id 
        if (data.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed');
        }
        data = await Data.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ data });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


})

// ROUTE 4 : Delete the existing Note using: DELETE "/api/notes/deletenote". Login required 
router.delete('/deletedata/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it

        let data = await Data.findById(req.params.id);
        if (!data) {
            return res.status(404).send('Not found');
        }
        // Allow deletion only if the user own this Notic
        if (data.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed');
        }
        data = await Data.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", data: data });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})
module.exports = router 