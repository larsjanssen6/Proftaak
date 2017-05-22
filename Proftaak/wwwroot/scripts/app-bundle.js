var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", "aurelia-framework", "aurelia-router", "aurelia-fetch-client", "aurelia-authentication", "aurelia-authentication", "aurelia-event-aggregator", "jwt-decode"], function (require, exports, aurelia_framework_1, aurelia_router_1, aurelia_fetch_client_1, aurelia_authentication_1, aurelia_authentication_2, aurelia_event_aggregator_1, jwt_decode) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App(http, config, authService, event) {
            this.http = http;
            this.config = config;
            this.authService = authService;
            this.event = event;
            this.configHttp();
            this.authenticated = this.authService.authenticated;
            this.title = this.authService.authenticated ? "Welkom " + jwt_decode(this.authService.getAccessToken()).name : "PARTICIPATION";
        }
        App.prototype.configureRouter = function (config, router) {
            this.router = router;
            var step = new AuthorizeStep(this.authService);
            config.addAuthorizeStep(step);
            config.title = 'Aurelia';
            config.map([
                {
                    route: ['/dashboard'],
                    name: 'dashboard',
                    moduleId: 'components/dashboard/dashboard',
                    auth: true
                },
                {
                    route: ['/', 'login'],
                    name: 'login',
                    moduleId: 'components/authentication/login'
                },
            ]);
        };
        App.prototype.configHttp = function () {
            this.http.configure(function (config) {
                config
                    .withBaseUrl('api/')
                    .withDefaults({
                    method: "POST",
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch'
                    }
                })
                    .withInterceptor({
                    request: function (request) {
                        console.log("Requesting " + request.method + " " + request.url);
                        return request;
                    },
                    response: function (response) {
                        console.log("Received " + response.status + " " + response.url);
                        return response;
                    }
                });
            });
            this.config.configure(this.http);
        };
        App.prototype.attached = function () {
            var _this = this;
            this.event.subscribe('signedIn', function (response) {
                _this.authenticated = response;
                _this.title = "Welkom " + jwt_decode(_this.authService.getAccessToken()).name;
            });
        };
        App.prototype.logout = function () {
            var _this = this;
            return this.authService.logout()
                .then(function () {
                _this.authenticated = _this.authService.authenticated;
                _this.router.navigate("login");
                _this.title = "PARTICIPATION";
                swal({
                    title: "Bedankt voor uw bezoek",
                    type: "success",
                    showConfirmButton: false,
                    timer: 2000
                });
            });
        };
        return App;
    }());
    App = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient,
            aurelia_authentication_1.FetchConfig,
            aurelia_authentication_2.AuthService,
            aurelia_event_aggregator_1.EventAggregator])
    ], App);
    exports.App = App;
    var AuthorizeStep = (function () {
        function AuthorizeStep(authService) {
            this.authService = authService;
        }
        AuthorizeStep.prototype.run = function (navigationInstruction, next) {
            if (navigationInstruction.getAllInstructions().some(function (i) { return i.config.auth; })) {
                var isLoggedIn = this.authService.isAuthenticated();
                if (!isLoggedIn) {
                    return next.cancel(new aurelia_router_1.Redirect('login'));
                }
            }
            return next();
        };
        return AuthorizeStep;
    }());
    AuthorizeStep = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_2.AuthService])
    ], AuthorizeStep);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUM7b0JBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSx5QkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLENBQUM7WUFDTCxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFDTCxvQkFBQztJQUFELENBZEEsQUFjQyxJQUFBO0lBZEssYUFBYTtRQURsQiw4QkFBVTt5Q0FFMEIsb0NBQVc7T0FEMUMsYUFBYSxDQWNsQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlckNvbmZpZ3VyYXRpb24sIE5leHQsIFJlZGlyZWN0LCBOYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24gfSBmcm9tICdhdXJlbGlhLXJvdXRlcidcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ2F1cmVsaWEtZmV0Y2gtY2xpZW50JztcclxuaW1wb3J0IHsgRmV0Y2hDb25maWcgfSBmcm9tICdhdXJlbGlhLWF1dGhlbnRpY2F0aW9uJztcclxuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnYXVyZWxpYS1hdXRoZW50aWNhdGlvbic7XHJcbmltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2F1cmVsaWEtZXZlbnQtYWdncmVnYXRvcic7XHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5cclxuQGF1dG9pbmplY3RcclxuZXhwb3J0IGNsYXNzIEFwcCB7XHJcbiAgICByb3V0ZXI6IFJvdXRlcjtcclxuICAgIGF1dGhlbnRpY2F0ZWQ6IGJvb2xlYW47XG4gICAgdGl0bGU6IHN0cmluZztcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY29uZmlnOiBGZXRjaENvbmZpZyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGV2ZW50OiBFdmVudEFnZ3JlZ2F0b3IpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZ0h0dHAoKTtcbiAgICAgICAgdGhpcy5hdXRoZW50aWNhdGVkID0gdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGVkO1xuICAgICAgICB0aGlzLnRpdGxlID0gdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGVkID8gXCJXZWxrb20gXCIgKyBqd3RfZGVjb2RlKHRoaXMuYXV0aFNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKSkubmFtZSA6IFwiUEFSVElDSVBBVElPTlwiO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb25maWd1cmVSb3V0ZXIoY29uZmlnLCByb3V0ZXIpIHtcclxuICAgICAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcclxuXHJcbiAgICAgICAgbGV0IHN0ZXAgPSBuZXcgQXV0aG9yaXplU3RlcCh0aGlzLmF1dGhTZXJ2aWNlKTtcclxuICAgICAgICBjb25maWcuYWRkQXV0aG9yaXplU3RlcChzdGVwKTtcclxuXHJcbiAgICAgICAgY29uZmlnLnRpdGxlID0gJ0F1cmVsaWEnO1xyXG4gICAgICAgIGNvbmZpZy5tYXAoW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogWycvZGFzaGJvYXJkJ10sXG4gICAgICAgICAgICAgICAgbmFtZTogJ2Rhc2hib2FyZCcsXG4gICAgICAgICAgICAgICAgbW9kdWxlSWQ6ICdjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQnLFxuICAgICAgICAgICAgICAgIGF1dGg6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6IFsnLycsICdsb2dpbiddLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdsb2dpbicsXG4gICAgICAgICAgICAgICAgbW9kdWxlSWQ6ICdjb21wb25lbnRzL2F1dGhlbnRpY2F0aW9uL2xvZ2luJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbmZpZ0h0dHAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5odHRwLmNvbmZpZ3VyZShjb25maWcgPT4ge1xyXG4gICAgICAgICAgICBjb25maWdcclxuICAgICAgICAgICAgICAgIC53aXRoQmFzZVVybCgnYXBpLycpXHJcbiAgICAgICAgICAgICAgICAud2l0aERlZmF1bHRzKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnRmV0Y2gnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC53aXRoSW50ZXJjZXB0b3Ioe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QocmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVxdWVzdGluZyAke3JlcXVlc3QubWV0aG9kfSAke3JlcXVlc3QudXJsfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlKHJlc3BvbnNlOiBSZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVjZWl2ZWQgJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2UudXJsfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnLmNvbmZpZ3VyZSh0aGlzLmh0dHApO1xyXG4gICAgfVxuXG5cbiAgICBhdHRhY2hlZCgpIHtcclxuICAgICAgICB0aGlzLmV2ZW50LnN1YnNjcmliZSgnc2lnbmVkSW4nLCByZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRlZCA9IHJlc3BvbnNlO1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJXZWxrb20gXCIgKyBqd3RfZGVjb2RlKHRoaXMuYXV0aFNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKSkubmFtZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cblxuICAgIGxvZ291dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdXRoU2VydmljZS5sb2dvdXQoKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSB0aGlzLmF1dGhTZXJ2aWNlLmF1dGhlbnRpY2F0ZWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShcImxvZ2luXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiUEFSVElDSVBBVElPTlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkJlZGFua3Qgdm9vciB1dyBiZXpvZWtcIixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZXI6IDIwMDBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuQGF1dG9pbmplY3RcclxuY2xhc3MgQXV0aG9yaXplU3RlcCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkgeyB9XHJcblxyXG4gICAgcnVuKG5hdmlnYXRpb25JbnN0cnVjdGlvbjogTmF2aWdhdGlvbkluc3RydWN0aW9uLCBuZXh0OiBOZXh0KTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBpZiAobmF2aWdhdGlvbkluc3RydWN0aW9uLmdldEFsbEluc3RydWN0aW9ucygpLnNvbWUoaSA9PiBpLmNvbmZpZy5hdXRoKSkge1xyXG4gICAgICAgICAgICBsZXQgaXNMb2dnZWRJbiA9IHRoaXMuYXV0aFNlcnZpY2UuaXNBdXRoZW50aWNhdGVkKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlzTG9nZ2VkSW4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0LmNhbmNlbChuZXcgUmVkaXJlY3QoJ2xvZ2luJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV4dCgpO1xyXG4gICAgfVxyXG59XG5cclxuXHJcbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=

