import { HttpClient, json } from "aurelia-fetch-client"
import { autoinject } from "aurelia-framework"
import { Router } from 'aurelia-router'

@autoinject
export class editHelpQuestion {
    question: { question: "", urgent: null };

    constructor(private http: HttpClient, private router: Router) {}

    created() {
        this.fetchQuestion();
    }

    fetchQuestion() {
        this.http.fetch('helpquestion/show', {
            body: json(this.router.currentInstruction.params.id)
        })
            .then(response => response.json())
            .then(data => {
                this.question = data;
            });
    }

    update() {
        this.http.fetch('helpquestion/update', {
            body: json(this.question)
        }).then(response => {
            if (response.status == 200) {
                swal({
                    title: "Hulpvraag succesvol geupdatet",
                    type: "success",
                    showConfirmButton: false,
                    timer: 2000
                });
            }

            this.router.navigate("hulpvragen");
        });
    }
}