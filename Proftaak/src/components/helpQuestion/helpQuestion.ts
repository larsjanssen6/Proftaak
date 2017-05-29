import { HttpClient, json } from "aurelia-fetch-client"
import { autoinject } from "aurelia-framework"
import { Router } from 'aurelia-router'

@autoinject
export class helpQuestion {

    question: question;
    reaction: Reaction;
    editing: boolean;

    constructor(private http: HttpClient, private router: Router) {
        this.editing = false;
    }

    created() {
        this.getQuestion();
    }

    getQuestion() {
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
        })
            .then(response => {
                if (response.status == 200) {
                    swal({
                        title: "Hulpvraag succesvol geupdatet",
                        type: "success",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }

                this.editing = false;
            });
    }

    destroy() {
        swal({
            title: 'Weet u het zeker?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ja verwijder dit bericht',
            cancelButtonText: 'Stop!',
            confirmButtonColor: '#002e5b',
        }, (isOk) => {
            if (isOk) {
                this.http.fetch('helpquestion/destroy', {
                    body: json(this.question)
                }).then(data => {
                    swal({
                        title: 'Verwijderd',
                        text: 'Het bericht is succesvol verwijderd',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 3000
                    });
                });

                this.router.navigate("/dashboard");
            }
        });
    }

    post() {
        this.reaction.question_id = this.question.id;

        this.http.fetch('reaction/store', {
            body: json(this.reaction)
        }).then(response => response.json())
            .then(data => {
                swal({
                    title: "Reactie succesvol aangemaakt",
                    type: "success",
                    showConfirmButton: false,
                    timer: 2000
                });

                this.question.reactions.push(data);
            });
    }
}

export class Reaction {
    name: number;
    message: number;
    id: number;
    question_id: number;
}

export class question {
    id: number;
    question: string;
    reactions: Reaction[];
}