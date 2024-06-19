(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/ssr/[root of the server]__a3d950._.js", {

"[externals]/ [external] (node:async_hooks, cjs)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

const mod = __turbopack_external_require__("node:async_hooks");

module.exports = mod;

}.call(this) }),
"[externals]/ [external] (node:buffer, cjs)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

const mod = __turbopack_external_require__("node:buffer");

module.exports = mod;

}.call(this) }),
"[project]/frontend/config/index.ts [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "CONFIG": ()=>CONFIG,
    "DEFAULT_CONFIG_DATA": ()=>DEFAULT_CONFIG_DATA
});
const DEFAULT_CONFIG_DATA = {
    rebuild_required: {
        langs: false,
        plugins: false
    },
    editor: {
        sticky: true,
        files: {
            allow_type: "all"
        }
    },
    settings: {
        general: {
            site_name: "VitNode Community",
            site_short_name: "VitNode"
        },
        email: {
            color_primary: "hsl(220, 74%, 50%)",
            color_primary_foreground: "hsl(210, 40%, 98%)"
        }
    },
    langs: [
        {
            code: "en",
            enabled: true,
            default: true
        },
        {
            code: "pl",
            enabled: true,
            default: false
        }
    ]
};
const ENVS = {
    graphql_url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    backend_url: process.env.NEXT_PUBLIC_BACKEND_URL,
    frontend_url: process.env.NEXT_PUBLIC_FRONTEND_URL
};
const CONFIG = {
    graphql_url: ENVS.graphql_url ?? "http://localhost:8080",
    backend_url: ENVS.backend_url ?? "http://localhost:8080",
    frontend_url: ENVS.frontend_url ?? "http://localhost:3000",
    graphql_public_url: `${ENVS.graphql_url ?? "http://localhost:8080"}/public`,
    backend_public_url: `${ENVS.backend_url ?? "http://localhost:8080"}/public`,
    local_storage: {
        editor_skin_tone: "emoji:skin-tone"
    },
    node_development: ("TURBOPACK compile-time value", "development") === "development"
};

})()),
"[project]/frontend/graphql/cookie-from-string-to-object.ts [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "setCookieFromApi": ()=>setCookieFromApi
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/server-only/empty.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/api/headers.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/headers.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const cookieFromStringToObject = (str)=>{
    return str.map((item)=>Object.fromEntries(item.split("; ").map((v)=>{
            const current = v.split(/=(.*)/s).map(decodeURIComponent);
            if (current.length === 1) {
                return [
                    current[0],
                    true
                ];
            }
            return current;
        })));
};
const setCookieFromApi = ({ res })=>{
    return cookieFromStringToObject(res.headers.getSetCookie()).forEach((cookie)=>{
        const key = Object.keys(cookie)[0];
        const value = Object.values(cookie)[0];
        if (typeof value !== "string" || typeof key !== "string") return;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["cookies"])().set(key, value, {
            domain: cookie.Domain,
            path: cookie.Path,
            expires: new Date(cookie.Expires),
            secure: cookie.Secure,
            httpOnly: cookie.HttpOnly,
            sameSite: cookie.SameSite
        });
    });
};

})()),
"[project]/frontend/graphql/fetcher.ts [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "fetcher": ()=>fetcher
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/compiled/server-only/empty.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/api/headers.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.28_babel-plugin-react-compiler@0.0.0-experimental-938cd9a-20240601_react-d_idvr65cbkixhj4gnflubdqzjmi/node_modules/next/dist/esm/client/components/headers.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$index$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/frontend/config/index.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$graphql$2f$cookie$2d$from$2d$string$2d$to$2d$object$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/frontend/graphql/cookie-from-string-to-object.ts [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
const getGqlString = (doc)=>{
    return doc.loc?.source.body ?? "";
};
async function fetcher({ cache, headers, next, query, signal, uploads, variables }) {
    const formData = new FormData();
    if (uploads) {
        const preVariables = {};
        uploads.forEach(({ files, variable })=>{
            if (Array.isArray(files)) {
                preVariables[variable] = files.map(()=>null);
            } else {
                preVariables[variable] = null;
            }
        });
        formData.append("operations", JSON.stringify({
            query: getGqlString(query),
            variables: {
                ...variables,
                ...preVariables
            }
        }));
        const preMap = new Map();
        // Map
        let mapIndex = 0;
        uploads.forEach(({ files, variable })=>{
            if (Array.isArray(files)) {
                files.forEach((_file, index)=>{
                    preMap.set(`${mapIndex}`, [
                        `variables.${variable}.${index}`
                    ]);
                    mapIndex += 1;
                });
            } else {
                if (files) {
                    preMap.set(`${mapIndex}`, [
                        `variables.${variable}`
                    ]);
                    mapIndex += 1;
                }
            }
        });
        formData.append("map", JSON.stringify(Object.fromEntries(preMap)));
        let currentIndex = 0;
        uploads.forEach(({ files })=>{
            if (Array.isArray(files)) {
                files.forEach((file)=>{
                    formData.append(`${currentIndex}`, file);
                    currentIndex += 1;
                });
            } else {
                if (files) {
                    formData.append(`${currentIndex}`, files);
                    currentIndex += 1;
                }
            }
        });
    }
    const nextInternalHeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["headers"])();
    const internalHeaders = {
        Cookie: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["cookies"])().toString(),
        ["user-agent"]: nextInternalHeaders.get("user-agent") ?? "node",
        ["x-forwarded-for"]: nextInternalHeaders.get("x-forwarded-for") ?? "0.0.0.0",
        ["x-real-ip"]: nextInternalHeaders.get("x-real-ip") ?? "0.0.0.0",
        "x-vitnode-user-language": (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$28_babel$2d$plugin$2d$react$2d$compiler$40$0$2e$0$2e$0$2d$experimental$2d$938cd9a$2d$20240601_react$2d$d_idvr65cbkixhj4gnflubdqzjmi$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["cookies"])().get("NEXT_LOCALE")?.value ?? "en",
        ...headers
    };
    const internalQuery = getGqlString(query);
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$index$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["CONFIG"].graphql_url}/graphql`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        signal,
        headers: uploads ? {
            "x-apollo-operation-name": "*",
            ...internalHeaders
        } : {
            "Content-Type": "application/json",
            ...internalHeaders
        },
        body: uploads ? formData : JSON.stringify({
            query: internalQuery,
            variables
        }),
        next,
        cache
    });
    if (internalQuery.trim().startsWith("mutation")) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$graphql$2f$cookie$2d$from$2d$string$2d$to$2d$object$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["setCookieFromApi"])({
            res
        });
    }
    const json = await res.json();
    if (json.errors) {
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        return Promise.reject(json.errors.at(0));
    }
    return {
        data: json.data,
        res
    };
}

})()),
"[project]/frontend/graphql/hooks.ts [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Admin_Blog_Categories__Show": ()=>Admin_Blog_Categories__Show,
    "Admin_Sessions__Sign_Out": ()=>Admin_Sessions__Sign_Out,
    "Admin__Blog_Categories__Create": ()=>Admin__Blog_Categories__Create,
    "Admin__Core_Email_Settings__Edit": ()=>Admin__Core_Email_Settings__Edit,
    "Admin__Core_Email_Settings__Show": ()=>Admin__Core_Email_Settings__Show,
    "Admin__Core_Email_Settings__Test": ()=>Admin__Core_Email_Settings__Test,
    "Admin__Core_Files__Delete": ()=>Admin__Core_Files__Delete,
    "Admin__Core_Files__Show": ()=>Admin__Core_Files__Show,
    "Admin__Core_Groups__Delete": ()=>Admin__Core_Groups__Delete,
    "Admin__Core_Groups__Edit": ()=>Admin__Core_Groups__Edit,
    "Admin__Core_Groups__Show": ()=>Admin__Core_Groups__Show,
    "Admin__Core_Groups__Show_Short": ()=>Admin__Core_Groups__Show_Short,
    "Admin__Core_Languages__Create": ()=>Admin__Core_Languages__Create,
    "Admin__Core_Languages__Delete": ()=>Admin__Core_Languages__Delete,
    "Admin__Core_Languages__Download": ()=>Admin__Core_Languages__Download,
    "Admin__Core_Languages__Edit": ()=>Admin__Core_Languages__Edit,
    "Admin__Core_Languages__Update": ()=>Admin__Core_Languages__Update,
    "Admin__Core_Main_Settings__Edit": ()=>Admin__Core_Main_Settings__Edit,
    "Admin__Core_Manifest_Metadata__Edit": ()=>Admin__Core_Manifest_Metadata__Edit,
    "Admin__Core_Manifest_Metadata__Show": ()=>Admin__Core_Manifest_Metadata__Show,
    "Admin__Core_Members__Show": ()=>Admin__Core_Members__Show,
    "Admin__Core_Nav__Change_Position": ()=>Admin__Core_Nav__Change_Position,
    "Admin__Core_Nav__Create": ()=>Admin__Core_Nav__Create,
    "Admin__Core_Nav__Delete": ()=>Admin__Core_Nav__Delete,
    "Admin__Core_Nav__Edit": ()=>Admin__Core_Nav__Edit,
    "Admin__Core_Nav__Show": ()=>Admin__Core_Nav__Show,
    "Admin__Core_Plugins__Create": ()=>Admin__Core_Plugins__Create,
    "Admin__Core_Plugins__Delete": ()=>Admin__Core_Plugins__Delete,
    "Admin__Core_Plugins__Download": ()=>Admin__Core_Plugins__Download,
    "Admin__Core_Plugins__Edit": ()=>Admin__Core_Plugins__Edit,
    "Admin__Core_Plugins__Files": ()=>Admin__Core_Plugins__Files,
    "Admin__Core_Plugins__Nav__Change_Position": ()=>Admin__Core_Plugins__Nav__Change_Position,
    "Admin__Core_Plugins__Nav__Create": ()=>Admin__Core_Plugins__Nav__Create,
    "Admin__Core_Plugins__Nav__Delete": ()=>Admin__Core_Plugins__Nav__Delete,
    "Admin__Core_Plugins__Nav__Edit": ()=>Admin__Core_Plugins__Nav__Edit,
    "Admin__Core_Plugins__Nav__Show": ()=>Admin__Core_Plugins__Nav__Show,
    "Admin__Core_Plugins__Show": ()=>Admin__Core_Plugins__Show,
    "Admin__Core_Plugins__Show__Item": ()=>Admin__Core_Plugins__Show__Item,
    "Admin__Core_Plugins__Upload": ()=>Admin__Core_Plugins__Upload,
    "Admin__Core_Staff_Administrators__Create": ()=>Admin__Core_Staff_Administrators__Create,
    "Admin__Core_Staff_Administrators__Delete": ()=>Admin__Core_Staff_Administrators__Delete,
    "Admin__Core_Staff_Administrators__Show": ()=>Admin__Core_Staff_Administrators__Show,
    "Admin__Core_Staff_Moderators__Create": ()=>Admin__Core_Staff_Moderators__Create,
    "Admin__Core_Staff_Moderators__Delete": ()=>Admin__Core_Staff_Moderators__Delete,
    "Admin__Core_Staff_Moderators__Show": ()=>Admin__Core_Staff_Moderators__Show,
    "Admin__Core_Theme_Editor__Edit": ()=>Admin__Core_Theme_Editor__Edit,
    "Admin__Core__Dashboard": ()=>Admin__Core__Dashboard,
    "Admin__Install__Create_Database": ()=>Admin__Install__Create_Database,
    "Admin__Install__Layout": ()=>Admin__Install__Layout,
    "Admin__Sessions__Authorization": ()=>Admin__Sessions__Authorization,
    "Core_Editor_Files__Delete": ()=>Core_Editor_Files__Delete,
    "Core_Editor_Files__Upload": ()=>Core_Editor_Files__Upload,
    "Core_Groups__Admin_Create": ()=>Core_Groups__Admin_Create,
    "Core_Languages__Show": ()=>Core_Languages__Show,
    "Core_Main_Settings__Show": ()=>Core_Main_Settings__Show,
    "Core_Members__Avatar__Delete": ()=>Core_Members__Avatar__Delete,
    "Core_Members__Avatar__Upload": ()=>Core_Members__Avatar__Upload,
    "Core_Members__Files__Show": ()=>Core_Members__Files__Show,
    "Core_Members__Profiles": ()=>Core_Members__Profiles,
    "Core_Members__Show__Search": ()=>Core_Members__Show__Search,
    "Core_Members__Sign_Up": ()=>Core_Members__Sign_Up,
    "Core_Metadata": ()=>Core_Metadata,
    "Core_Middleware": ()=>Core_Middleware,
    "Core_Middleware__Show": ()=>Core_Middleware__Show,
    "Core_Sessions__Authorization": ()=>Core_Sessions__Authorization,
    "Core_Sessions__Devices__Show": ()=>Core_Sessions__Devices__Show,
    "Core_Sessions__Sign_In": ()=>Core_Sessions__Sign_In,
    "Core_Sessions__Sign_Out": ()=>Core_Sessions__Sign_Out,
    "Core_Theme_Editor__Show": ()=>Core_Theme_Editor__Show,
    "LayoutAdminInstallEnum": ()=>LayoutAdminInstallEnum,
    "ShowAdminGroupsSortingColumnEnum": ()=>ShowAdminGroupsSortingColumnEnum,
    "ShowAdminMembersSortingColumnEnum": ()=>ShowAdminMembersSortingColumnEnum,
    "ShowAdminPluginsSortingColumnEnum": ()=>ShowAdminPluginsSortingColumnEnum,
    "ShowAdminStaffAdministratorsSortingColumnEnum": ()=>ShowAdminStaffAdministratorsSortingColumnEnum,
    "ShowAdminStaffModeratorsSortingColumnEnum": ()=>ShowAdminStaffModeratorsSortingColumnEnum,
    "ShowCoreFilesSortingColumnEnum": ()=>ShowCoreFilesSortingColumnEnum,
    "ShowCoreLanguagesSortingColumnEnum": ()=>ShowCoreLanguagesSortingColumnEnum,
    "ShowCoreMembersSortingColumnEnum": ()=>ShowCoreMembersSortingColumnEnum,
    "SortDirectionEnum": ()=>SortDirectionEnum
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/graphql-tag@2.12.6_graphql@16.8.1/node_modules/graphql-tag/lib/index.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const LayoutAdminInstallEnum = {
    account: 'ACCOUNT',
    database: 'DATABASE',
    finish: 'FINISH'
};
const ShowAdminGroupsSortingColumnEnum = {
    created: 'created',
    updated: 'updated'
};
const ShowAdminMembersSortingColumnEnum = {
    first_name: 'first_name',
    followers: 'followers',
    joined: 'joined',
    last_name: 'last_name',
    name: 'name',
    posts: 'posts',
    reactions: 'reactions'
};
const ShowAdminPluginsSortingColumnEnum = {
    created: 'created',
    updated: 'updated'
};
const ShowAdminStaffAdministratorsSortingColumnEnum = {
    updated: 'updated'
};
const ShowAdminStaffModeratorsSortingColumnEnum = {
    updated: 'updated'
};
const ShowCoreFilesSortingColumnEnum = {
    created: 'created',
    file_size: 'file_size'
};
const ShowCoreLanguagesSortingColumnEnum = {
    created: 'created',
    updated: 'updated'
};
const ShowCoreMembersSortingColumnEnum = {
    first_name: 'first_name',
    followers: 'followers',
    joined: 'joined',
    last_name: 'last_name',
    name: 'name',
    posts: 'posts',
    reactions: 'reactions'
};
const SortDirectionEnum = {
    asc: 'asc',
    desc: 'desc'
};
const Admin__Core_Files__Delete = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_files__delete($id: Int!) {
  admin__core_files__delete(id: $id)
}
    `;
