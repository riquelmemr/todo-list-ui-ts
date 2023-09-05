import { Box, Grid, Typography } from '@mui/material';

const label = [
	{
		id: 1,
		name: 'Pendentes',
		color: '#292929',
	},
	{
		id: 2,
		name: 'Arquivadas',
		color: '#868686',
	},
];

const LabelTasks = () => {
	return (
		<Grid
			item
			xs={12}
			display={'flex'}
			sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
		>
			{label.map((item) => (
				<Box key={item.id} display={'flex'} alignItems={'center'}>
					<Box
						sx={{
							width: '20px',
							height: '20px',
							bgcolor: item.color,
							borderRadius: '8px',
							marginRight: '8px',
							marginLeft: '20px',
						}}
					/>
					<Typography variant="subtitle2">{item.name}</Typography>
				</Box>
			))}
		</Grid>
	);
};

export default LabelTasks;
