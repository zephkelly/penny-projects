globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseStatus, setResponseHeader, getRequestHeaders, createError, readBody, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { klona } from 'klona';
import defu, { defuFn } from 'defu';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';
import nodemailer from 'nodemailer';
import findIndex from '@dword-design/functions/dist/find-index.js';
import omit from '@dword-design/functions/dist/omit.js';
import gracefulShutdown from 'http-graceful-shutdown';

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {}
};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const _sharedRuntimeConfig = _deepFreeze(
  _applyEnv(klona(_inlineRuntimeConfig))
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  _applyEnv(runtimeConfig);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function _applyEnv(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = _getEnv(subKey);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      _applyEnv(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
  return obj;
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

storage.mount('/assets', assets$1);

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function trapUnhandledNodeErrors() {
  {
    process.on(
      "unhandledRejection",
      (err) => console.error("[nitro] [unhandledRejection] " + err)
    );
    process.on(
      "uncaughtException",
      (err) => console.error("[nitro]  [uncaughtException] " + err)
    );
  }
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  event.node.res.end(html);
});

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-n8egyE9tcb7sKGr/pYCaQ4uWqxI\"",
    "mtime": "2023-09-25T04:30:01.147Z",
    "size": 4286,
    "path": "../public/favicon.ico"
  },
  "/_nuxt/default.155701af.js": {
    "type": "application/javascript",
    "etag": "\"bf-D7l+nCOlxY/yDEkBuGRZ/oZQzSk\"",
    "mtime": "2023-09-25T04:30:01.077Z",
    "size": 191,
    "path": "../public/_nuxt/default.155701af.js"
  },
  "/_nuxt/default.761fa5d1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6af-dG0U6gUkziFUpRxNrg/vEo0Ppio\"",
    "mtime": "2023-09-25T04:30:01.077Z",
    "size": 1711,
    "path": "../public/_nuxt/default.761fa5d1.css"
  },
  "/_nuxt/entry.6d4ae5d6.js": {
    "type": "application/javascript",
    "etag": "\"2272b-h1ZBi8NLUMViEBOHr0BO0ERC2HE\"",
    "mtime": "2023-09-25T04:30:01.077Z",
    "size": 141099,
    "path": "../public/_nuxt/entry.6d4ae5d6.js"
  },
  "/_nuxt/error-404.23f2309d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-ivsbEmi48+s9HDOqtrSdWFvddYQ\"",
    "mtime": "2023-09-25T04:30:01.077Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.23f2309d.css"
  },
  "/_nuxt/error-404.2f9ab156.js": {
    "type": "application/javascript",
    "etag": "\"8d2-wePQwA2gzg/DkLUzYJfeEii2p8c\"",
    "mtime": "2023-09-25T04:30:01.077Z",
    "size": 2258,
    "path": "../public/_nuxt/error-404.2f9ab156.js"
  },
  "/_nuxt/error-500.77d2ba87.js": {
    "type": "application/javascript",
    "etag": "\"756-/PgsS6Ldr4xeqSwElL0BKXbIyOw\"",
    "mtime": "2023-09-25T04:30:01.077Z",
    "size": 1878,
    "path": "../public/_nuxt/error-500.77d2ba87.js"
  },
  "/_nuxt/error-500.aa16ed4d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-7j4Tsx89siDo85YoIs0XqsPWmPI\"",
    "mtime": "2023-09-25T04:30:01.077Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.aa16ed4d.css"
  },
  "/_nuxt/hearts.2fbe772e.svg": {
    "type": "image/svg+xml",
    "etag": "\"243a-I8Xqi17dOy//BexbyiBpM3CD9KU\"",
    "mtime": "2023-09-25T04:30:01.077Z",
    "size": 9274,
    "path": "../public/_nuxt/hearts.2fbe772e.svg"
  },
  "/_nuxt/index.b4323152.js": {
    "type": "application/javascript",
    "etag": "\"3ec4-tHDBtji7Rp4HGD590cNjpDHiwSA\"",
    "mtime": "2023-09-25T04:30:01.077Z",
    "size": 16068,
    "path": "../public/_nuxt/index.b4323152.js"
  },
  "/_nuxt/index.eb0f8132.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6475-Ye4x9FPtmdknmB0s6EVnMY3GXgk\"",
    "mtime": "2023-09-25T04:30:01.077Z",
    "size": 25717,
    "path": "../public/_nuxt/index.eb0f8132.css"
  },
  "/_nuxt/nunito-black.055805e2.ttf": {
    "type": "font/ttf",
    "etag": "\"1c564-1/zMdB8q/89U55Bcc+n5+//g/bU\"",
    "mtime": "2023-09-25T04:30:01.077Z",
    "size": 116068,
    "path": "../public/_nuxt/nunito-black.055805e2.ttf"
  },
  "/_nuxt/nunito-regular.9d958cf4.ttf": {
    "type": "font/ttf",
    "etag": "\"1bd5c-4/KAl9nkWxIRa/R+RxrvmpXfaN0\"",
    "mtime": "2023-09-25T04:30:01.067Z",
    "size": 114012,
    "path": "../public/_nuxt/nunito-regular.9d958cf4.ttf"
  },
  "/_nuxt/nuxt-link.406464a1.js": {
    "type": "application/javascript",
    "etag": "\"10fc-vsFnc/XwfwIm2XMFHXySil/A2rw\"",
    "mtime": "2023-09-25T04:30:01.067Z",
    "size": 4348,
    "path": "../public/_nuxt/nuxt-link.406464a1.js"
  },
  "/_nuxt/poppins-black.291e4388.ttf": {
    "type": "font/ttf",
    "etag": "\"24f64-ZF4ExTxrWzW85lSoEevOFq+KpyE\"",
    "mtime": "2023-09-25T04:30:01.067Z",
    "size": 151396,
    "path": "../public/_nuxt/poppins-black.291e4388.ttf"
  },
  "/_nuxt/poppins-bold.7219547e.ttf": {
    "type": "font/ttf",
    "etag": "\"25958-h1zwzs1ke88i551jPYaMGx7Jjfo\"",
    "mtime": "2023-09-25T04:30:01.067Z",
    "size": 153944,
    "path": "../public/_nuxt/poppins-bold.7219547e.ttf"
  },
  "/_nuxt/poppins-regular.707fdc5c.ttf": {
    "type": "font/ttf",
    "etag": "\"26a20-/dMALn2BTuR8HBuEh8csa7s6LQA\"",
    "mtime": "2023-09-25T04:30:01.067Z",
    "size": 158240,
    "path": "../public/_nuxt/poppins-regular.707fdc5c.ttf"
  },
  "/images/0_1.png:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"f3-p4r6jGq38JKFwOzgmFaClc381/A\"",
    "mtime": "2023-09-25T04:30:01.147Z",
    "size": 243,
    "path": "../public/images/0_1.png:Zone.Identifier"
  },
  "/images/approach-1.webp": {
    "type": "image/webp",
    "etag": "\"83dc-iMFj06rdahm8TwShkTxsAvsk/MQ\"",
    "mtime": "2023-09-25T04:30:01.147Z",
    "size": 33756,
    "path": "../public/images/approach-1.webp"
  },
  "/images/approach-1.webp:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"260-lrlsuFE4AGUGopJ5AFpxd84sCs4\"",
    "mtime": "2023-09-25T04:30:01.147Z",
    "size": 608,
    "path": "../public/images/approach-1.webp:Zone.Identifier"
  },
  "/images/donations-1.webp": {
    "type": "image/webp",
    "etag": "\"a37e-uVTGpjQGJ3cZyW4FddAzriLJKAE\"",
    "mtime": "2023-09-25T04:30:01.147Z",
    "size": 41854,
    "path": "../public/images/donations-1.webp"
  },
  "/images/donations-1.webp:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"262-I8I2O8/PfGF6PnOY7cacbi5T7hI\"",
    "mtime": "2023-09-25T04:30:01.147Z",
    "size": 610,
    "path": "../public/images/donations-1.webp:Zone.Identifier"
  },
  "/images/hero-graphic-desktop.webp": {
    "type": "image/webp",
    "etag": "\"2156c-aHHjBfIluAiY5YkRR+xR/1LvAbE\"",
    "mtime": "2023-09-25T04:30:01.147Z",
    "size": 136556,
    "path": "../public/images/hero-graphic-desktop.webp"
  },
  "/images/hero-graphic-desktop.webp:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"274-hUDyzlW9adAGN7Cu0++S4s9Zjmw\"",
    "mtime": "2023-09-25T04:30:01.147Z",
    "size": 628,
    "path": "../public/images/hero-graphic-desktop.webp:Zone.Identifier"
  },
  "/images/hero-graphic.PNG": {
    "type": "image/png",
    "etag": "\"ce829-tqe/Y+wMWUolEJquY/btyr7Q520\"",
    "mtime": "2023-09-25T04:30:01.137Z",
    "size": 845865,
    "path": "../public/images/hero-graphic.PNG"
  },
  "/images/hero-image-mobile.png": {
    "type": "image/png",
    "etag": "\"69aa8e-hDmlmI6fwn3XxXY31/80k039p2o\"",
    "mtime": "2023-09-25T04:30:01.137Z",
    "size": 6924942,
    "path": "../public/images/hero-image-mobile.png"
  },
  "/images/hero-logo-mobile.png": {
    "type": "image/png",
    "etag": "\"1b035-9vEPU+IPzPrFLWqQTWQuhk8daXU\"",
    "mtime": "2023-09-25T04:30:01.137Z",
    "size": 110645,
    "path": "../public/images/hero-logo-mobile.png"
  },
  "/images/joel-headshot.jpg": {
    "type": "image/jpeg",
    "etag": "\"e0b1c-KtB0ONKVs2F9M6m70p5FDqJij5Q\"",
    "mtime": "2023-09-25T04:30:01.127Z",
    "size": 920348,
    "path": "../public/images/joel-headshot.jpg"
  },
  "/images/joel-headshot.jpg:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"f3-s4i/P/1yofMwMS1mSfbflJvdEBw\"",
    "mtime": "2023-09-25T04:30:01.127Z",
    "size": 243,
    "path": "../public/images/joel-headshot.jpg:Zone.Identifier"
  },
  "/images/logo-round.png": {
    "type": "image/png",
    "etag": "\"1ddc7-Pk7Ylz2i+pI0g9k/tbY5fbnpvRY\"",
    "mtime": "2023-09-25T04:30:01.127Z",
    "size": 122311,
    "path": "../public/images/logo-round.png"
  },
  "/images/logo-round.png:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"f3-Udpo9iVyJO1LJInObE2h+43mT3w\"",
    "mtime": "2023-09-25T04:30:01.127Z",
    "size": 243,
    "path": "../public/images/logo-round.png:Zone.Identifier"
  },
  "/images/mission-graphic-1.webp": {
    "type": "image/webp",
    "etag": "\"3126-5hWoSb7PByZ5O0t1gq3pY/PXbAg\"",
    "mtime": "2023-09-25T04:30:01.127Z",
    "size": 12582,
    "path": "../public/images/mission-graphic-1.webp"
  },
  "/images/mission-graphic-2.webp": {
    "type": "image/webp",
    "etag": "\"44fe-0c9fjcx+tD979TbB7UzsOykylWA\"",
    "mtime": "2023-09-25T04:30:01.127Z",
    "size": 17662,
    "path": "../public/images/mission-graphic-2.webp"
  },
  "/images/mission-graphic-2.webp:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"26e-dSzgE8zW8skyErH434iowaRJwGc\"",
    "mtime": "2023-09-25T04:30:01.127Z",
    "size": 622,
    "path": "../public/images/mission-graphic-2.webp:Zone.Identifier"
  },
  "/images/mission-graphic-3.webp": {
    "type": "image/webp",
    "etag": "\"4512-2k2FGR9+2BYAInJZsgjUJoz9fJo\"",
    "mtime": "2023-09-25T04:30:01.127Z",
    "size": 17682,
    "path": "../public/images/mission-graphic-3.webp"
  },
  "/images/mission-graphic-3.webp:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"26e-42cUQJdimVpcK2CKkG3JLBJ0+/k\"",
    "mtime": "2023-09-25T04:30:01.127Z",
    "size": 622,
    "path": "../public/images/mission-graphic-3.webp:Zone.Identifier"
  },
  "/images/school-banner.JPG:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"f3-7zIqEtCXoGwRiaorHo6KhoxKkK4\"",
    "mtime": "2023-09-25T04:30:01.127Z",
    "size": 243,
    "path": "../public/images/school-banner.JPG:Zone.Identifier"
  },
  "/images/school-banner.webp": {
    "type": "image/webp",
    "etag": "\"747f08-5FFJy715vSzw8jGzmMy2D2UrgMY\"",
    "mtime": "2023-09-25T04:30:01.107Z",
    "size": 7634696,
    "path": "../public/images/school-banner.webp"
  },
  "/images/school-banner.webp:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"266-u6cwQ+SUkGfJ5nUgKJrBuUFJVBY\"",
    "mtime": "2023-09-25T04:30:01.107Z",
    "size": 614,
    "path": "../public/images/school-banner.webp:Zone.Identifier"
  },
  "/svg/hearts.svg:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"32-rjVqZ9M3r6WTPj5nnoSFTe6s4Eg\"",
    "mtime": "2023-09-25T04:30:01.107Z",
    "size": 50,
    "path": "../public/svg/hearts.svg:Zone.Identifier"
  },
  "/svg/icon_facebook.svg": {
    "type": "image/svg+xml",
    "etag": "\"423-xnrEeT38ec4P/g2l34U5J+exEAc\"",
    "mtime": "2023-09-25T04:30:01.107Z",
    "size": 1059,
    "path": "../public/svg/icon_facebook.svg"
  },
  "/svg/icon_facebook.svg:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"f3-U9Ucw8adusJ7UhZhCPM7c5yvSsM\"",
    "mtime": "2023-09-25T04:30:01.107Z",
    "size": 243,
    "path": "../public/svg/icon_facebook.svg:Zone.Identifier"
  },
  "/svg/icon_instagram.svg": {
    "type": "image/svg+xml",
    "etag": "\"3541-+pOF99SOikAty9qiw6szGbotY2c\"",
    "mtime": "2023-09-25T04:30:01.107Z",
    "size": 13633,
    "path": "../public/svg/icon_instagram.svg"
  },
  "/svg/icon_instagram.svg:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"f3-MOCJyF2Woa2Qg4OaNbQFra9G6Rw\"",
    "mtime": "2023-09-25T04:30:01.107Z",
    "size": 243,
    "path": "../public/svg/icon_instagram.svg:Zone.Identifier"
  },
  "/svg/icon_youtube.svg": {
    "type": "image/svg+xml",
    "etag": "\"39a-iFJMjGKk7ayI95Psher1ikW6yj8\"",
    "mtime": "2023-09-25T04:30:01.107Z",
    "size": 922,
    "path": "../public/svg/icon_youtube.svg"
  },
  "/svg/icon_youtube.svg:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"f3-7C0Ay+iqqvLNI9ftRNlv03AJlgw\"",
    "mtime": "2023-09-25T04:30:01.107Z",
    "size": 243,
    "path": "../public/svg/icon_youtube.svg:Zone.Identifier"
  },
  "/svg/penny-icons-bg.svg": {
    "type": "image/svg+xml",
    "etag": "\"41fa1-66xsqqUoSRvn8E58VxQ63syCI3M\"",
    "mtime": "2023-09-25T04:30:01.087Z",
    "size": 270241,
    "path": "../public/svg/penny-icons-bg.svg"
  },
  "/svg/penny-icons-bg.svg:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"f3-ZUO/s5/Yuo07T1ceUHFfbuCLO30\"",
    "mtime": "2023-09-25T04:30:01.087Z",
    "size": 243,
    "path": "../public/svg/penny-icons-bg.svg:Zone.Identifier"
  },
  "/svg/penny-project-header.png": {
    "type": "image/png",
    "etag": "\"75f9-5negGh0iYjh42kg+mio8Hf28g4w\"",
    "mtime": "2023-09-25T04:30:01.087Z",
    "size": 30201,
    "path": "../public/svg/penny-project-header.png"
  },
  "/svg/penny-project-header.svg": {
    "type": "image/svg+xml",
    "etag": "\"aab-bGf7jFlS87QJUzGrnIlp9M0b8qY\"",
    "mtime": "2023-09-25T04:30:01.087Z",
    "size": 2731,
    "path": "../public/svg/penny-project-header.svg"
  },
  "/svg/penny-project-header.svg:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"53c-KLqUq+bMzlEqaV37DlFGgFLOb9k\"",
    "mtime": "2023-09-25T04:30:01.087Z",
    "size": 1340,
    "path": "../public/svg/penny-project-header.svg:Zone.Identifier"
  },
  "/svg/icons/hearts.svg": {
    "type": "image/svg+xml",
    "etag": "\"243a-I8Xqi17dOy//BexbyiBpM3CD9KU\"",
    "mtime": "2023-09-25T04:30:01.097Z",
    "size": 9274,
    "path": "../public/svg/icons/hearts.svg"
  },
  "/svg/icons/hearts.svg:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"32-rjVqZ9M3r6WTPj5nnoSFTe6s4Eg\"",
    "mtime": "2023-09-25T04:30:01.097Z",
    "size": 50,
    "path": "../public/svg/icons/hearts.svg:Zone.Identifier"
  },
  "/svg/icons/menu-burger.svg": {
    "type": "image/svg+xml",
    "etag": "\"ae-IrGMLYD6kQXzYk9m2Mqy60MNjbo\"",
    "mtime": "2023-09-25T04:30:01.097Z",
    "size": 174,
    "path": "../public/svg/icons/menu-burger.svg"
  },
  "/svg/icons/menu-burger.svg:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"32-rjVqZ9M3r6WTPj5nnoSFTe6s4Eg\"",
    "mtime": "2023-09-25T04:30:01.097Z",
    "size": 50,
    "path": "../public/svg/icons/menu-burger.svg:Zone.Identifier"
  },
  "/svg/icons/penny-project-header.png:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"f3-Abv6f1Z+8yzYtZNFOSsIa2jysfI\"",
    "mtime": "2023-09-25T04:30:01.097Z",
    "size": 243,
    "path": "../public/svg/icons/penny-project-header.png:Zone.Identifier"
  },
  "/svg/icons/penny-projects-logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"aab-1XcyAtT29M/h3wJRe2usH8C5d0A\"",
    "mtime": "2023-09-25T04:30:01.097Z",
    "size": 2731,
    "path": "../public/svg/icons/penny-projects-logo.svg"
  },
  "/svg/icons/penny-projects-logo.svg:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"f3-pLYNB0c+gUyuFpRoApHrAh0B59Y\"",
    "mtime": "2023-09-25T04:30:01.097Z",
    "size": 243,
    "path": "../public/svg/icons/penny-projects-logo.svg:Zone.Identifier"
  },
  "/svg/icons/profile.svg": {
    "type": "image/svg+xml",
    "etag": "\"381-Pdw9GWwWj3D8cagXIr/m8sSplE4\"",
    "mtime": "2023-09-25T04:30:01.097Z",
    "size": 897,
    "path": "../public/svg/icons/profile.svg"
  },
  "/svg/icons/profile.svg:Zone.Identifier": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"32-rjVqZ9M3r6WTPj5nnoSFTe6s4Eg\"",
    "mtime": "2023-09-25T04:30:01.097Z",
    "size": 50,
    "path": "../public/svg/icons/profile.svg:Zone.Identifier"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    if (!event.handled) {
      event.node.res.statusCode = 304;
      event.node.res.end();
    }
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    if (!event.handled) {
      event.node.res.statusCode = 304;
      event.node.res.end();
    }
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const options = {
  "message": [
    {
      "to": "masterevank@gmail.com"
    }
  ],
  "smtp": {
    "service": "gmail",
    "auth": {
      "user": "masterevank@gmail.com",
      "pass": "ogemotaqsvljeqto"
    },
    "host": "smtp.gmail.com",
    "port": 465,
    "secure": true
  }
};

const send = (async (body, options, transport) => {
  body = {
    config: 0,
    ...body
  };
  if (typeof body.config === 'string') {
    const configIndex = findIndex(_ => _.name === body.config)(options.message);
    if (configIndex === -1) {
      throw new Error(`Message config with name '${body.config}' not found.`);
    }
    body.config = configIndex;
  } else if (!options.message[body.config]) {
    throw new Error(`Message config not found at index ${body.config}.`);
  }
  await transport.sendMail({
    ...omit(['config', 'to', 'cc', 'bcc'])(body),
    ...omit(['name'])(options.message[body.config])
  });
});

const transport = nodemailer.createTransport(options.smtp);
const _Fb6ioB = defineEventHandler(async event => {
  try {
    await send(await readBody(event), options, transport);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    });
  }
  return '';
});

const _lazy_UKtEYL = () => import('../handlers/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_UKtEYL, lazy: true, middleware: false, method: undefined },
  { route: '/mail/send', handler: _Fb6ioB, lazy: false, middleware: false, method: "post" },
  { route: '/**', handler: _lazy_UKtEYL, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || {};
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  gracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((err) => {
          console.error(err);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const listener = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
