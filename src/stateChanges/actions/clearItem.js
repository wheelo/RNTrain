import setState from '../setState';
import filterState from '../filterState';


const clearItem = filter => state => {
	// 2.
	const newItems = filterState(filter, state.items);

	return setState(newItems, filter, {filter});
};



export { clearItem };
