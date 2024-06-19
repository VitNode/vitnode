(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/ssr/[project]__e1fc74._.js", {

"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/globals.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ensureInstrumentationRegistered": ()=>ensureInstrumentationRegistered
});
async function registerInstrumentation() {
    const register = '_ENTRIES' in globalThis && _ENTRIES.middleware_instrumentation && (await _ENTRIES.middleware_instrumentation).register;
    if (register) {
        try {
            await register();
        } catch (err) {
            err.message = `An error occurred while loading instrumentation hook: ${err.message}`;
            throw err;
        }
    }
}
let registerInstrumentationPromise = null;
function ensureInstrumentationRegistered() {
    if ("TURBOPACK compile-time truthy", 1) {
        registerInstrumentationPromise = registerInstrumentation();
    }
    return registerInstrumentationPromise;
}
function getUnsupportedModuleErrorMessage(module) {
    // warning: if you change these messages, you must adjust how react-dev-overlay's middleware detects modules not found
    return `The edge runtime does not support Node.js '${module}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
}
function __import_unsupported(moduleName) {
    const proxy = new Proxy(function() {}, {
        get (_obj, prop) {
            if (prop === 'then') {
                return {};
            }
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        },
        construct () {
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        },
        apply (_target, _this, args) {
            if (typeof args[0] === 'function') {
                return args[0](proxy);
            }
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        }
    });
    return new Proxy({}, {
        get: ()=>proxy
    });
}
function enhanceGlobals() {
    // The condition is true when the "process" module is provided
    if (process !== global.process) {
        // prefer local process but global.process has correct "env"
        process.env = global.process.env;
        global.process = process;
    }
    // to allow building code that import but does not use node.js modules,
    // webpack will expect this function to exist in global scope
    Object.defineProperty(globalThis, '__import_unsupported', {
        value: __import_unsupported,
        enumerable: false,
        configurable: false
    });
    // Eagerly fire instrumentation hook to make the startup faster.
    void ensureInstrumentationRegistered();
}
enhanceGlobals(); //# sourceMappingURL=globals.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/error.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "PageSignatureError": ()=>PageSignatureError,
    "RemovedPageError": ()=>RemovedPageError,
    "RemovedUAError": ()=>RemovedUAError
});
class PageSignatureError extends Error {
    constructor({ page }){
        super(`The middleware "${page}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
    }
}
class RemovedPageError extends Error {
    constructor(){
        super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
    }
}
class RemovedUAError extends Error {
    constructor(){
        super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
    }
} //# sourceMappingURL=error.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/lib/constants.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ACTION_SUFFIX": ()=>ACTION_SUFFIX,
    "APP_DIR_ALIAS": ()=>APP_DIR_ALIAS,
    "CACHE_ONE_YEAR": ()=>CACHE_ONE_YEAR,
    "DOT_NEXT_ALIAS": ()=>DOT_NEXT_ALIAS,
    "ESLINT_DEFAULT_DIRS": ()=>ESLINT_DEFAULT_DIRS,
    "ESLINT_PROMPT_VALUES": ()=>ESLINT_PROMPT_VALUES,
    "GSP_NO_RETURNED_VALUE": ()=>GSP_NO_RETURNED_VALUE,
    "GSSP_COMPONENT_MEMBER_ERROR": ()=>GSSP_COMPONENT_MEMBER_ERROR,
    "GSSP_NO_RETURNED_VALUE": ()=>GSSP_NO_RETURNED_VALUE,
    "INSTRUMENTATION_HOOK_FILENAME": ()=>INSTRUMENTATION_HOOK_FILENAME,
    "MIDDLEWARE_FILENAME": ()=>MIDDLEWARE_FILENAME,
    "MIDDLEWARE_LOCATION_REGEXP": ()=>MIDDLEWARE_LOCATION_REGEXP,
    "NEXT_BODY_SUFFIX": ()=>NEXT_BODY_SUFFIX,
    "NEXT_CACHE_IMPLICIT_TAG_ID": ()=>NEXT_CACHE_IMPLICIT_TAG_ID,
    "NEXT_CACHE_REVALIDATED_TAGS_HEADER": ()=>NEXT_CACHE_REVALIDATED_TAGS_HEADER,
    "NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER": ()=>NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER,
    "NEXT_CACHE_SOFT_TAGS_HEADER": ()=>NEXT_CACHE_SOFT_TAGS_HEADER,
    "NEXT_CACHE_SOFT_TAG_MAX_LENGTH": ()=>NEXT_CACHE_SOFT_TAG_MAX_LENGTH,
    "NEXT_CACHE_TAGS_HEADER": ()=>NEXT_CACHE_TAGS_HEADER,
    "NEXT_CACHE_TAG_MAX_ITEMS": ()=>NEXT_CACHE_TAG_MAX_ITEMS,
    "NEXT_CACHE_TAG_MAX_LENGTH": ()=>NEXT_CACHE_TAG_MAX_LENGTH,
    "NEXT_DATA_SUFFIX": ()=>NEXT_DATA_SUFFIX,
    "NEXT_INTERCEPTION_MARKER_PREFIX": ()=>NEXT_INTERCEPTION_MARKER_PREFIX,
    "NEXT_META_SUFFIX": ()=>NEXT_META_SUFFIX,
    "NEXT_QUERY_PARAM_PREFIX": ()=>NEXT_QUERY_PARAM_PREFIX,
    "NON_STANDARD_NODE_ENV": ()=>NON_STANDARD_NODE_ENV,
    "PAGES_DIR_ALIAS": ()=>PAGES_DIR_ALIAS,
    "PRERENDER_REVALIDATE_HEADER": ()=>PRERENDER_REVALIDATE_HEADER,
    "PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER": ()=>PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER,
    "PUBLIC_DIR_MIDDLEWARE_CONFLICT": ()=>PUBLIC_DIR_MIDDLEWARE_CONFLICT,
    "ROOT_DIR_ALIAS": ()=>ROOT_DIR_ALIAS,
    "RSC_ACTION_CLIENT_WRAPPER_ALIAS": ()=>RSC_ACTION_CLIENT_WRAPPER_ALIAS,
    "RSC_ACTION_ENCRYPTION_ALIAS": ()=>RSC_ACTION_ENCRYPTION_ALIAS,
    "RSC_ACTION_PROXY_ALIAS": ()=>RSC_ACTION_PROXY_ALIAS,
    "RSC_ACTION_VALIDATE_ALIAS": ()=>RSC_ACTION_VALIDATE_ALIAS,
    "RSC_MOD_REF_PROXY_ALIAS": ()=>RSC_MOD_REF_PROXY_ALIAS,
    "RSC_PREFETCH_SUFFIX": ()=>RSC_PREFETCH_SUFFIX,
    "RSC_SUFFIX": ()=>RSC_SUFFIX,
    "SERVER_PROPS_EXPORT_ERROR": ()=>SERVER_PROPS_EXPORT_ERROR,
    "SERVER_PROPS_GET_INIT_PROPS_CONFLICT": ()=>SERVER_PROPS_GET_INIT_PROPS_CONFLICT,
    "SERVER_PROPS_SSG_CONFLICT": ()=>SERVER_PROPS_SSG_CONFLICT,
    "SERVER_RUNTIME": ()=>SERVER_RUNTIME,
    "SSG_FALLBACK_EXPORT_ERROR": ()=>SSG_FALLBACK_EXPORT_ERROR,
    "SSG_GET_INITIAL_PROPS_CONFLICT": ()=>SSG_GET_INITIAL_PROPS_CONFLICT,
    "STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR": ()=>STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR,
    "UNSTABLE_REVALIDATE_RENAME_ERROR": ()=>UNSTABLE_REVALIDATE_RENAME_ERROR,
    "WEBPACK_LAYERS": ()=>WEBPACK_LAYERS,
    "WEBPACK_RESOURCE_QUERIES": ()=>WEBPACK_RESOURCE_QUERIES
});
const NEXT_QUERY_PARAM_PREFIX = 'nxtP';
const NEXT_INTERCEPTION_MARKER_PREFIX = 'nxtI';
const PRERENDER_REVALIDATE_HEADER = 'x-prerender-revalidate';
const PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = 'x-prerender-revalidate-if-generated';
const RSC_PREFETCH_SUFFIX = '.prefetch.rsc';
const RSC_SUFFIX = '.rsc';
const ACTION_SUFFIX = '.action';
const NEXT_DATA_SUFFIX = '.json';
const NEXT_META_SUFFIX = '.meta';
const NEXT_BODY_SUFFIX = '.body';
const NEXT_CACHE_TAGS_HEADER = 'x-next-cache-tags';
const NEXT_CACHE_SOFT_TAGS_HEADER = 'x-next-cache-soft-tags';
const NEXT_CACHE_REVALIDATED_TAGS_HEADER = 'x-next-revalidated-tags';
const NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = 'x-next-revalidate-tag-token';
const NEXT_CACHE_TAG_MAX_ITEMS = 64;
const NEXT_CACHE_TAG_MAX_LENGTH = 256;
const NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
const NEXT_CACHE_IMPLICIT_TAG_ID = '_N_T_';
const CACHE_ONE_YEAR = 31536000;
const MIDDLEWARE_FILENAME = 'middleware';
const MIDDLEWARE_LOCATION_REGEXP = `(?:src/)?${MIDDLEWARE_FILENAME}`;
const INSTRUMENTATION_HOOK_FILENAME = 'instrumentation';
const PAGES_DIR_ALIAS = 'private-next-pages';
const DOT_NEXT_ALIAS = 'private-dot-next';
const ROOT_DIR_ALIAS = 'private-next-root-dir';
const APP_DIR_ALIAS = 'private-next-app-dir';
const RSC_MOD_REF_PROXY_ALIAS = 'private-next-rsc-mod-ref-proxy';
const RSC_ACTION_VALIDATE_ALIAS = 'private-next-rsc-action-validate';
const RSC_ACTION_PROXY_ALIAS = 'private-next-rsc-server-reference';
const RSC_ACTION_ENCRYPTION_ALIAS = 'private-next-rsc-action-encryption';
const RSC_ACTION_CLIENT_WRAPPER_ALIAS = 'private-next-rsc-action-client-wrapper';
const PUBLIC_DIR_MIDDLEWARE_CONFLICT = `You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`;
const SSG_GET_INITIAL_PROPS_CONFLICT = `You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`;
const SERVER_PROPS_GET_INIT_PROPS_CONFLICT = `You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`;
const SERVER_PROPS_SSG_CONFLICT = `You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`;
const STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = `can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`;
const SERVER_PROPS_EXPORT_ERROR = `pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`;
const GSP_NO_RETURNED_VALUE = 'Your `getStaticProps` function did not return an object. Did you forget to add a `return`?';
const GSSP_NO_RETURNED_VALUE = 'Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?';
const UNSTABLE_REVALIDATE_RENAME_ERROR = 'The `unstable_revalidate` property is available for general use.\n' + 'Please use `revalidate` instead.';
const GSSP_COMPONENT_MEMBER_ERROR = `can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`;
const NON_STANDARD_NODE_ENV = `You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`;
const SSG_FALLBACK_EXPORT_ERROR = `Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`;
const ESLINT_DEFAULT_DIRS = [
    'app',
    'pages',
    'components',
    'lib',
    'src'
];
const ESLINT_PROMPT_VALUES = [
    {
        title: 'Strict',
        recommended: true,
        config: {
            extends: 'next/core-web-vitals'
        }
    },
    {
        title: 'Base',
        config: {
            extends: 'next'
        }
    },
    {
        title: 'Cancel',
        config: null
    }
];
const SERVER_RUNTIME = {
    edge: 'edge',
    experimentalEdge: 'experimental-edge',
    nodejs: 'nodejs'
};
/**
 * The names of the webpack layers. These layers are the primitives for the
 * webpack chunks.
 */ const WEBPACK_LAYERS_NAMES = {
    /**
   * The layer for the shared code between the client and server bundles.
   */ shared: 'shared',
    /**
   * The layer for server-only runtime and picking up `react-server` export conditions.
   * Including app router RSC pages and app router custom routes.
   */ reactServerComponents: 'rsc',
    /**
   * Server Side Rendering layer for app (ssr).
   */ serverSideRendering: 'ssr',
    /**
   * The browser client bundle layer for actions.
   */ actionBrowser: 'action-browser',
    /**
   * The layer for the API routes.
   */ api: 'api',
    /**
   * The layer for the middleware code.
   */ middleware: 'middleware',
    /**
   * The layer for the instrumentation hooks.
   */ instrument: 'instrument',
    /**
   * The layer for assets on the edge.
   */ edgeAsset: 'edge-asset',
    /**
   * The browser client bundle layer for App directory.
   */ appPagesBrowser: 'app-pages-browser',
    /**
   * The server bundle layer for metadata routes.
   */ appMetadataRoute: 'app-metadata-route'
};
const WEBPACK_LAYERS = {
    ...WEBPACK_LAYERS_NAMES,
    GROUP: {
        serverOnly: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.appMetadataRoute,
            WEBPACK_LAYERS_NAMES.instrument,
            WEBPACK_LAYERS_NAMES.middleware
        ],
        neutralTarget: [
            // pages api
            WEBPACK_LAYERS_NAMES.api
        ],
        clientOnly: [
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser
        ],
        app: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.appMetadataRoute,
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser,
            WEBPACK_LAYERS_NAMES.shared,
            WEBPACK_LAYERS_NAMES.instrument
        ]
    }
};
const WEBPACK_RESOURCE_QUERIES = {
    edgeSSREntry: '__next_edge_ssr_entry__',
    metadata: '__next_metadata__',
    metadataRoute: '__next_metadata_route__',
    metadataImageMeta: '__next_metadata_image_meta__'
};
;
 //# sourceMappingURL=constants.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/utils.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "fromNodeOutgoingHttpHeaders": ()=>fromNodeOutgoingHttpHeaders,
    "normalizeNextQueryParam": ()=>normalizeNextQueryParam,
    "splitCookiesString": ()=>splitCookiesString,
    "toNodeOutgoingHttpHeaders": ()=>toNodeOutgoingHttpHeaders,
    "validateURL": ()=>validateURL
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/lib/constants.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
function fromNodeOutgoingHttpHeaders(nodeHeaders) {
    const headers = new Headers();
    for (let [key, value] of Object.entries(nodeHeaders)){
        const values = Array.isArray(value) ? value : [
            value
        ];
        for (let v of values){
            if (typeof v === 'undefined') continue;
            if (typeof v === 'number') {
                v = v.toString();
            }
            headers.append(key, v);
        }
    }
    return headers;
}
function splitCookiesString(cookiesString) {
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== '=' && ch !== ';' && ch !== ',';
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ',') {
                // ',' is a cookie separator if we have later first '=', not ';' or ','
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                // currently special character
                if (pos < cookiesString.length && cookiesString.charAt(pos) === '=') {
                    // we found cookies separator
                    cookiesSeparatorFound = true;
                    // pos is inside the next cookie, so back up and return it.
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    // in param ',' or param separator ';',
                    // we continue from that comma
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
function toNodeOutgoingHttpHeaders(headers) {
    const nodeHeaders = {};
    const cookies = [];
    if (headers) {
        for (const [key, value] of headers.entries()){
            if (key.toLowerCase() === 'set-cookie') {
                // We may have gotten a comma joined string of cookies, or multiple
                // set-cookie headers. We need to merge them into one header array
                // to represent all the cookies.
                cookies.push(...splitCookiesString(value));
                nodeHeaders[key] = cookies.length === 1 ? cookies[0] : cookies;
            } else {
                nodeHeaders[key] = value;
            }
        }
    }
    return nodeHeaders;
}
function validateURL(url) {
    try {
        return String(new URL(String(url)));
    } catch (error) {
        throw new Error(`URL is malformed "${String(url)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, {
            cause: error
        });
    }
}
function normalizeNextQueryParam(key, onKeyNormalized) {
    const prefixes = [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NEXT_QUERY_PARAM_PREFIX"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NEXT_INTERCEPTION_MARKER_PREFIX"]
    ];
    for (const prefix of prefixes){
        if (key !== prefix && key.startsWith(prefix)) {
            const normalizedKey = key.substring(prefix.length);
            onKeyNormalized(normalizedKey);
        }
    }
} //# sourceMappingURL=utils.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/fetch-event.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "NextFetchEvent": ()=>NextFetchEvent,
    "waitUntilSymbol": ()=>waitUntilSymbol
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/error.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const responseSymbol = Symbol('response');
const passThroughSymbol = Symbol('passThrough');
const waitUntilSymbol = Symbol('waitUntil');
class FetchEvent {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(_request){
        this[waitUntilSymbol] = [];
        this[passThroughSymbol] = false;
    }
    respondWith(response) {
        if (!this[responseSymbol]) {
            this[responseSymbol] = Promise.resolve(response);
        }
    }
    passThroughOnException() {
        this[passThroughSymbol] = true;
    }
    waitUntil(promise) {
        this[waitUntilSymbol].push(promise);
    }
}
class NextFetchEvent extends FetchEvent {
    constructor(params){
        super(params.request);
        this.sourcePage = params.page;
    }
    /**
   * @deprecated The `request` is now the first parameter and the API is now async.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ get request() {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["PageSignatureError"]({
            page: this.sourcePage
        });
    }
    /**
   * @deprecated Using `respondWith` is no longer needed.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ respondWith() {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["PageSignatureError"]({
            page: this.sourcePage
        });
    }
} //# sourceMappingURL=fetch-event.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/i18n/detect-domain-locale.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "detectDomainLocale": ()=>detectDomainLocale
});
function detectDomainLocale(domainItems, hostname, detectedLocale) {
    if (!domainItems) return;
    if (detectedLocale) {
        detectedLocale = detectedLocale.toLowerCase();
    }
    for (const item of domainItems){
        var _item_domain, _item_locales;
        // remove port if present
        const domainHostname = (_item_domain = item.domain) == null ? void 0 : _item_domain.split(':', 1)[0].toLowerCase();
        if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || ((_item_locales = item.locales) == null ? void 0 : _item_locales.some((locale)=>locale.toLowerCase() === detectedLocale))) {
            return item;
        }
    }
} //# sourceMappingURL=detect-domain-locale.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/remove-trailing-slash.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * Removes the trailing slash for a given route or page path. Preserves the
 * root page. Examples:
 *   - `/foo/bar/` -> `/foo/bar`
 *   - `/foo/bar` -> `/foo/bar`
 *   - `/` -> `/`
 */ __turbopack_esm__({
    "removeTrailingSlash": ()=>removeTrailingSlash
});
function removeTrailingSlash(route) {
    return route.replace(/\/$/, '') || '/';
} //# sourceMappingURL=remove-trailing-slash.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/parse-path.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * Given a path this function will find the pathname, query and hash and return
 * them. This is useful to parse full paths on the client side.
 * @param path A path to parse e.g. /foo/bar?id=1#hash
 */ __turbopack_esm__({
    "parsePath": ()=>parsePath
});
function parsePath(path) {
    const hashIndex = path.indexOf('#');
    const queryIndex = path.indexOf('?');
    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
    if (hasQuery || hashIndex > -1) {
        return {
            pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
            query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : '',
            hash: hashIndex > -1 ? path.slice(hashIndex) : ''
        };
    }
    return {
        pathname: path,
        query: '',
        hash: ''
    };
} //# sourceMappingURL=parse-path.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/add-path-prefix.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "addPathPrefix": ()=>addPathPrefix
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$path$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/parse-path.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
function addPathPrefix(path, prefix) {
    if (!path.startsWith('/') || !prefix) {
        return path;
    }
    const { pathname, query, hash } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$path$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["parsePath"])(path);
    return "" + prefix + pathname + query + hash;
} //# sourceMappingURL=add-path-prefix.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/add-path-suffix.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "addPathSuffix": ()=>addPathSuffix
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$path$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/parse-path.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
function addPathSuffix(path, suffix) {
    if (!path.startsWith('/') || !suffix) {
        return path;
    }
    const { pathname, query, hash } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$path$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["parsePath"])(path);
    return "" + pathname + suffix + query + hash;
} //# sourceMappingURL=add-path-suffix.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "pathHasPrefix": ()=>pathHasPrefix
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$path$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/parse-path.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
function pathHasPrefix(path, prefix) {
    if (typeof path !== 'string') {
        return false;
    }
    const { pathname } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$path$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["parsePath"])(path);
    return pathname === prefix || pathname.startsWith(prefix + '/');
} //# sourceMappingURL=path-has-prefix.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/add-locale.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "addLocale": ()=>addLocale
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$prefix$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/add-path-prefix.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function addLocale(path, locale, defaultLocale, ignorePrefix) {
    // If no locale was given or the locale is the default locale, we don't need
    // to prefix the path.
    if (!locale || locale === defaultLocale) return path;
    const lower = path.toLowerCase();
    // If the path is an API path or the path already has the locale prefix, we
    // don't need to prefix the path.
    if (!ignorePrefix) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["pathHasPrefix"])(lower, '/api')) return path;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["pathHasPrefix"])(lower, "/" + locale.toLowerCase())) return path;
    }
    // Add the locale prefix to the path.
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$prefix$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["addPathPrefix"])(path, "/" + locale);
} //# sourceMappingURL=add-locale.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/format-next-pathname-info.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "formatNextPathnameInfo": ()=>formatNextPathnameInfo
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$trailing$2d$slash$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/remove-trailing-slash.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$prefix$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/add-path-prefix.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$suffix$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/add-path-suffix.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$locale$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/add-locale.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
function formatNextPathnameInfo(info) {
    let pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$locale$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["addLocale"])(info.pathname, info.locale, info.buildId ? undefined : info.defaultLocale, info.ignorePrefix);
    if (info.buildId || !info.trailingSlash) {
        pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$trailing$2d$slash$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(pathname);
    }
    if (info.buildId) {
        pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$suffix$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["addPathSuffix"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$prefix$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["addPathPrefix"])(pathname, "/_next/data/" + info.buildId), info.pathname === '/' ? 'index.json' : '.json');
    }
    pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$prefix$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["addPathPrefix"])(pathname, info.basePath);
    return !info.buildId && info.trailingSlash ? !pathname.endsWith('/') ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$suffix$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["addPathSuffix"])(pathname, '/') : pathname : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$trailing$2d$slash$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(pathname);
} //# sourceMappingURL=format-next-pathname-info.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/get-hostname.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * Takes an object with a hostname property (like a parsed URL) and some
 * headers that may contain Host and returns the preferred hostname.
 * @param parsed An object containing a hostname property.
 * @param headers A dictionary with headers containing a `host`.
 */ __turbopack_esm__({
    "getHostname": ()=>getHostname
});
function getHostname(parsed, headers) {
    // Get the hostname from the headers if it exists, otherwise use the parsed
    // hostname.
    let hostname;
    if ((headers == null ? void 0 : headers.host) && !Array.isArray(headers.host)) {
        hostname = headers.host.toString().split(':', 1)[0];
    } else if (parsed.hostname) {
        hostname = parsed.hostname;
    } else return;
    return hostname.toLowerCase();
} //# sourceMappingURL=get-hostname.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/i18n/normalize-locale-path.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * For a pathname that may include a locale from a list of locales, it
 * removes the locale from the pathname returning it alongside with the
 * detected locale.
 *
 * @param pathname A pathname that may include a locale.
 * @param locales A list of locales.
 * @returns The detected locale and pathname without locale
 */ __turbopack_esm__({
    "normalizeLocalePath": ()=>normalizeLocalePath
});
function normalizeLocalePath(pathname, locales) {
    let detectedLocale;
    // first item will be empty string from splitting at first char
    const pathnameParts = pathname.split('/');
    (locales || []).some((locale)=>{
        if (pathnameParts[1] && pathnameParts[1].toLowerCase() === locale.toLowerCase()) {
            detectedLocale = locale;
            pathnameParts.splice(1, 1);
            pathname = pathnameParts.join('/') || '/';
            return true;
        }
        return false;
    });
    return {
        pathname,
        detectedLocale
    };
} //# sourceMappingURL=normalize-locale-path.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/remove-path-prefix.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "removePathPrefix": ()=>removePathPrefix
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
function removePathPrefix(path, prefix) {
    // If the path doesn't start with the prefix we can return it as is. This
    // protects us from situations where the prefix is a substring of the path
    // prefix such as:
    //
    // For prefix: /blog
    //
    //   /blog -> true
    //   /blog/ -> true
    //   /blog/1 -> true
    //   /blogging -> false
    //   /blogging/ -> false
    //   /blogging/1 -> false
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["pathHasPrefix"])(path, prefix)) {
        return path;
    }
    // Remove the prefix from the path via slicing.
    const withoutPrefix = path.slice(prefix.length);
    // If the path without the prefix starts with a `/` we can return it as is.
    if (withoutPrefix.startsWith('/')) {
        return withoutPrefix;
    }
    // If the path without the prefix doesn't start with a `/` we need to add it
    // back to the path to make sure it's a valid path.
    return "/" + withoutPrefix;
} //# sourceMappingURL=remove-path-prefix.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/get-next-pathname-info.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getNextPathnameInfo": ()=>getNextPathnameInfo
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$i18n$2f$normalize$2d$locale$2d$path$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/i18n/normalize-locale-path.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$path$2d$prefix$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/remove-path-prefix.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
function getNextPathnameInfo(pathname, options) {
    var _options_nextConfig;
    const { basePath, i18n, trailingSlash } = (_options_nextConfig = options.nextConfig) != null ? _options_nextConfig : {};
    const info = {
        pathname,
        trailingSlash: pathname !== '/' ? pathname.endsWith('/') : trailingSlash
    };
    if (basePath && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["pathHasPrefix"])(info.pathname, basePath)) {
        info.pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$path$2d$prefix$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["removePathPrefix"])(info.pathname, basePath);
        info.basePath = basePath;
    }
    let pathnameNoDataPrefix = info.pathname;
    if (info.pathname.startsWith('/_next/data/') && info.pathname.endsWith('.json')) {
        const paths = info.pathname.replace(/^\/_next\/data\//, '').replace(/\.json$/, '').split('/');
        const buildId = paths[0];
        info.buildId = buildId;
        pathnameNoDataPrefix = paths[1] !== 'index' ? "/" + paths.slice(1).join('/') : '/';
        // update pathname with normalized if enabled although
        // we use normalized to populate locale info still
        if (options.parseData === true) {
            info.pathname = pathnameNoDataPrefix;
        }
    }
    // If provided, use the locale route normalizer to detect the locale instead
    // of the function below.
    if (i18n) {
        let result = options.i18nProvider ? options.i18nProvider.analyze(info.pathname) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$i18n$2f$normalize$2d$locale$2d$path$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["normalizeLocalePath"])(info.pathname, i18n.locales);
        info.locale = result.detectedLocale;
        var _result_pathname;
        info.pathname = (_result_pathname = result.pathname) != null ? _result_pathname : info.pathname;
        if (!result.detectedLocale && info.buildId) {
            result = options.i18nProvider ? options.i18nProvider.analyze(pathnameNoDataPrefix) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$i18n$2f$normalize$2d$locale$2d$path$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["normalizeLocalePath"])(pathnameNoDataPrefix, i18n.locales);
            if (result.detectedLocale) {
                info.locale = result.detectedLocale;
            }
        }
    }
    return info;
} //# sourceMappingURL=get-next-pathname-info.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/next-url.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "NextURL": ()=>NextURL
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$i18n$2f$detect$2d$domain$2d$locale$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/i18n/detect-domain-locale.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$format$2d$next$2d$pathname$2d$info$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/format-next-pathname-info.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$get$2d$hostname$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/get-hostname.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$next$2d$pathname$2d$info$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/get-next-pathname-info.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
const REGEX_LOCALHOST_HOSTNAME = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
function parseURL(url, base) {
    return new URL(String(url).replace(REGEX_LOCALHOST_HOSTNAME, 'localhost'), base && String(base).replace(REGEX_LOCALHOST_HOSTNAME, 'localhost'));
}
const Internal = Symbol('NextURLInternal');
class NextURL {
    constructor(input, baseOrOpts, opts){
        let base;
        let options;
        if (typeof baseOrOpts === 'object' && 'pathname' in baseOrOpts || typeof baseOrOpts === 'string') {
            base = baseOrOpts;
            options = opts || {};
        } else {
            options = opts || baseOrOpts || {};
        }
        this[Internal] = {
            url: parseURL(input, base ?? options.base),
            options: options,
            basePath: ''
        };
        this.analyze();
    }
    analyze() {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig, _this_Internal_domainLocale, _this_Internal_options_nextConfig_i18n1, _this_Internal_options_nextConfig1;
        const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$next$2d$pathname$2d$info$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["getNextPathnameInfo"])(this[Internal].url.pathname, {
            nextConfig: this[Internal].options.nextConfig,
            parseData: !process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE,
            i18nProvider: this[Internal].options.i18nProvider
        });
        const hostname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$get$2d$hostname$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["getHostname"])(this[Internal].url, this[Internal].options.headers);
        this[Internal].domainLocale = this[Internal].options.i18nProvider ? this[Internal].options.i18nProvider.detectDomainLocale(hostname) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$i18n$2f$detect$2d$domain$2d$locale$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["detectDomainLocale"])((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.domains, hostname);
        const defaultLocale = ((_this_Internal_domainLocale = this[Internal].domainLocale) == null ? void 0 : _this_Internal_domainLocale.defaultLocale) || ((_this_Internal_options_nextConfig1 = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n1 = _this_Internal_options_nextConfig1.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n1.defaultLocale);
        this[Internal].url.pathname = info.pathname;
        this[Internal].defaultLocale = defaultLocale;
        this[Internal].basePath = info.basePath ?? '';
        this[Internal].buildId = info.buildId;
        this[Internal].locale = info.locale ?? defaultLocale;
        this[Internal].trailingSlash = info.trailingSlash;
    }
    formatPathname() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$format$2d$next$2d$pathname$2d$info$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["formatNextPathnameInfo"])({
            basePath: this[Internal].basePath,
            buildId: this[Internal].buildId,
            defaultLocale: !this[Internal].options.forceLocale ? this[Internal].defaultLocale : undefined,
            locale: this[Internal].locale,
            pathname: this[Internal].url.pathname,
            trailingSlash: this[Internal].trailingSlash
        });
    }
    formatSearch() {
        return this[Internal].url.search;
    }
    get buildId() {
        return this[Internal].buildId;
    }
    set buildId(buildId) {
        this[Internal].buildId = buildId;
    }
    get locale() {
        return this[Internal].locale ?? '';
    }
    set locale(locale) {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig;
        if (!this[Internal].locale || !((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.locales.includes(locale))) {
            throw new TypeError(`The NextURL configuration includes no locale "${locale}"`);
        }
        this[Internal].locale = locale;
    }
    get defaultLocale() {
        return this[Internal].defaultLocale;
    }
    get domainLocale() {
        return this[Internal].domainLocale;
    }
    get searchParams() {
        return this[Internal].url.searchParams;
    }
    get host() {
        return this[Internal].url.host;
    }
    set host(value) {
        this[Internal].url.host = value;
    }
    get hostname() {
        return this[Internal].url.hostname;
    }
    set hostname(value) {
        this[Internal].url.hostname = value;
    }
    get port() {
        return this[Internal].url.port;
    }
    set port(value) {
        this[Internal].url.port = value;
    }
    get protocol() {
        return this[Internal].url.protocol;
    }
    set protocol(value) {
        this[Internal].url.protocol = value;
    }
    get href() {
        const pathname = this.formatPathname();
        const search = this.formatSearch();
        return `${this.protocol}//${this.host}${pathname}${search}${this.hash}`;
    }
    set href(url) {
        this[Internal].url = parseURL(url);
        this.analyze();
    }
    get origin() {
        return this[Internal].url.origin;
    }
    get pathname() {
        return this[Internal].url.pathname;
    }
    set pathname(value) {
        this[Internal].url.pathname = value;
    }
    get hash() {
        return this[Internal].url.hash;
    }
    set hash(value) {
        this[Internal].url.hash = value;
    }
    get search() {
        return this[Internal].url.search;
    }
    set search(value) {
        this[Internal].url.search = value;
    }
    get password() {
        return this[Internal].url.password;
    }
    set password(value) {
        this[Internal].url.password = value;
    }
    get username() {
        return this[Internal].url.username;
    }
    set username(value) {
        this[Internal].url.username = value;
    }
    get basePath() {
        return this[Internal].basePath;
    }
    set basePath(value) {
        this[Internal].basePath = value.startsWith('/') ? value : `/${value}`;
    }
    toString() {
        return this.href;
    }
    toJSON() {
        return this.href;
    }
    [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
            href: this.href,
            origin: this.origin,
            protocol: this.protocol,
            username: this.username,
            password: this.password,
            host: this.host,
            hostname: this.hostname,
            port: this.port,
            pathname: this.pathname,
            search: this.search,
            searchParams: this.searchParams,
            hash: this.hash
        };
    }
    clone() {
        return new NextURL(String(this), this[Internal].options);
    }
} //# sourceMappingURL=next-url.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    RequestCookies: ()=>RequestCookies,
    ResponseCookies: ()=>ResponseCookies,
    parseCookie: ()=>parseCookie,
    parseSetCookie: ()=>parseSetCookie,
    stringifyCookie: ()=>stringifyCookie
});
module.exports = __toCommonJS(src_exports);
// src/serialize.ts
function stringifyCookie(c) {
    var _a;
    const attrs = [
        "path" in c && c.path && `Path=${c.path}`,
        "expires" in c && (c.expires || c.expires === 0) && `Expires=${(typeof c.expires === "number" ? new Date(c.expires) : c.expires).toUTCString()}`,
        "maxAge" in c && typeof c.maxAge === "number" && `Max-Age=${c.maxAge}`,
        "domain" in c && c.domain && `Domain=${c.domain}`,
        "secure" in c && c.secure && "Secure",
        "httpOnly" in c && c.httpOnly && "HttpOnly",
        "sameSite" in c && c.sameSite && `SameSite=${c.sameSite}`,
        "partitioned" in c && c.partitioned && "Partitioned",
        "priority" in c && c.priority && `Priority=${c.priority}`
    ].filter(Boolean);
    const stringified = `${c.name}=${encodeURIComponent((_a = c.value) != null ? _a : "")}`;
    return attrs.length === 0 ? stringified : `${stringified}; ${attrs.join("; ")}`;
}
function parseCookie(cookie) {
    const map = /* @__PURE__ */ new Map();
    for (const pair of cookie.split(/; */)){
        if (!pair) continue;
        const splitAt = pair.indexOf("=");
        if (splitAt === -1) {
            map.set(pair, "true");
            continue;
        }
        const [key, value] = [
            pair.slice(0, splitAt),
            pair.slice(splitAt + 1)
        ];
        try {
            map.set(key, decodeURIComponent(value != null ? value : "true"));
        } catch  {}
    }
    return map;
}
function parseSetCookie(setCookie) {
    if (!setCookie) {
        return void 0;
    }
    const [[name, value], ...attributes] = parseCookie(setCookie);
    const { domain, expires, httponly, maxage, path, samesite, secure, partitioned, priority } = Object.fromEntries(attributes.map(([key, value2])=>[
            key.toLowerCase(),
            value2
        ]));
    const cookie = {
        name,
        value: decodeURIComponent(value),
        domain,
        ...expires && {
            expires: new Date(expires)
        },
        ...httponly && {
            httpOnly: true
        },
        ...typeof maxage === "string" && {
            maxAge: Number(maxage)
        },
        path,
        ...samesite && {
            sameSite: parseSameSite(samesite)
        },
        ...secure && {
            secure: true
        },
        ...priority && {
            priority: parsePriority(priority)
        },
        ...partitioned && {
            partitioned: true
        }
    };
    return compact(cookie);
}
function compact(t) {
    const newT = {};
    for(const key in t){
        if (t[key]) {
            newT[key] = t[key];
        }
    }
    return newT;
}
var SAME_SITE = [
    "strict",
    "lax",
    "none"
];
function parseSameSite(string) {
    string = string.toLowerCase();
    return SAME_SITE.includes(string) ? string : void 0;
}
var PRIORITY = [
    "low",
    "medium",
    "high"
];
function parsePriority(string) {
    string = string.toLowerCase();
    return PRIORITY.includes(string) ? string : void 0;
}
function splitCookiesString(cookiesString) {
    if (!cookiesString) return [];
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    cookiesSeparatorFound = true;
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
// src/request-cookies.ts
var RequestCookies = class {
    constructor(requestHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        this._headers = requestHeaders;
        const header = requestHeaders.get("cookie");
        if (header) {
            const parsed = parseCookie(header);
            for (const [name, value] of parsed){
                this._parsed.set(name, {
                    name,
                    value
                });
            }
        }
    }
    [Symbol.iterator]() {
        return this._parsed[Symbol.iterator]();
    }
    /**
   * The amount of cookies received from the client
   */ get size() {
        return this._parsed.size;
    }
    get(...args) {
        const name = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(name);
    }
    getAll(...args) {
        var _a;
        const all = Array.from(this._parsed);
        if (!args.length) {
            return all.map(([_, value])=>value);
        }
        const name = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter(([n])=>n === name).map(([_, value])=>value);
    }
    has(name) {
        return this._parsed.has(name);
    }
    set(...args) {
        const [name, value] = args.length === 1 ? [
            args[0].name,
            args[0].value
        ] : args;
        const map = this._parsed;
        map.set(name, {
            name,
            value
        });
        this._headers.set("cookie", Array.from(map).map(([_, value2])=>stringifyCookie(value2)).join("; "));
        return this;
    }
    /**
   * Delete the cookies matching the passed name or names in the request.
   */ delete(names) {
        const map = this._parsed;
        const result = !Array.isArray(names) ? map.delete(names) : names.map((name)=>map.delete(name));
        this._headers.set("cookie", Array.from(map).map(([_, value])=>stringifyCookie(value)).join("; "));
        return result;
    }
    /**
   * Delete all the cookies in the cookies in the request.
   */ clear() {
        this.delete(Array.from(this._parsed.keys()));
        return this;
    }
    /**
   * Format the cookies in the request as a string for logging
   */ [Symbol.for("edge-runtime.inspect.custom")]() {
        return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map((v)=>`${v.name}=${encodeURIComponent(v.value)}`).join("; ");
    }
};
// src/response-cookies.ts
var ResponseCookies = class {
    constructor(responseHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        var _a, _b, _c;
        this._headers = responseHeaders;
        const setCookie = (_c = (_b = (_a = responseHeaders.getSetCookie) == null ? void 0 : _a.call(responseHeaders)) != null ? _b : responseHeaders.get("set-cookie")) != null ? _c : [];
        const cookieStrings = Array.isArray(setCookie) ? setCookie : splitCookiesString(setCookie);
        for (const cookieString of cookieStrings){
            const parsed = parseSetCookie(cookieString);
            if (parsed) this._parsed.set(parsed.name, parsed);
        }
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
   */ get(...args) {
        const key = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(key);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
   */ getAll(...args) {
        var _a;
        const all = Array.from(this._parsed.values());
        if (!args.length) {
            return all;
        }
        const key = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter((c)=>c.name === key);
    }
    has(name) {
        return this._parsed.has(name);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
   */ set(...args) {
        const [name, value, cookie] = args.length === 1 ? [
            args[0].name,
            args[0].value,
            args[0]
        ] : args;
        const map = this._parsed;
        map.set(name, normalizeCookie({
            name,
            value,
            ...cookie
        }));
        replace(map, this._headers);
        return this;
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
   */ delete(...args) {
        const [name, path, domain] = typeof args[0] === "string" ? [
            args[0]
        ] : [
            args[0].name,
            args[0].path,
            args[0].domain
        ];
        return this.set({
            name,
            path,
            domain,
            value: "",
            expires: /* @__PURE__ */ new Date(0)
        });
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map(stringifyCookie).join("; ");
    }
};
function replace(bag, headers) {
    headers.delete("set-cookie");
    for (const [, value] of bag){
        const serialized = stringifyCookie(value);
        headers.append("set-cookie", serialized);
    }
}
function normalizeCookie(cookie = {
    name: "",
    value: ""
}) {
    if (typeof cookie.expires === "number") {
        cookie.expires = new Date(cookie.expires);
    }
    if (cookie.maxAge) {
        cookie.expires = new Date(Date.now() + cookie.maxAge * 1e3);
    }
    if (cookie.path === null || cookie.path === void 0) {
        cookie.path = "/";
    }
    return cookie;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    RequestCookies,
    ResponseCookies,
    parseCookie,
    parseSetCookie,
    stringifyCookie
});

}.call(this) }),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
;
 //# sourceMappingURL=cookies.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/request.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "INTERNALS": ()=>INTERNALS,
    "NextRequest": ()=>NextRequest
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/next-url.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/error.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
const INTERNALS = Symbol('internal request');
class NextRequest extends Request {
    constructor(input, init = {}){
        const url = typeof input !== 'string' && 'url' in input ? input.url : String(input);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["validateURL"])(url);
        if (input instanceof Request) super(input, init);
        else super(url, init);
        const nextUrl = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextURL"](url, {
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["toNodeOutgoingHttpHeaders"])(this.headers),
            nextConfig: init.nextConfig
        });
        this[INTERNALS] = {
            cookies: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["RequestCookies"](this.headers),
            geo: init.geo || {},
            ip: init.ip,
            nextUrl,
            url: process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE ? url : nextUrl.toString()
        };
    }
    [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
            cookies: this.cookies,
            geo: this.geo,
            ip: this.ip,
            nextUrl: this.nextUrl,
            url: this.url,
            // rest of props come from Request
            bodyUsed: this.bodyUsed,
            cache: this.cache,
            credentials: this.credentials,
            destination: this.destination,
            headers: Object.fromEntries(this.headers),
            integrity: this.integrity,
            keepalive: this.keepalive,
            method: this.method,
            mode: this.mode,
            redirect: this.redirect,
            referrer: this.referrer,
            referrerPolicy: this.referrerPolicy,
            signal: this.signal
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    get geo() {
        return this[INTERNALS].geo;
    }
    get ip() {
        return this[INTERNALS].ip;
    }
    get nextUrl() {
        return this[INTERNALS].nextUrl;
    }
    /**
   * @deprecated
   * `page` has been deprecated in favour of `URLPattern`.
   * Read more: https://nextjs.org/docs/messages/middleware-request-page
   */ get page() {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["RemovedPageError"]();
    }
    /**
   * @deprecated
   * `ua` has been removed in favour of \`userAgent\` function.
   * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
   */ get ua() {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["RemovedUAError"]();
    }
    get url() {
        return this[INTERNALS].url;
    }
} //# sourceMappingURL=request.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ReflectAdapter": ()=>ReflectAdapter
});
class ReflectAdapter {
    static get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === 'function') {
            return value.bind(target);
        }
        return value;
    }
    static set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
    }
    static has(target, prop) {
        return Reflect.has(target, prop);
    }
    static deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
    }
} //# sourceMappingURL=reflect.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "NextResponse": ()=>NextResponse
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/next-url.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
const INTERNALS = Symbol('internal response');
const REDIRECTS = new Set([
    301,
    302,
    303,
    307,
    308
]);
function handleMiddlewareField(init, headers) {
    var _init_request;
    if (init == null ? void 0 : (_init_request = init.request) == null ? void 0 : _init_request.headers) {
        if (!(init.request.headers instanceof Headers)) {
            throw new Error('request.headers must be an instance of Headers');
        }
        const keys = [];
        for (const [key, value] of init.request.headers){
            headers.set('x-middleware-request-' + key, value);
            keys.push(key);
        }
        headers.set('x-middleware-override-headers', keys.join(','));
    }
}
class NextResponse extends Response {
    constructor(body, init = {}){
        super(body, init);
        const headers = this.headers;
        const cookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ResponseCookies"](headers);
        const cookiesProxy = new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'delete':
                    case 'set':
                        {
                            return (...args)=>{
                                const result = Reflect.apply(target[prop], target, args);
                                const newHeaders = new Headers(headers);
                                if (result instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ResponseCookies"]) {
                                    headers.set('x-middleware-set-cookie', result.getAll().map((cookie)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["stringifyCookie"])(cookie)).join(','));
                                }
                                handleMiddlewareField(init, newHeaders);
                                return result;
                            };
                        }
                    default:
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                }
            }
        });
        this[INTERNALS] = {
            cookies: cookiesProxy,
            url: init.url ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextURL"](init.url, {
                headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["toNodeOutgoingHttpHeaders"])(headers),
                nextConfig: init.nextConfig
            }) : undefined
        };
    }
    [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
            cookies: this.cookies,
            url: this.url,
            // rest of props come from Response
            body: this.body,
            bodyUsed: this.bodyUsed,
            headers: Object.fromEntries(this.headers),
            ok: this.ok,
            redirected: this.redirected,
            status: this.status,
            statusText: this.statusText,
            type: this.type
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    static json(body, init) {
        const response = Response.json(body, init);
        return new NextResponse(response.body, response);
    }
    static redirect(url, init) {
        const status = typeof init === 'number' ? init : (init == null ? void 0 : init.status) ?? 307;
        if (!REDIRECTS.has(status)) {
            throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        const initObj = typeof init === 'object' ? init : {};
        const headers = new Headers(initObj == null ? void 0 : initObj.headers);
        headers.set('Location', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["validateURL"])(url));
        return new NextResponse(null, {
            ...initObj,
            headers,
            status
        });
    }
    static rewrite(destination, init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set('x-middleware-rewrite', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["validateURL"])(destination));
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
    static next(init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set('x-middleware-next', '1');
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
} //# sourceMappingURL=response.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/relativize-url.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * Given a URL as a string and a base URL it will make the URL relative
 * if the parsed protocol and host is the same as the one in the base
 * URL. Otherwise it returns the same URL string.
 */ __turbopack_esm__({
    "relativizeURL": ()=>relativizeURL
});
function relativizeURL(url, base) {
    const baseURL = typeof base === 'string' ? new URL(base) : base;
    const relative = new URL(url, base);
    const origin = baseURL.protocol + "//" + baseURL.host;
    return relative.protocol + "//" + relative.host === origin ? relative.toString().replace(origin, '') : relative.toString();
} //# sourceMappingURL=relativize-url.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/app-router-headers.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ACTION": ()=>ACTION,
    "FLIGHT_PARAMETERS": ()=>FLIGHT_PARAMETERS,
    "NEXT_DID_POSTPONE_HEADER": ()=>NEXT_DID_POSTPONE_HEADER,
    "NEXT_ROUTER_PREFETCH_HEADER": ()=>NEXT_ROUTER_PREFETCH_HEADER,
    "NEXT_ROUTER_STATE_TREE": ()=>NEXT_ROUTER_STATE_TREE,
    "NEXT_RSC_UNION_QUERY": ()=>NEXT_RSC_UNION_QUERY,
    "NEXT_URL": ()=>NEXT_URL,
    "RSC_CONTENT_TYPE_HEADER": ()=>RSC_CONTENT_TYPE_HEADER,
    "RSC_HEADER": ()=>RSC_HEADER
});
const RSC_HEADER = 'RSC';
const ACTION = 'Next-Action';
const NEXT_ROUTER_STATE_TREE = 'Next-Router-State-Tree';
const NEXT_ROUTER_PREFETCH_HEADER = 'Next-Router-Prefetch';
const NEXT_URL = 'Next-Url';
const RSC_CONTENT_TYPE_HEADER = 'text/x-component';
const FLIGHT_PARAMETERS = [
    [
        RSC_HEADER
    ],
    [
        NEXT_ROUTER_STATE_TREE
    ],
    [
        NEXT_ROUTER_PREFETCH_HEADER
    ]
];
const NEXT_RSC_UNION_QUERY = '_rsc';
const NEXT_DID_POSTPONE_HEADER = 'x-nextjs-postponed'; //# sourceMappingURL=app-router-headers.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/modern-browserslist-target.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

// Note: This file is JS because it's used by the taskfile-swc.js file, which is JS.
// Keep file changes in sync with the corresponding `.d.ts` files.
/**
 * These are the browser versions that support all of the following:
 * static import: https://caniuse.com/es6-module
 * dynamic import: https://caniuse.com/es6-module-dynamic-import
 * import.meta: https://caniuse.com/mdn-javascript_operators_import_meta
 */ const MODERN_BROWSERSLIST_TARGET = [
    'chrome 64',
    'edge 79',
    'firefox 67',
    'opera 51',
    'safari 12'
];
module.exports = MODERN_BROWSERSLIST_TARGET; //# sourceMappingURL=modern-browserslist-target.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/constants.js [middleware] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "APP_BUILD_MANIFEST": ()=>APP_BUILD_MANIFEST,
    "APP_CLIENT_INTERNALS": ()=>APP_CLIENT_INTERNALS,
    "APP_PATHS_MANIFEST": ()=>APP_PATHS_MANIFEST,
    "APP_PATH_ROUTES_MANIFEST": ()=>APP_PATH_ROUTES_MANIFEST,
    "AUTOMATIC_FONT_OPTIMIZATION_MANIFEST": ()=>AUTOMATIC_FONT_OPTIMIZATION_MANIFEST,
    "BARREL_OPTIMIZATION_PREFIX": ()=>BARREL_OPTIMIZATION_PREFIX,
    "BLOCKED_PAGES": ()=>BLOCKED_PAGES,
    "BUILD_ID_FILE": ()=>BUILD_ID_FILE,
    "BUILD_MANIFEST": ()=>BUILD_MANIFEST,
    "CLIENT_PUBLIC_FILES_PATH": ()=>CLIENT_PUBLIC_FILES_PATH,
    "CLIENT_REFERENCE_MANIFEST": ()=>CLIENT_REFERENCE_MANIFEST,
    "CLIENT_STATIC_FILES_PATH": ()=>CLIENT_STATIC_FILES_PATH,
    "CLIENT_STATIC_FILES_RUNTIME_AMP": ()=>CLIENT_STATIC_FILES_RUNTIME_AMP,
    "CLIENT_STATIC_FILES_RUNTIME_MAIN": ()=>CLIENT_STATIC_FILES_RUNTIME_MAIN,
    "CLIENT_STATIC_FILES_RUNTIME_MAIN_APP": ()=>CLIENT_STATIC_FILES_RUNTIME_MAIN_APP,
    "CLIENT_STATIC_FILES_RUNTIME_POLYFILLS": ()=>CLIENT_STATIC_FILES_RUNTIME_POLYFILLS,
    "CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL": ()=>CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL,
    "CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH": ()=>CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH,
    "CLIENT_STATIC_FILES_RUNTIME_WEBPACK": ()=>CLIENT_STATIC_FILES_RUNTIME_WEBPACK,
    "COMPILER_INDEXES": ()=>COMPILER_INDEXES,
    "COMPILER_NAMES": ()=>COMPILER_NAMES,
    "CONFIG_FILES": ()=>CONFIG_FILES,
    "DEFAULT_RUNTIME_WEBPACK": ()=>DEFAULT_RUNTIME_WEBPACK,
    "DEFAULT_SANS_SERIF_FONT": ()=>DEFAULT_SANS_SERIF_FONT,
    "DEFAULT_SERIF_FONT": ()=>DEFAULT_SERIF_FONT,
    "DEV_CLIENT_PAGES_MANIFEST": ()=>DEV_CLIENT_PAGES_MANIFEST,
    "DEV_MIDDLEWARE_MANIFEST": ()=>DEV_MIDDLEWARE_MANIFEST,
    "EDGE_RUNTIME_WEBPACK": ()=>EDGE_RUNTIME_WEBPACK,
    "EDGE_UNSUPPORTED_NODE_APIS": ()=>EDGE_UNSUPPORTED_NODE_APIS,
    "EXPORT_DETAIL": ()=>EXPORT_DETAIL,
    "EXPORT_MARKER": ()=>EXPORT_MARKER,
    "FUNCTIONS_CONFIG_MANIFEST": ()=>FUNCTIONS_CONFIG_MANIFEST,
    "GOOGLE_FONT_PROVIDER": ()=>GOOGLE_FONT_PROVIDER,
    "IMAGES_MANIFEST": ()=>IMAGES_MANIFEST,
    "INTERCEPTION_ROUTE_REWRITE_MANIFEST": ()=>INTERCEPTION_ROUTE_REWRITE_MANIFEST,
    "INTERNAL_HEADERS": ()=>INTERNAL_HEADERS,
    "MIDDLEWARE_BUILD_MANIFEST": ()=>MIDDLEWARE_BUILD_MANIFEST,
    "MIDDLEWARE_MANIFEST": ()=>MIDDLEWARE_MANIFEST,
    "MIDDLEWARE_REACT_LOADABLE_MANIFEST": ()=>MIDDLEWARE_REACT_LOADABLE_MANIFEST,
    "NEXT_BUILTIN_DOCUMENT": ()=>NEXT_BUILTIN_DOCUMENT,
    "NEXT_FONT_MANIFEST": ()=>NEXT_FONT_MANIFEST,
    "OPTIMIZED_FONT_PROVIDERS": ()=>OPTIMIZED_FONT_PROVIDERS,
    "PAGES_MANIFEST": ()=>PAGES_MANIFEST,
    "PHASE_DEVELOPMENT_SERVER": ()=>PHASE_DEVELOPMENT_SERVER,
    "PHASE_EXPORT": ()=>PHASE_EXPORT,
    "PHASE_INFO": ()=>PHASE_INFO,
    "PHASE_PRODUCTION_BUILD": ()=>PHASE_PRODUCTION_BUILD,
    "PHASE_PRODUCTION_SERVER": ()=>PHASE_PRODUCTION_SERVER,
    "PHASE_TEST": ()=>PHASE_TEST,
    "PRERENDER_MANIFEST": ()=>PRERENDER_MANIFEST,
    "REACT_LOADABLE_MANIFEST": ()=>REACT_LOADABLE_MANIFEST,
    "ROUTES_MANIFEST": ()=>ROUTES_MANIFEST,
    "RSC_MODULE_TYPES": ()=>RSC_MODULE_TYPES,
    "SERVER_DIRECTORY": ()=>SERVER_DIRECTORY,
    "SERVER_FILES_MANIFEST": ()=>SERVER_FILES_MANIFEST,
    "SERVER_PROPS_ID": ()=>SERVER_PROPS_ID,
    "SERVER_REFERENCE_MANIFEST": ()=>SERVER_REFERENCE_MANIFEST,
    "STATIC_PROPS_ID": ()=>STATIC_PROPS_ID,
    "STATIC_STATUS_PAGES": ()=>STATIC_STATUS_PAGES,
    "STRING_LITERAL_DROP_BUNDLE": ()=>STRING_LITERAL_DROP_BUNDLE,
    "SUBRESOURCE_INTEGRITY_MANIFEST": ()=>SUBRESOURCE_INTEGRITY_MANIFEST,
    "SYSTEM_ENTRYPOINTS": ()=>SYSTEM_ENTRYPOINTS,
    "TRACE_OUTPUT_VERSION": ()=>TRACE_OUTPUT_VERSION,
    "TURBO_TRACE_DEFAULT_MEMORY_LIMIT": ()=>TURBO_TRACE_DEFAULT_MEMORY_LIMIT,
    "UNDERSCORE_NOT_FOUND_ROUTE": ()=>UNDERSCORE_NOT_FOUND_ROUTE,
    "UNDERSCORE_NOT_FOUND_ROUTE_ENTRY": ()=>UNDERSCORE_NOT_FOUND_ROUTE_ENTRY
});
;
;
const COMPILER_NAMES = {
    client: 'client',
    server: 'server',
    edgeServer: 'edge-server'
};
const INTERNAL_HEADERS = [
    'x-invoke-error',
    'x-invoke-output',
    'x-invoke-path',
    'x-invoke-query',
    'x-invoke-status',
    'x-middleware-invoke'
];
const COMPILER_INDEXES = {
    [COMPILER_NAMES.client]: 0,
    [COMPILER_NAMES.server]: 1,
    [COMPILER_NAMES.edgeServer]: 2
};
const UNDERSCORE_NOT_FOUND_ROUTE = '/_not-found';
const UNDERSCORE_NOT_FOUND_ROUTE_ENTRY = "" + UNDERSCORE_NOT_FOUND_ROUTE + "/page";
const PHASE_EXPORT = 'phase-export';
const PHASE_PRODUCTION_BUILD = 'phase-production-build';
const PHASE_PRODUCTION_SERVER = 'phase-production-server';
const PHASE_DEVELOPMENT_SERVER = 'phase-development-server';
const PHASE_TEST = 'phase-test';
const PHASE_INFO = 'phase-info';
const PAGES_MANIFEST = 'pages-manifest.json';
const APP_PATHS_MANIFEST = 'app-paths-manifest.json';
const APP_PATH_ROUTES_MANIFEST = 'app-path-routes-manifest.json';
const BUILD_MANIFEST = 'build-manifest.json';
const APP_BUILD_MANIFEST = 'app-build-manifest.json';
const FUNCTIONS_CONFIG_MANIFEST = 'functions-config-manifest.json';
const SUBRESOURCE_INTEGRITY_MANIFEST = 'subresource-integrity-manifest';
const NEXT_FONT_MANIFEST = 'next-font-manifest';
const EXPORT_MARKER = 'export-marker.json';
const EXPORT_DETAIL = 'export-detail.json';
const PRERENDER_MANIFEST = 'prerender-manifest.json';
const ROUTES_MANIFEST = 'routes-manifest.json';
const IMAGES_MANIFEST = 'images-manifest.json';
const SERVER_FILES_MANIFEST = 'required-server-files.json';
const DEV_CLIENT_PAGES_MANIFEST = '_devPagesManifest.json';
const MIDDLEWARE_MANIFEST = 'middleware-manifest.json';
const DEV_MIDDLEWARE_MANIFEST = '_devMiddlewareManifest.json';
const REACT_LOADABLE_MANIFEST = 'react-loadable-manifest.json';
const AUTOMATIC_FONT_OPTIMIZATION_MANIFEST = 'font-manifest.json';
const SERVER_DIRECTORY = 'server';
const CONFIG_FILES = [
    'next.config.js',
    'next.config.mjs'
];
const BUILD_ID_FILE = 'BUILD_ID';
const BLOCKED_PAGES = [
    '/_document',
    '/_app',
    '/_error'
];
const CLIENT_PUBLIC_FILES_PATH = 'public';
const CLIENT_STATIC_FILES_PATH = 'static';
const STRING_LITERAL_DROP_BUNDLE = '__NEXT_DROP_CLIENT_FILE__';
const NEXT_BUILTIN_DOCUMENT = '__NEXT_BUILTIN_DOCUMENT__';
const BARREL_OPTIMIZATION_PREFIX = '__barrel_optimize__';
const CLIENT_REFERENCE_MANIFEST = 'client-reference-manifest';
const SERVER_REFERENCE_MANIFEST = 'server-reference-manifest';
const MIDDLEWARE_BUILD_MANIFEST = 'middleware-build-manifest';
const MIDDLEWARE_REACT_LOADABLE_MANIFEST = 'middleware-react-loadable-manifest';
const INTERCEPTION_ROUTE_REWRITE_MANIFEST = 'interception-route-rewrite-manifest';
const CLIENT_STATIC_FILES_RUNTIME_MAIN = "main";
const CLIENT_STATIC_FILES_RUNTIME_MAIN_APP = "" + CLIENT_STATIC_FILES_RUNTIME_MAIN + "-app";
const APP_CLIENT_INTERNALS = 'app-pages-internals';
const CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH = "react-refresh";
const CLIENT_STATIC_FILES_RUNTIME_AMP = "amp";
const CLIENT_STATIC_FILES_RUNTIME_WEBPACK = "webpack";
const CLIENT_STATIC_FILES_RUNTIME_POLYFILLS = 'polyfills';
const CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL = Symbol(CLIENT_STATIC_FILES_RUNTIME_POLYFILLS);
const DEFAULT_RUNTIME_WEBPACK = 'webpack-runtime';
const EDGE_RUNTIME_WEBPACK = 'edge-runtime-webpack';
const STATIC_PROPS_ID = '__N_SSG';
const SERVER_PROPS_ID = '__N_SSP';
const GOOGLE_FONT_PROVIDER = 'https://fonts.googleapis.com/';
const OPTIMIZED_FONT_PROVIDERS = [
    {
        url: GOOGLE_FONT_PROVIDER,
        preconnect: 'https://fonts.gstatic.com'
    },
    {
        url: 'https://use.typekit.net',
        preconnect: 'https://use.typekit.net'
    }
];
const DEFAULT_SERIF_FONT = {
    name: 'Times New Roman',
    xAvgCharWidth: 821,
    azAvgWidth: 854.3953488372093,
    unitsPerEm: 2048
};
const DEFAULT_SANS_SERIF_FONT = {
    name: 'Arial',
    xAvgCharWidth: 904,
    azAvgWidth: 934.5116279069767,
    unitsPerEm: 2048
};
const STATIC_STATUS_PAGES = [
    '/500'
];
const TRACE_OUTPUT_VERSION = 1;
const TURBO_TRACE_DEFAULT_MEMORY_LIMIT = 6000;
const RSC_MODULE_TYPES = {
    client: 'client',
    server: 'server'
};
const EDGE_UNSUPPORTED_NODE_APIS = [
    'clearImmediate',
    'setImmediate',
    'BroadcastChannel',
    'ByteLengthQueuingStrategy',
    'CompressionStream',
    'CountQueuingStrategy',
    'DecompressionStream',
    'DomException',
    'MessageChannel',
    'MessageEvent',
    'MessagePort',
    'ReadableByteStreamController',
    'ReadableStreamBYOBRequest',
    'ReadableStreamDefaultController',
    'TransformStreamDefaultController',
    'WritableStreamDefaultController'
];
const SYSTEM_ENTRYPOINTS = new Set([
    CLIENT_STATIC_FILES_RUNTIME_MAIN,
    CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH,
    CLIENT_STATIC_FILES_RUNTIME_AMP,
    CLIENT_STATIC_FILES_RUNTIME_MAIN_APP
]); //# sourceMappingURL=constants.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/constants.js [middleware] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$modern$2d$browserslist$2d$target$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/modern-browserslist-target.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$constants$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/constants.js [middleware] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/internal-utils.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "stripInternalHeaders": ()=>stripInternalHeaders,
    "stripInternalQueries": ()=>stripInternalQueries,
    "stripInternalSearchParams": ()=>stripInternalSearchParams
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/app-router-headers.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$constants$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/constants.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$constants$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/constants.js [middleware] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const INTERNAL_QUERY_NAMES = [
    '__nextFallback',
    '__nextLocale',
    '__nextInferredLocaleFromDefault',
    '__nextDefaultLocale',
    '__nextIsNotFound',
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NEXT_RSC_UNION_QUERY"]
];
const EDGE_EXTENDED_INTERNAL_QUERY_NAMES = [
    '__nextDataReq'
];
function stripInternalQueries(query) {
    for (const name of INTERNAL_QUERY_NAMES){
        delete query[name];
    }
}
function stripInternalSearchParams(url, isEdge) {
    const isStringUrl = typeof url === 'string';
    const instance = isStringUrl ? new URL(url) : url;
    for (const name of INTERNAL_QUERY_NAMES){
        instance.searchParams.delete(name);
    }
    if (isEdge) {
        for (const name of EDGE_EXTENDED_INTERNAL_QUERY_NAMES){
            instance.searchParams.delete(name);
        }
    }
    return isStringUrl ? instance.toString() : instance;
}
function stripInternalHeaders(headers) {
    for (const key of __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$constants$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["INTERNAL_HEADERS"]){
        delete headers[key];
    }
} //# sourceMappingURL=internal-utils.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/page-path/ensure-leading-slash.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * For a given page path, this function ensures that there is a leading slash.
 * If there is not a leading slash, one is added, otherwise it is noop.
 */ __turbopack_esm__({
    "ensureLeadingSlash": ()=>ensureLeadingSlash
});
function ensureLeadingSlash(path) {
    return path.startsWith('/') ? path : "/" + path;
} //# sourceMappingURL=ensure-leading-slash.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/segment.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "DEFAULT_SEGMENT_KEY": ()=>DEFAULT_SEGMENT_KEY,
    "PAGE_SEGMENT_KEY": ()=>PAGE_SEGMENT_KEY,
    "isGroupSegment": ()=>isGroupSegment
});
function isGroupSegment(segment) {
    // Use array[0] for performant purpose
    return segment[0] === '(' && segment.endsWith(')');
}
const PAGE_SEGMENT_KEY = '__PAGE__';
const DEFAULT_SEGMENT_KEY = '__DEFAULT__'; //# sourceMappingURL=segment.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "normalizeAppPath": ()=>normalizeAppPath,
    "normalizeRscURL": ()=>normalizeRscURL
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$page$2d$path$2f$ensure$2d$leading$2d$slash$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/page-path/ensure-leading-slash.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$segment$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/segment.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function normalizeAppPath(route) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$page$2d$path$2f$ensure$2d$leading$2d$slash$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ensureLeadingSlash"])(route.split('/').reduce((pathname, segment, index, segments)=>{
        // Empty segments are ignored.
        if (!segment) {
            return pathname;
        }
        // Groups are ignored.
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$segment$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isGroupSegment"])(segment)) {
            return pathname;
        }
        // Parallel segments are ignored.
        if (segment[0] === '@') {
            return pathname;
        }
        // The last segment (if it's a leaf) should be ignored.
        if ((segment === 'page' || segment === 'route') && index === segments.length - 1) {
            return pathname;
        }
        return pathname + "/" + segment;
    }, ''));
}
function normalizeRscURL(url) {
    return url.replace(/\.rsc($|\?)/, '$1');
} //# sourceMappingURL=app-paths.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "HeadersAdapter": ()=>HeadersAdapter,
    "ReadonlyHeadersError": ()=>ReadonlyHeadersError
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
class ReadonlyHeadersError extends Error {
    constructor(){
        super('Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers');
    }
    static callable() {
        throw new ReadonlyHeadersError();
    }
}
class HeadersAdapter extends Headers {
    constructor(headers){
        // We've already overridden the methods that would be called, so we're just
        // calling the super constructor to ensure that the instanceof check works.
        super();
        this.headers = new Proxy(headers, {
            get (target, prop, receiver) {
                // Because this is just an object, we expect that all "get" operations
                // are for properties. If it's a "get" for a symbol, we'll just return
                // the symbol.
                if (typeof prop === 'symbol') {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return undefined.
                if (typeof original === 'undefined') return;
                // If the original casing exists, return the value.
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, original, receiver);
            },
            set (target, prop, value, receiver) {
                if (typeof prop === 'symbol') {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ReflectAdapter"].set(target, prop, value, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, use the prop as the key.
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ReflectAdapter"].set(target, original ?? prop, value, receiver);
            },
            has (target, prop) {
                if (typeof prop === 'symbol') return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ReflectAdapter"].has(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return false.
                if (typeof original === 'undefined') return false;
                // If the original casing exists, return true.
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ReflectAdapter"].has(target, original);
            },
            deleteProperty (target, prop) {
                if (typeof prop === 'symbol') return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ReflectAdapter"].deleteProperty(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return true.
                if (typeof original === 'undefined') return true;
                // If the original casing exists, delete the property.
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ReflectAdapter"].deleteProperty(target, original);
            }
        });
    }
    /**
   * Seals a Headers instance to prevent modification by throwing an error when
   * any mutating method is called.
   */ static seal(headers) {
        return new Proxy(headers, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'append':
                    case 'delete':
                    case 'set':
                        return ReadonlyHeadersError.callable;
                    default:
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                }
            }
        });
    }
    /**
   * Merges a header value into a string. This stores multiple values as an
   * array, so we need to merge them into a string.
   *
   * @param value a header value
   * @returns a merged header value (a string)
   */ merge(value) {
        if (Array.isArray(value)) return value.join(', ');
        return value;
    }
    /**
   * Creates a Headers instance from a plain object or a Headers instance.
   *
   * @param headers a plain object or a Headers instance
   * @returns a headers instance
   */ static from(headers) {
        if (headers instanceof Headers) return headers;
        return new HeadersAdapter(headers);
    }
    append(name, value) {
        const existing = this.headers[name];
        if (typeof existing === 'string') {
            this.headers[name] = [
                existing,
                value
            ];
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            this.headers[name] = value;
        }
    }
    delete(name) {
        delete this.headers[name];
    }
    get(name) {
        const value = this.headers[name];
        if (typeof value !== 'undefined') return this.merge(value);
        return null;
    }
    has(name) {
        return typeof this.headers[name] !== 'undefined';
    }
    set(name, value) {
        this.headers[name] = value;
    }
    forEach(callbackfn, thisArg) {
        for (const [name, value] of this.entries()){
            callbackfn.call(thisArg, value, name, this);
        }
    }
    *entries() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(name);
            yield [
                name,
                value
            ];
        }
    }
    *keys() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            yield name;
        }
    }
    *values() {
        for (const key of Object.keys(this.headers)){
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(key);
            yield value;
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
} //# sourceMappingURL=headers.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/async-local-storage.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "createAsyncLocalStorage": ()=>createAsyncLocalStorage
});
const sharedAsyncLocalStorageNotAvailableError = new Error('Invariant: AsyncLocalStorage accessed in runtime where it is not available');
class FakeAsyncLocalStorage {
    disable() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    getStore() {
        // This fake implementation of AsyncLocalStorage always returns `undefined`.
        return undefined;
    }
    run() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    exit() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    enterWith() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
}
const maybeGlobalAsyncLocalStorage = globalThis.AsyncLocalStorage;
function createAsyncLocalStorage() {
    if (maybeGlobalAsyncLocalStorage) {
        return new maybeGlobalAsyncLocalStorage();
    }
    return new FakeAsyncLocalStorage();
} //# sourceMappingURL=async-local-storage.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/static-generation-async-storage-instance.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "staticGenerationAsyncStorage": ()=>staticGenerationAsyncStorage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/async-local-storage.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const staticGenerationAsyncStorage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createAsyncLocalStorage"])(); //# sourceMappingURL=static-generation-async-storage-instance.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/static-generation-async-storage.external.js [middleware] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Share the instance module in the next-shared layer
__turbopack_esm__({});
;
;
 //# sourceMappingURL=static-generation-async-storage.external.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/static-generation-async-storage.external.js [middleware] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/static-generation-async-storage-instance.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/static-generation-async-storage.external.js [middleware] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/adapters/request-cookies.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "MutableRequestCookiesAdapter": ()=>MutableRequestCookiesAdapter,
    "ReadonlyRequestCookiesError": ()=>ReadonlyRequestCookiesError,
    "RequestCookiesAdapter": ()=>RequestCookiesAdapter,
    "appendMutableCookies": ()=>appendMutableCookies,
    "getModifiedCookieValues": ()=>getModifiedCookieValues
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/static-generation-async-storage.external.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/static-generation-async-storage-instance.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
class ReadonlyRequestCookiesError extends Error {
    constructor(){
        super('Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options');
    }
    static callable() {
        throw new ReadonlyRequestCookiesError();
    }
}
class RequestCookiesAdapter {
    static seal(cookies) {
        return new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'clear':
                    case 'delete':
                    case 'set':
                        return ReadonlyRequestCookiesError.callable;
                    default:
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                }
            }
        });
    }
}
const SYMBOL_MODIFY_COOKIE_VALUES = Symbol.for('next.mutated.cookies');
function getModifiedCookieValues(cookies) {
    const modified = cookies[SYMBOL_MODIFY_COOKIE_VALUES];
    if (!modified || !Array.isArray(modified) || modified.length === 0) {
        return [];
    }
    return modified;
}
function appendMutableCookies(headers, mutableCookies) {
    const modifiedCookieValues = getModifiedCookieValues(mutableCookies);
    if (modifiedCookieValues.length === 0) {
        return false;
    }
    // Return a new response that extends the response with
    // the modified cookies as fallbacks. `res` cookies
    // will still take precedence.
    const resCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ResponseCookies"](headers);
    const returnedCookies = resCookies.getAll();
    // Set the modified cookies as fallbacks.
    for (const cookie of modifiedCookieValues){
        resCookies.set(cookie);
    }
    // Set the original cookies as the final values.
    for (const cookie of returnedCookies){
        resCookies.set(cookie);
    }
    return true;
}
class MutableRequestCookiesAdapter {
    static wrap(cookies, onUpdateCookies) {
        const responseCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ResponseCookies"](new Headers());
        for (const cookie of cookies.getAll()){
            responseCookies.set(cookie);
        }
        let modifiedValues = [];
        const modifiedCookies = new Set();
        const updateResponseCookies = ()=>{
            // TODO-APP: change method of getting staticGenerationAsyncStore
            const staticGenerationAsyncStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["staticGenerationAsyncStorage"].getStore();
            if (staticGenerationAsyncStore) {
                staticGenerationAsyncStore.pathWasRevalidated = true;
            }
            const allCookies = responseCookies.getAll();
            modifiedValues = allCookies.filter((c)=>modifiedCookies.has(c.name));
            if (onUpdateCookies) {
                const serializedCookies = [];
                for (const cookie of modifiedValues){
                    const tempCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ResponseCookies"](new Headers());
                    tempCookies.set(cookie);
                    serializedCookies.push(tempCookies.toString());
                }
                onUpdateCookies(serializedCookies);
            }
        };
        return new Proxy(responseCookies, {
            get (target, prop, receiver) {
                switch(prop){
                    // A special symbol to get the modified cookie values
                    case SYMBOL_MODIFY_COOKIE_VALUES:
                        return modifiedValues;
                    // TODO: Throw error if trying to set a cookie after the response
                    // headers have been set.
                    case 'delete':
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === 'string' ? args[0] : args[0].name);
                            try {
                                target.delete(...args);
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    case 'set':
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === 'string' ? args[0] : args[0].name);
                            try {
                                return target.set(...args);
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    default:
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                }
            }
        });
    }
} //# sourceMappingURL=request-cookies.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/lib/trace/constants.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * Contains predefined constants for the trace span name in next/server.
 *
 * Currently, next/server/tracer is internal implementation only for tracking
 * next.js's implementation only with known span names defined here.
 **/ // eslint typescript has a bug with TS enums
/* eslint-disable no-shadow */ __turbopack_esm__({
    "AppRenderSpan": ()=>AppRenderSpan,
    "AppRouteRouteHandlersSpan": ()=>AppRouteRouteHandlersSpan,
    "BaseServerSpan": ()=>BaseServerSpan,
    "LoadComponentsSpan": ()=>LoadComponentsSpan,
    "LogSpanAllowList": ()=>LogSpanAllowList,
    "MiddlewareSpan": ()=>MiddlewareSpan,
    "NextNodeServerSpan": ()=>NextNodeServerSpan,
    "NextServerSpan": ()=>NextServerSpan,
    "NextVanillaSpanAllowlist": ()=>NextVanillaSpanAllowlist,
    "NodeSpan": ()=>NodeSpan,
    "RenderSpan": ()=>RenderSpan,
    "ResolveMetadataSpan": ()=>ResolveMetadataSpan,
    "RouterSpan": ()=>RouterSpan,
    "StartServerSpan": ()=>StartServerSpan
});
var BaseServerSpan;
(function(BaseServerSpan) {
    BaseServerSpan["handleRequest"] = "BaseServer.handleRequest";
    BaseServerSpan["run"] = "BaseServer.run";
    BaseServerSpan["pipe"] = "BaseServer.pipe";
    BaseServerSpan["getStaticHTML"] = "BaseServer.getStaticHTML";
    BaseServerSpan["render"] = "BaseServer.render";
    BaseServerSpan["renderToResponseWithComponents"] = "BaseServer.renderToResponseWithComponents";
    BaseServerSpan["renderToResponse"] = "BaseServer.renderToResponse";
    BaseServerSpan["renderToHTML"] = "BaseServer.renderToHTML";
    BaseServerSpan["renderError"] = "BaseServer.renderError";
    BaseServerSpan["renderErrorToResponse"] = "BaseServer.renderErrorToResponse";
    BaseServerSpan["renderErrorToHTML"] = "BaseServer.renderErrorToHTML";
    BaseServerSpan["render404"] = "BaseServer.render404";
})(BaseServerSpan || (BaseServerSpan = {}));
var LoadComponentsSpan;
(function(LoadComponentsSpan) {
    LoadComponentsSpan["loadDefaultErrorComponents"] = "LoadComponents.loadDefaultErrorComponents";
    LoadComponentsSpan["loadComponents"] = "LoadComponents.loadComponents";
})(LoadComponentsSpan || (LoadComponentsSpan = {}));
var NextServerSpan;
(function(NextServerSpan) {
    NextServerSpan["getRequestHandler"] = "NextServer.getRequestHandler";
    NextServerSpan["getServer"] = "NextServer.getServer";
    NextServerSpan["getServerRequestHandler"] = "NextServer.getServerRequestHandler";
    NextServerSpan["createServer"] = "createServer.createServer";
})(NextServerSpan || (NextServerSpan = {}));
var NextNodeServerSpan;
(function(NextNodeServerSpan) {
    NextNodeServerSpan["compression"] = "NextNodeServer.compression";
    NextNodeServerSpan["getBuildId"] = "NextNodeServer.getBuildId";
    NextNodeServerSpan["createComponentTree"] = "NextNodeServer.createComponentTree";
    NextNodeServerSpan["clientComponentLoading"] = "NextNodeServer.clientComponentLoading";
    NextNodeServerSpan["getLayoutOrPageModule"] = "NextNodeServer.getLayoutOrPageModule";
    NextNodeServerSpan["generateStaticRoutes"] = "NextNodeServer.generateStaticRoutes";
    NextNodeServerSpan["generateFsStaticRoutes"] = "NextNodeServer.generateFsStaticRoutes";
    NextNodeServerSpan["generatePublicRoutes"] = "NextNodeServer.generatePublicRoutes";
    NextNodeServerSpan["generateImageRoutes"] = "NextNodeServer.generateImageRoutes.route";
    NextNodeServerSpan["sendRenderResult"] = "NextNodeServer.sendRenderResult";
    NextNodeServerSpan["proxyRequest"] = "NextNodeServer.proxyRequest";
    NextNodeServerSpan["runApi"] = "NextNodeServer.runApi";
    NextNodeServerSpan["render"] = "NextNodeServer.render";
    NextNodeServerSpan["renderHTML"] = "NextNodeServer.renderHTML";
    NextNodeServerSpan["imageOptimizer"] = "NextNodeServer.imageOptimizer";
    NextNodeServerSpan["getPagePath"] = "NextNodeServer.getPagePath";
    NextNodeServerSpan["getRoutesManifest"] = "NextNodeServer.getRoutesManifest";
    NextNodeServerSpan["findPageComponents"] = "NextNodeServer.findPageComponents";
    NextNodeServerSpan["getFontManifest"] = "NextNodeServer.getFontManifest";
    NextNodeServerSpan["getServerComponentManifest"] = "NextNodeServer.getServerComponentManifest";
    NextNodeServerSpan["getRequestHandler"] = "NextNodeServer.getRequestHandler";
    NextNodeServerSpan["renderToHTML"] = "NextNodeServer.renderToHTML";
    NextNodeServerSpan["renderError"] = "NextNodeServer.renderError";
    NextNodeServerSpan["renderErrorToHTML"] = "NextNodeServer.renderErrorToHTML";
    NextNodeServerSpan["render404"] = "NextNodeServer.render404";
    NextNodeServerSpan["startResponse"] = "NextNodeServer.startResponse";
    // nested inner span, does not require parent scope name
    NextNodeServerSpan["route"] = "route";
    NextNodeServerSpan["onProxyReq"] = "onProxyReq";
    NextNodeServerSpan["apiResolver"] = "apiResolver";
    NextNodeServerSpan["internalFetch"] = "internalFetch";
})(NextNodeServerSpan || (NextNodeServerSpan = {}));
var StartServerSpan;
(function(StartServerSpan) {
    StartServerSpan["startServer"] = "startServer.startServer";
})(StartServerSpan || (StartServerSpan = {}));
var RenderSpan;
(function(RenderSpan) {
    RenderSpan["getServerSideProps"] = "Render.getServerSideProps";
    RenderSpan["getStaticProps"] = "Render.getStaticProps";
    RenderSpan["renderToString"] = "Render.renderToString";
    RenderSpan["renderDocument"] = "Render.renderDocument";
    RenderSpan["createBodyResult"] = "Render.createBodyResult";
})(RenderSpan || (RenderSpan = {}));
var AppRenderSpan;
(function(AppRenderSpan) {
    AppRenderSpan["renderToString"] = "AppRender.renderToString";
    AppRenderSpan["renderToReadableStream"] = "AppRender.renderToReadableStream";
    AppRenderSpan["getBodyResult"] = "AppRender.getBodyResult";
    AppRenderSpan["fetch"] = "AppRender.fetch";
})(AppRenderSpan || (AppRenderSpan = {}));
var RouterSpan;
(function(RouterSpan) {
    RouterSpan["executeRoute"] = "Router.executeRoute";
})(RouterSpan || (RouterSpan = {}));
var NodeSpan;
(function(NodeSpan) {
    NodeSpan["runHandler"] = "Node.runHandler";
})(NodeSpan || (NodeSpan = {}));
var AppRouteRouteHandlersSpan;
(function(AppRouteRouteHandlersSpan) {
    AppRouteRouteHandlersSpan["runHandler"] = "AppRouteRouteHandlers.runHandler";
})(AppRouteRouteHandlersSpan || (AppRouteRouteHandlersSpan = {}));
var ResolveMetadataSpan;
(function(ResolveMetadataSpan) {
    ResolveMetadataSpan["generateMetadata"] = "ResolveMetadata.generateMetadata";
    ResolveMetadataSpan["generateViewport"] = "ResolveMetadata.generateViewport";
})(ResolveMetadataSpan || (ResolveMetadataSpan = {}));
var MiddlewareSpan;
(function(MiddlewareSpan) {
    MiddlewareSpan["execute"] = "Middleware.execute";
})(MiddlewareSpan || (MiddlewareSpan = {}));
const NextVanillaSpanAllowlist = [
    "Middleware.execute",
    "BaseServer.handleRequest",
    "Render.getServerSideProps",
    "Render.getStaticProps",
    "AppRender.fetch",
    "AppRender.getBodyResult",
    "Render.renderDocument",
    "Node.runHandler",
    "AppRouteRouteHandlers.runHandler",
    "ResolveMetadata.generateMetadata",
    "ResolveMetadata.generateViewport",
    "NextNodeServer.createComponentTree",
    "NextNodeServer.findPageComponents",
    "NextNodeServer.getLayoutOrPageModule",
    "NextNodeServer.startResponse",
    "NextNodeServer.clientComponentLoading"
];
const LogSpanAllowList = [
    "NextNodeServer.findPageComponents",
    "NextNodeServer.createComponentTree",
    "NextNodeServer.clientComponentLoading"
];
;
 //# sourceMappingURL=constants.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/@opentelemetry/api/index.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

(()=>{
    "use strict";
    var e = {
        491: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ContextAPI = void 0;
            const n = r(223);
            const a = r(172);
            const o = r(930);
            const i = "context";
            const c = new n.NoopContextManager;
            class ContextAPI {
                constructor(){}
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new ContextAPI;
                    }
                    return this._instance;
                }
                setGlobalContextManager(e) {
                    return (0, a.registerGlobal)(i, e, o.DiagAPI.instance());
                }
                active() {
                    return this._getContextManager().active();
                }
                with(e, t, r, ...n) {
                    return this._getContextManager().with(e, t, r, ...n);
                }
                bind(e, t) {
                    return this._getContextManager().bind(e, t);
                }
                _getContextManager() {
                    return (0, a.getGlobal)(i) || c;
                }
                disable() {
                    this._getContextManager().disable();
                    (0, a.unregisterGlobal)(i, o.DiagAPI.instance());
                }
            }
            t.ContextAPI = ContextAPI;
        },
        930: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagAPI = void 0;
            const n = r(56);
            const a = r(912);
            const o = r(957);
            const i = r(172);
            const c = "diag";
            class DiagAPI {
                constructor(){
                    function _logProxy(e) {
                        return function(...t) {
                            const r = (0, i.getGlobal)("diag");
                            if (!r) return;
                            return r[e](...t);
                        };
                    }
                    const e = this;
                    const setLogger = (t, r = {
                        logLevel: o.DiagLogLevel.INFO
                    })=>{
                        var n, c, s;
                        if (t === e) {
                            const t = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                            e.error((n = t.stack) !== null && n !== void 0 ? n : t.message);
                            return false;
                        }
                        if (typeof r === "number") {
                            r = {
                                logLevel: r
                            };
                        }
                        const u = (0, i.getGlobal)("diag");
                        const l = (0, a.createLogLevelDiagLogger)((c = r.logLevel) !== null && c !== void 0 ? c : o.DiagLogLevel.INFO, t);
                        if (u && !r.suppressOverrideMessage) {
                            const e = (s = (new Error).stack) !== null && s !== void 0 ? s : "<failed to generate stacktrace>";
                            u.warn(`Current logger will be overwritten from ${e}`);
                            l.warn(`Current logger will overwrite one already registered from ${e}`);
                        }
                        return (0, i.registerGlobal)("diag", l, e, true);
                    };
                    e.setLogger = setLogger;
                    e.disable = ()=>{
                        (0, i.unregisterGlobal)(c, e);
                    };
                    e.createComponentLogger = (e)=>new n.DiagComponentLogger(e);
                    e.verbose = _logProxy("verbose");
                    e.debug = _logProxy("debug");
                    e.info = _logProxy("info");
                    e.warn = _logProxy("warn");
                    e.error = _logProxy("error");
                }
                static instance() {
                    if (!this._instance) {
                        this._instance = new DiagAPI;
                    }
                    return this._instance;
                }
            }
            t.DiagAPI = DiagAPI;
        },
        653: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.MetricsAPI = void 0;
            const n = r(660);
            const a = r(172);
            const o = r(930);
            const i = "metrics";
            class MetricsAPI {
                constructor(){}
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new MetricsAPI;
                    }
                    return this._instance;
                }
                setGlobalMeterProvider(e) {
                    return (0, a.registerGlobal)(i, e, o.DiagAPI.instance());
                }
                getMeterProvider() {
                    return (0, a.getGlobal)(i) || n.NOOP_METER_PROVIDER;
                }
                getMeter(e, t, r) {
                    return this.getMeterProvider().getMeter(e, t, r);
                }
                disable() {
                    (0, a.unregisterGlobal)(i, o.DiagAPI.instance());
                }
            }
            t.MetricsAPI = MetricsAPI;
        },
        181: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.PropagationAPI = void 0;
            const n = r(172);
            const a = r(874);
            const o = r(194);
            const i = r(277);
            const c = r(369);
            const s = r(930);
            const u = "propagation";
            const l = new a.NoopTextMapPropagator;
            class PropagationAPI {
                constructor(){
                    this.createBaggage = c.createBaggage;
                    this.getBaggage = i.getBaggage;
                    this.getActiveBaggage = i.getActiveBaggage;
                    this.setBaggage = i.setBaggage;
                    this.deleteBaggage = i.deleteBaggage;
                }
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new PropagationAPI;
                    }
                    return this._instance;
                }
                setGlobalPropagator(e) {
                    return (0, n.registerGlobal)(u, e, s.DiagAPI.instance());
                }
                inject(e, t, r = o.defaultTextMapSetter) {
                    return this._getGlobalPropagator().inject(e, t, r);
                }
                extract(e, t, r = o.defaultTextMapGetter) {
                    return this._getGlobalPropagator().extract(e, t, r);
                }
                fields() {
                    return this._getGlobalPropagator().fields();
                }
                disable() {
                    (0, n.unregisterGlobal)(u, s.DiagAPI.instance());
                }
                _getGlobalPropagator() {
                    return (0, n.getGlobal)(u) || l;
                }
            }
            t.PropagationAPI = PropagationAPI;
        },
        997: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceAPI = void 0;
            const n = r(172);
            const a = r(846);
            const o = r(139);
            const i = r(607);
            const c = r(930);
            const s = "trace";
            class TraceAPI {
                constructor(){
                    this._proxyTracerProvider = new a.ProxyTracerProvider;
                    this.wrapSpanContext = o.wrapSpanContext;
                    this.isSpanContextValid = o.isSpanContextValid;
                    this.deleteSpan = i.deleteSpan;
                    this.getSpan = i.getSpan;
                    this.getActiveSpan = i.getActiveSpan;
                    this.getSpanContext = i.getSpanContext;
                    this.setSpan = i.setSpan;
                    this.setSpanContext = i.setSpanContext;
                }
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new TraceAPI;
                    }
                    return this._instance;
                }
                setGlobalTracerProvider(e) {
                    const t = (0, n.registerGlobal)(s, this._proxyTracerProvider, c.DiagAPI.instance());
                    if (t) {
                        this._proxyTracerProvider.setDelegate(e);
                    }
                    return t;
                }
                getTracerProvider() {
                    return (0, n.getGlobal)(s) || this._proxyTracerProvider;
                }
                getTracer(e, t) {
                    return this.getTracerProvider().getTracer(e, t);
                }
                disable() {
                    (0, n.unregisterGlobal)(s, c.DiagAPI.instance());
                    this._proxyTracerProvider = new a.ProxyTracerProvider;
                }
            }
            t.TraceAPI = TraceAPI;
        },
        277: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.deleteBaggage = t.setBaggage = t.getActiveBaggage = t.getBaggage = void 0;
            const n = r(491);
            const a = r(780);
            const o = (0, a.createContextKey)("OpenTelemetry Baggage Key");
            function getBaggage(e) {
                return e.getValue(o) || undefined;
            }
            t.getBaggage = getBaggage;
            function getActiveBaggage() {
                return getBaggage(n.ContextAPI.getInstance().active());
            }
            t.getActiveBaggage = getActiveBaggage;
            function setBaggage(e, t) {
                return e.setValue(o, t);
            }
            t.setBaggage = setBaggage;
            function deleteBaggage(e) {
                return e.deleteValue(o);
            }
            t.deleteBaggage = deleteBaggage;
        },
        993: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.BaggageImpl = void 0;
            class BaggageImpl {
                constructor(e){
                    this._entries = e ? new Map(e) : new Map;
                }
                getEntry(e) {
                    const t = this._entries.get(e);
                    if (!t) {
                        return undefined;
                    }
                    return Object.assign({}, t);
                }
                getAllEntries() {
                    return Array.from(this._entries.entries()).map(([e, t])=>[
                            e,
                            t
                        ]);
                }
                setEntry(e, t) {
                    const r = new BaggageImpl(this._entries);
                    r._entries.set(e, t);
                    return r;
                }
                removeEntry(e) {
                    const t = new BaggageImpl(this._entries);
                    t._entries.delete(e);
                    return t;
                }
                removeEntries(...e) {
                    const t = new BaggageImpl(this._entries);
                    for (const r of e){
                        t._entries.delete(r);
                    }
                    return t;
                }
                clear() {
                    return new BaggageImpl;
                }
            }
            t.BaggageImpl = BaggageImpl;
        },
        830: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.baggageEntryMetadataSymbol = void 0;
            t.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        },
        369: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.baggageEntryMetadataFromString = t.createBaggage = void 0;
            const n = r(930);
            const a = r(993);
            const o = r(830);
            const i = n.DiagAPI.instance();
            function createBaggage(e = {}) {
                return new a.BaggageImpl(new Map(Object.entries(e)));
            }
            t.createBaggage = createBaggage;
            function baggageEntryMetadataFromString(e) {
                if (typeof e !== "string") {
                    i.error(`Cannot create baggage metadata from unknown type: ${typeof e}`);
                    e = "";
                }
                return {
                    __TYPE__: o.baggageEntryMetadataSymbol,
                    toString () {
                        return e;
                    }
                };
            }
            t.baggageEntryMetadataFromString = baggageEntryMetadataFromString;
        },
        67: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.context = void 0;
            const n = r(491);
            t.context = n.ContextAPI.getInstance();
        },
        223: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopContextManager = void 0;
            const n = r(780);
            class NoopContextManager {
                active() {
                    return n.ROOT_CONTEXT;
                }
                with(e, t, r, ...n) {
                    return t.call(r, ...n);
                }
                bind(e, t) {
                    return t;
                }
                enable() {
                    return this;
                }
                disable() {
                    return this;
                }
            }
            t.NoopContextManager = NoopContextManager;
        },
        780: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ROOT_CONTEXT = t.createContextKey = void 0;
            function createContextKey(e) {
                return Symbol.for(e);
            }
            t.createContextKey = createContextKey;
            class BaseContext {
                constructor(e){
                    const t = this;
                    t._currentContext = e ? new Map(e) : new Map;
                    t.getValue = (e)=>t._currentContext.get(e);
                    t.setValue = (e, r)=>{
                        const n = new BaseContext(t._currentContext);
                        n._currentContext.set(e, r);
                        return n;
                    };
                    t.deleteValue = (e)=>{
                        const r = new BaseContext(t._currentContext);
                        r._currentContext.delete(e);
                        return r;
                    };
                }
            }
            t.ROOT_CONTEXT = new BaseContext;
        },
        506: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.diag = void 0;
            const n = r(930);
            t.diag = n.DiagAPI.instance();
        },
        56: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagComponentLogger = void 0;
            const n = r(172);
            class DiagComponentLogger {
                constructor(e){
                    this._namespace = e.namespace || "DiagComponentLogger";
                }
                debug(...e) {
                    return logProxy("debug", this._namespace, e);
                }
                error(...e) {
                    return logProxy("error", this._namespace, e);
                }
                info(...e) {
                    return logProxy("info", this._namespace, e);
                }
                warn(...e) {
                    return logProxy("warn", this._namespace, e);
                }
                verbose(...e) {
                    return logProxy("verbose", this._namespace, e);
                }
            }
            t.DiagComponentLogger = DiagComponentLogger;
            function logProxy(e, t, r) {
                const a = (0, n.getGlobal)("diag");
                if (!a) {
                    return;
                }
                r.unshift(t);
                return a[e](...r);
            }
        },
        972: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagConsoleLogger = void 0;
            const r = [
                {
                    n: "error",
                    c: "error"
                },
                {
                    n: "warn",
                    c: "warn"
                },
                {
                    n: "info",
                    c: "info"
                },
                {
                    n: "debug",
                    c: "debug"
                },
                {
                    n: "verbose",
                    c: "trace"
                }
            ];
            class DiagConsoleLogger {
                constructor(){
                    function _consoleFunc(e) {
                        return function(...t) {
                            if (console) {
                                let r = console[e];
                                if (typeof r !== "function") {
                                    r = console.log;
                                }
                                if (typeof r === "function") {
                                    return r.apply(console, t);
                                }
                            }
                        };
                    }
                    for(let e = 0; e < r.length; e++){
                        this[r[e].n] = _consoleFunc(r[e].c);
                    }
                }
            }
            t.DiagConsoleLogger = DiagConsoleLogger;
        },
        912: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createLogLevelDiagLogger = void 0;
            const n = r(957);
            function createLogLevelDiagLogger(e, t) {
                if (e < n.DiagLogLevel.NONE) {
                    e = n.DiagLogLevel.NONE;
                } else if (e > n.DiagLogLevel.ALL) {
                    e = n.DiagLogLevel.ALL;
                }
                t = t || {};
                function _filterFunc(r, n) {
                    const a = t[r];
                    if (typeof a === "function" && e >= n) {
                        return a.bind(t);
                    }
                    return function() {};
                }
                return {
                    error: _filterFunc("error", n.DiagLogLevel.ERROR),
                    warn: _filterFunc("warn", n.DiagLogLevel.WARN),
                    info: _filterFunc("info", n.DiagLogLevel.INFO),
                    debug: _filterFunc("debug", n.DiagLogLevel.DEBUG),
                    verbose: _filterFunc("verbose", n.DiagLogLevel.VERBOSE)
                };
            }
            t.createLogLevelDiagLogger = createLogLevelDiagLogger;
        },
        957: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagLogLevel = void 0;
            var r;
            (function(e) {
                e[e["NONE"] = 0] = "NONE";
                e[e["ERROR"] = 30] = "ERROR";
                e[e["WARN"] = 50] = "WARN";
                e[e["INFO"] = 60] = "INFO";
                e[e["DEBUG"] = 70] = "DEBUG";
                e[e["VERBOSE"] = 80] = "VERBOSE";
                e[e["ALL"] = 9999] = "ALL";
            })(r = t.DiagLogLevel || (t.DiagLogLevel = {}));
        },
        172: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.unregisterGlobal = t.getGlobal = t.registerGlobal = void 0;
            const n = r(200);
            const a = r(521);
            const o = r(130);
            const i = a.VERSION.split(".")[0];
            const c = Symbol.for(`opentelemetry.js.api.${i}`);
            const s = n._globalThis;
            function registerGlobal(e, t, r, n = false) {
                var o;
                const i = s[c] = (o = s[c]) !== null && o !== void 0 ? o : {
                    version: a.VERSION
                };
                if (!n && i[e]) {
                    const t = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e}`);
                    r.error(t.stack || t.message);
                    return false;
                }
                if (i.version !== a.VERSION) {
                    const t = new Error(`@opentelemetry/api: Registration of version v${i.version} for ${e} does not match previously registered API v${a.VERSION}`);
                    r.error(t.stack || t.message);
                    return false;
                }
                i[e] = t;
                r.debug(`@opentelemetry/api: Registered a global for ${e} v${a.VERSION}.`);
                return true;
            }
            t.registerGlobal = registerGlobal;
            function getGlobal(e) {
                var t, r;
                const n = (t = s[c]) === null || t === void 0 ? void 0 : t.version;
                if (!n || !(0, o.isCompatible)(n)) {
                    return;
                }
                return (r = s[c]) === null || r === void 0 ? void 0 : r[e];
            }
            t.getGlobal = getGlobal;
            function unregisterGlobal(e, t) {
                t.debug(`@opentelemetry/api: Unregistering a global for ${e} v${a.VERSION}.`);
                const r = s[c];
                if (r) {
                    delete r[e];
                }
            }
            t.unregisterGlobal = unregisterGlobal;
        },
        130: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.isCompatible = t._makeCompatibilityCheck = void 0;
            const n = r(521);
            const a = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
            function _makeCompatibilityCheck(e) {
                const t = new Set([
                    e
                ]);
                const r = new Set;
                const n = e.match(a);
                if (!n) {
                    return ()=>false;
                }
                const o = {
                    major: +n[1],
                    minor: +n[2],
                    patch: +n[3],
                    prerelease: n[4]
                };
                if (o.prerelease != null) {
                    return function isExactmatch(t) {
                        return t === e;
                    };
                }
                function _reject(e) {
                    r.add(e);
                    return false;
                }
                function _accept(e) {
                    t.add(e);
                    return true;
                }
                return function isCompatible(e) {
                    if (t.has(e)) {
                        return true;
                    }
                    if (r.has(e)) {
                        return false;
                    }
                    const n = e.match(a);
                    if (!n) {
                        return _reject(e);
                    }
                    const i = {
                        major: +n[1],
                        minor: +n[2],
                        patch: +n[3],
                        prerelease: n[4]
                    };
                    if (i.prerelease != null) {
                        return _reject(e);
                    }
                    if (o.major !== i.major) {
                        return _reject(e);
                    }
                    if (o.major === 0) {
                        if (o.minor === i.minor && o.patch <= i.patch) {
                            return _accept(e);
                        }
                        return _reject(e);
                    }
                    if (o.minor <= i.minor) {
                        return _accept(e);
                    }
                    return _reject(e);
                };
            }
            t._makeCompatibilityCheck = _makeCompatibilityCheck;
            t.isCompatible = _makeCompatibilityCheck(n.VERSION);
        },
        886: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.metrics = void 0;
            const n = r(653);
            t.metrics = n.MetricsAPI.getInstance();
        },
        901: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ValueType = void 0;
            var r;
            (function(e) {
                e[e["INT"] = 0] = "INT";
                e[e["DOUBLE"] = 1] = "DOUBLE";
            })(r = t.ValueType || (t.ValueType = {}));
        },
        102: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createNoopMeter = t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t.NOOP_OBSERVABLE_GAUGE_METRIC = t.NOOP_OBSERVABLE_COUNTER_METRIC = t.NOOP_UP_DOWN_COUNTER_METRIC = t.NOOP_HISTOGRAM_METRIC = t.NOOP_COUNTER_METRIC = t.NOOP_METER = t.NoopObservableUpDownCounterMetric = t.NoopObservableGaugeMetric = t.NoopObservableCounterMetric = t.NoopObservableMetric = t.NoopHistogramMetric = t.NoopUpDownCounterMetric = t.NoopCounterMetric = t.NoopMetric = t.NoopMeter = void 0;
            class NoopMeter {
                constructor(){}
                createHistogram(e, r) {
                    return t.NOOP_HISTOGRAM_METRIC;
                }
                createCounter(e, r) {
                    return t.NOOP_COUNTER_METRIC;
                }
                createUpDownCounter(e, r) {
                    return t.NOOP_UP_DOWN_COUNTER_METRIC;
                }
                createObservableGauge(e, r) {
                    return t.NOOP_OBSERVABLE_GAUGE_METRIC;
                }
                createObservableCounter(e, r) {
                    return t.NOOP_OBSERVABLE_COUNTER_METRIC;
                }
                createObservableUpDownCounter(e, r) {
                    return t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
                }
                addBatchObservableCallback(e, t) {}
                removeBatchObservableCallback(e) {}
            }
            t.NoopMeter = NoopMeter;
            class NoopMetric {
            }
            t.NoopMetric = NoopMetric;
            class NoopCounterMetric extends NoopMetric {
                add(e, t) {}
            }
            t.NoopCounterMetric = NoopCounterMetric;
            class NoopUpDownCounterMetric extends NoopMetric {
                add(e, t) {}
            }
            t.NoopUpDownCounterMetric = NoopUpDownCounterMetric;
            class NoopHistogramMetric extends NoopMetric {
                record(e, t) {}
            }
            t.NoopHistogramMetric = NoopHistogramMetric;
            class NoopObservableMetric {
                addCallback(e) {}
                removeCallback(e) {}
            }
            t.NoopObservableMetric = NoopObservableMetric;
            class NoopObservableCounterMetric extends NoopObservableMetric {
            }
            t.NoopObservableCounterMetric = NoopObservableCounterMetric;
            class NoopObservableGaugeMetric extends NoopObservableMetric {
            }
            t.NoopObservableGaugeMetric = NoopObservableGaugeMetric;
            class NoopObservableUpDownCounterMetric extends NoopObservableMetric {
            }
            t.NoopObservableUpDownCounterMetric = NoopObservableUpDownCounterMetric;
            t.NOOP_METER = new NoopMeter;
            t.NOOP_COUNTER_METRIC = new NoopCounterMetric;
            t.NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric;
            t.NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric;
            t.NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric;
            t.NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric;
            t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric;
            function createNoopMeter() {
                return t.NOOP_METER;
            }
            t.createNoopMeter = createNoopMeter;
        },
        660: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NOOP_METER_PROVIDER = t.NoopMeterProvider = void 0;
            const n = r(102);
            class NoopMeterProvider {
                getMeter(e, t, r) {
                    return n.NOOP_METER;
                }
            }
            t.NoopMeterProvider = NoopMeterProvider;
            t.NOOP_METER_PROVIDER = new NoopMeterProvider;
        },
        200: function(e, t, r) {
            var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
                if (n === undefined) n = r;
                Object.defineProperty(e, n, {
                    enumerable: true,
                    get: function() {
                        return t[r];
                    }
                });
            } : function(e, t, r, n) {
                if (n === undefined) n = r;
                e[n] = t[r];
            });
            var a = this && this.__exportStar || function(e, t) {
                for(var r in e)if (r !== "default" && !Object.prototype.hasOwnProperty.call(t, r)) n(t, e, r);
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            a(r(46), t);
        },
        651: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t._globalThis = void 0;
            t._globalThis = typeof globalThis === "object" ? globalThis : global;
        },
        46: function(e, t, r) {
            var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
                if (n === undefined) n = r;
                Object.defineProperty(e, n, {
                    enumerable: true,
                    get: function() {
                        return t[r];
                    }
                });
            } : function(e, t, r, n) {
                if (n === undefined) n = r;
                e[n] = t[r];
            });
            var a = this && this.__exportStar || function(e, t) {
                for(var r in e)if (r !== "default" && !Object.prototype.hasOwnProperty.call(t, r)) n(t, e, r);
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            a(r(651), t);
        },
        939: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.propagation = void 0;
            const n = r(181);
            t.propagation = n.PropagationAPI.getInstance();
        },
        874: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTextMapPropagator = void 0;
            class NoopTextMapPropagator {
                inject(e, t) {}
                extract(e, t) {
                    return e;
                }
                fields() {
                    return [];
                }
            }
            t.NoopTextMapPropagator = NoopTextMapPropagator;
        },
        194: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.defaultTextMapSetter = t.defaultTextMapGetter = void 0;
            t.defaultTextMapGetter = {
                get (e, t) {
                    if (e == null) {
                        return undefined;
                    }
                    return e[t];
                },
                keys (e) {
                    if (e == null) {
                        return [];
                    }
                    return Object.keys(e);
                }
            };
            t.defaultTextMapSetter = {
                set (e, t, r) {
                    if (e == null) {
                        return;
                    }
                    e[t] = r;
                }
            };
        },
        845: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.trace = void 0;
            const n = r(997);
            t.trace = n.TraceAPI.getInstance();
        },
        403: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NonRecordingSpan = void 0;
            const n = r(476);
            class NonRecordingSpan {
                constructor(e = n.INVALID_SPAN_CONTEXT){
                    this._spanContext = e;
                }
                spanContext() {
                    return this._spanContext;
                }
                setAttribute(e, t) {
                    return this;
                }
                setAttributes(e) {
                    return this;
                }
                addEvent(e, t) {
                    return this;
                }
                setStatus(e) {
                    return this;
                }
                updateName(e) {
                    return this;
                }
                end(e) {}
                isRecording() {
                    return false;
                }
                recordException(e, t) {}
            }
            t.NonRecordingSpan = NonRecordingSpan;
        },
        614: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTracer = void 0;
            const n = r(491);
            const a = r(607);
            const o = r(403);
            const i = r(139);
            const c = n.ContextAPI.getInstance();
            class NoopTracer {
                startSpan(e, t, r = c.active()) {
                    const n = Boolean(t === null || t === void 0 ? void 0 : t.root);
                    if (n) {
                        return new o.NonRecordingSpan;
                    }
                    const s = r && (0, a.getSpanContext)(r);
                    if (isSpanContext(s) && (0, i.isSpanContextValid)(s)) {
                        return new o.NonRecordingSpan(s);
                    } else {
                        return new o.NonRecordingSpan;
                    }
                }
                startActiveSpan(e, t, r, n) {
                    let o;
                    let i;
                    let s;
                    if (arguments.length < 2) {
                        return;
                    } else if (arguments.length === 2) {
                        s = t;
                    } else if (arguments.length === 3) {
                        o = t;
                        s = r;
                    } else {
                        o = t;
                        i = r;
                        s = n;
                    }
                    const u = i !== null && i !== void 0 ? i : c.active();
                    const l = this.startSpan(e, o, u);
                    const g = (0, a.setSpan)(u, l);
                    return c.with(g, s, undefined, l);
                }
            }
            t.NoopTracer = NoopTracer;
            function isSpanContext(e) {
                return typeof e === "object" && typeof e["spanId"] === "string" && typeof e["traceId"] === "string" && typeof e["traceFlags"] === "number";
            }
        },
        124: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTracerProvider = void 0;
            const n = r(614);
            class NoopTracerProvider {
                getTracer(e, t, r) {
                    return new n.NoopTracer;
                }
            }
            t.NoopTracerProvider = NoopTracerProvider;
        },
        125: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ProxyTracer = void 0;
            const n = r(614);
            const a = new n.NoopTracer;
            class ProxyTracer {
                constructor(e, t, r, n){
                    this._provider = e;
                    this.name = t;
                    this.version = r;
                    this.options = n;
                }
                startSpan(e, t, r) {
                    return this._getTracer().startSpan(e, t, r);
                }
                startActiveSpan(e, t, r, n) {
                    const a = this._getTracer();
                    return Reflect.apply(a.startActiveSpan, a, arguments);
                }
                _getTracer() {
                    if (this._delegate) {
                        return this._delegate;
                    }
                    const e = this._provider.getDelegateTracer(this.name, this.version, this.options);
                    if (!e) {
                        return a;
                    }
                    this._delegate = e;
                    return this._delegate;
                }
            }
            t.ProxyTracer = ProxyTracer;
        },
        846: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ProxyTracerProvider = void 0;
            const n = r(125);
            const a = r(124);
            const o = new a.NoopTracerProvider;
            class ProxyTracerProvider {
                getTracer(e, t, r) {
                    var a;
                    return (a = this.getDelegateTracer(e, t, r)) !== null && a !== void 0 ? a : new n.ProxyTracer(this, e, t, r);
                }
                getDelegate() {
                    var e;
                    return (e = this._delegate) !== null && e !== void 0 ? e : o;
                }
                setDelegate(e) {
                    this._delegate = e;
                }
                getDelegateTracer(e, t, r) {
                    var n;
                    return (n = this._delegate) === null || n === void 0 ? void 0 : n.getTracer(e, t, r);
                }
            }
            t.ProxyTracerProvider = ProxyTracerProvider;
        },
        996: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SamplingDecision = void 0;
            var r;
            (function(e) {
                e[e["NOT_RECORD"] = 0] = "NOT_RECORD";
                e[e["RECORD"] = 1] = "RECORD";
                e[e["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
            })(r = t.SamplingDecision || (t.SamplingDecision = {}));
        },
        607: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.getSpanContext = t.setSpanContext = t.deleteSpan = t.setSpan = t.getActiveSpan = t.getSpan = void 0;
            const n = r(780);
            const a = r(403);
            const o = r(491);
            const i = (0, n.createContextKey)("OpenTelemetry Context Key SPAN");
            function getSpan(e) {
                return e.getValue(i) || undefined;
            }
            t.getSpan = getSpan;
            function getActiveSpan() {
                return getSpan(o.ContextAPI.getInstance().active());
            }
            t.getActiveSpan = getActiveSpan;
            function setSpan(e, t) {
                return e.setValue(i, t);
            }
            t.setSpan = setSpan;
            function deleteSpan(e) {
                return e.deleteValue(i);
            }
            t.deleteSpan = deleteSpan;
            function setSpanContext(e, t) {
                return setSpan(e, new a.NonRecordingSpan(t));
            }
            t.setSpanContext = setSpanContext;
            function getSpanContext(e) {
                var t;
                return (t = getSpan(e)) === null || t === void 0 ? void 0 : t.spanContext();
            }
            t.getSpanContext = getSpanContext;
        },
        325: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceStateImpl = void 0;
            const n = r(564);
            const a = 32;
            const o = 512;
            const i = ",";
            const c = "=";
            class TraceStateImpl {
                constructor(e){
                    this._internalState = new Map;
                    if (e) this._parse(e);
                }
                set(e, t) {
                    const r = this._clone();
                    if (r._internalState.has(e)) {
                        r._internalState.delete(e);
                    }
                    r._internalState.set(e, t);
                    return r;
                }
                unset(e) {
                    const t = this._clone();
                    t._internalState.delete(e);
                    return t;
                }
                get(e) {
                    return this._internalState.get(e);
                }
                serialize() {
                    return this._keys().reduce((e, t)=>{
                        e.push(t + c + this.get(t));
                        return e;
                    }, []).join(i);
                }
                _parse(e) {
                    if (e.length > o) return;
                    this._internalState = e.split(i).reverse().reduce((e, t)=>{
                        const r = t.trim();
                        const a = r.indexOf(c);
                        if (a !== -1) {
                            const o = r.slice(0, a);
                            const i = r.slice(a + 1, t.length);
                            if ((0, n.validateKey)(o) && (0, n.validateValue)(i)) {
                                e.set(o, i);
                            } else {}
                        }
                        return e;
                    }, new Map);
                    if (this._internalState.size > a) {
                        this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, a));
                    }
                }
                _keys() {
                    return Array.from(this._internalState.keys()).reverse();
                }
                _clone() {
                    const e = new TraceStateImpl;
                    e._internalState = new Map(this._internalState);
                    return e;
                }
            }
            t.TraceStateImpl = TraceStateImpl;
        },
        564: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.validateValue = t.validateKey = void 0;
            const r = "[_0-9a-z-*/]";
            const n = `[a-z]${r}{0,255}`;
            const a = `[a-z0-9]${r}{0,240}@[a-z]${r}{0,13}`;
            const o = new RegExp(`^(?:${n}|${a})$`);
            const i = /^[ -~]{0,255}[!-~]$/;
            const c = /,|=/;
            function validateKey(e) {
                return o.test(e);
            }
            t.validateKey = validateKey;
            function validateValue(e) {
                return i.test(e) && !c.test(e);
            }
            t.validateValue = validateValue;
        },
        98: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createTraceState = void 0;
            const n = r(325);
            function createTraceState(e) {
                return new n.TraceStateImpl(e);
            }
            t.createTraceState = createTraceState;
        },
        476: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.INVALID_SPAN_CONTEXT = t.INVALID_TRACEID = t.INVALID_SPANID = void 0;
            const n = r(475);
            t.INVALID_SPANID = "0000000000000000";
            t.INVALID_TRACEID = "00000000000000000000000000000000";
            t.INVALID_SPAN_CONTEXT = {
                traceId: t.INVALID_TRACEID,
                spanId: t.INVALID_SPANID,
                traceFlags: n.TraceFlags.NONE
            };
        },
        357: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SpanKind = void 0;
            var r;
            (function(e) {
                e[e["INTERNAL"] = 0] = "INTERNAL";
                e[e["SERVER"] = 1] = "SERVER";
                e[e["CLIENT"] = 2] = "CLIENT";
                e[e["PRODUCER"] = 3] = "PRODUCER";
                e[e["CONSUMER"] = 4] = "CONSUMER";
            })(r = t.SpanKind || (t.SpanKind = {}));
        },
        139: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.wrapSpanContext = t.isSpanContextValid = t.isValidSpanId = t.isValidTraceId = void 0;
            const n = r(476);
            const a = r(403);
            const o = /^([0-9a-f]{32})$/i;
            const i = /^[0-9a-f]{16}$/i;
            function isValidTraceId(e) {
                return o.test(e) && e !== n.INVALID_TRACEID;
            }
            t.isValidTraceId = isValidTraceId;
            function isValidSpanId(e) {
                return i.test(e) && e !== n.INVALID_SPANID;
            }
            t.isValidSpanId = isValidSpanId;
            function isSpanContextValid(e) {
                return isValidTraceId(e.traceId) && isValidSpanId(e.spanId);
            }
            t.isSpanContextValid = isSpanContextValid;
            function wrapSpanContext(e) {
                return new a.NonRecordingSpan(e);
            }
            t.wrapSpanContext = wrapSpanContext;
        },
        847: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SpanStatusCode = void 0;
            var r;
            (function(e) {
                e[e["UNSET"] = 0] = "UNSET";
                e[e["OK"] = 1] = "OK";
                e[e["ERROR"] = 2] = "ERROR";
            })(r = t.SpanStatusCode || (t.SpanStatusCode = {}));
        },
        475: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceFlags = void 0;
            var r;
            (function(e) {
                e[e["NONE"] = 0] = "NONE";
                e[e["SAMPLED"] = 1] = "SAMPLED";
            })(r = t.TraceFlags || (t.TraceFlags = {}));
        },
        521: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.VERSION = void 0;
            t.VERSION = "1.6.0";
        }
    };
    var t = {};
    function __nccwpck_require__(r) {
        var n = t[r];
        if (n !== undefined) {
            return n.exports;
        }
        var a = t[r] = {
            exports: {}
        };
        var o = true;
        try {
            e[r].call(a.exports, a, a.exports, __nccwpck_require__);
            o = false;
        } finally{
            if (o) delete t[r];
        }
        return a.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var r = {};
    (()=>{
        var e = r;
        Object.defineProperty(e, "__esModule", {
            value: true
        });
        e.trace = e.propagation = e.metrics = e.diag = e.context = e.INVALID_SPAN_CONTEXT = e.INVALID_TRACEID = e.INVALID_SPANID = e.isValidSpanId = e.isValidTraceId = e.isSpanContextValid = e.createTraceState = e.TraceFlags = e.SpanStatusCode = e.SpanKind = e.SamplingDecision = e.ProxyTracerProvider = e.ProxyTracer = e.defaultTextMapSetter = e.defaultTextMapGetter = e.ValueType = e.createNoopMeter = e.DiagLogLevel = e.DiagConsoleLogger = e.ROOT_CONTEXT = e.createContextKey = e.baggageEntryMetadataFromString = void 0;
        var t = __nccwpck_require__(369);
        Object.defineProperty(e, "baggageEntryMetadataFromString", {
            enumerable: true,
            get: function() {
                return t.baggageEntryMetadataFromString;
            }
        });
        var n = __nccwpck_require__(780);
        Object.defineProperty(e, "createContextKey", {
            enumerable: true,
            get: function() {
                return n.createContextKey;
            }
        });
        Object.defineProperty(e, "ROOT_CONTEXT", {
            enumerable: true,
            get: function() {
                return n.ROOT_CONTEXT;
            }
        });
        var a = __nccwpck_require__(972);
        Object.defineProperty(e, "DiagConsoleLogger", {
            enumerable: true,
            get: function() {
                return a.DiagConsoleLogger;
            }
        });
        var o = __nccwpck_require__(957);
        Object.defineProperty(e, "DiagLogLevel", {
            enumerable: true,
            get: function() {
                return o.DiagLogLevel;
            }
        });
        var i = __nccwpck_require__(102);
        Object.defineProperty(e, "createNoopMeter", {
            enumerable: true,
            get: function() {
                return i.createNoopMeter;
            }
        });
        var c = __nccwpck_require__(901);
        Object.defineProperty(e, "ValueType", {
            enumerable: true,
            get: function() {
                return c.ValueType;
            }
        });
        var s = __nccwpck_require__(194);
        Object.defineProperty(e, "defaultTextMapGetter", {
            enumerable: true,
            get: function() {
                return s.defaultTextMapGetter;
            }
        });
        Object.defineProperty(e, "defaultTextMapSetter", {
            enumerable: true,
            get: function() {
                return s.defaultTextMapSetter;
            }
        });
        var u = __nccwpck_require__(125);
        Object.defineProperty(e, "ProxyTracer", {
            enumerable: true,
            get: function() {
                return u.ProxyTracer;
            }
        });
        var l = __nccwpck_require__(846);
        Object.defineProperty(e, "ProxyTracerProvider", {
            enumerable: true,
            get: function() {
                return l.ProxyTracerProvider;
            }
        });
        var g = __nccwpck_require__(996);
        Object.defineProperty(e, "SamplingDecision", {
            enumerable: true,
            get: function() {
                return g.SamplingDecision;
            }
        });
        var p = __nccwpck_require__(357);
        Object.defineProperty(e, "SpanKind", {
            enumerable: true,
            get: function() {
                return p.SpanKind;
            }
        });
        var d = __nccwpck_require__(847);
        Object.defineProperty(e, "SpanStatusCode", {
            enumerable: true,
            get: function() {
                return d.SpanStatusCode;
            }
        });
        var _ = __nccwpck_require__(475);
        Object.defineProperty(e, "TraceFlags", {
            enumerable: true,
            get: function() {
                return _.TraceFlags;
            }
        });
        var f = __nccwpck_require__(98);
        Object.defineProperty(e, "createTraceState", {
            enumerable: true,
            get: function() {
                return f.createTraceState;
            }
        });
        var b = __nccwpck_require__(139);
        Object.defineProperty(e, "isSpanContextValid", {
            enumerable: true,
            get: function() {
                return b.isSpanContextValid;
            }
        });
        Object.defineProperty(e, "isValidTraceId", {
            enumerable: true,
            get: function() {
                return b.isValidTraceId;
            }
        });
        Object.defineProperty(e, "isValidSpanId", {
            enumerable: true,
            get: function() {
                return b.isValidSpanId;
            }
        });
        var v = __nccwpck_require__(476);
        Object.defineProperty(e, "INVALID_SPANID", {
            enumerable: true,
            get: function() {
                return v.INVALID_SPANID;
            }
        });
        Object.defineProperty(e, "INVALID_TRACEID", {
            enumerable: true,
            get: function() {
                return v.INVALID_TRACEID;
            }
        });
        Object.defineProperty(e, "INVALID_SPAN_CONTEXT", {
            enumerable: true,
            get: function() {
                return v.INVALID_SPAN_CONTEXT;
            }
        });
        const O = __nccwpck_require__(67);
        Object.defineProperty(e, "context", {
            enumerable: true,
            get: function() {
                return O.context;
            }
        });
        const P = __nccwpck_require__(506);
        Object.defineProperty(e, "diag", {
            enumerable: true,
            get: function() {
                return P.diag;
            }
        });
        const N = __nccwpck_require__(886);
        Object.defineProperty(e, "metrics", {
            enumerable: true,
            get: function() {
                return N.metrics;
            }
        });
        const S = __nccwpck_require__(939);
        Object.defineProperty(e, "propagation", {
            enumerable: true,
            get: function() {
                return S.propagation;
            }
        });
        const C = __nccwpck_require__(845);
        Object.defineProperty(e, "trace", {
            enumerable: true,
            get: function() {
                return C.trace;
            }
        });
        e["default"] = {
            context: O.context,
            diag: P.diag,
            metrics: N.metrics,
            propagation: S.propagation,
            trace: C.trace
        };
    })();
    module.exports = r;
})();

}.call(this) }),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/lib/trace/tracer.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "BubbledError": ()=>BubbledError,
    "SpanKind": ()=>SpanKind,
    "SpanStatusCode": ()=>SpanStatusCode,
    "getTracer": ()=>getTracer,
    "isBubbledError": ()=>isBubbledError
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/lib/trace/constants.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
let api;
// we want to allow users to use their own version of @opentelemetry/api if they
// want to, so we try to require it first, and if it fails we fall back to the
// version that is bundled with Next.js
// this is because @opentelemetry/api has to be synced with the version of
// @opentelemetry/tracing that is used, and we don't want to force users to use
// the version that is bundled with Next.js.
// the API is ~stable, so this should be fine
if ("TURBOPACK compile-time truthy", 1) {
    api = __turbopack_require__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/@opentelemetry/api/index.js [middleware] (ecmascript)");
} else {
    "TURBOPACK unreachable";
}
const { context, propagation, trace, SpanStatusCode, SpanKind, ROOT_CONTEXT } = api;
const isPromise = (p)=>{
    return p !== null && typeof p === 'object' && typeof p.then === 'function';
};
class BubbledError extends Error {
    constructor(bubble, result){
        super();
        this.bubble = bubble;
        this.result = result;
    }
}
function isBubbledError(error) {
    if (typeof error !== 'object' || error === null) return false;
    return error instanceof BubbledError;
}
const closeSpanWithError = (span, error)=>{
    if (isBubbledError(error) && error.bubble) {
        span.setAttribute('next.bubble', true);
    } else {
        if (error) {
            span.recordException(error);
        }
        span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error == null ? void 0 : error.message
        });
    }
    span.end();
};
/** we use this map to propagate attributes from nested spans to the top span */ const rootSpanAttributesStore = new Map();
const rootSpanIdKey = api.createContextKey('next.rootSpanId');
let lastSpanId = 0;
const getSpanId = ()=>lastSpanId++;
const clientTraceDataSetter = {
    set (carrier, key, value) {
        carrier.push({
            key,
            value
        });
    }
};
class NextTracerImpl {
    /**
   * Returns an instance to the trace with configured name.
   * Since wrap / trace can be defined in any place prior to actual trace subscriber initialization,
   * This should be lazily evaluated.
   */ getTracerInstance() {
        return trace.getTracer('next.js', '0.0.1');
    }
    getContext() {
        return context;
    }
    getTracePropagationData() {
        const activeContext = context.active();
        const entries = [];
        propagation.inject(activeContext, entries, clientTraceDataSetter);
        return entries;
    }
    getActiveScopeSpan() {
        return trace.getSpan(context == null ? void 0 : context.active());
    }
    withPropagatedContext(carrier, fn, getter) {
        const activeContext = context.active();
        if (trace.getSpanContext(activeContext)) {
            // Active span is already set, too late to propagate.
            return fn();
        }
        const remoteContext = propagation.extract(activeContext, carrier, getter);
        return context.with(remoteContext, fn);
    }
    trace(...args) {
        var _trace_getSpanContext;
        const [type, fnOrOptions, fnOrEmpty] = args;
        // coerce options form overload
        const { fn, options } = typeof fnOrOptions === 'function' ? {
            fn: fnOrOptions,
            options: {}
        } : {
            fn: fnOrEmpty,
            options: {
                ...fnOrOptions
            }
        };
        const spanName = options.spanName ?? type;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextVanillaSpanAllowlist"].includes(type) && process.env.NEXT_OTEL_VERBOSE !== '1' || options.hideSpan) {
            return fn();
        }
        // Trying to get active scoped span to assign parent. If option specifies parent span manually, will try to use it.
        let spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
        let isRootSpan = false;
        if (!spanContext) {
            spanContext = (context == null ? void 0 : context.active()) ?? ROOT_CONTEXT;
            isRootSpan = true;
        } else if ((_trace_getSpanContext = trace.getSpanContext(spanContext)) == null ? void 0 : _trace_getSpanContext.isRemote) {
            isRootSpan = true;
        }
        const spanId = getSpanId();
        options.attributes = {
            'next.span_name': spanName,
            'next.span_type': type,
            ...options.attributes
        };
        return context.with(spanContext.setValue(rootSpanIdKey, spanId), ()=>this.getTracerInstance().startActiveSpan(spanName, options, (span)=>{
                const startTime = 'performance' in globalThis && 'measure' in performance ? globalThis.performance.now() : undefined;
                const onCleanup = ()=>{
                    rootSpanAttributesStore.delete(spanId);
                    if (startTime && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["LogSpanAllowList"].includes(type || '')) {
                        performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(type.split('.').pop() || '').replace(/[A-Z]/g, (match)=>'-' + match.toLowerCase())}`, {
                            start: startTime,
                            end: performance.now()
                        });
                    }
                };
                if (isRootSpan) {
                    rootSpanAttributesStore.set(spanId, new Map(Object.entries(options.attributes ?? {})));
                }
                try {
                    if (fn.length > 1) {
                        return fn(span, (err)=>closeSpanWithError(span, err));
                    }
                    const result = fn(span);
                    if (isPromise(result)) {
                        // If there's error make sure it throws
                        return result.then((res)=>{
                            span.end();
                            // Need to pass down the promise result,
                            // it could be react stream response with error { error, stream }
                            return res;
                        }).catch((err)=>{
                            closeSpanWithError(span, err);
                            throw err;
                        }).finally(onCleanup);
                    } else {
                        span.end();
                        onCleanup();
                    }
                    return result;
                } catch (err) {
                    closeSpanWithError(span, err);
                    onCleanup();
                    throw err;
                }
            }));
    }
    wrap(...args) {
        const tracer = this;
        const [name, options, fn] = args.length === 3 ? args : [
            args[0],
            {},
            args[1]
        ];
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextVanillaSpanAllowlist"].includes(name) && process.env.NEXT_OTEL_VERBOSE !== '1') {
            return fn;
        }
        return function() {
            let optionsObj = options;
            if (typeof optionsObj === 'function' && typeof fn === 'function') {
                optionsObj = optionsObj.apply(this, arguments);
            }
            const lastArgId = arguments.length - 1;
            const cb = arguments[lastArgId];
            if (typeof cb === 'function') {
                const scopeBoundCb = tracer.getContext().bind(context.active(), cb);
                return tracer.trace(name, optionsObj, (_span, done)=>{
                    arguments[lastArgId] = function(err) {
                        done == null ? void 0 : done(err);
                        return scopeBoundCb.apply(this, arguments);
                    };
                    return fn.apply(this, arguments);
                });
            } else {
                return tracer.trace(name, optionsObj, ()=>fn.apply(this, arguments));
            }
        };
    }
    startSpan(...args) {
        const [type, options] = args;
        const spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
        return this.getTracerInstance().startSpan(type, options, spanContext);
    }
    getSpanContext(parentSpan) {
        const spanContext = parentSpan ? trace.setSpan(context.active(), parentSpan) : undefined;
        return spanContext;
    }
    getRootSpanAttributes() {
        const spanId = context.active().getValue(rootSpanIdKey);
        return rootSpanAttributesStore.get(spanId);
    }
}
const getTracer = (()=>{
    const tracer = new NextTracerImpl();
    return ()=>tracer;
})();
;
 //# sourceMappingURL=tracer.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/cookie/index.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

(()=>{
    "use strict";
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var e = {};
    (()=>{
        var r = e;
        /*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ r.parse = parse;
        r.serialize = serialize;
        var i = decodeURIComponent;
        var t = encodeURIComponent;
        var a = /; */;
        var n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        function parse(e, r) {
            if (typeof e !== "string") {
                throw new TypeError("argument str must be a string");
            }
            var t = {};
            var n = r || {};
            var o = e.split(a);
            var s = n.decode || i;
            for(var p = 0; p < o.length; p++){
                var f = o[p];
                var u = f.indexOf("=");
                if (u < 0) {
                    continue;
                }
                var v = f.substr(0, u).trim();
                var c = f.substr(++u, f.length).trim();
                if ('"' == c[0]) {
                    c = c.slice(1, -1);
                }
                if (undefined == t[v]) {
                    t[v] = tryDecode(c, s);
                }
            }
            return t;
        }
        function serialize(e, r, i) {
            var a = i || {};
            var o = a.encode || t;
            if (typeof o !== "function") {
                throw new TypeError("option encode is invalid");
            }
            if (!n.test(e)) {
                throw new TypeError("argument name is invalid");
            }
            var s = o(r);
            if (s && !n.test(s)) {
                throw new TypeError("argument val is invalid");
            }
            var p = e + "=" + s;
            if (null != a.maxAge) {
                var f = a.maxAge - 0;
                if (isNaN(f) || !isFinite(f)) {
                    throw new TypeError("option maxAge is invalid");
                }
                p += "; Max-Age=" + Math.floor(f);
            }
            if (a.domain) {
                if (!n.test(a.domain)) {
                    throw new TypeError("option domain is invalid");
                }
                p += "; Domain=" + a.domain;
            }
            if (a.path) {
                if (!n.test(a.path)) {
                    throw new TypeError("option path is invalid");
                }
                p += "; Path=" + a.path;
            }
            if (a.expires) {
                if (typeof a.expires.toUTCString !== "function") {
                    throw new TypeError("option expires is invalid");
                }
                p += "; Expires=" + a.expires.toUTCString();
            }
            if (a.httpOnly) {
                p += "; HttpOnly";
            }
            if (a.secure) {
                p += "; Secure";
            }
            if (a.sameSite) {
                var u = typeof a.sameSite === "string" ? a.sameSite.toLowerCase() : a.sameSite;
                switch(u){
                    case true:
                        p += "; SameSite=Strict";
                        break;
                    case "lax":
                        p += "; SameSite=Lax";
                        break;
                    case "strict":
                        p += "; SameSite=Strict";
                        break;
                    case "none":
                        p += "; SameSite=None";
                        break;
                    default:
                        throw new TypeError("option sameSite is invalid");
                }
            }
            return p;
        }
        function tryDecode(e, r) {
            try {
                return r(e);
            } catch (r) {
                return e;
            }
        }
    })();
    module.exports = e;
})();

}.call(this) }),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/api-utils/index.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ApiError": ()=>ApiError,
    "COOKIE_NAME_PRERENDER_BYPASS": ()=>COOKIE_NAME_PRERENDER_BYPASS,
    "COOKIE_NAME_PRERENDER_DATA": ()=>COOKIE_NAME_PRERENDER_DATA,
    "RESPONSE_LIMIT_DEFAULT": ()=>RESPONSE_LIMIT_DEFAULT,
    "SYMBOL_CLEARED_COOKIES": ()=>SYMBOL_CLEARED_COOKIES,
    "SYMBOL_PREVIEW_DATA": ()=>SYMBOL_PREVIEW_DATA,
    "checkIsOnDemandRevalidate": ()=>checkIsOnDemandRevalidate,
    "clearPreviewData": ()=>clearPreviewData,
    "redirect": ()=>redirect,
    "sendError": ()=>sendError,
    "sendStatusCode": ()=>sendStatusCode,
    "setLazyProp": ()=>setLazyProp,
    "wrapApiHandler": ()=>wrapApiHandler
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/lib/constants.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/lib/trace/tracer.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/lib/trace/constants.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
function wrapApiHandler(page, handler) {
    return (...args)=>{
        var _getTracer_getRootSpanAttributes;
        (_getTracer_getRootSpanAttributes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["getTracer"])().getRootSpanAttributes()) == null ? void 0 : _getTracer_getRootSpanAttributes.set('next.route', page);
        // Call API route method
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["getTracer"])().trace(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NodeSpan"].runHandler, {
            spanName: `executing api route (pages) ${page}`
        }, ()=>handler(...args));
    };
}
function sendStatusCode(res, statusCode) {
    res.statusCode = statusCode;
    return res;
}
function redirect(res, statusOrUrl, url) {
    if (typeof statusOrUrl === 'string') {
        url = statusOrUrl;
        statusOrUrl = 307;
    }
    if (typeof statusOrUrl !== 'number' || typeof url !== 'string') {
        throw new Error(`Invalid redirect arguments. Please use a single argument URL, e.g. res.redirect('/destination') or use a status code and URL, e.g. res.redirect(307, '/destination').`);
    }
    res.writeHead(statusOrUrl, {
        Location: url
    });
    res.write(url);
    res.end();
    return res;
}
function checkIsOnDemandRevalidate(req, previewProps) {
    const headers = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["HeadersAdapter"].from(req.headers);
    const previewModeId = headers.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["PRERENDER_REVALIDATE_HEADER"]);
    const isOnDemandRevalidate = previewModeId === previewProps.previewModeId;
    const revalidateOnlyGenerated = headers.has(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER"]);
    return {
        isOnDemandRevalidate,
        revalidateOnlyGenerated
    };
}
const COOKIE_NAME_PRERENDER_BYPASS = `__prerender_bypass`;
const COOKIE_NAME_PRERENDER_DATA = `__next_preview_data`;
const RESPONSE_LIMIT_DEFAULT = 4 * 1024 * 1024;
const SYMBOL_PREVIEW_DATA = Symbol(COOKIE_NAME_PRERENDER_DATA);
const SYMBOL_CLEARED_COOKIES = Symbol(COOKIE_NAME_PRERENDER_BYPASS);
function clearPreviewData(res, options = {}) {
    if (SYMBOL_CLEARED_COOKIES in res) {
        return res;
    }
    const { serialize } = __turbopack_require__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/cookie/index.js [middleware] (ecmascript)");
    const previous = res.getHeader('Set-Cookie');
    res.setHeader(`Set-Cookie`, [
        ...typeof previous === 'string' ? [
            previous
        ] : Array.isArray(previous) ? previous : [],
        serialize(COOKIE_NAME_PRERENDER_BYPASS, '', {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : 'lax',
            secure: ("TURBOPACK compile-time value", "development") !== 'development',
            path: '/',
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        }),
        serialize(COOKIE_NAME_PRERENDER_DATA, '', {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : 'lax',
            secure: ("TURBOPACK compile-time value", "development") !== 'development',
            path: '/',
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        })
    ]);
    Object.defineProperty(res, SYMBOL_CLEARED_COOKIES, {
        value: true,
        enumerable: false
    });
    return res;
}
class ApiError extends Error {
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;
    }
}
function sendError(res, statusCode, message) {
    res.statusCode = statusCode;
    res.statusMessage = message;
    res.end(message);
}
function setLazyProp({ req }, prop, getter) {
    const opts = {
        configurable: true,
        enumerable: true
    };
    const optsReset = {
        ...opts,
        writable: true
    };
    Object.defineProperty(req, prop, {
        ...opts,
        get: ()=>{
            const value = getter();
            // we set the property on the object to avoid recalculating it
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
            return value;
        },
        set: (value)=>{
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
        }
    });
} //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/async-storage/draft-mode-provider.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "DraftModeProvider": ()=>DraftModeProvider
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/api-utils/index.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
class DraftModeProvider {
    constructor(previewProps, req, cookies, mutableCookies){
        var _cookies_get;
        // The logic for draftMode() is very similar to tryGetPreviewData()
        // but Draft Mode does not have any data associated with it.
        const isOnDemandRevalidate = previewProps && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["checkIsOnDemandRevalidate"])(req, previewProps).isOnDemandRevalidate;
        const cookieValue = (_cookies_get = cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["COOKIE_NAME_PRERENDER_BYPASS"])) == null ? void 0 : _cookies_get.value;
        this.isEnabled = Boolean(!isOnDemandRevalidate && cookieValue && previewProps && cookieValue === previewProps.previewModeId);
        this._previewModeId = previewProps == null ? void 0 : previewProps.previewModeId;
        this._mutableCookies = mutableCookies;
    }
    enable() {
        if (!this._previewModeId) {
            throw new Error('Invariant: previewProps missing previewModeId this should never happen');
        }
        this._mutableCookies.set({
            name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["COOKIE_NAME_PRERENDER_BYPASS"],
            value: this._previewModeId,
            httpOnly: true,
            sameSite: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : 'lax',
            secure: ("TURBOPACK compile-time value", "development") !== 'development',
            path: '/'
        });
    }
    disable() {
        // To delete a cookie, set `expires` to a date in the past:
        // https://tools.ietf.org/html/rfc6265#section-4.1.1
        // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
        this._mutableCookies.set({
            name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["COOKIE_NAME_PRERENDER_BYPASS"],
            value: '',
            httpOnly: true,
            sameSite: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : 'lax',
            secure: ("TURBOPACK compile-time value", "development") !== 'development',
            path: '/',
            expires: new Date(0)
        });
    }
} //# sourceMappingURL=draft-mode-provider.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/p-queue/index.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

(()=>{
    "use strict";
    var e = {
        993: (e)=>{
            var t = Object.prototype.hasOwnProperty, n = "~";
            function Events() {}
            if (Object.create) {
                Events.prototype = Object.create(null);
                if (!(new Events).__proto__) n = false;
            }
            function EE(e, t, n) {
                this.fn = e;
                this.context = t;
                this.once = n || false;
            }
            function addListener(e, t, r, i, s) {
                if (typeof r !== "function") {
                    throw new TypeError("The listener must be a function");
                }
                var o = new EE(r, i || e, s), u = n ? n + t : t;
                if (!e._events[u]) e._events[u] = o, e._eventsCount++;
                else if (!e._events[u].fn) e._events[u].push(o);
                else e._events[u] = [
                    e._events[u],
                    o
                ];
                return e;
            }
            function clearEvent(e, t) {
                if (--e._eventsCount === 0) e._events = new Events;
                else delete e._events[t];
            }
            function EventEmitter() {
                this._events = new Events;
                this._eventsCount = 0;
            }
            EventEmitter.prototype.eventNames = function eventNames() {
                var e = [], r, i;
                if (this._eventsCount === 0) return e;
                for(i in r = this._events){
                    if (t.call(r, i)) e.push(n ? i.slice(1) : i);
                }
                if (Object.getOwnPropertySymbols) {
                    return e.concat(Object.getOwnPropertySymbols(r));
                }
                return e;
            };
            EventEmitter.prototype.listeners = function listeners(e) {
                var t = n ? n + e : e, r = this._events[t];
                if (!r) return [];
                if (r.fn) return [
                    r.fn
                ];
                for(var i = 0, s = r.length, o = new Array(s); i < s; i++){
                    o[i] = r[i].fn;
                }
                return o;
            };
            EventEmitter.prototype.listenerCount = function listenerCount(e) {
                var t = n ? n + e : e, r = this._events[t];
                if (!r) return 0;
                if (r.fn) return 1;
                return r.length;
            };
            EventEmitter.prototype.emit = function emit(e, t, r, i, s, o) {
                var u = n ? n + e : e;
                if (!this._events[u]) return false;
                var a = this._events[u], l = arguments.length, c, h;
                if (a.fn) {
                    if (a.once) this.removeListener(e, a.fn, undefined, true);
                    switch(l){
                        case 1:
                            return a.fn.call(a.context), true;
                        case 2:
                            return a.fn.call(a.context, t), true;
                        case 3:
                            return a.fn.call(a.context, t, r), true;
                        case 4:
                            return a.fn.call(a.context, t, r, i), true;
                        case 5:
                            return a.fn.call(a.context, t, r, i, s), true;
                        case 6:
                            return a.fn.call(a.context, t, r, i, s, o), true;
                    }
                    for(h = 1, c = new Array(l - 1); h < l; h++){
                        c[h - 1] = arguments[h];
                    }
                    a.fn.apply(a.context, c);
                } else {
                    var _ = a.length, f;
                    for(h = 0; h < _; h++){
                        if (a[h].once) this.removeListener(e, a[h].fn, undefined, true);
                        switch(l){
                            case 1:
                                a[h].fn.call(a[h].context);
                                break;
                            case 2:
                                a[h].fn.call(a[h].context, t);
                                break;
                            case 3:
                                a[h].fn.call(a[h].context, t, r);
                                break;
                            case 4:
                                a[h].fn.call(a[h].context, t, r, i);
                                break;
                            default:
                                if (!c) for(f = 1, c = new Array(l - 1); f < l; f++){
                                    c[f - 1] = arguments[f];
                                }
                                a[h].fn.apply(a[h].context, c);
                        }
                    }
                }
                return true;
            };
            EventEmitter.prototype.on = function on(e, t, n) {
                return addListener(this, e, t, n, false);
            };
            EventEmitter.prototype.once = function once(e, t, n) {
                return addListener(this, e, t, n, true);
            };
            EventEmitter.prototype.removeListener = function removeListener(e, t, r, i) {
                var s = n ? n + e : e;
                if (!this._events[s]) return this;
                if (!t) {
                    clearEvent(this, s);
                    return this;
                }
                var o = this._events[s];
                if (o.fn) {
                    if (o.fn === t && (!i || o.once) && (!r || o.context === r)) {
                        clearEvent(this, s);
                    }
                } else {
                    for(var u = 0, a = [], l = o.length; u < l; u++){
                        if (o[u].fn !== t || i && !o[u].once || r && o[u].context !== r) {
                            a.push(o[u]);
                        }
                    }
                    if (a.length) this._events[s] = a.length === 1 ? a[0] : a;
                    else clearEvent(this, s);
                }
                return this;
            };
            EventEmitter.prototype.removeAllListeners = function removeAllListeners(e) {
                var t;
                if (e) {
                    t = n ? n + e : e;
                    if (this._events[t]) clearEvent(this, t);
                } else {
                    this._events = new Events;
                    this._eventsCount = 0;
                }
                return this;
            };
            EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
            EventEmitter.prototype.addListener = EventEmitter.prototype.on;
            EventEmitter.prefixed = n;
            EventEmitter.EventEmitter = EventEmitter;
            if ("TURBOPACK compile-time truthy", 1) {
                e.exports = EventEmitter;
            }
        },
        213: (e)=>{
            e.exports = (e, t)=>{
                t = t || (()=>{});
                return e.then((e)=>new Promise((e)=>{
                        e(t());
                    }).then(()=>e), (e)=>new Promise((e)=>{
                        e(t());
                    }).then(()=>{
                        throw e;
                    }));
            };
        },
        574: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            function lowerBound(e, t, n) {
                let r = 0;
                let i = e.length;
                while(i > 0){
                    const s = i / 2 | 0;
                    let o = r + s;
                    if (n(e[o], t) <= 0) {
                        r = ++o;
                        i -= s + 1;
                    } else {
                        i = s;
                    }
                }
                return r;
            }
            t["default"] = lowerBound;
        },
        821: (e, t, n)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            const r = n(574);
            class PriorityQueue {
                constructor(){
                    this._queue = [];
                }
                enqueue(e, t) {
                    t = Object.assign({
                        priority: 0
                    }, t);
                    const n = {
                        priority: t.priority,
                        run: e
                    };
                    if (this.size && this._queue[this.size - 1].priority >= t.priority) {
                        this._queue.push(n);
                        return;
                    }
                    const i = r.default(this._queue, n, (e, t)=>t.priority - e.priority);
                    this._queue.splice(i, 0, n);
                }
                dequeue() {
                    const e = this._queue.shift();
                    return e === null || e === void 0 ? void 0 : e.run;
                }
                filter(e) {
                    return this._queue.filter((t)=>t.priority === e.priority).map((e)=>e.run);
                }
                get size() {
                    return this._queue.length;
                }
            }
            t["default"] = PriorityQueue;
        },
        816: (e, t, n)=>{
            const r = n(213);
            class TimeoutError extends Error {
                constructor(e){
                    super(e);
                    this.name = "TimeoutError";
                }
            }
            const pTimeout = (e, t, n)=>new Promise((i, s)=>{
                    if (typeof t !== "number" || t < 0) {
                        throw new TypeError("Expected `milliseconds` to be a positive number");
                    }
                    if (t === Infinity) {
                        i(e);
                        return;
                    }
                    const o = setTimeout(()=>{
                        if (typeof n === "function") {
                            try {
                                i(n());
                            } catch (e) {
                                s(e);
                            }
                            return;
                        }
                        const r = typeof n === "string" ? n : `Promise timed out after ${t} milliseconds`;
                        const o = n instanceof Error ? n : new TimeoutError(r);
                        if (typeof e.cancel === "function") {
                            e.cancel();
                        }
                        s(o);
                    }, t);
                    r(e.then(i, s), ()=>{
                        clearTimeout(o);
                    });
                });
            e.exports = pTimeout;
            e.exports["default"] = pTimeout;
            e.exports.TimeoutError = TimeoutError;
        }
    };
    var t = {};
    function __nccwpck_require__(n) {
        var r = t[n];
        if (r !== undefined) {
            return r.exports;
        }
        var i = t[n] = {
            exports: {}
        };
        var s = true;
        try {
            e[n](i, i.exports, __nccwpck_require__);
            s = false;
        } finally{
            if (s) delete t[n];
        }
        return i.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var n = {};
    (()=>{
        var e = n;
        Object.defineProperty(e, "__esModule", {
            value: true
        });
        const t = __nccwpck_require__(993);
        const r = __nccwpck_require__(816);
        const i = __nccwpck_require__(821);
        const empty = ()=>{};
        const s = new r.TimeoutError;
        class PQueue extends t {
            constructor(e){
                var t, n, r, s;
                super();
                this._intervalCount = 0;
                this._intervalEnd = 0;
                this._pendingCount = 0;
                this._resolveEmpty = empty;
                this._resolveIdle = empty;
                e = Object.assign({
                    carryoverConcurrencyCount: false,
                    intervalCap: Infinity,
                    interval: 0,
                    concurrency: Infinity,
                    autoStart: true,
                    queueClass: i.default
                }, e);
                if (!(typeof e.intervalCap === "number" && e.intervalCap >= 1)) {
                    throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(n = (t = e.intervalCap) === null || t === void 0 ? void 0 : t.toString()) !== null && n !== void 0 ? n : ""}\` (${typeof e.intervalCap})`);
                }
                if (e.interval === undefined || !(Number.isFinite(e.interval) && e.interval >= 0)) {
                    throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(s = (r = e.interval) === null || r === void 0 ? void 0 : r.toString()) !== null && s !== void 0 ? s : ""}\` (${typeof e.interval})`);
                }
                this._carryoverConcurrencyCount = e.carryoverConcurrencyCount;
                this._isIntervalIgnored = e.intervalCap === Infinity || e.interval === 0;
                this._intervalCap = e.intervalCap;
                this._interval = e.interval;
                this._queue = new e.queueClass;
                this._queueClass = e.queueClass;
                this.concurrency = e.concurrency;
                this._timeout = e.timeout;
                this._throwOnTimeout = e.throwOnTimeout === true;
                this._isPaused = e.autoStart === false;
            }
            get _doesIntervalAllowAnother() {
                return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
            }
            get _doesConcurrentAllowAnother() {
                return this._pendingCount < this._concurrency;
            }
            _next() {
                this._pendingCount--;
                this._tryToStartAnother();
                this.emit("next");
            }
            _resolvePromises() {
                this._resolveEmpty();
                this._resolveEmpty = empty;
                if (this._pendingCount === 0) {
                    this._resolveIdle();
                    this._resolveIdle = empty;
                    this.emit("idle");
                }
            }
            _onResumeInterval() {
                this._onInterval();
                this._initializeIntervalIfNeeded();
                this._timeoutId = undefined;
            }
            _isIntervalPaused() {
                const e = Date.now();
                if (this._intervalId === undefined) {
                    const t = this._intervalEnd - e;
                    if (t < 0) {
                        this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
                    } else {
                        if (this._timeoutId === undefined) {
                            this._timeoutId = setTimeout(()=>{
                                this._onResumeInterval();
                            }, t);
                        }
                        return true;
                    }
                }
                return false;
            }
            _tryToStartAnother() {
                if (this._queue.size === 0) {
                    if (this._intervalId) {
                        clearInterval(this._intervalId);
                    }
                    this._intervalId = undefined;
                    this._resolvePromises();
                    return false;
                }
                if (!this._isPaused) {
                    const e = !this._isIntervalPaused();
                    if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                        const t = this._queue.dequeue();
                        if (!t) {
                            return false;
                        }
                        this.emit("active");
                        t();
                        if (e) {
                            this._initializeIntervalIfNeeded();
                        }
                        return true;
                    }
                }
                return false;
            }
            _initializeIntervalIfNeeded() {
                if (this._isIntervalIgnored || this._intervalId !== undefined) {
                    return;
                }
                this._intervalId = setInterval(()=>{
                    this._onInterval();
                }, this._interval);
                this._intervalEnd = Date.now() + this._interval;
            }
            _onInterval() {
                if (this._intervalCount === 0 && this._pendingCount === 0 && this._intervalId) {
                    clearInterval(this._intervalId);
                    this._intervalId = undefined;
                }
                this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
                this._processQueue();
            }
            _processQueue() {
                while(this._tryToStartAnother()){}
            }
            get concurrency() {
                return this._concurrency;
            }
            set concurrency(e) {
                if (!(typeof e === "number" && e >= 1)) {
                    throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e}\` (${typeof e})`);
                }
                this._concurrency = e;
                this._processQueue();
            }
            async add(e, t = {}) {
                return new Promise((n, i)=>{
                    const run = async ()=>{
                        this._pendingCount++;
                        this._intervalCount++;
                        try {
                            const o = this._timeout === undefined && t.timeout === undefined ? e() : r.default(Promise.resolve(e()), t.timeout === undefined ? this._timeout : t.timeout, ()=>{
                                if (t.throwOnTimeout === undefined ? this._throwOnTimeout : t.throwOnTimeout) {
                                    i(s);
                                }
                                return undefined;
                            });
                            n(await o);
                        } catch (e) {
                            i(e);
                        }
                        this._next();
                    };
                    this._queue.enqueue(run, t);
                    this._tryToStartAnother();
                    this.emit("add");
                });
            }
            async addAll(e, t) {
                return Promise.all(e.map(async (e)=>this.add(e, t)));
            }
            start() {
                if (!this._isPaused) {
                    return this;
                }
                this._isPaused = false;
                this._processQueue();
                return this;
            }
            pause() {
                this._isPaused = true;
            }
            clear() {
                this._queue = new this._queueClass;
            }
            async onEmpty() {
                if (this._queue.size === 0) {
                    return;
                }
                return new Promise((e)=>{
                    const t = this._resolveEmpty;
                    this._resolveEmpty = ()=>{
                        t();
                        e();
                    };
                });
            }
            async onIdle() {
                if (this._pendingCount === 0 && this._queue.size === 0) {
                    return;
                }
                return new Promise((e)=>{
                    const t = this._resolveIdle;
                    this._resolveIdle = ()=>{
                        t();
                        e();
                    };
                });
            }
            get size() {
                return this._queue.size;
            }
            sizeBy(e) {
                return this._queue.filter(e).length;
            }
            get pending() {
                return this._pendingCount;
            }
            get isPaused() {
                return this._isPaused;
            }
            get timeout() {
                return this._timeout;
            }
            set timeout(e) {
                this._timeout = e;
            }
        }
        e["default"] = PQueue;
    })();
    module.exports = n;
})();

}.call(this) }),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/request-async-storage-instance.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "requestAsyncStorage": ()=>requestAsyncStorage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/async-local-storage.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const requestAsyncStorage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createAsyncLocalStorage"])(); //# sourceMappingURL=request-async-storage-instance.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/request-async-storage.external.js [middleware] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Share the instance module in the next-shared layer
__turbopack_esm__({
    "getExpectedRequestStore": ()=>getExpectedRequestStore
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$request$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/request-async-storage-instance.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function getExpectedRequestStore(callingExpression) {
    const store = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$request$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["requestAsyncStorage"].getStore();
    if (store) return store;
    throw new Error("`" + callingExpression + "` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context");
} //# sourceMappingURL=request-async-storage.external.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/request-async-storage.external.js [middleware] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$request$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/request-async-storage-instance.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$request$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/request-async-storage.external.js [middleware] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/invariant-error.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "InvariantError": ()=>InvariantError
});
class InvariantError extends Error {
    constructor(message, options){
        super("Invariant: " + (message.endsWith('.') ? message : message + '.') + " This is a bug in Next.js.", options);
        this.name = 'InvariantError';
    }
} //# sourceMappingURL=invariant-error.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/after/after-context.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "AfterContextImpl": ()=>AfterContextImpl,
    "createAfterContext": ()=>createAfterContext
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$p$2d$queue$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/p-queue/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$request$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/request-async-storage.external.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$request$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/request-async-storage-instance.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/invariant-error.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
function createAfterContext(opts) {
    return new AfterContextImpl(opts);
}
class AfterContextImpl {
    constructor({ waitUntil, onClose, cacheScope }){
        this.waitUntil = waitUntil;
        this.onClose = onClose;
        this.cacheScope = cacheScope;
        this.callbackQueue = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$p$2d$queue$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]();
        this.callbackQueue.pause();
    }
    run(requestStore, callback) {
        this.requestStore = requestStore;
        if (this.cacheScope) {
            return this.cacheScope.run(()=>callback());
        } else {
            return callback();
        }
    }
    after(task) {
        if (isPromise(task)) {
            task.catch(()=>{}) // avoid unhandled rejection crashes
            ;
            if (!this.waitUntil) {
                errorWaitUntilNotAvailable();
            }
            this.waitUntil(task);
        } else if (typeof task === 'function') {
            // TODO(after): implement tracing
            this.addCallback(task);
        } else {
            throw new Error('`unstable_after()`: Argument must be a promise or a function');
        }
    }
    addCallback(callback) {
        // if something is wrong, throw synchronously, bubbling up to the `unstable_after` callsite.
        if (!this.waitUntil) {
            errorWaitUntilNotAvailable();
        }
        if (!this.requestStore) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["InvariantError"]('unstable_after: Expected `AfterContext.requestStore` to be initialized');
        }
        if (!this.onClose) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["InvariantError"]('unstable_after: Missing `onClose` implementation');
        }
        // this should only happen once.
        if (!this.runCallbacksOnClosePromise) {
            this.runCallbacksOnClosePromise = this.runCallbacksOnClose();
            this.waitUntil(this.runCallbacksOnClosePromise);
        }
        const wrappedCallback = async ()=>{
            try {
                await callback();
            } catch (err) {
                // TODO(after): this is fine for now, but will need better intergration with our error reporting.
                console.error('An error occurred in a function passed to `unstable_after()`:', err);
            }
        };
        this.callbackQueue.add(wrappedCallback);
    }
    async runCallbacksOnClose() {
        await new Promise((resolve)=>this.onClose(resolve));
        return this.runCallbacks(this.requestStore);
    }
    async runCallbacks(requestStore) {
        if (this.callbackQueue.size === 0) return;
        const runCallbacksImpl = async ()=>{
            this.callbackQueue.start();
            return this.callbackQueue.onIdle();
        };
        const readonlyRequestStore = wrapRequestStoreForAfterCallbacks(requestStore);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$request$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["requestAsyncStorage"].run(readonlyRequestStore, ()=>{
            if (this.cacheScope) {
                return this.cacheScope.run(runCallbacksImpl);
            } else {
                return runCallbacksImpl();
            }
        });
    }
}
function errorWaitUntilNotAvailable() {
    throw new Error('`unstable_after()` will not work correctly, because `waitUntil` is not available in the current environment.');
}
/** Disable mutations of `requestStore` within `after()` and disallow nested after calls.  */ function wrapRequestStoreForAfterCallbacks(requestStore) {
    return {
        url: requestStore.url,
        get headers () {
            return requestStore.headers;
        },
        get cookies () {
            return requestStore.cookies;
        },
        get draftMode () {
            return requestStore.draftMode;
        },
        // TODO(after): calling a `cookies.set()` in an after() that's in an action doesn't currently error.
        mutableCookies: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ResponseCookies"](new Headers()),
        assetPrefix: requestStore.assetPrefix,
        reactLoadableManifest: requestStore.reactLoadableManifest,
        afterContext: requestStore.afterContext
    };
}
function isPromise(p) {
    return p !== null && typeof p === 'object' && 'then' in p && typeof p.then === 'function';
} //# sourceMappingURL=after-context.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/async-storage/with-request-store.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "withRequestStore": ()=>withRequestStore
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/app-router-headers.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/adapters/request-cookies.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$async$2d$storage$2f$draft$2d$mode$2d$provider$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/async-storage/draft-mode-provider.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$after$2d$context$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/after/after-context.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
function getHeaders(headers) {
    const cleaned = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["HeadersAdapter"].from(headers);
    for (const param of __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["FLIGHT_PARAMETERS"]){
        cleaned.delete(param.toString().toLowerCase());
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["HeadersAdapter"].seal(cleaned);
}
function getMutableCookies(headers, onUpdateCookies) {
    const cookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["RequestCookies"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["HeadersAdapter"].from(headers));
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["MutableRequestCookiesAdapter"].wrap(cookies, onUpdateCookies);
}
const withRequestStore = (storage, { req, url, res, renderOpts }, callback)=>{
    const [wrapWithAfter, afterContext] = createAfterWrapper(renderOpts);
    function defaultOnUpdateCookies(cookies) {
        if (res) {
            res.setHeader('Set-Cookie', cookies);
        }
    }
    const cache = {};
    const store = {
        // Rather than just using the whole `url` here, we pull the parts we want
        // to ensure we don't use parts of the URL that we shouldn't. This also
        // lets us avoid requiring an empty string for `search` in the type.
        url: {
            pathname: url.pathname,
            search: url.search ?? ''
        },
        get headers () {
            if (!cache.headers) {
                // Seal the headers object that'll freeze out any methods that could
                // mutate the underlying data.
                cache.headers = getHeaders(req.headers);
            }
            return cache.headers;
        },
        get cookies () {
            if (!cache.cookies) {
                // if middleware is setting cookie(s), then include those in
                // the initial cached cookies so they can be read in render
                const requestCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["RequestCookies"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["HeadersAdapter"].from(req.headers));
                if ('x-middleware-set-cookie' in req.headers && typeof req.headers['x-middleware-set-cookie'] === 'string') {
                    const setCookieValue = req.headers['x-middleware-set-cookie'];
                    const responseHeaders = new Headers();
                    for (const cookie of (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["splitCookiesString"])(setCookieValue)){
                        responseHeaders.append('set-cookie', cookie);
                    }
                    const responseCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ResponseCookies"](responseHeaders);
                    // Transfer cookies from ResponseCookies to RequestCookies
                    for (const cookie of responseCookies.getAll()){
                        requestCookies.set(cookie.name, cookie.value ?? '');
                    }
                }
                // Seal the cookies object that'll freeze out any methods that could
                // mutate the underlying data.
                cache.cookies = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["RequestCookiesAdapter"].seal(requestCookies);
            }
            return cache.cookies;
        },
        get mutableCookies () {
            if (!cache.mutableCookies) {
                cache.mutableCookies = getMutableCookies(req.headers, (renderOpts == null ? void 0 : renderOpts.onUpdateCookies) || (res ? defaultOnUpdateCookies : undefined));
            }
            return cache.mutableCookies;
        },
        get draftMode () {
            if (!cache.draftMode) {
                cache.draftMode = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$async$2d$storage$2f$draft$2d$mode$2d$provider$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["DraftModeProvider"](renderOpts == null ? void 0 : renderOpts.previewProps, req, this.cookies, this.mutableCookies);
            }
            return cache.draftMode;
        },
        reactLoadableManifest: (renderOpts == null ? void 0 : renderOpts.reactLoadableManifest) || {},
        assetPrefix: (renderOpts == null ? void 0 : renderOpts.assetPrefix) || '',
        afterContext
    };
    return wrapWithAfter(store, ()=>storage.run(store, callback, store));
};
function createAfterWrapper(renderOpts) {
    var _renderOpts_experimental, _renderOpts_ComponentMod;
    const isAfterEnabled = (renderOpts == null ? void 0 : (_renderOpts_experimental = renderOpts.experimental) == null ? void 0 : _renderOpts_experimental.after) ?? false;
    if (!renderOpts || !isAfterEnabled) {
        return [
            (_, callback)=>callback(),
            undefined
        ];
    }
    const { waitUntil, onClose } = renderOpts;
    const cacheScope = (_renderOpts_ComponentMod = renderOpts.ComponentMod) == null ? void 0 : _renderOpts_ComponentMod.createCacheScope();
    const afterContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$after$2d$context$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createAfterContext"])({
        waitUntil,
        onClose,
        cacheScope
    });
    const wrap = (requestStore, callback)=>afterContext.run(requestStore, callback);
    return [
        wrap,
        afterContext
    ];
} //# sourceMappingURL=with-request-store.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/web-on-close.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/** Monitor when the consumer finishes reading the response body.
that's as close as we can get to `res.on('close')` using web APIs.
*/ __turbopack_esm__({
    "CloseController": ()=>CloseController,
    "trackBodyConsumed": ()=>trackBodyConsumed,
    "trackStreamConsumed": ()=>trackStreamConsumed
});
function trackBodyConsumed(body, onEnd) {
    if (typeof body === 'string') {
        const generator = async function* generate() {
            const encoder = new TextEncoder();
            yield encoder.encode(body);
            onEnd();
        };
        // @ts-expect-error BodyInit typings doesn't seem to include AsyncIterables even though it's supported in practice
        return generator();
    } else {
        return trackStreamConsumed(body, onEnd);
    }
}
function trackStreamConsumed(stream, onEnd) {
    const closePassThrough = new TransformStream({
        flush: ()=>{
            return onEnd();
        }
    });
    return stream.pipeThrough(closePassThrough);
}
class CloseController {
    onClose(callback) {
        if (this.isClosed) {
            throw new Error('Cannot subscribe to a closed CloseController');
        }
        this.target.addEventListener('close', callback);
        this.listeners++;
    }
    dispatchClose() {
        if (this.isClosed) {
            throw new Error('Cannot close a CloseController multiple times');
        }
        if (this.listeners > 0) {
            this.target.dispatchEvent(new Event('close'));
        }
        this.isClosed = true;
    }
    constructor(){
        this.target = new EventTarget();
        this.listeners = 0;
        this.isClosed = false;
    }
} //# sourceMappingURL=web-on-close.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/experimental/testmode/context.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getTestReqInfo: null,
    withRequest: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getTestReqInfo: function() {
        return getTestReqInfo;
    },
    withRequest: function() {
        return withRequest;
    }
});
const _nodeasync_hooks = __turbopack_require__("[externals]/ [external] (node:async_hooks, cjs)");
const testStorage = new _nodeasync_hooks.AsyncLocalStorage();
function extractTestInfoFromRequest(req, reader) {
    const proxyPortHeader = reader.header(req, 'next-test-proxy-port');
    if (!proxyPortHeader) {
        return undefined;
    }
    const url = reader.url(req);
    const proxyPort = Number(proxyPortHeader);
    const testData = reader.header(req, 'next-test-data') || '';
    return {
        url,
        proxyPort,
        testData
    };
}
function withRequest(req, reader, fn) {
    const testReqInfo = extractTestInfoFromRequest(req, reader);
    if (!testReqInfo) {
        return fn();
    }
    return testStorage.run(testReqInfo, fn);
}
function getTestReqInfo(req, reader) {
    const testReqInfo = testStorage.getStore();
    if (testReqInfo) {
        return testReqInfo;
    }
    if (req && reader) {
        return extractTestInfoFromRequest(req, reader);
    }
    return undefined;
} //# sourceMappingURL=context.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/experimental/testmode/fetch.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

var __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = __turbopack_import__("[externals]/ [external] (node:buffer, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = __turbopack_import__("[externals]/ [external] (node:buffer, cjs)");
"__TURBOPACK__ecmascript__hoisting__location__";
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    handleFetch: null,
    interceptFetch: null,
    reader: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    handleFetch: function() {
        return handleFetch;
    },
    interceptFetch: function() {
        return interceptFetch;
    },
    reader: function() {
        return reader;
    }
});
const _context = __turbopack_require__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/experimental/testmode/context.js [middleware] (ecmascript)");
const reader = {
    url (req) {
        return req.url;
    },
    header (req, name) {
        return req.headers.get(name);
    }
};
function getTestStack() {
    let stack = (new Error().stack ?? '').split('\n');
    // Skip the first line and find first non-empty line.
    for(let i = 1; i < stack.length; i++){
        if (stack[i].length > 0) {
            stack = stack.slice(i);
            break;
        }
    }
    // Filter out franmework lines.
    stack = stack.filter((f)=>!f.includes('/next/dist/'));
    // At most 5 lines.
    stack = stack.slice(0, 5);
    // Cleanup some internal info and trim.
    stack = stack.map((s)=>s.replace('webpack-internal:///(rsc)/', '').trim());
    return stack.join('    ');
}
async function buildProxyRequest(testData, request) {
    const { url, method, headers, body, cache, credentials, integrity, mode, redirect, referrer, referrerPolicy } = request;
    return {
        testData,
        api: 'fetch',
        request: {
            url,
            method,
            headers: [
                ...Array.from(headers),
                [
                    'next-test-stack',
                    getTestStack()
                ]
            ],
            body: body ? __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(await request.arrayBuffer()).toString('base64') : null,
            cache,
            credentials,
            integrity,
            mode,
            redirect,
            referrer,
            referrerPolicy
        }
    };
}
function buildResponse(proxyResponse) {
    const { status, headers, body } = proxyResponse.response;
    return new Response(body ? __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(body, 'base64') : null, {
        status,
        headers: new Headers(headers)
    });
}
async function handleFetch(originalFetch, request) {
    const testInfo = (0, _context.getTestReqInfo)(request, reader);
    if (!testInfo) {
        // Passthrough non-test requests.
        return originalFetch(request);
    }
    const { testData, proxyPort } = testInfo;
    const proxyRequest = await buildProxyRequest(testData, request);
    const resp = await originalFetch(`http://localhost:${proxyPort}`, {
        method: 'POST',
        body: JSON.stringify(proxyRequest),
        next: {
            // @ts-ignore
            internal: true
        }
    });
    if (!resp.ok) {
        throw new Error(`Proxy request failed: ${resp.status}`);
    }
    const proxyResponse = await resp.json();
    const { api } = proxyResponse;
    switch(api){
        case 'continue':
            return originalFetch(request);
        case 'abort':
        case 'unhandled':
            throw new Error(`Proxy request aborted [${request.method} ${request.url}]`);
        default:
            break;
    }
    return buildResponse(proxyResponse);
}
function interceptFetch(originalFetch) {
    global.fetch = function testFetch(input, init) {
        var _init_next;
        // Passthrough internal requests.
        // @ts-ignore
        if (init == null ? void 0 : (_init_next = init.next) == null ? void 0 : _init_next.internal) {
            return originalFetch(input, init);
        }
        return handleFetch(originalFetch, new Request(input, init));
    };
    return ()=>{
        global.fetch = originalFetch;
    };
} //# sourceMappingURL=fetch.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/experimental/testmode/server-edge.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    interceptTestApis: null,
    wrapRequestHandler: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    interceptTestApis: function() {
        return interceptTestApis;
    },
    wrapRequestHandler: function() {
        return wrapRequestHandler;
    }
});
const _context = __turbopack_require__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/experimental/testmode/context.js [middleware] (ecmascript)");
const _fetch = __turbopack_require__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/experimental/testmode/fetch.js [middleware] (ecmascript)");
function interceptTestApis() {
    return (0, _fetch.interceptFetch)(global.fetch);
}
function wrapRequestHandler(handler) {
    return (req, fn)=>(0, _context.withRequest)(req, _fetch.reader, ()=>handler(req, fn));
} //# sourceMappingURL=server-edge.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/adapter.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "NextRequestHint": ()=>NextRequestHint,
    "adapter": ()=>adapter
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/error.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$fetch$2d$event$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/fetch-event.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$request$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/request.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$relativize$2d$url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/relativize-url.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/next-url.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$internal$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/internal-utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/app-router-headers.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$globals$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/globals.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$async$2d$storage$2f$with$2d$request$2d$store$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/async-storage/with-request-store.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$request$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/request-async-storage.external.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$request$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/request-async-storage-instance.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/lib/trace/tracer.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/lib/trace/constants.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$web$2d$on$2d$close$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/web-on-close.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
class NextRequestHint extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$request$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextRequest"] {
    constructor(params){
        super(params.input, params.init);
        this.sourcePage = params.page;
    }
    get request() {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["PageSignatureError"]({
            page: this.sourcePage
        });
    }
    respondWith() {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["PageSignatureError"]({
            page: this.sourcePage
        });
    }
    waitUntil() {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["PageSignatureError"]({
            page: this.sourcePage
        });
    }
}
const headersGetter = {
    keys: (headers)=>Array.from(headers.keys()),
    get: (headers, key)=>headers.get(key) ?? undefined
};
let propagator = (request, fn)=>{
    const tracer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["getTracer"])();
    return tracer.withPropagatedContext(request.headers, fn, headersGetter);
};
let testApisIntercepted = false;
function ensureTestApisIntercepted() {
    if (!testApisIntercepted) {
        testApisIntercepted = true;
        if (process.env.NEXT_PRIVATE_TEST_PROXY === 'true') {
            const { interceptTestApis, wrapRequestHandler } = __turbopack_require__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/experimental/testmode/server-edge.js [middleware] (ecmascript)");
            interceptTestApis();
            propagator = wrapRequestHandler(propagator);
        }
    }
}
async function adapter(params) {
    ensureTestApisIntercepted();
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$globals$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ensureInstrumentationRegistered"])();
    // TODO-APP: use explicit marker for this
    const isEdgeRendering = typeof self.__BUILD_MANIFEST !== 'undefined';
    const prerenderManifest = typeof self.__PRERENDER_MANIFEST === 'string' ? JSON.parse(self.__PRERENDER_MANIFEST) : undefined;
    params.request.url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["normalizeRscURL"])(params.request.url);
    const requestUrl = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextURL"](params.request.url, {
        headers: params.request.headers,
        nextConfig: params.request.nextConfig
    });
    // Iterator uses an index to keep track of the current iteration. Because of deleting and appending below we can't just use the iterator.
    // Instead we use the keys before iteration.
    const keys = [
        ...requestUrl.searchParams.keys()
    ];
    for (const key of keys){
        const value = requestUrl.searchParams.getAll(key);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["normalizeNextQueryParam"])(key, (normalizedKey)=>{
            requestUrl.searchParams.delete(normalizedKey);
            for (const val of value){
                requestUrl.searchParams.append(normalizedKey, val);
            }
            requestUrl.searchParams.delete(key);
        });
    }
    // Ensure users only see page requests, never data requests.
    const buildId = requestUrl.buildId;
    requestUrl.buildId = '';
    const isNextDataRequest = params.request.headers['x-nextjs-data'];
    if (isNextDataRequest && requestUrl.pathname === '/index') {
        requestUrl.pathname = '/';
    }
    const requestHeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["fromNodeOutgoingHttpHeaders"])(params.request.headers);
    const flightHeaders = new Map();
    // Parameters should only be stripped for middleware
    if (!isEdgeRendering) {
        for (const param of __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["FLIGHT_PARAMETERS"]){
            const key = param.toString().toLowerCase();
            const value = requestHeaders.get(key);
            if (value) {
                flightHeaders.set(key, requestHeaders.get(key));
                requestHeaders.delete(key);
            }
        }
    }
    const normalizeUrl = process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE ? new URL(params.request.url) : requestUrl;
    const request = new NextRequestHint({
        page: params.page,
        // Strip internal query parameters off the request.
        input: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$internal$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["stripInternalSearchParams"])(normalizeUrl, true).toString(),
        init: {
            body: params.request.body,
            geo: params.request.geo,
            headers: requestHeaders,
            ip: params.request.ip,
            method: params.request.method,
            nextConfig: params.request.nextConfig,
            signal: params.request.signal
        }
    });
    /**
   * This allows to identify the request as a data request. The user doesn't
   * need to know about this property neither use it. We add it for testing
   * purposes.
   */ if (isNextDataRequest) {
        Object.defineProperty(request, '__isData', {
            enumerable: false,
            value: true
        });
    }
    if (!globalThis.__incrementalCache && params.IncrementalCache) {
        globalThis.__incrementalCache = new params.IncrementalCache({
            appDir: true,
            fetchCache: true,
            minimalMode: ("TURBOPACK compile-time value", "development") !== 'development',
            fetchCacheKeyPrefix: ("TURBOPACK compile-time value", ""),
            dev: ("TURBOPACK compile-time value", "development") === 'development',
            requestHeaders: params.request.headers,
            requestProtocol: 'https',
            getPrerenderManifest: ()=>{
                return {
                    version: -1,
                    routes: {},
                    dynamicRoutes: {},
                    notFoundRoutes: [],
                    preview: {
                        previewModeId: 'development-id'
                    }
                };
            }
        });
    }
    const event = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$fetch$2d$event$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextFetchEvent"]({
        request,
        page: params.page
    });
    let response;
    let cookiesFromResponse;
    response = await propagator(request, ()=>{
        // we only care to make async storage available for middleware
        const isMiddleware = params.page === '/middleware' || params.page === '/src/middleware';
        if (isMiddleware) {
            var _params_request_nextConfig_experimental, _params_request_nextConfig;
            // if we're in an edge function, we only get a subset of `nextConfig` (no `experimental`),
            // so we have to inject it via DefinePlugin.
            // in `next start` this will be passed normally (see `NextNodeServer.runMiddleware`).
            const isAfterEnabled = ((_params_request_nextConfig = params.request.nextConfig) == null ? void 0 : (_params_request_nextConfig_experimental = _params_request_nextConfig.experimental) == null ? void 0 : _params_request_nextConfig_experimental.after) ?? !!("TURBOPACK compile-time value", false);
            let waitUntil = undefined;
            let closeController = undefined;
            if (isAfterEnabled) {
                waitUntil = event.waitUntil.bind(event);
                closeController = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$web$2d$on$2d$close$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["CloseController"]();
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["getTracer"])().trace(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["MiddlewareSpan"].execute, {
                spanName: `middleware ${request.method} ${request.nextUrl.pathname}`,
                attributes: {
                    'http.target': request.nextUrl.pathname,
                    'http.method': request.method
                }
            }, async ()=>{
                try {
                    const previewProps = (prerenderManifest == null ? void 0 : prerenderManifest.preview) || {
                        previewModeId: 'development-id',
                        previewModeEncryptionKey: '',
                        previewModeSigningKey: ''
                    };
                    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$async$2d$storage$2f$with$2d$request$2d$store$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["withRequestStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$request$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["requestAsyncStorage"], {
                        req: request,
                        url: request.nextUrl,
                        renderOpts: {
                            onUpdateCookies: (cookies)=>{
                                cookiesFromResponse = cookies;
                            },
                            previewProps,
                            waitUntil,
                            onClose: closeController ? closeController.onClose.bind(closeController) : undefined,
                            experimental: {
                                after: isAfterEnabled
                            }
                        }
                    }, ()=>params.handler(request, event));
                } finally{
                    // middleware cannot stream, so we can consider the response closed
                    // as soon as the handler returns.
                    if (closeController) {
                        // we can delay running it until a bit later --
                        // if it's needed, we'll have a `waitUntil` lock anyway.
                        setTimeout(()=>{
                            closeController.dispatchClose();
                        }, 0);
                    }
                }
            });
        }
        return params.handler(request, event);
    });
    // check if response is a Response object
    if (response && !(response instanceof Response)) {
        throw new TypeError('Expected an instance of Response to be returned');
    }
    if (response && cookiesFromResponse) {
        response.headers.set('set-cookie', cookiesFromResponse);
    }
    /**
   * For rewrites we must always include the locale in the final pathname
   * so we re-create the NextURL forcing it to include it when the it is
   * an internal rewrite. Also we make sure the outgoing rewrite URL is
   * a data URL if the request was a data request.
   */ const rewrite = response == null ? void 0 : response.headers.get('x-middleware-rewrite');
    if (response && rewrite) {
        const rewriteUrl = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextURL"](rewrite, {
            forceLocale: true,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        if (!process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE) {
            if (rewriteUrl.host === request.nextUrl.host) {
                rewriteUrl.buildId = buildId || rewriteUrl.buildId;
                response.headers.set('x-middleware-rewrite', String(rewriteUrl));
            }
        }
        /**
     * When the request is a data request we must show if there was a rewrite
     * with an internal header so the client knows which component to load
     * from the data request.
     */ const relativizedRewrite = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$relativize$2d$url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["relativizeURL"])(String(rewriteUrl), String(requestUrl));
        if (isNextDataRequest && // if the rewrite is external and external rewrite
        // resolving config is enabled don't add this header
        // so the upstream app can set it instead
        !(("TURBOPACK compile-time value", false) && relativizedRewrite.match(/http(s)?:\/\//))) {
            response.headers.set('x-nextjs-rewrite', relativizedRewrite);
        }
    }
    /**
   * For redirects we will not include the locale in case when it is the
   * default and we must also make sure the outgoing URL is a data one if
   * the incoming request was a data request.
   */ const redirect = response == null ? void 0 : response.headers.get('Location');
    if (response && redirect && !isEdgeRendering) {
        const redirectURL = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextURL"](redirect, {
            forceLocale: false,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        /**
     * Responses created from redirects have immutable headers so we have
     * to clone the response to be able to modify it.
     */ response = new Response(response.body, response);
        if (!process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE) {
            if (redirectURL.host === request.nextUrl.host) {
                redirectURL.buildId = buildId || redirectURL.buildId;
                response.headers.set('Location', String(redirectURL));
            }
        }
        /**
     * When the request is a data request we can't use the location header as
     * it may end up with CORS error. Instead we map to an internal header so
     * the client knows the destination.
     */ if (isNextDataRequest) {
            response.headers.delete('Location');
            response.headers.set('x-nextjs-redirect', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$relativize$2d$url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["relativizeURL"])(String(redirectURL), String(requestUrl)));
        }
    }
    const finalResponse = response ? response : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
    // Flight headers are not overridable / removable so they are applied at the end.
    const middlewareOverrideHeaders = finalResponse.headers.get('x-middleware-override-headers');
    const overwrittenHeaders = [];
    if (middlewareOverrideHeaders) {
        for (const [key, value] of flightHeaders){
            finalResponse.headers.set(`x-middleware-request-${key}`, value);
            overwrittenHeaders.push(key);
        }
        if (overwrittenHeaders.length > 0) {
            finalResponse.headers.set('x-middleware-override-headers', middlewareOverrideHeaders + ',' + overwrittenHeaders.join(','));
        }
    }
    return {
        response: finalResponse,
        waitUntil: Promise.all(event[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$fetch$2d$event$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["waitUntilSymbol"]]),
        fetchMetrics: request.fetchMetrics
    };
} //# sourceMappingURL=adapter.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/image-response.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * @deprecated ImageResponse moved from "next/server" to "next/og" since Next.js 14, please import from "next/og" instead.
 * Migration with codemods: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#next-og-import
 */ __turbopack_esm__({
    "ImageResponse": ()=>ImageResponse
});
function ImageResponse() {
    throw new Error('ImageResponse moved from "next/server" to "next/og" since Next.js 14, please import from "next/og" instead');
} //# sourceMappingURL=image-response.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/ua-parser-js/ua-parser.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

(()=>{
    var i = {
        226: function(i, e) {
            (function(o, a) {
                "use strict";
                var r = "1.0.35", t = "", n = "?", s = "function", b = "undefined", w = "object", l = "string", d = "major", c = "model", u = "name", p = "type", m = "vendor", f = "version", h = "architecture", v = "console", g = "mobile", k = "tablet", x = "smarttv", _ = "wearable", y = "embedded", q = 350;
                var T = "Amazon", S = "Apple", z = "ASUS", N = "BlackBerry", A = "Browser", C = "Chrome", E = "Edge", O = "Firefox", U = "Google", j = "Huawei", P = "LG", R = "Microsoft", M = "Motorola", B = "Opera", V = "Samsung", D = "Sharp", I = "Sony", W = "Viera", F = "Xiaomi", G = "Zebra", H = "Facebook", L = "Chromium OS", Z = "Mac OS";
                var extend = function(i, e) {
                    var o = {};
                    for(var a in i){
                        if (e[a] && e[a].length % 2 === 0) {
                            o[a] = e[a].concat(i[a]);
                        } else {
                            o[a] = i[a];
                        }
                    }
                    return o;
                }, enumerize = function(i) {
                    var e = {};
                    for(var o = 0; o < i.length; o++){
                        e[i[o].toUpperCase()] = i[o];
                    }
                    return e;
                }, has = function(i, e) {
                    return typeof i === l ? lowerize(e).indexOf(lowerize(i)) !== -1 : false;
                }, lowerize = function(i) {
                    return i.toLowerCase();
                }, majorize = function(i) {
                    return typeof i === l ? i.replace(/[^\d\.]/g, t).split(".")[0] : a;
                }, trim = function(i, e) {
                    if (typeof i === l) {
                        i = i.replace(/^\s\s*/, t);
                        return typeof e === b ? i : i.substring(0, q);
                    }
                };
                var rgxMapper = function(i, e) {
                    var o = 0, r, t, n, b, l, d;
                    while(o < e.length && !l){
                        var c = e[o], u = e[o + 1];
                        r = t = 0;
                        while(r < c.length && !l){
                            if (!c[r]) {
                                break;
                            }
                            l = c[r++].exec(i);
                            if (!!l) {
                                for(n = 0; n < u.length; n++){
                                    d = l[++t];
                                    b = u[n];
                                    if (typeof b === w && b.length > 0) {
                                        if (b.length === 2) {
                                            if (typeof b[1] == s) {
                                                this[b[0]] = b[1].call(this, d);
                                            } else {
                                                this[b[0]] = b[1];
                                            }
                                        } else if (b.length === 3) {
                                            if (typeof b[1] === s && !(b[1].exec && b[1].test)) {
                                                this[b[0]] = d ? b[1].call(this, d, b[2]) : a;
                                            } else {
                                                this[b[0]] = d ? d.replace(b[1], b[2]) : a;
                                            }
                                        } else if (b.length === 4) {
                                            this[b[0]] = d ? b[3].call(this, d.replace(b[1], b[2])) : a;
                                        }
                                    } else {
                                        this[b] = d ? d : a;
                                    }
                                }
                            }
                        }
                        o += 2;
                    }
                }, strMapper = function(i, e) {
                    for(var o in e){
                        if (typeof e[o] === w && e[o].length > 0) {
                            for(var r = 0; r < e[o].length; r++){
                                if (has(e[o][r], i)) {
                                    return o === n ? a : o;
                                }
                            }
                        } else if (has(e[o], i)) {
                            return o === n ? a : o;
                        }
                    }
                    return i;
                };
                var $ = {
                    "1.0": "/8",
                    1.2: "/1",
                    1.3: "/3",
                    "2.0": "/412",
                    "2.0.2": "/416",
                    "2.0.3": "/417",
                    "2.0.4": "/419",
                    "?": "/"
                }, X = {
                    ME: "4.90",
                    "NT 3.11": "NT3.51",
                    "NT 4.0": "NT4.0",
                    2e3: "NT 5.0",
                    XP: [
                        "NT 5.1",
                        "NT 5.2"
                    ],
                    Vista: "NT 6.0",
                    7: "NT 6.1",
                    8: "NT 6.2",
                    8.1: "NT 6.3",
                    10: [
                        "NT 6.4",
                        "NT 10.0"
                    ],
                    RT: "ARM"
                };
                var K = {
                    browser: [
                        [
                            /\b(?:crmo|crios)\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Chrome"
                            ]
                        ],
                        [
                            /edg(?:e|ios|a)?\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Edge"
                            ]
                        ],
                        [
                            /(opera mini)\/([-\w\.]+)/i,
                            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /opios[\/ ]+([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                B + " Mini"
                            ]
                        ],
                        [
                            /\bopr\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                B
                            ]
                        ],
                        [
                            /(kindle)\/([\w\.]+)/i,
                            /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                            /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
                            /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
                            /(?:ms|\()(ie) ([\w\.]+)/i,
                            /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                            /(heytap|ovi)browser\/([\d\.]+)/i,
                            /(weibo)__([\d\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "UC" + A
                            ]
                        ],
                        [
                            /microm.+\bqbcore\/([\w\.]+)/i,
                            /\bqbcore\/([\w\.]+).+microm/i
                        ],
                        [
                            f,
                            [
                                u,
                                "WeChat(Win) Desktop"
                            ]
                        ],
                        [
                            /micromessenger\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "WeChat"
                            ]
                        ],
                        [
                            /konqueror\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Konqueror"
                            ]
                        ],
                        [
                            /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
                        ],
                        [
                            f,
                            [
                                u,
                                "IE"
                            ]
                        ],
                        [
                            /ya(?:search)?browser\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Yandex"
                            ]
                        ],
                        [
                            /(avast|avg)\/([\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                /(.+)/,
                                "$1 Secure " + A
                            ],
                            f
                        ],
                        [
                            /\bfocus\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                O + " Focus"
                            ]
                        ],
                        [
                            /\bopt\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                B + " Touch"
                            ]
                        ],
                        [
                            /coc_coc\w+\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Coc Coc"
                            ]
                        ],
                        [
                            /dolfin\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Dolphin"
                            ]
                        ],
                        [
                            /coast\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                B + " Coast"
                            ]
                        ],
                        [
                            /miuibrowser\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "MIUI " + A
                            ]
                        ],
                        [
                            /fxios\/([-\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                O
                            ]
                        ],
                        [
                            /\bqihu|(qi?ho?o?|360)browser/i
                        ],
                        [
                            [
                                u,
                                "360 " + A
                            ]
                        ],
                        [
                            /(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                /(.+)/,
                                "$1 " + A
                            ],
                            f
                        ],
                        [
                            /(comodo_dragon)\/([\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                /_/g,
                                " "
                            ],
                            f
                        ],
                        [
                            /(electron)\/([\w\.]+) safari/i,
                            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                            /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(metasr)[\/ ]?([\w\.]+)/i,
                            /(lbbrowser)/i,
                            /\[(linkedin)app\]/i
                        ],
                        [
                            u
                        ],
                        [
                            /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
                        ],
                        [
                            [
                                u,
                                H
                            ],
                            f
                        ],
                        [
                            /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
                            /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
                            /safari (line)\/([\w\.]+)/i,
                            /\b(line)\/([\w\.]+)\/iab/i,
                            /(chromium|instagram)[\/ ]([-\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /\bgsa\/([\w\.]+) .*safari\//i
                        ],
                        [
                            f,
                            [
                                u,
                                "GSA"
                            ]
                        ],
                        [
                            /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "TikTok"
                            ]
                        ],
                        [
                            /headlesschrome(?:\/([\w\.]+)| )/i
                        ],
                        [
                            f,
                            [
                                u,
                                C + " Headless"
                            ]
                        ],
                        [
                            / wv\).+(chrome)\/([\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                C + " WebView"
                            ],
                            f
                        ],
                        [
                            /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Android " + A
                            ]
                        ],
                        [
                            /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Mobile Safari"
                            ]
                        ],
                        [
                            /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i
                        ],
                        [
                            f,
                            u
                        ],
                        [
                            /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
                        ],
                        [
                            u,
                            [
                                f,
                                strMapper,
                                $
                            ]
                        ],
                        [
                            /(webkit|khtml)\/([\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(navigator|netscape\d?)\/([-\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                "Netscape"
                            ],
                            f
                        ],
                        [
                            /mobile vr; rv:([\w\.]+)\).+firefox/i
                        ],
                        [
                            f,
                            [
                                u,
                                O + " Reality"
                            ]
                        ],
                        [
                            /ekiohf.+(flow)\/([\w\.]+)/i,
                            /(swiftfox)/i,
                            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                            /(firefox)\/([\w\.]+)/i,
                            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                            /(links) \(([\w\.]+)/i,
                            /panasonic;(viera)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(cobalt)\/([\w\.]+)/i
                        ],
                        [
                            u,
                            [
                                f,
                                /master.|lts./,
                                ""
                            ]
                        ]
                    ],
                    cpu: [
                        [
                            /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i
                        ],
                        [
                            [
                                h,
                                "amd64"
                            ]
                        ],
                        [
                            /(ia32(?=;))/i
                        ],
                        [
                            [
                                h,
                                lowerize
                            ]
                        ],
                        [
                            /((?:i[346]|x)86)[;\)]/i
                        ],
                        [
                            [
                                h,
                                "ia32"
                            ]
                        ],
                        [
                            /\b(aarch64|arm(v?8e?l?|_?64))\b/i
                        ],
                        [
                            [
                                h,
                                "arm64"
                            ]
                        ],
                        [
                            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
                        ],
                        [
                            [
                                h,
                                "armhf"
                            ]
                        ],
                        [
                            /windows (ce|mobile); ppc;/i
                        ],
                        [
                            [
                                h,
                                "arm"
                            ]
                        ],
                        [
                            /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i
                        ],
                        [
                            [
                                h,
                                /ower/,
                                t,
                                lowerize
                            ]
                        ],
                        [
                            /(sun4\w)[;\)]/i
                        ],
                        [
                            [
                                h,
                                "sparc"
                            ]
                        ],
                        [
                            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
                        ],
                        [
                            [
                                h,
                                lowerize
                            ]
                        ]
                    ],
                    device: [
                        [
                            /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
                        ],
                        [
                            c,
                            [
                                m,
                                V
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
                            /samsung[- ]([-\w]+)/i,
                            /sec-(sgh\w+)/i
                        ],
                        [
                            c,
                            [
                                m,
                                V
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i
                        ],
                        [
                            c,
                            [
                                m,
                                S
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\((ipad);[-\w\),; ]+apple/i,
                            /applecoremedia\/[\w\.]+ \((ipad)/i,
                            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
                        ],
                        [
                            c,
                            [
                                m,
                                S
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(macintosh);/i
                        ],
                        [
                            c,
                            [
                                m,
                                S
                            ]
                        ],
                        [
                            /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
                        ],
                        [
                            c,
                            [
                                m,
                                D
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
                        ],
                        [
                            c,
                            [
                                m,
                                j
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(?:huawei|honor)([-\w ]+)[;\)]/i,
                            /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
                        ],
                        [
                            c,
                            [
                                m,
                                j
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(poco[\w ]+)(?: bui|\))/i,
                            /\b; (\w+) build\/hm\1/i,
                            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i
                        ],
                        [
                            [
                                c,
                                /_/g,
                                " "
                            ],
                            [
                                m,
                                F
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i
                        ],
                        [
                            [
                                c,
                                /_/g,
                                " "
                            ],
                            [
                                m,
                                F
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /; (\w+) bui.+ oppo/i,
                            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "OPPO"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /vivo (\w+)(?: bui|\))/i,
                            /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Vivo"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(rmx[12]\d{3})(?: bui|;|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Realme"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                            /\bmot(?:orola)?[- ](\w*)/i,
                            /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
                        ],
                        [
                            c,
                            [
                                m,
                                M
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(mz60\d|xoom[2 ]{0,2}) build\//i
                        ],
                        [
                            c,
                            [
                                m,
                                M
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
                        ],
                        [
                            c,
                            [
                                m,
                                P
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                            /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                            /\blg-?([\d\w]+) bui/i
                        ],
                        [
                            c,
                            [
                                m,
                                P
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(ideatab[-\w ]+)/i,
                            /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Lenovo"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(?:maemo|nokia).*(n900|lumia \d+)/i,
                            /nokia[-_ ]?([-\w\.]*)/i
                        ],
                        [
                            [
                                c,
                                /_/g,
                                " "
                            ],
                            [
                                m,
                                "Nokia"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(pixel c)\b/i
                        ],
                        [
                            c,
                            [
                                m,
                                U
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                U
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
                        ],
                        [
                            c,
                            [
                                m,
                                I
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /sony tablet [ps]/i,
                            /\b(?:sony)?sgp\w+(?: bui|\))/i
                        ],
                        [
                            [
                                c,
                                "Xperia Tablet"
                            ],
                            [
                                m,
                                I
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            / (kb2005|in20[12]5|be20[12][59])\b/i,
                            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                "OnePlus"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(alexa)webm/i,
                            /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
                            /(kf[a-z]+)( bui|\)).+silk\//i
                        ],
                        [
                            c,
                            [
                                m,
                                T
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
                        ],
                        [
                            [
                                c,
                                /(.+)/g,
                                "Fire Phone $1"
                            ],
                            [
                                m,
                                T
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(playbook);[-\w\),; ]+(rim)/i
                        ],
                        [
                            c,
                            m,
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((?:bb[a-f]|st[hv])100-\d)/i,
                            /\(bb10; (\w+)/i
                        ],
                        [
                            c,
                            [
                                m,
                                N
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
                        ],
                        [
                            c,
                            [
                                m,
                                z
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
                        ],
                        [
                            c,
                            [
                                m,
                                z
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(nexus 9)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "HTC"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                            /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
                        ],
                        [
                            m,
                            [
                                c,
                                /_/g,
                                " "
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Acer"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /droid.+; (m[1-5] note) bui/i,
                            /\bmz-([-\w]{2,})/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Meizu"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
                            /(hp) ([\w ]+\w)/i,
                            /(asus)-?(\w+)/i,
                            /(microsoft); (lumia[\w ]+)/i,
                            /(lenovo)[-_ ]?([-\w]+)/i,
                            /(jolla)/i,
                            /(oppo) ?([\w ]+) bui/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(kobo)\s(ereader|touch)/i,
                            /(archos) (gamepad2?)/i,
                            /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                            /(kindle)\/([\w\.]+)/i,
                            /(nook)[\w ]+build\/(\w+)/i,
                            /(dell) (strea[kpr\d ]*[\dko])/i,
                            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                            /(trinity)[- ]*(t\d{3}) bui/i,
                            /(gigaset)[- ]+(q\w{1,9}) bui/i,
                            /(vodafone) ([\w ]+)(?:\)| bui)/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(surface duo)/i
                        ],
                        [
                            c,
                            [
                                m,
                                R
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /droid [\d\.]+; (fp\du?)(?: b|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Fairphone"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(u304aa)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "AT&T"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\bsie-(\w*)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Siemens"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(rct\w+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "RCA"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(venue[\d ]{2,7}) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Dell"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(q(?:mv|ta)\w+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Verizon"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Barnes & Noble"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(tm\d{3}\w+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "NuVision"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(k88) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "ZTE"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(nx\d{3}j) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "ZTE"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(gen\d{3}) b.+49h/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Swiss"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(zur\d{3}) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Swiss"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((zeki)?tb.*\b) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Zeki"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b([yr]\d{2}) b/i,
                            /\b(dragon[- ]+touch |dt)(\w{5}) b/i
                        ],
                        [
                            [
                                m,
                                "Dragon Touch"
                            ],
                            c,
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(ns-?\w{0,9}) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Insignia"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((nxa|next)-?\w{0,9}) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "NextBook"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i
                        ],
                        [
                            [
                                m,
                                "Voice"
                            ],
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(lvtel\-)?(v1[12]) b/i
                        ],
                        [
                            [
                                m,
                                "LvTel"
                            ],
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(ph-1) /i
                        ],
                        [
                            c,
                            [
                                m,
                                "Essential"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(v(100md|700na|7011|917g).*\b) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Envizen"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(trio[-\w\. ]+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "MachSpeed"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\btu_(1491) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Rotor"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(shield[\w ]+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Nvidia"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(sprint) (\w+)/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(kin\.[onetw]{3})/i
                        ],
                        [
                            [
                                c,
                                /\./g,
                                " "
                            ],
                            [
                                m,
                                R
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
                        ],
                        [
                            c,
                            [
                                m,
                                G
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
                        ],
                        [
                            c,
                            [
                                m,
                                G
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /smart-tv.+(samsung)/i
                        ],
                        [
                            m,
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /hbbtv.+maple;(\d+)/i
                        ],
                        [
                            [
                                c,
                                /^/,
                                "SmartTV"
                            ],
                            [
                                m,
                                V
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
                        ],
                        [
                            [
                                m,
                                P
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(apple) ?tv/i
                        ],
                        [
                            m,
                            [
                                c,
                                S + " TV"
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /crkey/i
                        ],
                        [
                            [
                                c,
                                C + "cast"
                            ],
                            [
                                m,
                                U
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /droid.+aft(\w)( bui|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                T
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /\(dtv[\);].+(aquos)/i,
                            /(aquos-tv[\w ]+)\)/i
                        ],
                        [
                            c,
                            [
                                m,
                                D
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(bravia[\w ]+)( bui|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                I
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(mitv-\w{5}) bui/i
                        ],
                        [
                            c,
                            [
                                m,
                                F
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /Hbbtv.*(technisat) (.*);/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
                            /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i
                        ],
                        [
                            [
                                m,
                                trim
                            ],
                            [
                                c,
                                trim
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
                        ],
                        [
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(ouya)/i,
                            /(nintendo) ([wids3utch]+)/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                v
                            ]
                        ],
                        [
                            /droid.+; (shield) bui/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Nvidia"
                            ],
                            [
                                p,
                                v
                            ]
                        ],
                        [
                            /(playstation [345portablevi]+)/i
                        ],
                        [
                            c,
                            [
                                m,
                                I
                            ],
                            [
                                p,
                                v
                            ]
                        ],
                        [
                            /\b(xbox(?: one)?(?!; xbox))[\); ]/i
                        ],
                        [
                            c,
                            [
                                m,
                                R
                            ],
                            [
                                p,
                                v
                            ]
                        ],
                        [
                            /((pebble))app/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i
                        ],
                        [
                            c,
                            [
                                m,
                                S
                            ],
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /droid.+; (glass) \d/i
                        ],
                        [
                            c,
                            [
                                m,
                                U
                            ],
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /droid.+; (wt63?0{2,3})\)/i
                        ],
                        [
                            c,
                            [
                                m,
                                G
                            ],
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /(quest( 2| pro)?)/i
                        ],
                        [
                            c,
                            [
                                m,
                                H
                            ],
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
                        ],
                        [
                            m,
                            [
                                p,
                                y
                            ]
                        ],
                        [
                            /(aeobc)\b/i
                        ],
                        [
                            c,
                            [
                                m,
                                T
                            ],
                            [
                                p,
                                y
                            ]
                        ],
                        [
                            /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i
                        ],
                        [
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
                        ],
                        [
                            c,
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
                        ],
                        [
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i
                        ],
                        [
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(android[-\w\. ]{0,9});.+buil/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Generic"
                            ]
                        ]
                    ],
                    engine: [
                        [
                            /windows.+ edge\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                E + "HTML"
                            ]
                        ],
                        [
                            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Blink"
                            ]
                        ],
                        [
                            /(presto)\/([\w\.]+)/i,
                            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                            /ekioh(flow)\/([\w\.]+)/i,
                            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                            /(icab)[\/ ]([23]\.[\d\.]+)/i,
                            /\b(libweb)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /rv\:([\w\.]{1,9})\b.+(gecko)/i
                        ],
                        [
                            f,
                            u
                        ]
                    ],
                    os: [
                        [
                            /microsoft (windows) (vista|xp)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(windows) nt 6\.2; (arm)/i,
                            /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
                            /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i
                        ],
                        [
                            u,
                            [
                                f,
                                strMapper,
                                X
                            ]
                        ],
                        [
                            /(win(?=3|9|n)|win 9x )([nt\d\.]+)/i
                        ],
                        [
                            [
                                u,
                                "Windows"
                            ],
                            [
                                f,
                                strMapper,
                                X
                            ]
                        ],
                        [
                            /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
                            /ios;fbsv\/([\d\.]+)/i,
                            /cfnetwork\/.+darwin/i
                        ],
                        [
                            [
                                f,
                                /_/g,
                                "."
                            ],
                            [
                                u,
                                "iOS"
                            ]
                        ],
                        [
                            /(mac os x) ?([\w\. ]*)/i,
                            /(macintosh|mac_powerpc\b)(?!.+haiku)/i
                        ],
                        [
                            [
                                u,
                                Z
                            ],
                            [
                                f,
                                /_/g,
                                "."
                            ]
                        ],
                        [
                            /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i
                        ],
                        [
                            f,
                            u
                        ],
                        [
                            /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                            /(blackberry)\w*\/([\w\.]*)/i,
                            /(tizen|kaios)[\/ ]([\w\.]+)/i,
                            /\((series40);/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /\(bb(10);/i
                        ],
                        [
                            f,
                            [
                                u,
                                N
                            ]
                        ],
                        [
                            /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Symbian"
                            ]
                        ],
                        [
                            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                O + " OS"
                            ]
                        ],
                        [
                            /web0s;.+rt(tv)/i,
                            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "webOS"
                            ]
                        ],
                        [
                            /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "watchOS"
                            ]
                        ],
                        [
                            /crkey\/([\d\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                C + "cast"
                            ]
                        ],
                        [
                            /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i
                        ],
                        [
                            [
                                u,
                                L
                            ],
                            f
                        ],
                        [
                            /panasonic;(viera)/i,
                            /(netrange)mmh/i,
                            /(nettv)\/(\d+\.[\w\.]+)/i,
                            /(nintendo|playstation) ([wids345portablevuch]+)/i,
                            /(xbox); +xbox ([^\);]+)/i,
                            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                            /(mint)[\/\(\) ]?(\w*)/i,
                            /(mageia|vectorlinux)[; ]/i,
                            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                            /(hurd|linux) ?([\w\.]*)/i,
                            /(gnu) ?([\w\.]*)/i,
                            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                            /(haiku) (\w+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(sunos) ?([\w\.\d]*)/i
                        ],
                        [
                            [
                                u,
                                "Solaris"
                            ],
                            f
                        ],
                        [
                            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
                            /(unix) ?([\w\.]*)/i
                        ],
                        [
                            u,
                            f
                        ]
                    ]
                };
                var UAParser = function(i, e) {
                    if (typeof i === w) {
                        e = i;
                        i = a;
                    }
                    if (!(this instanceof UAParser)) {
                        return new UAParser(i, e).getResult();
                    }
                    var r = typeof o !== b && o.navigator ? o.navigator : a;
                    var n = i || (r && r.userAgent ? r.userAgent : t);
                    var v = r && r.userAgentData ? r.userAgentData : a;
                    var x = e ? extend(K, e) : K;
                    var _ = r && r.userAgent == n;
                    this.getBrowser = function() {
                        var i = {};
                        i[u] = a;
                        i[f] = a;
                        rgxMapper.call(i, n, x.browser);
                        i[d] = majorize(i[f]);
                        if (_ && r && r.brave && typeof r.brave.isBrave == s) {
                            i[u] = "Brave";
                        }
                        return i;
                    };
                    this.getCPU = function() {
                        var i = {};
                        i[h] = a;
                        rgxMapper.call(i, n, x.cpu);
                        return i;
                    };
                    this.getDevice = function() {
                        var i = {};
                        i[m] = a;
                        i[c] = a;
                        i[p] = a;
                        rgxMapper.call(i, n, x.device);
                        if (_ && !i[p] && v && v.mobile) {
                            i[p] = g;
                        }
                        if (_ && i[c] == "Macintosh" && r && typeof r.standalone !== b && r.maxTouchPoints && r.maxTouchPoints > 2) {
                            i[c] = "iPad";
                            i[p] = k;
                        }
                        return i;
                    };
                    this.getEngine = function() {
                        var i = {};
                        i[u] = a;
                        i[f] = a;
                        rgxMapper.call(i, n, x.engine);
                        return i;
                    };
                    this.getOS = function() {
                        var i = {};
                        i[u] = a;
                        i[f] = a;
                        rgxMapper.call(i, n, x.os);
                        if (_ && !i[u] && v && v.platform != "Unknown") {
                            i[u] = v.platform.replace(/chrome os/i, L).replace(/macos/i, Z);
                        }
                        return i;
                    };
                    this.getResult = function() {
                        return {
                            ua: this.getUA(),
                            browser: this.getBrowser(),
                            engine: this.getEngine(),
                            os: this.getOS(),
                            device: this.getDevice(),
                            cpu: this.getCPU()
                        };
                    };
                    this.getUA = function() {
                        return n;
                    };
                    this.setUA = function(i) {
                        n = typeof i === l && i.length > q ? trim(i, q) : i;
                        return this;
                    };
                    this.setUA(n);
                    return this;
                };
                UAParser.VERSION = r;
                UAParser.BROWSER = enumerize([
                    u,
                    f,
                    d
                ]);
                UAParser.CPU = enumerize([
                    h
                ]);
                UAParser.DEVICE = enumerize([
                    c,
                    m,
                    p,
                    v,
                    g,
                    x,
                    k,
                    _,
                    y
                ]);
                UAParser.ENGINE = UAParser.OS = enumerize([
                    u,
                    f
                ]);
                if (typeof e !== b) {
                    if ("object" !== b && i.exports) {
                        e = i.exports = UAParser;
                    }
                    e.UAParser = UAParser;
                } else {
                    if (typeof define === s && define.amd) {
                        ((r)=>r !== undefined && __turbopack_export_value__(r))(function() {
                            return UAParser;
                        }(__turbopack_require__, exports, module));
                    } else if (typeof o !== b) {
                        o.UAParser = UAParser;
                    }
                }
                var Q = typeof o !== b && (o.jQuery || o.Zepto);
                if (Q && !Q.ua) {
                    var Y = new UAParser;
                    Q.ua = Y.getResult();
                    Q.ua.get = function() {
                        return Y.getUA();
                    };
                    Q.ua.set = function(i) {
                        Y.setUA(i);
                        var e = Y.getResult();
                        for(var o in e){
                            Q.ua[o] = e[o];
                        }
                    };
                }
            })(("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : this);
        }
    };
    var e = {};
    function __nccwpck_require__(o) {
        var a = e[o];
        if (a !== undefined) {
            return a.exports;
        }
        var r = e[o] = {
            exports: {}
        };
        var t = true;
        try {
            i[o].call(r.exports, r, r.exports, __nccwpck_require__);
            t = false;
        } finally{
            if (t) delete e[o];
        }
        return r.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var o = __nccwpck_require__(226);
    module.exports = o;
})();

}.call(this) }),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/user-agent.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "isBot": ()=>isBot,
    "userAgent": ()=>userAgent,
    "userAgentFromString": ()=>userAgentFromString
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$ua$2d$parser$2d$js$2f$ua$2d$parser$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/ua-parser-js/ua-parser.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
function isBot(input) {
    return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(input);
}
function userAgentFromString(input) {
    return {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$ua$2d$parser$2d$js$2f$ua$2d$parser$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(input),
        isBot: input === undefined ? false : isBot(input)
    };
}
function userAgent({ headers }) {
    return userAgentFromString(headers.get('user-agent') || undefined);
} //# sourceMappingURL=user-agent.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/url-pattern.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "URLPattern": ()=>GlobalURLPattern
});
const GlobalURLPattern = typeof URLPattern === 'undefined' ? undefined : URLPattern;
;
 //# sourceMappingURL=url-pattern.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/static-generation-bailout.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "StaticGenBailoutError": ()=>StaticGenBailoutError,
    "isStaticGenBailoutError": ()=>isStaticGenBailoutError
});
const NEXT_STATIC_GEN_BAILOUT = 'NEXT_STATIC_GEN_BAILOUT';
class StaticGenBailoutError extends Error {
    constructor(...args){
        super(...args);
        this.code = NEXT_STATIC_GEN_BAILOUT;
    }
}
function isStaticGenBailoutError(error) {
    if (typeof error !== 'object' || error === null || !('code' in error)) {
        return false;
    }
    return error.code === NEXT_STATIC_GEN_BAILOUT;
} //# sourceMappingURL=static-generation-bailout.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/react-experimental/cjs/react.react-server.development.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

/**
 * @license React
 * react.react-server.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
if ("TURBOPACK compile-time truthy", 1) {
    (function() {
        'use strict';
        var TaintRegistryObjects$1 = new WeakMap();
        var TaintRegistryValues$1 = new Map(); // Byte lengths of all binary values we've ever seen. We don't both refcounting this.
        // We expect to see only a few lengths here such as the length of token.
        var TaintRegistryByteLengths$1 = new Set(); // When a value is finalized, it means that it has been removed from any global caches.
        // No future requests can get a handle on it but any ongoing requests can still have
        // a handle on it. It's still tainted until that happens.
        var TaintRegistryPendingRequests$1 = new Set();
        // -----------------------------------------------------------------------------
        var enableScopeAPI = false; // Experimental Create Event Handle API.
        var enableTransitionTracing = false; // No known bugs, but needs performance testing
        var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
        // as a normal prop instead of stripping it from the props object.
        // Passes `ref` as a normal prop instead of stripping it from the props object
        // during element creation.
        var enableRefAsProp = true;
        var enableRenderableContext = true; // Enables the `initialValue` option for `useDeferredValue`
        // stuff. Intended to enable React core members to more easily debug scheduling
        // issues in DEV builds.
        var enableDebugTracing = false;
        var ReactSharedInternals = {
            H: null,
            A: null
        };
        {
            ReactSharedInternals.TaintRegistryObjects = TaintRegistryObjects$1;
            ReactSharedInternals.TaintRegistryValues = TaintRegistryValues$1;
            ReactSharedInternals.TaintRegistryByteLengths = TaintRegistryByteLengths$1;
            ReactSharedInternals.TaintRegistryPendingRequests = TaintRegistryPendingRequests$1;
        }
        {
            // Stack implementation injected by the current renderer.
            ReactSharedInternals.getCurrentStack = null;
        }
        // by calls to these methods by a Babel plugin.
        //
        // In PROD (or in packages without access to React internals),
        // they are left as they are instead.
        function warn(format) {
            {
                {
                    for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                        args[_key - 1] = arguments[_key];
                    }
                    printWarning('warn', format, args, new Error('react-stack-top-frame'));
                }
            }
        }
        function error(format) {
            {
                {
                    for(var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++){
                        args[_key2 - 1] = arguments[_key2];
                    }
                    printWarning('error', format, args, new Error('react-stack-top-frame'));
                }
            }
        } // eslint-disable-next-line react-internal/no-production-logging
        var supportsCreateTask = !!console.createTask;
        function printWarning(level, format, args, currentStack) {
            // When changing this logic, you might want to also
            // update consoleWithStackDev.www.js as well.
            {
                var isErrorLogger = format === '%s\n\n%s\n' || format === '%o\n\n%s\n\n%s\n';
                if (!supportsCreateTask && ReactSharedInternals.getCurrentStack) {
                    // We only add the current stack to the console when createTask is not supported.
                    // Since createTask requires DevTools to be open to work, this means that stacks
                    // can be lost while DevTools isn't open but we can't detect this.
                    var stack = ReactSharedInternals.getCurrentStack(currentStack);
                    if (stack !== '') {
                        format += '%s';
                        args = args.concat([
                            stack
                        ]);
                    }
                }
                if (isErrorLogger) {
                    // Don't prefix our default logging formatting in ReactFiberErrorLoggger.
                    // Don't toString the arguments.
                    args.unshift(format);
                } else {
                    // TODO: Remove this prefix and stop toStringing in the wrapper and
                    // instead do it at each callsite as needed.
                    // Careful: RN currently depends on this prefix
                    // eslint-disable-next-line react-internal/safe-string-coercion
                    args = args.map(function(item) {
                        return String(item);
                    });
                    args.unshift('Warning: ' + format);
                } // We intentionally don't use spread (or .apply) directly because it
                // breaks IE9: https://github.com/facebook/react/issues/13610
                // eslint-disable-next-line react-internal/no-production-logging
                Function.prototype.apply.call(console[level], console, args);
            }
        }
        var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare
        function isArray(a) {
            return isArrayImpl(a);
        }
        var REACT_ELEMENT_TYPE = Symbol.for('react.transitional.element');
        var REACT_PORTAL_TYPE = Symbol.for('react.portal');
        var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
        var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
        var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
        var REACT_PROVIDER_TYPE = Symbol.for('react.provider'); // TODO: Delete with enableRenderableContext
        var REACT_CONSUMER_TYPE = Symbol.for('react.consumer');
        var REACT_CONTEXT_TYPE = Symbol.for('react.context');
        var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
        var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
        var REACT_MEMO_TYPE = Symbol.for('react.memo');
        var REACT_LAZY_TYPE = Symbol.for('react.lazy');
        var REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for('react.debug_trace_mode');
        var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
        var REACT_POSTPONE_TYPE = Symbol.for('react.postpone');
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = '@@iterator';
        function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable !== 'object') {
                return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === 'function') {
                return maybeIterator;
            }
            return null;
        }
        /*
 * The `'' + value` pattern (used in perf-sensitive code) throws for Symbol
 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
 *
 * The functions in this module will throw an easier-to-understand,
 * easier-to-debug exception with a clear errors message message explaining the
 * problem. (Instead of a confusing exception thrown inside the implementation
 * of the `value` object).
 */ // $FlowFixMe[incompatible-return] only called in DEV, so void return is not possible.
        function typeName(value) {
            {
                // toStringTag is needed for namespaced types like Temporal.Instant
                var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
                var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object'; // $FlowFixMe[incompatible-return]
                return type;
            }
        } // $FlowFixMe[incompatible-return] only called in DEV, so void return is not possible.
        function willCoercionThrow(value) {
            {
                try {
                    testStringCoercion(value);
                    return false;
                } catch (e) {
                    return true;
                }
            }
        }
        function testStringCoercion(value) {
            // If you ended up here by following an exception call stack, here's what's
            // happened: you supplied an object or symbol value to React (as a prop, key,
            // DOM attribute, CSS property, string ref, etc.) and when React tried to
            // coerce it to a string using `'' + value`, an exception was thrown.
            //
            // The most common types that will cause this exception are `Symbol` instances
            // and Temporal objects like `Temporal.Instant`. But any object that has a
            // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
            // exception. (Library authors do this to prevent users from using built-in
            // numeric operators like `+` or comparison operators like `>=` because custom
            // methods are needed to perform accurate arithmetic or comparison.)
            //
            // To fix the problem, coerce this object or symbol value to a string before
            // passing it to React. The most reliable way is usually `String(value)`.
            //
            // To find which value is throwing, check the browser or debugger console.
            // Before this exception was thrown, there should be `console.error` output
            // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
            // problem and how that type was used: key, atrribute, input value prop, etc.
            // In most cases, this console output also shows the component and its
            // ancestor components where the exception happened.
            //
            // eslint-disable-next-line react-internal/safe-string-coercion
            return '' + value;
        }
        function checkKeyStringCoercion(value) {
            {
                if (willCoercionThrow(value)) {
                    error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before using it here.', typeName(value));
                    return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
                }
            }
        }
        function getWrappedName(outerType, innerType, wrapperName) {
            var displayName = outerType.displayName;
            if (displayName) {
                return displayName;
            }
            var functionName = innerType.displayName || innerType.name || '';
            return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
        } // Keep in sync with react-reconciler/getComponentNameFromFiber
        function getContextName(type) {
            return type.displayName || 'Context';
        }
        var REACT_CLIENT_REFERENCE$2 = Symbol.for('react.client.reference'); // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.
        function getComponentNameFromType(type) {
            if (type == null) {
                // Host root, text node or just invalid type.
                return null;
            }
            if (typeof type === 'function') {
                if (type.$$typeof === REACT_CLIENT_REFERENCE$2) {
                    // TODO: Create a convention for naming client references with debug info.
                    return null;
                }
                return type.displayName || type.name || null;
            }
            if (typeof type === 'string') {
                return type;
            }
            switch(type){
                case REACT_FRAGMENT_TYPE:
                    return 'Fragment';
                case REACT_PORTAL_TYPE:
                    return 'Portal';
                case REACT_PROFILER_TYPE:
                    return 'Profiler';
                case REACT_STRICT_MODE_TYPE:
                    return 'StrictMode';
                case REACT_SUSPENSE_TYPE:
                    return 'Suspense';
                case REACT_SUSPENSE_LIST_TYPE:
                    return 'SuspenseList';
            }
            if (typeof type === 'object') {
                {
                    if (typeof type.tag === 'number') {
                        error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
                    }
                }
                switch(type.$$typeof){
                    case REACT_PROVIDER_TYPE:
                        {
                            return null;
                        }
                    case REACT_CONTEXT_TYPE:
                        var context = type;
                        {
                            return getContextName(context) + '.Provider';
                        }
                    case REACT_CONSUMER_TYPE:
                        {
                            var consumer = type;
                            return getContextName(consumer._context) + '.Consumer';
                        }
                    case REACT_FORWARD_REF_TYPE:
                        return getWrappedName(type, type.render, 'ForwardRef');
                    case REACT_MEMO_TYPE:
                        var outerName = type.displayName || null;
                        if (outerName !== null) {
                            return outerName;
                        }
                        return getComponentNameFromType(type.type) || 'Memo';
                    case REACT_LAZY_TYPE:
                        {
                            var lazyComponent = type;
                            var payload = lazyComponent._payload;
                            var init = lazyComponent._init;
                            try {
                                return getComponentNameFromType(init(payload));
                            } catch (x) {
                                return null;
                            }
                        }
                }
            }
            return null;
        }
        // $FlowFixMe[method-unbinding]
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var assign = Object.assign;
        var REACT_CLIENT_REFERENCE$1 = Symbol.for('react.client.reference'); // This function is deprecated. Don't use. Only the renderer knows what a valid type is.
        // TODO: Delete this when enableOwnerStacks ships.
        function isValidElementType(type) {
            if (typeof type === 'string' || typeof type === 'function') {
                return true;
            } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).
            if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableTransitionTracing) {
                return true;
            }
            if (typeof type === 'object' && type !== null) {
                if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || !enableRenderableContext || type.$$typeof === REACT_CONSUMER_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
                // types supported by any Flight configuration anywhere since
                // we don't know which Flight build this will end up being used
                // with.
                type.$$typeof === REACT_CLIENT_REFERENCE$1 || type.getModuleId !== undefined) {
                    return true;
                }
            }
            return false;
        }
        {
            var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
            new PossiblyWeakMap();
        }
        var REACT_CLIENT_REFERENCE = Symbol.for('react.client.reference');
        var createTask = console.createTask ? console.createTask : function() {
            return null;
        };
        function getTaskName(type) {
            if (type === REACT_FRAGMENT_TYPE) {
                return '<>';
            }
            if (typeof type === 'object' && type !== null && type.$$typeof === REACT_LAZY_TYPE) {
                // We don't want to eagerly initialize the initializer in DEV mode so we can't
                // call it to extract the type so we don't know the type of this component.
                return '<...>';
            }
            try {
                var name = getComponentNameFromType(type);
                return name ? '<' + name + '>' : '<...>';
            } catch (x) {
                return '<...>';
            }
        }
        function getOwner() {
            {
                var dispatcher = ReactSharedInternals.A;
                if (dispatcher === null) {
                    return null;
                }
                return dispatcher.getOwner();
            }
        }
        var specialPropKeyWarningShown;
        var didWarnAboutElementRef;
        var didWarnAboutOldJSXRuntime;
        {
            didWarnAboutElementRef = {};
        }
        function hasValidRef(config) {
            {
                if (hasOwnProperty.call(config, 'ref')) {
                    var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
                    if (getter && getter.isReactWarning) {
                        return false;
                    }
                }
            }
            return config.ref !== undefined;
        }
        function hasValidKey(config) {
            {
                if (hasOwnProperty.call(config, 'key')) {
                    var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
                    if (getter && getter.isReactWarning) {
                        return false;
                    }
                }
            }
            return config.key !== undefined;
        }
        function defineKeyPropWarningGetter(props, displayName) {
            {
                var warnAboutAccessingKey = function() {
                    if (!specialPropKeyWarningShown) {
                        specialPropKeyWarningShown = true;
                        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://react.dev/link/special-props)', displayName);
                    }
                };
                warnAboutAccessingKey.isReactWarning = true;
                Object.defineProperty(props, 'key', {
                    get: warnAboutAccessingKey,
                    configurable: true
                });
            }
        }
        function elementRefGetterWithDeprecationWarning() {
            {
                var componentName = getComponentNameFromType(this.type);
                if (!didWarnAboutElementRef[componentName]) {
                    didWarnAboutElementRef[componentName] = true;
                    error('Accessing element.ref was removed in React 19. ref is now a ' + 'regular prop. It will be removed from the JSX Element ' + 'type in a future release.');
                } // An undefined `element.ref` is coerced to `null` for
                // backwards compatibility.
                var refProp = this.props.ref;
                return refProp !== undefined ? refProp : null;
            }
        }
        /**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.transitional.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */ function ReactElement(type, key, _ref, self, source, owner, props, debugStack, debugTask) {
            var ref;
            {
                // When enableRefAsProp is on, ignore whatever was passed as the ref
                // argument and treat `props.ref` as the source of truth. The only thing we
                // use this for is `element.ref`, which will log a deprecation warning on
                // access. In the next release, we can remove `element.ref` as well as the
                // `ref` argument.
                var refProp = props.ref; // An undefined `element.ref` is coerced to `null` for
                // backwards compatibility.
                ref = refProp !== undefined ? refProp : null;
            }
            var element;
            {
                // In dev, make `ref` a non-enumerable property with a warning. It's non-
                // enumerable so that test matchers and serializers don't access it and
                // trigger the warning.
                //
                // `ref` will be removed from the element completely in a future release.
                element = {
                    // This tag allows us to uniquely identify this as a React Element
                    $$typeof: REACT_ELEMENT_TYPE,
                    // Built-in properties that belong on the element
                    type: type,
                    key: key,
                    props: props,
                    // Record the component responsible for creating this element.
                    _owner: owner
                };
                if (ref !== null) {
                    Object.defineProperty(element, 'ref', {
                        enumerable: false,
                        get: elementRefGetterWithDeprecationWarning
                    });
                } else {
                    // Don't warn on access if a ref is not given. This reduces false
                    // positives in cases where a test serializer uses
                    // getOwnPropertyDescriptors to compare objects, like Jest does, which is
                    // a problem because it bypasses non-enumerability.
                    //
                    // So unfortunately this will trigger a false positive warning in Jest
                    // when the diff is printed:
                    //
                    //   expect(<div ref={ref} />).toEqual(<span ref={ref} />);
                    //
                    // A bit sketchy, but this is what we've done for the `props.key` and
                    // `props.ref` accessors for years, which implies it will be good enough
                    // for `element.ref`, too. Let's see if anyone complains.
                    Object.defineProperty(element, 'ref', {
                        enumerable: false,
                        value: null
                    });
                }
            }
            {
                // The validation flag is currently mutative. We put it on
                // an external backing store so that we can freeze the whole object.
                // This can be replaced with a WeakMap once they are implemented in
                // commonly used development environments.
                element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
                // the validation flag non-enumerable (where possible, which should
                // include every environment we run tests in), so the test framework
                // ignores it.
                Object.defineProperty(element._store, 'validated', {
                    configurable: false,
                    enumerable: false,
                    writable: true,
                    value: 0
                }); // debugInfo contains Server Component debug information.
                Object.defineProperty(element, '_debugInfo', {
                    configurable: false,
                    enumerable: false,
                    writable: true,
                    value: null
                });
                {
                    Object.defineProperty(element, '_debugStack', {
                        configurable: false,
                        enumerable: false,
                        writable: true,
                        value: debugStack
                    });
                    Object.defineProperty(element, '_debugTask', {
                        configurable: false,
                        enumerable: false,
                        writable: true,
                        value: debugTask
                    });
                }
                if (Object.freeze) {
                    Object.freeze(element.props);
                    Object.freeze(element);
                }
            }
            return element;
        }
        /**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */ function createElement(type, config, children) {
            {
                {
                    // This is a valid element type.
                    // Skip key warning if the type isn't valid since our key validation logic
                    // doesn't expect a non-string/function type and can throw confusing
                    // errors. We don't want exception behavior to differ between dev and
                    // prod. (Rendering will throw with a helpful message and as soon as the
                    // type is fixed, the key warnings will appear.)
                    for(var i = 2; i < arguments.length; i++){
                        validateChildKeys(arguments[i]);
                    }
                }
            }
            var propName; // Reserved names are extracted
            var props = {};
            var key = null;
            var ref = null;
            if (config != null) {
                {
                    if (!didWarnAboutOldJSXRuntime && '__self' in config && // Do not assume this is the result of an oudated JSX transform if key
                    // is present, because the modern JSX transform sometimes outputs
                    // createElement to preserve precedence between a static key and a
                    // spread key. To avoid false positive warnings, we never warn if
                    // there's a key.
                    !('key' in config)) {
                        didWarnAboutOldJSXRuntime = true;
                        warn('Your app (or one of its dependencies) is using an outdated JSX ' + 'transform. Update to the modern JSX transform for ' + 'faster performance: https://react.dev/link/new-jsx-transform');
                    }
                }
                if (hasValidRef(config)) ;
                if (hasValidKey(config)) {
                    {
                        checkKeyStringCoercion(config.key);
                    }
                    key = '' + config.key;
                } // Remaining properties are added to a new props object
                for(propName in config){
                    if (hasOwnProperty.call(config, propName) && // Skip over reserved prop names
                    propName !== 'key' && enableRefAsProp && // Even though we don't use these anymore in the runtime, we don't want
                    // them to appear as props, so in createElement we filter them out.
                    // We don't have to do this in the jsx() runtime because the jsx()
                    // transform never passed these as props; it used separate arguments.
                    propName !== '__self' && propName !== '__source') {
                        {
                            props[propName] = config[propName];
                        }
                    }
                }
            } // Children can be more than one argument, and those are transferred onto
            // the newly allocated props object.
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
                props.children = children;
            } else if (childrenLength > 1) {
                var childArray = Array(childrenLength);
                for(var _i = 0; _i < childrenLength; _i++){
                    childArray[_i] = arguments[_i + 2];
                }
                {
                    if (Object.freeze) {
                        Object.freeze(childArray);
                    }
                }
                props.children = childArray;
            } // Resolve default props
            if (type && type.defaultProps) {
                var defaultProps = type.defaultProps;
                for(propName in defaultProps){
                    if (props[propName] === undefined) {
                        props[propName] = defaultProps[propName];
                    }
                }
            }
            {
                if (key || !enableRefAsProp) {
                    var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
                    if (key) {
                        defineKeyPropWarningGetter(props, displayName);
                    }
                }
            }
            return ReactElement(type, key, ref, undefined, undefined, getOwner(), props, Error('react-stack-top-frame'), createTask(getTaskName(type)));
        }
        function cloneAndReplaceKey(oldElement, newKey) {
            var clonedElement = ReactElement(oldElement.type, newKey, // exists to avoid the `ref` access warning.
            null, undefined, undefined, oldElement._owner, oldElement.props, oldElement._debugStack, oldElement._debugTask);
            {
                // The cloned element should inherit the original element's key validation.
                clonedElement._store.validated = oldElement._store.validated;
            }
            return clonedElement;
        }
        /**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */ function cloneElement(element, config, children) {
            if (element === null || element === undefined) {
                throw new Error("The argument must be a React element, but you passed " + element + ".");
            }
            var propName; // Original props are copied
            var props = assign({}, element.props); // Reserved names are extracted
            var key = element.key;
            var ref = null; // Owner will be preserved, unless ref is overridden
            var owner = element._owner;
            if (config != null) {
                if (hasValidRef(config)) {
                    owner = getOwner();
                }
                if (hasValidKey(config)) {
                    {
                        checkKeyStringCoercion(config.key);
                    }
                    key = '' + config.key;
                } // Remaining properties override existing props
                for(propName in config){
                    if (hasOwnProperty.call(config, propName) && // Skip over reserved prop names
                    propName !== 'key' && enableRefAsProp && // ...and maybe these, too, though we currently rely on them for
                    // warnings and debug information in dev. Need to decide if we're OK
                    // with dropping them. In the jsx() runtime it's not an issue because
                    // the data gets passed as separate arguments instead of props, but
                    // it would be nice to stop relying on them entirely so we can drop
                    // them from the internal Fiber field.
                    propName !== '__self' && propName !== '__source' && // Undefined `ref` is ignored by cloneElement. We treat it the same as
                    // if the property were missing. This is mostly for
                    // backwards compatibility.
                    !(propName === 'ref' && config.ref === undefined)) {
                        {
                            {
                                props[propName] = config[propName];
                            }
                        }
                    }
                }
            } // Children can be more than one argument, and those are transferred onto
            // the newly allocated props object.
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
                props.children = children;
            } else if (childrenLength > 1) {
                var childArray = Array(childrenLength);
                for(var i = 0; i < childrenLength; i++){
                    childArray[i] = arguments[i + 2];
                }
                props.children = childArray;
            }
            var clonedElement = ReactElement(element.type, key, ref, undefined, undefined, owner, props, element._debugStack, element._debugTask);
            for(var _i2 = 2; _i2 < arguments.length; _i2++){
                validateChildKeys(arguments[_i2]);
            }
            return clonedElement;
        }
        /**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */ function validateChildKeys(node, parentType) {
            {
                if (typeof node !== 'object' || !node) {
                    return;
                }
                if (node.$$typeof === REACT_CLIENT_REFERENCE) ;
                else if (isArray(node)) ;
                else if (isValidElement(node)) {
                    // This element was passed in a valid location.
                    if (node._store) {
                        node._store.validated = 1;
                    }
                } else {
                    var iteratorFn = getIteratorFn(node);
                    if (typeof iteratorFn === 'function') {
                        // Entry iterators used to provide implicit keys,
                        // but now we print a separate warning for them later.
                        if (iteratorFn !== node.entries) {
                            var iterator = iteratorFn.call(node);
                            if (iterator !== node) {
                                while(!iterator.next().done){}
                            }
                        }
                    }
                }
            }
        }
        /**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */ function isValidElement(object) {
            return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        var SEPARATOR = '.';
        var SUBSEPARATOR = ':';
        /**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */ function escape(key) {
            var escapeRegex = /[=:]/g;
            var escaperLookup = {
                '=': '=0',
                ':': '=2'
            };
            var escapedString = key.replace(escapeRegex, function(match) {
                return escaperLookup[match];
            });
            return '$' + escapedString;
        }
        /**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */ var didWarnAboutMaps = false;
        var userProvidedKeyEscapeRegex = /\/+/g;
        function escapeUserProvidedKey(text) {
            return text.replace(userProvidedKeyEscapeRegex, '$&/');
        }
        /**
 * Generate a key string that identifies a element within a set.
 *
 * @param {*} element A element that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */ function getElementKey(element, index) {
            // Do some typechecking here since we call this blindly. We want to ensure
            // that we don't block potential future ES APIs.
            if (typeof element === 'object' && element !== null && element.key != null) {
                // Explicit key
                {
                    checkKeyStringCoercion(element.key);
                }
                return escape('' + element.key);
            } // Implicit key determined by the index in the set
            return index.toString(36);
        }
        function noop$1() {}
        function resolveThenable(thenable) {
            switch(thenable.status){
                case 'fulfilled':
                    {
                        var fulfilledValue = thenable.value;
                        return fulfilledValue;
                    }
                case 'rejected':
                    {
                        var rejectedError = thenable.reason;
                        throw rejectedError;
                    }
                default:
                    {
                        if (typeof thenable.status === 'string') {
                            // Only instrument the thenable if the status if not defined. If
                            // it's defined, but an unknown value, assume it's been instrumented by
                            // some custom userspace implementation. We treat it as "pending".
                            // Attach a dummy listener, to ensure that any lazy initialization can
                            // happen. Flight lazily parses JSON when the value is actually awaited.
                            thenable.then(noop$1, noop$1);
                        } else {
                            // This is an uncached thenable that we haven't seen before.
                            // TODO: Detect infinite ping loops caused by uncached promises.
                            var pendingThenable = thenable;
                            pendingThenable.status = 'pending';
                            pendingThenable.then(function(fulfilledValue) {
                                if (thenable.status === 'pending') {
                                    var fulfilledThenable = thenable;
                                    fulfilledThenable.status = 'fulfilled';
                                    fulfilledThenable.value = fulfilledValue;
                                }
                            }, function(error) {
                                if (thenable.status === 'pending') {
                                    var rejectedThenable = thenable;
                                    rejectedThenable.status = 'rejected';
                                    rejectedThenable.reason = error;
                                }
                            });
                        } // Check one more time in case the thenable resolved synchronously.
                        switch(thenable.status){
                            case 'fulfilled':
                                {
                                    var fulfilledThenable = thenable;
                                    return fulfilledThenable.value;
                                }
                            case 'rejected':
                                {
                                    var rejectedThenable = thenable;
                                    var _rejectedError = rejectedThenable.reason;
                                    throw _rejectedError;
                                }
                        }
                    }
            }
            throw thenable;
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
            var type = typeof children;
            if (type === 'undefined' || type === 'boolean') {
                // All of the above are perceived as null.
                children = null;
            }
            var invokeCallback = false;
            if (children === null) {
                invokeCallback = true;
            } else {
                switch(type){
                    case 'bigint':
                    case 'string':
                    case 'number':
                        invokeCallback = true;
                        break;
                    case 'object':
                        switch(children.$$typeof){
                            case REACT_ELEMENT_TYPE:
                            case REACT_PORTAL_TYPE:
                                invokeCallback = true;
                                break;
                            case REACT_LAZY_TYPE:
                                var payload = children._payload;
                                var init = children._init;
                                return mapIntoArray(init(payload), array, escapedPrefix, nameSoFar, callback);
                        }
                }
            }
            if (invokeCallback) {
                var _child = children;
                var mappedChild = callback(_child); // If it's the only child, treat the name as if it was wrapped in an array
                // so that it's consistent if the number of children grows:
                var childKey = nameSoFar === '' ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
                if (isArray(mappedChild)) {
                    var escapedChildKey = '';
                    if (childKey != null) {
                        escapedChildKey = escapeUserProvidedKey(childKey) + '/';
                    }
                    mapIntoArray(mappedChild, array, escapedChildKey, '', function(c) {
                        return c;
                    });
                } else if (mappedChild != null) {
                    if (isValidElement(mappedChild)) {
                        {
                            // The `if` statement here prevents auto-disabling of the safe
                            // coercion ESLint rule, so we must manually disable it below.
                            // $FlowFixMe[incompatible-type] Flow incorrectly thinks React.Portal doesn't have a key
                            if (mappedChild.key != null) {
                                if (!_child || _child.key !== mappedChild.key) {
                                    checkKeyStringCoercion(mappedChild.key);
                                }
                            }
                        }
                        var newChild = cloneAndReplaceKey(mappedChild, // traverseAllChildren used to do for objects as children
                        escapedPrefix + (mappedChild.key != null && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey('' + mappedChild.key // eslint-disable-line react-internal/safe-string-coercion
                        ) + '/' : '') + childKey);
                        {
                            // If `child` was an element without a `key`, we need to validate if
                            // it should have had a `key`, before assigning one to `mappedChild`.
                            // $FlowFixMe[incompatible-type] Flow incorrectly thinks React.Portal doesn't have a key
                            if (nameSoFar !== '' && _child != null && isValidElement(_child) && _child.key == null) {
                                // We check truthiness of `child._store.validated` instead of being
                                // inequal to `1` to provide a bit of backward compatibility for any
                                // libraries (like `fbt`) which may be hacking this property.
                                if (_child._store && !_child._store.validated) {
                                    // Mark this child as having failed validation, but let the actual
                                    // renderer print the warning later.
                                    newChild._store.validated = 2;
                                }
                            }
                        }
                        mappedChild = newChild;
                    }
                    array.push(mappedChild);
                }
                return 1;
            }
            var child;
            var nextName;
            var subtreeCount = 0; // Count of children found in the current subtree.
            var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;
            if (isArray(children)) {
                for(var i = 0; i < children.length; i++){
                    child = children[i];
                    nextName = nextNamePrefix + getElementKey(child, i);
                    subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
                }
            } else {
                var iteratorFn = getIteratorFn(children);
                if (typeof iteratorFn === 'function') {
                    var iterableChildren = children;
                    {
                        // Warn about using Maps as children
                        if (iteratorFn === iterableChildren.entries) {
                            if (!didWarnAboutMaps) {
                                warn('Using Maps as children is not supported. ' + 'Use an array of keyed ReactElements instead.');
                            }
                            didWarnAboutMaps = true;
                        }
                    }
                    var iterator = iteratorFn.call(iterableChildren);
                    var step;
                    var ii = 0; // $FlowFixMe[incompatible-use] `iteratorFn` might return null according to typing.
                    while(!(step = iterator.next()).done){
                        child = step.value;
                        nextName = nextNamePrefix + getElementKey(child, ii++);
                        subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
                    }
                } else if (type === 'object') {
                    if (typeof children.then === 'function') {
                        return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
                    } // eslint-disable-next-line react-internal/safe-string-coercion
                    var childrenString = String(children);
                    throw new Error("Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + "). " + 'If you meant to render a collection of children, use an array ' + 'instead.');
                }
            }
            return subtreeCount;
        }
        /**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenmap
 *
 * The provided mapFunction(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */ function mapChildren(children, func, context) {
            if (children == null) {
                // $FlowFixMe limitation refining abstract types in Flow
                return children;
            }
            var result = [];
            var count = 0;
            mapIntoArray(children, result, '', '', function(child) {
                return func.call(context, child, count++);
            });
            return result;
        }
        /**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrencount
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */ function countChildren(children) {
            var n = 0;
            mapChildren(children, function() {
                n++; // Don't return anything
            });
            return n;
        }
        /**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */ function forEachChildren(children, forEachFunc, forEachContext) {
            mapChildren(children, function() {
                forEachFunc.apply(this, arguments); // Don't return anything.
            }, forEachContext);
        }
        /**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
 */ function toArray(children) {
            return mapChildren(children, function(child) {
                return child;
            }) || [];
        }
        /**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenonly
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */ function onlyChild(children) {
            if (!isValidElement(children)) {
                throw new Error('React.Children.only expected to receive a single React element child.');
            }
            return children;
        }
        // an immutable object with a single mutable value
        function createRef() {
            var refObject = {
                current: null
            };
            {
                Object.seal(refObject);
            }
            return refObject;
        }
        function resolveDispatcher() {
            var dispatcher = ReactSharedInternals.H;
            {
                if (dispatcher === null) {
                    error('Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' + ' one of the following reasons:\n' + '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' + '2. You might be breaking the Rules of Hooks\n' + '3. You might have more than one copy of React in the same app\n' + 'See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.');
                }
            }
            // intentionally don't throw our own error because this is in a hot path.
            // Also helps ensure this is inlined.
            return dispatcher;
        }
        function getCacheForType(resourceType) {
            var dispatcher = ReactSharedInternals.A;
            if (!dispatcher) {
                // If there is no dispatcher, then we treat this as not being cached.
                return resourceType();
            }
            return dispatcher.getCacheForType(resourceType);
        }
        function useCallback(callback, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useCallback(callback, deps);
        }
        function useMemo(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useMemo(create, deps);
        }
        function useDebugValue(value, formatterFn) {
            {
                var dispatcher = resolveDispatcher();
                return dispatcher.useDebugValue(value, formatterFn);
            }
        }
        function useId() {
            var dispatcher = resolveDispatcher();
            return dispatcher.useId();
        }
        function use(usable) {
            var dispatcher = resolveDispatcher();
            return dispatcher.use(usable);
        }
        function useActionState(action, initialState, permalink) {
            {
                var dispatcher = resolveDispatcher(); // $FlowFixMe[not-a-function] This is unstable, thus optional
                return dispatcher.useActionState(action, initialState, permalink);
            }
        }
        function forwardRef(render) {
            {
                if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
                    error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
                } else if (typeof render !== 'function') {
                    error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
                } else {
                    if (render.length !== 0 && render.length !== 2) {
                        error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
                    }
                }
                if (render != null) {
                    if (render.defaultProps != null) {
                        error('forwardRef render functions do not support defaultProps. ' + 'Did you accidentally pass a React component?');
                    }
                }
            }
            var elementType = {
                $$typeof: REACT_FORWARD_REF_TYPE,
                render: render
            };
            {
                var ownName;
                Object.defineProperty(elementType, 'displayName', {
                    enumerable: false,
                    configurable: true,
                    get: function() {
                        return ownName;
                    },
                    set: function(name) {
                        ownName = name; // The inner component shouldn't inherit this display name in most cases,
                        // because the component may be used elsewhere.
                        // But it's nice for anonymous functions to inherit the name,
                        // so that our component-stack generation logic will display their frames.
                        // An anonymous function generally suggests a pattern like:
                        //   React.forwardRef((props, ref) => {...});
                        // This kind of inner function is not used elsewhere so the side effect is okay.
                        if (!render.name && !render.displayName) {
                            Object.defineProperty(render, 'name', {
                                value: name
                            });
                            render.displayName = name;
                        }
                    }
                });
            }
            return elementType;
        }
        var Uninitialized = -1;
        var Pending = 0;
        var Resolved = 1;
        var Rejected = 2;
        function lazyInitializer(payload) {
            if (payload._status === Uninitialized) {
                var ctor = payload._result;
                var thenable = ctor(); // Transition to the next state.
                // This might throw either because it's missing or throws. If so, we treat it
                // as still uninitialized and try again next time. Which is the same as what
                // happens if the ctor or any wrappers processing the ctor throws. This might
                // end up fixing it if the resolution was a concurrency bug.
                thenable.then(function(moduleObject) {
                    if (payload._status === Pending || payload._status === Uninitialized) {
                        // Transition to the next state.
                        var resolved = payload;
                        resolved._status = Resolved;
                        resolved._result = moduleObject;
                    }
                }, function(error) {
                    if (payload._status === Pending || payload._status === Uninitialized) {
                        // Transition to the next state.
                        var rejected = payload;
                        rejected._status = Rejected;
                        rejected._result = error;
                    }
                });
                if (payload._status === Uninitialized) {
                    // In case, we're still uninitialized, then we're waiting for the thenable
                    // to resolve. Set it as pending in the meantime.
                    var pending = payload;
                    pending._status = Pending;
                    pending._result = thenable;
                }
            }
            if (payload._status === Resolved) {
                var moduleObject = payload._result;
                {
                    if (moduleObject === undefined) {
                        error('lazy: Expected the result of a dynamic imp' + 'ort() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' + // Break up imports to avoid accidentally parsing them as dependencies.
                        'const MyComponent = lazy(() => imp' + "ort('./MyComponent'))\n\n" + 'Did you accidentally put curly braces around the import?', moduleObject);
                    }
                }
                {
                    if (!('default' in moduleObject)) {
                        error('lazy: Expected the result of a dynamic imp' + 'ort() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' + // Break up imports to avoid accidentally parsing them as dependencies.
                        'const MyComponent = lazy(() => imp' + "ort('./MyComponent'))", moduleObject);
                    }
                }
                return moduleObject.default;
            } else {
                throw payload._result;
            }
        }
        function lazy(ctor) {
            var payload = {
                // We use these fields to store the result.
                _status: Uninitialized,
                _result: ctor
            };
            var lazyType = {
                $$typeof: REACT_LAZY_TYPE,
                _payload: payload,
                _init: lazyInitializer
            };
            return lazyType;
        }
        function memo(type, compare) {
            {
                if (!isValidElementType(type)) {
                    error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
                }
            }
            var elementType = {
                $$typeof: REACT_MEMO_TYPE,
                type: type,
                compare: compare === undefined ? null : compare
            };
            {
                var ownName;
                Object.defineProperty(elementType, 'displayName', {
                    enumerable: false,
                    configurable: true,
                    get: function() {
                        return ownName;
                    },
                    set: function(name) {
                        ownName = name; // The inner component shouldn't inherit this display name in most cases,
                        // because the component may be used elsewhere.
                        // But it's nice for anonymous functions to inherit the name,
                        // so that our component-stack generation logic will display their frames.
                        // An anonymous function generally suggests a pattern like:
                        //   React.memo((props) => {...});
                        // This kind of inner function is not used elsewhere so the side effect is okay.
                        if (!type.name && !type.displayName) {
                            Object.defineProperty(type, 'name', {
                                value: name
                            });
                            type.displayName = name;
                        }
                    }
                });
            }
            return elementType;
        }
        var UNTERMINATED = 0;
        var TERMINATED = 1;
        var ERRORED = 2;
        function createCacheRoot() {
            return new WeakMap();
        }
        function createCacheNode() {
            return {
                s: UNTERMINATED,
                // status, represents whether the cached computation returned a value or threw an error
                v: undefined,
                // value, either the cached result or an error, depending on s
                o: null,
                // object cache, a WeakMap where non-primitive arguments are stored
                p: null // primitive cache, a regular Map where primitive arguments are stored.
            };
        }
        function cache(fn) {
            return function() {
                var dispatcher = ReactSharedInternals.A;
                if (!dispatcher) {
                    // If there is no dispatcher, then we treat this as not being cached.
                    // $FlowFixMe[incompatible-call]: We don't want to use rest arguments since we transpile the code.
                    return fn.apply(null, arguments);
                }
                var fnMap = dispatcher.getCacheForType(createCacheRoot);
                var fnNode = fnMap.get(fn);
                var cacheNode;
                if (fnNode === undefined) {
                    cacheNode = createCacheNode();
                    fnMap.set(fn, cacheNode);
                } else {
                    cacheNode = fnNode;
                }
                for(var i = 0, l = arguments.length; i < l; i++){
                    var arg = arguments[i];
                    if (typeof arg === 'function' || typeof arg === 'object' && arg !== null) {
                        // Objects go into a WeakMap
                        var objectCache = cacheNode.o;
                        if (objectCache === null) {
                            cacheNode.o = objectCache = new WeakMap();
                        }
                        var objectNode = objectCache.get(arg);
                        if (objectNode === undefined) {
                            cacheNode = createCacheNode();
                            objectCache.set(arg, cacheNode);
                        } else {
                            cacheNode = objectNode;
                        }
                    } else {
                        // Primitives go into a regular Map
                        var primitiveCache = cacheNode.p;
                        if (primitiveCache === null) {
                            cacheNode.p = primitiveCache = new Map();
                        }
                        var primitiveNode = primitiveCache.get(arg);
                        if (primitiveNode === undefined) {
                            cacheNode = createCacheNode();
                            primitiveCache.set(arg, cacheNode);
                        } else {
                            cacheNode = primitiveNode;
                        }
                    }
                }
                if (cacheNode.s === TERMINATED) {
                    return cacheNode.v;
                }
                if (cacheNode.s === ERRORED) {
                    throw cacheNode.v;
                }
                try {
                    // $FlowFixMe[incompatible-call]: We don't want to use rest arguments since we transpile the code.
                    var result = fn.apply(null, arguments);
                    var terminatedNode = cacheNode;
                    terminatedNode.s = TERMINATED;
                    terminatedNode.v = result;
                    return result;
                } catch (error) {
                    // We store the first error that's thrown and rethrow it.
                    var erroredNode = cacheNode;
                    erroredNode.s = ERRORED;
                    erroredNode.v = error;
                    throw error;
                }
            };
        }
        var reportGlobalError = typeof reportError === 'function' ? // emulating an uncaught JavaScript error.
        reportError : function(error) {
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            } else if (typeof process === 'object' && // $FlowFixMe[method-unbinding]
            typeof process.emit === 'function') {
                // Node Polyfill
                process.emit('uncaughtException', error);
                return;
            } // eslint-disable-next-line react-internal/no-production-logging
            console['error'](error);
        };
        function startTransition(scope, options) {
            var prevTransition = ReactSharedInternals.T;
            var transition = {};
            ReactSharedInternals.T = transition;
            var currentTransition = ReactSharedInternals.T;
            {
                ReactSharedInternals.T._updatedFibers = new Set();
            }
            {
                try {
                    var returnValue = scope();
                    var onStartTransitionFinish = ReactSharedInternals.S;
                    if (onStartTransitionFinish !== null) {
                        onStartTransitionFinish(transition, returnValue);
                    }
                    if (typeof returnValue === 'object' && returnValue !== null && typeof returnValue.then === 'function') {
                        returnValue.then(noop, reportGlobalError);
                    }
                } catch (error) {
                    reportGlobalError(error);
                } finally{
                    warnAboutTransitionSubscriptions(prevTransition, currentTransition);
                    ReactSharedInternals.T = prevTransition;
                }
            }
        }
        function warnAboutTransitionSubscriptions(prevTransition, currentTransition) {
            {
                if (prevTransition === null && currentTransition._updatedFibers) {
                    var updatedFibersCount = currentTransition._updatedFibers.size;
                    currentTransition._updatedFibers.clear();
                    if (updatedFibersCount > 10) {
                        warn('Detected a large number of updates inside startTransition. ' + 'If this is due to a subscription please re-write it to use React provided hooks. ' + 'Otherwise concurrent mode guarantees are off the table.');
                    }
                }
            }
        }
        function noop() {}
        function postpone(reason) {
            // eslint-disable-next-line react-internal/prod-error-codes
            var postponeInstance = new Error(reason);
            postponeInstance.$$typeof = REACT_POSTPONE_TYPE;
            throw postponeInstance;
        }
        var ReactVersion = '19.0.0-experimental-6230622a1a-20240610';
        var getPrototypeOf = Object.getPrototypeOf;
        // Turns a TypedArray or ArrayBuffer into a string that can be used for comparison
        // in a Map to see if the bytes are the same.
        function binaryToComparableString(view) {
            return String.fromCharCode.apply(String, new Uint8Array(view.buffer, view.byteOffset, view.byteLength));
        }
        var TaintRegistryObjects = ReactSharedInternals.TaintRegistryObjects, TaintRegistryValues = ReactSharedInternals.TaintRegistryValues, TaintRegistryByteLengths = ReactSharedInternals.TaintRegistryByteLengths, TaintRegistryPendingRequests = ReactSharedInternals.TaintRegistryPendingRequests; // This is the shared constructor of all typed arrays.
        var TypedArrayConstructor = getPrototypeOf(Uint32Array.prototype).constructor;
        var defaultMessage = 'A tainted value was attempted to be serialized to a Client Component or Action closure. ' + 'This would leak it to the client.';
        function cleanup(entryValue) {
            var entry = TaintRegistryValues.get(entryValue);
            if (entry !== undefined) {
                TaintRegistryPendingRequests.forEach(function(requestQueue) {
                    requestQueue.push(entryValue);
                    entry.count++;
                });
                if (entry.count === 1) {
                    TaintRegistryValues.delete(entryValue);
                } else {
                    entry.count--;
                }
            }
        } // If FinalizationRegistry doesn't exist, we assume that objects life forever.
        // E.g. the whole VM is just the lifetime of a request.
        var finalizationRegistry = typeof FinalizationRegistry === 'function' ? new FinalizationRegistry(cleanup) : null;
        function taintUniqueValue(message, lifetime, value) {
            message = '' + (message || defaultMessage);
            if (lifetime === null || typeof lifetime !== 'object' && typeof lifetime !== 'function') {
                throw new Error('To taint a value, a lifetime must be defined by passing an object that holds ' + 'the value.');
            }
            var entryValue;
            if (typeof value === 'string' || typeof value === 'bigint') {
                // Use as is.
                entryValue = value;
            } else if (value instanceof TypedArrayConstructor || value instanceof DataView) {
                // For now, we just convert binary data to a string so that we can just use the native
                // hashing in the Map implementation. It doesn't really matter what form the string
                // take as long as it's the same when we look it up.
                // We're not too worried about collisions since this should be a high entropy value.
                TaintRegistryByteLengths.add(value.byteLength);
                entryValue = binaryToComparableString(value);
            } else {
                var kind = value === null ? 'null' : typeof value;
                if (kind === 'object' || kind === 'function') {
                    throw new Error('taintUniqueValue cannot taint objects or functions. Try taintObjectReference instead.');
                }
                throw new Error('Cannot taint a ' + kind + ' because the value is too general and not unique enough to block globally.');
            }
            var existingEntry = TaintRegistryValues.get(entryValue);
            if (existingEntry === undefined) {
                TaintRegistryValues.set(entryValue, {
                    message: message,
                    count: 1
                });
            } else {
                existingEntry.count++;
            }
            if (finalizationRegistry !== null) {
                finalizationRegistry.register(lifetime, entryValue);
            }
        }
        function taintObjectReference(message, object) {
            message = '' + (message || defaultMessage);
            if (typeof object === 'string' || typeof object === 'bigint') {
                throw new Error('Only objects or functions can be passed to taintObjectReference. Try taintUniqueValue instead.');
            }
            if (object === null || typeof object !== 'object' && typeof object !== 'function') {
                throw new Error('Only objects or functions can be passed to taintObjectReference.');
            }
            TaintRegistryObjects.set(object, message);
        }
        var Children = {
            map: mapChildren,
            forEach: forEachChildren,
            count: countChildren,
            toArray: toArray,
            only: onlyChild
        }; // These are server-only
        exports.Children = Children;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.Profiler = REACT_PROFILER_TYPE;
        exports.StrictMode = REACT_STRICT_MODE_TYPE;
        exports.Suspense = REACT_SUSPENSE_TYPE;
        exports.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
        exports.cache = cache;
        exports.cloneElement = cloneElement;
        exports.createElement = createElement;
        exports.createRef = createRef;
        exports.experimental_taintObjectReference = taintObjectReference;
        exports.experimental_taintUniqueValue = taintUniqueValue;
        exports.forwardRef = forwardRef;
        exports.isValidElement = isValidElement;
        exports.lazy = lazy;
        exports.memo = memo;
        exports.startTransition = startTransition;
        exports.unstable_DebugTracingMode = REACT_DEBUG_TRACING_MODE_TYPE;
        exports.unstable_SuspenseList = REACT_SUSPENSE_TYPE;
        exports.unstable_getCacheForType = getCacheForType;
        exports.unstable_postpone = postpone;
        exports.use = use;
        exports.useActionState = useActionState;
        exports.useCallback = useCallback;
        exports.useDebugValue = useDebugValue;
        exports.useId = useId;
        exports.useMemo = useMemo;
        exports.version = ReactVersion;
    })();
}

}.call(this) }),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/react-experimental/react.react-server.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

'use strict';
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    module.exports = __turbopack_require__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/react-experimental/cjs/react.react-server.development.js [middleware] (ecmascript)");
}

}.call(this) }),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/hooks-server-context.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "DynamicServerError": ()=>DynamicServerError,
    "isDynamicServerError": ()=>isDynamicServerError
});
const DYNAMIC_ERROR_CODE = 'DYNAMIC_SERVER_USAGE';
class DynamicServerError extends Error {
    constructor(description){
        super("Dynamic server usage: " + description);
        this.description = description;
        this.digest = DYNAMIC_ERROR_CODE;
    }
}
function isDynamicServerError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err) || typeof err.digest !== 'string') {
        return false;
    }
    return err.digest === DYNAMIC_ERROR_CODE;
} //# sourceMappingURL=hooks-server-context.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/app-render/dynamic-rendering.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * The functions provided by this module are used to communicate certain properties
 * about the currently running code so that Next.js can make decisions on how to handle
 * the current execution in different rendering modes such as pre-rendering, resuming, and SSR.
 *
 * Today Next.js treats all code as potentially static. Certain APIs may only make sense when dynamically rendering.
 * Traditionally this meant deopting the entire render to dynamic however with PPR we can now deopt parts
 * of a React tree as dynamic while still keeping other parts static. There are really two different kinds of
 * Dynamic indications.
 *
 * The first is simply an intention to be dynamic. unstable_noStore is an example of this where
 * the currently executing code simply declares that the current scope is dynamic but if you use it
 * inside unstable_cache it can still be cached. This type of indication can be removed if we ever
 * make the default dynamic to begin with because the only way you would ever be static is inside
 * a cache scope which this indication does not affect.
 *
 * The second is an indication that a dynamic data source was read. This is a stronger form of dynamic
 * because it means that it is inappropriate to cache this at all. using a dynamic data source inside
 * unstable_cache should error. If you want to use some dynamic data inside unstable_cache you should
 * read that data outside the cache and pass it in as an argument to the cached function.
 */ // Once postpone is in stable we should switch to importing the postpone export directly
__turbopack_esm__({
    "Postpone": ()=>Postpone,
    "createPostponedAbortSignal": ()=>createPostponedAbortSignal,
    "createPrerenderState": ()=>createPrerenderState,
    "formatDynamicAPIAccesses": ()=>formatDynamicAPIAccesses,
    "markCurrentScopeAsDynamic": ()=>markCurrentScopeAsDynamic,
    "trackDynamicDataAccessed": ()=>trackDynamicDataAccessed,
    "usedDynamicAPIs": ()=>usedDynamicAPIs
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$react$2e$react$2d$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/react-experimental/react.react-server.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$hooks$2d$server$2d$context$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/hooks-server-context.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/static-generation-bailout.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const hasPostpone = typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$react$2e$react$2d$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].unstable_postpone === 'function';
function createPrerenderState(isDebugDynamicAccesses) {
    return {
        isDebugDynamicAccesses,
        dynamicAccesses: []
    };
}
function markCurrentScopeAsDynamic(store, expression) {
    // inside cache scopes marking a scope as dynamic has no effect because the outer cache scope
    // creates a cache boundary. This is subtly different from reading a dynamic data source which is
    // forbidden inside a cache scope.
    if (store.isUnstableCacheCallback) return;
    // If we're forcing dynamic rendering or we're forcing static rendering, we
    // don't need to do anything here because the entire page is already dynamic
    // or it's static and it should not throw or postpone here.
    if (store.forceDynamic || store.forceStatic) return;
    if (store.dynamicShouldError) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
    }
    if (store.prerenderState) {
        // We track that we had a dynamic scope that postponed.
        // This will be used by the renderer to decide whether
        // the prerender requires a resume
        postponeWithTracking(store.prerenderState, expression, store.route);
    }
    store.revalidate = 0;
    if (store.isStaticGeneration) {
        // We aren't prerendering but we are generating a static page. We need to bail out of static generation
        const err = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$hooks$2d$server$2d$context$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["DynamicServerError"](`Route ${store.route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`);
        store.dynamicUsageDescription = expression;
        store.dynamicUsageStack = err.stack;
        throw err;
    }
}
function trackDynamicDataAccessed(store, expression) {
    if (store.isUnstableCacheCallback) {
        throw new Error(`Route ${store.route} used "${expression}" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "${expression}" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
    } else if (store.dynamicShouldError) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
    } else if (store.prerenderState) {
        // We track that we had a dynamic scope that postponed.
        // This will be used by the renderer to decide whether
        // the prerender requires a resume
        postponeWithTracking(store.prerenderState, expression, store.route);
    } else {
        store.revalidate = 0;
        if (store.isStaticGeneration) {
            // We aren't prerendering but we are generating a static page. We need to bail out of static generation
            const err = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$hooks$2d$server$2d$context$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["DynamicServerError"](`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`);
            store.dynamicUsageDescription = expression;
            store.dynamicUsageStack = err.stack;
            throw err;
        }
    }
}
function Postpone({ reason, prerenderState, route }) {
    postponeWithTracking(prerenderState, reason, route);
}
function postponeWithTracking(prerenderState, expression, route) {
    assertPostpone();
    const reason = `Route ${route} needs to bail out of prerendering at this point because it used ${expression}. ` + `React throws this special object to indicate where. It should not be caught by ` + `your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
    prerenderState.dynamicAccesses.push({
        // When we aren't debugging, we don't need to create another error for the
        // stack trace.
        stack: prerenderState.isDebugDynamicAccesses ? new Error().stack : undefined,
        expression
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$react$2e$react$2d$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].unstable_postpone(reason);
}
function usedDynamicAPIs(prerenderState) {
    return prerenderState.dynamicAccesses.length > 0;
}
function formatDynamicAPIAccesses(prerenderState) {
    return prerenderState.dynamicAccesses.filter((access)=>typeof access.stack === 'string' && access.stack.length > 0).map(({ expression, stack })=>{
        stack = stack.split('\n') // Remove the "Error: " prefix from the first line of the stack trace as
        // well as the first 4 lines of the stack trace which is the distance
        // from the user code and the `new Error().stack` call.
        .slice(4).filter((line)=>{
            // Exclude Next.js internals from the stack trace.
            if (line.includes('node_modules/next/')) {
                return false;
            }
            // Exclude anonymous functions from the stack trace.
            if (line.includes(' (<anonymous>)')) {
                return false;
            }
            // Exclude Node.js internals from the stack trace.
            if (line.includes(' (node:')) {
                return false;
            }
            return true;
        }).join('\n');
        return `Dynamic API Usage Debug - ${expression}:\n${stack}`;
    });
}
function assertPostpone() {
    if (!hasPostpone) {
        throw new Error(`Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js`);
    }
}
function createPostponedAbortSignal(reason) {
    assertPostpone();
    const controller = new AbortController();
    // We get our hands on a postpone instance by calling postpone and catching the throw
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$react$2e$react$2d$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].unstable_postpone(reason);
    } catch (x) {
        controller.abort(x);
    }
    return controller.signal;
} //# sourceMappingURL=dynamic-rendering.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/after/after.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "unstable_after": ()=>unstable_after
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$request$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/request-async-storage.external.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$request$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/request-async-storage.external.js [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/static-generation-async-storage.external.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/static-generation-async-storage-instance.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/static-generation-bailout.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/app-render/dynamic-rendering.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
function unstable_after(task) {
    const callingExpression = 'unstable_after';
    const requestStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$request$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getExpectedRequestStore"])(callingExpression);
    const { afterContext } = requestStore;
    if (!afterContext) {
        throw new Error('`unstable_after()` must be explicitly enabled by setting `experimental.after: true` in your next.config.js.');
    }
    const staticGenerationStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["staticGenerationAsyncStorage"].getStore();
    if (staticGenerationStore) {
        if (staticGenerationStore.forceStatic) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route ${staticGenerationStore.route} with \`dynamic = "force-static"\` couldn't be rendered statically because it used \`${callingExpression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["markCurrentScopeAsDynamic"])(staticGenerationStore, callingExpression);
        }
    }
    return afterContext.after(task);
} //# sourceMappingURL=after.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/after/index.js [middleware] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
;
 //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/after/index.js [middleware] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$after$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/after/after.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/after/index.js [middleware] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/exports/index.js [middleware] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Alias index file of next/server for edge runtime for tree-shaking purpose
__turbopack_esm__({});
;
;
;
;
;
;
 //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/exports/index.js [middleware] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$image$2d$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/image-response.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$request$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/request.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$user$2d$agent$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/user-agent.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$url$2d$pattern$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/url-pattern.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/after/index.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/exports/index.js [middleware] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
;
 //# sourceMappingURL=server.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/exports/index.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/exports/index.js [middleware] (ecmascript) <exports>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ImageResponse": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$image$2d$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ImageResponse"],
    "NextRequest": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$request$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextRequest"],
    "NextResponse": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"],
    "URLPattern": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$url$2d$pattern$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["URLPattern"],
    "unstable_after": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$after$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["unstable_after"],
    "userAgent": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$user$2d$agent$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["userAgent"],
    "userAgentFromString": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$user$2d$agent$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["userAgentFromString"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$image$2d$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/image-response.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$request$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/request.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$url$2d$pattern$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/url-pattern.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$after$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/after/after.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$user$2d$agent$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/user-agent.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/exports/index.js [middleware] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/exports/index.js [middleware] (ecmascript) <facade>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ImageResponse": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["ImageResponse"],
    "NextRequest": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["NextRequest"],
    "NextResponse": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["NextResponse"],
    "URLPattern": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["URLPattern"],
    "unstable_after": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["unstable_after"],
    "userAgent": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["userAgent"],
    "userAgentFromString": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["userAgentFromString"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/exports/index.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/exports/index.js [middleware] (ecmascript) <exports>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <exports>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ImageResponse": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$facade$3e$__["ImageResponse"],
    "NextRequest": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$facade$3e$__["NextRequest"],
    "NextResponse": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$facade$3e$__["NextResponse"],
    "URLPattern": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$facade$3e$__["URLPattern"],
    "unstable_after": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$facade$3e$__["unstable_after"],
    "userAgent": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$facade$3e$__["userAgent"],
    "userAgentFromString": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$facade$3e$__["userAgentFromString"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$facade$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/exports/index.js [middleware] (ecmascript) <facade>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <facade>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ImageResponse": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["ImageResponse"],
    "NextRequest": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["NextRequest"],
    "NextResponse": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["NextResponse"],
    "URLPattern": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["URLPattern"],
    "unstable_after": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["unstable_after"],
    "userAgent": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["userAgent"],
    "userAgentFromString": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["userAgentFromString"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <exports>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/shared/constants.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
// Reuse the legacy cookie name
// https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
const COOKIE_LOCALE_NAME = 'NEXT_LOCALE';
const COOKIE_MAX_AGE = 31536000; // 1 year
const COOKIE_SAME_SITE = 'lax';
// Should take precedence over the cookie
const HEADER_LOCALE_NAME = 'X-NEXT-INTL-LOCALE';
// In a URL like "/en-US/about", the locale segment is "en-US"
const LOCALE_SEGMENT_NAME = 'locale';
exports.COOKIE_LOCALE_NAME = COOKIE_LOCALE_NAME;
exports.COOKIE_MAX_AGE = COOKIE_MAX_AGE;
exports.COOKIE_SAME_SITE = COOKIE_SAME_SITE;
exports.HEADER_LOCALE_NAME = HEADER_LOCALE_NAME;
exports.LOCALE_SEGMENT_NAME = LOCALE_SEGMENT_NAME;

}.call(this) }),
"[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/shared/utils.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
function isRelativeHref(href) {
    const pathname = typeof href === 'object' ? href.pathname : href;
    return pathname != null && !pathname.startsWith('/');
}
function isLocalHref(href) {
    if (typeof href === 'object') {
        return href.host == null && href.hostname == null;
    } else {
        const hasProtocol = /^[a-z]+:/i.test(href);
        return !hasProtocol;
    }
}
function isLocalizableHref(href) {
    return isLocalHref(href) && !isRelativeHref(href);
}
function localizeHref(href, locale) {
    let curLocale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : locale;
    let curPathname = arguments.length > 3 ? arguments[3] : undefined;
    let prefix = arguments.length > 4 ? arguments[4] : undefined;
    if (!isLocalizableHref(href)) {
        return href;
    }
    const isSwitchingLocale = locale !== curLocale;
    const isPathnamePrefixed = hasPathnamePrefixed(prefix, curPathname);
    const shouldPrefix = isSwitchingLocale || isPathnamePrefixed;
    if (shouldPrefix && prefix != null) {
        return prefixHref(href, prefix);
    }
    return href;
}
function prefixHref(href, prefix) {
    let prefixedHref;
    if (typeof href === 'string') {
        prefixedHref = prefixPathname(prefix, href);
    } else {
        prefixedHref = {
            ...href
        };
        if (href.pathname) {
            prefixedHref.pathname = prefixPathname(prefix, href.pathname);
        }
    }
    return prefixedHref;
}
function unprefixPathname(pathname, prefix) {
    return pathname.replace(new RegExp("^".concat(prefix)), '') || '/';
}
function prefixPathname(prefix, pathname) {
    let localizedHref = prefix;
    // Avoid trailing slashes
    if (/^\/(\?.*)?$/.test(pathname)) {
        pathname = pathname.slice(1);
    }
    localizedHref += pathname;
    return localizedHref;
}
function hasPathnamePrefixed(prefix, pathname) {
    return pathname === prefix || pathname.startsWith("".concat(prefix, "/"));
}
function matchesPathname(/** E.g. `/users/[userId]-[userName]` */ template, /** E.g. `/users/23-jane` */ pathname) {
    const regex = templateToRegex(template);
    return regex.test(pathname);
}
function getLocalePrefix(locale, localePrefix) {
    var _localePrefix$prefixe;
    return localePrefix.mode !== 'never' && ((_localePrefix$prefixe = localePrefix.prefixes) === null || _localePrefix$prefixe === void 0 ? void 0 : _localePrefix$prefixe[locale]) || // We return a prefix even if `mode: 'never'`. It's up to the consumer
    // to decide to use it or not.
    '/' + locale;
}
function templateToRegex(template) {
    const regexPattern = template// Replace optional catchall ('[[...slug]]')
    .replace(/\[\[(\.\.\.[^\]]+)\]\]/g, '?(.*)')// Replace catchall ('[...slug]')
    .replace(/\[(\.\.\.[^\]]+)\]/g, '(.+)')// Replace regular parameter ('[slug]')
    .replace(/\[([^\]]+)\]/g, '([^/]+)');
    return new RegExp("^".concat(regexPattern, "$"));
}
exports.getLocalePrefix = getLocalePrefix;
exports.hasPathnamePrefixed = hasPathnamePrefixed;
exports.isLocalHref = isLocalHref;
exports.isLocalizableHref = isLocalizableHref;
exports.isRelativeHref = isRelativeHref;
exports.localizeHref = localizeHref;
exports.matchesPathname = matchesPathname;
exports.prefixHref = prefixHref;
exports.prefixPathname = prefixPathname;
exports.templateToRegex = templateToRegex;
exports.unprefixPathname = unprefixPathname;

}.call(this) }),
"[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/routing/config.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
/**
 * Maintainer note: The config that is accepted by the middleware, the shared
 * and the localized pathnames navigation factory function is slightly
 * different. This type declares the shared base config that is accepted by all
 * of them. Properties that are different are declared in consuming types.
 */ function receiveLocalePrefixConfig(localePrefix) {
    return typeof localePrefix === 'object' ? localePrefix : {
        mode: localePrefix || 'always'
    };
}
exports.receiveLocalePrefixConfig = receiveLocalePrefixConfig;

}.call(this) }),
"[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/middleware/config.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
var config = __turbopack_require__("[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/routing/config.js [middleware] (ecmascript)");
function receiveConfig(input) {
    var _input$alternateLinks, _input$localeDetectio;
    return {
        ...input,
        alternateLinks: (_input$alternateLinks = input === null || input === void 0 ? void 0 : input.alternateLinks) !== null && _input$alternateLinks !== void 0 ? _input$alternateLinks : true,
        localeDetection: (_input$localeDetectio = input === null || input === void 0 ? void 0 : input.localeDetection) !== null && _input$localeDetectio !== void 0 ? _input$localeDetectio : true,
        localePrefix: config.receiveLocalePrefixConfig(input === null || input === void 0 ? void 0 : input.localePrefix)
    };
}
exports.receiveConfig = receiveConfig;

}.call(this) }),
"[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/middleware/utils.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
var utils = __turbopack_require__("[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/shared/utils.js [middleware] (ecmascript)");
function isOptionalCatchAllSegment(pathname) {
    return pathname.includes('[[...');
}
function isCatchAllSegment(pathname) {
    return pathname.includes('[...');
}
function isDynamicSegment(pathname) {
    return pathname.includes('[');
}
function comparePathnamePairs(a, b) {
    const pathA = a.split('/');
    const pathB = b.split('/');
    const maxLength = Math.max(pathA.length, pathB.length);
    for(let i = 0; i < maxLength; i++){
        const segmentA = pathA[i];
        const segmentB = pathB[i];
        // If one of the paths ends, prioritize the shorter path
        if (!segmentA && segmentB) return -1;
        if (segmentA && !segmentB) return 1;
        // Prioritize static segments over dynamic segments
        if (!isDynamicSegment(segmentA) && isDynamicSegment(segmentB)) return -1;
        if (isDynamicSegment(segmentA) && !isDynamicSegment(segmentB)) return 1;
        // Prioritize non-catch-all segments over catch-all segments
        if (!isCatchAllSegment(segmentA) && isCatchAllSegment(segmentB)) return -1;
        if (isCatchAllSegment(segmentA) && !isCatchAllSegment(segmentB)) return 1;
        // Prioritize non-optional catch-all segments over optional catch-all segments
        if (!isOptionalCatchAllSegment(segmentA) && isOptionalCatchAllSegment(segmentB)) {
            return -1;
        }
        if (isOptionalCatchAllSegment(segmentA) && !isOptionalCatchAllSegment(segmentB)) {
            return 1;
        }
        if (segmentA === segmentB) continue;
    }
    // Both pathnames are completely static
    return 0;
}
function getSortedPathnames(pathnames) {
    const sortedPathnames = pathnames.sort(comparePathnamePairs);
    return sortedPathnames;
}
function getInternalTemplate(pathnames, pathname, locale) {
    const sortedPathnames = getSortedPathnames(Object.keys(pathnames));
    // Try to find a localized pathname that matches
    for (const internalPathname of sortedPathnames){
        const localizedPathnamesOrPathname = pathnames[internalPathname];
        if (typeof localizedPathnamesOrPathname === 'string') {
            const localizedPathname = localizedPathnamesOrPathname;
            if (utils.matchesPathname(localizedPathname, pathname)) {
                return [
                    undefined,
                    internalPathname
                ];
            }
        } else {
            // Prefer the entry with the current locale in case multiple
            // localized pathnames match the current pathname
            const sortedEntries = Object.entries(localizedPathnamesOrPathname);
            const curLocaleIndex = sortedEntries.findIndex((_ref)=>{
                let [entryLocale] = _ref;
                return entryLocale === locale;
            });
            if (curLocaleIndex > 0) {
                sortedEntries.unshift(sortedEntries.splice(curLocaleIndex, 1)[0]);
            }
            for (const [entryLocale, entryPathname] of sortedEntries){
                if (utils.matchesPathname(entryPathname, pathname)) {
                    return [
                        entryLocale,
                        internalPathname
                    ];
                }
            }
        }
    }
    // Try to find an internal pathname that matches (this can be the case
    // if all localized pathnames are different from the internal pathnames).
    for (const internalPathname of Object.keys(pathnames)){
        if (utils.matchesPathname(internalPathname, pathname)) {
            return [
                undefined,
                internalPathname
            ];
        }
    }
    // No match
    return [
        undefined,
        undefined
    ];
}
function formatTemplatePathname(sourcePathname, sourceTemplate, targetTemplate, prefix) {
    const params = getRouteParams(sourceTemplate, sourcePathname);
    let targetPathname = '';
    if (prefix) {
        targetPathname = "/".concat(prefix);
    }
    targetPathname += formatPathnameTemplate(targetTemplate, params);
    targetPathname = normalizeTrailingSlash(targetPathname);
    return targetPathname;
}
/**
 * Removes potential prefixes from the pathname.
 */ function getNormalizedPathname(pathname, locales, localePrefix) {
    // Add trailing slash for consistent handling
    // both for the root as well as nested paths
    if (!pathname.endsWith('/')) {
        pathname += '/';
    }
    const localePrefixes = getLocalePrefixes(locales, localePrefix);
    const regex = new RegExp("^(".concat(localePrefixes.map((_ref2)=>{
        let [, prefix] = _ref2;
        return prefix.replaceAll('/', '\\/');
    }).join('|'), ")/(.*)"), 'i');
    const match = pathname.match(regex);
    let result = match ? '/' + match[2] : pathname;
    if (result !== '/') {
        result = normalizeTrailingSlash(result);
    }
    return result;
}
function getLocalePrefixes(locales, localePrefix) {
    return locales.map((locale)=>[
            locale,
            utils.getLocalePrefix(locale, localePrefix)
        ]);
}
function getPathnameMatch(pathname, locales, localePrefix) {
    const localePrefixes = getLocalePrefixes(locales, localePrefix);
    for (const [locale, prefix] of localePrefixes){
        let exact, matches;
        if (pathname === prefix || pathname.startsWith(prefix + '/')) {
            exact = matches = true;
        } else {
            const normalizedPathname = pathname.toLowerCase();
            const normalizedPrefix = prefix.toLowerCase();
            if (normalizedPathname === normalizedPrefix || normalizedPathname.startsWith(normalizedPrefix + '/')) {
                exact = false;
                matches = true;
            }
        }
        if (matches) {
            return {
                locale,
                prefix,
                matchedPrefix: pathname.slice(0, prefix.length),
                exact
            };
        }
    }
}
function getRouteParams(template, pathname) {
    const regex = utils.templateToRegex(template);
    const match = regex.exec(pathname);
    if (!match) return undefined;
    const params = {};
    for(let i = 1; i < match.length; i++){
        var _template$match;
        const key = (_template$match = template.match(/\[([^\]]+)\]/g)) === null || _template$match === void 0 ? void 0 : _template$match[i - 1].replace(/[[\]]/g, '');
        if (key) params[key] = match[i];
    }
    return params;
}
function formatPathnameTemplate(template, params) {
    if (!params) return template;
    // Simplify syntax for optional catchall ('[[...slug]]') so
    // we can replace the value with simple interpolation
    template = template.replace(/\[\[/g, '[').replace(/\]\]/g, ']');
    let result = template;
    Object.entries(params).forEach((_ref3)=>{
        let [key, value] = _ref3;
        result = result.replace("[".concat(key, "]"), value);
    });
    return result;
}
function formatPathname(pathname, prefix, search) {
    let result = pathname;
    if (prefix) {
        result = utils.prefixPathname(prefix, result);
    }
    if (search) {
        result += search;
    }
    return result;
}
function getHost(requestHeaders) {
    var _ref4, _requestHeaders$get;
    return (_ref4 = (_requestHeaders$get = requestHeaders.get('x-forwarded-host')) !== null && _requestHeaders$get !== void 0 ? _requestHeaders$get : requestHeaders.get('host')) !== null && _ref4 !== void 0 ? _ref4 : undefined;
}
function isLocaleSupportedOnDomain(locale, domain) {
    return domain.defaultLocale === locale || !domain.locales || domain.locales.includes(locale);
}
function getBestMatchingDomain(curHostDomain, locale, domainConfigs) {
    let domainConfig;
    // Prio 1: Stay on current domain
    if (curHostDomain && isLocaleSupportedOnDomain(locale, curHostDomain)) {
        domainConfig = curHostDomain;
    }
    // Prio 2: Use alternative domain with matching default locale
    if (!domainConfig) {
        domainConfig = domainConfigs.find((cur)=>cur.defaultLocale === locale);
    }
    // Prio 3: Use alternative domain with restricted matching locale
    if (!domainConfig) {
        domainConfig = domainConfigs.find((cur)=>cur.locales != null && cur.locales.includes(locale));
    }
    // Prio 4: Stay on the current domain if it supports all locales
    if (!domainConfig && (curHostDomain === null || curHostDomain === void 0 ? void 0 : curHostDomain.locales) == null) {
        domainConfig = curHostDomain;
    }
    // Prio 5: Use alternative domain that supports all locales
    if (!domainConfig) {
        domainConfig = domainConfigs.find((cur)=>!cur.locales);
    }
    return domainConfig;
}
function applyBasePath(pathname, basePath) {
    return normalizeTrailingSlash(basePath + pathname);
}
function normalizeTrailingSlash(pathname) {
    if (pathname !== '/' && pathname.endsWith('/')) {
        pathname = pathname.slice(0, -1);
    }
    return pathname;
}
function getLocaleAsPrefix(locale) {
    return "/".concat(locale);
}
exports.applyBasePath = applyBasePath;
exports.comparePathnamePairs = comparePathnamePairs;
exports.formatPathname = formatPathname;
exports.formatPathnameTemplate = formatPathnameTemplate;
exports.formatTemplatePathname = formatTemplatePathname;
exports.getBestMatchingDomain = getBestMatchingDomain;
exports.getHost = getHost;
exports.getInternalTemplate = getInternalTemplate;
exports.getLocaleAsPrefix = getLocaleAsPrefix;
exports.getLocalePrefixes = getLocalePrefixes;
exports.getNormalizedPathname = getNormalizedPathname;
exports.getPathnameMatch = getPathnameMatch;
exports.getRouteParams = getRouteParams;
exports.getSortedPathnames = getSortedPathnames;
exports.isLocaleSupportedOnDomain = isLocaleSupportedOnDomain;
exports.normalizeTrailingSlash = normalizeTrailingSlash;

}.call(this) }),
"[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/middleware/getAlternateLinksHeaderValue.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
var utils = __turbopack_require__("[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/middleware/utils.js [middleware] (ecmascript)");
/**
 * See https://developers.google.com/search/docs/specialty/international/localized-versions
 */ function getAlternateLinksHeaderValue(_ref) {
    var _request$headers$get;
    let { config, localizedPathnames, request, resolvedLocale } = _ref;
    const normalizedUrl = request.nextUrl.clone();
    const host = utils.getHost(request.headers);
    if (host) {
        normalizedUrl.port = '';
        normalizedUrl.host = host;
    }
    normalizedUrl.protocol = (_request$headers$get = request.headers.get('x-forwarded-proto')) !== null && _request$headers$get !== void 0 ? _request$headers$get : normalizedUrl.protocol;
    normalizedUrl.pathname = utils.getNormalizedPathname(normalizedUrl.pathname, config.locales, config.localePrefix);
    function getAlternateEntry(url, locale) {
        if (request.nextUrl.basePath) {
            url = new URL(url);
            url.pathname = utils.applyBasePath(url.pathname, request.nextUrl.basePath);
        }
        return "<".concat(url.toString(), ">; rel=\"alternate\"; hreflang=\"").concat(locale, "\"");
    }
    function getLocalizedPathname(pathname, locale) {
        if (localizedPathnames && typeof localizedPathnames === 'object') {
            return utils.formatTemplatePathname(pathname, localizedPathnames[resolvedLocale], localizedPathnames[locale]);
        } else {
            return pathname;
        }
    }
    const links = utils.getLocalePrefixes(config.locales, config.localePrefix).flatMap((_ref2)=>{
        let [locale, prefix] = _ref2;
        function prefixPathname(pathname) {
            if (pathname === '/') {
                return prefix;
            } else {
                return prefix + pathname;
            }
        }
        let url;
        if (config.domains) {
            const domainConfigs = config.domains.filter((cur)=>utils.isLocaleSupportedOnDomain(locale, cur)) || [];
            return domainConfigs.map((domainConfig)=>{
                url = new URL(normalizedUrl);
                url.port = '';
                url.host = domainConfig.domain;
                // Important: Use `normalizedUrl` here, as `url` potentially uses
                // a `basePath` that automatically gets applied to the pathname
                url.pathname = getLocalizedPathname(normalizedUrl.pathname, locale);
                if (locale !== domainConfig.defaultLocale || config.localePrefix.mode === 'always') {
                    url.pathname = prefixPathname(url.pathname);
                }
                return getAlternateEntry(url, locale);
            });
        } else {
            let pathname;
            if (localizedPathnames && typeof localizedPathnames === 'object') {
                pathname = getLocalizedPathname(normalizedUrl.pathname, locale);
            } else {
                pathname = normalizedUrl.pathname;
            }
            if (locale !== config.defaultLocale || config.localePrefix.mode === 'always') {
                pathname = prefixPathname(pathname);
            }
            url = new URL(pathname, normalizedUrl);
        }
        return getAlternateEntry(url, locale);
    });
    // Add x-default entry
    const shouldAddXDefault = // For domain-based routing there is no reasonable x-default
    !config.domains && (config.localePrefix.mode !== 'always' || normalizedUrl.pathname === '/');
    if (shouldAddXDefault) {
        const url = new URL(getLocalizedPathname(normalizedUrl.pathname, config.defaultLocale), normalizedUrl);
        links.push(getAlternateEntry(url, 'x-default'));
    }
    return links.join(', ');
}
exports.default = getAlternateLinksHeaderValue;

}.call(this) }),
"[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/CanonicalizeLocaleList.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * http://ecma-international.org/ecma-402/7.0/index.html#sec-canonicalizelocalelist
 * @param locales
 */ __turbopack_esm__({
    "CanonicalizeLocaleList": ()=>CanonicalizeLocaleList
});
function CanonicalizeLocaleList(locales) {
    // TODO
    return Intl.getCanonicalLocales(locales);
}

})()),
"[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/utils.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "UNICODE_EXTENSION_SEQUENCE_REGEX": ()=>UNICODE_EXTENSION_SEQUENCE_REGEX,
    "invariant": ()=>invariant
});
var UNICODE_EXTENSION_SEQUENCE_REGEX = /-u(?:-[0-9a-z]{2,8})+/gi;
function invariant(condition, message, Err) {
    if (Err === void 0) {
        Err = Error;
    }
    if (!condition) {
        throw new Err(message);
    }
}

})()),
"[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/BestAvailableLocale.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * https://tc39.es/ecma402/#sec-bestavailablelocale
 * @param availableLocales
 * @param locale
 */ __turbopack_esm__({
    "BestAvailableLocale": ()=>BestAvailableLocale
});
function BestAvailableLocale(availableLocales, locale) {
    var candidate = locale;
    while(true){
        if (availableLocales.has(candidate)) {
            return candidate;
        }
        var pos = candidate.lastIndexOf('-');
        if (!~pos) {
            return undefined;
        }
        if (pos >= 2 && candidate[pos - 2] === '-') {
            pos -= 2;
        }
        candidate = candidate.slice(0, pos);
    }
}

})()),
"[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/LookupMatcher.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "LookupMatcher": ()=>LookupMatcher
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$BestAvailableLocale$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/BestAvailableLocale.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function LookupMatcher(availableLocales, requestedLocales, getDefaultLocale) {
    var result = {
        locale: ''
    };
    for(var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++){
        var locale = requestedLocales_1[_i];
        var noExtensionLocale = locale.replace(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["UNICODE_EXTENSION_SEQUENCE_REGEX"], '');
        var availableLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$BestAvailableLocale$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["BestAvailableLocale"])(availableLocales, noExtensionLocale);
        if (availableLocale) {
            result.locale = availableLocale;
            if (locale !== noExtensionLocale) {
                result.extension = locale.slice(noExtensionLocale.length + 1, locale.length);
            }
            return result;
        }
    }
    result.locale = getDefaultLocale();
    return result;
}

})()),
"[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/BestFitMatcher.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "BestFitMatcher": ()=>BestFitMatcher
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$BestAvailableLocale$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/BestAvailableLocale.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/utils.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function BestFitMatcher(availableLocales, requestedLocales, getDefaultLocale) {
    var minimizedAvailableLocaleMap = {};
    var availableLocaleMap = {};
    var canonicalizedLocaleMap = {};
    var minimizedAvailableLocales = new Set();
    availableLocales.forEach(function(locale) {
        var minimizedLocale = new Intl.Locale(locale).minimize().toString();
        var canonicalizedLocale = Intl.getCanonicalLocales(locale)[0] || locale;
        minimizedAvailableLocaleMap[minimizedLocale] = locale;
        availableLocaleMap[locale] = locale;
        canonicalizedLocaleMap[canonicalizedLocale] = locale;
        minimizedAvailableLocales.add(minimizedLocale);
        minimizedAvailableLocales.add(locale);
        minimizedAvailableLocales.add(canonicalizedLocale);
    });
    var foundLocale;
    for(var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++){
        var l = requestedLocales_1[_i];
        if (foundLocale) {
            break;
        }
        var noExtensionLocale = l.replace(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["UNICODE_EXTENSION_SEQUENCE_REGEX"], '');
        if (availableLocales.has(noExtensionLocale)) {
            foundLocale = noExtensionLocale;
            break;
        }
        if (minimizedAvailableLocales.has(noExtensionLocale)) {
            foundLocale = noExtensionLocale;
            break;
        }
        var locale = new Intl.Locale(noExtensionLocale);
        var maximizedRequestedLocale = locale.maximize().toString();
        var minimizedRequestedLocale = locale.minimize().toString();
        // Check minimized locale
        if (minimizedAvailableLocales.has(minimizedRequestedLocale)) {
            foundLocale = minimizedRequestedLocale;
            break;
        }
        // Lookup algo on maximized locale
        foundLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$BestAvailableLocale$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["BestAvailableLocale"])(minimizedAvailableLocales, maximizedRequestedLocale);
    }
    if (!foundLocale) {
        return {
            locale: getDefaultLocale()
        };
    }
    return {
        locale: availableLocaleMap[foundLocale] || canonicalizedLocaleMap[foundLocale] || minimizedAvailableLocaleMap[foundLocale] || foundLocale
    };
}

})()),
"[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/UnicodeExtensionValue.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "UnicodeExtensionValue": ()=>UnicodeExtensionValue
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/utils.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
function UnicodeExtensionValue(extension, key) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["invariant"])(key.length === 2, 'key must have 2 elements');
    var size = extension.length;
    var searchValue = "-".concat(key, "-");
    var pos = extension.indexOf(searchValue);
    if (pos !== -1) {
        var start = pos + 4;
        var end = start;
        var k = start;
        var done = false;
        while(!done){
            var e = extension.indexOf('-', k);
            var len = void 0;
            if (e === -1) {
                len = size - k;
            } else {
                len = e - k;
            }
            if (len === 2) {
                done = true;
            } else if (e === -1) {
                end = size;
                done = true;
            } else {
                end = e;
                k = e + 1;
            }
        }
        return extension.slice(start, end);
    }
    searchValue = "-".concat(key);
    pos = extension.indexOf(searchValue);
    if (pos !== -1 && pos + 3 === size) {
        return '';
    }
    return undefined;
}

})()),
"[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/ResolveLocale.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ResolveLocale": ()=>ResolveLocale
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$LookupMatcher$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/LookupMatcher.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$BestFitMatcher$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/BestFitMatcher.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$UnicodeExtensionValue$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/UnicodeExtensionValue.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
function ResolveLocale(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData, getDefaultLocale) {
    var matcher = options.localeMatcher;
    var r;
    if (matcher === 'lookup') {
        r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$LookupMatcher$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["LookupMatcher"])(availableLocales, requestedLocales, getDefaultLocale);
    } else {
        r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$BestFitMatcher$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["BestFitMatcher"])(availableLocales, requestedLocales, getDefaultLocale);
    }
    var foundLocale = r.locale;
    var result = {
        locale: '',
        dataLocale: foundLocale
    };
    var supportedExtension = '-u';
    for(var _i = 0, relevantExtensionKeys_1 = relevantExtensionKeys; _i < relevantExtensionKeys_1.length; _i++){
        var key = relevantExtensionKeys_1[_i];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["invariant"])(foundLocale in localeData, "Missing locale data for ".concat(foundLocale));
        var foundLocaleData = localeData[foundLocale];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["invariant"])(typeof foundLocaleData === 'object' && foundLocaleData !== null, "locale data ".concat(key, " must be an object"));
        var keyLocaleData = foundLocaleData[key];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["invariant"])(Array.isArray(keyLocaleData), "keyLocaleData for ".concat(key, " must be an array"));
        var value = keyLocaleData[0];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["invariant"])(typeof value === 'string' || value === null, "value must be string or null but got ".concat(typeof value, " in key ").concat(key));
        var supportedExtensionAddition = '';
        if (r.extension) {
            var requestedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$UnicodeExtensionValue$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["UnicodeExtensionValue"])(r.extension, key);
            if (requestedValue !== undefined) {
                if (requestedValue !== '') {
                    if (~keyLocaleData.indexOf(requestedValue)) {
                        value = requestedValue;
                        supportedExtensionAddition = "-".concat(key, "-").concat(value);
                    }
                } else if (~requestedValue.indexOf('true')) {
                    value = 'true';
                    supportedExtensionAddition = "-".concat(key);
                }
            }
        }
        if (key in options) {
            var optionsValue = options[key];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["invariant"])(typeof optionsValue === 'string' || typeof optionsValue === 'undefined' || optionsValue === null, 'optionsValue must be String, Undefined or Null');
            if (~keyLocaleData.indexOf(optionsValue)) {
                if (optionsValue !== value) {
                    value = optionsValue;
                    supportedExtensionAddition = '';
                }
            }
        }
        result[key] = value;
        supportedExtension += supportedExtensionAddition;
    }
    if (supportedExtension.length > 2) {
        var privateIndex = foundLocale.indexOf('-x-');
        if (privateIndex === -1) {
            foundLocale = foundLocale + supportedExtension;
        } else {
            var preExtension = foundLocale.slice(0, privateIndex);
            var postExtension = foundLocale.slice(privateIndex, foundLocale.length);
            foundLocale = preExtension + supportedExtension + postExtension;
        }
        foundLocale = Intl.getCanonicalLocales(foundLocale)[0];
    }
    result.locale = foundLocale;
    return result;
}

})()),
"[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/LookupSupportedLocales.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "LookupSupportedLocales": ()=>LookupSupportedLocales
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$BestAvailableLocale$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/BestAvailableLocale.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function LookupSupportedLocales(availableLocales, requestedLocales) {
    var subset = [];
    for(var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++){
        var locale = requestedLocales_1[_i];
        var noExtensionLocale = locale.replace(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["UNICODE_EXTENSION_SEQUENCE_REGEX"], '');
        var availableLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$BestAvailableLocale$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["BestAvailableLocale"])(availableLocales, noExtensionLocale);
        if (availableLocale) {
            subset.push(availableLocale);
        }
    }
    return subset;
}

})()),
"[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/index.js [middleware] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "match": ()=>match
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$ResolveLocale$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/ResolveLocale.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$CanonicalizeLocaleList$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/CanonicalizeLocaleList.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function match(requestedLocales, availableLocales, defaultLocale, opts) {
    var locales = availableLocales.reduce(function(all, l) {
        all.add(l);
        return all;
    }, new Set());
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$ResolveLocale$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ResolveLocale"])(locales, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$CanonicalizeLocaleList$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["CanonicalizeLocaleList"])(requestedLocales), {
        localeMatcher: (opts === null || opts === void 0 ? void 0 : opts.algorithm) || 'best fit'
    }, [], {}, function() {
        return defaultLocale;
    }).locale;
}
;
;

})()),
"[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/index.js [middleware] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$CanonicalizeLocaleList$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/CanonicalizeLocaleList.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$ResolveLocale$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/ResolveLocale.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$LookupSupportedLocales$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/LookupSupportedLocales.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/index.js [middleware] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/index.js [middleware] (ecmascript) <exports>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "LookupSupportedLocales": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$LookupSupportedLocales$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["LookupSupportedLocales"],
    "ResolveLocale": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$ResolveLocale$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ResolveLocale"],
    "match": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["match"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$LookupSupportedLocales$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/LookupSupportedLocales.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$abstract$2f$ResolveLocale$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/abstract/ResolveLocale.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/index.js [middleware] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/index.js [middleware] (ecmascript) <facade>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "LookupSupportedLocales": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["LookupSupportedLocales"],
    "ResolveLocale": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["ResolveLocale"],
    "match": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["match"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/index.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$2$2e$32$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/index.js [middleware] (ecmascript) <exports>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/lib/charset.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */ 'use strict';
/**
 * Module exports.
 * @public
 */ module.exports = preferredCharsets;
module.exports.preferredCharsets = preferredCharsets;
/**
 * Module variables.
 * @private
 */ var simpleCharsetRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
/**
 * Parse the Accept-Charset header.
 * @private
 */ function parseAcceptCharset(accept) {
    var accepts = accept.split(',');
    for(var i = 0, j = 0; i < accepts.length; i++){
        var charset = parseCharset(accepts[i].trim(), i);
        if (charset) {
            accepts[j++] = charset;
        }
    }
    // trim accepts
    accepts.length = j;
    return accepts;
}
/**
 * Parse a charset from the Accept-Charset header.
 * @private
 */ function parseCharset(str, i) {
    var match = simpleCharsetRegExp.exec(str);
    if (!match) return null;
    var charset = match[1];
    var q = 1;
    if (match[2]) {
        var params = match[2].split(';');
        for(var j = 0; j < params.length; j++){
            var p = params[j].trim().split('=');
            if (p[0] === 'q') {
                q = parseFloat(p[1]);
                break;
            }
        }
    }
    return {
        charset: charset,
        q: q,
        i: i
    };
}
/**
 * Get the priority of a charset.
 * @private
 */ function getCharsetPriority(charset, accepted, index) {
    var priority = {
        o: -1,
        q: 0,
        s: 0
    };
    for(var i = 0; i < accepted.length; i++){
        var spec = specify(charset, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
            priority = spec;
        }
    }
    return priority;
}
/**
 * Get the specificity of the charset.
 * @private
 */ function specify(charset, spec, index) {
    var s = 0;
    if (spec.charset.toLowerCase() === charset.toLowerCase()) {
        s |= 1;
    } else if (spec.charset !== '*') {
        return null;
    }
    return {
        i: index,
        o: spec.i,
        q: spec.q,
        s: s
    };
}
/**
 * Get the preferred charsets from an Accept-Charset header.
 * @public
 */ function preferredCharsets(accept, provided) {
    // RFC 2616 sec 14.2: no header = *
    var accepts = parseAcceptCharset(accept === undefined ? '*' : accept || '');
    if (!provided) {
        // sorted list of all charsets
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullCharset);
    }
    var priorities = provided.map(function getPriority(type, index) {
        return getCharsetPriority(type, accepts, index);
    });
    // sorted list of accepted charsets
    return priorities.filter(isQuality).sort(compareSpecs).map(function getCharset(priority) {
        return provided[priorities.indexOf(priority)];
    });
}
/**
 * Compare two specs.
 * @private
 */ function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
/**
 * Get full charset string.
 * @private
 */ function getFullCharset(spec) {
    return spec.charset;
}
/**
 * Check if a spec has any quality.
 * @private
 */ function isQuality(spec) {
    return spec.q > 0;
}

}.call(this) }),
"[project]/node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/lib/encoding.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */ 'use strict';
/**
 * Module exports.
 * @public
 */ module.exports = preferredEncodings;
module.exports.preferredEncodings = preferredEncodings;
/**
 * Module variables.
 * @private
 */ var simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
/**
 * Parse the Accept-Encoding header.
 * @private
 */ function parseAcceptEncoding(accept) {
    var accepts = accept.split(',');
    var hasIdentity = false;
    var minQuality = 1;
    for(var i = 0, j = 0; i < accepts.length; i++){
        var encoding = parseEncoding(accepts[i].trim(), i);
        if (encoding) {
            accepts[j++] = encoding;
            hasIdentity = hasIdentity || specify('identity', encoding);
            minQuality = Math.min(minQuality, encoding.q || 1);
        }
    }
    if (!hasIdentity) {
        /*
     * If identity doesn't explicitly appear in the accept-encoding header,
     * it's added to the list of acceptable encoding with the lowest q
     */ accepts[j++] = {
            encoding: 'identity',
            q: minQuality,
            i: i
        };
    }
    // trim accepts
    accepts.length = j;
    return accepts;
}
/**
 * Parse an encoding from the Accept-Encoding header.
 * @private
 */ function parseEncoding(str, i) {
    var match = simpleEncodingRegExp.exec(str);
    if (!match) return null;
    var encoding = match[1];
    var q = 1;
    if (match[2]) {
        var params = match[2].split(';');
        for(var j = 0; j < params.length; j++){
            var p = params[j].trim().split('=');
            if (p[0] === 'q') {
                q = parseFloat(p[1]);
                break;
            }
        }
    }
    return {
        encoding: encoding,
        q: q,
        i: i
    };
}
/**
 * Get the priority of an encoding.
 * @private
 */ function getEncodingPriority(encoding, accepted, index) {
    var priority = {
        o: -1,
        q: 0,
        s: 0
    };
    for(var i = 0; i < accepted.length; i++){
        var spec = specify(encoding, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
            priority = spec;
        }
    }
    return priority;
}
/**
 * Get the specificity of the encoding.
 * @private
 */ function specify(encoding, spec, index) {
    var s = 0;
    if (spec.encoding.toLowerCase() === encoding.toLowerCase()) {
        s |= 1;
    } else if (spec.encoding !== '*') {
        return null;
    }
    return {
        i: index,
        o: spec.i,
        q: spec.q,
        s: s
    };
}
;
/**
 * Get the preferred encodings from an Accept-Encoding header.
 * @public
 */ function preferredEncodings(accept, provided) {
    var accepts = parseAcceptEncoding(accept || '');
    if (!provided) {
        // sorted list of all encodings
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullEncoding);
    }
    var priorities = provided.map(function getPriority(type, index) {
        return getEncodingPriority(type, accepts, index);
    });
    // sorted list of accepted encodings
    return priorities.filter(isQuality).sort(compareSpecs).map(function getEncoding(priority) {
        return provided[priorities.indexOf(priority)];
    });
}
/**
 * Compare two specs.
 * @private
 */ function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
/**
 * Get full encoding string.
 * @private
 */ function getFullEncoding(spec) {
    return spec.encoding;
}
/**
 * Check if a spec has any quality.
 * @private
 */ function isQuality(spec) {
    return spec.q > 0;
}

}.call(this) }),
"[project]/node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/lib/language.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */ 'use strict';
/**
 * Module exports.
 * @public
 */ module.exports = preferredLanguages;
module.exports.preferredLanguages = preferredLanguages;
/**
 * Module variables.
 * @private
 */ var simpleLanguageRegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
/**
 * Parse the Accept-Language header.
 * @private
 */ function parseAcceptLanguage(accept) {
    var accepts = accept.split(',');
    for(var i = 0, j = 0; i < accepts.length; i++){
        var language = parseLanguage(accepts[i].trim(), i);
        if (language) {
            accepts[j++] = language;
        }
    }
    // trim accepts
    accepts.length = j;
    return accepts;
}
/**
 * Parse a language from the Accept-Language header.
 * @private
 */ function parseLanguage(str, i) {
    var match = simpleLanguageRegExp.exec(str);
    if (!match) return null;
    var prefix = match[1];
    var suffix = match[2];
    var full = prefix;
    if (suffix) full += "-" + suffix;
    var q = 1;
    if (match[3]) {
        var params = match[3].split(';');
        for(var j = 0; j < params.length; j++){
            var p = params[j].split('=');
            if (p[0] === 'q') q = parseFloat(p[1]);
        }
    }
    return {
        prefix: prefix,
        suffix: suffix,
        q: q,
        i: i,
        full: full
    };
}
/**
 * Get the priority of a language.
 * @private
 */ function getLanguagePriority(language, accepted, index) {
    var priority = {
        o: -1,
        q: 0,
        s: 0
    };
    for(var i = 0; i < accepted.length; i++){
        var spec = specify(language, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
            priority = spec;
        }
    }
    return priority;
}
/**
 * Get the specificity of the language.
 * @private
 */ function specify(language, spec, index) {
    var p = parseLanguage(language);
    if (!p) return null;
    var s = 0;
    if (spec.full.toLowerCase() === p.full.toLowerCase()) {
        s |= 4;
    } else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) {
        s |= 2;
    } else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) {
        s |= 1;
    } else if (spec.full !== '*') {
        return null;
    }
    return {
        i: index,
        o: spec.i,
        q: spec.q,
        s: s
    };
}
;
/**
 * Get the preferred languages from an Accept-Language header.
 * @public
 */ function preferredLanguages(accept, provided) {
    // RFC 2616 sec 14.4: no header = *
    var accepts = parseAcceptLanguage(accept === undefined ? '*' : accept || '');
    if (!provided) {
        // sorted list of all languages
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullLanguage);
    }
    var priorities = provided.map(function getPriority(type, index) {
        return getLanguagePriority(type, accepts, index);
    });
    // sorted list of accepted languages
    return priorities.filter(isQuality).sort(compareSpecs).map(function getLanguage(priority) {
        return provided[priorities.indexOf(priority)];
    });
}
/**
 * Compare two specs.
 * @private
 */ function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
/**
 * Get full language string.
 * @private
 */ function getFullLanguage(spec) {
    return spec.full;
}
/**
 * Check if a spec has any quality.
 * @private
 */ function isQuality(spec) {
    return spec.q > 0;
}

}.call(this) }),
"[project]/node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/lib/mediaType.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */ 'use strict';
/**
 * Module exports.
 * @public
 */ module.exports = preferredMediaTypes;
module.exports.preferredMediaTypes = preferredMediaTypes;
/**
 * Module variables.
 * @private
 */ var simpleMediaTypeRegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
/**
 * Parse the Accept header.
 * @private
 */ function parseAccept(accept) {
    var accepts = splitMediaTypes(accept);
    for(var i = 0, j = 0; i < accepts.length; i++){
        var mediaType = parseMediaType(accepts[i].trim(), i);
        if (mediaType) {
            accepts[j++] = mediaType;
        }
    }
    // trim accepts
    accepts.length = j;
    return accepts;
}
/**
 * Parse a media type from the Accept header.
 * @private
 */ function parseMediaType(str, i) {
    var match = simpleMediaTypeRegExp.exec(str);
    if (!match) return null;
    var params = Object.create(null);
    var q = 1;
    var subtype = match[2];
    var type = match[1];
    if (match[3]) {
        var kvps = splitParameters(match[3]).map(splitKeyValuePair);
        for(var j = 0; j < kvps.length; j++){
            var pair = kvps[j];
            var key = pair[0].toLowerCase();
            var val = pair[1];
            // get the value, unwrapping quotes
            var value = val && val[0] === '"' && val[val.length - 1] === '"' ? val.substr(1, val.length - 2) : val;
            if (key === 'q') {
                q = parseFloat(value);
                break;
            }
            // store parameter
            params[key] = value;
        }
    }
    return {
        type: type,
        subtype: subtype,
        params: params,
        q: q,
        i: i
    };
}
/**
 * Get the priority of a media type.
 * @private
 */ function getMediaTypePriority(type, accepted, index) {
    var priority = {
        o: -1,
        q: 0,
        s: 0
    };
    for(var i = 0; i < accepted.length; i++){
        var spec = specify(type, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
            priority = spec;
        }
    }
    return priority;
}
/**
 * Get the specificity of the media type.
 * @private
 */ function specify(type, spec, index) {
    var p = parseMediaType(type);
    var s = 0;
    if (!p) {
        return null;
    }
    if (spec.type.toLowerCase() == p.type.toLowerCase()) {
        s |= 4;
    } else if (spec.type != '*') {
        return null;
    }
    if (spec.subtype.toLowerCase() == p.subtype.toLowerCase()) {
        s |= 2;
    } else if (spec.subtype != '*') {
        return null;
    }
    var keys = Object.keys(spec.params);
    if (keys.length > 0) {
        if (keys.every(function(k) {
            return spec.params[k] == '*' || (spec.params[k] || '').toLowerCase() == (p.params[k] || '').toLowerCase();
        })) {
            s |= 1;
        } else {
            return null;
        }
    }
    return {
        i: index,
        o: spec.i,
        q: spec.q,
        s: s
    };
}
/**
 * Get the preferred media types from an Accept header.
 * @public
 */ function preferredMediaTypes(accept, provided) {
    // RFC 2616 sec 14.2: no header = */*
    var accepts = parseAccept(accept === undefined ? '*/*' : accept || '');
    if (!provided) {
        // sorted list of all types
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullType);
    }
    var priorities = provided.map(function getPriority(type, index) {
        return getMediaTypePriority(type, accepts, index);
    });
    // sorted list of accepted types
    return priorities.filter(isQuality).sort(compareSpecs).map(function getType(priority) {
        return provided[priorities.indexOf(priority)];
    });
}
/**
 * Compare two specs.
 * @private
 */ function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
/**
 * Get full type string.
 * @private
 */ function getFullType(spec) {
    return spec.type + '/' + spec.subtype;
}
/**
 * Check if a spec has any quality.
 * @private
 */ function isQuality(spec) {
    return spec.q > 0;
}
/**
 * Count the number of quotes in a string.
 * @private
 */ function quoteCount(string) {
    var count = 0;
    var index = 0;
    while((index = string.indexOf('"', index)) !== -1){
        count++;
        index++;
    }
    return count;
}
/**
 * Split a key value pair.
 * @private
 */ function splitKeyValuePair(str) {
    var index = str.indexOf('=');
    var key;
    var val;
    if (index === -1) {
        key = str;
    } else {
        key = str.substr(0, index);
        val = str.substr(index + 1);
    }
    return [
        key,
        val
    ];
}
/**
 * Split an Accept header into media types.
 * @private
 */ function splitMediaTypes(accept) {
    var accepts = accept.split(',');
    for(var i = 1, j = 0; i < accepts.length; i++){
        if (quoteCount(accepts[j]) % 2 == 0) {
            accepts[++j] = accepts[i];
        } else {
            accepts[j] += ',' + accepts[i];
        }
    }
    // trim accepts
    accepts.length = j + 1;
    return accepts;
}
/**
 * Split a string of parameters.
 * @private
 */ function splitParameters(str) {
    var parameters = str.split(';');
    for(var i = 1, j = 0; i < parameters.length; i++){
        if (quoteCount(parameters[j]) % 2 == 0) {
            parameters[++j] = parameters[i];
        } else {
            parameters[j] += ';' + parameters[i];
        }
    }
    // trim parameters
    parameters.length = j + 1;
    for(var i = 0; i < parameters.length; i++){
        parameters[i] = parameters[i].trim();
    }
    return parameters;
}

}.call(this) }),
"[project]/node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/index.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

/*!
 * negotiator
 * Copyright(c) 2012 Federico Romero
 * Copyright(c) 2012-2014 Isaac Z. Schlueter
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ 'use strict';
var preferredCharsets = __turbopack_require__("[project]/node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/lib/charset.js [middleware] (ecmascript)");
var preferredEncodings = __turbopack_require__("[project]/node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/lib/encoding.js [middleware] (ecmascript)");
var preferredLanguages = __turbopack_require__("[project]/node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/lib/language.js [middleware] (ecmascript)");
var preferredMediaTypes = __turbopack_require__("[project]/node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/lib/mediaType.js [middleware] (ecmascript)");
/**
 * Module exports.
 * @public
 */ module.exports = Negotiator;
module.exports.Negotiator = Negotiator;
/**
 * Create a Negotiator instance from a request.
 * @param {object} request
 * @public
 */ function Negotiator(request) {
    if (!(this instanceof Negotiator)) {
        return new Negotiator(request);
    }
    this.request = request;
}
Negotiator.prototype.charset = function charset(available) {
    var set = this.charsets(available);
    return set && set[0];
};
Negotiator.prototype.charsets = function charsets(available) {
    return preferredCharsets(this.request.headers['accept-charset'], available);
};
Negotiator.prototype.encoding = function encoding(available) {
    var set = this.encodings(available);
    return set && set[0];
};
Negotiator.prototype.encodings = function encodings(available) {
    return preferredEncodings(this.request.headers['accept-encoding'], available);
};
Negotiator.prototype.language = function language(available) {
    var set = this.languages(available);
    return set && set[0];
};
Negotiator.prototype.languages = function languages(available) {
    return preferredLanguages(this.request.headers['accept-language'], available);
};
Negotiator.prototype.mediaType = function mediaType(available) {
    var set = this.mediaTypes(available);
    return set && set[0];
};
Negotiator.prototype.mediaTypes = function mediaTypes(available) {
    return preferredMediaTypes(this.request.headers.accept, available);
};
// Backwards compatibility
Negotiator.prototype.preferredCharset = Negotiator.prototype.charset;
Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets;
Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding;
Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings;
Negotiator.prototype.preferredLanguage = Negotiator.prototype.language;
Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages;
Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType;
Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;

}.call(this) }),
"[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/middleware/resolveLocale.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
var intlLocalematcher = __turbopack_require__("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.2.32/node_modules/@formatjs/intl-localematcher/lib/index.js [middleware] (ecmascript) <facade>");
var Negotiator = __turbopack_require__("[project]/node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/index.js [middleware] (ecmascript)");
var constants = __turbopack_require__("[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/shared/constants.js [middleware] (ecmascript)");
var utils = __turbopack_require__("[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/middleware/utils.js [middleware] (ecmascript)");
function _interopDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
var Negotiator__default = /*#__PURE__*/ _interopDefault(Negotiator);
function findDomainFromHost(requestHeaders, domains) {
    var _host;
    let host = utils.getHost(requestHeaders);
    // Remove port (easier for local development)
    host = (_host = host) === null || _host === void 0 ? void 0 : _host.replace(/:\d+$/, '');
    if (host && domains) {
        return domains.find((cur)=>cur.domain === host);
    }
    return undefined;
}
function getAcceptLanguageLocale(requestHeaders, locales, defaultLocale) {
    let locale;
    const languages = new Negotiator__default.default({
        headers: {
            'accept-language': requestHeaders.get('accept-language') || undefined
        }
    }).languages();
    try {
        locale = intlLocalematcher.match(languages, locales, defaultLocale);
    } catch (e) {
    // Invalid language
    }
    return locale;
}
function getLocaleFromCookie(requestCookies, locales) {
    if (requestCookies.has(constants.COOKIE_LOCALE_NAME)) {
        var _requestCookies$get;
        const value = (_requestCookies$get = requestCookies.get(constants.COOKIE_LOCALE_NAME)) === null || _requestCookies$get === void 0 ? void 0 : _requestCookies$get.value;
        if (value && locales.includes(value)) {
            return value;
        }
    }
}
function resolveLocaleFromPrefix(_ref, requestHeaders, requestCookies, pathname) {
    let { defaultLocale, localeDetection, localePrefix, locales } = _ref;
    let locale;
    // Prio 1: Use route prefix
    if (pathname) {
        var _getPathnameMatch;
        locale = (_getPathnameMatch = utils.getPathnameMatch(pathname, locales, localePrefix)) === null || _getPathnameMatch === void 0 ? void 0 : _getPathnameMatch.locale;
    }
    // Prio 2: Use existing cookie
    if (!locale && localeDetection && requestCookies) {
        locale = getLocaleFromCookie(requestCookies, locales);
    }
    // Prio 3: Use the `accept-language` header
    if (!locale && localeDetection && requestHeaders) {
        locale = getAcceptLanguageLocale(requestHeaders, locales, defaultLocale);
    }
    // Prio 4: Use default locale
    if (!locale) {
        locale = defaultLocale;
    }
    return locale;
}
function resolveLocaleFromDomain(config, requestHeaders, requestCookies, pathname) {
    const domains = config.domains;
    const domain = findDomainFromHost(requestHeaders, domains);
    if (!domain) {
        return {
            locale: resolveLocaleFromPrefix(config, requestHeaders, requestCookies, pathname)
        };
    }
    let locale;
    // Prio 1: Use route prefix
    if (pathname) {
        var _getPathnameMatch2;
        const prefixLocale = (_getPathnameMatch2 = utils.getPathnameMatch(pathname, config.locales, config.localePrefix)) === null || _getPathnameMatch2 === void 0 ? void 0 : _getPathnameMatch2.locale;
        if (prefixLocale) {
            if (utils.isLocaleSupportedOnDomain(prefixLocale, domain)) {
                locale = prefixLocale;
            } else {
                // Causes a redirect to a domain that supports the locale
                return {
                    locale: prefixLocale,
                    domain
                };
            }
        }
    }
    // Prio 2: Use existing cookie
    if (!locale && config.localeDetection && requestCookies) {
        const cookieLocale = getLocaleFromCookie(requestCookies, config.locales);
        if (cookieLocale) {
            if (utils.isLocaleSupportedOnDomain(cookieLocale, domain)) {
                locale = cookieLocale;
            }
        }
    }
    // Prio 3: Use the `accept-language` header
    if (!locale && config.localeDetection && requestHeaders) {
        const headerLocale = getAcceptLanguageLocale(requestHeaders, domain.locales || config.locales, domain.defaultLocale);
        if (headerLocale) {
            locale = headerLocale;
        }
    }
    // Prio 4: Use default locale
    if (!locale) {
        locale = domain.defaultLocale;
    }
    return {
        locale,
        domain
    };
}
function resolveLocale(config, requestHeaders, requestCookies, pathname) {
    if (config.domains) {
        return resolveLocaleFromDomain(config, requestHeaders, requestCookies, pathname);
    } else {
        return {
            locale: resolveLocaleFromPrefix(config, requestHeaders, requestCookies, pathname)
        };
    }
}
exports.default = resolveLocale;
exports.getAcceptLanguageLocale = getAcceptLanguageLocale;

}.call(this) }),
"[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/middleware/syncCookie.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
var constants = __turbopack_require__("[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/shared/constants.js [middleware] (ecmascript)");
function syncCookie(request, response, locale) {
    var _request$cookies$get;
    const hasOutdatedCookie = ((_request$cookies$get = request.cookies.get(constants.COOKIE_LOCALE_NAME)) === null || _request$cookies$get === void 0 ? void 0 : _request$cookies$get.value) !== locale;
    if (hasOutdatedCookie) {
        response.cookies.set(constants.COOKIE_LOCALE_NAME, locale, {
            path: request.nextUrl.basePath || undefined,
            sameSite: constants.COOKIE_SAME_SITE,
            maxAge: constants.COOKIE_MAX_AGE
        });
    }
}
exports.default = syncCookie;

}.call(this) }),
"[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/middleware/middleware.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
var server = __turbopack_require__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <facade>");
var constants = __turbopack_require__("[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/shared/constants.js [middleware] (ecmascript)");
var utils$1 = __turbopack_require__("[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/shared/utils.js [middleware] (ecmascript)");
var config = __turbopack_require__("[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/middleware/config.js [middleware] (ecmascript)");
var getAlternateLinksHeaderValue = __turbopack_require__("[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/middleware/getAlternateLinksHeaderValue.js [middleware] (ecmascript)");
var resolveLocale = __turbopack_require__("[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/middleware/resolveLocale.js [middleware] (ecmascript)");
var syncCookie = __turbopack_require__("[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/middleware/syncCookie.js [middleware] (ecmascript)");
var utils = __turbopack_require__("[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/middleware/utils.js [middleware] (ecmascript)");
function createMiddleware(input) {
    const config$1 = config.receiveConfig(input);
    return function middleware(request) {
        var _config$domains;
        // Resolve potential foreign symbols (e.g. /ja/%E7%B4%84 → /ja/約))
        const externalPathname = decodeURI(request.nextUrl.pathname);
        const { domain, locale } = resolveLocale.default(config$1, request.headers, request.cookies, externalPathname);
        const hasMatchedDefaultLocale = domain ? domain.defaultLocale === locale : locale === config$1.defaultLocale;
        const domainConfigs = ((_config$domains = config$1.domains) === null || _config$domains === void 0 ? void 0 : _config$domains.filter((curDomain)=>utils.isLocaleSupportedOnDomain(locale, curDomain))) || [];
        const hasUnknownHost = config$1.domains != null && !domain;
        function rewrite(url) {
            const urlObj = new URL(url, request.url);
            if (request.nextUrl.basePath) {
                urlObj.pathname = utils.applyBasePath(urlObj.pathname, request.nextUrl.basePath);
            }
            const headers = new Headers(request.headers);
            headers.set(constants.HEADER_LOCALE_NAME, locale);
            return server.NextResponse.rewrite(urlObj, {
                request: {
                    headers
                }
            });
        }
        function redirect(url, redirectDomain) {
            const urlObj = new URL(utils.normalizeTrailingSlash(url), request.url);
            if (domainConfigs.length > 0 && !redirectDomain) {
                const bestMatchingDomain = utils.getBestMatchingDomain(domain, locale, domainConfigs);
                if (bestMatchingDomain) {
                    redirectDomain = bestMatchingDomain.domain;
                    if (bestMatchingDomain.defaultLocale === locale && config$1.localePrefix.mode === 'as-needed') {
                        urlObj.pathname = utils.getNormalizedPathname(urlObj.pathname, config$1.locales, config$1.localePrefix);
                    }
                }
            }
            if (redirectDomain) {
                urlObj.host = redirectDomain;
                if (request.headers.get('x-forwarded-host')) {
                    var _request$headers$get, _request$headers$get2;
                    urlObj.protocol = (_request$headers$get = request.headers.get('x-forwarded-proto')) !== null && _request$headers$get !== void 0 ? _request$headers$get : request.nextUrl.protocol;
                    urlObj.port = (_request$headers$get2 = request.headers.get('x-forwarded-port')) !== null && _request$headers$get2 !== void 0 ? _request$headers$get2 : '';
                }
            }
            if (request.nextUrl.basePath) {
                urlObj.pathname = utils.applyBasePath(urlObj.pathname, request.nextUrl.basePath);
            }
            return server.NextResponse.redirect(urlObj.toString());
        }
        const unprefixedExternalPathname = utils.getNormalizedPathname(externalPathname, config$1.locales, config$1.localePrefix);
        const pathnameMatch = utils.getPathnameMatch(externalPathname, config$1.locales, config$1.localePrefix);
        const hasLocalePrefix = pathnameMatch != null;
        const isUnprefixedRouting = config$1.localePrefix.mode === 'never' || hasMatchedDefaultLocale && config$1.localePrefix.mode === 'as-needed';
        let response;
        let internalTemplateName;
        let unprefixedInternalPathname = unprefixedExternalPathname;
        if (config$1.pathnames) {
            let resolvedTemplateLocale;
            [resolvedTemplateLocale, internalTemplateName] = utils.getInternalTemplate(config$1.pathnames, unprefixedExternalPathname, locale);
            if (internalTemplateName) {
                const pathnameConfig = config$1.pathnames[internalTemplateName];
                const localeTemplate = typeof pathnameConfig === 'string' ? pathnameConfig : // @ts-expect-error This is ok
                pathnameConfig[locale];
                if (utils$1.matchesPathname(localeTemplate, unprefixedExternalPathname)) {
                    unprefixedInternalPathname = utils.formatTemplatePathname(unprefixedExternalPathname, localeTemplate, internalTemplateName);
                } else {
                    let sourceTemplate;
                    if (resolvedTemplateLocale) {
                        // A localized pathname from another locale has matched
                        sourceTemplate = typeof pathnameConfig === 'string' ? pathnameConfig : // @ts-expect-error This is ok
                        pathnameConfig[resolvedTemplateLocale];
                    } else {
                        // An internal pathname has matched that
                        // doesn't have a localized pathname
                        sourceTemplate = internalTemplateName;
                    }
                    const localePrefix = isUnprefixedRouting ? undefined : utils$1.getLocalePrefix(locale, config$1.localePrefix);
                    const template = utils.formatTemplatePathname(unprefixedExternalPathname, sourceTemplate, localeTemplate);
                    response = redirect(utils.formatPathname(template, localePrefix, request.nextUrl.search));
                }
            }
        }
        if (!response) {
            if (unprefixedInternalPathname === '/' && !hasLocalePrefix) {
                if (isUnprefixedRouting) {
                    response = rewrite(utils.formatPathname(unprefixedInternalPathname, utils.getLocaleAsPrefix(locale), request.nextUrl.search));
                } else {
                    response = redirect(utils.formatPathname(unprefixedExternalPathname, utils$1.getLocalePrefix(locale, config$1.localePrefix), request.nextUrl.search));
                }
            } else {
                const internalHref = utils.formatPathname(unprefixedInternalPathname, utils.getLocaleAsPrefix(locale), request.nextUrl.search);
                if (hasLocalePrefix) {
                    const externalHref = utils.formatPathname(unprefixedExternalPathname, pathnameMatch.prefix, request.nextUrl.search);
                    if (config$1.localePrefix.mode === 'never') {
                        response = redirect(utils.formatPathname(unprefixedExternalPathname, undefined, request.nextUrl.search));
                    } else if (pathnameMatch.exact) {
                        if (hasMatchedDefaultLocale && isUnprefixedRouting) {
                            response = redirect(utils.formatPathname(unprefixedExternalPathname, undefined, request.nextUrl.search));
                        } else {
                            if (config$1.domains) {
                                const pathDomain = utils.getBestMatchingDomain(domain, pathnameMatch.locale, domainConfigs);
                                if ((domain === null || domain === void 0 ? void 0 : domain.domain) !== (pathDomain === null || pathDomain === void 0 ? void 0 : pathDomain.domain) && !hasUnknownHost) {
                                    response = redirect(externalHref, pathDomain === null || pathDomain === void 0 ? void 0 : pathDomain.domain);
                                } else {
                                    response = rewrite(internalHref);
                                }
                            } else {
                                response = rewrite(internalHref);
                            }
                        }
                    } else {
                        response = redirect(externalHref);
                    }
                } else {
                    if (isUnprefixedRouting) {
                        response = rewrite(internalHref);
                    } else {
                        response = redirect(utils.formatPathname(unprefixedExternalPathname, utils$1.getLocalePrefix(locale, config$1.localePrefix), request.nextUrl.search));
                    }
                }
            }
        }
        if (config$1.localeDetection) {
            syncCookie.default(request, response, locale);
        }
        if (config$1.localePrefix.mode !== 'never' && config$1.alternateLinks && config$1.locales.length > 1) {
            var _config$pathnames;
            response.headers.set('Link', getAlternateLinksHeaderValue.default({
                config: config$1,
                localizedPathnames: internalTemplateName != null ? (_config$pathnames = config$1.pathnames) === null || _config$pathnames === void 0 ? void 0 : _config$pathnames[internalTemplateName] : undefined,
                request,
                resolvedLocale: locale
            }));
        }
        return response;
    };
}
exports.default = createMiddleware;

}.call(this) }),
"[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/middleware.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
var middleware = __turbopack_require__("[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/middleware/middleware.js [middleware] (ecmascript)");
exports.default = middleware.default;

}.call(this) }),
"[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/middleware.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

'use strict';
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    module.exports = __turbopack_require__("[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/development/middleware.js [middleware] (ecmascript)");
}

}.call(this) }),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/server-only/empty.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {


}.call(this) }),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/action-async-storage-instance.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "actionAsyncStorage": ()=>actionAsyncStorage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/async-local-storage.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const actionAsyncStorage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createAsyncLocalStorage"])(); //# sourceMappingURL=action-async-storage-instance.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/action-async-storage.external.js [middleware] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Share the instance module in the next-shared layer
__turbopack_esm__({});
;
;
 //# sourceMappingURL=action-async-storage.external.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/action-async-storage.external.js [middleware] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$action$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/action-async-storage-instance.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$action$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/action-async-storage.external.js [middleware] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/draft-mode.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "DraftMode": ()=>DraftMode
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/static-generation-async-storage.external.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/static-generation-async-storage-instance.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/app-render/dynamic-rendering.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
class DraftMode {
    get isEnabled() {
        return this._provider.isEnabled;
    }
    enable() {
        const store = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["staticGenerationAsyncStorage"].getStore();
        if (store) {
            // We we have a store we want to track dynamic data access to ensure we
            // don't statically generate routes that manipulate draft mode.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["trackDynamicDataAccessed"])(store, 'draftMode().enable()');
        }
        return this._provider.enable();
    }
    disable() {
        const store = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["staticGenerationAsyncStorage"].getStore();
        if (store) {
            // We we have a store we want to track dynamic data access to ensure we
            // don't statically generate routes that manipulate draft mode.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["trackDynamicDataAccessed"])(store, 'draftMode().disable()');
        }
        return this._provider.disable();
    }
    constructor(provider){
        this._provider = provider;
    }
} //# sourceMappingURL=draft-mode.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/headers.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "cookies": ()=>cookies,
    "draftMode": ()=>draftMode,
    "headers": ()=>headers
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/adapters/request-cookies.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$action$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/action-async-storage.external.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$action$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/action-async-storage-instance.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$draft$2d$mode$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/draft-mode.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/app-render/dynamic-rendering.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/static-generation-async-storage.external.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/static-generation-async-storage-instance.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$request$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/request-async-storage.external.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$request$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/request-async-storage.external.js [middleware] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
function headers() {
    const callingExpression = 'headers';
    const staticGenerationStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["staticGenerationAsyncStorage"].getStore();
    if (staticGenerationStore) {
        if (staticGenerationStore.forceStatic) {
            // When we are forcing static we don't mark this as a Dynamic read and we return an empty headers object
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["HeadersAdapter"].seal(new Headers({}));
        } else {
            // We will return a real headers object below so we mark this call as reading from a dynamic data source
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["trackDynamicDataAccessed"])(staticGenerationStore, callingExpression);
        }
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$request$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getExpectedRequestStore"])(callingExpression).headers;
}
function cookies() {
    const callingExpression = 'cookies';
    const staticGenerationStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["staticGenerationAsyncStorage"].getStore();
    if (staticGenerationStore) {
        if (staticGenerationStore.forceStatic) {
            // When we are forcing static we don't mark this as a Dynamic read and we return an empty cookies object
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["RequestCookiesAdapter"].seal(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["RequestCookies"](new Headers({})));
        } else {
            // We will return a real headers object below so we mark this call as reading from a dynamic data source
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["trackDynamicDataAccessed"])(staticGenerationStore, callingExpression);
        }
    }
    const requestStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$request$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getExpectedRequestStore"])(callingExpression);
    const asyncActionStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$action$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["actionAsyncStorage"].getStore();
    if ((asyncActionStore == null ? void 0 : asyncActionStore.isAction) || (asyncActionStore == null ? void 0 : asyncActionStore.isAppRoute)) {
        // We can't conditionally return different types here based on the context.
        // To avoid confusion, we always return the readonly type here.
        return requestStore.mutableCookies;
    }
    return requestStore.cookies;
}
function draftMode() {
    const callingExpression = 'draftMode';
    const requestStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$request$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getExpectedRequestStore"])(callingExpression);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$draft$2d$mode$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["DraftMode"](requestStore.draftMode);
} //# sourceMappingURL=headers.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/api/headers.js [middleware] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
;
 //# sourceMappingURL=headers.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/api/headers.js [middleware] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/headers.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/api/headers.js [middleware] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/tslib@2.6.3/node_modules/tslib/tslib.es6.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol */ __turbopack_esm__({
    "__addDisposableResource": ()=>__addDisposableResource,
    "__assign": ()=>__assign,
    "__asyncDelegator": ()=>__asyncDelegator,
    "__asyncGenerator": ()=>__asyncGenerator,
    "__asyncValues": ()=>__asyncValues,
    "__await": ()=>__await,
    "__awaiter": ()=>__awaiter,
    "__classPrivateFieldGet": ()=>__classPrivateFieldGet,
    "__classPrivateFieldIn": ()=>__classPrivateFieldIn,
    "__classPrivateFieldSet": ()=>__classPrivateFieldSet,
    "__createBinding": ()=>__createBinding,
    "__decorate": ()=>__decorate,
    "__disposeResources": ()=>__disposeResources,
    "__esDecorate": ()=>__esDecorate,
    "__exportStar": ()=>__exportStar,
    "__extends": ()=>__extends,
    "__generator": ()=>__generator,
    "__importDefault": ()=>__importDefault,
    "__importStar": ()=>__importStar,
    "__makeTemplateObject": ()=>__makeTemplateObject,
    "__metadata": ()=>__metadata,
    "__param": ()=>__param,
    "__propKey": ()=>__propKey,
    "__read": ()=>__read,
    "__rest": ()=>__rest,
    "__runInitializers": ()=>__runInitializers,
    "__setFunctionName": ()=>__setFunctionName,
    "__spread": ()=>__spread,
    "__spreadArray": ()=>__spreadArray,
    "__spreadArrays": ()=>__spreadArrays,
    "__values": ()=>__values,
    "default": ()=>__TURBOPACK__default__export__
});
var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
        if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
        return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for(var i = decorators.length - 1; i >= 0; i--){
        var context = {};
        for(var p in contextIn)context[p] = p === "access" ? {} : contextIn[p];
        for(var p in contextIn.access)context.access[p] = contextIn.access[p];
        context.addInitializer = function(f) {
            if (done) throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
        };
        var result = (0, decorators[i])(kind === "accessor" ? {
            get: descriptor.get,
            set: descriptor.set
        } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        } else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
;
function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for(var i = 0; i < initializers.length; i++){
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
}
;
function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
}
;
function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
        configurable: true,
        value: prefix ? "".concat(prefix, " ", name) : name
    });
}
;
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var __createBinding = Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
};
function __exportStar(m, o) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    function awaitReturn(f) {
        return function(v) {
            return Promise.resolve(v).then(f, reject);
        };
    }
    function verb(n, f) {
        if (g[n]) {
            i[n] = function(v) {
                return new Promise(function(a, b) {
                    q.push([
                        n,
                        v,
                        a,
                        b
                    ]) > 1 || resume(n, v);
                });
            };
            if (f) i[n] = f(i[n]);
        }
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: false
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
;
var __setModuleDefault = Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
};
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() {
            try {
                inner.call(this);
            } catch (e) {
                return Promise.reject(e);
            }
        };
        env.stack.push({
            value: value,
            dispose: dispose,
            async: async
        });
    } else if (async) {
        env.stack.push({
            async: true
        });
    }
    return value;
}
var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    function next() {
        while(env.stack.length){
            var rec = env.stack.pop();
            try {
                var result = rec.dispose && rec.dispose.call(rec.value);
                if (rec.async) return Promise.resolve(result).then(next, function(e) {
                    fail(e);
                    return next();
                });
            } catch (e) {
                fail(e);
            }
        }
        if (env.hasError) throw env.error;
    }
    return next();
}
const __TURBOPACK__default__export__ = {
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __metadata,
    __awaiter,
    __generator,
    __createBinding,
    __exportStar,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __classPrivateFieldIn,
    __addDisposableResource,
    __disposeResources
};

})()),
"[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/jsutils/isObjectLike.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * Return true if `value` is object-like. A value is object-like if it's not
 * `null` and has a `typeof` result of "object".
 */ __turbopack_esm__({
    "isObjectLike": ()=>isObjectLike
});
function isObjectLike(value) {
    return typeof value == 'object' && value !== null;
}

})()),
"[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/jsutils/invariant.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "invariant": ()=>invariant
});
function invariant(condition, message) {
    const booleanCondition = Boolean(condition);
    if (!booleanCondition) {
        throw new Error(message != null ? message : 'Unexpected invariant triggered.');
    }
}

})()),
"[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/location.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getLocation": ()=>getLocation
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$jsutils$2f$invariant$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/jsutils/invariant.mjs [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const LineRegExp = /\r\n|[\n\r]/g;
function getLocation(source, position) {
    let lastLineStart = 0;
    let line = 1;
    for (const match of source.body.matchAll(LineRegExp)){
        typeof match.index === 'number' || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$jsutils$2f$invariant$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["invariant"])(false);
        if (match.index >= position) {
            break;
        }
        lastLineStart = match.index + match[0].length;
        line += 1;
    }
    return {
        line,
        column: position + 1 - lastLineStart
    };
}

})()),
"[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/printLocation.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "printLocation": ()=>printLocation,
    "printSourceLocation": ()=>printSourceLocation
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$location$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/location.mjs [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
function printLocation(location) {
    return printSourceLocation(location.source, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$location$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["getLocation"])(location.source, location.start));
}
function printSourceLocation(source, sourceLocation) {
    const firstLineColumnOffset = source.locationOffset.column - 1;
    const body = ''.padStart(firstLineColumnOffset) + source.body;
    const lineIndex = sourceLocation.line - 1;
    const lineOffset = source.locationOffset.line - 1;
    const lineNum = sourceLocation.line + lineOffset;
    const columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
    const columnNum = sourceLocation.column + columnOffset;
    const locationStr = `${source.name}:${lineNum}:${columnNum}\n`;
    const lines = body.split(/\r\n|[\n\r]/g);
    const locationLine = lines[lineIndex]; // Special case for minified documents
    if (locationLine.length > 120) {
        const subLineIndex = Math.floor(columnNum / 80);
        const subLineColumnNum = columnNum % 80;
        const subLines = [];
        for(let i = 0; i < locationLine.length; i += 80){
            subLines.push(locationLine.slice(i, i + 80));
        }
        return locationStr + printPrefixedLines([
            [
                `${lineNum} |`,
                subLines[0]
            ],
            ...subLines.slice(1, subLineIndex + 1).map((subLine)=>[
                    '|',
                    subLine
                ]),
            [
                '|',
                '^'.padStart(subLineColumnNum)
            ],
            [
                '|',
                subLines[subLineIndex + 1]
            ]
        ]);
    }
    return locationStr + printPrefixedLines([
        // Lines specified like this: ["prefix", "string"],
        [
            `${lineNum - 1} |`,
            lines[lineIndex - 1]
        ],
        [
            `${lineNum} |`,
            locationLine
        ],
        [
            '|',
            '^'.padStart(columnNum)
        ],
        [
            `${lineNum + 1} |`,
            lines[lineIndex + 1]
        ]
    ]);
}
function printPrefixedLines(lines) {
    const existingLines = lines.filter(([_, line])=>line !== undefined);
    const padLen = Math.max(...existingLines.map(([prefix])=>prefix.length));
    return existingLines.map(([prefix, line])=>prefix.padStart(padLen) + (line ? ' ' + line : '')).join('\n');
}

})()),
"[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/error/GraphQLError.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GraphQLError": ()=>GraphQLError,
    "formatError": ()=>formatError,
    "printError": ()=>printError
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$jsutils$2f$isObjectLike$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/jsutils/isObjectLike.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$location$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/location.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$printLocation$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/printLocation.mjs [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
function toNormalizedOptions(args) {
    const firstArg = args[0];
    if (firstArg == null || 'kind' in firstArg || 'length' in firstArg) {
        return {
            nodes: firstArg,
            source: args[1],
            positions: args[2],
            path: args[3],
            originalError: args[4],
            extensions: args[5]
        };
    }
    return firstArg;
}
class GraphQLError extends Error {
    /**
   * An array of `{ line, column }` locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */ /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */ /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */ /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */ /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */ /**
   * The original error thrown from a field resolver during execution.
   */ /**
   * Extension fields to add to the formatted error.
   */ /**
   * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
   */ constructor(message, ...rawArgs){
        var _this$nodes, _nodeLocations$, _ref;
        const { nodes, source, positions, path, originalError, extensions } = toNormalizedOptions(rawArgs);
        super(message);
        this.name = 'GraphQLError';
        this.path = path !== null && path !== void 0 ? path : undefined;
        this.originalError = originalError !== null && originalError !== void 0 ? originalError : undefined; // Compute list of blame nodes.
        this.nodes = undefinedIfEmpty(Array.isArray(nodes) ? nodes : nodes ? [
            nodes
        ] : undefined);
        const nodeLocations = undefinedIfEmpty((_this$nodes = this.nodes) === null || _this$nodes === void 0 ? void 0 : _this$nodes.map((node)=>node.loc).filter((loc)=>loc != null)); // Compute locations in the source for the given nodes/positions.
        this.source = source !== null && source !== void 0 ? source : nodeLocations === null || nodeLocations === void 0 ? void 0 : (_nodeLocations$ = nodeLocations[0]) === null || _nodeLocations$ === void 0 ? void 0 : _nodeLocations$.source;
        this.positions = positions !== null && positions !== void 0 ? positions : nodeLocations === null || nodeLocations === void 0 ? void 0 : nodeLocations.map((loc)=>loc.start);
        this.locations = positions && source ? positions.map((pos)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$location$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["getLocation"])(source, pos)) : nodeLocations === null || nodeLocations === void 0 ? void 0 : nodeLocations.map((loc)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$location$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["getLocation"])(loc.source, loc.start));
        const originalExtensions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$jsutils$2f$isObjectLike$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["isObjectLike"])(originalError === null || originalError === void 0 ? void 0 : originalError.extensions) ? originalError === null || originalError === void 0 ? void 0 : originalError.extensions : undefined;
        this.extensions = (_ref = extensions !== null && extensions !== void 0 ? extensions : originalExtensions) !== null && _ref !== void 0 ? _ref : Object.create(null); // Only properties prescribed by the spec should be enumerable.
        // Keep the rest as non-enumerable.
        Object.defineProperties(this, {
            message: {
                writable: true,
                enumerable: true
            },
            name: {
                enumerable: false
            },
            nodes: {
                enumerable: false
            },
            source: {
                enumerable: false
            },
            positions: {
                enumerable: false
            },
            originalError: {
                enumerable: false
            }
        }); // Include (non-enumerable) stack trace.
        /* c8 ignore start */ // FIXME: https://github.com/graphql/graphql-js/issues/2317
        if (originalError !== null && originalError !== void 0 && originalError.stack) {
            Object.defineProperty(this, 'stack', {
                value: originalError.stack,
                writable: true,
                configurable: true
            });
        } else if (Error.captureStackTrace) {
            Error.captureStackTrace(this, GraphQLError);
        } else {
            Object.defineProperty(this, 'stack', {
                value: Error().stack,
                writable: true,
                configurable: true
            });
        }
    /* c8 ignore stop */ }
    get [Symbol.toStringTag]() {
        return 'GraphQLError';
    }
    toString() {
        let output = this.message;
        if (this.nodes) {
            for (const node of this.nodes){
                if (node.loc) {
                    output += '\n\n' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$printLocation$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["printLocation"])(node.loc);
                }
            }
        } else if (this.source && this.locations) {
            for (const location of this.locations){
                output += '\n\n' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$printLocation$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["printSourceLocation"])(this.source, location);
            }
        }
        return output;
    }
    toJSON() {
        const formattedError = {
            message: this.message
        };
        if (this.locations != null) {
            formattedError.locations = this.locations;
        }
        if (this.path != null) {
            formattedError.path = this.path;
        }
        if (this.extensions != null && Object.keys(this.extensions).length > 0) {
            formattedError.extensions = this.extensions;
        }
        return formattedError;
    }
}
function undefinedIfEmpty(array) {
    return array === undefined || array.length === 0 ? undefined : array;
}
function printError(error) {
    return error.toString();
}
function formatError(error) {
    return error.toJSON();
}

})()),
"[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/error/syntaxError.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "syntaxError": ()=>syntaxError
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$GraphQLError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/error/GraphQLError.mjs [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
function syntaxError(source, position, description) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$GraphQLError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["GraphQLError"](`Syntax Error: ${description}`, {
        source,
        positions: [
            position
        ]
    });
}

})()),
"[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/ast.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * Contains a range of UTF-8 character offsets and token references that
 * identify the region of the source from which the AST derived.
 */ __turbopack_esm__({
    "Location": ()=>Location,
    "OperationTypeNode": ()=>OperationTypeNode,
    "QueryDocumentKeys": ()=>QueryDocumentKeys,
    "Token": ()=>Token,
    "isNode": ()=>isNode
});
class Location {
    /**
   * The character offset at which this Node begins.
   */ /**
   * The character offset at which this Node ends.
   */ /**
   * The Token at which this Node begins.
   */ /**
   * The Token at which this Node ends.
   */ /**
   * The Source document the AST represents.
   */ constructor(startToken, endToken, source){
        this.start = startToken.start;
        this.end = endToken.end;
        this.startToken = startToken;
        this.endToken = endToken;
        this.source = source;
    }
    get [Symbol.toStringTag]() {
        return 'Location';
    }
    toJSON() {
        return {
            start: this.start,
            end: this.end
        };
    }
}
class Token {
    /**
   * The kind of Token.
   */ /**
   * The character offset at which this Node begins.
   */ /**
   * The character offset at which this Node ends.
   */ /**
   * The 1-indexed line number on which this Token appears.
   */ /**
   * The 1-indexed column number at which this Token begins.
   */ /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   *
   * Note: is undefined for punctuation tokens, but typed as string for
   * convenience in the parser.
   */ /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */ constructor(kind, start, end, line, column, value){
        this.kind = kind;
        this.start = start;
        this.end = end;
        this.line = line;
        this.column = column; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.value = value;
        this.prev = null;
        this.next = null;
    }
    get [Symbol.toStringTag]() {
        return 'Token';
    }
    toJSON() {
        return {
            kind: this.kind,
            value: this.value,
            line: this.line,
            column: this.column
        };
    }
}
const QueryDocumentKeys = {
    Name: [],
    Document: [
        'definitions'
    ],
    OperationDefinition: [
        'name',
        'variableDefinitions',
        'directives',
        'selectionSet'
    ],
    VariableDefinition: [
        'variable',
        'type',
        'defaultValue',
        'directives'
    ],
    Variable: [
        'name'
    ],
    SelectionSet: [
        'selections'
    ],
    Field: [
        'alias',
        'name',
        'arguments',
        'directives',
        'selectionSet'
    ],
    Argument: [
        'name',
        'value'
    ],
    FragmentSpread: [
        'name',
        'directives'
    ],
    InlineFragment: [
        'typeCondition',
        'directives',
        'selectionSet'
    ],
    FragmentDefinition: [
        'name',
        'variableDefinitions',
        'typeCondition',
        'directives',
        'selectionSet'
    ],
    IntValue: [],
    FloatValue: [],
    StringValue: [],
    BooleanValue: [],
    NullValue: [],
    EnumValue: [],
    ListValue: [
        'values'
    ],
    ObjectValue: [
        'fields'
    ],
    ObjectField: [
        'name',
        'value'
    ],
    Directive: [
        'name',
        'arguments'
    ],
    NamedType: [
        'name'
    ],
    ListType: [
        'type'
    ],
    NonNullType: [
        'type'
    ],
    SchemaDefinition: [
        'description',
        'directives',
        'operationTypes'
    ],
    OperationTypeDefinition: [
        'type'
    ],
    ScalarTypeDefinition: [
        'description',
        'name',
        'directives'
    ],
    ObjectTypeDefinition: [
        'description',
        'name',
        'interfaces',
        'directives',
        'fields'
    ],
    FieldDefinition: [
        'description',
        'name',
        'arguments',
        'type',
        'directives'
    ],
    InputValueDefinition: [
        'description',
        'name',
        'type',
        'defaultValue',
        'directives'
    ],
    InterfaceTypeDefinition: [
        'description',
        'name',
        'interfaces',
        'directives',
        'fields'
    ],
    UnionTypeDefinition: [
        'description',
        'name',
        'directives',
        'types'
    ],
    EnumTypeDefinition: [
        'description',
        'name',
        'directives',
        'values'
    ],
    EnumValueDefinition: [
        'description',
        'name',
        'directives'
    ],
    InputObjectTypeDefinition: [
        'description',
        'name',
        'directives',
        'fields'
    ],
    DirectiveDefinition: [
        'description',
        'name',
        'arguments',
        'locations'
    ],
    SchemaExtension: [
        'directives',
        'operationTypes'
    ],
    ScalarTypeExtension: [
        'name',
        'directives'
    ],
    ObjectTypeExtension: [
        'name',
        'interfaces',
        'directives',
        'fields'
    ],
    InterfaceTypeExtension: [
        'name',
        'interfaces',
        'directives',
        'fields'
    ],
    UnionTypeExtension: [
        'name',
        'directives',
        'types'
    ],
    EnumTypeExtension: [
        'name',
        'directives',
        'values'
    ],
    InputObjectTypeExtension: [
        'name',
        'directives',
        'fields'
    ]
};
const kindValues = new Set(Object.keys(QueryDocumentKeys));
function isNode(maybeNode) {
    const maybeKind = maybeNode === null || maybeNode === void 0 ? void 0 : maybeNode.kind;
    return typeof maybeKind === 'string' && kindValues.has(maybeKind);
}
/** Name */ var OperationTypeNode;
(function(OperationTypeNode) {
    OperationTypeNode['QUERY'] = 'query';
    OperationTypeNode['MUTATION'] = 'mutation';
    OperationTypeNode['SUBSCRIPTION'] = 'subscription';
})(OperationTypeNode || (OperationTypeNode = {}));
;

})()),
"[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/directiveLocation.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * The set of allowed directive location values.
 */ __turbopack_esm__({
    "DirectiveLocation": ()=>DirectiveLocation
});
var DirectiveLocation;
(function(DirectiveLocation) {
    DirectiveLocation['QUERY'] = 'QUERY';
    DirectiveLocation['MUTATION'] = 'MUTATION';
    DirectiveLocation['SUBSCRIPTION'] = 'SUBSCRIPTION';
    DirectiveLocation['FIELD'] = 'FIELD';
    DirectiveLocation['FRAGMENT_DEFINITION'] = 'FRAGMENT_DEFINITION';
    DirectiveLocation['FRAGMENT_SPREAD'] = 'FRAGMENT_SPREAD';
    DirectiveLocation['INLINE_FRAGMENT'] = 'INLINE_FRAGMENT';
    DirectiveLocation['VARIABLE_DEFINITION'] = 'VARIABLE_DEFINITION';
    DirectiveLocation['SCHEMA'] = 'SCHEMA';
    DirectiveLocation['SCALAR'] = 'SCALAR';
    DirectiveLocation['OBJECT'] = 'OBJECT';
    DirectiveLocation['FIELD_DEFINITION'] = 'FIELD_DEFINITION';
    DirectiveLocation['ARGUMENT_DEFINITION'] = 'ARGUMENT_DEFINITION';
    DirectiveLocation['INTERFACE'] = 'INTERFACE';
    DirectiveLocation['UNION'] = 'UNION';
    DirectiveLocation['ENUM'] = 'ENUM';
    DirectiveLocation['ENUM_VALUE'] = 'ENUM_VALUE';
    DirectiveLocation['INPUT_OBJECT'] = 'INPUT_OBJECT';
    DirectiveLocation['INPUT_FIELD_DEFINITION'] = 'INPUT_FIELD_DEFINITION';
})(DirectiveLocation || (DirectiveLocation = {}));
;
 /**
 * The enum type representing the directive location values.
 *
 * @deprecated Please use `DirectiveLocation`. Will be remove in v17.
 */ 
})()),
"[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/kinds.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * The set of allowed kind values for AST nodes.
 */ __turbopack_esm__({
    "Kind": ()=>Kind
});
var Kind;
(function(Kind) {
    Kind['NAME'] = 'Name';
    Kind['DOCUMENT'] = 'Document';
    Kind['OPERATION_DEFINITION'] = 'OperationDefinition';
    Kind['VARIABLE_DEFINITION'] = 'VariableDefinition';
    Kind['SELECTION_SET'] = 'SelectionSet';
    Kind['FIELD'] = 'Field';
    Kind['ARGUMENT'] = 'Argument';
    Kind['FRAGMENT_SPREAD'] = 'FragmentSpread';
    Kind['INLINE_FRAGMENT'] = 'InlineFragment';
    Kind['FRAGMENT_DEFINITION'] = 'FragmentDefinition';
    Kind['VARIABLE'] = 'Variable';
    Kind['INT'] = 'IntValue';
    Kind['FLOAT'] = 'FloatValue';
    Kind['STRING'] = 'StringValue';
    Kind['BOOLEAN'] = 'BooleanValue';
    Kind['NULL'] = 'NullValue';
    Kind['ENUM'] = 'EnumValue';
    Kind['LIST'] = 'ListValue';
    Kind['OBJECT'] = 'ObjectValue';
    Kind['OBJECT_FIELD'] = 'ObjectField';
    Kind['DIRECTIVE'] = 'Directive';
    Kind['NAMED_TYPE'] = 'NamedType';
    Kind['LIST_TYPE'] = 'ListType';
    Kind['NON_NULL_TYPE'] = 'NonNullType';
    Kind['SCHEMA_DEFINITION'] = 'SchemaDefinition';
    Kind['OPERATION_TYPE_DEFINITION'] = 'OperationTypeDefinition';
    Kind['SCALAR_TYPE_DEFINITION'] = 'ScalarTypeDefinition';
    Kind['OBJECT_TYPE_DEFINITION'] = 'ObjectTypeDefinition';
    Kind['FIELD_DEFINITION'] = 'FieldDefinition';
    Kind['INPUT_VALUE_DEFINITION'] = 'InputValueDefinition';
    Kind['INTERFACE_TYPE_DEFINITION'] = 'InterfaceTypeDefinition';
    Kind['UNION_TYPE_DEFINITION'] = 'UnionTypeDefinition';
    Kind['ENUM_TYPE_DEFINITION'] = 'EnumTypeDefinition';
    Kind['ENUM_VALUE_DEFINITION'] = 'EnumValueDefinition';
    Kind['INPUT_OBJECT_TYPE_DEFINITION'] = 'InputObjectTypeDefinition';
    Kind['DIRECTIVE_DEFINITION'] = 'DirectiveDefinition';
    Kind['SCHEMA_EXTENSION'] = 'SchemaExtension';
    Kind['SCALAR_TYPE_EXTENSION'] = 'ScalarTypeExtension';
    Kind['OBJECT_TYPE_EXTENSION'] = 'ObjectTypeExtension';
    Kind['INTERFACE_TYPE_EXTENSION'] = 'InterfaceTypeExtension';
    Kind['UNION_TYPE_EXTENSION'] = 'UnionTypeExtension';
    Kind['ENUM_TYPE_EXTENSION'] = 'EnumTypeExtension';
    Kind['INPUT_OBJECT_TYPE_EXTENSION'] = 'InputObjectTypeExtension';
})(Kind || (Kind = {}));
;
 /**
 * The enum type representing the possible kind values of AST nodes.
 *
 * @deprecated Please use `Kind`. Will be remove in v17.
 */ 
})()),
"[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/characterClasses.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * ```
 * WhiteSpace ::
 *   - "Horizontal Tab (U+0009)"
 *   - "Space (U+0020)"
 * ```
 * @internal
 */ __turbopack_esm__({
    "isDigit": ()=>isDigit,
    "isLetter": ()=>isLetter,
    "isNameContinue": ()=>isNameContinue,
    "isNameStart": ()=>isNameStart,
    "isWhiteSpace": ()=>isWhiteSpace
});
function isWhiteSpace(code) {
    return code === 0x0009 || code === 0x0020;
}
function isDigit(code) {
    return code >= 0x0030 && code <= 0x0039;
}
function isLetter(code) {
    return code >= 0x0061 && code <= 0x007a || code >= 0x0041 && code <= 0x005a // a-z
    ;
}
function isNameStart(code) {
    return isLetter(code) || code === 0x005f;
}
function isNameContinue(code) {
    return isLetter(code) || isDigit(code) || code === 0x005f;
}

})()),
"[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/blockString.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "dedentBlockStringLines": ()=>dedentBlockStringLines,
    "isPrintableAsBlockString": ()=>isPrintableAsBlockString,
    "printBlockString": ()=>printBlockString
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$characterClasses$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/characterClasses.mjs [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
function dedentBlockStringLines(lines) {
    var _firstNonEmptyLine2;
    let commonIndent = Number.MAX_SAFE_INTEGER;
    let firstNonEmptyLine = null;
    let lastNonEmptyLine = -1;
    for(let i = 0; i < lines.length; ++i){
        var _firstNonEmptyLine;
        const line = lines[i];
        const indent = leadingWhitespace(line);
        if (indent === line.length) {
            continue; // skip empty lines
        }
        firstNonEmptyLine = (_firstNonEmptyLine = firstNonEmptyLine) !== null && _firstNonEmptyLine !== void 0 ? _firstNonEmptyLine : i;
        lastNonEmptyLine = i;
        if (i !== 0 && indent < commonIndent) {
            commonIndent = indent;
        }
    }
    return lines // Remove common indentation from all lines but first.
    .map((line, i)=>i === 0 ? line : line.slice(commonIndent)) // Remove leading and trailing blank lines.
    .slice((_firstNonEmptyLine2 = firstNonEmptyLine) !== null && _firstNonEmptyLine2 !== void 0 ? _firstNonEmptyLine2 : 0, lastNonEmptyLine + 1);
}
function leadingWhitespace(str) {
    let i = 0;
    while(i < str.length && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$characterClasses$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["isWhiteSpace"])(str.charCodeAt(i))){
        ++i;
    }
    return i;
}
function isPrintableAsBlockString(value) {
    if (value === '') {
        return true; // empty string is printable
    }
    let isEmptyLine = true;
    let hasIndent = false;
    let hasCommonIndent = true;
    let seenNonEmptyLine = false;
    for(let i = 0; i < value.length; ++i){
        switch(value.codePointAt(i)){
            case 0x0000:
            case 0x0001:
            case 0x0002:
            case 0x0003:
            case 0x0004:
            case 0x0005:
            case 0x0006:
            case 0x0007:
            case 0x0008:
            case 0x000b:
            case 0x000c:
            case 0x000e:
            case 0x000f:
                return false;
            // Has non-printable characters
            case 0x000d:
                //  \r
                return false;
            // Has \r or \r\n which will be replaced as \n
            case 10:
                //  \n
                if (isEmptyLine && !seenNonEmptyLine) {
                    return false; // Has leading new line
                }
                seenNonEmptyLine = true;
                isEmptyLine = true;
                hasIndent = false;
                break;
            case 9:
            case 32:
                //  <space>
                hasIndent || (hasIndent = isEmptyLine);
                break;
            default:
                hasCommonIndent && (hasCommonIndent = hasIndent);
                isEmptyLine = false;
        }
    }
    if (isEmptyLine) {
        return false; // Has trailing empty lines
    }
    if (hasCommonIndent && seenNonEmptyLine) {
        return false; // Has internal indent
    }
    return true;
}
function printBlockString(value, options) {
    const escapedValue = value.replace(/"""/g, '\\"""'); // Expand a block string's raw value into independent lines.
    const lines = escapedValue.split(/\r\n|[\n\r]/g);
    const isSingleLine = lines.length === 1; // If common indentation is found we can fix some of those cases by adding leading new line
    const forceLeadingNewLine = lines.length > 1 && lines.slice(1).every((line)=>line.length === 0 || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$characterClasses$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["isWhiteSpace"])(line.charCodeAt(0))); // Trailing triple quotes just looks confusing but doesn't force trailing new line
    const hasTrailingTripleQuotes = escapedValue.endsWith('\\"""'); // Trailing quote (single or double) or slash forces trailing new line
    const hasTrailingQuote = value.endsWith('"') && !hasTrailingTripleQuotes;
    const hasTrailingSlash = value.endsWith('\\');
    const forceTrailingNewline = hasTrailingQuote || hasTrailingSlash;
    const printAsMultipleLines = !(options !== null && options !== void 0 && options.minimize) && // add leading and trailing new lines only if it improves readability
    (!isSingleLine || value.length > 70 || forceTrailingNewline || forceLeadingNewLine || hasTrailingTripleQuotes);
    let result = ''; // Format a multi-line block quote to account for leading space.
    const skipLeadingNewLine = isSingleLine && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$characterClasses$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["isWhiteSpace"])(value.charCodeAt(0));
    if (printAsMultipleLines && !skipLeadingNewLine || forceLeadingNewLine) {
        result += '\n';
    }
    result += escapedValue;
    if (printAsMultipleLines || forceTrailingNewline) {
        result += '\n';
    }
    return '"""' + result + '"""';
}

})()),
"[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/tokenKind.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * An exported enum describing the different kinds of tokens that the
 * lexer emits.
 */ __turbopack_esm__({
    "TokenKind": ()=>TokenKind
});
var TokenKind;
(function(TokenKind) {
    TokenKind['SOF'] = '<SOF>';
    TokenKind['EOF'] = '<EOF>';
    TokenKind['BANG'] = '!';
    TokenKind['DOLLAR'] = '$';
    TokenKind['AMP'] = '&';
    TokenKind['PAREN_L'] = '(';
    TokenKind['PAREN_R'] = ')';
    TokenKind['SPREAD'] = '...';
    TokenKind['COLON'] = ':';
    TokenKind['EQUALS'] = '=';
    TokenKind['AT'] = '@';
    TokenKind['BRACKET_L'] = '[';
    TokenKind['BRACKET_R'] = ']';
    TokenKind['BRACE_L'] = '{';
    TokenKind['PIPE'] = '|';
    TokenKind['BRACE_R'] = '}';
    TokenKind['NAME'] = 'Name';
    TokenKind['INT'] = 'Int';
    TokenKind['FLOAT'] = 'Float';
    TokenKind['STRING'] = 'String';
    TokenKind['BLOCK_STRING'] = 'BlockString';
    TokenKind['COMMENT'] = 'Comment';
})(TokenKind || (TokenKind = {}));
;
 /**
 * The enum type representing the token kinds values.
 *
 * @deprecated Please use `TokenKind`. Will be remove in v17.
 */ 
})()),
"[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/lexer.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Lexer": ()=>Lexer,
    "isPunctuatorTokenKind": ()=>isPunctuatorTokenKind
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/error/syntaxError.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/ast.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$blockString$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/blockString.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$characterClasses$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/characterClasses.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/tokenKind.mjs [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
class Lexer {
    /**
   * The previously focused non-ignored token.
   */ /**
   * The currently focused non-ignored token.
   */ /**
   * The (1-indexed) line containing the current token.
   */ /**
   * The character offset at which the current line begins.
   */ constructor(source){
        const startOfFileToken = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].SOF, 0, 0, 0, 0);
        this.source = source;
        this.lastToken = startOfFileToken;
        this.token = startOfFileToken;
        this.line = 1;
        this.lineStart = 0;
    }
    get [Symbol.toStringTag]() {
        return 'Lexer';
    }
    /**
   * Advances the token stream to the next non-ignored token.
   */ advance() {
        this.lastToken = this.token;
        const token = this.token = this.lookahead();
        return token;
    }
    /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the state of Lexer.
   */ lookahead() {
        let token = this.token;
        if (token.kind !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].EOF) {
            do {
                if (token.next) {
                    token = token.next;
                } else {
                    // Read the next token and form a link in the token linked-list.
                    const nextToken = readNextToken(this, token.end); // @ts-expect-error next is only mutable during parsing.
                    token.next = nextToken; // @ts-expect-error prev is only mutable during parsing.
                    nextToken.prev = token;
                    token = nextToken;
                }
            }while (token.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].COMMENT)
        }
        return token;
    }
}
function isPunctuatorTokenKind(kind) {
    return kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BANG || kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].DOLLAR || kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].AMP || kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_L || kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_R || kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].SPREAD || kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].COLON || kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].EQUALS || kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].AT || kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACKET_L || kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACKET_R || kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L || kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].PIPE || kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_R;
}
/**
 * A Unicode scalar value is any Unicode code point except surrogate code
 * points. In other words, the inclusive ranges of values 0x0000 to 0xD7FF and
 * 0xE000 to 0x10FFFF.
 *
 * SourceCharacter ::
 *   - "Any Unicode scalar value"
 */ function isUnicodeScalarValue(code) {
    return code >= 0x0000 && code <= 0xd7ff || code >= 0xe000 && code <= 0x10ffff;
}
/**
 * The GraphQL specification defines source text as a sequence of unicode scalar
 * values (which Unicode defines to exclude surrogate code points). However
 * JavaScript defines strings as a sequence of UTF-16 code units which may
 * include surrogates. A surrogate pair is a valid source character as it
 * encodes a supplementary code point (above U+FFFF), but unpaired surrogate
 * code points are not valid source characters.
 */ function isSupplementaryCodePoint(body, location) {
    return isLeadingSurrogate(body.charCodeAt(location)) && isTrailingSurrogate(body.charCodeAt(location + 1));
}
function isLeadingSurrogate(code) {
    return code >= 0xd800 && code <= 0xdbff;
}
function isTrailingSurrogate(code) {
    return code >= 0xdc00 && code <= 0xdfff;
}
/**
 * Prints the code point (or end of file reference) at a given location in a
 * source for use in error messages.
 *
 * Printable ASCII is printed quoted, while other points are printed in Unicode
 * code point form (ie. U+1234).
 */ function printCodePointAt(lexer, location) {
    const code = lexer.source.body.codePointAt(location);
    if (code === undefined) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].EOF;
    } else if (code >= 0x0020 && code <= 0x007e) {
        // Printable ASCII
        const char = String.fromCodePoint(code);
        return char === '"' ? "'\"'" : `"${char}"`;
    } // Unicode code point
    return 'U+' + code.toString(16).toUpperCase().padStart(4, '0');
}
/**
 * Create a token with line and column location information.
 */ function createToken(lexer, kind, start, end, value) {
    const line = lexer.line;
    const col = 1 + start - lexer.lineStart;
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Token"](kind, start, end, line, col, value);
}
/**
 * Gets the next token from the source starting at the given position.
 *
 * This skips over whitespace until it finds the next lexable token, then lexes
 * punctuators immediately or calls the appropriate helper function for more
 * complicated tokens.
 */ function readNextToken(lexer, start) {
    const body = lexer.source.body;
    const bodyLength = body.length;
    let position = start;
    while(position < bodyLength){
        const code = body.charCodeAt(position); // SourceCharacter
        switch(code){
            // Ignored ::
            //   - UnicodeBOM
            //   - WhiteSpace
            //   - LineTerminator
            //   - Comment
            //   - Comma
            //
            // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
            //
            // WhiteSpace ::
            //   - "Horizontal Tab (U+0009)"
            //   - "Space (U+0020)"
            //
            // Comma :: ,
            case 0xfeff:
            case 0x0009:
            case 0x0020:
            case 0x002c:
                // ,
                ++position;
                continue;
            // LineTerminator ::
            //   - "New Line (U+000A)"
            //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
            //   - "Carriage Return (U+000D)" "New Line (U+000A)"
            case 0x000a:
                // \n
                ++position;
                ++lexer.line;
                lexer.lineStart = position;
                continue;
            case 0x000d:
                // \r
                if (body.charCodeAt(position + 1) === 0x000a) {
                    position += 2;
                } else {
                    ++position;
                }
                ++lexer.line;
                lexer.lineStart = position;
                continue;
            // Comment
            case 0x0023:
                // #
                return readComment(lexer, position);
            // Token ::
            //   - Punctuator
            //   - Name
            //   - IntValue
            //   - FloatValue
            //   - StringValue
            //
            // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }
            case 0x0021:
                // !
                return createToken(lexer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BANG, position, position + 1);
            case 0x0024:
                // $
                return createToken(lexer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].DOLLAR, position, position + 1);
            case 0x0026:
                // &
                return createToken(lexer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].AMP, position, position + 1);
            case 0x0028:
                // (
                return createToken(lexer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_L, position, position + 1);
            case 0x0029:
                // )
                return createToken(lexer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_R, position, position + 1);
            case 0x002e:
                // .
                if (body.charCodeAt(position + 1) === 0x002e && body.charCodeAt(position + 2) === 0x002e) {
                    return createToken(lexer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].SPREAD, position, position + 3);
                }
                break;
            case 0x003a:
                // :
                return createToken(lexer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].COLON, position, position + 1);
            case 0x003d:
                // =
                return createToken(lexer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].EQUALS, position, position + 1);
            case 0x0040:
                // @
                return createToken(lexer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].AT, position, position + 1);
            case 0x005b:
                // [
                return createToken(lexer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACKET_L, position, position + 1);
            case 0x005d:
                // ]
                return createToken(lexer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACKET_R, position, position + 1);
            case 0x007b:
                // {
                return createToken(lexer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L, position, position + 1);
            case 0x007c:
                // |
                return createToken(lexer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].PIPE, position, position + 1);
            case 0x007d:
                // }
                return createToken(lexer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_R, position, position + 1);
            // StringValue
            case 0x0022:
                // "
                if (body.charCodeAt(position + 1) === 0x0022 && body.charCodeAt(position + 2) === 0x0022) {
                    return readBlockString(lexer, position);
                }
                return readString(lexer, position);
        } // IntValue | FloatValue (Digit | -)
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$characterClasses$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["isDigit"])(code) || code === 0x002d) {
            return readNumber(lexer, position, code);
        } // Name
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$characterClasses$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["isNameStart"])(code)) {
            return readName(lexer, position);
        }
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["syntaxError"])(lexer.source, position, code === 0x0027 ? 'Unexpected single quote character (\'), did you mean to use a double quote (")?' : isUnicodeScalarValue(code) || isSupplementaryCodePoint(body, position) ? `Unexpected character: ${printCodePointAt(lexer, position)}.` : `Invalid character: ${printCodePointAt(lexer, position)}.`);
    }
    return createToken(lexer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].EOF, bodyLength, bodyLength);
}
/**
 * Reads a comment token from the source file.
 *
 * ```
 * Comment :: # CommentChar* [lookahead != CommentChar]
 *
 * CommentChar :: SourceCharacter but not LineTerminator
 * ```
 */ function readComment(lexer, start) {
    const body = lexer.source.body;
    const bodyLength = body.length;
    let position = start + 1;
    while(position < bodyLength){
        const code = body.charCodeAt(position); // LineTerminator (\n | \r)
        if (code === 0x000a || code === 0x000d) {
            break;
        } // SourceCharacter
        if (isUnicodeScalarValue(code)) {
            ++position;
        } else if (isSupplementaryCodePoint(body, position)) {
            position += 2;
        } else {
            break;
        }
    }
    return createToken(lexer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].COMMENT, start, position, body.slice(start + 1, position));
}
/**
 * Reads a number token from the source file, either a FloatValue or an IntValue
 * depending on whether a FractionalPart or ExponentPart is encountered.
 *
 * ```
 * IntValue :: IntegerPart [lookahead != {Digit, `.`, NameStart}]
 *
 * IntegerPart ::
 *   - NegativeSign? 0
 *   - NegativeSign? NonZeroDigit Digit*
 *
 * NegativeSign :: -
 *
 * NonZeroDigit :: Digit but not `0`
 *
 * FloatValue ::
 *   - IntegerPart FractionalPart ExponentPart [lookahead != {Digit, `.`, NameStart}]
 *   - IntegerPart FractionalPart [lookahead != {Digit, `.`, NameStart}]
 *   - IntegerPart ExponentPart [lookahead != {Digit, `.`, NameStart}]
 *
 * FractionalPart :: . Digit+
 *
 * ExponentPart :: ExponentIndicator Sign? Digit+
 *
 * ExponentIndicator :: one of `e` `E`
 *
 * Sign :: one of + -
 * ```
 */ function readNumber(lexer, start, firstCode) {
    const body = lexer.source.body;
    let position = start;
    let code = firstCode;
    let isFloat = false; // NegativeSign (-)
    if (code === 0x002d) {
        code = body.charCodeAt(++position);
    } // Zero (0)
    if (code === 0x0030) {
        code = body.charCodeAt(++position);
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$characterClasses$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["isDigit"])(code)) {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["syntaxError"])(lexer.source, position, `Invalid number, unexpected digit after 0: ${printCodePointAt(lexer, position)}.`);
        }
    } else {
        position = readDigits(lexer, position, code);
        code = body.charCodeAt(position);
    } // Full stop (.)
    if (code === 0x002e) {
        isFloat = true;
        code = body.charCodeAt(++position);
        position = readDigits(lexer, position, code);
        code = body.charCodeAt(position);
    } // E e
    if (code === 0x0045 || code === 0x0065) {
        isFloat = true;
        code = body.charCodeAt(++position); // + -
        if (code === 0x002b || code === 0x002d) {
            code = body.charCodeAt(++position);
        }
        position = readDigits(lexer, position, code);
        code = body.charCodeAt(position);
    } // Numbers cannot be followed by . or NameStart
    if (code === 0x002e || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$characterClasses$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["isNameStart"])(code)) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["syntaxError"])(lexer.source, position, `Invalid number, expected digit but got: ${printCodePointAt(lexer, position)}.`);
    }
    return createToken(lexer, isFloat ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].FLOAT : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].INT, start, position, body.slice(start, position));
}
/**
 * Returns the new position in the source after reading one or more digits.
 */ function readDigits(lexer, start, firstCode) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$characterClasses$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["isDigit"])(firstCode)) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["syntaxError"])(lexer.source, start, `Invalid number, expected digit but got: ${printCodePointAt(lexer, start)}.`);
    }
    const body = lexer.source.body;
    let position = start + 1; // +1 to skip first firstCode
    while((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$characterClasses$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["isDigit"])(body.charCodeAt(position))){
        ++position;
    }
    return position;
}
/**
 * Reads a single-quote string token from the source file.
 *
 * ```
 * StringValue ::
 *   - `""` [lookahead != `"`]
 *   - `"` StringCharacter+ `"`
 *
 * StringCharacter ::
 *   - SourceCharacter but not `"` or `\` or LineTerminator
 *   - `\u` EscapedUnicode
 *   - `\` EscapedCharacter
 *
 * EscapedUnicode ::
 *   - `{` HexDigit+ `}`
 *   - HexDigit HexDigit HexDigit HexDigit
 *
 * EscapedCharacter :: one of `"` `\` `/` `b` `f` `n` `r` `t`
 * ```
 */ function readString(lexer, start) {
    const body = lexer.source.body;
    const bodyLength = body.length;
    let position = start + 1;
    let chunkStart = position;
    let value = '';
    while(position < bodyLength){
        const code = body.charCodeAt(position); // Closing Quote (")
        if (code === 0x0022) {
            value += body.slice(chunkStart, position);
            return createToken(lexer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].STRING, start, position + 1, value);
        } // Escape Sequence (\)
        if (code === 0x005c) {
            value += body.slice(chunkStart, position);
            const escape = body.charCodeAt(position + 1) === 0x0075 // u
             ? body.charCodeAt(position + 2) === 0x007b // {
             ? readEscapedUnicodeVariableWidth(lexer, position) : readEscapedUnicodeFixedWidth(lexer, position) : readEscapedCharacter(lexer, position);
            value += escape.value;
            position += escape.size;
            chunkStart = position;
            continue;
        } // LineTerminator (\n | \r)
        if (code === 0x000a || code === 0x000d) {
            break;
        } // SourceCharacter
        if (isUnicodeScalarValue(code)) {
            ++position;
        } else if (isSupplementaryCodePoint(body, position)) {
            position += 2;
        } else {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["syntaxError"])(lexer.source, position, `Invalid character within String: ${printCodePointAt(lexer, position)}.`);
        }
    }
    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["syntaxError"])(lexer.source, position, 'Unterminated string.');
} // The string value and lexed size of an escape sequence.
function readEscapedUnicodeVariableWidth(lexer, position) {
    const body = lexer.source.body;
    let point = 0;
    let size = 3; // Cannot be larger than 12 chars (\u{00000000}).
    while(size < 12){
        const code = body.charCodeAt(position + size++); // Closing Brace (})
        if (code === 0x007d) {
            // Must be at least 5 chars (\u{0}) and encode a Unicode scalar value.
            if (size < 5 || !isUnicodeScalarValue(point)) {
                break;
            }
            return {
                value: String.fromCodePoint(point),
                size
            };
        } // Append this hex digit to the code point.
        point = point << 4 | readHexDigit(code);
        if (point < 0) {
            break;
        }
    }
    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["syntaxError"])(lexer.source, position, `Invalid Unicode escape sequence: "${body.slice(position, position + size)}".`);
}
function readEscapedUnicodeFixedWidth(lexer, position) {
    const body = lexer.source.body;
    const code = read16BitHexCode(body, position + 2);
    if (isUnicodeScalarValue(code)) {
        return {
            value: String.fromCodePoint(code),
            size: 6
        };
    } // GraphQL allows JSON-style surrogate pair escape sequences, but only when
    // a valid pair is formed.
    if (isLeadingSurrogate(code)) {
        // \u
        if (body.charCodeAt(position + 6) === 0x005c && body.charCodeAt(position + 7) === 0x0075) {
            const trailingCode = read16BitHexCode(body, position + 8);
            if (isTrailingSurrogate(trailingCode)) {
                // JavaScript defines strings as a sequence of UTF-16 code units and
                // encodes Unicode code points above U+FFFF using a surrogate pair of
                // code units. Since this is a surrogate pair escape sequence, just
                // include both codes into the JavaScript string value. Had JavaScript
                // not been internally based on UTF-16, then this surrogate pair would
                // be decoded to retrieve the supplementary code point.
                return {
                    value: String.fromCodePoint(code, trailingCode),
                    size: 12
                };
            }
        }
    }
    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["syntaxError"])(lexer.source, position, `Invalid Unicode escape sequence: "${body.slice(position, position + 6)}".`);
}
/**
 * Reads four hexadecimal characters and returns the positive integer that 16bit
 * hexadecimal string represents. For example, "000f" will return 15, and "dead"
 * will return 57005.
 *
 * Returns a negative number if any char was not a valid hexadecimal digit.
 */ function read16BitHexCode(body, position) {
    // readHexDigit() returns -1 on error. ORing a negative value with any other
    // value always produces a negative value.
    return readHexDigit(body.charCodeAt(position)) << 12 | readHexDigit(body.charCodeAt(position + 1)) << 8 | readHexDigit(body.charCodeAt(position + 2)) << 4 | readHexDigit(body.charCodeAt(position + 3));
}
/**
 * Reads a hexadecimal character and returns its positive integer value (0-15).
 *
 * '0' becomes 0, '9' becomes 9
 * 'A' becomes 10, 'F' becomes 15
 * 'a' becomes 10, 'f' becomes 15
 *
 * Returns -1 if the provided character code was not a valid hexadecimal digit.
 *
 * HexDigit :: one of
 *   - `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`
 *   - `A` `B` `C` `D` `E` `F`
 *   - `a` `b` `c` `d` `e` `f`
 */ function readHexDigit(code) {
    return code >= 0x0030 && code <= 0x0039 // 0-9
     ? code - 0x0030 : code >= 0x0041 && code <= 0x0046 // A-F
     ? code - 0x0037 : code >= 0x0061 && code <= 0x0066 // a-f
     ? code - 0x0057 : -1;
}
/**
 * | Escaped Character | Code Point | Character Name               |
 * | ----------------- | ---------- | ---------------------------- |
 * | `"`               | U+0022     | double quote                 |
 * | `\`               | U+005C     | reverse solidus (back slash) |
 * | `/`               | U+002F     | solidus (forward slash)      |
 * | `b`               | U+0008     | backspace                    |
 * | `f`               | U+000C     | form feed                    |
 * | `n`               | U+000A     | line feed (new line)         |
 * | `r`               | U+000D     | carriage return              |
 * | `t`               | U+0009     | horizontal tab               |
 */ function readEscapedCharacter(lexer, position) {
    const body = lexer.source.body;
    const code = body.charCodeAt(position + 1);
    switch(code){
        case 0x0022:
            // "
            return {
                value: '\u0022',
                size: 2
            };
        case 0x005c:
            // \
            return {
                value: '\u005c',
                size: 2
            };
        case 0x002f:
            // /
            return {
                value: '\u002f',
                size: 2
            };
        case 0x0062:
            // b
            return {
                value: '\u0008',
                size: 2
            };
        case 0x0066:
            // f
            return {
                value: '\u000c',
                size: 2
            };
        case 0x006e:
            // n
            return {
                value: '\u000a',
                size: 2
            };
        case 0x0072:
            // r
            return {
                value: '\u000d',
                size: 2
            };
        case 0x0074:
            // t
            return {
                value: '\u0009',
                size: 2
            };
    }
    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["syntaxError"])(lexer.source, position, `Invalid character escape sequence: "${body.slice(position, position + 2)}".`);
}
/**
 * Reads a block string token from the source file.
 *
 * ```
 * StringValue ::
 *   - `"""` BlockStringCharacter* `"""`
 *
 * BlockStringCharacter ::
 *   - SourceCharacter but not `"""` or `\"""`
 *   - `\"""`
 * ```
 */ function readBlockString(lexer, start) {
    const body = lexer.source.body;
    const bodyLength = body.length;
    let lineStart = lexer.lineStart;
    let position = start + 3;
    let chunkStart = position;
    let currentLine = '';
    const blockLines = [];
    while(position < bodyLength){
        const code = body.charCodeAt(position); // Closing Triple-Quote (""")
        if (code === 0x0022 && body.charCodeAt(position + 1) === 0x0022 && body.charCodeAt(position + 2) === 0x0022) {
            currentLine += body.slice(chunkStart, position);
            blockLines.push(currentLine);
            const token = createToken(lexer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BLOCK_STRING, start, position + 3, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$blockString$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["dedentBlockStringLines"])(blockLines).join('\n'));
            lexer.line += blockLines.length - 1;
            lexer.lineStart = lineStart;
            return token;
        } // Escaped Triple-Quote (\""")
        if (code === 0x005c && body.charCodeAt(position + 1) === 0x0022 && body.charCodeAt(position + 2) === 0x0022 && body.charCodeAt(position + 3) === 0x0022) {
            currentLine += body.slice(chunkStart, position);
            chunkStart = position + 1; // skip only slash
            position += 4;
            continue;
        } // LineTerminator
        if (code === 0x000a || code === 0x000d) {
            currentLine += body.slice(chunkStart, position);
            blockLines.push(currentLine);
            if (code === 0x000d && body.charCodeAt(position + 1) === 0x000a) {
                position += 2;
            } else {
                ++position;
            }
            currentLine = '';
            chunkStart = position;
            lineStart = position;
            continue;
        } // SourceCharacter
        if (isUnicodeScalarValue(code)) {
            ++position;
        } else if (isSupplementaryCodePoint(body, position)) {
            position += 2;
        } else {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["syntaxError"])(lexer.source, position, `Invalid character within String: ${printCodePointAt(lexer, position)}.`);
        }
    }
    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["syntaxError"])(lexer.source, position, 'Unterminated string.');
}
/**
 * Reads an alphanumeric + underscore name from the source.
 *
 * ```
 * Name ::
 *   - NameStart NameContinue* [lookahead != NameContinue]
 * ```
 */ function readName(lexer, start) {
    const body = lexer.source.body;
    const bodyLength = body.length;
    let position = start + 1;
    while(position < bodyLength){
        const code = body.charCodeAt(position);
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$characterClasses$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["isNameContinue"])(code)) {
            ++position;
        } else {
            break;
        }
    }
    return createToken(lexer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].NAME, start, position, body.slice(start, position));
}

})()),
"[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/jsutils/devAssert.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "devAssert": ()=>devAssert
});
function devAssert(condition, message) {
    const booleanCondition = Boolean(condition);
    if (!booleanCondition) {
        throw new Error(message);
    }
}

})()),
"[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/jsutils/inspect.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "inspect": ()=>inspect
});
const MAX_ARRAY_LENGTH = 10;
const MAX_RECURSIVE_DEPTH = 2;
function inspect(value) {
    return formatValue(value, []);
}
function formatValue(value, seenValues) {
    switch(typeof value){
        case 'string':
            return JSON.stringify(value);
        case 'function':
            return value.name ? `[function ${value.name}]` : '[function]';
        case 'object':
            return formatObjectValue(value, seenValues);
        default:
            return String(value);
    }
}
function formatObjectValue(value, previouslySeenValues) {
    if (value === null) {
        return 'null';
    }
    if (previouslySeenValues.includes(value)) {
        return '[Circular]';
    }
    const seenValues = [
        ...previouslySeenValues,
        value
    ];
    if (isJSONable(value)) {
        const jsonValue = value.toJSON(); // check for infinite recursion
        if (jsonValue !== value) {
            return typeof jsonValue === 'string' ? jsonValue : formatValue(jsonValue, seenValues);
        }
    } else if (Array.isArray(value)) {
        return formatArray(value, seenValues);
    }
    return formatObject(value, seenValues);
}
function isJSONable(value) {
    return typeof value.toJSON === 'function';
}
function formatObject(object, seenValues) {
    const entries = Object.entries(object);
    if (entries.length === 0) {
        return '{}';
    }
    if (seenValues.length > MAX_RECURSIVE_DEPTH) {
        return '[' + getObjectTag(object) + ']';
    }
    const properties = entries.map(([key, value])=>key + ': ' + formatValue(value, seenValues));
    return '{ ' + properties.join(', ') + ' }';
}
function formatArray(array, seenValues) {
    if (array.length === 0) {
        return '[]';
    }
    if (seenValues.length > MAX_RECURSIVE_DEPTH) {
        return '[Array]';
    }
    const len = Math.min(MAX_ARRAY_LENGTH, array.length);
    const remaining = array.length - len;
    const items = [];
    for(let i = 0; i < len; ++i){
        items.push(formatValue(array[i], seenValues));
    }
    if (remaining === 1) {
        items.push('... 1 more item');
    } else if (remaining > 1) {
        items.push(`... ${remaining} more items`);
    }
    return '[' + items.join(', ') + ']';
}
function getObjectTag(object) {
    const tag = Object.prototype.toString.call(object).replace(/^\[object /, '').replace(/]$/, '');
    if (tag === 'Object' && typeof object.constructor === 'function') {
        const name = object.constructor.name;
        if (typeof name === 'string' && name !== '') {
            return name;
        }
    }
    return tag;
}

})()),
"[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/jsutils/instanceOf.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "instanceOf": ()=>instanceOf
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$jsutils$2f$inspect$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/jsutils/inspect.mjs [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const instanceOf = /* c8 ignore next 6 */ // FIXME: https://github.com/graphql/graphql-js/issues/2317
globalThis.process && globalThis.process.env.NODE_ENV === 'production' ? function instanceOf(value, constructor) {
    return value instanceof constructor;
} : function instanceOf(value, constructor) {
    if (value instanceof constructor) {
        return true;
    }
    if (typeof value === 'object' && value !== null) {
        var _value$constructor;
        // Prefer Symbol.toStringTag since it is immune to minification.
        const className = constructor.prototype[Symbol.toStringTag];
        const valueClassName = Symbol.toStringTag in value // @ts-expect-error TS bug see, https://github.com/microsoft/TypeScript/issues/38009
         ? value[Symbol.toStringTag] : (_value$constructor = value.constructor) === null || _value$constructor === void 0 ? void 0 : _value$constructor.name;
        if (className === valueClassName) {
            const stringifiedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$jsutils$2f$inspect$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["inspect"])(value);
            throw new Error(`Cannot use ${className} "${stringifiedValue}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
        }
    }
    return false;
};

})()),
"[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/source.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Source": ()=>Source,
    "isSource": ()=>isSource
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$jsutils$2f$devAssert$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/jsutils/devAssert.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$jsutils$2f$inspect$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/jsutils/inspect.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$jsutils$2f$instanceOf$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/jsutils/instanceOf.mjs [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
class Source {
    constructor(body, name = 'GraphQL request', locationOffset = {
        line: 1,
        column: 1
    }){
        typeof body === 'string' || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$jsutils$2f$devAssert$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["devAssert"])(false, `Body must be a string. Received: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$jsutils$2f$inspect$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["inspect"])(body)}.`);
        this.body = body;
        this.name = name;
        this.locationOffset = locationOffset;
        this.locationOffset.line > 0 || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$jsutils$2f$devAssert$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["devAssert"])(false, 'line in locationOffset is 1-indexed and must be positive.');
        this.locationOffset.column > 0 || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$jsutils$2f$devAssert$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["devAssert"])(false, 'column in locationOffset is 1-indexed and must be positive.');
    }
    get [Symbol.toStringTag]() {
        return 'Source';
    }
}
function isSource(source) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$jsutils$2f$instanceOf$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["instanceOf"])(source, Source);
}

})()),
"[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/parser.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Parser": ()=>Parser,
    "parse": ()=>parse,
    "parseConstValue": ()=>parseConstValue,
    "parseType": ()=>parseType,
    "parseValue": ()=>parseValue
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/error/syntaxError.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/ast.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$directiveLocation$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/directiveLocation.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/kinds.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$lexer$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/lexer.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$source$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/source.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/tokenKind.mjs [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
function parse(source, options) {
    const parser = new Parser(source, options);
    return parser.parseDocument();
}
function parseValue(source, options) {
    const parser = new Parser(source, options);
    parser.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].SOF);
    const value = parser.parseValueLiteral(false);
    parser.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].EOF);
    return value;
}
function parseConstValue(source, options) {
    const parser = new Parser(source, options);
    parser.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].SOF);
    const value = parser.parseConstValueLiteral();
    parser.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].EOF);
    return value;
}
function parseType(source, options) {
    const parser = new Parser(source, options);
    parser.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].SOF);
    const type = parser.parseTypeReference();
    parser.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].EOF);
    return type;
}
class Parser {
    constructor(source, options = {}){
        const sourceObj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$source$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["isSource"])(source) ? source : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$source$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Source"](source);
        this._lexer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$lexer$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Lexer"](sourceObj);
        this._options = options;
        this._tokenCounter = 0;
    }
    /**
   * Converts a name lex token into a name parse node.
   */ parseName() {
        const token = this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].NAME);
        return this.node(token, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].NAME,
            value: token.value
        });
    }
    /**
   * Document : Definition+
   */ parseDocument() {
        return this.node(this._lexer.token, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].DOCUMENT,
            definitions: this.many(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].SOF, this.parseDefinition, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].EOF)
        });
    }
    /**
   * Definition :
   *   - ExecutableDefinition
   *   - TypeSystemDefinition
   *   - TypeSystemExtension
   *
   * ExecutableDefinition :
   *   - OperationDefinition
   *   - FragmentDefinition
   *
   * TypeSystemDefinition :
   *   - SchemaDefinition
   *   - TypeDefinition
   *   - DirectiveDefinition
   *
   * TypeDefinition :
   *   - ScalarTypeDefinition
   *   - ObjectTypeDefinition
   *   - InterfaceTypeDefinition
   *   - UnionTypeDefinition
   *   - EnumTypeDefinition
   *   - InputObjectTypeDefinition
   */ parseDefinition() {
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L)) {
            return this.parseOperationDefinition();
        } // Many definitions begin with a description and require a lookahead.
        const hasDescription = this.peekDescription();
        const keywordToken = hasDescription ? this._lexer.lookahead() : this._lexer.token;
        if (keywordToken.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].NAME) {
            switch(keywordToken.value){
                case 'schema':
                    return this.parseSchemaDefinition();
                case 'scalar':
                    return this.parseScalarTypeDefinition();
                case 'type':
                    return this.parseObjectTypeDefinition();
                case 'interface':
                    return this.parseInterfaceTypeDefinition();
                case 'union':
                    return this.parseUnionTypeDefinition();
                case 'enum':
                    return this.parseEnumTypeDefinition();
                case 'input':
                    return this.parseInputObjectTypeDefinition();
                case 'directive':
                    return this.parseDirectiveDefinition();
            }
            if (hasDescription) {
                throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["syntaxError"])(this._lexer.source, this._lexer.token.start, 'Unexpected description, descriptions are supported only on type definitions.');
            }
            switch(keywordToken.value){
                case 'query':
                case 'mutation':
                case 'subscription':
                    return this.parseOperationDefinition();
                case 'fragment':
                    return this.parseFragmentDefinition();
                case 'extend':
                    return this.parseTypeSystemExtension();
            }
        }
        throw this.unexpected(keywordToken);
    }
    /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */ parseOperationDefinition() {
        const start = this._lexer.token;
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L)) {
            return this.node(start, {
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].OPERATION_DEFINITION,
                operation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["OperationTypeNode"].QUERY,
                name: undefined,
                variableDefinitions: [],
                directives: [],
                selectionSet: this.parseSelectionSet()
            });
        }
        const operation = this.parseOperationType();
        let name;
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].NAME)) {
            name = this.parseName();
        }
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].OPERATION_DEFINITION,
            operation,
            name,
            variableDefinitions: this.parseVariableDefinitions(),
            directives: this.parseDirectives(false),
            selectionSet: this.parseSelectionSet()
        });
    }
    /**
   * OperationType : one of query mutation subscription
   */ parseOperationType() {
        const operationToken = this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].NAME);
        switch(operationToken.value){
            case 'query':
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["OperationTypeNode"].QUERY;
            case 'mutation':
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["OperationTypeNode"].MUTATION;
            case 'subscription':
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["OperationTypeNode"].SUBSCRIPTION;
        }
        throw this.unexpected(operationToken);
    }
    /**
   * VariableDefinitions : ( VariableDefinition+ )
   */ parseVariableDefinitions() {
        return this.optionalMany(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_L, this.parseVariableDefinition, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_R);
    }
    /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */ parseVariableDefinition() {
        return this.node(this._lexer.token, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].VARIABLE_DEFINITION,
            variable: this.parseVariable(),
            type: (this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].COLON), this.parseTypeReference()),
            defaultValue: this.expectOptionalToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].EQUALS) ? this.parseConstValueLiteral() : undefined,
            directives: this.parseConstDirectives()
        });
    }
    /**
   * Variable : $ Name
   */ parseVariable() {
        const start = this._lexer.token;
        this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].DOLLAR);
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].VARIABLE,
            name: this.parseName()
        });
    }
    /**
   * ```
   * SelectionSet : { Selection+ }
   * ```
   */ parseSelectionSet() {
        return this.node(this._lexer.token, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].SELECTION_SET,
            selections: this.many(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L, this.parseSelection, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_R)
        });
    }
    /**
   * Selection :
   *   - Field
   *   - FragmentSpread
   *   - InlineFragment
   */ parseSelection() {
        return this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].SPREAD) ? this.parseFragment() : this.parseField();
    }
    /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */ parseField() {
        const start = this._lexer.token;
        const nameOrAlias = this.parseName();
        let alias;
        let name;
        if (this.expectOptionalToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].COLON)) {
            alias = nameOrAlias;
            name = this.parseName();
        } else {
            name = nameOrAlias;
        }
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].FIELD,
            alias,
            name,
            arguments: this.parseArguments(false),
            directives: this.parseDirectives(false),
            selectionSet: this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L) ? this.parseSelectionSet() : undefined
        });
    }
    /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */ parseArguments(isConst) {
        const item = isConst ? this.parseConstArgument : this.parseArgument;
        return this.optionalMany(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_L, item, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_R);
    }
    /**
   * Argument[Const] : Name : Value[?Const]
   */ parseArgument(isConst = false) {
        const start = this._lexer.token;
        const name = this.parseName();
        this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].COLON);
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].ARGUMENT,
            name,
            value: this.parseValueLiteral(isConst)
        });
    }
    parseConstArgument() {
        return this.parseArgument(true);
    }
    /**
   * Corresponds to both FragmentSpread and InlineFragment in the spec.
   *
   * FragmentSpread : ... FragmentName Directives?
   *
   * InlineFragment : ... TypeCondition? Directives? SelectionSet
   */ parseFragment() {
        const start = this._lexer.token;
        this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].SPREAD);
        const hasTypeCondition = this.expectOptionalKeyword('on');
        if (!hasTypeCondition && this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].NAME)) {
            return this.node(start, {
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].FRAGMENT_SPREAD,
                name: this.parseFragmentName(),
                directives: this.parseDirectives(false)
            });
        }
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].INLINE_FRAGMENT,
            typeCondition: hasTypeCondition ? this.parseNamedType() : undefined,
            directives: this.parseDirectives(false),
            selectionSet: this.parseSelectionSet()
        });
    }
    /**
   * FragmentDefinition :
   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
   *
   * TypeCondition : NamedType
   */ parseFragmentDefinition() {
        const start = this._lexer.token;
        this.expectKeyword('fragment'); // Legacy support for defining variables within fragments changes
        // the grammar of FragmentDefinition:
        //   - fragment FragmentName VariableDefinitions? on TypeCondition Directives? SelectionSet
        if (this._options.allowLegacyFragmentVariables === true) {
            return this.node(start, {
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].FRAGMENT_DEFINITION,
                name: this.parseFragmentName(),
                variableDefinitions: this.parseVariableDefinitions(),
                typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
                directives: this.parseDirectives(false),
                selectionSet: this.parseSelectionSet()
            });
        }
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].FRAGMENT_DEFINITION,
            name: this.parseFragmentName(),
            typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
            directives: this.parseDirectives(false),
            selectionSet: this.parseSelectionSet()
        });
    }
    /**
   * FragmentName : Name but not `on`
   */ parseFragmentName() {
        if (this._lexer.token.value === 'on') {
            throw this.unexpected();
        }
        return this.parseName();
    }
    /**
   * Value[Const] :
   *   - [~Const] Variable
   *   - IntValue
   *   - FloatValue
   *   - StringValue
   *   - BooleanValue
   *   - NullValue
   *   - EnumValue
   *   - ListValue[?Const]
   *   - ObjectValue[?Const]
   *
   * BooleanValue : one of `true` `false`
   *
   * NullValue : `null`
   *
   * EnumValue : Name but not `true`, `false` or `null`
   */ parseValueLiteral(isConst) {
        const token = this._lexer.token;
        switch(token.kind){
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACKET_L:
                return this.parseList(isConst);
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L:
                return this.parseObject(isConst);
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].INT:
                this.advanceLexer();
                return this.node(token, {
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].INT,
                    value: token.value
                });
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].FLOAT:
                this.advanceLexer();
                return this.node(token, {
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].FLOAT,
                    value: token.value
                });
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].STRING:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BLOCK_STRING:
                return this.parseStringLiteral();
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].NAME:
                this.advanceLexer();
                switch(token.value){
                    case 'true':
                        return this.node(token, {
                            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].BOOLEAN,
                            value: true
                        });
                    case 'false':
                        return this.node(token, {
                            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].BOOLEAN,
                            value: false
                        });
                    case 'null':
                        return this.node(token, {
                            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].NULL
                        });
                    default:
                        return this.node(token, {
                            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].ENUM,
                            value: token.value
                        });
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].DOLLAR:
                if (isConst) {
                    this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].DOLLAR);
                    if (this._lexer.token.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].NAME) {
                        const varName = this._lexer.token.value;
                        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["syntaxError"])(this._lexer.source, token.start, `Unexpected variable "$${varName}" in constant value.`);
                    } else {
                        throw this.unexpected(token);
                    }
                }
                return this.parseVariable();
            default:
                throw this.unexpected();
        }
    }
    parseConstValueLiteral() {
        return this.parseValueLiteral(true);
    }
    parseStringLiteral() {
        const token = this._lexer.token;
        this.advanceLexer();
        return this.node(token, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].STRING,
            value: token.value,
            block: token.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BLOCK_STRING
        });
    }
    /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */ parseList(isConst) {
        const item = ()=>this.parseValueLiteral(isConst);
        return this.node(this._lexer.token, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].LIST,
            values: this.any(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACKET_L, item, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACKET_R)
        });
    }
    /**
   * ```
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   * ```
   */ parseObject(isConst) {
        const item = ()=>this.parseObjectField(isConst);
        return this.node(this._lexer.token, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].OBJECT,
            fields: this.any(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L, item, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_R)
        });
    }
    /**
   * ObjectField[Const] : Name : Value[?Const]
   */ parseObjectField(isConst) {
        const start = this._lexer.token;
        const name = this.parseName();
        this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].COLON);
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].OBJECT_FIELD,
            name,
            value: this.parseValueLiteral(isConst)
        });
    }
    /**
   * Directives[Const] : Directive[?Const]+
   */ parseDirectives(isConst) {
        const directives = [];
        while(this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].AT)){
            directives.push(this.parseDirective(isConst));
        }
        return directives;
    }
    parseConstDirectives() {
        return this.parseDirectives(true);
    }
    /**
   * ```
   * Directive[Const] : @ Name Arguments[?Const]?
   * ```
   */ parseDirective(isConst) {
        const start = this._lexer.token;
        this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].AT);
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].DIRECTIVE,
            name: this.parseName(),
            arguments: this.parseArguments(isConst)
        });
    }
    /**
   * Type :
   *   - NamedType
   *   - ListType
   *   - NonNullType
   */ parseTypeReference() {
        const start = this._lexer.token;
        let type;
        if (this.expectOptionalToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACKET_L)) {
            const innerType = this.parseTypeReference();
            this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACKET_R);
            type = this.node(start, {
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].LIST_TYPE,
                type: innerType
            });
        } else {
            type = this.parseNamedType();
        }
        if (this.expectOptionalToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BANG)) {
            return this.node(start, {
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].NON_NULL_TYPE,
                type
            });
        }
        return type;
    }
    /**
   * NamedType : Name
   */ parseNamedType() {
        return this.node(this._lexer.token, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].NAMED_TYPE,
            name: this.parseName()
        });
    }
    peekDescription() {
        return this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].STRING) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BLOCK_STRING);
    }
    /**
   * Description : StringValue
   */ parseDescription() {
        if (this.peekDescription()) {
            return this.parseStringLiteral();
        }
    }
    /**
   * ```
   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
   * ```
   */ parseSchemaDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword('schema');
        const directives = this.parseConstDirectives();
        const operationTypes = this.many(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L, this.parseOperationTypeDefinition, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_R);
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].SCHEMA_DEFINITION,
            description,
            directives,
            operationTypes
        });
    }
    /**
   * OperationTypeDefinition : OperationType : NamedType
   */ parseOperationTypeDefinition() {
        const start = this._lexer.token;
        const operation = this.parseOperationType();
        this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].COLON);
        const type = this.parseNamedType();
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].OPERATION_TYPE_DEFINITION,
            operation,
            type
        });
    }
    /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */ parseScalarTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword('scalar');
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].SCALAR_TYPE_DEFINITION,
            description,
            name,
            directives
        });
    }
    /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */ parseObjectTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword('type');
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].OBJECT_TYPE_DEFINITION,
            description,
            name,
            interfaces,
            directives,
            fields
        });
    }
    /**
   * ImplementsInterfaces :
   *   - implements `&`? NamedType
   *   - ImplementsInterfaces & NamedType
   */ parseImplementsInterfaces() {
        return this.expectOptionalKeyword('implements') ? this.delimitedMany(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].AMP, this.parseNamedType) : [];
    }
    /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */ parseFieldsDefinition() {
        return this.optionalMany(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L, this.parseFieldDefinition, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_R);
    }
    /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */ parseFieldDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        const name = this.parseName();
        const args = this.parseArgumentDefs();
        this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].COLON);
        const type = this.parseTypeReference();
        const directives = this.parseConstDirectives();
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].FIELD_DEFINITION,
            description,
            name,
            arguments: args,
            type,
            directives
        });
    }
    /**
   * ArgumentsDefinition : ( InputValueDefinition+ )
   */ parseArgumentDefs() {
        return this.optionalMany(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_L, this.parseInputValueDef, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_R);
    }
    /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */ parseInputValueDef() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        const name = this.parseName();
        this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].COLON);
        const type = this.parseTypeReference();
        let defaultValue;
        if (this.expectOptionalToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].EQUALS)) {
            defaultValue = this.parseConstValueLiteral();
        }
        const directives = this.parseConstDirectives();
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].INPUT_VALUE_DEFINITION,
            description,
            name,
            type,
            defaultValue,
            directives
        });
    }
    /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */ parseInterfaceTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword('interface');
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].INTERFACE_TYPE_DEFINITION,
            description,
            name,
            interfaces,
            directives,
            fields
        });
    }
    /**
   * UnionTypeDefinition :
   *   - Description? union Name Directives[Const]? UnionMemberTypes?
   */ parseUnionTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword('union');
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const types = this.parseUnionMemberTypes();
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].UNION_TYPE_DEFINITION,
            description,
            name,
            directives,
            types
        });
    }
    /**
   * UnionMemberTypes :
   *   - = `|`? NamedType
   *   - UnionMemberTypes | NamedType
   */ parseUnionMemberTypes() {
        return this.expectOptionalToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].EQUALS) ? this.delimitedMany(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].PIPE, this.parseNamedType) : [];
    }
    /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */ parseEnumTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword('enum');
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const values = this.parseEnumValuesDefinition();
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].ENUM_TYPE_DEFINITION,
            description,
            name,
            directives,
            values
        });
    }
    /**
   * ```
   * EnumValuesDefinition : { EnumValueDefinition+ }
   * ```
   */ parseEnumValuesDefinition() {
        return this.optionalMany(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L, this.parseEnumValueDefinition, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_R);
    }
    /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */ parseEnumValueDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        const name = this.parseEnumValueName();
        const directives = this.parseConstDirectives();
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].ENUM_VALUE_DEFINITION,
            description,
            name,
            directives
        });
    }
    /**
   * EnumValue : Name but not `true`, `false` or `null`
   */ parseEnumValueName() {
        if (this._lexer.token.value === 'true' || this._lexer.token.value === 'false' || this._lexer.token.value === 'null') {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["syntaxError"])(this._lexer.source, this._lexer.token.start, `${getTokenDesc(this._lexer.token)} is reserved and cannot be used for an enum value.`);
        }
        return this.parseName();
    }
    /**
   * InputObjectTypeDefinition :
   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
   */ parseInputObjectTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword('input');
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const fields = this.parseInputFieldsDefinition();
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].INPUT_OBJECT_TYPE_DEFINITION,
            description,
            name,
            directives,
            fields
        });
    }
    /**
   * ```
   * InputFieldsDefinition : { InputValueDefinition+ }
   * ```
   */ parseInputFieldsDefinition() {
        return this.optionalMany(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L, this.parseInputValueDef, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_R);
    }
    /**
   * TypeSystemExtension :
   *   - SchemaExtension
   *   - TypeExtension
   *
   * TypeExtension :
   *   - ScalarTypeExtension
   *   - ObjectTypeExtension
   *   - InterfaceTypeExtension
   *   - UnionTypeExtension
   *   - EnumTypeExtension
   *   - InputObjectTypeDefinition
   */ parseTypeSystemExtension() {
        const keywordToken = this._lexer.lookahead();
        if (keywordToken.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].NAME) {
            switch(keywordToken.value){
                case 'schema':
                    return this.parseSchemaExtension();
                case 'scalar':
                    return this.parseScalarTypeExtension();
                case 'type':
                    return this.parseObjectTypeExtension();
                case 'interface':
                    return this.parseInterfaceTypeExtension();
                case 'union':
                    return this.parseUnionTypeExtension();
                case 'enum':
                    return this.parseEnumTypeExtension();
                case 'input':
                    return this.parseInputObjectTypeExtension();
            }
        }
        throw this.unexpected(keywordToken);
    }
    /**
   * ```
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   * ```
   */ parseSchemaExtension() {
        const start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('schema');
        const directives = this.parseConstDirectives();
        const operationTypes = this.optionalMany(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L, this.parseOperationTypeDefinition, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_R);
        if (directives.length === 0 && operationTypes.length === 0) {
            throw this.unexpected();
        }
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].SCHEMA_EXTENSION,
            directives,
            operationTypes
        });
    }
    /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */ parseScalarTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('scalar');
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        if (directives.length === 0) {
            throw this.unexpected();
        }
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].SCALAR_TYPE_EXTENSION,
            name,
            directives
        });
    }
    /**
   * ObjectTypeExtension :
   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend type Name ImplementsInterfaces? Directives[Const]
   *  - extend type Name ImplementsInterfaces
   */ parseObjectTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('type');
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();
        if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
            throw this.unexpected();
        }
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].OBJECT_TYPE_EXTENSION,
            name,
            interfaces,
            directives,
            fields
        });
    }
    /**
   * InterfaceTypeExtension :
   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend interface Name ImplementsInterfaces? Directives[Const]
   *  - extend interface Name ImplementsInterfaces
   */ parseInterfaceTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('interface');
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();
        if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
            throw this.unexpected();
        }
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].INTERFACE_TYPE_EXTENSION,
            name,
            interfaces,
            directives,
            fields
        });
    }
    /**
   * UnionTypeExtension :
   *   - extend union Name Directives[Const]? UnionMemberTypes
   *   - extend union Name Directives[Const]
   */ parseUnionTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('union');
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const types = this.parseUnionMemberTypes();
        if (directives.length === 0 && types.length === 0) {
            throw this.unexpected();
        }
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].UNION_TYPE_EXTENSION,
            name,
            directives,
            types
        });
    }
    /**
   * EnumTypeExtension :
   *   - extend enum Name Directives[Const]? EnumValuesDefinition
   *   - extend enum Name Directives[Const]
   */ parseEnumTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('enum');
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const values = this.parseEnumValuesDefinition();
        if (directives.length === 0 && values.length === 0) {
            throw this.unexpected();
        }
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].ENUM_TYPE_EXTENSION,
            name,
            directives,
            values
        });
    }
    /**
   * InputObjectTypeExtension :
   *   - extend input Name Directives[Const]? InputFieldsDefinition
   *   - extend input Name Directives[Const]
   */ parseInputObjectTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('input');
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const fields = this.parseInputFieldsDefinition();
        if (directives.length === 0 && fields.length === 0) {
            throw this.unexpected();
        }
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].INPUT_OBJECT_TYPE_EXTENSION,
            name,
            directives,
            fields
        });
    }
    /**
   * ```
   * DirectiveDefinition :
   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
   * ```
   */ parseDirectiveDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword('directive');
        this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].AT);
        const name = this.parseName();
        const args = this.parseArgumentDefs();
        const repeatable = this.expectOptionalKeyword('repeatable');
        this.expectKeyword('on');
        const locations = this.parseDirectiveLocations();
        return this.node(start, {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Kind"].DIRECTIVE_DEFINITION,
            description,
            name,
            arguments: args,
            repeatable,
            locations
        });
    }
    /**
   * DirectiveLocations :
   *   - `|`? DirectiveLocation
   *   - DirectiveLocations | DirectiveLocation
   */ parseDirectiveLocations() {
        return this.delimitedMany(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].PIPE, this.parseDirectiveLocation);
    }
    /*
   * DirectiveLocation :
   *   - ExecutableDirectiveLocation
   *   - TypeSystemDirectiveLocation
   *
   * ExecutableDirectiveLocation : one of
   *   `QUERY`
   *   `MUTATION`
   *   `SUBSCRIPTION`
   *   `FIELD`
   *   `FRAGMENT_DEFINITION`
   *   `FRAGMENT_SPREAD`
   *   `INLINE_FRAGMENT`
   *
   * TypeSystemDirectiveLocation : one of
   *   `SCHEMA`
   *   `SCALAR`
   *   `OBJECT`
   *   `FIELD_DEFINITION`
   *   `ARGUMENT_DEFINITION`
   *   `INTERFACE`
   *   `UNION`
   *   `ENUM`
   *   `ENUM_VALUE`
   *   `INPUT_OBJECT`
   *   `INPUT_FIELD_DEFINITION`
   */ parseDirectiveLocation() {
        const start = this._lexer.token;
        const name = this.parseName();
        if (Object.prototype.hasOwnProperty.call(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$directiveLocation$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["DirectiveLocation"], name.value)) {
            return name;
        }
        throw this.unexpected(start);
    }
    /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */ node(startToken, node) {
        if (this._options.noLocation !== true) {
            node.loc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["Location"](startToken, this._lexer.lastToken, this._lexer.source);
        }
        return node;
    }
    /**
   * Determines if the next token is of a given kind
   */ peek(kind) {
        return this._lexer.token.kind === kind;
    }
    /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */ expectToken(kind) {
        const token = this._lexer.token;
        if (token.kind === kind) {
            this.advanceLexer();
            return token;
        }
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["syntaxError"])(this._lexer.source, token.start, `Expected ${getTokenKindDesc(kind)}, found ${getTokenDesc(token)}.`);
    }
    /**
   * If the next token is of the given kind, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */ expectOptionalToken(kind) {
        const token = this._lexer.token;
        if (token.kind === kind) {
            this.advanceLexer();
            return true;
        }
        return false;
    }
    /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */ expectKeyword(value) {
        const token = this._lexer.token;
        if (token.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].NAME && token.value === value) {
            this.advanceLexer();
        } else {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["syntaxError"])(this._lexer.source, token.start, `Expected "${value}", found ${getTokenDesc(token)}.`);
        }
    }
    /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */ expectOptionalKeyword(value) {
        const token = this._lexer.token;
        if (token.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].NAME && token.value === value) {
            this.advanceLexer();
            return true;
        }
        return false;
    }
    /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */ unexpected(atToken) {
        const token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["syntaxError"])(this._lexer.source, token.start, `Unexpected ${getTokenDesc(token)}.`);
    }
    /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */ any(openKind, parseFn, closeKind) {
        this.expectToken(openKind);
        const nodes = [];
        while(!this.expectOptionalToken(closeKind)){
            nodes.push(parseFn.call(this));
        }
        return nodes;
    }
    /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */ optionalMany(openKind, parseFn, closeKind) {
        if (this.expectOptionalToken(openKind)) {
            const nodes = [];
            do {
                nodes.push(parseFn.call(this));
            }while (!this.expectOptionalToken(closeKind))
            return nodes;
        }
        return [];
    }
    /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */ many(openKind, parseFn, closeKind) {
        this.expectToken(openKind);
        const nodes = [];
        do {
            nodes.push(parseFn.call(this));
        }while (!this.expectOptionalToken(closeKind))
        return nodes;
    }
    /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */ delimitedMany(delimiterKind, parseFn) {
        this.expectOptionalToken(delimiterKind);
        const nodes = [];
        do {
            nodes.push(parseFn.call(this));
        }while (this.expectOptionalToken(delimiterKind))
        return nodes;
    }
    advanceLexer() {
        const { maxTokens } = this._options;
        const token = this._lexer.advance();
        if (maxTokens !== undefined && token.kind !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["TokenKind"].EOF) {
            ++this._tokenCounter;
            if (this._tokenCounter > maxTokens) {
                throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["syntaxError"])(this._lexer.source, token.start, `Document contains more that ${maxTokens} tokens. Parsing aborted.`);
            }
        }
    }
}
/**
 * A helper function to describe a token as a string for debugging.
 */ function getTokenDesc(token) {
    const value = token.value;
    return getTokenKindDesc(token.kind) + (value != null ? ` "${value}"` : '');
}
/**
 * A helper function to describe a token kind as a string for debugging.
 */ function getTokenKindDesc(kind) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$lexer$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["isPunctuatorTokenKind"])(kind) ? `"${kind}"` : kind;
}

})()),
"[project]/node_modules/.pnpm/graphql-tag@2.12.6_graphql@16.8.1/node_modules/graphql-tag/lib/index.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>__TURBOPACK__default__export__,
    "disableExperimentalFragmentVariables": ()=>disableExperimentalFragmentVariables,
    "disableFragmentWarnings": ()=>disableFragmentWarnings,
    "enableExperimentalFragmentVariables": ()=>enableExperimentalFragmentVariables,
    "gql": ()=>gql,
    "resetCaches": ()=>resetCaches
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tslib$40$2$2e$6$2e$3$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/tslib@2.6.3/node_modules/tslib/tslib.es6.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$parser$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql@16.8.1/node_modules/graphql/language/parser.mjs [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
var docCache = new Map();
var fragmentSourceMap = new Map();
var printFragmentWarnings = true;
var experimentalFragmentVariables = false;
function normalize(string) {
    return string.replace(/[\s,]+/g, ' ').trim();
}
function cacheKeyFromLoc(loc) {
    return normalize(loc.source.body.substring(loc.start, loc.end));
}
function processFragments(ast) {
    var seenKeys = new Set();
    var definitions = [];
    ast.definitions.forEach(function(fragmentDefinition) {
        if (fragmentDefinition.kind === 'FragmentDefinition') {
            var fragmentName = fragmentDefinition.name.value;
            var sourceKey = cacheKeyFromLoc(fragmentDefinition.loc);
            var sourceKeySet = fragmentSourceMap.get(fragmentName);
            if (sourceKeySet && !sourceKeySet.has(sourceKey)) {
                if (printFragmentWarnings) {
                    console.warn("Warning: fragment with name " + fragmentName + " already exists.\n" + "graphql-tag enforces all fragment names across your application to be unique; read more about\n" + "this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names");
                }
            } else if (!sourceKeySet) {
                fragmentSourceMap.set(fragmentName, sourceKeySet = new Set);
            }
            sourceKeySet.add(sourceKey);
            if (!seenKeys.has(sourceKey)) {
                seenKeys.add(sourceKey);
                definitions.push(fragmentDefinition);
            }
        } else {
            definitions.push(fragmentDefinition);
        }
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tslib$40$2$2e$6$2e$3$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tslib$40$2$2e$6$2e$3$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["__assign"])({}, ast), {
        definitions: definitions
    });
}
function stripLoc(doc) {
    var workSet = new Set(doc.definitions);
    workSet.forEach(function(node) {
        if (node.loc) delete node.loc;
        Object.keys(node).forEach(function(key) {
            var value = node[key];
            if (value && typeof value === 'object') {
                workSet.add(value);
            }
        });
    });
    var loc = doc.loc;
    if (loc) {
        delete loc.startToken;
        delete loc.endToken;
    }
    return doc;
}
function parseDocument(source) {
    var cacheKey = normalize(source);
    if (!docCache.has(cacheKey)) {
        var parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2f$language$2f$parser$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["parse"])(source, {
            experimentalFragmentVariables: experimentalFragmentVariables,
            allowLegacyFragmentVariables: experimentalFragmentVariables
        });
        if (!parsed || parsed.kind !== 'Document') {
            throw new Error('Not a valid GraphQL document.');
        }
        docCache.set(cacheKey, stripLoc(processFragments(parsed)));
    }
    return docCache.get(cacheKey);
}
function gql(literals) {
    var args = [];
    for(var _i = 1; _i < arguments.length; _i++){
        args[_i - 1] = arguments[_i];
    }
    if (typeof literals === 'string') {
        literals = [
            literals
        ];
    }
    var result = literals[0];
    args.forEach(function(arg, i) {
        if (arg && arg.kind === 'Document') {
            result += arg.loc.source.body;
        } else {
            result += arg;
        }
        result += literals[i + 1];
    });
    return parseDocument(result);
}
function resetCaches() {
    docCache.clear();
    fragmentSourceMap.clear();
}
function disableFragmentWarnings() {
    printFragmentWarnings = false;
}
function enableExperimentalFragmentVariables() {
    experimentalFragmentVariables = true;
}
function disableExperimentalFragmentVariables() {
    experimentalFragmentVariables = false;
}
var extras = {
    gql: gql,
    resetCaches: resetCaches,
    disableFragmentWarnings: disableFragmentWarnings,
    enableExperimentalFragmentVariables: enableExperimentalFragmentVariables,
    disableExperimentalFragmentVariables: disableExperimentalFragmentVariables
};
(function(gql_1) {
    gql_1.gql = extras.gql, gql_1.resetCaches = extras.resetCaches, gql_1.disableFragmentWarnings = extras.disableFragmentWarnings, gql_1.enableExperimentalFragmentVariables = extras.enableExperimentalFragmentVariables, gql_1.disableExperimentalFragmentVariables = extras.disableExperimentalFragmentVariables;
})(gql || (gql = {}));
gql["default"] = gql;
const __TURBOPACK__default__export__ = gql;
 //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/build/templates/middleware.js { INNER_MIDDLEWARE_MODULE => \"[project]/frontend/middleware.ts [middleware] (ecmascript)\" } [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>nHandler
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$globals$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/globals.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$adapter$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/server/web/adapter.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$middleware$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/frontend/middleware.ts [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const mod = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$middleware$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__
};
const handler = mod.middleware || mod.default;
const page = "/middleware";
if (typeof handler !== 'function') {
    throw new Error(`The Middleware "${page}" must export a \`middleware\` or a \`default\` function`);
}
function nHandler(opts) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$adapter$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["adapter"])({
        ...opts,
        page,
        handler
    });
} //# sourceMappingURL=middleware.js.map

})()),
"[project]/frontend/edge-wrapper.js { MODULE => \"[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/build/templates/middleware.js { INNER_MIDDLEWARE_MODULE => \\\"[project]/frontend/middleware.ts [middleware] (ecmascript)\\\" } [middleware] (ecmascript)\" } [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

self._ENTRIES ||= {};
self._ENTRIES["middleware_middleware"] = Promise.resolve().then(()=>__turbopack_import__('[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/build/templates/middleware.js { INNER_MIDDLEWARE_MODULE => "[project]/frontend/middleware.ts [middleware] (ecmascript)" } [middleware] (ecmascript)'));

}.call(this) }),
}]);

//# sourceMappingURL=%5Bproject%5D__e1fc74._.js.map