import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface SnackBarMessageProps {
	open: boolean;
	handleClose: () => void;
	mode: 'error' | 'success' | 'info' | 'warning';
	message: string;
}

const SnackBarMessage: React.FC<SnackBarMessageProps> = ({
	open,
	handleClose,
	mode,
	message,
}) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={3000}
			onClose={handleClose}
			sx={{
				position: 'static',
				width: '100%',
			}}
		>
			<Alert onClose={handleClose} severity={mode} sx={{ width: '100%' }}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default SnackBarMessage;
