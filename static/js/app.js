new Vue({
    el: '#app',

    data: {
        ws: null, // Our websocket
        newMsg: '', // Holds new messages to be sent to the server
        chatContent: '', // A running list of chat messages displayed on the screen
        email: null, // Email address used for grabbing an avatar
        username: null, // Our username
        joined: false // True if email and username have been filled in
    },

    created: function() {
        const config = new Config();
        const self = this;
        const chatroomName = document.getElementById("chat_room_name").innerText;
        fetch('/config.json')
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    response.json().then( (data) => {
                        config.protocol = data.protocol;
                        config.local = data.local;
                        console.log(window.location.host);
                        self.ws = new WebSocket(`${config.protocol}${window.location.host}/${chatroomName}/ws`);
                        self.ws.addEventListener('message', function(e) {
                            var msg = JSON.parse(e.data);
                            self.chatContent += '<div class="chip">'
                                + '<img src="' + self.gravatarURL(msg.email) + '">' // Avatar
                                + msg.username
                                + '</div>'
                                + emojione.toImage(msg.message) + '<br/>'; // Parse emojis

                            var element = document.getElementById('chat-messages');
                            element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
                        });


                        self.keepAlive()

                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });

    },

    methods: {
        send: function () {
            if (this.newMsg !== '') {
                this.ws.send(
                    JSON.stringify({
                            email: this.email,
                            username: this.username,
                            message: $('<p>').html(this.newMsg).text() // Strip out html
                        }
                    ));
                this.newMsg = ''; // Reset newMsg
            }
        },

        join: function () {
            if (!this.email) {
                Materialize.toast('You must enter an email', 2000);
                return
            }
            if (!this.username) {
                Materialize.toast('You must choose a username', 2000);
                return
            }
            this.email = $('<p>').html(this.email).text();
            this.username = $('<p>').html(this.username).text();
            this.joined = true;
            this.ws.send(
                JSON.stringify({
                        email: this.email,
                        username: this.username,
                        message: " has joined the room! Welcome!"
                    }
                ));
        },

        gravatarURL: function(email) {
            return 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(email);
        },
        keepAlive: function() {
            console.log("pinging");
            if (this.ws.readyState === this.ws.OPEN) {
                this.ws.send(JSON.stringify({
                    email: "ping",
                    username: "ping",
                    message: "ping"
                }))
            } else {
                console.log("was not ready, was: ", this.ws.readyState)
            }
            this.timerId = setTimeout(this.keepAlive, 15000);
        }

    }
});
