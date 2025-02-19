#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import "RNSplashScreen.h"

#import "BeeApp-Swift.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"BeeApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  BOOL success = [super application:application didFinishLaunchingWithOptions:launchOptions];
  
   if (success) {
     //This is where we will put the logic to get access to rootview
     UIView *rootView = self.window.rootViewController.view;
     
     rootView.backgroundColor = [UIColor blackColor]; // change with your desired backgroundColor
//     rootView.backgroundColor = [UIColor colorWithRed:45.0/255.0 green:160.0/255.0 blue:202.0/255.0 alpha:1.0];
     
     Dynamic *t = [Dynamic new];
     UIView *animationUIView = (UIView *)[t createAnimationViewWithRootView:rootView lottieName:@"animation"]; // change lottieName to your lottie files name
  
     // register LottieSplashScreen to RNSplashScreen
     [RNSplashScreen showLottieSplash:animationUIView inRootView:rootView];
     // casting UIView type to AnimationView type
     AnimationView *animationView = (AnimationView *) animationUIView;
     // play
     [t playWithAnimationView:animationView];
     // If you want the animation layout to be forced to remove when hide is called, use this code
     [RNSplashScreen setAnimationFinished:true];
   }
  
   return success;

//  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
