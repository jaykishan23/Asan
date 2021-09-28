import { Route } from "@react-navigation/routers";
import React, { Component } from "react";
import { Text, View } from "react-native";

interface Props {
  route: any;
}

interface State {}

export default class NasaDetails extends Component<Props, State> {
  render() {
    const { name } = this.props.route.params;
    const { url } = this.props.route.params;
    const { haz } = this.props.route.params;
    console.log(name, "idididididididdid");
    return (
      <View style={{borderWidth:1,margin:10,padding:5}}>
        <Text>Name : {name} </Text>
        <Text>URL : {url}</Text>
        <Text>Hazardous : {haz.toString()}</Text>
      </View>
    );
  }
}
