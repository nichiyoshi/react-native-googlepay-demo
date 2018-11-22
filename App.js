/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from "react"
import {Platform, StyleSheet, Text, View, TouchableOpacity} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import GooglePayModule from "./lib/googlepayModule"

const cardNetworks = ["AMEX", "JCB", "MASTERCARD", "VISA"]

const request = {
  cardPaymentMethodMap: {
    gateway: {
      name: "example",
      merchantId: "exampleMerchantId"
    },
    cardNetworks
  },
  transaction: {
    totalPrice: "200",
    totalPriceStatus: "FINAL",
    currencyCode: "JPY"
  },
  merchantName: "Example Merchant"
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAvailable: null,
      text: ""
    }
  }

  onPressCheck = async () => {
    const isAvailable = await GooglePayModule.possiblyShowGooglePayButton(
      GooglePayModule.ENVIRONMENT_TEST,
      cardNetworks
    ).catch(error => console.log(error))

    this.setState({isAvailable})
  }

  onPressPay = async () => {
    const token = await GooglePayModule.requestPayment(
      GooglePayModule.ENVIRONMENT_TEST,
      request
    ).catch(error => this.setState({text: `error: ${error}`}))

    this.setState({text: `token: ${token}`})
  }

  render() {
    const {isAvailable, text} = this.state

    return (
      <View style={styles.container}>
        <Text>Price 200 yen</Text>
        <Text style={{marginTop: 50}}>
          {isAvailable === true
            ? "Available!!"
            : isAvailable === false
              ? "Not available"
              : null}
        </Text>
        <TouchableOpacity
          onPress={this.onPressCheck}
          style={{marginTop: 10, backgroundColor: "blue", padding: 10}}
        >
          <Text style={{color: "white"}}>Check if Google Pay is available</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isAvailable !== true}
          onPress={this.onPressPay}
          style={{marginTop: 50}}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "green",
              padding: 10
            }}
            opacity={isAvailable === true ? 1 : 0.2}
          >
            <Icon name="google" size={20} style={{marginRight: 10}} />
            <Text>Pay with Google Pay</Text>
          </View>
        </TouchableOpacity>

        <Text style={{marginTop: 20}}>{text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
})
