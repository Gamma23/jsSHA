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
!function(n,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):(n=n||self).jsSHA=r()}(this,(function(){"use strict";var n=function(r,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,r){n.__proto__=r}||function(n,r){for(var t in r)r.hasOwnProperty(t)&&(n[t]=r[t])})(r,t)};var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function t(n,r,t,e){var i,o,w,s=r||[0],u=(t=t||0)>>>3,f=-1===e?3:0;for(i=0;i<n.length;i+=1)o=(w=i+u)>>>2,s.length<=o&&s.push(0),s[o]|=n[i]<<8*(f+e*(w%4));return{value:s,binLen:8*n.length+t}}function e(n,e,i){switch(e){case"UTF8":case"UTF16BE":case"UTF16LE":break;default:throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE")}switch(n){case"HEX":return function(n,r,t){return function(n,r,t,e){var i,o,w,s;if(0!=n.length%2)throw new Error("String of HEX type must be in byte increments");var u=r||[0],f=(t=t||0)>>>3,h=-1===e?3:0;for(i=0;i<n.length;i+=2){if(o=parseInt(n.substr(i,2),16),isNaN(o))throw new Error("String of HEX type contains invalid characters");for(w=(s=(i>>>1)+f)>>>2;u.length<=w;)u.push(0);u[w]|=o<<8*(h+e*(s%4))}return{value:u,binLen:4*n.length+t}}(n,r,t,i)};case"TEXT":return function(n,r,t){return function(n,r,t,e,i){var o,w,s,u,f,h,a,c,v=0,A=t||[0],E=(e=e||0)>>>3;if("UTF8"===r)for(a=-1===i?3:0,s=0;s<n.length;s+=1)for(w=[],128>(o=n.charCodeAt(s))?w.push(o):2048>o?(w.push(192|o>>>6),w.push(128|63&o)):55296>o||57344<=o?w.push(224|o>>>12,128|o>>>6&63,128|63&o):(s+=1,o=65536+((1023&o)<<10|1023&n.charCodeAt(s)),w.push(240|o>>>18,128|o>>>12&63,128|o>>>6&63,128|63&o)),u=0;u<w.length;u+=1){for(f=(h=v+E)>>>2;A.length<=f;)A.push(0);A[f]|=w[u]<<8*(a+i*(h%4)),v+=1}else for(a=-1===i?2:0,c="UTF16LE"===r&&1!==i||"UTF16LE"!==r&&1===i,s=0;s<n.length;s+=1){for(o=n.charCodeAt(s),!0===c&&(o=(u=255&o)<<8|o>>>8),f=(h=v+E)>>>2;A.length<=f;)A.push(0);A[f]|=o<<8*(a+i*(h%4)),v+=2}return{value:A,binLen:8*v+e}}(n,e,r,t,i)};case"B64":return function(n,t,e){return function(n,t,e,i){var o,w,s,u,f,h,a=0,c=t||[0],v=(e=e||0)>>>3,A=-1===i?3:0,E=n.indexOf("=");if(-1===n.search(/^[a-zA-Z0-9=+/]+$/))throw new Error("Invalid character in base-64 string");if(n=n.replace(/=/g,""),-1!==E&&E<n.length)throw new Error("Invalid '=' found in base-64 string");for(o=0;o<n.length;o+=4){for(u=n.substr(o,4),s=0,w=0;w<u.length;w+=1)s|=r.indexOf(u.charAt(w))<<18-6*w;for(w=0;w<u.length-1;w+=1){for(f=(h=a+v)>>>2;c.length<=f;)c.push(0);c[f]|=(s>>>16-8*w&255)<<8*(A+i*(h%4)),a+=1}}return{value:c,binLen:8*a+e}}(n,t,e,i)};case"BYTES":return function(n,r,t){return function(n,r,t,e){var i,o,w,s,u=r||[0],f=(t=t||0)>>>3,h=-1===e?3:0;for(o=0;o<n.length;o+=1)i=n.charCodeAt(o),w=(s=o+f)>>>2,u.length<=w&&u.push(0),u[w]|=i<<8*(h+e*(s%4));return{value:u,binLen:8*n.length+t}}(n,r,t,i)};case"ARRAYBUFFER":try{new ArrayBuffer(0)}catch(n){throw new Error("ARRAYBUFFER not supported by this environment")}return function(n,r,e){return function(n,r,e,i){return t(new Uint8Array(n),r,e,i)}(n,r,e,i)};case"UINT8ARRAY":try{new Uint8Array(0)}catch(n){throw new Error("UINT8ARRAY not supported by this environment")}return function(n,r,e){return t(n,r,e,i)};default:throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")}}function i(n,t,e,i){switch(n){case"HEX":return function(n){return function(n,r,t,e){var i,o,w="",s=r/8,u=-1===t?3:0;for(i=0;i<s;i+=1)o=n[i>>>2]>>>8*(u+t*(i%4)),w+="0123456789abcdef".charAt(o>>>4&15)+"0123456789abcdef".charAt(15&o);return e.outputUpper?w.toUpperCase():w}(n,t,e,i)};case"B64":return function(n){return function(n,t,e,i){var o,w,s,u,f,h="",a=t/8,c=-1===e?3:0;for(o=0;o<a;o+=3)for(u=o+1<a?n[o+1>>>2]:0,f=o+2<a?n[o+2>>>2]:0,s=(n[o>>>2]>>>8*(c+e*(o%4))&255)<<16|(u>>>8*(c+e*((o+1)%4))&255)<<8|f>>>8*(c+e*((o+2)%4))&255,w=0;w<4;w+=1)h+=8*o+6*w<=t?r.charAt(s>>>6*(3-w)&63):i.b64Pad;return h}(n,t,e,i)};case"BYTES":return function(n){return function(n,r,t){var e,i,o="",w=r/8,s=-1===t?3:0;for(e=0;e<w;e+=1)i=n[e>>>2]>>>8*(s+t*(e%4))&255,o+=String.fromCharCode(i);return o}(n,t,e)};case"ARRAYBUFFER":try{new ArrayBuffer(0)}catch(n){throw new Error("ARRAYBUFFER not supported by this environment")}return function(n){return function(n,r,t){var e,i=r/8,o=new ArrayBuffer(i),w=new Uint8Array(o),s=-1===t?3:0;for(e=0;e<i;e+=1)w[e]=n[e>>>2]>>>8*(s+t*(e%4))&255;return o}(n,t,e)};case"UINT8ARRAY":try{new Uint8Array(0)}catch(n){throw new Error("UINT8ARRAY not supported by this environment")}return function(n){return function(n,r,t){var e,i=r/8,o=-1===t?3:0,w=new Uint8Array(i);for(e=0;e<i;e+=1)w[e]=n[e>>>2]>>>8*(o+t*(e%4))&255;return w}(n,t,e)};default:throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")}}var o=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],w=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428],s=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225];function u(n){var r={outputUpper:!1,b64Pad:"=",shakeLen:-1},t=n||{};if(r.outputUpper=t.outputUpper||!1,t.b64Pad&&(r.b64Pad=t.b64Pad),t.shakeLen){if(t.shakeLen%8!=0)throw new Error("shakeLen must be a multiple of 8");r.shakeLen=t.shakeLen}if("boolean"!=typeof r.outputUpper)throw new Error("Invalid outputUpper formatting option");if("string"!=typeof r.b64Pad)throw new Error("Invalid b64Pad formatting option");return r}var f=function(){function n(n,r,t){var e=t||{};if(this.t=r,this.i=e.encoding||"UTF8",this.numRounds=e.numRounds||1,isNaN(this.numRounds)||this.numRounds!==parseInt(this.numRounds,10)||1>this.numRounds)throw new Error("numRounds must a integer >= 1");this.o=n,this.s=[],this.u=0,this.h=!1,this.v=0,this.A=!1,this.p=[],this.R=[]}return n.prototype.update=function(n){var r,t=0,e=this.U>>>5,i=this.l(n,this.s,this.u),o=i.binLen,w=i.value,s=o>>>5;for(r=0;r<s;r+=e)t+this.U<=o&&(this.T=this.F(w.slice(r,r+e),this.T),t+=this.U);this.v+=t,this.s=w.slice(t>>>5),this.u=o%this.U,this.h=!0},n.prototype.getHash=function(n,r){var t,e,o=this.m;if(!0===this.A)throw new Error("Cannot call getHash after setting HMAC key");var w=u(r);if(!0===this.H){if(-1===w.shakeLen)throw new Error("shakeLen must be specified in options");o=w.shakeLen}var s=i(n,o,this.B,w);for(e=this.g(this.s.slice(),this.u,this.v,this.Y(this.T),o),t=1;t<this.numRounds;t+=1)!0===this.H&&o%32!=0&&(e[e.length-1]&=16777215>>>24-o%32),e=this.g(e,o,0,this.S(this.o),o);return s(e)},n.prototype.setHMACKey=function(n,r,t){var i,o;if(!0===this.A)throw new Error("HMAC key already set");if(!0===this.h)throw new Error("Cannot set HMAC key after calling update");if(!0===this.H)throw new Error("SHAKE is not supported for HMAC");var w=e(r,(t||{}).encoding||"UTF8",this.B)(n),s=w.binLen,u=this.U>>>3,f=u/4-1;for(i=w.value,u<s/8&&(i=this.g(i,s,0,this.S(this.o),this.m));i.length<=f;)i.push(0);for(o=0;o<=f;o+=1)this.p[o]=909522486^i[o],this.R[o]=1549556828^i[o];this.T=this.F(this.p,this.T),this.v=this.U,this.A=!0},n.prototype.getHMAC=function(n,r){var t;if(!1===this.A)throw new Error("Cannot call getHMAC without first setting HMAC key");var e=u(r),o=i(n,this.m,this.B,e),w=this.g(this.s.slice(),this.u,this.v,this.Y(this.T),this.m);return t=this.F(this.R,this.S(this.o)),o(t=this.g(w,this.m,this.U,t,this.m))},n}(),h=function(n,r){this.I=n,this.L=r};function a(n,r){var t;return r<32?(t=32-r,new h(n.I>>>r|n.L<<t,n.L>>>r|n.I<<t)):(t=64-r,new h(n.L>>>r|n.I<<t,n.I>>>r|n.L<<t))}function c(n,r){return new h(n.I>>>r,n.L>>>r|n.I<<32-r)}function v(n,r,t){return new h(n.I&r.I^~n.I&t.I,n.L&r.L^~n.L&t.L)}function A(n,r,t){return new h(n.I&r.I^n.I&t.I^r.I&t.I,n.L&r.L^n.L&t.L^r.L&t.L)}function E(n){var r=a(n,28),t=a(n,34),e=a(n,39);return new h(r.I^t.I^e.I,r.L^t.L^e.L)}function p(n,r){var t,e;t=(65535&n.L)+(65535&r.L);var i=(65535&(e=(n.L>>>16)+(r.L>>>16)+(t>>>16)))<<16|65535&t;return t=(65535&n.I)+(65535&r.I)+(e>>>16),e=(n.I>>>16)+(r.I>>>16)+(t>>>16),new h((65535&e)<<16|65535&t,i)}function d(n,r,t,e){var i,o;i=(65535&n.L)+(65535&r.L)+(65535&t.L)+(65535&e.L);var w=(65535&(o=(n.L>>>16)+(r.L>>>16)+(t.L>>>16)+(e.L>>>16)+(i>>>16)))<<16|65535&i;return i=(65535&n.I)+(65535&r.I)+(65535&t.I)+(65535&e.I)+(o>>>16),o=(n.I>>>16)+(r.I>>>16)+(t.I>>>16)+(e.I>>>16)+(i>>>16),new h((65535&o)<<16|65535&i,w)}function R(n,r,t,e,i){var o,w;o=(65535&n.L)+(65535&r.L)+(65535&t.L)+(65535&e.L)+(65535&i.L);var s=(65535&(w=(n.L>>>16)+(r.L>>>16)+(t.L>>>16)+(e.L>>>16)+(i.L>>>16)+(o>>>16)))<<16|65535&o;return o=(65535&n.I)+(65535&r.I)+(65535&t.I)+(65535&e.I)+(65535&i.I)+(w>>>16),w=(n.I>>>16)+(r.I>>>16)+(t.I>>>16)+(e.I>>>16)+(i.I>>>16)+(o>>>16),new h((65535&w)<<16|65535&o,s)}function y(n){var r=a(n,1),t=a(n,8),e=c(n,7);return new h(r.I^t.I^e.I,r.L^t.L^e.L)}function U(n){var r=a(n,14),t=a(n,18),e=a(n,41);return new h(r.I^t.I^e.I,r.L^t.L^e.L)}var l=[new h(o[0],3609767458),new h(o[1],602891725),new h(o[2],3964484399),new h(o[3],2173295548),new h(o[4],4081628472),new h(o[5],3053834265),new h(o[6],2937671579),new h(o[7],3664609560),new h(o[8],2734883394),new h(o[9],1164996542),new h(o[10],1323610764),new h(o[11],3590304994),new h(o[12],4068182383),new h(o[13],991336113),new h(o[14],633803317),new h(o[15],3479774868),new h(o[16],2666613458),new h(o[17],944711139),new h(o[18],2341262773),new h(o[19],2007800933),new h(o[20],1495990901),new h(o[21],1856431235),new h(o[22],3175218132),new h(o[23],2198950837),new h(o[24],3999719339),new h(o[25],766784016),new h(o[26],2566594879),new h(o[27],3203337956),new h(o[28],1034457026),new h(o[29],2466948901),new h(o[30],3758326383),new h(o[31],168717936),new h(o[32],1188179964),new h(o[33],1546045734),new h(o[34],1522805485),new h(o[35],2643833823),new h(o[36],2343527390),new h(o[37],1014477480),new h(o[38],1206759142),new h(o[39],344077627),new h(o[40],1290863460),new h(o[41],3158454273),new h(o[42],3505952657),new h(o[43],106217008),new h(o[44],3606008344),new h(o[45],1432725776),new h(o[46],1467031594),new h(o[47],851169720),new h(o[48],3100823752),new h(o[49],1363258195),new h(o[50],3750685593),new h(o[51],3785050280),new h(o[52],3318307427),new h(o[53],3812723403),new h(o[54],2003034995),new h(o[55],3602036899),new h(o[56],1575990012),new h(o[57],1125592928),new h(o[58],2716904306),new h(o[59],442776044),new h(o[60],593698344),new h(o[61],3733110249),new h(o[62],2999351573),new h(o[63],3815920427),new h(3391569614,3928383900),new h(3515267271,566280711),new h(3940187606,3454069534),new h(4118630271,4000239992),new h(116418474,1914138554),new h(174292421,2731055270),new h(289380356,3203993006),new h(460393269,320620315),new h(685471733,587496836),new h(852142971,1086792851),new h(1017036298,365543100),new h(1126000580,2618297676),new h(1288033470,3409855158),new h(1501505948,4234509866),new h(1607167915,987167468),new h(1816402316,1246189591)];function b(n){return"SHA-384"===n?[new h(3418070365,w[0]),new h(1654270250,w[1]),new h(2438529370,w[2]),new h(355462360,w[3]),new h(1731405415,w[4]),new h(41048885895,w[5]),new h(3675008525,w[6]),new h(1203062813,w[7])]:[new h(s[0],4089235720),new h(s[1],2227873595),new h(s[2],4271175723),new h(s[3],1595750129),new h(s[4],2917565137),new h(s[5],725511199),new h(s[6],4215389547),new h(s[7],327033209)]}function T(n,r){var t,e,i,o,w,s,u,f,b,T,F,m,H,B,g,Y,S=[];for(t=r[0],e=r[1],i=r[2],o=r[3],w=r[4],s=r[5],u=r[6],f=r[7],F=0;F<80;F+=1)F<16?(m=2*F,S[F]=new h(n[m],n[m+1])):S[F]=d((H=S[F-2],B=void 0,g=void 0,Y=void 0,B=a(H,19),g=a(H,61),Y=c(H,6),new h(B.I^g.I^Y.I,B.L^g.L^Y.L)),S[F-7],y(S[F-15]),S[F-16]),b=R(f,U(w),v(w,s,u),l[F],S[F]),T=p(E(t),A(t,e,i)),f=u,u=s,s=w,w=p(o,b),o=i,i=e,e=t,t=p(b,T);return r[0]=p(t,r[0]),r[1]=p(e,r[1]),r[2]=p(i,r[2]),r[3]=p(o,r[3]),r[4]=p(w,r[4]),r[5]=p(s,r[5]),r[6]=p(u,r[6]),r[7]=p(f,r[7]),r}return function(r){function t(n,t,i){var o=r.call(this,n,t,i)||this;if(!1==("SHA-384"===n||"SHA-512"===n))throw new Error("Chosen SHA variant is not supported");return o.B=-1,o.l=e(o.t,o.i,o.B),o.F=T,o.Y=function(n){return n.slice()},o.S=b,o.g=function(r,t,e,i){return function(n,r,t,e,i){for(var o,w=31+(r+129>>>10<<5),s=r+t;n.length<=w;)n.push(0);for(n[r>>>5]|=128<<24-r%32,n[w]=4294967295&s,n[w-1]=s/4294967296|0,o=0;o<n.length;o+=32)e=T(n.slice(o,o+32),e);return"SHA-384"===i?[(e=e)[0].I,e[0].L,e[1].I,e[1].L,e[2].I,e[2].L,e[3].I,e[3].L,e[4].I,e[4].L,e[5].I,e[5].L]:[e[0].I,e[0].L,e[1].I,e[1].L,e[2].I,e[2].L,e[3].I,e[3].L,e[4].I,e[4].L,e[5].I,e[5].L,e[6].I,e[6].L,e[7].I,e[7].L]}(r,t,e,i,n)},o.T=b(n),o.U=1024,o.m="SHA-384"===n?384:512,o.H=!1,o}return function(r,t){function e(){this.constructor=r}n(r,t),r.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}(t,r),t}(f)}));
