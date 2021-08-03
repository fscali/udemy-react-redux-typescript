import React from 'react'
import { useState } from 'react'
const GuestList: React.FC = () => {
    const [name, setName] = useState<string>('')
    const [guests, setGuests] = useState<string[]>([])
    return (
        <div>
            <h3>Guest List</h3>
            <ul>
                {guests.map((guest, index) => (
                    <li key={index}>{guest}</li>
                ))}
            </ul>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button
                onClick={() => {
                    setName('')
                    setGuests([...guests, name])
                }}
            >
                Add Guest
            </button>
        </div>
    )
}

export default GuestList
