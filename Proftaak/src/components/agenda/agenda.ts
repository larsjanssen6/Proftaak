import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';

@autoinject
export class Agenda {
    appointments;
    constructor(private auth: AuthService, private http: HttpClient) {
        console.log(jwt_decode(this.auth.getAccessToken()).role);
        if (jwt_decode(this.auth.getAccessToken()).role == 'Hulpbehoevende') {
            this.getSeekersAppointments();
        }
        else {
            this.getGiversAppointments();
        }
    }

    getSeekersAppointments() {
        this.http.fetch('Agenda/getSeekers', {
            body: json(jwt_decode(this.auth.getAccessToken()).userid)
        }).then(response => response.json())
            .then(data => {
                this.appointments = data;
            });
    }

    getGiversAppointments() {
        this.http.fetch('Agenda/getGivers', {
            body: json(jwt_decode(this.auth.getAccessToken()).userid)
        }).then(response => response.json())
            .then(data => {
                this.appointments = data;
            });
    }
}