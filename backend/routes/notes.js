const express = require('express');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const Note = require('../models/Note')


//ROUTE 1 : Get all the Notes GET: "/api/auth/createuser" Login required


router.get('/fetchallnotes', fetchUser, async (req, res,) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }


})

//ROUTE 2 : Add a new note usin POST: "/api/auth/addnote" Login required

router.post('/addnote', fetchUser, [
    body('title', "Enater a valid title..").isLength({ min: 3 }),
    body('description', "Description must legnth at least 5 charcters").isLength({ min: 5 }),
], async (req, res,) => {
    try {
        const { title, description, tag, } = req.body
        // if there is error return error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})


//ROUTE 3 : Update an existing note using PJUT: "/api/notes/updatenote" Login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {

        // Create  a newNote object
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tage = tag }

        // find the note to be updated and update it

        // const = note = Note.findByIdAndUpdate()
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }

})



//ROUTE 4 : Delete an existing note using DELETE: "/api/notes/deletenote" Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {

        // find the note to be deleted and delete it
        // const = note = Note.findByIdAndUpdate()
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        // allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ Success: "Note has been deleted", note: note })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})



module.exports = router