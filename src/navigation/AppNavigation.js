import { createStackNavigator } from "react-navigation-stack";
import BookMeetingRoom from "../view/BookRoom/BookMeetingRoom"
import ScanScreen from "../view/BookRoom/ScanScreen"
import BookingSucess from "../view/BookRoom/BookingSucess"

const AppNavigator = createStackNavigator({
  BookMeetingRoom: {
    screen: BookMeetingRoom
  },
  BookingSucess: {
    screen: BookingSucess
  },
  ScanScreen: {
    screen: ScanScreen
  }
  });

  AppNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }

    return {
      tabBarVisible,
    };
  };

  export default AppNavigator;