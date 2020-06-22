import React, { Component } from 'react'
import { Text, View, ScrollView,StyleSheet,SafeAreaView, TouchableOpacity, Image } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import CLColors from '../../res/CLColors';
import CLImages from '../../res/CLImages';
import CLStyles from '../../res/CLStyles';
import CLFloatingTextInput from '../../components/CLFloatingTextInput';
import CLRoomDetails from '../../components/CLRoomDetails';
import CLSortModal from '../../components/CLSortModal';
import { Calendar } from "react-native-calendars";
import TimePicker from "react-native-24h-timepicker";
import Moment from 'moment';
import Modal from "react-native-modal";
import { CALENDAR_CUSTOM_THEME } from "../../res/CLCustomThemes";
import { getCalendarDateObj } from "../../utils/Utils";
import { sortLocationData,sortAvailabilityData,sortCapacityData} from "../../Common/Common";
import { httpRequest } from '../../network/NetworkCalls'
import * as Constants from '../../network/Constants';

export class BookMeetingRoom extends Component {

    state = {
      switchValue: true,
      switchValueMed: true,
      isModalVisible: false,
      isTimeModalVisible: false,
      isSortVisible: false,
      dateSelected : Moment(new Date()).format("Do MMM yy"),
      timeSelected : Moment(new Date()).add(1, "hour").format("hh:00 A"),
      hourSelected : 0,
      minutesSelected : 0,
      availableRooms: 0,
      rooms: [],
      isAvailability: false,
      isLocation: false,
      isCapacity: false
    }

    showDatePicker = () => {
        this.toggleModal();
    }

    showTimePicker = () => {
        this.toggleTimeModal()
    }

   //toggle date modal
   toggleModal = () => {
      this.setState({ isModalVisible: !this.state.isModalVisible });
   };

   //toggle time modal
   toggleTimeModal = () => {
      this.setState({ isTimeModalVisible: !this.state.isTimeModalVisible });
      if(!this.state.isTimeModalVisible){
        this.TimePicker.open()
      }
   };

   //toggle sort modal
   toggleSortModal = () => {
      this.setState({ isSortVisible: !this.state.isSortVisible });
   };

   //called when user selects date from calendar picker
   daySelectedByUser = day => {
      let selectedDate = Moment(new Date(day.dateString)).format("Do MMM yy")
      this.setState({dateSelected: selectedDate})
      this.toggleModal();
   };

   //called when user selects time from time picker
   timeSelectedByUser =(hour, minute ) => {
      this.toggleTimeModal();
      this.TimePicker.close()
      var time = ""
      if(hour >= 12){
        time = hour + " : "+minute + " PM"
      }else{
        time = hour + " : "+minute + " AM"
      }
      if(hour < 10){
        hour = "0"+hour
      }
      this.setState({timeSelected: time,hourSelected:hour,minutesSelected: minute})
      this.setState({spinner:true})
      this.getAvailableRooms()
   };

   //get Available Meeting rooms from server make rest call
   getAvailableRooms = async() => {
        httpRequest.get(Constants.GET_ROOMS_URL, null, (promise)=>{
            promise.then((result) => {
              this.parseResponse(result)
              this.setState({spinner:false})
            }, (err) => {
              console.log("error promise", err); // Error: "It broke"
              this.setState({spinner:false})
            });
          })
   }

   //parse the response returned from the server call
   parseResponse = (result) => {
        this.setState({availableRooms: result.length})
        result.forEach(room => {
            this.setState({rooms: result})
        })
   }

   //parse the response as each room needs to be single row
   getRooms = () => {
        var meetingRoomsArray=[];
        if(this.state.rooms.length > 0){
            for(let i =0 ; i< this.state.rooms.length;i++){
                var availability = []
                let selectedTime = this.state.hourSelected+":"+this.state.minutesSelected
                for(let key in this.state.rooms[i].availability){
                    if(key == selectedTime ){
                        availability.push({
                            time : key,
                            availability : this.state.rooms[i].availability[key]
                        })
                    }
                }
                meetingRoomsArray.push(
                     <View style={{marginBottom:8,marginLeft:16,marginRight:16}}>
                          <CLRoomDetails roomName={this.state.rooms[i].name} level={this.state.rooms[i].level} capacity={this.state.rooms[i].capacity} isAvailable={this.checkAvailability(availability)}/>
                     </View>
                )
            }
            return(
                meetingRoomsArray
            )
        }
   }

   //get the availability of the room from the list of timeslots
   checkAvailability = (availability) =>{
        var availabilityText = 0
        availability.forEach(time => {
            if(time.availability == "1"){
                availabilityText =  1
            }else{
                availabilityText = 0
            }
        })
        return availabilityText
   }

   //sort clicked
   sortClicked = () => {
        this.toggleSortModal()
   }

   //barcode clicked
   barcodeClicked = () => {
      this.props.navigation.navigate('ScanScreen')
   }

