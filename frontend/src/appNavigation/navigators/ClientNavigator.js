import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import {createStackNavigator} from 'react-navigation-stack';
import {darken} from 'polished';
import {useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {createDrawerNavigator} from 'react-navigation-drawer';
import appMetrics from '../../utils/appMetrics';
import {signOut} from '../../appStore/appModules/auth/actions';
import Profile from '../../screens/Profile/Profile';
import Home from '../../screens/Home/Home';
import PaymentAddress from '../../screens/Payment/PaymentAddress/PaymentAddress';
import PaymentCart from '../../screens/Payment/PaymentCart/PaymentCart';
import CheckoutEasy from '../../screens/Payment/CheckoutEasy/CheckoutEasy';
import CardList from '../../screens/Payment/CardList/CardList';
import CompleteRegister from '../../screens/Payment/CompleteRegister/CompleteRegister';
import {appColors} from '../../utils/appColors';
import Background from '../../components/Background/Background';

function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOut());
  }, [dispatch]);
  return <Background />;
}

const RootStack = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({drawerLabel: 'Inicio'}),
    },
    Profile: {
      screen: Profile,
      navigationOptions: () => ({drawerLabel: 'Meu perfil'}),
    },
    CompleteRegister: {
      screen: createStackNavigator({
        CompleteRegister,
        PaymentAddress,
        PaymentCart,
      }),
      navigationOptions: () => ({drawerLabel: 'Completar registro'}),
    },
    Payment: {
      screen: createStackNavigator(
        {
          CardList,
          PaymentAddress,
          PaymentCart,
          CheckoutEasy,
        },
        {
          defaultNavigationOptions: {
            headerTransparent: true,
            headerTintColor: '#FFF',
            headerLeftContainerStyle: {
              marginLeft: 0,
            },
          },
        },
      ),
      navigationOptions: () => ({drawerLabel: 'Pagamento'}),
    },
    Logout: {
      screen: Logout,
      navigationOptions: () => ({drawerLabel: 'Sair'}),
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',
    navigationOptions: ({navigation, previous}) => ({
      headerBackground: () => (
        <LinearGradient
          colors={[darken(0.2, appColors.primary), appColors.primary]}
          style={{flex: 1}}
        />
      ),
      headerTintColor: appColors.white,
      title: 'Dev Doido',
      headerTitleAlign: 'center',
      headerLeft: () => (
        <>
          <Icon
            style={{padding: 10, color: appColors.white}}
            name="three-bars"
            size={30}
            color={appColors.black}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
          {previous ? (
            <Icon
              style={{padding: 10, color: appColors.white}}
              name="arrow-left"
              size={30}
              color={appColors.black}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ) : null}
        </>
      ),
      headerTitleStyle: {
        //  paddingLeft: appMetrics.DEVICE_WIDTH / 5.5,
        color: appColors.white,
      },
    }),
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      App: createStackNavigator(
        {RootStack: {screen: RootStack}},
        {
          defaultNavigationOptions: {
            headerTintColor: '#FFF',
          },
        },
      ),
    },
    {initialRouteName: 'App'},
  ),
);
