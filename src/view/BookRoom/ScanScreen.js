import React, { Component } from 'react';
import {  AppRegistry, StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export class ScanScreen extends Component {
  onSuccess = e => {
    this.props.navigation.navigate('BookingSucess',{url:e.data})
  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Scan the bar code displayed on the door.
          </Text>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    marginTop:32,
    color: '#777'
  }
});
export default ScanScreen