   //when user clicks on apply changes in the sort screen
   sortRooms = (isLocation) => {
        this.toggleSortModal()
        //if user clicks sort by location
        if(this.state.isLocation){
            let sortedRooms = sortLocationData(this.state.rooms)
             this.setState({rooms: sortedRooms})
        }
        //if user clicks sort by availability
        if(this.state.isAvailability){
            let sortedRooms = sortAvailabilityData(this.state.rooms,this.state.hourSelected,this.state.minutesSelected)
            this.setState({rooms: sortedRooms})
        }
        //if user clicks sort by capacity
        if(this.state.isCapacity){
            let sortedRooms = sortCapacityData(this.state.rooms)
            this.setState({rooms: sortedRooms})
        }
   }

   //When user clicks reset sort changes. default all to false
   resetChanges = () => {
       this.toggleSortModal()
       this.setState({isAvailability:false,isCapacity:false,isLocation:false})
   }

   //if user clicks sort by availability
   availabilityClicked = () =>{
       this.setState({isAvailability: !this.state.isAvailability})
       if(this.state.isCapacity){
           this.setState({isCapacity: !this.state.isCapacity})
       }
       if(this.state.isLocation){
           this.setState({isLocation: !this.state.isLocation})
       }
   }

   //if user clicks sort by location
   locationCLicked = () =>{
        this.setState({isLocation: !this.state.isLocation})
        if(this.state.isCapacity){
            this.setState({isCapacity: !this.state.isCapacity})
        }
        if(this.state.isAvailability){
            this.setState({isAvailability: !this.state.isAvailability})
        }
    }

   //if user clicks sort by capacity
   capacityClicked = () =>{
        this.setState({isCapacity: !this.state.isCapacity})
        if(this.state.isAvailability){
            this.setState({isAvailability: !this.state.isAvailability})
        }
        if(this.state.isLocation){
            this.setState({isLocation: !this.state.isLocation})
        }
   }

    render() {
        return (
            <SafeAreaView style={{backgroundColor: CLColors.WHITE, flex: 1,}}>
                <ScrollView>
                    <View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:13,marginLeft:32,marginRight:32}}>
                            <View/>
                            <Text style={[CLStyles.TITLE_MEDIUM,{fontWeight:'bold'}]}>Book a Room </Text>
                            <View style={{flexDirection:'row'}}>
                                 <TouchableOpacity onPress={this.barcodeClicked}>
                                      <Image source={CLImages.Camera}  />
                                 </TouchableOpacity>
                            </View>

                        </View>
                        <View style={{marginTop:16}}>
                              <CLFloatingTextInput textEntered= {this.state.dateSelected} textLength= {this.state.dateSelected.length} labelStyle= {false} isDone= {true} floatingLabel={"Date"} onFocus={() => this.showDatePicker()}/>
                        </View>
                        <View style={{marginTop:16}}>
                              <CLFloatingTextInput  textEntered= {this.state.timeSelected} textLength= {this.state.timeSelected.length} labelStyle= {false} isDone= {true} floatingLabel={"Timeslot"} onFocus={() => this.showTimePicker()}/>
                        </View>

                        <Spinner
                             style={{backgroundColor:CLColors.WHITE}}
                             visible={this.state.spinner}
                             textContent={''}
                             textStyle={styles.spinnerTextStyle}
                        />

                            <View style={{marginTop:36,marginBottom:8}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:16,marginRight:16}}>
                                    <Text style={[CLStyles.H3Light]}> Rooms </Text>
                                    <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity style={{flexDirection:"row",alignItems:'center',justifyContent:'center',marginRight:12}}  onPress={this.sortClicked}>
                                            <Text style={[CLStyles.H2Light_BLACK,{marginRight:7,fontWeight: "bold"}]}>Sort </Text>
                                            <Image source={CLImages.Sort}  />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                        {
                            this.getRooms()
                        }

                    </View>
                </ScrollView>
                <TimePicker
                     ref={ref => {
                         this.TimePicker = ref;
                     }}
                     minuteInterval={30}
                     onCancel={() => this.onCancel()}
                     onConfirm={(hour, minute) => this.timeSelectedByUser(hour, minute)}
                />
                <Modal
                      isVisible={this.state.isModalVisible}
                      onBackdropPress={this.toggleModal}
                >
                      <View>
                           <Calendar
                               // Collection of dates that have to be marked. Default = {}
                               markedDates={getCalendarDateObj([this.props.selectedDate])}
                               onDayPress={day => {
                                  this.daySelectedByUser(day);
                               }}
                               disableMonthChange={true}
                               theme={CALENDAR_CUSTOM_THEME}
                           />
                      </View>
                </Modal>

                <Modal isVisible={this.state.isSortVisible} onBackdropPress={this.toggleSortModal} style={styles.modal}>
                  <CLSortModal applyChanges = {() => {this.sortRooms()}} resetChanges = {() => {this.resetChanges()}} availabilityClicked={()=>this.availabilityClicked()} isAvailability={this.state.isAvailability} locationCLicked={()=>this.locationCLicked()} isLocation={this.state.isLocation}
                        capacityClicked={()=>this.capacityClicked()} isCapacity={this.state.isCapacity}/>
                </Modal>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    containter: {
      marginLeft: 16,
      marginRight: 16
    },
    modal: {
        backgroundColor: 'white',
        margin: 0, // This is the important style you need to set
        marginTop: 100,
        alignItems: undefined,
        justifyContent: undefined,
    }
  });

export default BookMeetingRoom
