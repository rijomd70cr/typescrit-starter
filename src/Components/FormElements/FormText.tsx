import React from 'react';
import { TextField, Box } from '@mui/material';

interface TextInterface {
    label: string,
    placeholder: string,
    error: { isError: boolean, errorMsg: string },
    value: String | number,
    onChange: (name: string, value: any) => void,
    required: boolean,
    type: string;
    fullWidth: boolean,
    name: string
}

export const TextInput: React.FC<TextInterface> = (props) => {
    const { label, placeholder, error, onChange, value, required, type, fullWidth, name } = props;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.name, e.target.value);
    }
    return (
        <Box>
            <TextField
                variant="outlined"
                size="small"
                name={name}
                fullWidth={fullWidth}
                error={error.isError}
                onChange={handleChange}
                helperText={error.isError ? error.errorMsg : ""}
                label={label}
                placeholder={placeholder}
                value={value}
                required={required}
                type={type}
            />
        </Box>
    )
}
