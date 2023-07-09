import React from 'react'
import { Label , TextInput } from 'flowbite-react'
const UsernameComp = ({username}) => {
    return (
        <div>
            <div className="mb-2 block">
                <Label
                    htmlFor="username"
                    value="Username"
                />
            </div>
            <TextInput
                id="username3"
                placeholder="User Name"
                required={true}
                addon="@"
                helperText={"Enter your User name "}
                ref={username}
            />
        </div>
    )
}

export default UsernameComp