import setSource from '../setSource';


const toggleAllComplete = state => {
	const complete = !state.allComplete;

	const newItems = state.items.map((item) => ({
		...item,
		complete
	}));
	return setSource(newItems, state.filter, { allComplete: complete});
};





export { toggleAllComplete };
