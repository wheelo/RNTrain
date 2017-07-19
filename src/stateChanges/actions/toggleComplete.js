import setSource from '../setSource';


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
	return setSource(newItems, state.filter);
};



export { toggleComplete };
