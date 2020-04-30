import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//Import Login
import LoginScreen from './src/pages/Login'
import CadastroScreen from './src/pages/Login/cadastro'

//Import Home
import HomeScreen from './src/pages/Home';
import PostScreen from './src/pages/Home/post';

const Login = createStackNavigator({
Login: {
  screen: LoginScreen
},
Cadastro: {
    screen: CadastroScreen,
    navigationOptions: {
      title: "Cadastre-se ao Microblogging"
    }
},
});

const Home = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Posts"
    }
  },
  Post: {
      screen: PostScreen
  },
});

const Main = createSwitchNavigator({
    Login: Login,
    Home: Home
});

let Navigation = createAppContainer(Main);

export default Navigation;