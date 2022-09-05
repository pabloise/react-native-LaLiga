import HomeScreen from './screens/HomeScreen'
import TeamDetailsScreen from './screens/TeamDetailsScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PlayerDetailsScreen from './screens/PlayerDetailsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={HomeScreen} name="HomeScreen" options={{headerShown: false, title:'Posiciones'}} />
        <Stack.Screen component={TeamDetailsScreen} name="TeamDetailsScreen" options={{title: 'Equipo'}} />
        <Stack.Screen component={PlayerDetailsScreen} name="PlayerDetailsScreen" options={{title: 'Jugadores'}} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

