/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import GooglePayModule, { GooglePayImage } from './lib/googlepayModule'

/**
 * Variery of cards your gateway accept
 * @type {Array}
 */
const cardNetworks = ['AMEX', 'JCB', 'MASTERCARD', 'VISA']

/**
 * Request
 * @type {Object}
 */
const request = {
  cardPaymentMethodMap: {
    gateway: {
      name: 'example',
      merchantId: 'exampleMerchantId'
    },
    cardNetworks
  },
  transaction: {
    // this is just sample so price is fixed.
    totalPrice: '200',
    totalPriceStatus: 'FINAL',
    currencyCode: 'JPY'
  },
  merchantName: 'Example Merchant'
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAvailable: null,
      text: ''
    }
  }

  /**
   * Called when "Check if Google Pay is available" button is pressed
   */
  onPressCheck = async () => {
    const isAvailable = await GooglePayModule.possiblyShowGooglePayButton(
      GooglePayModule.ENVIRONMENT_TEST,
      cardNetworks
    ).catch(error => {
      console.warn(error.toString())
      return false
    })

    this.setState({ isAvailable })
  }

  /**
   * Called when Google Pay button is pressed
   */
  onPressPay = async () => {
    const token = await GooglePayModule.requestPayment(
      GooglePayModule.ENVIRONMENT_TEST,
      request
    ).catch(error => this.setState({ text: `error: ${error}` }))

    if (token) {
      this.setState({ text: `token: ${token}` })
    }
  }

  render() {
    const { isAvailable, text } = this.state

    return (
      <View style={styles.container}>
        <Text>Price 200 yen</Text>
        <Text style={{ marginTop: 50 }}>
          {isAvailable === true
            ? 'Available!!'
            : isAvailable === false
              ? 'Not available'
              : null}
        </Text>
        <TouchableOpacity
          onPress={this.onPressCheck}
          style={[
            {
              marginTop: 10,
              backgroundColor: 'blue',
              padding: 10
            },
            styles.button
          ]}>
          <Text style={{ color: 'white' }}>
            Check if Google Pay is available
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isAvailable !== true}
          onPress={this.onPressPay}
          style={{ marginTop: 50 }}>
          <GooglePayImage
            style={[styles.button, { opacity: isAvailable === true ? 1 : 0.3 }]}
          />
        </TouchableOpacity>

        <Text style={{ marginTop: 20 }}>{text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  button: {
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
