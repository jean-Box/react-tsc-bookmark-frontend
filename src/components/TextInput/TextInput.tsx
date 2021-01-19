import React, {InputHTMLAttributes} from 'react';

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

const TextInput: React.FC<TextInputProps> = (props) => {
    return (
        <div className="mb-3">
            <input {...props}  className="form-control"/>
        </div>
        )
}

export default TextInput;