const Admin__Install__Create_Database = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__install__create_database {
  admin__install__create_database
}
    `;
const Admin__Core_Languages__Create = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_languages__create($code: String!, $name: String!, $timezone: String!, $locale: String!, $time24: Boolean!, $allowInInput: Boolean!) {
  admin__core_languages__create(
    code: $code
    name: $name
    timezone: $timezone
    locale: $locale
    time_24: $time24
    allow_in_input: $allowInInput
  ) {
    code
    id
    name
  }
}
    `;
const Admin__Core_Languages__Delete = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_languages__delete($code: String!) {
  admin__core_languages__delete(code: $code)
}
    `;
const Admin__Core_Languages__Download = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_languages__download($code: String!, $plugins: [String!]!) {
  admin__core_languages__download(code: $code, plugins: $plugins)
}
    `;
const Admin__Core_Languages__Edit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_languages__edit($default: Boolean!, $enabled: Boolean!, $id: Int!, $name: String!, $timezone: String!, $locale: String!, $time24: Boolean!, $allowInInput: Boolean!) {
  admin__core_languages__edit(
    default: $default
    enabled: $enabled
    id: $id
    name: $name
    timezone: $timezone
    locale: $locale
    time_24: $time24
    allow_in_input: $allowInInput
  ) {
    code
    default
    enabled
    id
    name
    protected
    timezone
  }
}
    `;
const Admin__Core_Languages__Update = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_languages__update($code: String!, $file: Upload!) {
  admin__core_languages__update(code: $code, file: $file)
}
    `;
