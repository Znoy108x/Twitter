import React from 'react'
import { Textarea , Label } from 'flowbite-react'
const TextArea = ({bio}) => {
    return (
    <div id="textarea">
        <div className="mb-2 block">
            <Label
                htmlFor="comment"
                value="Your message"
            />
        </div>
        <Textarea
            id="comment"
            placeholder="Bio!"
            required={true}
            rows={4}
            className="bg-zinc-900"
            helperText={"Write you bio here"}
            ref={bio}
        />
    </div>
    )
}

export default TextArea