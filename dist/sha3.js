/**
 * A JavaScript implementation of the SHA family of hashes, as defined in FIPS PUB 180-4 and FIPS PUB 202, as
 * well as the corresponding HMAC implementation as defined in FIPS PUB 198a
 *
 * Copyright 2008-2020 Brian Turek, 1998-2009 Paul Johnston & Contributors
 * Distributed under the BSD License
 * See http://caligatio.github.com/jsSHA/ for more information
 *
 * Two ECMAScript polyfill functions carry the following license:
 *
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED,
 * INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 * MERCHANTABLITY OR NON-INFRINGEMENT.
 *
 * See the Apache Version 2.0 License for specific language governing permissions and limitations under the License.
 */
!function(r,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(r=r||self).jsSHA=t()}(this,(function(){"use strict";var r=function(t,n){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,t){r.__proto__=t}||function(r,t){for(var n in t)t.hasOwnProperty(n)&&(r[n]=t[n])})(t,n)};var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function n(r,t,n,e){var i,o,s,f=t||[0],u=(n=n||0)>>>3,h=-1===e?3:0;for(i=0;i<r.length;i+=1)o=(s=i+u)>>>2,f.length<=o&&f.push(0),f[o]|=r[i]<<8*(h+e*(s%4));return{value:f,binLen:8*r.length+n}}function e(r,e,i){switch(e){case"UTF8":case"UTF16BE":case"UTF16LE":break;default:throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE")}switch(r){case"HEX":return function(r,t,n){return function(r,t,n,e){var i,o,s,f;if(0!=r.length%2)throw new Error("String of HEX type must be in byte increments");var u=t||[0],h=(n=n||0)>>>3,a=-1===e?3:0;for(i=0;i<r.length;i+=2){if(o=parseInt(r.substr(i,2),16),isNaN(o))throw new Error("String of HEX type contains invalid characters");for(s=(f=(i>>>1)+h)>>>2;u.length<=s;)u.push(0);u[s]|=o<<8*(a+e*(f%4))}return{value:u,binLen:4*r.length+n}}(r,t,n,i)};case"TEXT":return function(r,t,n){return function(r,t,n,e,i){var o,s,f,u,h,a,c,w,E=0,A=n||[0],v=(e=e||0)>>>3;if("UTF8"===t)for(c=-1===i?3:0,f=0;f<r.length;f+=1)for(s=[],128>(o=r.charCodeAt(f))?s.push(o):2048>o?(s.push(192|o>>>6),s.push(128|63&o)):55296>o||57344<=o?s.push(224|o>>>12,128|o>>>6&63,128|63&o):(f+=1,o=65536+((1023&o)<<10|1023&r.charCodeAt(f)),s.push(240|o>>>18,128|o>>>12&63,128|o>>>6&63,128|63&o)),u=0;u<s.length;u+=1){for(h=(a=E+v)>>>2;A.length<=h;)A.push(0);A[h]|=s[u]<<8*(c+i*(a%4)),E+=1}else for(c=-1===i?2:0,w="UTF16LE"===t&&1!==i||"UTF16LE"!==t&&1===i,f=0;f<r.length;f+=1){for(o=r.charCodeAt(f),!0===w&&(o=(u=255&o)<<8|o>>>8),h=(a=E+v)>>>2;A.length<=h;)A.push(0);A[h]|=o<<8*(c+i*(a%4)),E+=2}return{value:A,binLen:8*E+e}}(r,e,t,n,i)};case"B64":return function(r,n,e){return function(r,n,e,i){var o,s,f,u,h,a,c=0,w=n||[0],E=(e=e||0)>>>3,A=-1===i?3:0,v=r.indexOf("=");if(-1===r.search(/^[a-zA-Z0-9=+/]+$/))throw new Error("Invalid character in base-64 string");if(r=r.replace(/=/g,""),-1!==v&&v<r.length)throw new Error("Invalid '=' found in base-64 string");for(o=0;o<r.length;o+=4){for(u=r.substr(o,4),f=0,s=0;s<u.length;s+=1)f|=t.indexOf(u.charAt(s))<<18-6*s;for(s=0;s<u.length-1;s+=1){for(h=(a=c+E)>>>2;w.length<=h;)w.push(0);w[h]|=(f>>>16-8*s&255)<<8*(A+i*(a%4)),c+=1}}return{value:w,binLen:8*c+e}}(r,n,e,i)};case"BYTES":return function(r,t,n){return function(r,t,n,e){var i,o,s,f,u=t||[0],h=(n=n||0)>>>3,a=-1===e?3:0;for(o=0;o<r.length;o+=1)i=r.charCodeAt(o),s=(f=o+h)>>>2,u.length<=s&&u.push(0),u[s]|=i<<8*(a+e*(f%4));return{value:u,binLen:8*r.length+n}}(r,t,n,i)};case"ARRAYBUFFER":try{new ArrayBuffer(0)}catch(r){throw new Error("ARRAYBUFFER not supported by this environment")}return function(r,t,e){return function(r,t,e,i){return n(new Uint8Array(r),t,e,i)}(r,t,e,i)};case"UINT8ARRAY":try{new Uint8Array(0)}catch(r){throw new Error("UINT8ARRAY not supported by this environment")}return function(r,t,e){return n(r,t,e,i)};default:throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")}}function i(r,n,e,i){switch(r){case"HEX":return function(r){return function(r,t,n,e){var i,o,s="",f=t/8,u=-1===n?3:0;for(i=0;i<f;i+=1)o=r[i>>>2]>>>8*(u+n*(i%4)),s+="0123456789abcdef".charAt(o>>>4&15)+"0123456789abcdef".charAt(15&o);return e.outputUpper?s.toUpperCase():s}(r,n,e,i)};case"B64":return function(r){return function(r,n,e,i){var o,s,f,u,h,a="",c=n/8,w=-1===e?3:0;for(o=0;o<c;o+=3)for(u=o+1<c?r[o+1>>>2]:0,h=o+2<c?r[o+2>>>2]:0,f=(r[o>>>2]>>>8*(w+e*(o%4))&255)<<16|(u>>>8*(w+e*((o+1)%4))&255)<<8|h>>>8*(w+e*((o+2)%4))&255,s=0;s<4;s+=1)a+=8*o+6*s<=n?t.charAt(f>>>6*(3-s)&63):i.b64Pad;return a}(r,n,e,i)};case"BYTES":return function(r){return function(r,t,n){var e,i,o="",s=t/8,f=-1===n?3:0;for(e=0;e<s;e+=1)i=r[e>>>2]>>>8*(f+n*(e%4))&255,o+=String.fromCharCode(i);return o}(r,n,e)};case"ARRAYBUFFER":try{new ArrayBuffer(0)}catch(r){throw new Error("ARRAYBUFFER not supported by this environment")}return function(r){return function(r,t,n){var e,i=t/8,o=new ArrayBuffer(i),s=new Uint8Array(o),f=-1===n?3:0;for(e=0;e<i;e+=1)s[e]=r[e>>>2]>>>8*(f+n*(e%4))&255;return o}(r,n,e)};case"UINT8ARRAY":try{new Uint8Array(0)}catch(r){throw new Error("UINT8ARRAY not supported by this environment")}return function(r){return function(r,t,n){var e,i=t/8,o=-1===n?3:0,s=new Uint8Array(i);for(e=0;e<i;e+=1)s[e]=r[e>>>2]>>>8*(o+n*(e%4))&255;return s}(r,n,e)};default:throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")}}function o(r){var t={outputUpper:!1,b64Pad:"=",shakeLen:-1},n=r||{};if(t.outputUpper=n.outputUpper||!1,n.b64Pad&&(t.b64Pad=n.b64Pad),n.shakeLen){if(n.shakeLen%8!=0)throw new Error("shakeLen must be a multiple of 8");t.shakeLen=n.shakeLen}if("boolean"!=typeof t.outputUpper)throw new Error("Invalid outputUpper formatting option");if("string"!=typeof t.b64Pad)throw new Error("Invalid b64Pad formatting option");return t}var s=function(){function r(r,t,n){var e=n||{};if(this.t=t,this.i=e.encoding||"UTF8",this.numRounds=e.numRounds||1,isNaN(this.numRounds)||this.numRounds!==parseInt(this.numRounds,10)||1>this.numRounds)throw new Error("numRounds must a integer >= 1");this.o=r,this.s=[],this.u=0,this.h=!1,this.A=0,this.v=!1,this.l=[],this.p=[]}return r.prototype.update=function(r){var t,n=0,e=this.R>>>5,i=this.U(r,this.s,this.u),o=i.binLen,s=i.value,f=o>>>5;for(t=0;t<f;t+=e)n+this.R<=o&&(this.T=this.F(s.slice(t,t+e),this.T),n+=this.R);this.A+=n,this.s=s.slice(n>>>5),this.u=o%this.R,this.h=!0},r.prototype.getHash=function(r,t){var n,e,s=this.H;if(!0===this.v)throw new Error("Cannot call getHash after setting HMAC key");var f=o(t);if(!0===this.m){if(-1===f.shakeLen)throw new Error("shakeLen must be specified in options");s=f.shakeLen}var u=i(r,s,this.B,f);for(e=this.g(this.s.slice(),this.u,this.A,this.Y(this.T),s),n=1;n<this.numRounds;n+=1)!0===this.m&&s%32!=0&&(e[e.length-1]&=16777215>>>24-s%32),e=this.g(e,s,0,this.S(this.o),s);return u(e)},r.prototype.setHMACKey=function(r,t,n){var i,o;if(!0===this.v)throw new Error("HMAC key already set");if(!0===this.h)throw new Error("Cannot set HMAC key after calling update");if(!0===this.m)throw new Error("SHAKE is not supported for HMAC");var s=e(t,(n||{}).encoding||"UTF8",this.B)(r),f=s.binLen,u=this.R>>>3,h=u/4-1;for(i=s.value,u<f/8&&(i=this.g(i,f,0,this.S(this.o),this.H));i.length<=h;)i.push(0);for(o=0;o<=h;o+=1)this.l[o]=909522486^i[o],this.p[o]=1549556828^i[o];this.T=this.F(this.l,this.T),this.A=this.R,this.v=!0},r.prototype.getHMAC=function(r,t){var n;if(!1===this.v)throw new Error("Cannot call getHMAC without first setting HMAC key");var e=o(t),s=i(r,this.H,this.B,e),f=this.g(this.s.slice(),this.u,this.A,this.Y(this.T),this.H);return n=this.F(this.p,this.S(this.o)),s(n=this.g(f,this.H,this.R,n,this.H))},r}(),f=function(r,t){this.I=r,this.L=t};function u(r,t){var n;return t>32?(n=64-t,new f(r.L<<t|r.I>>>n,r.I<<t|r.L>>>n)):0!==t?(n=32-t,new f(r.I<<t|r.L>>>n,r.L<<t|r.I>>>n)):r}function h(r,t){return new f(r.I^t.I,r.L^t.L)}var a=[new f(0,1),new f(0,32898),new f(2147483648,32906),new f(2147483648,2147516416),new f(0,32907),new f(0,2147483649),new f(2147483648,2147516545),new f(2147483648,32777),new f(0,138),new f(0,136),new f(0,2147516425),new f(0,2147483658),new f(0,2147516555),new f(2147483648,139),new f(2147483648,32905),new f(2147483648,32771),new f(2147483648,32770),new f(2147483648,128),new f(0,32778),new f(2147483648,2147483658),new f(2147483648,2147516545),new f(2147483648,32896),new f(0,2147483649),new f(2147483648,2147516424)],c=[[0,36,3,41,18],[1,44,10,45,2],[62,6,43,15,61],[28,55,25,21,56],[27,20,39,8,14]];function w(r){var t,n=[];for(t=0;t<5;t+=1)n[t]=[new f(0,0),new f(0,0),new f(0,0),new f(0,0),new f(0,0)];return n}function E(r){var t,n=[];for(t=0;t<5;t+=1)n[t]=r[t].slice();return n}function A(r,t){var n,e,i,o,s,E,A,v,l,p=[],d=[];if(null!==r)for(e=0;e<r.length;e+=2)t[(e>>>1)%5][(e>>>1)/5|0]=h(t[(e>>>1)%5][(e>>>1)/5|0],new f(r[e+1],r[e]));for(n=0;n<24;n+=1){for(o=w(),e=0;e<5;e+=1)p[e]=(s=t[e][0],E=t[e][1],A=t[e][2],v=t[e][3],l=t[e][4],new f(s.I^E.I^A.I^v.I^l.I,s.L^E.L^A.L^v.L^l.L));for(e=0;e<5;e+=1)d[e]=h(p[(e+4)%5],u(p[(e+1)%5],1));for(e=0;e<5;e+=1)for(i=0;i<5;i+=1)t[e][i]=h(t[e][i],d[e]);for(e=0;e<5;e+=1)for(i=0;i<5;i+=1)o[i][(2*e+3*i)%5]=u(t[e][i],c[e][i]);for(e=0;e<5;e+=1)for(i=0;i<5;i+=1)t[e][i]=h(o[e][i],new f(~o[(e+1)%5][i].I&o[(e+2)%5][i].I,~o[(e+1)%5][i].L&o[(e+2)%5][i].L));t[0][0]=h(t[0][0],a[n])}return t}return function(t){function n(r,n,i){var o=this,s=6,f=0;if((o=t.call(this,r,n,i)||this).m=!1,"SHA3-224"===r)f=1152,o.H=224;else if("SHA3-256"===r)f=1088,o.H=256;else if("SHA3-384"===r)f=832,o.H=384;else if("SHA3-512"===r)f=576,o.H=512;else if("SHAKE128"===r)s=31,f=1344,o.H=-1,o.m=!0;else{if("SHAKE256"!==r)throw new Error("Chosen SHA variant is not supported");s=31,f=1088,o.H=-1,o.m=!0}return o.R=f,o.B=1,o.U=e(o.t,o.i,o.B),o.F=A,o.Y=E,o.S=w,o.g=function(r,t,n,e,i){return function(r,t,n,e,i,o,s){var f,u,h=0,a=[],c=i>>>5,w=t>>>5;for(f=0;f<w&&t>=i;f+=c)e=A(r.slice(f,f+c),e),t-=i;for(r=r.slice(f),t%=i;r.length<c;)r.push(0);for(r[(f=t>>>3)>>2]^=o<<f%4*8,r[c-1]^=2147483648,e=A(r,e);32*a.length<s&&(u=e[h%5][h/5|0],a.push(u.L),!(32*a.length>=s));)a.push(u.I),0==64*(h+=1)%i&&(A(null,e),h=0);return a}(r,t,0,e,f,s,i)},o.T=w(),o}return function(t,n){function e(){this.constructor=t}r(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}(n,t),n}(s)}));