const Admin__Core_Groups__Delete = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_groups__delete($id: Int!) {
  admin__core_groups__delete(id: $id)
}
    `;
const Admin__Core_Groups__Edit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_groups__edit($id: Int!, $name: [TextLanguageInput!]!, $content: ContentCreateAdminGroups!) {
  admin__core_groups__edit(id: $id, name: $name, content: $content) {
    id
  }
}
    `;
const Core_Groups__Admin_Create = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation core_groups__admin_create($name: [TextLanguageInput!]!, $content: ContentCreateAdminGroups!) {
  core_groups__admin_create(name: $name, content: $content) {
    id
  }
}
    `;
const Admin__Core_Staff_Administrators__Create = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_staff_administrators__create($groupId: Int, $userId: Int, $unrestricted: Boolean!) {
  admin__core_staff_administrators__create(
    group_id: $groupId
    user_id: $userId
    unrestricted: $unrestricted
  ) {
    created
    id
    protected
    unrestricted
    updated
  }
}
    `;
const Admin__Core_Staff_Administrators__Delete = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_staff_administrators__delete($id: Int!) {
  admin__core_staff_administrators__delete(id: $id)
}
    `;
const Admin__Core_Staff_Moderators__Create = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_staff_moderators__create($groupId: Int, $userId: Int, $unrestricted: Boolean!) {
  admin__core_staff_moderators__create(
    group_id: $groupId
    user_id: $userId
    unrestricted: $unrestricted
  ) {
    created
    id
    protected
    unrestricted
    updated
  }
}
    `;
