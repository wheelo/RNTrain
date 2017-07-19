const updateText = (key, text) => state => {
	const items = state.items.map((item) => {
  		if(item.key != key) return item;
  		return {
	        ...item,
	        text
  		};
	});
	return {items};
	// no asyncStore
};



export { updateText };
