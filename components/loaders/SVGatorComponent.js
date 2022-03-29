import React from "react";
import WebView from "react-native-webview";
import { useWindowDimensions, StyleSheet } from "react-native";

function getHtml() {
  return SVGatorPlayer.wrapPage(
    '<svg id="ex1tinvEXrk1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 121 154" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><g transform="matrix(.5099 0 0 0.512508 29.652107 36.71218)"><rect width="39" height="8" rx="4" ry="4" transform="translate(17 102)" fill="#312070"/><rect width="24" height="8" rx="4" ry="4" transform="translate(82 102)" fill="#312070"/><g id="ex1tinvEXrk5" transform="matrix(.70909 0 0 0.719633 17.713905 14.090548)"><path d="M91.3046,2h-30.6092C58.1022,2,56,3.30325,56,4.91089v8.17821C56,14.6967,58.1022,16,60.6954,16h30.6092C93.8978,16,96,14.6967,96,13.0891v-8.17821C96,3.30325,93.8978,2,91.3046,2Z" fill="none" stroke="#312070" stroke-width="4"/><path d="M96.5,15.9453h-77c-9.1127,0-16.5,7.6384-16.5,17.0608v47.933C3,90.3616,10.3873,98,19.5,98h77c9.113,0,16.5-7.6384,16.5-17.0609v-47.933c0-9.4224-7.387-17.0608-16.5-17.0608Z" fill="none" stroke="#312070" stroke-width="5"/><path d="M20.3426,41.327c3.174,0,5.7471-2.6605,5.7471-5.9424s-2.5731-5.9425-5.7471-5.9425-5.7471,2.6606-5.7471,5.9425s2.5731,5.9424,5.7471,5.9424Z" fill="#312070"/></g><path d="M71,39C56.6413,39,45,49.0122,45,61.3614C45,73.7107,70.0714,110,70.0714,110s26.9286-36.2885,26.9286-48.6386-11.6404-22.3614-26-22.3614Zm0,32.2867c-6.3725,0-11.5393-4.4446-11.5393-9.9245c0-5.4814,5.1668-9.9244,11.5393-9.9244c6.3734,0,11.5393,4.443,11.5393,9.9244.0009,5.4799-5.1659,9.9245-11.5393,9.9245Z" fill="#312070"/><text dx="0" dy="0" font-family="&quot;ex1tinvEXrk1:::Poppins&quot;" font-size="24" font-weight="700" transform="matrix(1.16287 0 0 1.061362 12.317984 132.766921)" fill="#312070" stroke-width="0"><tspan y="0" font-weight="700" stroke-width="0"><![CDATA[SKANR]]></tspan></text></g><script><![CDATA[' +
      SVGatorPlayer.getPlayer("5c7f360c") +
      '(function(s,i,o,w,a,b){w[o]=w[o]||{};w[o][s]=w[o][s]||[];w[o][s].push(i);})(\'5c7f360c\',{"root":"ex1tinvEXrk1","animations":[{"elements":{"ex1tinvEXrk5":{"transform":{"data":{"o":{"x":58.841125,"y":50.072198,"type":"corner"},"t":{"x":-58,"y":-50}},"keys":{"r":[{"t":0,"v":0},{"t":400,"v":0.213224},{"t":600,"v":0.059744},{"t":800,"v":90.461345},{"t":1000,"v":465.36537},{"t":1400,"v":425.133975},{"t":1600,"v":365.476842},{"t":1800,"v":349.32363},{"t":2000,"v":360.23921,"e":[0.42,0,0.58,1]}],"s":[{"t":0,"v":{"x":0.70909,"y":0.719633},"e":[0.25,1,0.25,1]},{"t":1000,"v":{"x":0.77377,"y":0.759452},"e":[0.25,1,0.25,1]},{"t":2000,"v":{"x":0.795758,"y":0.85461}}]}}}},"s":"MJDA1Mjk2M2Q3Zkw5MDXhkN2M4Zjg0OGE4OTNKkNTU0ZDRiNGI0YjQ3VM2Q3Zjg0RzhkODA3ZGThmODQ4YUc4OTNkNTGU0YzQ3RDNkODQ4ZjgUwOGQ3Y0g4Zjg0OGE4IOThlM2RNNTU0YjQ3MM2Q4MTg0ODc4NzNkNTSU0YzQ3M2Q3Yzg3VThVmODA4ZDg5N2M4ZjgwRM2Q1NThmOGQ5MDgwVIjQ3M2Q4ZThiODA4MDFdmM2Q1NTRjOTg/"}],"options":"MWDAxMDg4MmY4MDgxNmTU3ZjgxMmZVNDcyZjcI5N2M2ZTcxMmY4YQ|"},\'__SVGATOR_PLAYER__\',window)]]></script><style><![CDATA[@font-face {font-family: \'ex1tinvEXrk1:::Poppins\';font-style: normal;font-weight: 700;src: url(data:font/ttf;charset=utf-8;base64,AAEAAAAMAIAAAwBAR1BPU0R0THUAAAD4AAAAHkdTVUIfQCdhAAABfAAAAC5PUy8yWyOiAAAAAjgAAABgY21hcACtAUAAAAHkAAAAVGdseWYOlIPsAAACmAAAAaxoZWFkGlEkcQAAAawAAAA2aGhlYQv8AV8AAAFYAAAAJGhtdHgQRQD0AAAA3AAAABxsb2NhARcBqwAAAMwAAAAQbWF4cACJASUAAAEYAAAAIG5hbWUiZ0DZAAAERAAAAcRwb3N0/7gAMgAAATgAAAAgAAAAJgAmAEAAWQBvAJgA1gH0AAAA1AAAAuEAEAK5AD4C8AA+AowAPgJnACoAAQAAAAoAHAAcAAFERkxUAAgABAAAAAD//wAAAAAAAAABAAAABwCQAAwAdAAGAAEAAgAeAAYAAABkAAAAAwACAAMAAAAAAAD/tQAyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAABBr+ogBkCZ39zvkYCa0AAQAAAAAAAAAAAAAAAAAAAAcAAQAAAAoALAAsAANERkxUABhkZXYyABRkZXZhABQAAAAAAAQAAAAA//8AAAAAAAAAAQAAAAQBBsYc45ZfDzz1AAMD6AAAAADYpKnIAAAAANsWNsn9zv2iCa0EVAABAAcAAgAAAAAAAAAAAAIAAAADAAAAFAADAAEAAAAUAAQAQAAAAAwACAACAAQAIABBAEsATgBT//8AAAAgAEEASwBOAFL////h/8H/uP+2/7MAAQAAAAAAAAAAAAAAAAAEA2kCvAAFAAACigJYAAAASwKKAlgAAAFeADIBTgAAAAAIAAAAAAAAAAAAAAcAAAAAAAAAAAAAAABJVEZPAKAAACIVBBr+ogBkBG8CcyAAAJMAAAAAAi4CwQAAACAABAAFAAAAAAH0ArwAAwAGAAkADAAPAAARIREhASEXAzcnAREHEycHAfT+DAGk/qyqyKqqAZCqjKqqArz9RAKK//7U///+AgH+//7U//8AAgAQAAAC0gK+AAcACgAAJSEHIxMzEyMLAgHz/voqs/7G/rVWV1Z8fAK+/UIBAAEB/v8AAAEAPgAAAqYCvgAKAAAhAxEjETMREzMBAQHV7Kur6sn+8AEaATb+ygK+/swBNP6o/poAAQA+AAACsgK+AAkAACEjAREjETMBETMCsqv+4qurAR6rAbH+TwK+/k0BswACAD4AAAJlAr4ADgAXAAAhAyMRIxEhMhYWFRQGBxMBMzI2NTQmIyMBpJIpqwEfU3U6T02i/oRqLy8vL2oBCf73Ar46ZT5Gbhf+6gGCLiooLgAAAQAq//kCPALIACoAABYmJiczFhYzMjY1NCYmJy4CNTQ2MzIWFyMmJiMiBhUUFhceAhUUBgYj73pJArYELiUmLCMzL0RWPo5ydI4FuQIuJB8mQEREVT49dE8HMmJFJykjHxoiFg4VKlJCYm9vYyInIR8iJhYXKlA/PGI6AAAACABmAAMAAQQJAAAAogC8AAMAAQQJAAEADgCuAAMAAQQJAAIACACmAAMAAQQJAAMANgBwAAMAAQQJAAQAGABYAAMAAQQJAAUACgBOAAMAAQQJAAYAGAA2AAMAAQQJAA4ANgAAAGgAdAB0AHAAcwA6AC8ALwBzAGMAcgBpAHAAdABzAC4AcwBpAGwALgBvAHIAZwAvAE8ARgBMAFAAbwBwAHAAaQBuAHMALQBCAG8AbABkADQALgAwADAANABQAG8AcABwAGkAbgBzACAAQgBvAGwAZABJAFQARgBPADsAIABQAG8AcABwAGkAbgBzACAAQgBvAGwAZAA7ACAANAAuADAAMAA0AGIAOABCAG8AbABkAFAAbwBwAHAAaQBuAHMAQwBvAHAAeQByAGkAZwBoAHQAIAAyADAAMgAwACAAVABoAGUAIABQAG8AcABwAGkAbgBzACAAUAByAG8AagBlAGMAdAAgAEEAdQB0AGgAbwByAHMAIAAoAGgAdAB0AHAAcwA6AC8ALwBnAGkAdABoAHUAYgAuAGMAbwBtAC8AaQB0AGYAbwB1AG4AZAByAHkALwBQAG8AcABwAGkAbgBzACk=) format(\'truetype\');}]]></style></svg>'
  );
}

