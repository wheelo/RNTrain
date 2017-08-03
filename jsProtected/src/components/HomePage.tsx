import React, { Component } from "react";
// 批量修改js后缀名为tsx的命令: LC_ALL=C find jsProtected/src/components -name *.js -exec sh -c 'mv "$0" "${0%.js}.tsx"' {} \;
import {
  View, Text, StyleSheet,
  Platform, FlatList, Keyboard,
  AsyncStorage, ActivityIndicator,
  LayoutAnimation
} from 'react-native';

import Header from "./Header";
import Footer from "./Footer";
import ListItem from "./ListItem";


// Changed State
import * as actions from "../stateChanges";

// let { height, width } = Dimensions.get(“window”);
import themable from './Theme';

// TODO: 导出为全局的类型 /??
type ItemType = {
    key: Number,
	text: String,
	complete: Boolean
}

interface State {
	loading: Boolean,
	value: String,
	items: Array<ItemType>,
	allComplete: Boolean,
	filter: String,
	dataSource: Array<ItemType>
}

@themable
class Home extends Component<State> {
	// const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
	state = {
		loading: true,
		value: "",
		items: [],
		allComplete: false,
		filter: "ALL",
		dataSource: []
	}

	componentWillMount() {
		// AsyncStorage.setItem("items", "");
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

	componentWillUpdate() {
		// LayoutAnimation.spring();
		LayoutAnimation.easeInEaseOut();
	}
  	
  	// Class property
  	handleFilter = filter => {
  		this.setState(actions.filterItems(filter));
  	};

  	handleClearComplete = () => {
  		this.setState(actions.clearItem('ACTIVE'));
  	};

  	handleAddItem = () => {
	    if(!this.state.value){
	    	return;
	    }
	    this.setState(actions.addItem);
	    // 47版本可以直接修改list样式
	    // this.list.setNativeProps({ style: {backgroundColor: "black"} })
  	};

  	handleRemoveItem = key => {
  		this.setState(actions.removeItem(key));
  	};

  	handleToggleAllComplete = () => {
  		this.setState(actions.toggleAllComplete);
  	};

  	handleToggleComplete = (key, complete) => {
  		this.setState(actions.toggleComplete(key, complete));
  	};

  	// Getter
  	get activeCount() {
  		if (this.state.items) {
  			return this.state.items.reduce(
				(sum, todo) => sum + (todo.complete ? 0 : 1),
				0
			);
  		}
  		return 0;
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
						ref={_list => this.list = _list}
			            style={styles.list}
			            data={this.state.dataSource}
			            onScroll={() => Keyboard.dismiss()}
			            renderItem={({ item }) => 
			            	<ListItem
			            		itemKey = {item.key}
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
			          	count={this.state.items && this.state.items.length}
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
			ios: { paddingTop: 66 }
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


//export default themable(Home);

export default Home;