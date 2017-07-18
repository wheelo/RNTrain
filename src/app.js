import React, { Component } from "react";
import {
  View, Text, StyleSheet,
  Platform, FlatList, Keyboard,
  AsyncStorage, ActivityIndicator
} from 'react-native';

import Header from "./components/Header";
import Footer from "./components/Footer";
import ListItem from "./components/ListItem";

// Change State
import { 
	addItem, removeItem, toggleComplete, toggleAllComplete, 
	updateText, toggleEditing, filterItems, clearItem
} from "./stateChanges";



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
				this.setState({
		      		items,
		      		dataSource: items,
		      		loading: false
		    	})
			} catch (error) {
				this.setState({
					loading: false
				});
			}
		});
	}
  	
  	// Class property
  	handleFilter = filter => {
  		this.setState(filterItems(filter));
  	};

  	handleClearComplete = () => {
  		this.setState(clearItem('ACTIVE'));
  	};

  	handleAddItem = () => {
	    if(!this.state.value){
	    	return;
	    }
	    this.setState(addItem);
	    /*this.refs.refFooter.setNativeProps({
	    	style:{ color:'blue' },
	    	activeCount: this.activeCount
	    }); */
  	};

  	handleRemoveItem = key => {
  		this.setState(removeItem(key));
  	};

  	handleToggleAllComplete = () => {
  		this.setState(toggleAllComplete);
  	};

  	handleToggleComplete = (key, complete) => {
  		this.setState(toggleComplete(key, complete));
  	};

  	handleUpdateText(key, text) {
  		this.setState(updateText(key, text));
  	}

  	handleToggleEditing(key, editing) {
  		this.setState(toggleEditing(key, editing));
  	}

  	// Getter
  	get activeCount() {
		return this.state.items.reduce(
			(sum, todo) => sum + (todo.complete ? 0 : 1),
			0
		)
	}

  	render() {
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
		          	count={this.state.items.length}
		          	activeCount={this.activeCount}
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

// 样式
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