import setSource from '../setSource';


const removeItem = key => state => {
	// 1.
    const newItems = state.items.filter(item => item.key != key);
	return setSource(newItems, state.filter);
};


export { removeItem };
