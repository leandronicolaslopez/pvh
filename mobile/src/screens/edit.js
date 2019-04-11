import React from "react";
import { SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import Input from "../components/Input";
import UserForm from "../components/userForm";
import UserApi from '../api/userApi'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from './../actions/users';

class Edit extends React.Component {
    static navigationOptions = {
        title: 'Edit User',
    };

    constructor(props) {
        super(props)

        this.state = {
            user: props.navigation.state.params.user
        }
        this.submitChanges = this.submitChanges.bind(this)
    }

    submitChanges = () => {
        this.props.userActions.editUser(this.state.user)
            .then(() => {
                Alert.alert('User saved')
                this.props.navigation.goBack();
            })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, margin: 20 }}>
                <ScrollView style={styles.container}>

                    <UserForm
                        navigation={this.props.navigation}
                        user={this.state.user}
                        onValueChange={(user) => this.setState({
                            user: {
                                id: this.state.user.id,
                                ...user
                            }
                        })}
                    />
                </ScrollView>
                {
                    this.props.users.saveLoading ?
                        <ActivityIndicator />
                        :
                        <TouchableOpacity style={styles.button} onPress={this.submitChanges}>
                            <Text style={{ color: '#000' }}>
                                SAVE
                            </Text>
                        </TouchableOpacity>
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: { borderRadius: 8, height: 40, backgroundColor: '#CDD6E3', justifyContent: 'center', alignItems: 'center' },
    field: {
        marginTop: 12
    },
})

const mapStateToProps = state => ({
    users: state.users,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);