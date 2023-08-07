/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./worker/index.js":
/*!*************************!*\
  !*** ./worker/index.js ***!
  \*************************/
/***/ (() => {

eval("\nself.__WB_DISABLE_DEV_LOGS = true;\nconst getHref = (url)=>{\n    const mainUrl = `${location.protocol}//${location.host}`;\n    return mainUrl + url;\n};\nself.addEventListener('push', function(event) {\n    const data = JSON.parse(event.data.text());\n    event.waitUntil(registration.showNotification(data.title, {\n        body: data.message,\n        icon: '/icons/android/android-launchericon-192-192.png',\n        data: {\n            url: data.url\n        }\n    }));\n});\nself.addEventListener('notificationclick', function(event) {\n    event.notification.close();\n    event.waitUntil(clients.matchAll({\n        type: 'window',\n        includeUncontrolled: false\n    }).then(()=>{\n        return clients.openWindow(getHref(event.notification.data.url));\n    }));\n});\n\n\n//# sourceURL=webpack://cherry_valley_frontend_app/./worker/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./worker/index.js"]();
/******/ 	
/******/ })()
;