import React from 'react'
import { TextInput , Label } from 'flowbite-react'

const NameComp = ({name}) => {
    return (
        <div>
            <div className="mb-2 block">
                <Label
                    htmlFor="email3"
                    value="Your email"
                />
            </div>
            <TextInput
                id="email3"
                type="email"
                placeholder="Name"
                required={true}
                helperText={"Please enter your name"}
                ref={name}
            />
        </div>
    )
}

export default NameComp