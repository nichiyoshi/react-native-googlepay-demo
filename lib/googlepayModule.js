import { NativeModules, requireNativeComponent } from 'react-native'

export default NativeModules.GooglePayModule

export const GooglePayImage = requireNativeComponent('GooglePayImageView')
