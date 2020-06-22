import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import CLStyles from '../res/CLStyles';
import CLColors from '../res/CLColors';

//UI for room row
export class CLRoomDetails extends Component {

    render() {
        return (
            <View style={{flexDirection:'column', backgroundColor:CLColors.GRAY, height:70, borderWidth:1, borderColor:CLColors.GRAY3,borderRadius:8}}>
                <TouchableOpacity onPress={this.props.meetingRoomSelected}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:8}}>
                        <Text style={[{textAlign:'left',  width:'40%', paddingLeft:24,fontWeight: "bold",marginTop:8}, CLStyles.H2MEDIUM]}>{this.props.roomName}</Text>
                        {this.props.isAvailable == 1 ? (
                            <Text style={[{textAlign:'right',  width:'40%', paddingLeft:16,marginRight:24,marginTop:8}, CLStyles.H2Italic_Green]}>Available</Text>
                        ) : (<Text style={[{textAlign:'right',  width:'40%', paddingLeft:16,marginRight:24,marginTop:8}, CLStyles.H2Italic_Gray]}>Not Available</Text>)}
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:8}}>
                        <Text style={[{textAlign:'left', width:'49%', paddingLeft:24}, CLStyles.H2Light]}>Level {this.props.level}</Text>
                        <Text style={[{textAlign:'right',  width:'40%',marginRight:24}, CLStyles.H2Light]}>{this.props.capacity} Pax</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default CLRoomDetails
