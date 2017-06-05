import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';

@autoinject
export class review {
    users;
    reviews;
    user;
    description;
    ratingNumber;
    messagebox;

    constructor(private auth: AuthService, private http: HttpClient) {
        this.getUsers();
    }

    getUsers() {
        this.http.fetch('review/getUsers').then(response => response.json())
            .then(data => {
                this.users = data;
            });
    }
    select(user) {
        this.user = user;
        this.getReviews();
    }

    getReviews() {
        this.http.fetch('review/getReviews',
            {
                body: json(this.user.id)
            }).then(response => response.json())
            .then(data => {
                this.reviews = data;
            });
    }

    sendMessage(messagebox, review) {
        this.http.fetch('review/sendReply',
            {
                body: json(new message(review.id, messagebox))
            }).then(response => {
                this.getReviews();
                this.messagebox = "";
                //document.getElementById("reaction").clear;
            });
    }

    addReview() {
        if (this.user == null) {
            swal({
                title: 'Error',
                text: 'Selecteer eerst een gebruiker.',
                type: 'warning',
                showConfirmButton: false,
                timer: 2000
            });
        }
        else {
            this.http.fetch('review/addReview',
                {
                    body: json(new newReview(this.user.id, this.description, this.ratingNumber))
                }).then(response => {
                    this.getReviews();
                });
        }
    }
}

export class message {
    review;
    message;
    constructor(review, message) {
        this.review = review;
        this.message = message;
    }
}

export class newReview {
    user;
    message;
    rating;
    constructor(user, message, rating) {
        this.user = user;
        this.message = message;
        this.rating = rating
    }
}