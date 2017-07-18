import setState from '../setState';

const removeItem = key => state => {
	// 1.
    const newItems = state.items.filter(item => item.key != key);
	return setState(newItems, state.filter);
};


export { removeItem };
