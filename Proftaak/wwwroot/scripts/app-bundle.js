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
                    route: ['bewerk/hulpvraag/:id'],
                    name: 'editHelpQuestion',
                    moduleId: 'components/helpQuestion/editHelpQuestion',
                    auth: true
                },
                {
                    route: ['nieuw/hulpvraag'],
                    name: 'newHelpQuestion',
                    moduleId: 'components/helpQuestion/newHelpQuestion',
                    auth: true
                },
                {
                    route: ['hulpvragen'],
                    name: 'helpQuestions',
                    moduleId: 'components/helpQuestion/helpQuestions',
                    auth: true
                },
                {
                    route: ['dashboard'],
                    name: 'dashboard',
                    moduleId: 'components/dashboard/dashboard',
                    auth: true
                },
                {
                    route: ['chat'],
                    name: 'chat',
                    moduleId: 'components/chat/chat',
                    auth: true
                },
                {
                    route: ['chatlog'],
                    name: 'chatlog',
                    moduleId: 'components/chat/chatlog',
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFpQixFQUFFLEtBQUs7b0JBQ3hCLEtBQUssRUFBRSxJQUFJO2lCQUNkLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUNMLFVBQUM7SUFBRCxDQXJIQSxBQXFIQyxJQUFBO0lBckhZLEdBQUc7UUFEZiw4QkFBVTt5Q0FNbUIsaUNBQVU7WUFDUixvQ0FBVztZQUNOLG9DQUFXO1lBQ2pCLDBDQUFlO09BUmpDLEdBQUcsQ0FxSGY7SUFySFksa0JBQUc7SUF3SGhCLElBQU0sYUFBYTtRQUNmLHVCQUFvQixXQUF3QjtZQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFJLENBQUM7UUFFakQsMkJBQUcsR0FBSCxVQUFJLHFCQUE0QyxFQUFFLElBQVU7WUFDeEQsRUFBRSxDQUFDLENBQUMscUJBQXFCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBYixDQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RFLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBRXBELEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLHlCQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsQ0FBQztZQUNMLENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FkQSxBQWNDLElBQUE7SUFkSyxhQUFhO1FBRGxCLDhCQUFVO3lDQUUwQixvQ0FBVztPQUQxQyxhQUFhLENBY2xCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7IFJvdXRlciwgUm91dGVyQ29uZmlndXJhdGlvbiwgTmV4dCwgUmVkaXJlY3QsIE5hdmlnYXRpb25JbnN0cnVjdGlvbiB9IGZyb20gJ2F1cmVsaWEtcm91dGVyJ1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnYXVyZWxpYS1mZXRjaC1jbGllbnQnO1xyXG5pbXBvcnQgeyBGZXRjaENvbmZpZyB9IGZyb20gJ2F1cmVsaWEtYXV0aGVudGljYXRpb24nO1xyXG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICdhdXJlbGlhLWF1dGhlbnRpY2F0aW9uJztcclxuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcclxuaW1wb3J0ICogYXMgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcblxyXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3MgQXBwIHtcclxuICAgIHJvdXRlcjogUm91dGVyO1xyXG4gICAgYXV0aGVudGljYXRlZDogYm9vbGVhbjtcbiAgICB0aXRsZTogc3RyaW5nO1xuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjb25maWc6IEZldGNoQ29uZmlnLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZXZlbnQ6IEV2ZW50QWdncmVnYXRvcikge1xyXG4gICAgICAgIHRoaXMuY29uZmlnSHR0cCgpO1xuICAgICAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSB0aGlzLmF1dGhTZXJ2aWNlLmF1dGhlbnRpY2F0ZWQ7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aGlzLmF1dGhTZXJ2aWNlLmF1dGhlbnRpY2F0ZWQgPyBcIldlbGtvbSBcIiArIGp3dF9kZWNvZGUodGhpcy5hdXRoU2VydmljZS5nZXRBY2Nlc3NUb2tlbigpKS5uYW1lIDogXCJQQVJUSUNJUEFUSU9OXCI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbmZpZ3VyZVJvdXRlcihjb25maWcsIHJvdXRlcikge1xyXG4gICAgICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xyXG5cclxuICAgICAgICBsZXQgc3RlcCA9IG5ldyBBdXRob3JpemVTdGVwKHRoaXMuYXV0aFNlcnZpY2UpO1xyXG4gICAgICAgIGNvbmZpZy5hZGRBdXRob3JpemVTdGVwKHN0ZXApO1xyXG5cclxuICAgICAgICBjb25maWcudGl0bGUgPSAnQXVyZWxpYSc7XHJcbiAgICAgICAgY29uZmlnLm1hcChbXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogWydiZXdlcmsvaHVscHZyYWFnLzppZCddLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdlZGl0SGVscFF1ZXN0aW9uJyxcbiAgICAgICAgICAgICAgICBtb2R1bGVJZDogJ2NvbXBvbmVudHMvaGVscFF1ZXN0aW9uL2VkaXRIZWxwUXVlc3Rpb24nLFxuICAgICAgICAgICAgICAgIGF1dGg6IHRydWVcclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlOiBbJ25pZXV3L2h1bHB2cmFhZyddLFxuICAgICAgICAgICAgICAgIG5hbWU6ICduZXdIZWxwUXVlc3Rpb24nLFxuICAgICAgICAgICAgICAgIG1vZHVsZUlkOiAnY29tcG9uZW50cy9oZWxwUXVlc3Rpb24vbmV3SGVscFF1ZXN0aW9uJyxcbiAgICAgICAgICAgICAgICBhdXRoOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogWydodWxwdnJhZ2VuJ10sXG4gICAgICAgICAgICAgICAgbmFtZTogJ2hlbHBRdWVzdGlvbnMnLFxuICAgICAgICAgICAgICAgIG1vZHVsZUlkOiAnY29tcG9uZW50cy9oZWxwUXVlc3Rpb24vaGVscFF1ZXN0aW9ucycsXG4gICAgICAgICAgICAgICAgYXV0aDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogWydkYXNoYm9hcmQnXSxcbiAgICAgICAgICAgICAgICBuYW1lOiAnZGFzaGJvYXJkJyxcbiAgICAgICAgICAgICAgICBtb2R1bGVJZDogJ2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZCcsXG4gICAgICAgICAgICAgICAgYXV0aDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJvdXRlOiBbJ2NoYXQnXSxcbiAgICAgICAgICAgICAgICBuYW1lOiAnY2hhdCcsXG4gICAgICAgICAgICAgICAgbW9kdWxlSWQ6ICdjb21wb25lbnRzL2NoYXQvY2hhdCcsXG4gICAgICAgICAgICAgICAgYXV0aDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcm91dGU6IFsnY2hhdGxvZyddLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdjaGF0bG9nJyxcbiAgICAgICAgICAgICAgICBtb2R1bGVJZDogJ2NvbXBvbmVudHMvY2hhdC9jaGF0bG9nJyxcbiAgICAgICAgICAgICAgICBhdXRoOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlOiBbJy8nLCAnbG9naW4nXSxcbiAgICAgICAgICAgICAgICBuYW1lOiAnbG9naW4nLFxuICAgICAgICAgICAgICAgIG1vZHVsZUlkOiAnY29tcG9uZW50cy9hdXRoZW50aWNhdGlvbi9sb2dpbidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25maWdIdHRwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaHR0cC5jb25maWd1cmUoY29uZmlnID0+IHtcclxuICAgICAgICAgICAgY29uZmlnXHJcbiAgICAgICAgICAgICAgICAud2l0aEJhc2VVcmwoJ2FwaS8nKVxyXG4gICAgICAgICAgICAgICAgLndpdGhEZWZhdWx0cyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ0ZldGNoJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAud2l0aEludGVyY2VwdG9yKHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFJlcXVlc3RpbmcgJHtyZXF1ZXN0Lm1ldGhvZH0gJHtyZXF1ZXN0LnVybH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZShyZXNwb25zZTogUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFJlY2VpdmVkICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnVybH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZy5jb25maWd1cmUodGhpcy5odHRwKTtcclxuICAgIH1cblxuXG4gICAgYXR0YWNoZWQoKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudC5zdWJzY3JpYmUoJ3NpZ25lZEluJywgcmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSByZXNwb25zZTtcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiV2Vsa29tIFwiICsgand0X2RlY29kZSh0aGlzLmF1dGhTZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKCkpLm5hbWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XG5cbiAgICBsb2dvdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aFNlcnZpY2UubG9nb3V0KClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoZW50aWNhdGVkID0gdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGVkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoXCJsb2dpblwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcIlBBUlRJQ0lQQVRJT05cIjtcclxuXHJcbiAgICAgICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJCZWRhbmt0IHZvb3IgdXcgYmV6b2VrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVyOiAyMDAwXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBhdXRvaW5qZWN0XHJcbmNsYXNzIEF1dGhvcml6ZVN0ZXAge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIHJ1bihuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb246IE5hdmlnYXRpb25JbnN0cnVjdGlvbiwgbmV4dDogTmV4dCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgaWYgKG5hdmlnYXRpb25JbnN0cnVjdGlvbi5nZXRBbGxJbnN0cnVjdGlvbnMoKS5zb21lKGkgPT4gaS5jb25maWcuYXV0aCkpIHtcclxuICAgICAgICAgICAgbGV0IGlzTG9nZ2VkSW4gPSB0aGlzLmF1dGhTZXJ2aWNlLmlzQXV0aGVudGljYXRlZCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpc0xvZ2dlZEluKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dC5jYW5jZWwobmV3IFJlZGlyZWN0KCdsb2dpbicpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5leHQoKTtcclxuICAgIH1cclxufVxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6InNyYyJ9

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
define('components/authentication/login',["require", "exports", "sweetalert", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication", "aurelia-event-aggregator", "aurelia-router"], function (require, exports, swal, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1, aurelia_event_aggregator_1, aurelia_router_1) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXV0aGVudGljYXRpb24vbG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRQSxJQUFhLGVBQWU7UUFLeEIseUJBQW9CLElBQWlCLEVBQ2pCLElBQWdCLEVBQ2hCLE1BQWMsRUFDZCxLQUFzQjtZQUh0QixTQUFJLEdBQUosSUFBSSxDQUFhO1lBQ2pCLFNBQUksR0FBSixJQUFJLENBQVk7WUFDaEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtZQUNkLFVBQUssR0FBTCxLQUFLLENBQWlCO1lBTjFDLFVBQUssR0FBRyxFQUFFLENBQUM7WUFDWCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBTWQsQ0FBQztRQUVELCtCQUFLLEdBQUw7WUFBQSxpQkEwQkM7WUF6QkcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ1osS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVE7Z0JBQ1osS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUVyQyxJQUFJLENBQUM7b0JBQ0QsS0FBSyxFQUFFLDJCQUEyQjtvQkFDbEMsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsZ0JBQWdCLEVBQUUsS0FBSztvQkFDdkIsaUJBQWlCLEVBQUUsS0FBSztvQkFDeEIsS0FBSyxFQUFFLElBQUk7aUJBQ2QsQ0FBQyxDQUFDO2dCQUVILEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQztpQkFDRyxLQUFLLENBQUMsVUFBQSxHQUFHO2dCQUNOLElBQUksQ0FBQztvQkFDRCxLQUFLLEVBQUUsNEJBQTRCO29CQUNuQyxJQUFJLEVBQUUsU0FBUztvQkFDZixnQkFBZ0IsRUFBRSxJQUFJO29CQUN0QixpQkFBaUIsRUFBRSxLQUFLO29CQUN4QixjQUFjLEVBQUUsSUFBSTtpQkFDdkIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBRUQsZ0NBQU0sR0FBTjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLENBQUM7UUFFSyw4QkFBSSxHQUFWOzs7Ozs7U0FFQztRQUNMLHNCQUFDO0lBQUQsQ0E5Q0EsQUE4Q0MsSUFBQTtJQTlDWSxlQUFlO1FBRDNCLDhCQUFVO3lDQU1tQixvQ0FBVztZQUNYLGlDQUFVO1lBQ1IsdUJBQU07WUFDUCwwQ0FBZTtPQVJqQyxlQUFlLENBOEMzQjtJQTlDWSwwQ0FBZSIsImZpbGUiOiJjb21wb25lbnRzL2F1dGhlbnRpY2F0aW9uL2xvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc3dhbCBmcm9tICdzd2VldGFsZXJ0JztcclxuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiXHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIGpzb24gfSBmcm9tIFwiYXVyZWxpYS1mZXRjaC1jbGllbnRcIlxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCJhdXJlbGlhLWF1dGhlbnRpY2F0aW9uXCJcclxuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInXHJcblxyXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3MgRmV0Y2hDbGllbnREZW1vIHtcclxuXHJcbiAgICBlbWFpbCA9IFwiXCI7XHJcbiAgICBwYXNzd29yZCA9IFwiXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGV2ZW50OiBFdmVudEFnZ3JlZ2F0b3IpIHtcclxuICAgIH1cclxuXHJcbiAgICBsb2dpbigpIHtcclxuICAgICAgICB0aGlzLmF1dGgubG9naW4oe1xyXG4gICAgICAgICAgICBlbWFpbDogdGhpcy5lbWFpbCxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmRcclxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnQucHVibGlzaCgnc2lnbmVkSW4nLCB0cnVlKTtcblxyXG4gICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlUgYmVudCBzdWNjZXN2b2wgaW5nZWxvZ2RcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGltZXI6IDIwMDBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShcImRhc2hib2FyZFwiKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIklubG9nZ2VnZXZlbnMgemlqbiBvbmp1aXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VPbkNvbmZpcm06IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsb2dvdXQoKSB7XHJcbiAgICAgICAgdGhpcy5hdXRoLmxvZ291dCgnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgdGVzdCgpIHtcclxuXHJcbiAgICB9XHJcbn0gIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

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

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/chat/chat',["require", "exports", "sweetalert", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication", "jwt-decode", "aurelia-event-aggregator", "aurelia-router", "moment", "moment/locale/nl"], function (require, exports, swal, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1, jwt_decode, aurelia_event_aggregator_1, aurelia_router_1, moment) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Chat = (function () {
        function Chat(http, auth, event, router) {
            this.http = http;
            this.auth = auth;
            this.event = event;
            this.router = router;
            this.chats = [];
            this.getChats();
            moment.locale('nl');
        }
        Chat.prototype.getMoment = function (time) {
            return moment(time).fromNow();
        };
        Chat.prototype.getChats = function () {
            var _this = this;
            this.http.fetch('chat/chatList', {
                body: aurelia_fetch_client_1.json(jwt_decode(this.auth.getAccessToken()).userid)
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                _this.chats = data;
            });
        };
        Chat.prototype.select = function (chat) {
            var _this = this;
            clearInterval(this.timer);
            this.chat = chat;
            this.sendMessage("heeft toegetreden tot de chat");
            this.timer = setInterval(function () { return _this.getMessages(); }, 1000);
        };
        Chat.prototype.getMessages = function () {
            var _this = this;
            this.http.fetch('chat/messages', {
                body: aurelia_fetch_client_1.json(this.chat.id)
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                if (data != _this.messages) {
                    _this.messages = data;
                }
            });
        };
        Chat.prototype.sendMessage = function (messagebox) {
            if (this.chat == null) {
                swal({
                    title: 'Error',
                    text: 'Selecteer eerst een chat of maak een chat aan.',
                    type: 'warning',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
            else {
                this.send = new message(this.chat.id, jwt_decode(this.auth.getAccessToken()).userid, messagebox);
                this.http.fetch('chat/sendMessage', {
                    body: aurelia_fetch_client_1.json(this.send)
                });
            }
        };
        Chat.prototype.disableChat = function (chat) {
            var _this = this;
            swal({
                title: 'Weet u het zeker?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ja verwijder deze chat',
                cancelButtonText: 'Stop'
            }, function (isOk) {
                if (chat == _this.chat) {
                    _this.chat = null;
                    _this.messages = null;
                    clearInterval(_this.timer);
                }
                if (isOk) {
                    _this.http.fetch('chat/disableChat', {
                        body: aurelia_fetch_client_1.json(chat.id)
                    });
                    _this.getChats();
                    swal({
                        title: 'Verwijderd',
                        text: 'chat is succesvol verwijderd',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            });
        };
        Chat.prototype.openLog = function () {
            this.role = jwt_decode(this.auth.getAccessToken()).role;
            console.log(this.role);
            if (this.role == 'Hulpverlener' || this.role == 'Beheerder') {
                clearInterval(this.timer);
                this.router.navigate("chatlog");
            }
            else {
                swal({
                    title: 'Error',
                    text: 'U bent niet bevoegd om dit te doen.',
                    type: 'warning',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        };
        return Chat;
    }());
    Chat = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient, aurelia_authentication_1.AuthService, aurelia_event_aggregator_1.EventAggregator, aurelia_router_1.Router])
    ], Chat);
    exports.Chat = Chat;
    var message = (function () {
        function message(chatid, userid, message) {
            this.chatid = chatid;
            this.userid = userid;
            this.message = message;
        }
        return message;
    }());
    exports.message = message;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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OiJjb21wb25lbnRzL2NoYXQvY2hhdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcbmltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2F1cmVsaWEtZXZlbnQtYWdncmVnYXRvcic7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2F1cmVsaWEtcm91dGVyJ1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgJ21vbWVudC9sb2NhbGUvbmwnO1xuXHJcbkBhdXRvaW5qZWN0XHJcbmV4cG9ydCBjbGFzcyBDaGF0IHtcclxuICAgIGNoYXRzID0gW107XHJcbiAgICBjaGF0O1xyXG4gICAgdXNlcjtcclxuICAgIG1lc3NhZ2VzO1xyXG4gICAgc2VuZDtcclxuICAgIG1lc3NhZ2Vib3g7XHJcbiAgICByb2xlO1xyXG4gICAgdGltZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIGV2ZW50OiBFdmVudEFnZ3JlZ2F0b3IsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcclxuICAgICAgICB0aGlzLmdldENoYXRzKCk7XG4gICAgICAgIG1vbWVudC5sb2NhbGUoJ25sJyk7XHJcbiAgICB9XG5cbiAgICBnZXRNb21lbnQodGltZSkge1xuICAgICAgICByZXR1cm4gbW9tZW50KHRpbWUpLmZyb21Ob3coKTtcclxuICAgIH0gXG5cclxuICAgIGdldENoYXRzKCkge1xyXG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnY2hhdC9jaGF0TGlzdCcsIHtcclxuICAgICAgICAgICAgYm9keToganNvbihqd3RfZGVjb2RlKHRoaXMuYXV0aC5nZXRBY2Nlc3NUb2tlbigpKS51c2VyaWQpXHJcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGF0cyA9IGRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2VsZWN0KGNoYXQpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpO1xyXG4gICAgICAgIHRoaXMuY2hhdCA9IGNoYXQ7XHJcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShcImhlZWZ0IHRvZWdldHJlZGVuIHRvdCBkZSBjaGF0XCIpO1xyXG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLmdldE1lc3NhZ2VzKCksIDEwMDApXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWVzc2FnZXMoKSB7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdjaGF0L21lc3NhZ2VzJywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMuY2hhdC5pZClcclxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSB0aGlzLm1lc3NhZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlcyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2VuZE1lc3NhZ2UobWVzc2FnZWJveCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNoYXQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ1NlbGVjdGVlciBlZXJzdCBlZW4gY2hhdCBvZiBtYWFrIGVlbiBjaGF0IGFhbi4nLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdGltZXI6IDIwMDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNlbmQgPSBuZXcgbWVzc2FnZSh0aGlzLmNoYXQuaWQsIGp3dF9kZWNvZGUodGhpcy5hdXRoLmdldEFjY2Vzc1Rva2VuKCkpLnVzZXJpZCwgbWVzc2FnZWJveCk7XHJcbiAgICAgICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnY2hhdC9zZW5kTWVzc2FnZScsIHtcclxuICAgICAgICAgICAgICAgIGJvZHk6IGpzb24odGhpcy5zZW5kKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGVDaGF0KGNoYXQpIHtcclxuICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgdGl0bGU6ICdXZWV0IHUgaGV0IHpla2VyPycsXHJcbiAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdKYSB2ZXJ3aWpkZXIgZGV6ZSBjaGF0JyxcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ1N0b3AnXHJcbiAgICAgICAgfSwgKGlzT2spID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoYXQgPT0gdGhpcy5jaGF0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlcyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc09rKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ2NoYXQvZGlzYWJsZUNoYXQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keToganNvbihjaGF0LmlkKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldENoYXRzKCk7XHJcbiAgICAgICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ1ZlcndpamRlcmQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdjaGF0IGlzIHN1Y2Nlc3ZvbCB2ZXJ3aWpkZXJkJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVyOiAyMDAwXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgb3BlbkxvZygpIHtcclxuICAgICAgICB0aGlzLnJvbGUgPSBqd3RfZGVjb2RlKHRoaXMuYXV0aC5nZXRBY2Nlc3NUb2tlbigpKS5yb2xlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucm9sZSk7XHJcbiAgICAgICAgaWYgKHRoaXMucm9sZSA9PSAnSHVscHZlcmxlbmVyJyB8fCB0aGlzLnJvbGUgPT0gJ0JlaGVlcmRlcicpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoXCJjaGF0bG9nXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICdVIGJlbnQgbmlldCBiZXZvZWdkIG9tIGRpdCB0ZSBkb2VuLicsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB0aW1lcjogMjAwMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCBjbGFzcyBtZXNzYWdlIHtcclxuICAgIGNoYXRpZDtcclxuICAgIHVzZXJpZDtcclxuICAgIG1lc3NhZ2U7XHJcbiAgICBjb25zdHJ1Y3RvcihjaGF0aWQsIHVzZXJpZCwgbWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMuY2hhdGlkID0gY2hhdGlkO1xyXG4gICAgICAgIHRoaXMudXNlcmlkID0gdXNlcmlkO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/chat/chatlog',["require", "exports", "sweetalert", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication", "jwt-decode", "aurelia-event-aggregator", "aurelia-router"], function (require, exports, swal, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1, jwt_decode, aurelia_event_aggregator_1, aurelia_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Chatlog = (function () {
        function Chatlog(http, auth, event, router) {
            this.http = http;
            this.auth = auth;
            this.event = event;
            this.router = router;
            this.chats = [];
            this.getChats();
        }
        Chatlog.prototype.getChats = function () {
            var _this = this;
            this.http.fetch('chat/chatListAll').then(function (response) { return response.json(); })
                .then(function (data) {
                _this.chats = data;
            });
        };
        Chatlog.prototype.select = function (chat) {
            var _this = this;
            clearInterval(this.timer);
            this.chat = chat;
            this.timer = setInterval(function () { return _this.getMessages(); }, 1000);
        };
        Chatlog.prototype.getMessages = function () {
            var _this = this;
            this.http.fetch('chat/messages', {
                body: aurelia_fetch_client_1.json(this.chat.id)
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                if (data != _this.messages) {
                    _this.messages = data;
                }
            });
        };
        Chatlog.prototype.sendMessage = function (messagebox) {
            if (this.chat == null) {
                swal({
                    title: 'Error',
                    text: 'Selecteer eerst een chat',
                    type: 'warning',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
            else {
                this.send = new message(this.chat.id, jwt_decode(this.auth.getAccessToken()).userid, messagebox);
                this.http.fetch('chat/sendMessage', {
                    body: aurelia_fetch_client_1.json(this.send)
                });
            }
        };
        Chatlog.prototype.deleteChat = function (chat) {
            var _this = this;
            swal({
                title: 'Weet u het zeker?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ja verwijder deze chat',
                cancelButtonText: 'Stop'
            }, function (isOk) {
                if (chat == _this.chat) {
                    _this.chat = null;
                    _this.messages = null;
                    clearInterval(_this.timer);
                }
                if (isOk) {
                    _this.http.fetch('chat/deleteChat', {
                        body: aurelia_fetch_client_1.json(chat.id)
                    });
                    _this.getChats();
                    swal({
                        title: 'Verwijderd',
                        text: 'chat is succesvol verwijderd',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            });
        };
        return Chatlog;
    }());
    Chatlog = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient, aurelia_authentication_1.AuthService, aurelia_event_aggregator_1.EventAggregator, aurelia_router_1.Router])
    ], Chatlog);
    exports.Chatlog = Chatlog;
    var message = (function () {
        function message(chatid, userid, message) {
            this.chatid = chatid;
            this.userid = userid;
            this.message = message;
        }
        return message;
    }());
    exports.message = message;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2hhdC9jaGF0bG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQVFBLElBQWEsT0FBTztRQVVoQixpQkFBb0IsSUFBZ0IsRUFBVSxJQUFpQixFQUFVLEtBQXNCLEVBQVUsTUFBYztZQUFuRyxTQUFJLEdBQUosSUFBSSxDQUFZO1lBQVUsU0FBSSxHQUFKLElBQUksQ0FBYTtZQUFVLFVBQUssR0FBTCxLQUFLLENBQWlCO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtZQVR2SCxVQUFLLEdBQUcsRUFBRSxDQUFDO1lBVVAsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFDRCwwQkFBUSxHQUFSO1lBQUEsaUJBS0M7WUFKRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUM7aUJBQ2hFLElBQUksQ0FBQyxVQUFBLElBQUk7Z0JBQ04sS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBQ0Qsd0JBQU0sR0FBTixVQUFPLElBQUk7WUFBWCxpQkFJQztZQUhHLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxXQUFXLEVBQUUsRUFBbEIsQ0FBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUM1RCxDQUFDO1FBRUQsNkJBQVcsR0FBWDtZQUFBLGlCQVNDO1lBUkcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFO2dCQUM3QixJQUFJLEVBQUUsMkJBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxD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Q0FBQztZQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMzQixDQUFDO1FBQ0wsY0FBQztJQUFELENBVEEsQUFTQyxJQUFBO0lBVFksMEJBQU8iLCJmaWxlIjoiY29tcG9uZW50cy9jaGF0L2NoYXRsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQnO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCJcclxuaW1wb3J0IHsgSHR0cENsaWVudCwganNvbiB9IGZyb20gXCJhdXJlbGlhLWZldGNoLWNsaWVudFwiXHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcImF1cmVsaWEtYXV0aGVudGljYXRpb25cIlxyXG5pbXBvcnQgKiBhcyBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdhdXJlbGlhLXJvdXRlcidcclxuQGF1dG9pbmplY3RcclxuZXhwb3J0IGNsYXNzIENoYXRsb2cge1xyXG4gICAgY2hhdHMgPSBbXTtcclxuICAgIGNoYXQ7XHJcbiAgICB1c2VyO1xyXG4gICAgbWVzc2FnZXM7XHJcbiAgICBzZW5kO1xyXG4gICAgbWVzc2FnZWJveDtcclxuICAgIHJvbGU7XHJcbiAgICB0aW1lcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsIHByaXZhdGUgZXZlbnQ6IEV2ZW50QWdncmVnYXRvciwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xyXG4gICAgICAgIHRoaXMuZ2V0Q2hhdHMoKTtcclxuICAgIH1cclxuICAgIGdldENoYXRzKCkge1xyXG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnY2hhdC9jaGF0TGlzdEFsbCcpLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhdHMgPSBkYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNlbGVjdChjaGF0KSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcclxuICAgICAgICB0aGlzLmNoYXQgPSBjaGF0O1xyXG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLmdldE1lc3NhZ2VzKCksIDEwMDApXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWVzc2FnZXMoKSB7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdjaGF0L21lc3NhZ2VzJywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMuY2hhdC5pZClcclxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSB0aGlzLm1lc3NhZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlcyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbmRNZXNzYWdlKG1lc3NhZ2Vib3gpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGF0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICdTZWxlY3RlZXIgZWVyc3QgZWVuIGNoYXQnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdGltZXI6IDIwMDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNlbmQgPSBuZXcgbWVzc2FnZSh0aGlzLmNoYXQuaWQsIGp3dF9kZWNvZGUodGhpcy5hdXRoLmdldEFjY2Vzc1Rva2VuKCkpLnVzZXJpZCwgbWVzc2FnZWJveCk7XHJcbiAgICAgICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnY2hhdC9zZW5kTWVzc2FnZScsIHtcclxuICAgICAgICAgICAgICAgIGJvZHk6IGpzb24odGhpcy5zZW5kKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgZGVsZXRlQ2hhdChjaGF0KSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnV2VldCB1IGhldCB6ZWtlcj8nLFxyXG4gICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnSmEgdmVyd2lqZGVyIGRlemUgY2hhdCcsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdTdG9wJ1xyXG4gICAgICAgIH0sIChpc09rKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGF0ID09IHRoaXMuY2hhdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGF0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNPaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5odHRwLmZldGNoKCdjaGF0L2RlbGV0ZUNoYXQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keToganNvbihjaGF0LmlkKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldENoYXRzKCk7XHJcbiAgICAgICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ1ZlcndpamRlcmQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdjaGF0IGlzIHN1Y2Nlc3ZvbCB2ZXJ3aWpkZXJkJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVyOiAyMDAwXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG5leHBvcnQgY2xhc3MgbWVzc2FnZSB7XHJcbiAgICBjaGF0aWQ7XHJcbiAgICB1c2VyaWQ7XHJcbiAgICBtZXNzYWdlO1xyXG4gICAgY29uc3RydWN0b3IoY2hhdGlkLCB1c2VyaWQsIG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLmNoYXRpZCA9IGNoYXRpZDtcclxuICAgICAgICB0aGlzLnVzZXJpZCA9IHVzZXJpZDtcclxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/helpQuestion/editHelpQuestion',["require", "exports", "aurelia-fetch-client", "aurelia-framework", "aurelia-router"], function (require, exports, aurelia_fetch_client_1, aurelia_framework_1, aurelia_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var editHelpQuestion = (function () {
        function editHelpQuestion(http, router) {
            this.http = http;
            this.router = router;
        }
        editHelpQuestion.prototype.created = function () {
            this.fetchQuestion();
        };
        editHelpQuestion.prototype.fetchQuestion = function () {
            var _this = this;
            this.http.fetch('helpquestion/show', {
                body: aurelia_fetch_client_1.json(this.router.currentInstruction.params.id)
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.question = data;
            });
        };
        editHelpQuestion.prototype.store = function () {
            var _this = this;
            this.http.fetch('helpquestion/store', {
                body: aurelia_fetch_client_1.json(this.question)
            }).then(function (response) {
                if (response.status == 200) {
                    swal({
                        title: "Hulpvraag succesvol aangemaakt",
                        type: "success",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                _this.router.navigate("hulpvragen");
            });
        };
        return editHelpQuestion;
    }());
    editHelpQuestion = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient, aurelia_router_1.Router])
    ], editHelpQuestion);
    exports.editHelpQuestion = editHelpQuestion;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaGVscFF1ZXN0aW9uL2VkaXRIZWxwUXVlc3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBS0EsSUFBYSxnQkFBZ0I7UUFHekIsMEJBQW9CLElBQWdCLEVBQVUsTUFBYztZQUF4QyxTQUFJLEdBQUosSUFBSSxDQUFZO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFHLENBQUM7UUFFaEUsa0NBQU8sR0FBUDtZQUNJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBRUQsd0NBQWEsR0FBYjtZQUFBLGlCQVFDO1lBUEcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUU7Z0JBQ2pDLElBQUksRUFBRSwyQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQzthQUN2RCxDQUFDO2lCQUNHLElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUM7aUJBQ2pDLElBQUksQ0FBQyxVQUFBLElBQUk7Z0JBQ04sS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBRUQsZ0NBQUssR0FBTDtZQUFBLGlCQWVDO1lBZEcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUU7Z0JBQ2xDLElBQUksRUFBRSwyQkFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVE7Z0JBQ1osRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN6QixJQUFJLENBQUM7d0JBQ0QsS0FBSyxFQUFFLGdDQUFnQzt3QkFDdkMsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsaUJBQWlCLEVBQUUsS0FBSzt3QkFDeEIsS0FBSyxFQUFFLElBQUk7cUJBQ2QsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBRUQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQW5DQSxBQW1DQyxJQUFBO0lBbkNZLGdCQUFnQjtRQUQ1Qiw4QkFBVTt5Q0FJbUIsaUNBQVUsRUFBa0IsdUJBQU07T0FIbkQsZ0JBQWdCLENBbUM1QjtJQW5DWSw0Q0FBZ0IiLCJmaWxlIjoiY29tcG9uZW50cy9oZWxwUXVlc3Rpb24vZWRpdEhlbHBRdWVzdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIGpzb24gfSBmcm9tIFwiYXVyZWxpYS1mZXRjaC1jbGllbnRcIlxuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiXHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2F1cmVsaWEtcm91dGVyJ1xyXG5cbkBhdXRvaW5qZWN0XG5leHBvcnQgY2xhc3MgZWRpdEhlbHBRdWVzdGlvbiB7XG4gICAgcXVlc3Rpb246IHsgcXVlc3Rpb246IFwiXCIsIHVyZ2VudDogbnVsbCB9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7fVxuXG4gICAgY3JlYXRlZCgpIHtcbiAgICAgICAgdGhpcy5mZXRjaFF1ZXN0aW9uKCk7XHJcbiAgICB9XG5cbiAgICBmZXRjaFF1ZXN0aW9uKCkge1xuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ2hlbHBxdWVzdGlvbi9zaG93Jywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMucm91dGVyLmN1cnJlbnRJbnN0cnVjdGlvbi5wYXJhbXMuaWQpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucXVlc3Rpb24gPSBkYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cblxuICAgIHN0b3JlKCkge1xyXG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnaGVscHF1ZXN0aW9uL3N0b3JlJywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMucXVlc3Rpb24pXHJcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJIdWxwdnJhYWcgc3VjY2Vzdm9sIGFhbmdlbWFha3RcIixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZXI6IDIwMDBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFwiaHVscHZyYWdlblwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290Ijoic3JjIn0=

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/helpQuestion/helpQuestions',["require", "exports", "aurelia-fetch-client", "aurelia-framework"], function (require, exports, aurelia_fetch_client_1, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var helpQuestions = (function () {
        function helpQuestions(http) {
            this.http = http;
            this.questions = [];
            this.fetchQuestions();
        }
        helpQuestions.prototype.fetchQuestions = function () {
            var _this = this;
            this.http.fetch('helpquestion/index')
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.questions = data;
            });
        };
        helpQuestions.prototype.destroy = function (question) {
            var _this = this;
            swal({
                title: 'Weet u het zeker?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ja verwijder deze hulpvraag',
                cancelButtonText: 'Stop!',
                confirmButtonColor: '#002e5b',
            }, function (isOk) {
                if (isOk) {
                    _this.http.fetch('helpquestion/destroy', {
                        body: aurelia_fetch_client_1.json(question)
                    }).then(function (data) {
                        _this.questions = _this.questions.filter(function (obj) { return obj.id != question.id; });
                        swal({
                            title: 'Verwijderd',
                            text: 'Hulpvraag is succesvol verwijderd',
                            type: 'success',
                            showConfirmButton: false,
                            timer: 3000
                        });
                    });
                }
            });
        };
        return helpQuestions;
    }());
    helpQuestions = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient])
    ], helpQuestions);
    exports.helpQuestions = helpQuestions;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaGVscFF1ZXN0aW9uL2hlbHBRdWVzdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBSUEsSUFBYSxhQUFhO1FBS3RCLHVCQUFvQixJQUFnQjtZQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1lBSHBDLGNBQVMsR0FBRyxFQUFFLENBQUM7WUFJWCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDMUIsQ0FBQztRQUVELHNDQUFjLEdBQWQ7WUFBQSxpQkFNQztZQUxHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO2lCQUNoQyxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDO2lCQUNqQyxJQUFJLENBQUMsVUFBQSxJQUFJO2dCQUNOLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUVELCtCQUFPLEdBQVAsVUFBUSxRQUFRO1lBQWhCLGlCQXlCQztZQXhCRyxJQUFJLENBQUM7Z0JBQ0QsS0FBSyxFQUFFLG1CQUFtQjtnQkFDMUIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsaUJBQWlCLEVBQUUsNkJBQTZCO2dCQUNoRCxnQkFBZ0IsRUFBRSxPQUFPO2dCQUN6QixrQkFBa0IsRUFBRSxTQUFTO2FBQ2hDLEVBQUUsVUFBQyxJQUFJO2dCQUNKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ1AsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUU7d0JBQ3BDLElBQUksRUFBRSwyQkFBSSxDQUFDLFFBQVEsQ0FBQztxQkFDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7d0JBQ1IsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsSUFBSyxPQUFBLEdBQUcsQ0FBQyxFQUFFLElBQUksUUFBUSxDQUFDLEVBQUUsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO3dCQUV2RSxJQUFJLENBQUM7NEJBQ0QsS0FBSyxFQUFFLFlBQVk7NEJBQ25CLElBQUksRUFBRSxtQ0FBbUM7NEJBQ3pDLElBQUksRUFBRSxTQUFTOzRCQUNmLGlCQUFpQixFQUFFLEtBQUs7NEJBQ3hCLEtBQUssRUFBRSxJQUFJO3lCQUNkLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0wsb0JBQUM7SUFBRCxDQTNDQSxBQTJDQyxJQUFBO0lBM0NZLGFBQWE7UUFEekIsOEJBQVU7eUNBTW1CLGlDQUFVO09BTDNCLGFBQWEsQ0EyQ3pCO0lBM0NZLHNDQUFhIiwiZmlsZSI6ImNvbXBvbmVudHMvaGVscFF1ZXN0aW9uL2hlbHBRdWVzdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiXHJcblxyXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3MgaGVscFF1ZXN0aW9ucyB7XHJcblxyXG4gICAgcXVlc3Rpb25zID0gW107XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgICAgIHRoaXMuZmV0Y2hRdWVzdGlvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBmZXRjaFF1ZXN0aW9ucygpIHtcclxuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ2hlbHBxdWVzdGlvbi9pbmRleCcpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXN0aW9ucyA9IGRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3kocXVlc3Rpb24pIHtcclxuICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgdGl0bGU6ICdXZWV0IHUgaGV0IHpla2VyPycsXHJcbiAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdKYSB2ZXJ3aWpkZXIgZGV6ZSBodWxwdnJhYWcnLFxyXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnU3RvcCEnLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMDAyZTViJyxcclxuICAgICAgICB9LCAoaXNPaykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXNPaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5odHRwLmZldGNoKCdoZWxwcXVlc3Rpb24vZGVzdHJveScsIHtcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiBqc29uKHF1ZXN0aW9uKVxyXG4gICAgICAgICAgICAgICAgfSkudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXN0aW9ucyA9IHRoaXMucXVlc3Rpb25zLmZpbHRlcigob2JqKSA9PiBvYmouaWQgIT0gcXVlc3Rpb24uaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdWZXJ3aWpkZXJkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0h1bHB2cmFhZyBpcyBzdWNjZXN2b2wgdmVyd2lqZGVyZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lcjogMzAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290Ijoic3JjIn0=

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/helpQuestion/newHelpQuestion',["require", "exports", "aurelia-fetch-client", "aurelia-framework", "aurelia-router"], function (require, exports, aurelia_fetch_client_1, aurelia_framework_1, aurelia_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var newHelpQuestion = (function () {
        function newHelpQuestion(http, router) {
            this.http = http;
            this.router = router;
        }
        newHelpQuestion.prototype.store = function () {
            var _this = this;
            this.http.fetch('helpquestion/store', {
                body: aurelia_fetch_client_1.json(this.question)
            }).then(function (response) {
                if (response.status == 200) {
                    swal({
                        title: "Hulpvraag succesvol aangemaakt",
                        type: "success",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                _this.router.navigate("hulpvragen");
            });
        };
        return newHelpQuestion;
    }());
    newHelpQuestion = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient, aurelia_router_1.Router])
    ], newHelpQuestion);
    exports.newHelpQuestion = newHelpQuestion;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaGVscFF1ZXN0aW9uL25ld0hlbHBRdWVzdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFLQSxJQUFhLGVBQWU7UUFHeEIseUJBQW9CLElBQWdCLEVBQVUsTUFBYztZQUF4QyxTQUFJLEdBQUosSUFBSSxDQUFZO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFJLENBQUM7UUFFakUsK0JBQUssR0FBTDtZQUFBLGlCQWVDO1lBZEcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUU7Z0JBQ2xDLElBQUksRUFBRSwyQkFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVE7Z0JBQ1osRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN6QixJQUFJLENBQUM7d0JBQ0QsS0FBSyxFQUFFLGdDQUFnQzt3QkFDdkMsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsaUJBQWlCLEVBQUUsS0FBSzt3QkFDeEIsS0FBSyxFQUFFLElBQUk7cUJBQ2QsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBRUQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0wsc0JBQUM7SUFBRCxDQXJCQSxBQXFCQyxJQUFBO0lBckJZLGVBQWU7UUFEM0IsOEJBQVU7eUNBSW1CLGlDQUFVLEVBQWtCLHVCQUFNO09BSG5ELGVBQWUsQ0FxQjNCO0lBckJZLDBDQUFlIiwiZmlsZSI6ImNvbXBvbmVudHMvaGVscFF1ZXN0aW9uL25ld0hlbHBRdWVzdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIGpzb24gfSBmcm9tIFwiYXVyZWxpYS1mZXRjaC1jbGllbnRcIlxuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiXHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2F1cmVsaWEtcm91dGVyJ1xyXG5cbkBhdXRvaW5qZWN0XG5leHBvcnQgY2xhc3MgbmV3SGVscFF1ZXN0aW9uIHtcbiAgICBxdWVzdGlvbjogeyBxdWVzdGlvbjogXCJcIiwgdXJnZW50OiAwIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHsgfVxuXG4gICAgc3RvcmUoKSB7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdoZWxwcXVlc3Rpb24vc3RvcmUnLCB7XHJcbiAgICAgICAgICAgIGJvZHk6IGpzb24odGhpcy5xdWVzdGlvbilcclxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkh1bHB2cmFhZyBzdWNjZXN2b2wgYWFuZ2VtYWFrdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lcjogMjAwMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoXCJodWxwdnJhZ2VuXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiJzcmMifQ==

