import React from "react";
import { ScrollView, Text, StyleSheet, TouchableOpacity, FlatList, Alert, RefreshControl } from "react-native";
import UserItem from '../components/userItem'

//import userApi from '../api/userApi'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from './../actions/users';

class list extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Users',
        headerRight: (<TouchableOpacity
            onPress={() => {
                navigation.navigate('signup')
            }}>
            <Text style={{
                color: 'white',
                paddingHorizontal: 12,
                marginRight: 12,
                fontSize: 32
            }}>+</Text>
        </TouchableOpacity>)
    });

    constructor(props) {
        super(props)

        this.fetchData = this.fetchData.bind(this)
        this.onUserDeletePressed = this.onUserDeletePressed.bind(this)
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        this.props.userActions.getAll()
    }

    onUserDeletePressed = (user) => {
        this.props.userActions.deleteUser(user)
            .catch(() => Alert.alert("Could not delete the user"))
    }

    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.users.loading}
                        onRefresh={this.fetchData}
                    />
                }
                style={styles.container}>

                <Text style={styles.error}>{this.props.users.error}</Text>

                {
                    !this.props.users.loading ?
                        this.props.users.data && this.props.users.data.length > 0 ?
                            <FlatList
                                data={this.props.users.data}
                                keyExtractor={(user, index) => { return user.id.toString() }}
                                renderItem={(row) => <UserItem
                                    onDelete={(user) => this.onUserDeletePressed(user, row.index)}
                                    onPress={(user) => this.props.navigation.navigate('edit', { user: Object.assign({}, user) })}
                                    user={row.item} />} />
                            :
                            <Text style={{ alignSelf: 'center' }}>You haven't added any users yet</Text>
                        : null
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    error: {
        color: 'red'
    }
})

const mapStateToProps = state => ({
    users: state.users,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(list);
