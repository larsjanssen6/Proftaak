import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router'
import * as moment from 'moment';
import 'moment/locale/nl';

@autoinject
export class account {
    user;
    role;

    constructor(private http: HttpClient, private auth: AuthService, private event: EventAggregator, private router: Router) {
    }

    attached() {
        this.getUser();
    }

    getUser() {
        alert(this.router.currentInstruction.params.id);
        this.http.fetch('user/getuser', {
            body: json(this.router.currentInstruction.params.id)
        })
            .then(response => response.json())
            .then(data => {
                this.user = data;
                console.log(data);
            });
    }
    update() {
        this.http.fetch('user/update', {
            body: json(this.user)
        })
            .then(data => {
                swal({
                    title: 'Gelukt',
                    text: 'Profiel succesvol geupdatet',
                    type: "success",
                    showConfirmButton: false,
                    timer: 2000
                });
            });
    }

    toggleAccount(status) {
        this.user.status = status
        this.role = jwt_decode(this.auth.getAccessToken()).role;
        console.log(this.role);
        if (this.role == 'Beheerder') {
            this.http.fetch('user/toggle', {
                body: json(this.user)
            })
                .then(response => response.json())
                .then(data => {
                    this.user = data;
                    console.log(data);
                })
            swal({
                title: 'Gelukt',
                text: 'Profiel status gewijzigd',
                type: "success",
                showConfirmButton: false,
                timer: 2000
            });
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
    }
}


