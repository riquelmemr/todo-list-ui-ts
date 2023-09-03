import { Box, Grid, Typography } from '@mui/material';

const label = [
	{
		name: 'Concluídas',
		color: '#000',
	},
	{
		name: 'Pendentes',
		color: '#4e4e4e',
	},
	{
		name: 'Arquivadas',
		color: '#868686',
	},
];

const LabelTasks = () => {
	return (
		<Grid item xs={12} display={'flex'}>
			{label.map((item) => (
				<>
					<Box
						key={item.name}
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
				</>
			))}
		</Grid>
	);
};

export default LabelTasks;
