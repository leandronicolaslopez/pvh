import React from "react";
import { Text, TouchableOpacity, StyleSheet, View, Image } from "react-native";
import PropTypes from 'prop-types';


export default class UserItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.row}>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => this.props.onPress(this.props.user)}>
                    <Text style={styles.name}>{this.props.user.name}</Text>
                    <Text style={styles.email}>{this.props.user.email}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{alignItems:'center',justifyContent:'center'}}
                    onPress={() => this.props.onDelete(this.props.user)}>
                    <Image source={require('./../assets/img/trash.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16
    },
    email: {
        marginTop: 4
    }
})

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
    onPress: PropTypes.func
}