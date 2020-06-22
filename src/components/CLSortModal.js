import React, { Component } from 'react'
import { Text, View,TouchableOpacity,Image,ScrollView,StyleSheet } from 'react-native'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import RadioButtonRN from 'radio-buttons-react-native';
import CLStyles from '../res/CLStyles';
import CLColors from '../res/CLColors';
import CLImages from '../res/CLImages';

//UI for Sort screen
export class CLSortModal extends Component {

    render() {

        var radio_props = [
          { value: this.props.isLocation,
           value: this.props.isCapacity,
           value: this.props.isAvailability}
        ];

        return (
            <View style={{flex:1}}>
                <ScrollView>
                    <TouchableOpacity style={{marginTop:16,justifyContent:'center',alignItems:'center'}} onPress={this.props.closeClicked}>
                         <Image source={CLImages.Close}  />
                    </TouchableOpacity>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={[CLStyles.TITLE_MEDIUM,{fontWeight:'bold',marginTop:20}]}>Sort</Text>
                    </View>
                    <View style={{flexDirection:'column',marginTop:36,marginLeft:16,marginRight:16}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={[CLStyles.H1Light_BLACK,{textAlign:'center'}]}>Location</Text>
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <RadioForm
                                  animation={true}
                                >
                                  {
                                    radio_props.map((obj, i) => (
                                      <RadioButton labelHorizontal={true} key={i} >
                                        <RadioButtonInput
                                          obj={obj}
                                          index={i}
                                          isSelected={this.props.isLocation }
                                          onPress={()=>this.props.locationCLicked()}
                                          borderWidth={3}
                                          buttonInnerColor={CLColors.GRAY7}
                                          buttonOuterColor={CLColors.GRAY7}
                                          buttonSize={10}
                                        />
                                      </RadioButton>
                                    ))
                                  }
                                </RadioForm>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:30}}>
                            <Text style={[CLStyles.H1Light_BLACK,{textAlign:'center'}]}>Capacity</Text>
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <RadioForm
                                  animation={true}
                                >
                                  {
                                    radio_props.map((obj, i) => (
                                      <RadioButton labelHorizontal={true} key={i} >
                                        <RadioButtonInput
                                          obj={obj}
                                          index={i}
                                          isSelected={this.props.isCapacity }
                                          onPress={()=>this.props.capacityClicked()}
                                          borderWidth={3}
                                          buttonInnerColor={CLColors.GRAY7}
                                          buttonOuterColor={CLColors.GRAY7}
                                          buttonSize={10}
                                        />
                                      </RadioButton>
                                    ))
                                  }
                                </RadioForm>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:30}}>
                            <Text style={[CLStyles.H1Light_BLACK,{textAlign:'center'}]}>Availability</Text>
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <RadioForm
                                  animation={true}
                                >
                                  {
                                    radio_props.map((obj, i) => (
                                      <RadioButton labelHorizontal={true} key={i} >
                                        <RadioButtonInput
                                          obj={obj}
                                          index={i}
                                          isSelected={this.props.isAvailability }
                                          onPress={()=>this.props.availabilityClicked()}
                                          borderWidth={3}
                                          buttonInnerColor={CLColors.GRAY7}
                                          buttonOuterColor={CLColors.GRAY7}
                                          buttonSize={10}
                                        />
                                      </RadioButton>
                                    ))
                                  }
                                </RadioForm>
                            </View>
                        </View>

                    </View>

                </ScrollView>
                <View style={styles.bottom}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around',marginLeft:24,marginRight:24}}>
                          <TouchableOpacity onPress = {this.props.resetChanges} style={{borderRadius: 24, borderWidth: 2, borderColor: CLColors.BUTTON_BLACK,width:'35%',height:48,backgroundColor:CLColors.BUTTON_BLACK,
                              alignItems:'center',justifyContent:'center',marginRight:24}} >
                              <Text style={[CLStyles.TITLE_MEDIUM_WHITE,{fontWeight: "bold"}]}>Reset</Text>
                          </TouchableOpacity>

                          <TouchableOpacity onPress = {this.props.applyChanges}style={{borderRadius: 24, borderWidth: 2, borderColor: CLColors.BLUE,width:'65%',height:48,backgroundColor:CLColors.BLUE,
                               alignItems:'center',justifyContent:'center'}} >
                               <Text style={[CLStyles.TITLE_MEDIUM_WHITE,{fontWeight: "bold"}]}>Apply</Text>
                          </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    bottom: {
      flex: 1,
      justifyContent: 'flex-end',
      position: 'absolute',
      bottom: 16
    }
});

export default CLSortModal