define('authConfig',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var config = {
        providers: {
            google: {
                name: 'google',
                clientId: '833710645751-q02snmqimmijs2jdk9orckpmfdvi53dt.apps.googleusercontent.com'
            }
        }
    };
    exports.default = config;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUEsSUFBSSxNQUFNLEdBQUc7UUFDVCxTQUFTLEVBQUU7WUFDUCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLDBFQUEwRTthQUN2RjtTQUNKO0tBQ0osQ0FBQTtJQUVELGtCQUFlLE1BQU0sQ0FBQyIsImZpbGUiOiJhdXRoQ29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbmZpZyA9IHtcclxuICAgIHByb3ZpZGVyczoge1xyXG4gICAgICAgIGdvb2dsZToge1xyXG4gICAgICAgICAgICBuYW1lOiAnZ29vZ2xlJyxcclxuICAgICAgICAgICAgY2xpZW50SWQ6ICc4MzM3MTA2NDU3NTEtcTAyc25tcWltbWlqczJqZGs5b3Jja3BtZmR2aTUzZHQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20nXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7Il0sInNvdXJjZVJvb3QiOiJzcmMifQ==

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudmlyb25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLGtCQUFlO1FBQ2IsS0FBSyxFQUFFLElBQUk7UUFDWCxPQUFPLEVBQUUsSUFBSTtLQUNkLENBQUMiLCJmaWxlIjoiZW52aXJvbm1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIGRlYnVnOiB0cnVlLFxuICB0ZXN0aW5nOiB0cnVlXG59O1xuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

define('main',["require", "exports", "./environment", "./authConfig"], function (require, exports, environment_1, authConfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources')
            .plugin('aurelia-authentication', function (baseConfig) {
            baseConfig.configure(authConfig_1.default);
        });
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUEsbUJBQTBCLE9BQWdCO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHO2FBQ04scUJBQXFCLEVBQUU7YUFDdkIsT0FBTyxDQUFDLFdBQVcsQ0FBQzthQUNwQixNQUFNLENBQUMsd0JBQXdCLEVBQ2hDLFVBQUMsVUFBVTtZQUNQLFVBQVUsQ0FBQyxTQUFTLENBQUMsb0JBQU0sQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBRVAsRUFBRSxDQUFDLENBQUMscUJBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMscUJBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUVELE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFsQkQsOEJBa0JDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdXJlbGlhIH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnXHJcbmltcG9ydCBlbnZpcm9ubWVudCBmcm9tICcuL2Vudmlyb25tZW50JztcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2F1dGhDb25maWcnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGF1cmVsaWE6IEF1cmVsaWEpIHtcclxuICAgIGF1cmVsaWEudXNlXHJcbiAgICAgICAgLnN0YW5kYXJkQ29uZmlndXJhdGlvbigpXHJcbiAgICAgICAgLmZlYXR1cmUoJ3Jlc291cmNlcycpXHJcbiAgICAgICAgLnBsdWdpbignYXVyZWxpYS1hdXRoZW50aWNhdGlvbicsXHJcbiAgICAgICAgKGJhc2VDb25maWcpID0+IHtcclxuICAgICAgICAgICAgYmFzZUNvbmZpZy5jb25maWd1cmUoY29uZmlnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBpZiAoZW52aXJvbm1lbnQuZGVidWcpIHtcclxuICAgICAgICBhdXJlbGlhLnVzZS5kZXZlbG9wbWVudExvZ2dpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZW52aXJvbm1lbnQudGVzdGluZykge1xyXG4gICAgICAgIGF1cmVsaWEudXNlLnBsdWdpbignYXVyZWxpYS10ZXN0aW5nJyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXVyZWxpYS5zdGFydCgpLnRoZW4oKCkgPT4gYXVyZWxpYS5zZXRSb290KCkpO1xyXG59Il0sInNvdXJjZVJvb3QiOiJzcmMifQ==

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQSxtQkFBMEIsTUFBOEI7SUFFeEQsQ0FBQztJQUZELDhCQUVDIiwiZmlsZSI6InJlc291cmNlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RnJhbWV3b3JrQ29uZmlndXJhdGlvbn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGNvbmZpZzogRnJhbWV3b3JrQ29uZmlndXJhdGlvbikge1xuICAvL2NvbmZpZy5nbG9iYWxSZXNvdXJjZXMoW10pO1xufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
};
define('components/authentication/login',["require", "exports", "sweetalert", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication", "aurelia-router", "aurelia-event-aggregator"], function (require, exports, swal, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1, aurelia_router_1, aurelia_event_aggregator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FetchClientDemo = (function () {
        function FetchClientDemo(auth, http, router, event) {
            this.auth = auth;
            this.http = http;
            this.router = router;
            this.event = event;
            this.email = "";
            this.password = "";
        }
        FetchClientDemo.prototype.login = function () {
            var _this = this;
            this.auth.login({
                email: this.email,
                password: this.password
            }).then(function (response) {
                _this.event.publish('signedIn', true);
                swal({
                    title: "U bent succesvol ingelogd",
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2000
                });
                _this.router.navigate("dashboard");
            })
                .catch(function (err) {
                swal({
                    title: "Inloggegevens zijn onjuist",
                    type: "warning",
                    showCancelButton: true,
                    showConfirmButton: false,
                    closeOnConfirm: true
                });
            });
        };
        FetchClientDemo.prototype.logout = function () {
            this.auth.logout('');
        };
        FetchClientDemo.prototype.test = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2];
                });
            });
        };
        return FetchClientDemo;
    }());
    FetchClientDemo = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_1.AuthService,
            aurelia_fetch_client_1.HttpClient,
            aurelia_router_1.Router,
            aurelia_event_aggregator_1.EventAggregator])
    ], FetchClientDemo);
    exports.FetchClientDemo = FetchClientDemo;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXV0aGVudGljYXRpb24vbG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRQSxJQUFhLGVBQWU7UUFLeEIseUJBQW9CLElBQWlCLEVBQ2pCLElBQWdCLEVBQ2hCLE1BQWMsRUFDZCxLQUFzQjtZQUh0QixTQUFJLEdBQUosSUFBSSxDQUFhO1lBQ2pCLFNBQUksR0FBSixJQUFJLENBQVk7WUFDaEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtZQUNkLFVBQUssR0FBTCxLQUFLLENBQWlCO1lBTjFDLFVBQUssR0FBRyxFQUFFLENBQUM7WUFDWCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBTWQsQ0FBQztRQUVELCtCQUFLLEdBQUw7WUFBQSxpQkEwQkM7WUF6QkcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ1osS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVE7Z0JBQ1osS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUVyQyxJQUFJLENBQUM7b0JBQ0QsS0FBSyxFQUFFLDJCQUEyQjtvQkFDbEMsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsZ0JBQWdCLEVBQUUsS0FBSztvQkFDdkIsaUJBQWlCLEVBQUUsS0FBSztvQkFDeEIsS0FBSyxFQUFFLElBQUk7aUJBQ2QsQ0FBQyxDQUFDO2dCQUVILEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQztpQkFDRyxLQUFLLENBQUMsVUFBQSxHQUFHO2dCQUNOLElBQUksQ0FBQztvQkFDRCxLQUFLLEVBQUUsNEJBQTRCO29CQUNuQyxJQUFJLEVBQUUsU0FBUztvQkFDZixnQkFBZ0IsRUFBRSxJQUFJO29CQUN0QixpQkFBaUIsRUFBRSxLQUFLO29CQUN4QixjQUFjLEVBQUUsSUFBSTtpQkFDdkIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBRUQsZ0NBQU0sR0FBTjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLENBQUM7UUFFSyw4QkFBSSxHQUFWOzs7Ozs7U0FFQztRQUNMLHNCQUFDO0lBQUQsQ0E5Q0EsQUE4Q0MsSUFBQTtJQTlDWSxlQUFlO1FBRDNCLDhCQUFVO3lDQU1tQixvQ0FBVztZQUNYLGlDQUFVO1lBQ1IsdUJBQU07WUFDUCwwQ0FBZTtPQVJqQyxlQUFlLENBOEMzQjtJQTlDWSwwQ0FBZSIsImZpbGUiOiJjb21wb25lbnRzL2F1dGhlbnRpY2F0aW9uL2xvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc3dhbCBmcm9tICdzd2VldGFsZXJ0JztcclxuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiXHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIGpzb24gfSBmcm9tIFwiYXVyZWxpYS1mZXRjaC1jbGllbnRcIlxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCJhdXJlbGlhLWF1dGhlbnRpY2F0aW9uXCJcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInXHJcbmltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2F1cmVsaWEtZXZlbnQtYWdncmVnYXRvcic7XHJcblxyXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3MgRmV0Y2hDbGllbnREZW1vIHtcclxuXHJcbiAgICBlbWFpbCA9IFwiXCI7XHJcbiAgICBwYXNzd29yZCA9IFwiXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGV2ZW50OiBFdmVudEFnZ3JlZ2F0b3IsKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbG9naW4oKSB7XHJcbiAgICAgICAgdGhpcy5hdXRoLmxvZ2luKHtcclxuICAgICAgICAgICAgZW1haWw6IHRoaXMuZW1haWwsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkXHJcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50LnB1Ymxpc2goJ3NpZ25lZEluJywgdHJ1ZSk7XG5cclxuICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJVIGJlbnQgc3VjY2Vzdm9sIGluZ2Vsb2dkXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRpbWVyOiAyMDAwXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoXCJkYXNoYm9hcmRcIik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJbmxvZ2dlZ2V2ZW5zIHppam4gb25qdWlzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlT25Db25maXJtOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0KCkge1xyXG4gICAgICAgIHRoaXMuYXV0aC5sb2dvdXQoJycpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHRlc3QoKSB7XHJcblxyXG4gICAgfVxyXG59ICJdLCJzb3VyY2VSb290Ijoic3JjIn0=

