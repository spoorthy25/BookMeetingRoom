import React, { Component } from "react";
import { TouchableOpacity, Image } from "react-native";
import CLImages from "../res/CLImages";

export class NavBackButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{ width: 12, height: 20}}
      >
        <Image
          source={CLImages.Back}
          style={{ width: 12, height: 20 }}
        />
      </TouchableOpacity>
    );
  }
}

export default NavBackButton;
