import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React from 'react';

interface FilterProps {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}

const filterOptions = createFilterOptions({
	matchFrom: 'start',
	stringify: (option: FilterType) => option.title,
});

const Filter: React.FC<FilterProps> = ({ setValue, value, ...other }) => {
	return (
		<Autocomplete
			id="filter-demo"
			options={filters}
			getOptionLabel={(option) => option.title}
			filterOptions={filterOptions}
			sx={{ width: 300 }}
			onChange={(e, value) => {
				if (typeof value === 'string') {
					setValue(value);
				} else if (value && value.title) {
					setValue(value.title);
				} else {
					setValue('');
				}
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Filtros"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			)}
		/>
	);
};

interface FilterType {
	title: string;
	value: string;
}

const filters: FilterType[] = [
	{
		title: 'Arquivadas',
		value: 'archived',
	},
	{
		title: 'Finalizadas',
		value: 'done',
	},
];

export default Filter;
