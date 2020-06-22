import React, { Component } from 'react'
import { Text, View, ScrollView,StyleSheet,SafeAreaView, TouchableOpacity, Image } from 'react-native'
import CLColors from '../../res/CLColors';
import CLImages from '../../res/CLImages';
import CLStyles from '../../res/CLStyles';
import { WebView } from 'react-native-webview';
import NavBackButton from '../../navigation/NavBackButton';

export class BookingSucess extends Component {

    componentDidMount(){
         var url =  this.props.navigation.getParam('url', "")
         if(Platform.OS === 'android'){
            this.setState({successUrl: "https://yuhong90.github.io/public/booking-success.html"})
         }else{
            this.setState({successUrl: url})
         }
    }

    state = {
        successUrl: ""
    }

   backToHome = () => {
      this.props.navigation.navigate('BookMeetingRoom')
   }

    render() {
        let qrCodeText = "<Return QR Code Data>"
        return (
            <SafeAreaView style={{backgroundColor: CLColors.WHITE, flex: 1}}>
                 <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:13,marginLeft:32,marginRight:32}}>
                      <View>
                            <NavBackButton onPress={() => { this.props.navigation.navigate('BookMeetingRoom')}} />
                      </View>
                      <Text style={[CLStyles.TITLE_MEDIUM,{fontWeight:'bold'}]}>Book a Room </Text>
                      <View/>

                 </View>
                <View >
                    <View style={{width:'100%',height:'80%'}}>
                        {<WebView source={{uri: this.state.successUrl}}
                               startInLoadingState={true}
                               scalesPageToFit={true} />}
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                         <Text style={CLStyles.H1Light_BLACK}>{qrCodeText}</Text>
                    </View>
                </View>


                <View style={styles.bottom}>
                        <TouchableOpacity onPress = {()=> this.backToHome()} style={{borderRadius: 24, borderWidth: 2, borderColor: CLColors.BLUE,width:'100%',height:48,backgroundColor:CLColors.BLUE,
                          alignItems:'center',justifyContent:'center',marginLeft:16,marginRight:16}} >
                            <Text style={[CLStyles.TITLE_MEDIUM_WHITE,{fontWeight: "bold"}]}>Back To Home</Text>
                        </TouchableOpacity>
                </View>

            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    containter: {
      marginLeft: 16,
      marginRight: 16
    },
    bottom: {
      flex: 1,
      justifyContent: 'flex-end',
      position: 'absolute',
      bottom: 30,
      width:'94%',
      justifyContent:'center'
    }
  });

export default BookingSucess