const Admin__Core_Staff_Moderators__Delete = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_staff_moderators__delete($id: Int!) {
  admin__core_staff_moderators__delete(id: $id)
}
    `;
const Admin__Core_Nav__Change_Position = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_nav__change_position($id: Int!, $indexToMove: Int!, $parentId: Int!) {
  admin__core_nav__change_position(
    id: $id
    index_to_move: $indexToMove
    parent_id: $parentId
  )
}
    `;
const Admin__Core_Nav__Create = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_nav__create($description: [TextLanguageInput!]!, $external: Boolean!, $href: String!, $name: [TextLanguageInput!]!, $icon: String) {
  admin__core_nav__create(
    description: $description
    external: $external
    href: $href
    name: $name
    icon: $icon
  ) {
    id
    name {
      language_code
      value
    }
  }
}
    `;
const Admin__Core_Nav__Delete = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_nav__delete($id: Int!) {
  admin__core_nav__delete(id: $id)
}
    `;
const Admin__Core_Nav__Edit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_nav__edit($description: [TextLanguageInput!]!, $external: Boolean!, $href: String!, $id: Int!, $name: [TextLanguageInput!]!, $icon: String) {
  admin__core_nav__edit(
    description: $description
    external: $external
    href: $href
    id: $id
    name: $name
    icon: $icon
  ) {
    id
    name {
      language_code
      value
    }
  }
}
    `;
const Admin__Core_Plugins__Create = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_plugins__create($author: String!, $authorUrl: String, $code: String!, $name: String!, $supportUrl: String!, $description: String) {
  admin__core_plugins__create(
    author: $author
    author_url: $authorUrl
    code: $code
    name: $name
    support_url: $supportUrl
    description: $description
  ) {
    code
  }
}
    `;