const PLAYERS = {
  "5c7f360c":
    '!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):((t="undefined"!=typeof globalThis?globalThis:t||self).__SVGATOR_PLAYER__=t.__SVGATOR_PLAYER__||{},t.__SVGATOR_PLAYER__["5c7f360c"]=n())}(this,(function(){"use strict";function t(t,n){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);n&&(e=e.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),r.push.apply(r,e)}return r}function n(n){for(var r=1;r\x3carguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?t(Object(e),!0).forEach((function(t){u(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):t(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function e(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function i(t,n){for(var r=0;r\x3cn.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function o(t,n,r){return n&&i(t.prototype,n),r&&i(t,r),t}function u(t,n,r){return n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(t,n){return(l=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function f(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function s(t,n,r){return(s=f()?Reflect.construct:function(t,n,r){var e=[null];e.push.apply(e,n);var i=new(Function.bind.apply(t,e));return r&&l(i,r.prototype),i}).apply(null,arguments)}function c(t,n){if(n&&("object"==typeof n||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called");return t}(t)}function h(t,n,r){return(h="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,n,r){var e=function(t,n){for(;!Object.prototype.hasOwnProperty.call(t,n)&&null!==(t=a(t)););return t}(t,n);if(e){var i=Object.getOwnPropertyDescriptor(e,n);return i.get?i.get.call(r):i.value}})(t,n,r||t)}function v(t){return function(t){if(Array.isArray(t))return y(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,n){if(!t)return;if("string"==typeof t)return y(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return y(t,n)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,e=new Array(n);r\x3cn;r++)e[r]=t[r];return e}Number.isInteger||(Number.isInteger=function(t){return"number"==typeof t&&isFinite(t)&&Math.floor(t)===t}),Number.EPSILON||(Number.EPSILON=2220446049250313e-31);var g=p(Math.pow(10,-6));function p(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6;if(Number.isInteger(t))return t;var r=Math.pow(10,n);return Math.round((+t+Number.EPSILON)*r)/r}function d(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:g;return Math.abs(t-n)\x3cr}var m=Math.PI/180;function b(t){return t}function w(t,n,r){var e=1-r;return 3*r*e*(t*e+n*r)+r*r*r}function x(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;return t\x3c0||t>1||r\x3c0||r>1?null:d(t,n)&&d(r,e)?b:function(i){if(i\x3c=0)return t>0?i*n/t:0===n&&r>0?i*e/r:0;if(i>=1)return r\x3c1?1+(i-1)*(e-1)/(r-1):1===r&&t\x3c1?1+(i-1)*(n-1)/(t-1):1;for(var o,u=0,a=1;u\x3ca;){var l=w(t,r,o=(u+a)/2);if(d(i,l))break;l\x3ci?u=o:a=o}return w(n,e,o)}}function A(){return 1}function k(t){return 1===t?1:0}function _(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(1===t){if(0===n)return k;if(1===n)return A}var r=1/t;return function(t){return t>=1?1:(t+=n*r)-t%r}}var S=Math.sin,O=Math.cos,j=Math.acos,M=Math.asin,P=Math.tan,E=Math.atan2,I=Math.PI/180,R=180/Math.PI,F=Math.sqrt,N=function(){function t(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,u=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;e(this,t),this.m=[n,r,i,o,u,a],this.i=null,this.w=null,this.s=null}return o(t,[{key:"determinant",get:function(){var t=this.m;return t[0]*t[3]-t[1]*t[2]}},{key:"isIdentity",get:function(){if(null===this.i){var t=this.m;this.i=1===t[0]&&0===t[1]&&0===t[2]&&1===t[3]&&0===t[4]&&0===t[5]}return this.i}},{key:"point",value:function(t,n){var r=this.m;return{x:r[0]*t+r[2]*n+r[4],y:r[1]*t+r[3]*n+r[5]}}},{key:"translateSelf",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(!t&&!n)return this;var r=this.m;return r[4]+=r[0]*t+r[2]*n,r[5]+=r[1]*t+r[3]*n,this.w=this.s=this.i=null,this}},{key:"rotateSelf",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(t%=360){var n=S(t*=I),r=O(t),e=this.m,i=e[0],o=e[1];e[0]=i*r+e[2]*n,e[1]=o*r+e[3]*n,e[2]=e[2]*r-i*n,e[3]=e[3]*r-o*n,this.w=this.s=this.i=null}return this}},{key:"scaleSelf",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if(1!==t||1!==n){var r=this.m;r[0]*=t,r[1]*=t,r[2]*=n,r[3]*=n,this.w=this.s=this.i=null}return this}},{key:"skewSelf",value:function(t,n){if(n%=360,(t%=360)||n){var r=this.m,e=r[0],i=r[1],o=r[2],u=r[3];t&&(t=P(t*I),r[2]+=e*t,r[3]+=i*t),n&&(n=P(n*I),r[0]+=o*n,r[1]+=u*n),this.w=this.s=this.i=null}return this}},{key:"resetSelf",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,u=this.m;return u[0]=t,u[1]=n,u[2]=r,u[3]=e,u[4]=i,u[5]=o,this.w=this.s=this.i=null,this}},{key:"recomposeSelf",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;return this.isIdentity||this.resetSelf(),t&&(t.x||t.y)&&this.translateSelf(t.x,t.y),n&&this.rotateSelf(n),r&&(r.x&&this.skewSelf(r.x,0),r.y&&this.skewSelf(0,r.y)),!e||1===e.x&&1===e.y||this.scaleSelf(e.x,e.y),i&&(i.x||i.y)&&this.translateSelf(i.x,i.y),this}},{key:"decompose",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=this.m,e=r[0]*r[0]+r[1]*r[1],i=[[r[0],r[1]],[r[2],r[3]]],o=F(e);if(0===o)return{origin:{x:p(r[4]),y:p(r[5])},translate:{x:p(t),y:p(n)},scale:{x:0,y:0},skew:{x:0,y:0},rotate:0};i[0][0]/=o,i[0][1]/=o;var u=r[0]*r[3]-r[1]*r[2]\x3c0;u&&(o=-o);var a=i[0][0]*i[1][0]+i[0][1]*i[1][1];i[1][0]-=i[0][0]*a,i[1][1]-=i[0][1]*a;var l=F(i[1][0]*i[1][0]+i[1][1]*i[1][1]);if(0===l)return{origin:{x:p(r[4]),y:p(r[5])},translate:{x:p(t),y:p(n)},scale:{x:p(o),y:0},skew:{x:0,y:0},rotate:0};i[1][0]/=l,i[1][1]/=l,a/=l;var f=0;return i[1][1]\x3c0?(f=j(i[1][1])*R,i[0][1]\x3c0&&(f=360-f)):f=M(i[0][1])*R,u&&(f=-f),a=E(a,F(i[0][0]*i[0][0]+i[0][1]*i[0][1]))*R,u&&(a=-a),{origin:{x:p(r[4]),y:p(r[5])},translate:{x:p(t),y:p(n)},scale:{x:p(o),y:p(l)},skew:{x:p(a),y:0},rotate:p(f)}}},{key:"clone",value:function(){var t=this.m;return new this.constructor(t[0],t[1],t[2],t[3],t[4],t[5])}},{key:"toString",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:" ";if(null===this.s){var n=this.m.map((function(t){return p(t)}));1===n[0]&&0===n[1]&&0===n[2]&&1===n[3]?this.s="translate("+n[4]+t+n[5]+")":this.s="matrix("+n.join(t)+")"}return this.s}}],[{key:"create",value:function(t){return t?Array.isArray(t)?s(this,v(t)):t instanceof this?t.clone():(new this).recomposeSelf(t.origin,t.rotate,t.skew,t.scale,t.translate):new this}}]),t}();function T(t,n,r){return t>=.5?r:n}function q(t,n,r){return 0===t||n===r?n:t*(r-n)+n}function B(t,n,r){var e=q(t,n,r);return e\x3c=0?0:e}function L(t,n,r){var e=q(t,n,r);return e\x3c=0?0:e>=1?1:e}function C(t,n,r){return 0===t?n:1===t?r:{x:q(t,n.x,r.x),y:q(t,n.y,r.y)}}function D(t,n,r){var e=function(t,n,r){return Math.round(q(t,n,r))}(t,n,r);return e\x3c=0?0:e>=255?255:e}function z(t,n,r){return 0===t?n:1===t?r:{r:D(t,n.r,r.r),g:D(t,n.g,r.g),b:D(t,n.b,r.b),a:q(t,null==n.a?1:n.a,null==r.a?1:r.a)}}function V(t,n){for(var r=[],e=0;e\x3ct;e++)r.push(n);return r}function G(t,n){if(--n\x3c=0)return t;var r=(t=Object.assign([],t)).length;do{for(var e=0;e\x3cr;e++)t.push(t[e])}while(--n>0);return t}var Y,$=function(){function t(n){e(this,t),this.list=n,this.length=n.length}return o(t,[{key:"setAttribute",value:function(t,n){for(var r=this.list,e=0;e\x3cthis.length;e++)r[e].setAttribute(t,n)}},{key:"removeAttribute",value:function(t){for(var n=this.list,r=0;r\x3cthis.length;r++)n[r].removeAttribute(t)}},{key:"style",value:function(t,n){for(var r=this.list,e=0;e\x3cthis.length;e++)r[e].style[t]=n}}]),t}(),U=/-./g,Q=function(t,n){return n.toUpperCase()};function H(t){return"function"==typeof t?t:T}function J(t){return t?"function"==typeof t?t:Array.isArray(t)?function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:b;if(!Array.isArray(t))return n;switch(t.length){case 1:return _(t[0])||n;case 2:return _(t[0],t[1])||n;case 4:return x(t[0],t[1],t[2],t[3])||n}return n}(t,null):function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:b;switch(t){case"linear":return b;case"steps":return _(n.steps||1,n.jump||0)||r;case"bezier":case"cubic-bezier":return x(n.x1||0,n.y1||0,n.x2||0,n.y2||0)||r}return r}(t.type,t.value,null):null}function Z(t,n,r){var e=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=n.length-1;if(t\x3c=n[0].t)return e?[0,0,n[0].v]:n[0].v;if(t>=n[i].t)return e?[i,1,n[i].v]:n[i].v;var o,u=n[0],a=null;for(o=1;o\x3c=i;o++){if(!(t>n[o].t)){a=n[o];break}u=n[o]}return null==a?e?[i,1,n[i].v]:n[i].v:u.t===a.t?e?[o,1,a.v]:a.v:(t=(t-u.t)/(a.t-u.t),u.e&&(t=u.e(t)),e?[o,t,r(t,u.v,a.v)]:r(t,u.v,a.v))}function K(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return t&&t.length?"function"!=typeof n?null:("function"!=typeof r&&(r=null),function(e){var i=Z(e,t,n);return null!=i&&r&&(i=r(i)),i}):null}function W(t,n){return t.t-n.t}function X(t,n,e,i,o){var u,a="@"===e[0],l="#"===e[0],f=Y[e],s=T;switch(a?(u=e.substr(1),e=u.replace(U,Q)):l&&(e=e.substr(1)),r(f)){case"function":if(s=f(i,o,Z,J,e,a,n,t),l)return s;break;case"string":s=K(i,H(f));break;case"object":if((s=K(i,H(f.i),f.f))&&"function"==typeof f.u)return f.u(n,s,e,a,t)}return s?function(t,n,r){if(arguments.length>3&&void 0!==arguments[3]&&arguments[3])return t instanceof $?function(e){return t.style(n,r(e))}:function(e){return t.style[n]=r(e)};if(Array.isArray(n)){var e=n.length;return function(i){var o=r(i);if(null==o)for(var u=0;u\x3ce;u++)t[u].removeAttribute(n);else for(var a=0;a\x3ce;a++)t[a].setAttribute(n,o)}}return function(e){var i=r(e);null==i?t.removeAttribute(n):t.setAttribute(n,i)}}(n,e,s,a):null}function tt(t,n,e,i){if(!i||"object"!==r(i))return null;var o=null,u=null;return Array.isArray(i)?u=function(t){if(!t||!t.length)return null;for(var n=0;n\x3ct.length;n++)t[n].e&&(t[n].e=J(t[n].e));return t.sort(W)}(i):(u=i.keys,o=i.data||null),u?X(t,n,e,u,o):null}function nt(t,n,r){if(!r)return null;var e=[];for(var i in r)if(r.hasOwnProperty(i)){var o=tt(t,n,i,r[i]);o&&e.push(o)}return e.length?e:null}function rt(t,n){if(!n.duration||n.duration\x3c0)return null;var r=function(t,n){if(!n)return null;var r=[];if(Array.isArray(n))for(var e=n.length,i=0;i\x3ce;i++){var o=n[i];if(2===o.length){var u=null;if("string"==typeof o[0])u=t.getElementById(o[0]);else if(Array.isArray(o[0])){u=[];for(var a=0;a\x3co[0].length;a++)if("string"==typeof o[0][a]){var l=t.getElementById(o[0][a]);l&&u.push(l)}u=u.length?1===u.length?u[0]:new $(u):null}if(u){var f=nt(t,u,o[1]);f&&(r=r.concat(f))}}}else for(var s in n)if(n.hasOwnProperty(s)){var c=t.getElementById(s);if(c){var h=nt(t,c,n[s]);h&&(r=r.concat(h))}}return r.length?r:null}(t,n.elements);return r?function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1/0,e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1,u=t.length,a=e>0?n:0;i&&r%2==0&&(a=n-a);var l=null;return function(f,s){var c=f%n,h=1+(f-c)/n;s*=e,i&&h%2==0&&(s=-s);var v=!1;if(h>r)c=a,v=!0,-1===o&&(c=e>0?0:n);else if(s\x3c0&&(c=n-c),c===l)return!1;l=c;for(var y=0;y\x3cu;y++)t[y](c);return v}}(r,n.duration,n.iterations||1/0,n.direction||1,!!n.alternate,n.fill||1):null}function et(t){return+("0x"+(t.replace(/[^0-9a-fA-F]+/g,"")||27))}function it(t,n,r){return!t||!r||n>t.length?t:t.substring(0,n)+it(t.substring(n+1),r,r)}function ot(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:27;return!t||t%n?t%n:ot(t/n,n)}function ut(t,n,r){if(t&&t.length){var e=et(r),i=et(n),o=ot(e)+5,u=it(t,ot(e,5),o);return u=u.replace(/\\x7c$/g,"==").replace(/\\x2f$/g,"="),u=function(t,n,r){var e=+("0x"+t.substring(0,4));t=t.substring(4);for(var i=n%e+r%27,o=[],u=0;u\x3ct.length;u+=2)if("|"!==t[u]){var a=+("0x"+t[u]+t[u+1])-i;o.push(a)}else{var l=+("0x"+t.substring(u+1,u+1+4))-i;u+=3,o.push(l)}return String.fromCharCode.apply(String,o)}(u=(u=atob(u)).replace(/[\\x41-\\x5A]/g,""),i,e),u=JSON.parse(u)}}var at=function(){function t(n,r){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};e(this,t),this._id=0,this._running=!1,this._rollingBack=!1,this._animations=n,this.duration=r.duration,this.alternate=r.alternate,this.fill=r.fill,this.iterations=r.iterations,this.direction=i.direction||1,this.speed=i.speed||1,this.fps=i.fps||100,this.offset=i.offset||0,this.rollbackStartOffset=0}return o(t,[{key:"maxFiniteDuration",get:function(){return this.iterations>0?this.iterations*this.duration:this.duration}},{key:"_apply",value:function(t){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=this._animations,e=r.length,i=0,o=0;o\x3ce;o++)n[o]?i++:(n[o]=r[o](t,this.direction),n[o]&&i++);return i}},{key:"_rollback",value:function(){var t=this,n=1/0,r=null;this.rollbackStartOffset=this.offset,this._rollingBack=!0,this._running=!0;this._id=window.requestAnimationFrame((function e(i){if(t._rollingBack){null==r&&(r=i);var o=i-r,u=t.rollbackStartOffset-o,a=Math.round(u*t.speed);if(a>t.duration&&n!==1/0){var l=!!t.alternate&&a/t.duration%2>1,f=a%t.duration;a=(f+=l?t.duration:0)||t.duration}var s=t.fps?1e3/t.fps:0,c=Math.max(0,a);c\x3cn-s&&(t.offset=c,n=c,t._apply(c));var h=t.iterations>0&&-1===t.fill&&a>=t.maxFiniteDuration;(a\x3c=0||t.offset\x3ca||h)&&t.stop(),t._id=window.requestAnimationFrame(e)}}))}},{key:"_start",value:function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=-1/0,e=null,i={};this._running=!0;var o=function o(u){null==e&&(e=u);var a=Math.round((u-e+n)*t.speed),l=t.fps?1e3/t.fps:0;if(a>r+l&&!t._rollingBack&&(t.offset=a,r=a,t._apply(a,i)===t._animations.length))return void t.pause(!0);t._id=window.requestAnimationFrame(o)};this._id=window.requestAnimationFrame(o)}},{key:"_pause",value:function(){this._id&&window.cancelAnimationFrame(this._id),this._running=!1}},{key:"play",value:function(){if(!this._running)return this._rollingBack?this._rollback():this._start(this.offset)}},{key:"stop",value:function(){this._pause(),this.offset=0,this.rollbackStartOffset=0,this._rollingBack=!1,this._apply(0)}},{key:"reachedToEnd",value:function(){return this.iterations>0&&this.offset>=this.iterations*this.duration}},{key:"restart",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.stop(t),this.play(t)}},{key:"pause",value:function(){this._pause()}},{key:"reverse",value:function(){this.direction=-this.direction}}],[{key:"build",value:function(t,r){return delete t.animationSettings,t.options=ut(t.options,t.root,"5c7f360c"),t.animations.map((function(r){var e=ut(r.s,t.root,"5c7f360c");for(var i in delete r.s,t.animationSettings||(t.animationSettings=n({},e)),e)e.hasOwnProperty(i)&&(r[i]=e[i])})),(t=function(t,n){if(Y=n,!t||!t.root||!Array.isArray(t.animations))return null;for(var r=document.getElementsByTagName("svg"),e=!1,i=0;i\x3cr.length;i++)if(r[i].id===t.root&&!r[i].svgatorAnimation){(e=r[i]).svgatorAnimation=!0;break}if(!e)return null;var o=t.animations.map((function(t){return rt(e,t)})).filter((function(t){return!!t}));return o.length?{element:e,animations:o,animationSettings:t.animationSettings,options:t.options||void 0}:null}(t,r))?{el:t.element,options:t.options||{},player:new this(t.animations,t.animationSettings,t.options)}:null}},{key:"push",value:function(t){return this.build(t)}},{key:"init",value:function(){var t=this,n=window.__SVGATOR_PLAYER__&&window.__SVGATOR_PLAYER__["5c7f360c"];Array.isArray(n)&&n.splice(0).forEach((function(n){return t.build(n)}))}}]),t}();function lt(t){return p(t)+""}function ft(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:" ";return t&&t.length?t.map(lt).join(n):""}function st(t){if(!t)return"transparent";if(null==t.a||t.a>=1){var n=function(t){return 1===(t=parseInt(t).toString(16)).length?"0"+t:t},r=function(t){return t.charAt(0)===t.charAt(1)},e=n(t.r),i=n(t.g),o=n(t.b);return r(e)&&r(i)&&r(o)&&(e=e.charAt(0),i=i.charAt(0),o=o.charAt(0)),"#"+e+i+o}return"rgba("+t.r+","+t.g+","+t.b+","+t.a+")"}function ct(t){return t?"url(#"+t+")":"none"}!function(){for(var t=0,n=["ms","moz","webkit","o"],r=0;r\x3cn.length&&!window.requestAnimationFrame;++r)window.requestAnimationFrame=window[n[r]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[n[r]+"CancelAnimationFrame"]||window[n[r]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(n){var r=Date.now(),e=Math.max(0,16-(r-t)),i=window.setTimeout((function(){n(r+e)}),e);return t=r+e,i},window.cancelAnimationFrame=window.clearTimeout)}();var ht={f:null,i:function(t,n,r){return 0===t?n:1===t?r:{x:B(t,n.x,r.x),y:B(t,n.y,r.y)}},u:function(t,n){return function(r){var e=n(r);t.setAttribute("rx",lt(e.x)),t.setAttribute("ry",lt(e.y))}}},vt={f:null,i:function(t,n,r){return 0===t?n:1===t?r:{width:B(t,n.width,r.width),height:B(t,n.height,r.height)}},u:function(t,n){return function(r){var e=n(r);t.setAttribute("width",lt(e.width)),t.setAttribute("height",lt(e.height))}}};Object.freeze({M:2,L:2,Z:0,H:1,V:1,C:6,Q:4,T:2,S:4,A:7});var yt={},gt=null;function pt(t){var n=function(){if(gt)return gt;if("object"!==("undefined"==typeof document?"undefined":r(document))||!document.createElementNS)return{};var t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t&&t.style?(t.style.position="absolute",t.style.opacity="0.01",t.style.zIndex="-9999",t.style.left="-9999px",t.style.width="1px",t.style.height="1px",gt={svg:t}):{}}().svg;if(!n)return function(t){return null};var e=document.createElementNS(n.namespaceURI,"path");e.setAttributeNS(null,"d",t),e.setAttributeNS(null,"fill","none"),e.setAttributeNS(null,"stroke","none"),n.appendChild(e);var i=e.getTotalLength();return function(t){var n=e.getPointAtLength(i*t);return{x:n.x,y:n.y}}}function dt(t){return yt[t]?yt[t]:yt[t]=pt(t)}function mt(t,n,r,e){if(!t||!e)return!1;var i=["M",t.x,t.y];if(n&&r&&(i.push("C"),i.push(n.x),i.push(n.y),i.push(r.x),i.push(r.y)),n?!r:r){var o=n||r;i.push("Q"),i.push(o.x),i.push(o.y)}return n||r||i.push("L"),i.push(e.x),i.push(e.y),i.join(" ")}function bt(t,n,r,e){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,o=mt(t,n,r,e),u=dt(o);try{return u(i)}catch(t){return null}}function wt(t,n,r){return t+(n-t)*r}function xt(t,n,r){var e=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i={x:wt(t.x,n.x,r),y:wt(t.y,n.y,r)};return e&&(i.a=At(t,n)),i}function At(t,n){return Math.atan2(n.y-t.y,n.x-t.x)}function kt(t,n,r,e){var i=1-e;return i*i*t+2*i*e*n+e*e*r}function _t(t,n,r,e){return 2*(1-e)*(n-t)+2*e*(r-n)}function St(t,n,r,e){var i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o=bt(t,n,null,r,e);return o||(o={x:kt(t.x,n.x,r.x,e),y:kt(t.y,n.y,r.y,e)}),i&&(o.a=Ot(t,n,r,e)),o}function Ot(t,n,r,e){return Math.atan2(_t(t.y,n.y,r.y,e),_t(t.x,n.x,r.x,e))}function jt(t,n,r,e,i){var o=i*i;return i*o*(e-t+3*(n-r))+3*o*(t+r-2*n)+3*i*(n-t)+t}function Mt(t,n,r,e,i){var o=1-i;return 3*(o*o*(n-t)+2*o*i*(r-n)+i*i*(e-r))}function Pt(t,n,r,e,i){var o=arguments.length>5&&void 0!==arguments[5]&&arguments[5],u=bt(t,n,r,e,i);return u||(u={x:jt(t.x,n.x,r.x,e.x,i),y:jt(t.y,n.y,r.y,e.y,i)}),o&&(u.a=Et(t,n,r,e,i)),u}function Et(t,n,r,e,i){return Math.atan2(Mt(t.y,n.y,r.y,e.y,i),Mt(t.x,n.x,r.x,e.x,i))}function It(t,n,r){var e=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(Ft(n)){if(Nt(r))return St(n,r.start,r,t,e)}else if(Ft(r)){if(n.end)return St(n,n.end,r,t,e)}else{if(n.end)return r.start?Pt(n,n.end,r.start,r,t,e):St(n,n.end,r,t,e);if(r.start)return St(n,r.start,r,t,e)}return xt(n,r,t,e)}function Rt(t,n,r){var e=It(t,n,r,!0);return e.a=function(t){return arguments.length>1&&void 0!==arguments[1]&&arguments[1]?t+Math.PI:t}(e.a)/m,e}function Ft(t){return!t.type||"corner"===t.type}function Nt(t){return null!=t.start&&!Ft(t)}var Tt=new N;var qt={f:lt,i:q},Bt={f:lt,i:L};function Lt(t,n,r){return t.map((function(t){return function(t,n,r){var e=t.v;if(!e||"g"!==e.t||e.s||!e.v||!e.r)return t;var i=r.getElementById(e.r),o=i&&i.querySelectorAll("stop")||[];return e.s=e.v.map((function(t,n){var r=o[n]&&o[n].getAttribute("offset");return{c:t,o:r=p(parseInt(r)/100)}})),delete e.v,t}(t,0,r)}))}var Ct={gt:"gradientTransform",c:{x:"cx",y:"cy"},rd:"r",f:{x:"x1",y:"y1"},to:{x:"x2",y:"y2"}};function Dt(t,n,e,i,o,u,a,l){return Lt(t,0,l),n=function(t,n,r){for(var e,i,o,u=t.length-1,a={},l=0;l\x3c=u;l++)(e=t[l]).e&&(e.e=n(e.e)),e.v&&"g"===(i=e.v).t&&i.r&&(o=r.getElementById(i.r))&&(a[i.r]={e:o,s:o.querySelectorAll("stop")});return a}(t,i,l),function(i){var o=e(i,t,zt);if(!o)return"none";if("c"===o.t)return st(o.v);if("g"===o.t){if(!n[o.r])return ct(o.r);var u=n[o.r];return function(t,n){for(var r=t.s,e=r.length;e\x3cn.length;e++){var i=r[r.length-1].cloneNode();i.id=Yt(i.id),t.e.appendChild(i),r=t.s=t.e.querySelectorAll("stop")}for(var o=0,u=r.length,a=n.length-1;o\x3cu;o++)r[o].setAttribute("stop-color",st(n[Math.min(o,a)].c)),r[o].setAttribute("offset",n[Math.min(o,a)].o)}(u,o.s),Object.keys(Ct).forEach((function(t){if(void 0!==o[t])if("object"!==r(Ct[t])){var n,e="gt"===t?(n=o[t],Array.isArray(n)?"matrix("+n.join(" ")+")":""):o[t],i=Ct[t];u.e.setAttribute(i,e)}else Object.keys(Ct[t]).forEach((function(n){if(void 0!==o[t][n]){var r=o[t][n],e=Ct[t][n];u.e.setAttribute(e,r)}}))})),ct(o.r)}return"none"}}function zt(t,r,e){if(0===t)return r;if(1===t)return e;if(r&&e){var i=r.t;if(i===e.t)switch(r.t){case"c":return{t:i,v:z(t,r.v,e.v)};case"g":if(r.r===e.r){var o={t:i,s:Vt(t,r.s,e.s),r:r.r};return r.gt&&e.gt&&(o.gt=function(t,n,r){var e=n.length;if(e!==r.length)return T(t,n,r);for(var i=new Array(e),o=0;o\x3ce;o++)i[o]=q(t,n[o],r[o]);return i}(t,r.gt,e.gt)),r.c?(o.c=C(t,r.c,e.c),o.rd=B(t,r.rd,e.rd)):r.f&&(o.f=C(t,r.f,e.f),o.to=C(t,r.to,e.to)),o}}if("c"===r.t&&"g"===e.t||"c"===e.t&&"g"===r.t){var u="c"===r.t?r:e,a="g"===r.t?n({},r):n({},e),l=a.s.map((function(t){return{c:u.v,o:t.o}}));return a.s="c"===r.t?Vt(t,l,a.s):Vt(t,a.s,l),a}}return T(t,r,e)}function Vt(t,n,r){if(n.length===r.length)return n.map((function(n,e){return Gt(t,n,r[e])}));for(var e=Math.max(n.length,r.length),i=[],o=0;o\x3ce;o++){var u=Gt(t,n[Math.min(o,n.length-1)],r[Math.min(o,r.length-1)]);i.push(u)}return i}function Gt(t,n,r){return{o:L(t,n.o,r.o||0),c:z(t,n.c,r.c||{})}}function Yt(t){return t.replace(/-fill-([0-9]+)$/,(function(t,n){return"-fill-"+(+n+1)}))}var $t={fill:Dt,"fill-opacity":Bt,stroke:Dt,"stroke-opacity":Bt,"stroke-width":qt,"stroke-dashoffset":{f:lt,i:q},"stroke-dasharray":{f:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:" ";return t&&t.length>0&&(t=t.map((function(t){return p(t,4)}))),ft(t,n)},i:function(t,n,r){var e,i,o,u=n.length,a=r.length;if(u!==a)if(0===u)n=V(u=a,0);else if(0===a)a=u,r=V(u,0);else{var l=(o=(e=u)*(i=a)/function(t,n){for(var r;n;)r=n,n=t%n,t=r;return t||1}(e,i))\x3c0?-o:o;n=G(n,Math.floor(l/u)),r=G(r,Math.floor(l/a)),u=a=l}for(var f=[],s=0;s\x3cu;s++)f.push(p(B(t,n[s],r[s])));return f}},opacity:Bt,transform:function(t,n,e,i){if(!(t=function(t,n){if(!t||"object"!==r(t))return null;var e=!1;for(var i in t)t.hasOwnProperty(i)&&(t[i]&&t[i].length?(t[i].forEach((function(t){t.e&&(t.e=n(t.e))})),e=!0):delete t[i]);return e?t:null}(t,i)))return null;var o=function(r,i,o){var u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return t[r]?e(i,t[r],o):n&&n[r]?n[r]:u};return n&&n.a&&t.o?function(n){var r=e(n,t.o,Rt);return Tt.recomposeSelf(r,o("r",n,q,0)+r.a,o("k",n,C),o("s",n,C),o("t",n,C)).toString()}:function(t){return Tt.recomposeSelf(o("o",t,It,null),o("r",t,q,0),o("k",t,C),o("s",t,C),o("t",t,C)).toString()}},r:qt,"#size":vt,"#radius":ht,_:function(t,n){if(Array.isArray(t))for(var r=0;r\x3ct.length;r++)this[t[r]]=n;else this[t]=n}},Ut=function(t){!function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&l(t,n)}(u,t);var n,r,i=(n=u,r=f(),function(){var t,e=a(n);if(r){var i=a(this).constructor;t=Reflect.construct(e,arguments,i)}else t=e.apply(this,arguments);return c(this,t)});function u(){return e(this,u),i.apply(this,arguments)}return o(u,null,[{key:"build",value:function(t){var n=h(a(u),"build",this).call(this,t,$t);if(!n)return null;n.el,n.options,function(t,n,r){t.play()}(n.player)}}]),u}(at);return Ut.init(),Ut}));\n',
};

