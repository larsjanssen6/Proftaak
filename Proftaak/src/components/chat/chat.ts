import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router'
@autoinject
export class Chat {
    chats = [];
    chat;
    user;
    messages;
    send;
    messagebox;
    role;
    timer;

    constructor(private http: HttpClient, private auth: AuthService, private event: EventAggregator, private router: Router) {
        this.getChats();
    }
    getChats() {
        this.http.fetch('chat/chatList', {
            body: json(jwt_decode(this.auth.getAccessToken()).userid)
        }).then(response => response.json())
            .then(data => {
                this.chats = data;
            });
    }
    select(chat) {
        clearInterval(this.timer);
        this.chat = chat;
        this.sendMessage("heeft toegetreden tot de chat");
        this.timer = setInterval(() => this.getMessages(), 1000)
    }

    getMessages() {
        this.http.fetch('chat/messages', {
            body: json(this.chat.id)
        }).then(response => response.json())
            .then(data => {
                if (data != this.messages) {
                    this.messages = data;
                }
            });
    }
    sendMessage(messagebox) {
        if (this.chat == null) {
            swal({
                title: 'Error',
                text: 'Selecteer eerst een chat of maak een chat aan.',
                type: 'warning',
                showConfirmButton: false,
                timer: 2000
            });
        }
        else {
            this.send = new message(this.chat.id, jwt_decode(this.auth.getAccessToken()).userid, messagebox);
            this.http.fetch('chat/sendMessage', {
                body: json(this.send)
            });
        }

    }

    disableChat(chat) {
        swal({
            title: 'Weet u het zeker?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ja verwijder deze chat',
            cancelButtonText: 'Stop'
        }, (isOk) => {
            if (chat == this.chat) {
                this.chat = null;
                this.messages = null;
                clearInterval(this.timer);
            }
            if (isOk) {
                this.http.fetch('chat/disableChat', {
                    body: json(chat.id)
                });
                this.getChats();
                swal({
                    title: 'Verwijderd',
                    text: 'chat is succesvol verwijderd',
                    type: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        });
    }
    openLog() {
        this.role = jwt_decode(this.auth.getAccessToken()).role;
        console.log(this.role);
        if (this.role == 'Hulpverlener' || this.role == 'Beheerder') {
            clearInterval(this.timer);
            this.router.navigate("chatlog");
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
export class message {
    chatid;
    userid;
    message;
    constructor(chatid, userid, message) {
        this.chatid = chatid;
        this.userid = userid;
        this.message = message;
    }
}
