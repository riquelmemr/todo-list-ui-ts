import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { hideNotification } from '../../store/modules/notifications/notificationsSlice';

const NotificationComponent = () => {
	const notification = useSelector((state: RootState) => state.notifications);

	const dispatch = useDispatch();

	return (
		<Snackbar
			open={notification.show}
			onClose={() => dispatch(hideNotification())}
			autoHideDuration={4000}
		>
			<Alert severity={notification.success ? 'success' : 'error'}>
				{notification.status}
			</Alert>
		</Snackbar>
	);
};

export { NotificationComponent };

