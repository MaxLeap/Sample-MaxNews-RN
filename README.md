# Sample-MaxNews-RN

本项目是基于 MaxLeap ReactNative SDK 开发的一个实例。

![](./MaxNews.gif)

## 使用步骤：

1. 在 https://www.maxleap.cn 中创建 MaxNews 模版应用，记录 appid 和 clientkey。

2. 更换 `/ios/MaxNews/AppDelegate.m` 文件中中的宏定义为步骤 1 中的 appid 和 clientkey：

	```objc
	#define MAXLEAP_APPID           @"your_app_id"
	#define MAXLEAP_CLIENTKEY       @"your_client_key"
	```

3. 分别替换 `/android/app/src/main/java/com/maxnews/App.java` 中的 `MAXLEAP_APPID` 和 `MAXLEAP_CLIENTKEY` 为步骤 1 中的 appid 和 clientkey

	```
	public static String MAXLEAP_APPID = "your_app_id";
	public static String MAXLEAP_CLIENTKEY = "your_client_key";
	```
