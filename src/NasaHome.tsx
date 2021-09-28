import axios from "axios";
import React, { Component } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  navigation: any;
}

interface State {
  data: any;
  showRandom: any;
  input: any;
}

export default class NasaHome extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
      showRandom: false,
      input: 0,
    };
  }

  randomAPI() {
    this.setState({ showRandom: true });
    console.log("ioiioiooiooioio", this.state.showRandom);
    axios
      .get(
        "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=IcQ4uuQindHxPWNPKM4b12deRWkh9IuTWhsWcojt"
      )
      .then((response) => {
        this.setState({ data: response.data.near_earth_objects });
        console.log("resssssss", this.state.data);
      });
  }

  details(id: any) {
    console.log(this.state.input, "iiiiiddddd");
    axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=IcQ4uuQindHxPWNPKM4b12deRWkh9IuTWhsWcojt`
      )
      .then((response) => {
        console.log("rrrrrrrrrr", JSON.stringify(response.data.name));
        this.props.navigation.navigate("NasaDetails", {
          name: response.data.name,
          url: response.data.nasa_jpl_url,
          haz: response.data.is_potentially_hazardous_asteroid,
        });
      })

      .catch((err) => {
        console.log("dddd", err);
        alert("Something went wrong");
      });
  }
  renderData(item: any) {
    console.log("ssss", item.item.id);
    return (
      <TouchableOpacity
        style={{
          borderWidth: 1,
          padding: 5,
          alignSelf: "center",
          width: "90%",
          marginTop: 5,
          alignItems: "center",
        }}
        onPress={() => this.details(item.item.id)}
      >
        <Text>{item.item.id}</Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={{flex:1,padding:10}}>
        <TextInput
          style={{ margin: 20, borderWidth: 2,marginTop:'10%' }}
          onChangeText={(text: any) => this.setState({ input: text })}
        />

        <TouchableOpacity
          disabled={
            this.state.input.length == "0"
              ? true
              : this.state.input.length == undefined
              ? true
              : false
          }

          style={{ margin: 20, alignSelf:'center',alignItems:'center',backgroundColor:
          this.state.input.length == "0"
            ? "grey"
            : this.state.input.length == undefined
            ? "grey"
            : "yellow",width:'50%',padding:10,borderRadius:10,elevation:5}}
       

        
          onPress={() => {
            this.details(this.state.input);
          }}
        >
          <Text>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ margin: 20, alignSelf:'center',alignItems:'center',backgroundColor: "yellow" ,width:'50%',padding:10,borderRadius:10,elevation:5}}
          onPress={() => this.randomAPI()}
        >
          <Text>Random</Text>
        </TouchableOpacity>

        {this.state.showRandom ? (
          <FlatList
            data={this.state.data}
            renderItem={(item) => this.renderData(item)}
            keyExtractor={(index, id) => id.toString()}
          />
        ) : null}
      </View>
    );
  }
}
