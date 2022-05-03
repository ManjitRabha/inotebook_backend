import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // Get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application-json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2ZTU3YzFhM2RmZTQ5NTBjOWUyNzRhIn0sImlhdCI6MTY1MTQwMDcyMH0.5nJODxeLwtHEbKJAkqBiMRsvxjBxOOE_uXlVn4pRYOI"
            }
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }

    // Add a note
    const addNote = (title, description, tag) => {
        // TODO API call
        console.log("Adding a new note")
        const note = {
            "_id": "62e4a6aef23bd0c4b0739f",
            "user": "626e57c1a3dfe4950c9e274a",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-05-02T14:03:18.480Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }
    // Delete a note
    const deleteNote = (id) => {
        console.log("deleting a note using ID" + id)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
        // TODO API call
    }

    // Edit a note
    const editNote = () => {
        // API call


        // Logic to edit in client
        const editNote = (id, title, description, tag) => {
            for (let index = 0; index < notes.length; index++) {
                const element = notes[index];
                if (element._id === id) {
                    element.title = title;
                    element.description = description;
                    element.tag = tag;
                }
            }
        }
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}



export default NoteState;