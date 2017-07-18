import setState from '../setState';


const toggleComplete = (key, complete) => state => {
	const newItems = state.items.map((item) => {
      	if(item.key != key ) {
        	return item;
      	}
      	return {
        	...item,
        	complete
  		};
	});
	return setState(newItems, state.filter);
};



export { toggleComplete };
