import setSource from '../setSource';


const filterItems = filter => state => {
	return setSource(state.items, filter, {filter});
};



export { filterItems };
