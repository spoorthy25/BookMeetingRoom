# BookMeetingRoom
Book a meeting room based by selecting the date and time.

# Prerequisites
git clone https://github.com/spoorthy25/BookMeetingRoom.git

# Installing
Once the application is cloned into the system, navigate to the root dir of the project on the command prompt.
Then execute the commands below for Android :

react-native run-android

For iOS:
npm install -g ios-deploy 
react-native run-ios --device "iPhone name"

If error saying npm not installed execute below command:

npm install


# Launching
Once the app is launched on the device, select the time to find the meeting rooms.
By default I am showing today's date as date. And next hour and time.
We need to change the time slot and then we can see the rooms available in the list.
User can also sort the rooms by clicking on Sort button on the home page.
When clicked on the Camera icon on the home page allow the Camera permission on both Android and iOS.

# Running the tests
For running unit tests need to execute the below command.

npm test
