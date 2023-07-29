import { Box, Typography } from '@mui/material';

import { GridItem } from '../Wrappers/GridItem';

import Logo from '/assets/logo.png';

const LogoComponent = () => {
	return (
		<GridItem
			item
			xs={12}
			md={6}
			flexDirection={'column'}
			gap={5}
			sx={{
				display: { xs: 'none', md: 'flex' },
			}}
		>
			<Box component={'img'} src={Logo} alt="logo" width={'300px'} />
			<Box>
				<Typography
					variant={'h4'}
					component={'h1'}
					fontWeight={'500'}
					color={'white'}
					textAlign={'center'}
				>
					Task Hub Application
				</Typography>
			</Box>
		</GridItem>
	);
};

export default LogoComponent;
