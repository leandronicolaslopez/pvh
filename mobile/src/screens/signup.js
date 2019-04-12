import React from "react";
import {
    Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert
} from "react-native";
import UserForm, { validateUser } from "../components/userForm";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from './../actions/users';

class Signup extends React.Component {
    static navigationOptions = {
        title: 'Sign up',
    };

    constructor(props) {
        super(props)
        this.state = {
            user: {},
            validateFields: false
        }
        this.submitChanges = this.submitChanges.bind(this)
    }

    submitChanges = () => {
        this.setState({
            validateFields: true
        })
        
        if (validateUser(this.state.user)) {
            this.props.userActions.signUpUser(this.state.user)
                .then(() => {
                    Alert.alert('User saved')
                    this.props.navigation.goBack();
                })
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, margin: 20 }}>
                <ScrollView style={styles.container}>
                    <UserForm
                        displayValidations={this.state.validateFields}
                        navigation={this.props.navigation}
                        user={this.state.user}
                        onValueChange={(user) => this.setState({ user })}
                    />
                </ScrollView>
                {
                    this.props.users.saveLoading ?
                        <ActivityIndicator />
                        :
                        <TouchableOpacity style={styles.button} onPress={this.submitChanges}>
                            <Text style={{ color: '#000' }}>
                                SIGN UP
                            </Text>
                        </TouchableOpacity>
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: { borderRadius: 8, height: 40, backgroundColor: '#CDD6E3', justifyContent: 'center', alignItems: 'center' },
    field: {
        marginTop: 12
    },
    text: { width: '100%', height: 40, padding: 8, borderColor: '#ddd', borderWidth: 1, }
})

const mapStateToProps = state => ({
    users: state.users,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);