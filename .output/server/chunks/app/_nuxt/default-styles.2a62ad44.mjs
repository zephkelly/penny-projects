import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'h3';
import 'devalue';
import 'vue/server-renderer';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'klona';
import 'defu';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'nodemailer';
import '@dword-design/functions/dist/find-index.js';
import '@dword-design/functions/dist/omit.js';
import 'http-graceful-shutdown';

const main = 'a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{border:0;font-size:100%;font:inherit;margin:0;padding:0;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:"";content:none}table{border-collapse:collapse;border-spacing:0}a{color:inherit;text-decoration:none}:root{--text-color-main:#8e351e;--text-color-secondary:#f1ac9c;--background-color-main:#eae6d7;--background-color-secondary:#fff}@font-face{font-family:Nunito;font-weight:700;src:url(' + buildAssetsURL("nunito-black.055805e2.ttf") + ') format("truetype")}@font-face{font-family:Nunito;font-weight:400;src:url(' + buildAssetsURL("nunito-regular.9d958cf4.ttf") + ') format("truetype")}@font-face{font-family:Poppins;font-weight:700;src:url(' + buildAssetsURL("poppins-black.291e4388.ttf") + ') format("truetype")}@font-face{font-family:Poppins;font-weight:600;src:url(' + buildAssetsURL("poppins-bold.7219547e.ttf") + ') format("truetype")}@font-face{font-family:Poppins;font-weight:400;src:url(' + buildAssetsURL("poppins-regular.707fdc5c.ttf") + ') format("truetype")}body{background-color:#eae6d7}#__nuxt,main{overscroll-behavior:none}main{overflow:hidden}header .container,section .container{display:flex;flex-direction:row;height:100%;max-width:1200px;width:100%}header .container>*,section .container>*{display:flex}';

const defaultStyles_2a62ad44 = [main];

export { defaultStyles_2a62ad44 as default };
//# sourceMappingURL=default-styles.2a62ad44.mjs.map
