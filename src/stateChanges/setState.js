import { AsyncStorage } from 'react-native';
import filterState from './filterState';


const setSource = (items, filter, otherState ={}) => {
	// items到底需不需要
	const newItems = {
		items,
		dataSource: filterState(filter, items),
		...otherState
	};

	AsyncStorage.setItem("items", JSON.stringify(items));
	return newItems;
};

export default setSource;
