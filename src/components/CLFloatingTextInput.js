import React, { Component } from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import CLColors from '../res/CLColors';
import CLStyles from '../res/CLStyles';
import CLFonts from '../res/CLFonts';
import FloatingLabel from 'react-native-floating-labels';

//FLoating labels for Date and time inputs
export class CLFloatingTextInput extends Component {
    state = { isFocused: false,showBoldText: false }

    //handle focus gain change events
    onFocusChange = () => {
        this.setState({ isFocused: true, showBoldText: true });
    }

    //handle focus gain change events
    onFocusCombine = () =>{
        this.onFocusChange()
        this.props.onFocus()
    }

    //handle focus lost change events
    onBlurChange = (textLength) => {
        if(textLength > 0){
            this.setState({ showBoldText: true });
        }else{
            this.setState({ showBoldText: false });
        }
        this.setState({ isFocused: false })
    }

    onFocus = () => {
        return false
    }

    render() {
        return (
            <View>
                  <FloatingLabel
                       labelStyle={(this.props.labelStyle || this.props.isDone)? CLStyles.H3Light : CLStyles.H2Light_BLACK}
                       inputStyle={[CLStyles.H2Light,styles.input]}
                       keyboardType={this.props.keyboardType}
                       value={this.props.textEntered}
                       style={[styles.formInput,{borderColor: CLColors.GRAY3}]}
                       onChangeText={this.props.onChangeText}
                       onFocus={this.onFocusCombine}
                       onBlur={() => this.onBlurChange(this.props.textLength)}
                  >{this.props.floatingLabel}</FloatingLabel>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formInput: {
      borderBottomWidth: 1,
      marginLeft: 16
    },
    input: {
      borderWidth: 0,
      paddingTop: 5,
      paddingBottom:-5
    }
})

export default CLFloatingTextInput

