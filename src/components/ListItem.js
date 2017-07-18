import React, { Component } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, TextInput } from "react-native";

class ListItem extends Component {

    render() {
        const { complete } = this.props;
        const textComponent = (
            <TouchableOpacity style={styles.textWrap} onPress={() => this.props.onToggleEdit(true)}>
            <Text style={[styles.text, complete && styles.complete]}>{this.props.text}</Text>
            </TouchableOpacity>
        );

        const removeButton = (
            <TouchableOpacity onPress={this.props.onRemove}>
            <Text style={styles.delete}>X</Text>
            </TouchableOpacity>
        );

        const editingComponent = (
            // multiline
            <View style={styles.textWrap}>
            <TextInput
                onChangeText={this.props.onUpdate}
                autoFocus
                value={this.props.text}
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
            />
          </View>
        );

        const doneButton = (
            <TouchableOpacity style={styles.done} onPress={() => this.props.onToggleEdit(false)}>
                <Text style={styles.doneText}>保存</Text>
            </TouchableOpacity>
        )

        return (
            <View style={styles.container}>
                <Switch style={styles.switchContainer}
                    value={complete}
                    onValueChange={this.props.onComplete}
                />
                {this.props.editing ? editingComponent : textComponent}
                {this.props.editing ? doneButton : removeButton}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        fontSize: 20,
        padding: 0,
        flexDirection: "row",
        alignItems: "center",
        color: "#4d4d4d"
    },
    textWrap: {
        flex: 1,
        marginHorizontal: 10,
    },
    done: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#7be290",
        padding: 7
    },
    doneText: {
        color: "#4d4d4d",
        fontSize: 16
    },
    complete: {
        textDecorationLine: "line-through"
    },
    text: {
        fontSize: 22,
        color: "#4d4d4d",
    },
    delete: {
        fontSize: 20,
        color: "#cc9a9a"
    }
});


export default ListItem;