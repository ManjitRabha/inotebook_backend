import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

export default function About() {

    const a = useContext(noteContext);
    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h1>This is About</h1>
            <h3>This is about {a.state.name} and he is in class {a.state.class}</h3>

        </div>
    )
}
