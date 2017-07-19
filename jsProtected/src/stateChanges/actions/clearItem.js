import setSource from '../setSource';
import filterState from '../filterState';


const clearItem = filter => state => {
	// 2.
	const newItems = filterState(filter, state.items);

	return setSource(newItems, filter, {filter});
};



export { clearItem };
