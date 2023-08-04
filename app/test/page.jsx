'use client'
import { TextField } from "@mui/material"
import { useState } from "react";

const test = () => {
    const [inputText, setInputText] = useState('')
    return (
        <main className="flex flex-col">
            <div className="m-36">
               <form onSubmit={(e) => e.preventDefault()}>
               <TextField
                    id="outlined-number"
                    label="Price"
                    type="number"
                    onChange={(event) => {
                        setInputText(event.target.value);
                    }}
                    required
                />
                <button type="submit">gonder</button>
               </form>
                {inputText}
            </div>
        </main>
    )
}

export default test