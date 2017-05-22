import { HttpClient, json } from "aurelia-fetch-client"
import { autoinject } from "aurelia-framework"
import { Router } from 'aurelia-router'

@autoinject
export class newHelpQuestion {
    question: { question: "", urgent: 0 };

    constructor(private http: HttpClient, private router: Router) { }

    store() {
        this.http.fetch('helpquestion/store', {
            body: json(this.question)
        }).then(response => {
            if (response.status == 200) {
                swal({
                    title: "Hulpvraag succesvol aangemaakt",
                    type: "success",
                    showConfirmButton: false,
                    timer: 2000
                });
            }

            this.router.navigate("hulpvragen");
        });
    }
}