import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import BookMeetingRoom from "../view/BookRoom/BookMeetingRoom"
import ScanScreen from "../view/BookRoom/ScanScreen"
import BookingSucess from "../view/BookRoom/BookingSucess"

const LaunchStack = createSwitchNavigator({
    BookMeetingRoom: {
       screen: BookMeetingRoom
    },
    ScanScreen: {
        screen: ScanScreen
    },
    BookingSucess: {
        screen: BookingSucess
    },
  },
  {
    initialRouteName:'BookMeetingRoom'
  });

  export default createAppContainer(createSwitchNavigator(
    {
      Splash: LaunchStack
    },
    {
      initialRouteName: 'Splash',
    }
  ));

