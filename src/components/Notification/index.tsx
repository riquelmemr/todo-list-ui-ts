import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { hideNotification } from '../../store/modules/notifications/notificationsSlice';

interface NotificationComponentProps {
	position?: string;
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({
	position,
}) => {
	const notification = useSelector((state: RootState) => state.notifications);

	const dispatch = useDispatch();

	return (
		<Snackbar
			open={notification.show}
			onClose={() => dispatch(hideNotification())}
			autoHideDuration={4000}
			sx={{ position: position || 'fixed' }}
		>
			<Alert severity={notification.success ? 'success' : 'error'}>
				{notification.status}
			</Alert>
		</Snackbar>
	);
};

export { NotificationComponent };

