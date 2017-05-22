import { HttpClient, json } from "aurelia-fetch-client"
import { autoinject } from "aurelia-framework"

@autoinject
export class helpQuestions {

    questions = [];


    constructor(private http: HttpClient) {
        this.fetchQuestions();
    }

    fetchQuestions() {
        this.http.fetch('helpquestion/index')
            .then(response => response.json())
            .then(data => {
                this.questions = data;
            });
    }

    destroy(question) {
        swal({
            title: 'Weet u het zeker?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ja verwijder deze hulpvraag',
            cancelButtonText: 'Stop!',
            confirmButtonColor: '#002e5b',
        }, (isOk) => {
            if (isOk) {
                this.http.fetch('helpquestion/destroy', {
                    body: json(question)
                }).then(data => {
                    this.questions = this.questions.filter((obj) => obj.id != question.id);

                    swal({
                        title: 'Verwijderd',
                        text: 'Hulpvraag is succesvol verwijderd',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 3000
                    });
                });
            }
        });
    }
}