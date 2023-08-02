import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const filterOptions = createFilterOptions({
	matchFrom: 'start',
	stringify: (option: FilterProps) => option.title,
});

export default function Filter() {
	return (
		<Autocomplete
			id="filter-demo"
			options={filters}
			getOptionLabel={(option) => option.title}
			filterOptions={filterOptions}
			sx={{ width: 300 }}
			renderInput={(params) => <TextField {...params} label="Filtros" />}
		/>
	);
}

interface FilterProps {
	title: string;
	value: boolean;
}

const filters: FilterProps[] = [
	{
		title: 'Archived',
		value: true,
	},
	{
		title: 'Done',
		value: true,
	},
];
