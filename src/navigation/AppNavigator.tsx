import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApiDemoScreen from '../screens/ApiDemoScreen';
import { RootStackParamsList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ApiDemo" component={ApiDemoScreen} />
    </Stack.Navigator>
  );
};
export default AppNavigator;
