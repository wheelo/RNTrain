import setState from '../setState';


const updateText = (key, text) => state => {
	const newItems = state.items.map((item) => {
  		if(item.key != key) return item;
  		return {
	        ...item,
	        text
  		};
	});
	return setState(newItems, state.filter);
};




export { updateText };
