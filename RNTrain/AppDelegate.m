//
//  AppDelegate.m
//  RNTrain
//
//  Created by Erik Peng on 2017/7/19.
//  Copyright © 2017年 Erik Peng. All rights reserved.
//

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
@import NativeNavigation;

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self
                                              launchOptions:launchOptions];
    ReactNavigationCoordinator *coordinator = [ReactNavigationCoordinator sharedInstance];
    
    [coordinator setBridge:bridge];
    [coordinator setDelegate:self];
    
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    ReactViewController *mainViewController = [[ReactViewController alloc] initWithModuleName:@"Home"];
    self.window.rootViewController = [[coordinator navigation] makeNavigationControllerWithRootViewController:mainViewController];
    [self.window makeKeyAndVisible];
    return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
    // NSString *path = [NSString stringWithFormat:@"http://%@:8081/index.ios.bundle?platform=ios&dev=true", @"localhost"];
    // return [NSURL URLWithString:path];
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
}

- (UIViewController *)rootViewControllerForCoordinator: (ReactNavigationCoordinator *)coordinator {
    return self.window.rootViewController;
}

@end
