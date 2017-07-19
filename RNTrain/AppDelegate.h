//
//  AppDelegate.h
//  RNTrain
//
//  Created by Erik Peng on 2017/7/19.
//  Copyright © 2017年 Erik Peng. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>
@import NativeNavigation;

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, ReactNavigationCoordinatorDelegate>

@property (nonatomic, strong) UIWindow *window;

@end