const Admin__Core_Plugins__Delete = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_plugins__delete($code: String!) {
  admin__core_plugins__delete(code: $code)
}
    `;
const Admin__Core_Plugins__Upload = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_plugins__upload($file: Upload!, $code: String) {
  admin__core_plugins__upload(file: $file, code: $code) {
    id
    name
  }
}
    `;
const Admin__Core_Plugins__Download = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_plugins__download($code: String!, $version: String, $versionCode: Int) {
  admin__core_plugins__download(
    code: $code
    version: $version
    version_code: $versionCode
  )
}
    `;
const Admin__Core_Plugins__Edit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_plugins__edit($author: String!, $authorUrl: String, $code: String!, $name: String!, $supportUrl: String!, $description: String, $default: Boolean, $enabled: Boolean) {
  admin__core_plugins__edit(
    author: $author
    author_url: $authorUrl
    code: $code
    name: $name
    support_url: $supportUrl
    description: $description
    default: $default
    enabled: $enabled
  ) {
    id
    name
  }
}
    `;
const Admin__Core_Plugins__Nav__Change_Position = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_plugins__nav__change_position($indexToMove: Int!, $pluginCode: String!, $code: String!, $parentCode: String) {
  admin__core_plugins__nav__change_position(
    index_to_move: $indexToMove
    plugin_code: $pluginCode
    code: $code
    parent_code: $parentCode
  )
}
    `;
const Admin__Core_Plugins__Nav__Create = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_plugins__nav__create($code: String!, $pluginCode: String!, $icon: String, $href: String!, $parentCode: String) {
  admin__core_plugins__nav__create(
    code: $code
    plugin_code: $pluginCode
    icon: $icon
    href: $href
    parent_code: $parentCode
  ) {
    code
    icon
    href
  }
}
    `;
const Admin__Core_Plugins__Nav__Delete = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_plugins__nav__delete($code: String!, $pluginCode: String!, $parentCode: String) {
  admin__core_plugins__nav__delete(
    code: $code
    plugin_code: $pluginCode
    parent_code: $parentCode
  )
}
    `;
const Admin__Core_Plugins__Nav__Edit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_plugins__nav__edit($code: String!, $href: String!, $icon: String, $pluginCode: String!, $previousCode: String!, $parentCode: String) {
  admin__core_plugins__nav__edit(
    code: $code
    href: $href
    icon: $icon
    plugin_code: $pluginCode
    previous_code: $previousCode
    parent_code: $parentCode
  ) {
    code
  }
}
    `;
const Admin_Sessions__Sign_Out = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin_sessions__sign_out {
  admin_sessions__sign_out
}
    `;
const Admin__Core_Main_Settings__Edit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_main_settings__edit($siteName: String!, $siteShortName: String!, $siteDescription: [TextLanguageInput!]!, $siteCopyright: [TextLanguageInput!]!) {
  admin__core_main_settings__edit(
    site_name: $siteName
    site_short_name: $siteShortName
    site_description: $siteDescription
    site_copyright: $siteCopyright
  ) {
    site_name
  }
}
    `;
const Admin__Core_Manifest_Metadata__Edit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_manifest_metadata__edit($display: String!, $startUrl: String!, $backgroundColor: String!, $themeColor: String!) {
  admin__core_manifest_metadata__edit(
    display: $display
    start_url: $startUrl
    background_color: $backgroundColor
    theme_color: $themeColor
  ) {
    display
  }
}
    `;
const Admin__Core_Email_Settings__Edit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_email_settings__edit($smtpHost: String!, $smtpPassword: String!, $smtpPort: Int!, $smtpSecure: Boolean!, $smtpUser: String!, $colorPrimaryForeground: String!, $colorPrimary: String!) {
  admin__core_email_settings__edit(
    smtp_host: $smtpHost
    smtp_password: $smtpPassword
    smtp_port: $smtpPort
    smtp_secure: $smtpSecure
    smtp_user: $smtpUser
    color_primary_foreground: $colorPrimaryForeground
    color_primary: $colorPrimary
  ) {
    smtp_host
  }
}
    `;
const Admin__Core_Email_Settings__Test = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_email_settings__test($to: String!, $from: String!, $message: String!, $subject: String!) {
  admin__core_email_settings__test(
    to: $to
    from: $from
    message: $message
    subject: $subject
  )
}
    `;
const Admin__Core_Theme_Editor__Edit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__core_theme_editor__edit($colors: ColorsEditAdminThemeEditor!) {
  admin__core_theme_editor__edit(colors: $colors)
}
    `;
const Admin__Sessions__Authorization = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Admin__sessions__authorization {
  admin__sessions__authorization {
    user {
      email
      id
      name_seo
      is_admin
      is_mod
      name
      newsletter
      avatar_color
      avatar {
        id
        dir_folder
        file_name
      }
      group {
        name {
          language_code
          value
        }
        id
      }
    }
    version
    nav {
      code
      nav {
        code
        href
        icon
        children {
          code
          href
        }
      }
    }
  }
}
    `;
const Admin__Core_Files__Show = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Admin__core_files__show($cursor: Int, $first: Int, $sortBy: ShowCoreFilesSortByArgs, $last: Int, $search: String) {
  admin__core_files__show(
    cursor: $cursor
    first: $first
    sortBy: $sortBy
    last: $last
    search: $search
  ) {
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
    edges {
      count_uses
      created
      dir_folder
      extension
      file_alt
      file_name
      file_name_original
      file_size
      height
      id
      mimetype
      security_key
      user {
        id
        name
        name_seo
      }
      width
    }
  }
}
    `;
