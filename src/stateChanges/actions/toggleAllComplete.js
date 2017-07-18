import setState from '../setState';


const toggleAllComplete = state => {
	const complete = !state.allComplete;

	const newItems = state.items.map((item) => ({
		...item,
		complete
	}));
	return setState(newItems, state.filter, { allComplete: complete});
};





export { toggleAllComplete };
