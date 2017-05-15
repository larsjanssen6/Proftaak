import { autoinject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router'
import { HttpClient } from 'aurelia-fetch-client';
import { FetchConfig } from 'aurelia-authentication';
import { Container } from 'aurelia-dependency-injection';

@autoinject
export class App {
    router: Router;

    constructor(private http: HttpClient, private config: FetchConfig) {
        this.configHttp();
    }


    configureRouter(config, router) {
        this.router = router;

        //config.addPipelineStep('authorize', AuthorizeStep);

        config.title = 'Aurelia';
        config.map([
            { route: ['/', 'dashboard'], name: 'dashboard', moduleId: 'components/dashboard/dashboard', auth: true },
            { route: ['/', 'login'], name: 'login', moduleId: 'components/authentication/login' },
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

//class AuthorizeStep {
//    run(routingContext, next) {
//        if (routingContext.nextInstructions.some(i => i.config.auth)) {
//            var isLoggedIn = AuthorizeStep.isLoggedIn();
//            if (!isLoggedIn) {
//                return next.cancel();
//            }
//        }
//        return next();
//    }

//    static isLoggedIn(): boolean {
//        var auth_token = localStorage.getItem("auth_token");
//        return (typeof auth_token !== "undefined" && auth_token !== null);
//    }
//}