define('text!app.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\r\n  <require from=\"sweetalert/dist/sweetalert.css\"></require>\r\n  <div id=\"app\">\n    <div class=\"strip strip__top\"></div>\r\n    <nav class=\"navbar navbar-default navbar-static-top\">\r\n      <div class=\"container\">\r\n        <div class=\"navbar-header\">\r\n\r\n          <!-- Collapsed Hamburger -->\r\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#app-navbar-collapse\">\r\n            <span class=\"sr-only\">Toggle Navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n          </button>\r\n\r\n          <a class=\"navbar-brand hidden-xs\" href=\"/\">\r\n            ${title}\r\n          </a>\r\n        </div>\r\n\r\n        <div class=\"collapse navbar-collapse\" id=\"app-navbar-collapse\">\r\n          <!-- Right Side Of Navbar -->\r\n          <ul class=\"nav navbar-nav navbar-right\">\r\n            <li>\r\n              <a route-href=\"route: dashboard\" show.bind=\"authenticated\">\r\n                Home \r\n              </a>\n            <li/>\n\n            <li>\n              <a route-href=\"route: helpQuestions\" show.bind=\"authenticated\">\r\n                Hulpvraag\r\n              </a>\n            </li>\n\n            <li>\n              <a route-href=\"route: dashboard\" show.bind=\"authenticated\">\r\n                Agenda\r\n              </a>\n            </li>\n\n            <li>\n              <a route-href=\"route: dashboard\" show.bind=\"authenticated\">\r\n                Personen\r\n              </a>\n            </li>\n\n            <li>\r\n              <a route-href=\"route: chat\" show.bind=\"authenticated\">\r\n                Chat\r\n              </a>\r\n            </li>\n\n            <li>\n              <a route-href=\"route: dashboard\" show.bind=\"authenticated\">\r\n                Account\r\n              </a>\n            </li>\n\n            <li>\r\n              <a href=\"#\" click.delegate=\"logout()\" show.bind=\"authenticated\">\r\n                Uitloggen\r\n              </a>\r\n            </li>\n\r\n            <li>\r\n              <a href=\"#\" if.bind=\"!authenticated\">\r\n                Registreer \r\n              </a>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </nav>\r\n\r\n    <router-view></router-view>\r\n  </div>\n  <div id=\"footer\">\r\n    <p>PARTICIPATION 2017</p>\r\n  </div>\r\n  <div class=\"strip strip__footer\"></div>\r\n</template>\r\n"; });
define('text!components/chat/chat.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"header center\">\r\n    <h1>Chats</h1>\r\n  </div>\n\r\n  <div class=\"container\">\r\n    <div class=\"panel panel-default col-md-3\">\r\n      <div class=\"panel-body\">\r\n        <div class=\"col-md-12\">\r\n          <h2>\r\n            Selecteer een chat uit de lijst of maak een chat aan.\r\n            <button type=\"button\" class=\"btn btn-primary btn-sm\" href=\"#\">\r\n              <span class=\"glyphicon glyphicon-ok\"></span> Nieuwe chat maken.\r\n            </button>\r\n            <button type=\"button\" class=\"btn btn-primary btn-sm\" click.delegate=\"openLog()\">\r\n              <span class=\"glyphicon glyphicon-ok\"></span> ChatLog(Beheerder of Hulpverlener)\r\n            </button>\r\n          </h2>\r\n          <ul class=\"list-group\">\r\n            <li repeat.for=\"chat of chats\" class=\"list-group-item ${chat.id === $parent.chat.id ? 'active' : ''}\">\r\n              <a click.delegate=\"$parent.select(chat)\">\r\n                <h4 style=\"color:black;\" class=\"list-group-item-heading\">${chat.userTwo.name} ${chat.userTwo.lastName}</h4>\r\n                <p style=\"color:black;\" class=\"list-group-item-text\">Aangemaakt: ${getMoment(chat.dateCreated)}</p>\r\n              </a>\r\n              <button type=\"button\" class=\"btn btn-default btn-sm\" click.delegate=\"disableChat(chat)\">\r\n                <span class=\"glyphicon glyphicon-remove\"></span> verwijderen\r\n              </button>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\n\r\n    <div class=\"panel panel-default col-md-8  col-md-offset-1\">\r\n      <div class=\"panel-body\">\r\n        <div class=\"col-md-12\">\r\n          <h2>Nadat u een chat heeft aangeklikt kunt u hier chatten met de geselecteerde gebruiker.</h2>\r\n          <div class=\"row\">\r\n            <div class=\"panel panel-default\">\r\n              <div class=\"panel-heading\">Chatbox</div>\r\n              <div class=\"panel-body\">\r\n                <div class=\"row\" repeat.for=\"message of messages\">\r\n                  &nbsp;&nbsp;&nbsp;\r\n                  <span>${message.messageSender} - ${getMoment(message.time)}: ${message.message}</span>\r\n                </div>\r\n                <div class=\"panel-footer\">\r\n                  <div class=\"input-group\">\r\n                    <input type=\"text\" class=\"form-control\" value.bind=\"messagebox\">\r\n                    <span class=\"input-group-btn\">\r\n                      <button class=\"btn btn-primary\" click.delegate=\"sendMessage(messagebox)\" type=\"button\">Versturen</button>\r\n                    </span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n"; });
define('text!components/chat/chatlog.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"header center\">\r\n    <h1>Chatlog</h1>\r\n  </div>\n\r\n  <div class=\"container\">\n    <div class=\"row\">\r\n      <div class=\"panel panel-default col-md-3\">\r\n        <div class=\"panel-body\">\r\n          <div class=\"col-md-12\">\r\n            <h2>\r\n              Selecteer een chat uit de lijst.\r\n            </h2>\r\n            <ul class=\"list-group\">\r\n              <li repeat.for=\"chat of chats\" class=\"list-group-item ${chat.id === $parent.chat.id ? 'active' : ''}\">\r\n                <a click.delegate=\"$parent.select(chat)\">\r\n                  <h4 style=\"color:black;\" class=\"list-group-item-heading\">${chat.userOne.name} ${chat.userOne.lastName} - ${chat.userTwo.name} ${chat.userTwo.lastName}</h4>\r\n                  <p style=\"color:black;\" class=\"list-group-item-text\">Aangemaakt op: ${chat.dateCreated}</p>\r\n                  <p style=\"color:black;\" class=\"list-group-item-text\">Nog actief: ${chat.status}</p>\r\n                </a>\r\n                <button type=\"button\" class=\"btn btn-primary btn-sm\" click.delegate=\"deleteChat(chat)\">\r\n                  <span class=\"glyphicon glyphicon-remove\"></span> verwijderen\r\n                </button>\r\n              </li>\r\n            </ul>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"panel panel-default col-md-8  col-md-offset-1\">\r\n        <div class=\"panel-body\">\r\n          <div class=\"col-md-12\">\r\n            <h2>Nadat u een chat heeft aangeklikt kunt u deze hier bekijken, U kunt ook een bericht sturen in de chat voor waarschuwingen en indien nodig kunt u ingrijpen.</h2>\r\n            <div class=\"row\">\r\n              <div class=\"panel panel-default\">\r\n                <div class=\"panel-heading\">Chatbox</div>\r\n                <div class=\"panel-body\">\r\n                  <div class=\"row\" repeat.for=\"message of messages\">\r\n                    &nbsp;&nbsp;&nbsp;\r\n                    <span>${message.messageSender}: ${message.message}</span>\r\n                  </div>\r\n                  <div class=\"panel-footer\">\r\n                    <div class=\"input-group\">\r\n                      <input type=\"text\" class=\"form-control\" value.bind=\"messagebox\">\r\n                      <span class=\"input-group-btn\">\r\n                        <button class=\"btn btn-primary\" click.delegate=\"sendMessage(messagebox)\" type=\"button\">Versturen</button>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\n    </div>\n  </div<\r\n</template>\r\n"; });
define('text!components/authentication/login.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"header center\">\r\n    <h1>Login</h1>\r\n  </div>\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-8 col-md-offset-2\">\r\n        <div class=\"panel panel-default\">\r\n          <div class=\"panel-heading\">\r\n            Participation\r\n          </div>\r\n\r\n          <div class=\"panel-body\">\r\n            <form class=\"form-horizontal\" role=\"form\" method=\"POST\" submit.delegate=\"login()\">\r\n\r\n              <div class=\"form-group\">\r\n                <label for=\"email\" class=\"col-md-4 control-label\">E-Mail</label>\r\n\r\n                <div class=\"col-md-6\">\r\n                  <input id=\"email\" type=\"email\" class=\"form-control\" name=\"email\" value.bind=\"email\" required autofocus>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"form-group\">\r\n                <label for=\"password\" class=\"col-md-4 control-label\">Wachtwoord</label>\r\n\r\n                <div class=\"col-md-6\">\r\n                  <input id=\"password\" type=\"password\" class=\"form-control\" name=\"password\" value.bind=\"password\" required>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"form-group\">\r\n                <div class=\"col-md-8 col-md-offset-4\">\r\n                  <button type=\"submit\" class=\"btn btn-primary\">\r\n                    Login\r\n                  </button>\r\n                </div>\r\n              </div>\r\n            </form>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/dashboard/dashboard.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"header center\">\r\n      <h1>Dashboard</h1>\r\n  </div>\r\n\r\n  <div class=\"container container__margin__top\">\r\n      <div class=\"row\">\r\n          <a route-href=\"route: helpQuestions\" class=\"col-md-6 center block\">\r\n              <h1>Hulpvraag</h1>\r\n          </a>\r\n\r\n          <a route-href=\"route: chat\" class=\"col-md-6 center block\">\r\n              <h1>Chat</h1>\r\n          </a>\r\n      </div>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6 center block\">\r\n            <h1>Account</h1>\r\n        </div>\r\n\r\n        <div class=\"col-md-6 center block\">\r\n            <h1>Agenda</h1>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12 center block\">\r\n            <h1>Personen</h1>\r\n        </div>\r\n    </div>\n</div>\r\n</template>"; });
define('text!components/helpQuestion/editHelpQuestion.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"header center\">\r\n    <h1>Bewerk hulpvraag</h1>\r\n  </div>\r\n\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-8 col-md-offset-2\">\r\n        <div class=\"panel panel-primary\">\r\n          <div class=\"panel-heading\">\r\n            <span>Bewerk uw hulpvraag</span>\r\n          </div>\r\n\r\n          <div class=\"panel-body\">\r\n            <form class=\"form-horizontal\" role=\"form\" method=\"POST\" submit.delegate=\"update()\">\r\n\r\n              <div class=\"form-group\">\r\n                <label for=\"question\" class=\"col-md-4 control-label\">Uw vraag</label>\r\n\r\n                <div class=\"col-md-6\">\r\n                  <textarea value.bind=\"question.question\" id=\"question\" type=\"text\" class=\"form-control\" name=\"question\" required autofocus></textarea>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label for=\"urgent\" class=\"col-md-4 control-label\">Urgentie</label>\r\n                <div class=\"col-md-6\">\r\n                  <select class=\"form-control\" value.bind=\"question.urgent\" required>\r\n                    <option disabled value=\"\">Selecteer urgentie</option>\r\n\r\n                    <option model.bind=\"0\">\r\n                      Hoog\r\n                    </option>\r\n                    <option model.bind=\"1\">\r\n                      Middel\r\n                    </option>\r\n                    <option model.bind=\"2\">\r\n                      Laag\r\n                    </option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"form-group\">\r\n                <div class=\"col-md-6 col-md-offset-4\">\r\n                  <button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">\r\n                    Pas wijzigingen toe\r\n                  </button>\r\n                </div>\r\n              </div>\r\n            </form>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/helpQuestion/helpQuestions.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"header center\">\r\n    <h1>Hulpvragen</h1>\n  </div>\n\n  <div class=\"container\">\n    <a class=\"btn btn-primary margin__bottom__small\" route-href=\"route: newHelpQuestion\">\n        Maak hier uw nieuwe hulpvraag\n    </a>\n\n    <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n        <div class=\"panel panel-default\">\r\n          <div class=\"panel-body\">\r\n            <table class=\"table table-hover\">\r\n              <thead>\r\n                <tr>\r\n                  <th class=\"col-md-3 table__title\">\r\n                    Naam\r\n                  </th>\r\n\r\n                  <th class=\"col-md-3 table__title\">\r\n                    Email\r\n                  </th>\n\n                  <th class=\"col-md-3 table__title hidden-xs hidden-sm\">\r\n                    Urgentie\r\n                  </th>\n\n                  <th class=\"col-md-3 table__title hidden-xs hidden-sm\">\r\n                    Vraag\r\n                  </th>\r\n                </tr>\r\n              </thead>\r\n\r\n              <tbody>\r\n                <tr repeat.for=\"question of questions\">\r\n                <td class=\"col-md-4\">\r\n                  ${question.helpSeeker}\r\n                </td>\r\n\r\n                <td class=\"col-md-3\">\r\n                  ${question.email}\r\n                </td>\n\n                <td class=\"col-md-3 hidden-xs hidden-sm\">\n                  <span class=\"label label-danger\" if.bind=\"question.urgent == 0\">Hoog</span>\n                  <span class=\"label label-warning\" if.bind=\"question.urgent == 1\">Gemiddeld</span>\n                  <span class=\"label label-info\" if.bind=\"question.urgent == 2\">Laag</span>\r\n                </td>\n\n                <td class=\"col-md-3 hidden-xs hidden-sm\">\n                  ${question.question.slice(0, 10)}....\r\n                </td>\r\n\r\n                <td class=\"hidden-xs hidden-sm\">\r\n                  <i class=\"material-icons\" click.delegate=\"destroy(question)\">&#xE872;</i>\r\n\r\n                  <a route-href=\"route: editHelpQuestion; params.bind: { id: question.id }\">\r\n                    <i class=\"material-icons\">&#xE254;</i>\r\n                  </a>\r\n                </td>\r\n              </tr>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\n  </div>\n</template>"; });
define('text!components/helpQuestion/newHelpQuestion.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"header center\">\r\n    <h1>Nieuwe hulpvraag</h1>\r\n  </div>\r\n\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-8 col-md-offset-2\">\r\n        <div class=\"panel panel-primary\">\r\n          <div class=\"panel-heading\">\r\n            <span>Nieuwe hulpvraag</span>\r\n          </div>\r\n\r\n          <div class=\"panel-body\">\r\n            <form class=\"form-horizontal\" role=\"form\" method=\"POST\" submit.delegate=\"store()\">\r\n\r\n              <div class=\"form-group\">\r\n                <label for=\"question\" class=\"col-md-4 control-label\">Uw vraag</label>\r\n\r\n                <div class=\"col-md-6\">\r\n                  <textarea value.bind=\"question.question\" id=\"question\" type=\"text\" class=\"form-control\" name=\"question\" required autofocus></textarea>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"form-group\">\r\n                <label for=\"urgent\" class=\"col-md-4 control-label\">Urgentie</label>\r\n\r\n                <div class=\"col-md-6\">\r\n                  <select class=\"form-control\" value.bind=\"question.urgent\" required>\r\n                    <option disabled value=\"\">Selecteer urgentie</option>\r\n\r\n                    <option value.bind=\"0\">\r\n                      Hoog\r\n                    </option>\r\n\r\n                    <option value.bind=\"1\">\r\n                      Middel\r\n                    </option>\r\n\r\n                    <option value.bind=\"2\">\r\n                      Laag\r\n                    </option>\r\n                  </select>\r\n                </div>          \r\n              </div>\r\n\r\n              <div class=\"form-group\">\r\n                <div class=\"col-md-6 col-md-offset-4\">\r\n                  <button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">\r\n                    Post hulpvraag\r\n                  </button>\r\n                </div>\r\n              </div>\r\n            </form>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map