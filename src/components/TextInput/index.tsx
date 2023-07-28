import { TextField } from '@mui/material';
import React from 'react';

interface TextInputProps {
	label: string;
	type: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, type }) => {
	return <TextField variant="outlined" label={label} type={type} fullWidth />;
};

export default TextInput;