define('components/dashboard/dashboard',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dashboard = (function () {
        function dashboard() {
        }
        return dashboard;
    }());
    exports.dashboard = dashboard;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQUFBO1FBRUEsQ0FBQztRQUFELGdCQUFDO0lBQUQsQ0FGQSxBQUVDLElBQUE7SUFGWSw4QkFBUyIsImZpbGUiOiJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgZGFzaGJvYXJkIHtcclxuXHJcbn0iXSwic291cmNlUm9vdCI6InNyYyJ9

define('text!app.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\r\n  <require from=\"sweetalert/dist/sweetalert.css\"></require>\r\n  <div>\r\n    <nav class=\"navbar navbar-default navbar-static-top\">\r\n      <div class=\"container\">\r\n        <div class=\"navbar-header\">\r\n\r\n          <!-- Collapsed Hamburger -->\r\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#app-navbar-collapse\">\r\n            <span class=\"sr-only\">Toggle Navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n          </button>\r\n\r\n          <a class=\"navbar-brand hidden-xs\" href=\"/\">\r\n            ${title}\r\n          </a>\r\n        </div>\r\n\r\n        <div class=\"collapse navbar-collapse\" id=\"app-navbar-collapse\">\r\n          <!-- Right Side Of Navbar -->\r\n          <ul class=\"nav navbar-nav navbar-right\">\r\n            <li>\r\n              <a route-href=\"route: dashboard\" show.bind=\"authenticated\">\r\n                Home \r\n              </a>\n            <li/>\n\n            <li>\n              <a href=\"#\" show.bind=\"authenticated\">\r\n                Hulpvraag\r\n              </a>\n            </li>\n\n            <li>\n              <a route-href=\"route: dashboard\" show.bind=\"authenticated\">\r\n                Agenda\r\n              </a>\n            </li>\n\n            <li>\n              <a route-href=\"route: dashboard\" show.bind=\"authenticated\">\r\n                Personen\r\n              </a>\n            </li>\n\n            <li>\n              <a route-href=\"route: dashboard\" show.bind=\"authenticated\">\r\n                Account\r\n              </a>\n            </li>\n\n            <li>\r\n              <a href=\"#\" click.delegate=\"logout()\" show.bind=\"authenticated\">\r\n                Uitloggen\r\n              </a>\r\n            </li>\n\r\n            <li>\r\n              <a href=\"#\" if.bind=\"!authenticated\">\r\n                Registreer \r\n              </a>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </nav>\r\n\r\n    <router-view></router-view>\r\n\r\n  </div>\r\n</template>\r\n"; });
define('text!components/authentication/login.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"header center\">\r\n    <h1>Login</h1>\r\n  </div>\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-8 col-md-offset-2\">\r\n        <div class=\"panel panel-default\">\r\n          <div class=\"panel-heading\">\r\n            Participation\r\n          </div>\r\n\r\n          <div class=\"panel-body\">\r\n            <form class=\"form-horizontal\" role=\"form\" method=\"POST\" submit.delegate=\"login()\">\r\n\r\n              <div class=\"form-group\">\r\n                <label for=\"email\" class=\"col-md-4 control-label\">E-Mail</label>\r\n\r\n                <div class=\"col-md-6\">\r\n                  <input id=\"email\" type=\"email\" class=\"form-control\" name=\"email\" value.bind=\"email\" required autofocus>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"form-group\">\r\n                <label for=\"password\" class=\"col-md-4 control-label\">Wachtwoord</label>\r\n\r\n                <div class=\"col-md-6\">\r\n                  <input id=\"password\" type=\"password\" class=\"form-control\" name=\"password\" value.bind=\"password\" required>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"form-group\">\r\n                <div class=\"col-md-6 col-md-offset-4\">\r\n                  <div class=\"checkbox\">\r\n                    <label>\r\n                      <input type=\"checkbox\" name=\"remember\">Onthoud mij ${auth.isAuthenticated()}\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"form-group\">\r\n                <div class=\"col-md-8 col-md-offset-4\">\r\n                  <button type=\"submit\" class=\"btn btn-primary\">\r\n                    Login\r\n                  </button>\r\n                </div>\r\n              </div>\r\n            </form>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/dashboard/dashboard.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"header center\">\r\n      <h1>Dashboard</h1>\r\n  </div>\r\n\r\n  <div class=\"container container__margin__top\">\r\n      <div class=\"row\">\r\n          <div class=\"col-md-6 center block\">\r\n              <h1>Hulpvraag</h1>\r\n          </div>\r\n\r\n          <div class=\"col-md-6 center block\">\r\n              <h1>Chat</h1>\r\n          </div>\r\n      </div>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6 center block\">\r\n            <h1>Account</h1>\r\n        </div>\r\n\r\n        <div class=\"col-md-6 center block\">\r\n            <h1>Agenda</h1>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12 center block\">\r\n            <h1>Personen</h1>\r\n        </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map