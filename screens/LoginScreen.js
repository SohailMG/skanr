import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import useAuth from '../hooks/useAuth'
// import useAuth from '../hooks/useAuth'


const LoginScreen = () => {
    // const {signInWithGoogle} = useAuth();
    const {signInWithGoogle} = useAuth();
    
    return (
        <View>
            <Text>Login to the app</Text>
            <Button title='login' onPress={signInWithGoogle}/>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})
