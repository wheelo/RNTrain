import setState from '../setState';



const filterItems = filter => state => {
	return setState(state.items, filter, {filter});
};



export { filterItems };
