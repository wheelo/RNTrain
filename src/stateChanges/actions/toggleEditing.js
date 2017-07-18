import setState from '../setState';


const toggleEditing = (key, editing) => state => {
	const newItems = state.items.map((item) => {
  		if(item.key != key) return item;
	      	return {
	        ...item,
	        editing
	    }
	});
	return setState(newItems, state.filter);
};



export { toggleEditing };