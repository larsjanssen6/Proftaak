import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';

@autoinject
export class Agenda {
    appointments;
    role;
    constructor(private auth: AuthService, private http: HttpClient) {
        this.getAppointments();
    }

    getAppointments() {
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

    changeStatus(appointment) {
        this.role = jwt_decode(this.auth.getAccessToken()).role;
        if (this.role != 'Hulpbehoevende') {
            this.http.fetch('Agenda/update', {
                body: json(appointment)
            }).then(respon => {
                    swal({
                        title: 'Success',
                        text: 'U heeft de status aangepast.',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.getAppointments();
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