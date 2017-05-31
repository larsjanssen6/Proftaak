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
export class App {

    users;

    constructor(private http: HttpClient, private auth: AuthService, private event: EventAggregator, private router: Router) {
        this.getUsers();

    }

    getUsers() {
        this.http.fetch('user/getUsers').then(response => response.json())
            .then(data => {
                console.log(data);
                this.users = data;
            })
    }
    createChat(user) {
        this.http.fetch('chat/createChat', {
            body: json(new users(jwt_decode(this.auth.getAccessToken()).userid, user.id))
        });
        swal({
            title: 'Chat aangemaakt',
            text: 'U wordt nu doorgestuurd naar de Chat pagina.',
            type: 'success',
            showConfirmButton: false,
            timer: 2000
        });

        this.router.navigate("chat");
    }

    createAppointment(user) {
        swal({
            title: "Afspraak",
            text: "Kies hier uw datum voor uw afspraak:",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "Het volgende formaat is verplicht: dd-mm-jjjj"
        },
            function (inputValue) {
                if (inputValue === false) return false;

                if (inputValue === "") {
                    swal.showInputError("You need to write something!");
                    return false
                }
                this.http.fetch('agenda/store', {
                    body: json(new agenda(inputValue.toString(), user.id))
                }).then(() => {
                    swal("Gelukt!", "Uw verzoek is verzonden.");

                })
            }.bind(this));
    }
}

export class users {
    one;
    two
    constructor(one, two) {
        this.one = one;
        this.two = two;
    }
}

export class agenda {
    date: Date;
    offersHelp: string;
    constructor(date: Date, offershelp: string)
    {
        this.date = date;
        this.offersHelp = offershelp;
    }

}
