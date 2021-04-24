import React from 'react';
import './App.css';

const client = new WebSocket('ws://localhost:8000');

const App = () => {
    React.useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        client.onerror = dingle => console.log(dingle);
        client.onmessage = message => {
            console.log(message.lastEventId);
            /*
            const dataFromServer = JSON.parse(message.data);
            const stateToChange = {};
            if (dataFromServer.type === "userevent") {
                stateToChange.currentUsers = Object.values(dataFromServer.data.users);
            } else if (dataFromServer.type === "contentchange") {
                stateToChange.text = dataFromServer.data.editorContent || 'default message';
            }
            stateToChange.userActivity = dataFromServer.data.userActivity;
            this.setState({
                ...stateToChange
            });
            */
        };
    }, []);

    /* When a user joins, notify the
    server that a new user has joined to edit the document. */
    const logInUser = () => {
        const username = this.username.value;
        if (username.trim()) {
            const data = {
                username
            };
            this.setState({
                ...data
            }, () => {
                client.send(JSON.stringify({
                    ...data,
                    type: "userevent"
                }));
            });
        }
    }

    /* When content changes, send the
    current content of the editor to the server. */
    const onEditorStateChange = (text) => {
        client.send(JSON.stringify({
            type: "contentchange",
            username: this.state.username,
            content: text
        }));
    };

    return (
        <div>
            Practical Intro To WebSockets.
        </div>
    );
}

export default App;
