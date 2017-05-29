import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router'
@autoinject
export class register {

    email;
    password;
    passwordConfirm;
    firstname;
    lastname;
    address;
    zip;
    birthdate;
    handicapt;
    licence;
    role;
    number;

    constructor(private auth: AuthService, private http: HttpClient, private router: Router, private event: EventAggregator) {
    }

    register() {
        if (this.password != this.passwordConfirm) {
            swal({
                title: "Uw ingevulde wachtwoorden zijn niet gelijk",
                type: "warning",
                showCancelButton: false,
                showConfirmButton: true,
                closeOnConfirm: true
            });
        }
        else {
            this.http.fetch('auth/register', {
                body: json(new User(this.email, this.password, this.firstname, this.lastname, this.address, this.zip, this.birthdate, this.handicapt, this.licence, this.role, this.number))
            }).then(response => {
                if (this.role == "Hulpbehoevende") {
                    this.login();
                    swal({
                        title: "U bent succesvol geregistreerd",
                        type: "success",
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnConfirm: false,
                        timer: 1000
                    });
                }
                else {
                    swal({
                        title: "U bent succesvol geregistreerd. Wij nemen nog contact met u op.",
                        type: "success",
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnConfirm: false,
                        timer: 1000
                    });
                }

            });
        }

    }
    login() {
        this.auth.login({
            email: this.email,
            password: this.password
        }).then(response => {
            this.event.publish('signedIn', true);
            this.router.navigate("dashboard");
        })
    }
}

export class User {
    email;
    password;
    firstname;
    lastname;
    address;
    zip;
    birthdate;
    handicapt;
    licence;
    role;
    number;

    constructor(email, password, firstname, lastname, address, zip, birthdate, handicapt, licence, role, number) {
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.zip = zip;
        this.birthdate = birthdate;
        this.handicapt = handicapt;
        this.licence = licence;
        this.role = role;
        this.number = number;
    }
}