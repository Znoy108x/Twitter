import React from 'react'
import { Select } from 'flowbite-react'

const Selector = ({ data , helperTxt , isState , state , city }) => {
    return (
    <Select
        id="countries"
        required={true} 
        helperText={helperTxt}
        ref={isState ? state : city}
        >
        {
            data.map((ele) => (
                <option key={ele} >
                    {ele}
                </option>
            ))
        }
    </Select>
    )
}

export default Selector