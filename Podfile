# Uncomment the next line to define a global platform for your project
platform :ios, '9.0'

target 'RNTrain' do
  # Native Navigation uses Swift, so this line is required!
  use_frameworks!

  # Native Navigation!
  pod 'native-navigation', :path => './node_modules/native-navigation'

  pod 'React', :path => './node_modules/react-native', :subspecs => [
    'Core',
    'DevSupport', # Include this to enable In-App Devmenu if RN >= 0.43
    'RCTText',
    'RCTAnimation', # import <React/RCTValueAnimatedNode.h>
    'RCTImage',
    'RCTNetwork',
    'RCTWebSocket', # needed for debugging
    'BatchedBridge'
  ]
  # Explicitly include Yoga if you are using RN >= 0.42.0
  pod "Yoga", :path => "./node_modules/react-native/ReactCommon/yoga"

end
