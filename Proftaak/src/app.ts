import { autoinject } from 'aurelia-framework';
import { Router, RouterConfiguration, Next, Redirect, NavigationInstruction } from 'aurelia-router'
import { HttpClient } from 'aurelia-fetch-client';
import { FetchConfig } from 'aurelia-authentication';
import { Container } from 'aurelia-dependency-injection';
import { AuthService } from 'aurelia-authentication';

@autoinject
export class App {
    router: Router;

    constructor(private http: HttpClient, private config: FetchConfig, private authService: AuthService) {
        this.configHttp();
    }


    configureRouter(config, router) {
        this.router = router;

        let step = new AuthorizeStep(this.authService);
        config.addAuthorizeStep(step);

        config.title = 'Aurelia';
        config.map([
            { route: ['/dashboard'], name: 'dashboard', moduleId: 'components/dashboard/dashboard', auth: true },
            { route: ['/'], name: 'login', moduleId: 'components/authentication/login' },
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

