import "./styles.css";

document.getElementById("app").innerHTML =
  '\
<div class="container-fluid">\
  <div class="container" id="webContainer">\
    <h2 class="text-center p-3 alert alert-danger mt-6" id="webMessage"></div>\
  </h2>\
  <div class="container" id="appContainer">\
    <h2 class="text-center p-3 alert alert-primary mt-6" id="appMessage"></h2>\
  </div>\
</div>\
';

// JavaScript
function identifyDevice() {
  var ua = navigator.userAgent;
  var device = { value: "" };
  var isAndroid = {
    value: ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1
  };
  var isiOS = { value: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) };
  var isMobile = { value: isAndroid.value || isiOS.value };
  var isWeb = { value: !isMobile.value };
  var message = { value: "" };

  console.log(
    "Andriod=>" + isAndroid.value,
    "ios=>" + isiOS.value,
    "mobile=>" + isMobile.value,
    "web=>" + isWeb.value
  );

  if (isWeb.value) {
    device.value = "Web";
    message.value = "请使用移动设备开启页面";
  } else if (isiOS.value) {
    device.value = "iOS";
    var iphoneVersion = /CPU iPhone OS (\d+(\.\d+)?)/
      .exec(ua)[1]
      .replace("_", ".");
    if (Number(iphoneVersion) >= 12) {
      message.value =
        "当前系统符合要求，请到 App Store 搜寻 “inCare” 后安装 app。";
    } else {
      message.value = "當前系統版本不支持，請使用 iOS 12.0 以上系統";
    }
  } else {
    device.value = "Android";
    var androidVersion = /Android (\d+(\.\d+)?)/.exec(ua)[1].replace("_", ".");
    if (Number(androidVersion) >= 9) {
      message.value =
        "当前系统符合要求，请到应用商店搜寻 “inCare” 后安装 app。";
    } else {
      message.value = "當前系統版本不支持，請使用 Android 9.0 以上系統";
    }
  }
  return { message: message, isWeb: isWeb, ua: ua };
}

var result = identifyDevice();
var message = result.message;
var isWeb = result.isWeb;
var ua = result.ua;

var webContainer = document.getElementById("webContainer");
var webMessage = document.getElementById("webMessage");
var appContainer = document.getElementById("appContainer");
var appMessage = document.getElementById("appMessage");

if (isWeb.value) {
  webContainer.style.display = "block";
  webMessage.textContent = message.value;
} else {
  appContainer.style.display = "block";
  appMessage.textContent = message.value;
}