const Admin__Install__Layout = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Admin__install__layout {
  admin__install__layout {
    status
  }
}
    `;
const Admin__Core__Dashboard = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Admin__core__dashboard {
  admin__core_members__stats_sign_up {
    joined_date
    users_joined
  }
}
    `;
const Admin__Core_Groups__Show = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Admin__Core_groups__show($first: Int, $cursor: Int, $search: String, $sortBy: ShowAdminGroupsSortByArgs, $last: Int) {
  admin__core_groups__show(
    first: $first
    cursor: $cursor
    search: $search
    sortBy: $sortBy
    last: $last
  ) {
    pageInfo {
      count
      endCursor
      hasNextPage
      startCursor
      totalCount
      hasPreviousPage
    }
    edges {
      created
      updated
      id
      users_count
      protected
      guest
      name {
        language_code
        value
      }
      root
      default
      content {
        files_allow_upload
        files_max_storage_for_submit
        files_total_max_storage
      }
    }
  }
}
    `;
const Admin__Core_Groups__Show_Short = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Admin__Core_groups__show_short($first: Int, $search: String) {
  admin__core_groups__show(first: $first, search: $search) {
    edges {
      id
      name {
        language_code
        value
      }
      guest
    }
  }
}
    `;
const Admin__Core_Staff_Administrators__Show = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Admin__core_staff_administrators__show($cursor: Int, $first: Int, $last: Int, $sortBy: ShowAdminStaffAdministratorsSortByArgs) {
  admin__core_staff_administrators__show(
    cursor: $cursor
    first: $first
    last: $last
    sortBy: $sortBy
  ) {
    edges {
      created
      id
      unrestricted
      user_or_group {
        __typename
        ... on User {
          avatar_color
          avatar {
            id
            dir_folder
            file_name
          }
          group {
            id
            name {
              language_code
              value
            }
          }
          name_seo
          id
          name
        }
        ... on StaffGroupUser {
          group_name {
            language_code
            value
          }
          id
        }
      }
      updated
      protected
    }
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
  }
}
    `;
const Admin__Core_Staff_Moderators__Show = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Admin__core_staff_moderators__show($sortBy: ShowAdminStaffModeratorsSortByArgs, $last: Int, $first: Int, $cursor: Int) {
  admin__core_staff_moderators__show(
    sortBy: $sortBy
    last: $last
    first: $first
    cursor: $cursor
  ) {
    edges {
      created
      id
      unrestricted
      user_or_group {
        __typename
        ... on User {
          avatar_color
          avatar {
            id
            dir_folder
            file_name
          }
          group {
            id
            name {
              language_code
              value
            }
          }
          id
          name_seo
          name
        }
        ... on StaffGroupUser {
          group_name {
            language_code
            value
          }
          id
        }
      }
      updated
      protected
    }
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
  }
}
    `;
const Admin__Core_Members__Show = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Admin__core_members__show($cursor: Int, $first: Int, $last: Int, $search: String, $sortBy: ShowAdminMembersSortByArgs, $groups: [Int!]) {
  admin__core_members__show(
    cursor: $cursor
    first: $first
    last: $last
    search: $search
    sortBy: $sortBy
    groups: $groups
  ) {
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
    edges {
      avatar_color
      avatar {
        id
        dir_folder
        file_name
      }
      email
      id
      name_seo
      joined
      name
      group {
        id
        name {
          language_code
          value
        }
      }
    }
  }
}
    `;
const Admin__Core_Nav__Show = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Admin__Core_nav__show {
  core_nav__show {
    edges {
      children {
        description {
          language_code
          value
        }
        id
        name {
          language_code
          value
        }
        href
        external
        position
        icon
      }
      description {
        language_code
        value
      }
      id
      name {
        language_code
        value
      }
      href
      external
      position
      icon
    }
  }
}
    `;
const Admin__Core_Plugins__Show = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Admin__core_plugins__show($cursor: Int, $first: Int, $last: Int, $sortBy: ShowAdminPluginsSortByArgs, $search: String) {
  admin__core_plugins__show(
    cursor: $cursor
    first: $first
    last: $last
    sortBy: $sortBy
    search: $search
  ) {
    edges {
      author
      author_url
      code
      default
      description
      enabled
      id
      name
      support_url
      updated
      version
      created
      version_code
      allow_default
    }
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
  }
}
    `;
const Admin__Core_Plugins__Files = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Admin__core_plugins__files($code: String!) {
  admin__core_plugins__files(code: $code) {
    admin_pages
    admin_templates
    databases
    pages
    pages_container
    templates
    default_page
  }
}
    `;
