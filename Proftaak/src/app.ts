import { autoinject } from 'aurelia-framework';
import { Router, RouterConfiguration, Next, Redirect, NavigationInstruction } from 'aurelia-router'
import { HttpClient } from 'aurelia-fetch-client';
import { FetchConfig } from 'aurelia-authentication';
import { Container } from 'aurelia-dependency-injection';
import { AuthService } from 'aurelia-authentication';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as jwt_decode from 'jwt-decode';

@autoinject
export class App {
    router: Router;
    authenticated: boolean;
    title: string;

    constructor(private http: HttpClient,
                private config: FetchConfig,
                private authService: AuthService,
                private event: EventAggregator) {
        this.configHttp();
        this.authenticated = this.authService.authenticated;
        this.title = this.authService.authenticated ? "Welkom " + jwt_decode(this.authService.getAccessToken()).name : "PARTICIPATION";
    }


    configureRouter(config, router) {
        this.router = router;

        let step = new AuthorizeStep(this.authService);
        config.addAuthorizeStep(step);

        config.title = 'Aurelia';
        config.map([
            {
                route: ['hulpvraag/:id'],
                name: 'helpQuestion',
                moduleId: 'components/helpQuestion/helpQuestion',
                auth: true
            },
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
    }

    configHttp(): void {
        this.http.configure(config => {
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
                    request(request) {
                        console.log(`Requesting ${request.method} ${request.url}`);
                        return request;
                    },
                    response(response: Response) {
                        console.log(`Received ${response.status} ${response.url}`);
                        return response;
                    }
                });
        });

        this.config.configure(this.http);
    }


    attached() {
        this.event.subscribe('signedIn', response => {
            this.authenticated = response;
            this.title = "Welkom " + jwt_decode(this.authService.getAccessToken()).name;
        });
    }

    logout() {
        return this.authService.logout()
            .then(() => {
                this.authenticated = this.authService.authenticated;
                this.router.navigate("login");
                this.title = "PARTICIPATION";

                swal({
                    title: "Bedankt voor uw bezoek",
                    type: "success",
                    showConfirmButton: false,
                    timer: 2000
                });
            });
    }
}

@autoinject
class AuthorizeStep {
    constructor(private authService: AuthService) { }

    run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
        if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
            let isLoggedIn = this.authService.isAuthenticated();

            if (!isLoggedIn) {
                return next.cancel(new Redirect('login'));
            }
        }

        return next();
    }
}


