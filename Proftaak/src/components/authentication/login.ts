import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"

@autoinject
export class FetchClientDemo {

    email = "";
    password = "";

    constructor(private auth: AuthService, private http: HttpClient) {
    }

    login() {
        this.auth.login({
            email: this.email,
            password: this.password
        }).then(response => {
            swal({
                title: "U bent succesvol ingelogd",
                type: "success",
                showCancelButton: true,
                showConfirmButton: false,
                closeOnConfirm: true
            });
        })
            .catch(err => {
                swal({
                    title: "Inloggegevens zijn onjuist",
                    type: "warning",
                    showCancelButton: true,
                    showConfirmButton: false,
                    closeOnConfirm: true
                });
            });
    }

    logout() {
        this.auth.logout('');
    }

    async test() {

    }
} 