const Admin__Core_Plugins__Show__Item = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Admin__core_plugins__show__item($code: String, $first: Int) {
  admin__core_plugins__show(code: $code, first: $first) {
    edges {
      allow_default
      author
      author_url
      code
      created
      default
      description
      enabled
      id
      name
      support_url
      updated
      version
      version_code
    }
  }
}
    `;
const Admin__Core_Plugins__Nav__Show = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Admin__core_plugins__nav__show($pluginCode: String!) {
  admin__core_plugins__nav__show(plugin_code: $pluginCode) {
    code
    icon
    href
    children {
      code
      href
      icon
    }
  }
}
    `;
const Admin__Core_Email_Settings__Show = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Admin__core_email_settings__show {
  admin__core_email_settings__show {
    smtp_host
    smtp_port
    smtp_secure
    smtp_user
    color_primary
  }
}
    `;
const Admin__Core_Manifest_Metadata__Show = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Admin__core_manifest_metadata__show {
  admin__core_manifest_metadata__show {
    display
    start_url
    theme_color
    background_color
  }
}
    `;
const Core_Main_Settings__Show = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Core_main_settings__show {
  core_settings__show {
    site_name
    site_short_name
    site_copyright {
      language_code
      value
    }
    site_description {
      language_code
      value
    }
  }
}
    `;
const Core_Theme_Editor__Show = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Core_theme_editor__show {
  core_theme_editor__show {
    colors {
      background {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      primary {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      secondary {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      primary_foreground {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      secondary_foreground {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      destructive {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      destructive_foreground {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      cover {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      cover_foreground {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      muted {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      muted_foreground {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      accent {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      accent_foreground {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      card {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      border {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
    }
  }
}
    `;
const Admin__Blog_Categories__Create = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Admin__blog_categories__create($description: [TextLanguageInput!]!, $name: [TextLanguageInput!]!, $color: String!, $permissions: PermissionsCreatePluginCategories!) {
  admin__blog_categories__create(
    description: $description
    name: $name
    color: $color
    permissions: $permissions
  ) {
    id
  }
}
    `;
const Admin_Blog_Categories__Show = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Admin_blog_categories__show {
  blog_categories__show {
    edges {
      color
      description {
        language_code
        value
      }
      id
      name {
        language_code
        value
      }
      position
    }
  }
}
    `;
const Core_Editor_Files__Delete = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Core_editor_files__delete($id: Int!, $securityKey: String) {
  core_editor_files__delete(id: $id, security_key: $securityKey)
}
    `;
const Core_Editor_Files__Upload = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation core_editor_files__upload($file: Upload!, $folder: String!, $plugin: String!) {
  core_editor_files__upload(file: $file, folder: $folder, plugin: $plugin) {
    extension
    file_name
    file_size
    mimetype
    id
    height
    width
    dir_folder
    security_key
    file_alt
    file_name_original
  }
}
    `;
const Core_Members__Sign_Up = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Core_members__sign_up($email: String!, $name: String!, $password: String!, $newsletter: Boolean) {
  core_members__sign_up(
    email: $email
    name: $name
    password: $password
    newsletter: $newsletter
  ) {
    email
    name
    newsletter
  }
}
    `;
const Core_Members__Avatar__Delete = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Core_members__avatar__delete {
  core_members__avatar__delete
}
    `;
const Core_Members__Avatar__Upload = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Core_members__avatar__upload($file: Upload!) {
  core_members__avatar__upload(file: $file) {
    id
  }
}
    `;
const Core_Sessions__Sign_In = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Core_sessions__sign_in($email: String!, $password: String!, $remember: Boolean, $admin: Boolean) {
  core_sessions__sign_in(
    email: $email
    password: $password
    remember: $remember
    admin: $admin
  )
}
    `;
const Core_Sessions__Sign_Out = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    mutation Core_sessions__sign_out {
  core_sessions__sign_out
}
    `;
const Core_Metadata = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Core_metadata {
  core_settings__show {
    site_copyright {
      language_code
      value
    }
    site_description {
      language_code
      value
    }
    site_name
    site_short_name
  }
}
    `;
const Core_Middleware = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Core_middleware {
  core_languages__show {
    edges {
      default
      code
      id
      name
      timezone
      enabled
      locale
      allow_in_input
      time_24
    }
  }
  core_plugins__show {
    code
  }
  core_settings__show {
    site_copyright {
      language_code
      value
    }
    site_description {
      language_code
      value
    }
    site_name
  }
}
    `;
const Core_Middleware__Show = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Core_middleware__show {
  core_middleware__show {
    languages {
      code
      default
      enabled
    }
    plugins
  }
}
    `;
