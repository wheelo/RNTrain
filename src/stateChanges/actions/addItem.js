import setState from '../setState';

// previous state and current props
const addItem = state => {
	const newItems = [
      	...state.items,
      	{
	        key: Date.now(),
	        text: state.value,
	        complete: false
	    }
    ];
    // selector & AsyncStorage
	return setState(newItems, state.filter, {value: ''});
};



export { addItem };