import React, { Component } from "react";
import {
  View, Text, StyleSheet,
  Platform, FlatList, Keyboard,
  AsyncStorage, ActivityIndicator
} from 'react-native';

import Header from "./components/Header";
import Footer from "./components/Footer";
import ListItem from "./components/ListItem";

const filterItems = (filter, items) => {
  	return items.filter(item => {
    	if (filter === "ALL") return true;
    	if (filter === "COMPLETED") return item.complete;
    	if (filter === "ACTIVE") return !item.complete;
  	});
};

/* TODO
1. 添加每个状态的总数
2. willreceiveProps
*/
class App extends Component {
  	constructor(props) {
    	super(props);
    	// const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
		this.state = {
			loading: true,
			value: "",
			items: [],
			allComplete: false,
			filter: "ALL",
			dataSource: []
		};
  	}

	componentWillMount() {
		AsyncStorage.getItem("items").then(json => {
			try {
				const items = JSON.parse(json);
				this.setSource(items, items, {loading: false});
			} catch (error) {
				this.setState({
					loading: false
				});
			}
		});
	}

  	// Class prop arrow function
  	setSource = (items, itemsDataSource, otherState ={}) => {
    	this.setState({
      		items,
      		dataSource: itemsDataSource,
      		...otherState
    	})
    	AsyncStorage.setItem("items", JSON.stringify(items));
  	};

  	handleFilter(filter) {
    	this.setSource(this.state.items, filterItems(filter, this.state.items), {filter})
  	}

  	handleClearComplete = () => {
    	const newItems = filterItems("ACTIVE", this.state.items);
    	this.setSource(newItems, filterItems(this.state.filter, newItems));
  	};

  	handleAddItem = () => {
	    if(!this.state.value){
	    	return;
	    }
    	const newItems = [
	      	...this.state.items,
	      	{
		        key: Date.now(),
		        text: this.state.value,
		        complete: false
		    }
	    ];
    	this.setSource(newItems, filterItems(this.state.filter, newItems), { value: ''})
  	};

  	handleToggleAllComplete = () => {
   		const complete = !this.state.allComplete;
   		const newItems = this.state.items.map((item) => ({
    		...item,
    		complete
   		}));
   		this.setSource(newItems, filterItems(this.state.filter, newItems), { allComplete: complete})
  	};

  	handleToggleComplete(key, complete) {
    	const newItems = this.state.items.map((item) => {
	      	if(item.key != key ) {
	        	return item;
	      	}
	      	return {
	        	...item,
	        	complete
      		};
    	})
    	this.setSource(newItems, filterItems(this.state.filter, newItems));
  	}

  	handleRemoveItem(key) {
    	const newItems = this.state.items.filter((item) => {
      		return item.key != key
    	});
    	this.setSource(newItems, filterItems(this.state.filter, newItems));
  	}

  	handleUpdateText(key, text) {
    	const newItems = this.state.items.map((item) => {
      		if(item.key != key) return item;
      		return {
		        ...item,
		        text
      		};
    	});
    	this.setSource(newItems, filterItems(this.state.filter, newItems));
  	}

  	handleToggleEditing(key, editing) {
    	const newItems = this.state.items.map((item) => {
      		if(item.key != key) return item;
		      	return {
		        ...item,
		        editing
		    }
    	});
    	this.setSource(newItems, filterItems(this.state.filter, newItems));
  	}

  	render() {
  		// enableEmptySections
  		// renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
    	return (
      		<View style={styles.container}>
        		<Header
					value={this.state.value}
					onAddItem={this.handleAddItem}
					onChange={value => this.setState({value})}
					onToggleAllComplete={this.handleToggleAllComplete}
				/>
        	<View style={styles.content}>
	          	<FlatList
		            style={styles.list}
		            data={this.state.dataSource}
		            onScroll={() => Keyboard.dismiss()}
		            renderItem={({ item }) => 
		            	<ListItem
							onUpdate={text => this.handleUpdateText(item.key, text)}
							onToggleEdit={editing => this.handleToggleEditing(item.key, editing)}
							onRemove={() => this.handleRemoveItem(item.key)}
							onComplete={complete => this.handleToggleComplete(item.key, complete)}
							{...item}
						/>
					}
					ItemSeparatorComponent={() => <View style={styles.separator}/>}
					ListFooterComponent={() => <View style={styles.listFoot}/>}
	        	/>
	        </View>
	        <Footer
	         	onFilter={filter => this.handleFilter(filter)}
	          	filter={this.state.filter}
	          	count={filterItems("ACTIVE", this.state.items).length}
	          	onClearComplete={this.handleClearComplete}
	        />
	        {this.state.loading &&
	          	<View style={styles.loading}>
	            <ActivityIndicator
	              	animating
	              	size="large"
	            />
	          	</View>
	        }
      		</View>
    	);
  	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
		...Platform.select({
			ios: { paddingTop: 30 }
		})
	},
	loading: {
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0,0,0,0.2)"
	},
	content: {
		flex: 1
	},
	list: {
		backgroundColor: '#FFF',
	},
	listFoot: {
		borderTopWidth: 0,
		borderBottomWidth: 1,
		borderColor: '#F5F5F5'
	},
	separator: {
		borderTopWidth: 0,
		borderBottomWidth: 1,
		borderColor: '#F5F5F5'
	}
})

export default App;