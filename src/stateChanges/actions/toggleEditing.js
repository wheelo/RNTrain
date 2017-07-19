import setSource from '../setSource';


const toggleEditing = (key, editing) => state => {
	const newItems = state.items.map((item) => {
  		if(item.key != key) return item;
	      	return {
	        ...item,
	        editing
	    }
	});
	return setSource(newItems, state.filter);
};



export { toggleEditing };