import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import Leilao from './src/screens/ItemLeilao';
import Lance from './src/screens/Lance';
import Participante from './src/screens/Pariticipante';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="App Leilao"
        screenOptions={{
          tabBarActiveTintColor: 'black',
          tabBarShowLabel: false,
          headerTitleStyle: { fontWeight: 'bold', color: 'white' },
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'green' },
        }}>

        <Tab.Screen
          name="Lance"
          component={Lance}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="ItemLeilao"
          component={Leilao}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Participantes"
          component={Participante}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
