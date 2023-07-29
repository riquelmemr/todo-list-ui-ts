import { TextField } from '@mui/material';
import React from 'react';

interface TextInputProps {
	label: string;
	type: string;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}

const TextInput: React.FC<TextInputProps> = ({
	label,
	type,
	setValue,
	value,
}) => {
	return (
		<TextField
			variant="outlined"
			label={label}
			type={type}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			fullWidth
		/>
	);
};

export default TextInput;
