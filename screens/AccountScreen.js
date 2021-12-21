import React from 'react'
import { View, Text, Button } from 'react-native'
import useAuth from '../hooks/useAuth'

const AccountScreen = () => {
    const {logout} = useAuth();
    return (
        <View>
            <Text>Account</Text>
            <Button title='Logout' onPress={logout}/>
        </View>
    )
}

export default AccountScreen