const Core_Sessions__Authorization = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Core_sessions__authorization {
  core_sessions__authorization {
    user {
      email
      id
      name_seo
      is_admin
      is_mod
      name
      newsletter
      avatar_color
      avatar {
        id
        dir_folder
        file_name
      }
      group {
        name {
          language_code
          value
        }
        id
      }
    }
    plugin_default
    files {
      allow_upload
      max_storage_for_submit
      total_max_storage
      space_used
    }
  }
  core_languages__show {
    edges {
      code
    }
  }
  core_nav__show {
    edges {
      children {
        description {
          language_code
          value
        }
        id
        name {
          language_code
          value
        }
        position
        external
        href
        icon
      }
      description {
        language_code
        value
      }
      id
      name {
        language_code
        value
      }
      href
      external
      position
      icon
    }
  }
  core_plugins__show {
    code
    allow_default
  }
  core_settings__show {
    site_copyright {
      language_code
      value
    }
    site_description {
      language_code
      value
    }
  }
}
    `;
const Core_Languages__Show = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Core_languages__show($first: Int, $last: Int, $cursor: Int, $search: String, $sortBy: ShowCoreLanguagesSortByArgs) {
  core_languages__show(
    first: $first
    last: $last
    cursor: $cursor
    search: $search
    sortBy: $sortBy
  ) {
    edges {
      code
      default
      allow_in_input
      enabled
      id
      name
      protected
      timezone
      locale
      time_24
      updated
      created
    }
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
  }
}
    `;
const Core_Members__Show__Search = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Core_members__show__search($search: String, $first: Int) {
  core_members__show(search: $search, first: $first) {
    edges {
      avatar_color
      avatar {
        id
        dir_folder
        file_name
      }
      group {
        id
        name {
          language_code
          value
        }
      }
      id
      name
      name_seo
    }
  }
}
    `;
const Core_Members__Files__Show = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Core_members__files__show($cursor: Int, $first: Int, $last: Int, $sortBy: ShowCoreFilesSortByArgs, $search: String) {
  core_files__show(
    cursor: $cursor
    first: $first
    last: $last
    sortBy: $sortBy
    search: $search
  ) {
    edges {
      created
      dir_folder
      extension
      file_name
      file_size
      file_name_original
      height
      id
      mimetype
      width
      file_alt
      count_uses
      security_key
    }
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
  }
}
    `;
const Core_Sessions__Devices__Show = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Core_sessions__devices__show {
  core_sessions__devices__show {
    expires
    id
    last_seen
    uagent_browser
    uagent_os
    uagent_version
    login_token
    ip_address
    created
  }
}
    `;
const Core_Members__Profiles = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$graphql$2d$tag$40$2$2e$12$2e$6_graphql$40$16$2e$8$2e$1$2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]`
    query Core_members__profiles($first: Int, $nameSeo: String!) {
  core_members__show(first: $first, name_seo: $nameSeo) {
    edges {
      avatar_color
      avatar {
        id
        dir_folder
        file_name
      }
      group {
        name {
          language_code
          value
        }
      }
      id
      joined
      name
      name_seo
      posts
    }
  }
}
    `;

})()),
"[project]/frontend/middleware.ts [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "config": ()=>config,
    "default": ()=>middleware
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$3$2e$15$2e$0_next$40$15$2e$0$2e$0$2d$canary$2e$28_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2e$0_react$40$19$2e$0$2e$0$2d$rc$2e$0_$5f$react$40$19$2e$0$2e$0$2d$rc$2e$0_$5f$react$40$19$2e$0$2e$0$2d$rc$2e$0$2f$node_modules$2f$next$2d$intl$2f$dist$2f$middleware$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next-intl@3.15.0_next@15.0.0-canary.28_react-dom@19.0.0-rc.0_react@19.0.0-rc.0__react@19.0.0-rc.0__react@19.0.0-rc.0/node_modules/next-intl/dist/middleware.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$graphql$2f$fetcher$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/frontend/graphql/fetcher.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$graphql$2f$hooks$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/frontend/graphql/hooks.ts [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
async function middleware(request) {
    try {
        const { data: { core_middleware__show: { languages: langs } } } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$graphql$2f$fetcher$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["fetcher"])({
            query: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$graphql$2f$hooks$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["Core_Middleware__Show"]
        });
        const languages = langs.filter((lang)=>lang.enabled);
        const defaultLanguage = langs.find((lang)=>lang.default)?.code ?? "en";
        const handleI18nRouting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$3$2e$15$2e$0_next$40$15$2e$0$2e$0$2d$canary$2e$28_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2e$0_react$40$19$2e$0$2e$0$2d$rc$2e$0_$5f$react$40$19$2e$0$2e$0$2d$rc$2e$0_$5f$react$40$19$2e$0$2e$0$2d$rc$2e$0$2f$node_modules$2f$next$2d$intl$2f$dist$2f$middleware$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])({
            locales: languages.length > 0 ? languages.map((edge)=>edge.code) : [
                "en"
            ],
            defaultLocale: defaultLanguage
        });
        const response = handleI18nRouting(request);
        return response;
    } catch (error) {
        const handleI18nRouting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$3$2e$15$2e$0_next$40$15$2e$0$2e$0$2d$canary$2e$28_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2e$0_react$40$19$2e$0$2e$0$2d$rc$2e$0_$5f$react$40$19$2e$0$2e$0$2d$rc$2e$0_$5f$react$40$19$2e$0$2e$0$2d$rc$2e$0$2f$node_modules$2f$next$2d$intl$2f$dist$2f$middleware$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])({
            locales: [
                "en"
            ],
            defaultLocale: "en"
        });
        const response = handleI18nRouting(request);
        return response;
    }
}
const config = {
    matcher: [
        "/((?!api|_next|icons|robots.txt|sitemap.xml|sitemap).*)"
    ]
};

})()),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__a3d950._.js.map