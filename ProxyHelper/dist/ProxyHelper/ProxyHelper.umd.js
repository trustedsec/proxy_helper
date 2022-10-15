(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('@angular/router'), require('@angular/common'), require('@angular/cdk/a11y'), require('@angular/cdk/bidi'), require('@angular/cdk/observers'), require('@angular/cdk/overlay'), require('@angular/cdk/platform'), require('@angular/cdk/portal'), require('@angular/cdk/stepper'), require('@angular/cdk/table'), require('@angular/cdk/tree'), require('@angular/material/autocomplete'), require('@angular/material/badge'), require('@angular/material/bottom-sheet'), require('@angular/material/button'), require('@angular/material/button-toggle'), require('@angular/material/card'), require('@angular/material/checkbox'), require('@angular/material/chips'), require('@angular/material/core'), require('@angular/material/datepicker'), require('@angular/material/dialog'), require('@angular/material/divider'), require('@angular/material/expansion'), require('@angular/material/form-field'), require('@angular/material/grid-list'), require('@angular/material/icon'), require('@angular/material/input'), require('@angular/material/list'), require('@angular/material/menu'), require('@angular/material/paginator'), require('@angular/material/progress-bar'), require('@angular/material/progress-spinner'), require('@angular/material/radio'), require('@angular/material/select'), require('@angular/material/sidenav'), require('@angular/material/slide-toggle'), require('@angular/material/slider'), require('@angular/material/snack-bar'), require('@angular/material/sort'), require('@angular/material/stepper'), require('@angular/material/table'), require('@angular/material/tabs'), require('@angular/material/toolbar'), require('@angular/material/tooltip'), require('@angular/material/tree'), require('@angular/flex-layout'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('ProxyHelper', ['exports', '@angular/core', '@angular/common/http', '@angular/router', '@angular/common', '@angular/cdk/a11y', '@angular/cdk/bidi', '@angular/cdk/observers', '@angular/cdk/overlay', '@angular/cdk/platform', '@angular/cdk/portal', '@angular/cdk/stepper', '@angular/cdk/table', '@angular/cdk/tree', '@angular/material/autocomplete', '@angular/material/badge', '@angular/material/bottom-sheet', '@angular/material/button', '@angular/material/button-toggle', '@angular/material/card', '@angular/material/checkbox', '@angular/material/chips', '@angular/material/core', '@angular/material/datepicker', '@angular/material/dialog', '@angular/material/divider', '@angular/material/expansion', '@angular/material/form-field', '@angular/material/grid-list', '@angular/material/icon', '@angular/material/input', '@angular/material/list', '@angular/material/menu', '@angular/material/paginator', '@angular/material/progress-bar', '@angular/material/progress-spinner', '@angular/material/radio', '@angular/material/select', '@angular/material/sidenav', '@angular/material/slide-toggle', '@angular/material/slider', '@angular/material/snack-bar', '@angular/material/sort', '@angular/material/stepper', '@angular/material/table', '@angular/material/tabs', '@angular/material/toolbar', '@angular/material/tooltip', '@angular/material/tree', '@angular/flex-layout', '@angular/forms'], factory) :
    (global = global || self, factory(global.ProxyHelper = {}, global.ng.core, global.ng.common.http, global.ng.router, global.ng.common, global.ng.cdk.a11y, global.ng.cdk.bidi, global.ng.cdk.observers, global.ng.cdk.overlay, global.ng.cdk.platform, global.ng.cdk.portal, global.ng.cdk.stepper, global.ng.cdk.table, global.ng.cdk.tree, global.ng.material.autocomplete, global.ng.material.badge, global.ng.material.bottomSheet, global.ng.material.button, global.ng.material.buttonToggle, global.ng.material.card, global.ng.material.checkbox, global.ng.material.chips, global.ng.material.core, global.ng.material.datepicker, global.ng.material.dialog, global.ng.material.divider, global.ng.material.expansion, global.ng.material.formField, global.ng.material.gridList, global.ng.material.icon, global.ng.material.input, global.ng.material.list, global.ng.material.menu, global.ng.material.paginator, global.ng.material.progressBar, global.ng.material.progressSpinner, global.ng.material.radio, global.ng.material.select, global.ng.material.sidenav, global.ng.material.slideToggle, global.ng.material.slider, global.ng.material.snackBar, global.ng.material.sort, global.ng.material.stepper, global.ng.material.table, global.ng.material.tabs, global.ng.material.toolbar, global.ng.material.tooltip, global.ng.material.tree, global.ng.flexLayout, global.ng.forms));
}(this, (function (exports, core, http, router, common, a11y, bidi, observers, overlay, platform, portal, stepper, table, tree, autocomplete, badge, bottomSheet, button, buttonToggle, card, checkbox, chips, core$1, datepicker, dialog, divider, expansion, formField, gridList, icon, input, list, menu, paginator, progressBar, progressSpinner, radio, select, sidenav, slideToggle, slider, snackBar, sort, stepper$1, table$1, tabs, toolbar, tooltip, tree$1, flexLayout, forms) { 'use strict';

    /*! *****************************************************************************
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
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var ProxyHelperService = /** @class */ (function () {
        function ProxyHelperService() {
        }
        ProxyHelperService.ɵprov = core.ɵɵdefineInjectable({ factory: function ProxyHelperService_Factory() { return new ProxyHelperService(); }, token: ProxyHelperService, providedIn: "root" });
        ProxyHelperService = __decorate([
            core.Injectable({
                providedIn: 'root'
            })
        ], ProxyHelperService);
        return ProxyHelperService;
    }());

    var ApiService = /** @class */ (function () {
        function ApiService(http, router) {
            this.http = http;
            this.router = router;
            this.apiModuleBusy = document.getElementById('ApiModuleBusy');
            this.emptyResponse = { error: 'Request returned empty response' };
        }
        ApiService_1 = ApiService;
        ApiService.prototype.unauth = function () {
            localStorage.removeItem('authToken');
            if (this.router.url !== '/Login' && this.router.url !== '/Setup') {
                this.router.navigateByUrl('/Login');
            }
        };
        ApiService.prototype.setBusy = function () {
            this.apiModuleBusy.style.display = 'block';
        };
        ApiService.prototype.setNotBusy = function () {
            this.apiModuleBusy.style.display = 'none';
        };
        ApiService.extractBaseHref = function () {
            // Duplicated from injector because we have to be able to support
            // a static method here
            if (window['_app_base']) {
                if (window['_app_base'].endsWith('/')) {
                    return window['_app_base'].slice(0, -1);
                }
            }
            return window['_app_base'] || '';
        };
        ApiService.prototype.request = function (payload, callback) {
            var _this = this;
            this.setBusy();
            var resp;
            this.http.post(ApiService_1.extractBaseHref() + "/api/module/request", payload).subscribe(function (r) {
                if (r === undefined || r === null) {
                    resp = _this.emptyResponse;
                }
                else if (r.error) {
                    resp = r;
                }
                else {
                    resp = r.payload;
                }
            }, function (err) {
                resp = err.error;
                if (err.status === 401) {
                    _this.unauth();
                }
                _this.setNotBusy();
                callback(resp);
            }, function () {
                _this.setNotBusy();
                callback(resp);
            });
            ApiService_1.totalRequests++;
        };
        ApiService.prototype.APIGet = function (path, callback) {
            var _this = this;
            ApiService_1.totalRequests++;
            var resp;
            this.http.get("" + ApiService_1.extractBaseHref() + path).subscribe(function (r) {
                if (r === undefined || r === null) {
                    r = _this.emptyResponse;
                }
                resp = r;
            }, function (err) {
                resp = err.error;
                if (err.status === 401) {
                    _this.unauth();
                }
                callback(resp);
            }, function () {
                callback(resp);
            });
        };
        ApiService.prototype.APIGetAsync = function (path) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ApiService_1.totalRequests++;
                            return [4 /*yield*/, this.http.get("" + ApiService_1.extractBaseHref() + path).toPromise()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ApiService.prototype.APIPut = function (path, body, callback) {
            var _this = this;
            ApiService_1.totalRequests++;
            var resp;
            this.http.put("" + ApiService_1.extractBaseHref() + path, body).subscribe(function (r) {
                if (r === undefined || r === null) {
                    r = _this.emptyResponse;
                }
                resp = r;
            }, function (err) {
                resp = err.error;
                if (err.status === 401) {
                    _this.unauth();
                }
                callback(resp);
            }, function () {
                callback(resp);
            });
        };
        ApiService.prototype.APIPutAsync = function (path, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.http.put(ApiService_1.extractBaseHref() + "/" + path, body).toPromise()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ApiService.prototype.APIPost = function (path, body, callback) {
            var _this = this;
            ApiService_1.totalRequests++;
            var resp;
            this.http.post("" + ApiService_1.extractBaseHref() + path, body).subscribe(function (r) {
                if (r === undefined || r === null) {
                    resp = _this.emptyResponse;
                }
                resp = r;
            }, function (err) {
                resp = err.error;
                if (err.status === 401) {
                    _this.unauth();
                }
                callback(resp);
            }, function () {
                callback(resp);
            });
        };
        ApiService.prototype.APIPostAsync = function (path, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.http.post(ApiService_1.extractBaseHref() + "/" + path, body).toPromise()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ApiService.prototype.APIDelete = function (path, body, callback) {
            var _this = this;
            ApiService_1.totalRequests++;
            var opts = {
                headers: null,
                body: body
            };
            var resp;
            this.http.delete(ApiService_1.extractBaseHref() + "/" + path, opts).subscribe(function (r) {
                if (r === undefined || r === null) {
                    r = _this.emptyResponse;
                }
                resp = r;
            }, function (err) {
                resp = err.error;
                if (err.status === 401) {
                    _this.unauth();
                }
                callback(resp);
            }, function () {
                callback(resp);
            });
        };
        ApiService.prototype.APIDeleteAsync = function (path, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.http.delete("" + ApiService_1.extractBaseHref() + path, body).toPromise()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ApiService.prototype.APIDownload = function (fullpath, filename) {
            ApiService_1.totalRequests++;
            var body = {
                filename: fullpath
            };
            this.http.post(ApiService_1.extractBaseHref() + "/api/download", body, { responseType: 'blob' }).subscribe(function (r) {
                var url = window.URL.createObjectURL(r);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display: none');
                a.href = url;
                a.download = filename;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
            });
        };
        var ApiService_1;
        ApiService.totalRequests = 0;
        ApiService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: router.Router }
        ]; };
        ApiService.ɵprov = core.ɵɵdefineInjectable({ factory: function ApiService_Factory() { return new ApiService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(router.Router)); }, token: ApiService, providedIn: "root" });
        ApiService = ApiService_1 = __decorate([
            core.Injectable({
                providedIn: 'root'
            })
        ], ApiService);
        return ApiService;
    }());

    var ProxyHelperComponent = /** @class */ (function () {
        function ProxyHelperComponent(API) {
            this.API = API;
            this.title = "";
            this.version = "";
            this.statusColor = "warn";
            this.status = "Stopped";
            this.toggleSuccess = false;
            this.toggleFailure = false;
            this.error = "";
            this.disabled = false;
            this.proxyIp = "172.16.42.42";
            this.proxyPort = "8080";
            this.running = false;
            this.isFetchingBackups = false;
            this.isBackingUp = false;
            this.backupName = "";
            this.backupContents = "";
            this.restoreMessage = "";
            this.backups = [];
        }
        ProxyHelperComponent.prototype.ngOnInit = function () {
            this.getAboutInfo();
            this.getRunningStatus();
        };
        ProxyHelperComponent.prototype.getAboutInfo = function () {
            var _this = this;
            this.API.request({
                module: "ProxyHelper",
                action: "aboutInfo",
            }, function (response) {
                console.log(response);
                _this.title = response.title;
                _this.version = response.version;
            });
        };
        ProxyHelperComponent.prototype.getRunningStatus = function () {
            var _this = this;
            this.API.request({
                module: "ProxyHelper",
                action: "getRunningStatus",
            }, function (response) {
                console.log(response);
                _this.running = response.isRunning;
                _this.proxyIp = response.proxyIp || _this.proxyIp;
                _this.proxyPort = response.proxyPort || _this.proxyPort;
                if (response.isRunning) {
                    _this.status = "Running";
                    _this.statusColor = "accent";
                    _this.toggleSuccess = false;
                    _this.toggleFailure = false;
                    _this.error = "";
                }
                else {
                    _this.status = "Stopped";
                    _this.statusColor = "warn";
                    _this.toggleSuccess = false;
                    _this.toggleFailure = false;
                    _this.error = "";
                }
            });
        };
        ProxyHelperComponent.prototype.setRunningStatus = function (running) {
            this.running = running;
            this.API.request({
                module: "ProxyHelper",
                action: "setRunningStatus",
                isRunning: running,
                proxyIp: this.proxyIp,
                proxyPort: this.proxyPort,
            }, function (response) {
                console.log(response);
            });
        };
        ProxyHelperComponent.prototype.backupRules = function (bIsAutoBackup) {
            var _this = this;
            this.isBackingUp = true;
            this.API.request({
                module: "ProxyHelper",
                action: "backupRules",
                bIsAutoBackup: bIsAutoBackup
            }, function (response) {
                _this.isBackingUp = false;
                console.log(response);
            });
        };
        ProxyHelperComponent.prototype.enableProxy = function () {
            var _this = this;
            this.error = "";
            this.toggleFailure = false;
            this.API.request({
                module: "ProxyHelper",
                action: "backupRules",
                bIsAutoBackup: true
            }, function (response) {
                console.log(response);
                _this.API.request({
                    module: "ProxyHelper",
                    action: "clearRules"
                }, function (response) {
                    console.log(response);
                    _this.API.request({
                        module: "ProxyHelper",
                        action: "createProxyRules",
                        dIP: _this.proxyIp,
                        dPort: parseInt(_this.proxyPort)
                    }, function (response) {
                        console.log(response);
                        if (response.success) {
                            _this.setRunningStatus(true);
                            console.log('Started proxy on IP: ' + _this.proxyIp + ' and port: ' + _this.proxyPort);
                            _this.status = "Started";
                            _this.statusColor = "primary";
                            _this.toggleSuccess = true;
                            _this.toggleFailure = false;
                            _this.disabled = true;
                        }
                        else {
                            console.log('Failed to start proxy');
                            _this.status = "Stopped";
                            _this.statusColor = "warn";
                            _this.toggleSuccess = false;
                            _this.toggleFailure = true;
                            _this.disabled = false;
                        }
                    });
                });
            });
        };
        ProxyHelperComponent.prototype.disableProxy = function () {
            var _this = this;
            this.API.request({
                module: "ProxyHelper",
                action: "clearRules"
            }, function (response) {
                console.log(response);
                console.log('Stopping proxy');
                _this.status = "Stopped";
                _this.statusColor = "warn";
                _this.toggleSuccess = false;
                _this.toggleFailure = false;
                _this.API.request({
                    module: "ProxyHelper",
                    action: "restoreBackup",
                    filename: "iptables_tmp"
                }, function (response) {
                    console.log(response);
                });
            });
        };
        ProxyHelperComponent.prototype.toggleProxy = function () {
            if (this.status == "Stopped") {
                this.enableProxy();
            }
            else {
                this.disableProxy();
            }
        };
        ProxyHelperComponent.prototype.viewBackup = function (filename) {
            var _this = this;
            this.API.request({
                module: "ProxyHelper",
                action: "viewBackup",
                filename: filename
            }, function (response) {
                console.log(response);
                _this.backupContents = response.output;
                _this.backupName = response.name;
            });
        };
        ProxyHelperComponent.prototype.restoreBackup = function (filename) {
            var _this = this;
            this.API.request({
                module: "ProxyHelper",
                action: "restoreBackup",
                filename: filename
            }, function (response) {
                console.log(response);
                if (response.success) {
                    _this.restoreMessage = "Backup restored";
                }
                else {
                    _this.restoreMessage = "Failed to restore backup";
                }
            });
        };
        ProxyHelperComponent.prototype.getBackups = function () {
            var _this = this;
            this.API.request({
                module: "ProxyHelper",
                action: "getBackups"
            }, function (response) {
                console.log(response);
                _this.backups = response.backups;
            });
        };
        ProxyHelperComponent.prototype.deleteBackup = function (filename) {
            var _this = this;
            this.API.request({
                module: "ProxyHelper",
                action: "deleteBackup",
                filename: filename
            }, function (response) {
                console.log(response);
                if (response.success) {
                    _this.restoreMessage = "Backup deleted";
                }
                else {
                    _this.restoreMessage = "Failed to delete backup";
                }
            });
        };
        ProxyHelperComponent.ctorParameters = function () { return [
            { type: ApiService }
        ]; };
        ProxyHelperComponent = __decorate([
            core.Component({
                selector: "lib-ProxyHelper",
                template: "<mat-grid-list cols=\"1\" class=\"mat-typography\">\n  <mat-card class=\"title-card\">\n    <mat-card-title>{{title}} - Version {{version}}</mat-card-title>\n  </mat-card>\n\n  <mat-card class=\"control-card\">\n    <mat-card-title>Controls</mat-card-title>\n    <mat-card-content class=\"control-card-content\">\n      <div class=\"card-row\">\n        <p class=\"label\">Proxy</p>\n        <button mat-raised-button class=\"control-button\" (click)=\"toggleProxy()\" color={{statusColor}}>{{status}}</button>\n      </div>\n      <div class=\"card-row\">\n        <p class=\"label\">Manually Backup FW Rules</p>\n        <button mat-raised-button class=\"control-button\">Backup</button>\n      </div>\n    </mat-card-content>\n  </mat-card>\n\n  <mat-card class=\"settings-card\">\n    <mat-card-title>Proxy Settings</mat-card-title>\n    <mat-card-content>\n      <form>\n      <div class=\"card-row\">\n        <mat-form-field appearance=\"fill\">\n          <mat-label>Proxy IP</mat-label>\n          <input matInput placeholder=\"172.16.42.42\" disabled={{disabled}} [(ngModel)]=\"proxyIp\" name=\"proxyIP\">\n        </mat-form-field>\n      </div>\n      <div class=\"card-row\">\n        <mat-form-field appearance=\"fill\">\n          <mat-label>Proxy Port</mat-label>\n          <input matInput placeholder=\"8080\" disabled={{disabled}} [(ngModel)]=\"proxyPort\" name=\"proxyPort\">\n        </mat-form-field>\n      </div>\n      </form>\n    </mat-card-content>\n  </mat-card>\n\n  <mat-card>\n    <mat-card-title>Backups</mat-card-title>\n    <mat-card-content>\n      <table>\n        <ng-container cdkColumnDef=\"file\">\n          <th cdk-header-cell *cdkHeaderCellDef>File</th>\n          <td cdk-cell *cdkCellDef=\"let element\"> {{element.file}} </td>\n        </ng-container>\n        <ng-container cdkColumnDef=\"action\">\n          <th cdk-header-cell *cdkHeaderCellDef>Action</th>\n          <td cdk-cell *cdkCellDef>\n            <button mat-raised-button class=\"control-button\" color={{statusColor}}>{{status}}</button>\n            <button mat-raised-button class=\"control-button\" color={{statusColor}}>{{status}}</button>\n            <button mat-raised-button class=\"control-button\" color={{statusColor}}>{{status}}</button>\n          </td>\n        </ng-container>\n      </table>\n    </mat-card-content>\n  </mat-card>\n</mat-grid-list>",
                styles: [".mat-card{margin-bottom:24px}.control-card,.settings-card{max-width:600px}.card-row{display:flex;flex-direction:row;align-items:center;margin-bottom:12px}.control-button{width:120px}.label{margin-right:auto}"]
            })
        ], ProxyHelperComponent);
        return ProxyHelperComponent;
    }());

    /*
     * Copyright (c) 2018 Hak5 LLC.
     */
    var MaterialModule = /** @class */ (function () {
        function MaterialModule() {
        }
        MaterialModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [
                    // CDK
                    a11y.A11yModule,
                    bidi.BidiModule,
                    observers.ObserversModule,
                    overlay.OverlayModule,
                    platform.PlatformModule,
                    portal.PortalModule,
                    stepper.CdkStepperModule,
                    table.CdkTableModule,
                    tree.CdkTreeModule,
                    // Material
                    autocomplete.MatAutocompleteModule,
                    badge.MatBadgeModule,
                    bottomSheet.MatBottomSheetModule,
                    button.MatButtonModule,
                    buttonToggle.MatButtonToggleModule,
                    card.MatCardModule,
                    checkbox.MatCheckboxModule,
                    chips.MatChipsModule,
                    datepicker.MatDatepickerModule,
                    dialog.MatDialogModule,
                    divider.MatDividerModule,
                    expansion.MatExpansionModule,
                    formField.MatFormFieldModule,
                    gridList.MatGridListModule,
                    icon.MatIconModule,
                    input.MatInputModule,
                    list.MatListModule,
                    menu.MatMenuModule,
                    core$1.MatNativeDateModule,
                    paginator.MatPaginatorModule,
                    progressBar.MatProgressBarModule,
                    progressSpinner.MatProgressSpinnerModule,
                    radio.MatRadioModule,
                    core$1.MatRippleModule,
                    select.MatSelectModule,
                    sidenav.MatSidenavModule,
                    slider.MatSliderModule,
                    slideToggle.MatSlideToggleModule,
                    snackBar.MatSnackBarModule,
                    sort.MatSortModule,
                    stepper$1.MatStepperModule,
                    table$1.MatTableModule,
                    tabs.MatTabsModule,
                    toolbar.MatToolbarModule,
                    tooltip.MatTooltipModule,
                    tree$1.MatTreeModule,
                ],
                declarations: []
            })
        ], MaterialModule);
        return MaterialModule;
    }());

    var routes = [
        { path: '', component: ProxyHelperComponent }
    ];
    var ProxyHelperModule = /** @class */ (function () {
        function ProxyHelperModule() {
        }
        ProxyHelperModule = __decorate([
            core.NgModule({
                declarations: [ProxyHelperComponent],
                imports: [
                    common.CommonModule,
                    router.RouterModule.forChild(routes),
                    MaterialModule,
                    flexLayout.FlexLayoutModule,
                    forms.FormsModule,
                ],
                exports: [ProxyHelperComponent]
            })
        ], ProxyHelperModule);
        return ProxyHelperModule;
    }());

    exports.ProxyHelperComponent = ProxyHelperComponent;
    exports.ProxyHelperModule = ProxyHelperModule;
    exports.ProxyHelperService = ProxyHelperService;
    exports.ɵa = ApiService;
    exports.ɵb = MaterialModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ProxyHelper.umd.js.map