class SVGatorPlayer {
  static getPlayer(playerId) {
    return PLAYERS[playerId] || PLAYERS["91c80d77"];
  }
  static wrapPage(svg) {
    const header = `<!doctype html>
            <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <style>
                        html, body {
                            height: 100%;
                            overflow: hidden;
                            width: 100%;
                        }
                        body {
                            margin: 0;
                            padding: 0;
                        }
                        svg {
                            height: 100%;
                            left: 0;
                            position: fixed;
                            top: 0;
                            width:100%;
                        }
                    </style>
                </head>
                <body>`;
    const footer = `
                </body>
                </html>`;
    return this.shortenCode(header) + svg + this.shortenCode(footer);
  }

  static shortenCode(str) {
    return (str + "")
      .replace(/\s{2,}/g, "")
      .replace(/[\n\r\t\s]*([,{}=;:()?|&])[\n\r\t\s]*/g, "$1")
      .replace(/;}/g, "}");
  }

  static _formatCode(functionToFormat) {
    const str = functionToFormat.toString();
    return "(" + this.shortenCode(str) + ")" + "(); true;";
  }

  static _mapListener() {
    return () => {
      const player = (document.querySelector("svg") || {}).svgatorPlayer;
      if (!player || !window.ReactNativeWebView) {
        return;
      }
      const events = ["reverse", "pause", "restart", "stop", "end", "play"];
      const _map = () =>
        events.forEach(function (event) {
          player.on(event, function (offset) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ event: event, offset: offset })
            );
          });
        });
      if (player.totalTime) {
        _map();
      } else {
        player.ready(_map);
      }
    };
  }

  static getInjectCode() {
    return this._formatCode(this._mapListener());
  }

  static _parseAttributes(html) {
    let attrMatch =
      ((html && html.match(/<svg(.*?)>/)) || [null, ""])[1].match(
        /[a-z0-9\-]+\=['"]([^'"]+)['"]/gi
      ) || [];
    let attrs = {};
    attrMatch.forEach((attr) => {
      const parts = attr.split("=");
      const key = parts.shift().toLowerCase();
      const value = parts.join("=").replace(/^['"]+|['"]+$/g, "");
      attrs[key] = value;
    });
    return attrs;
  }

  static _getSizes(attributes) {
    if (!attributes) {
      return {};
    }
    const viewBox = attributes.viewbox ? attributes.viewbox.split(" ") : [];
    const svgWidth = attributes.width ? attributes.width : viewBox[2] || 100;
    const svgHeight = attributes.height ? attributes.height : viewBox[3] || 100;
    const ratio = svgWidth / svgHeight;
    return { svgWidth, svgHeight, ratio };
  }

  static parseProps(props, html) {
    let newProps = { ...props };
    if (newProps.hasOwnProperty("height")) {
      if (!newProps.hasOwnProperty("width")) {
        newProps.width = "100%";
      }
      return newProps;
    }

    const attributes = this._parseAttributes(html);
    const { svgWidth, svgHeight, ratio } = this._getSizes(attributes);
    const window = useWindowDimensions();

    if (newProps.hasOwnProperty("width")) {
      const w = newProps.width;
      if (typeof w === "number" && isFinite(w)) {
        newProps.height = w / ratio;
        return newProps;
      }

      if (typeof w === "string" && w.match(/%$/)) {
        newProps.height = (window.width * 0.9 * parseFloat(w)) / 100 / ratio;
        return newProps;
      }
    }

    newProps.height = (window.width * 0.9) / ratio;

    if (!newProps.hasOwnProperty("width")) {
      newProps.width = "100%";
    }

    return newProps;
  }

  static getWebViewProps(props, html) {
    const newProps = this.parseProps(props, html);
    const _styles = {
      container: {
        flex: 0,
      },
      style: {
        backgroundColor: "transparent",
        flex: 0,
        width: "100%",
        height: newProps.height,
      },
    };
    if (newProps.width) {
      _styles.container.width = newProps.width;
    }
    const styles = StyleSheet.create(_styles);
    newProps.injectedJavaScript = this.getInjectCode();
    delete newProps.width;
    delete newProps.height;
    return { newProps, styles };
  }
}

const SVGatorComponent = React.forwardRef((props, ref) => {
  const html = getHtml();
  const { newProps, styles } = SVGatorPlayer.getWebViewProps(props, html);
  return (
    <WebView
      ref={ref}
      {...newProps}
      source={{ html }}
      containerStyle={styles.container}
      style={styles.style}
    />
  );
});

export default SVGatorComponent;
