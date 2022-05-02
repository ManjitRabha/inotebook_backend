import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "626e74c413578d91b39a21f5",
            "user": "626e57c1a3dfe4950c9e274a",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2022-05-01T11:53:40.864Z",
            "__v": 0
        },
        {
            "_id": "626fe4a6aef21bd0c4b0739f",
            "user": "626e57c1a3dfe4950c9e274a",
            "title": " A new My title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2022-05-02T14:03:18.480Z",
            "__v": 0
        },
        {
            "_id": "626fe4bcaef21bd0c4b073a1",
            "user": "626e57c1a3dfe4950c9e274a",
            "title": " Again a new note",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2022-05-02T14:03:40.330Z",
            "__v": 0
        },
        {
            "_id": "626e74c413578d91b39a21f5",
            "user": "626e57c1a3dfe4950c9e274a",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2022-05-01T11:53:40.864Z",
            "__v": 0
        },
        {
            "_id": "626fe4a6aef21bd0c4b0739f",
            "user": "626e57c1a3dfe4950c9e274a",
            "title": " A new My title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2022-05-02T14:03:18.480Z",
            "__v": 0
        },
        {
            "_id": "626fe4bcaef21bd0c4b073a1",
            "user": "626e57c1a3dfe4950c9e274a",
            "title": " Again a new note",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2022-05-02T14:03:40.330Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}



export default NoteState;