

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AssessmentScreen from '../screens/AssessmentScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='AssessmentScreen' screenOptions={{
               headerShown:false 
            }}>
                <Stack.Screen name="AssessmentScreen" component={AssessmentScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;