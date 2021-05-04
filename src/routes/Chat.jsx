import React from 'react';
import ChatInput from '../components/ChatInput';
import ChatMessage from '../components/ChatMessage';

const URL = 'ws://localhost:3030';

const Chat = () => {
    const [name, setName] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const [webSocketInstance, setWebSocketInstance] = React.useState(new WebSocket(URL));

    const addMessage = React.useCallback(
        message => setMessages([message, ...messages])
    , [messages]);

    const submitMessage = messageString => {
        // on submitting the ChatInput form, send the message, add it to the list and reset the input
        const message = { name: name, message: messageString };
        webSocketInstance.send(JSON.stringify(message));
        addMessage(message);
    }

    React.useEffect(() => {
        webSocketInstance.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected'); 
        }

        webSocketInstance.onmessage = event => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(event.data);
            addMessage(message);
        }

        webSocketInstance.onclose = () => {
            console.log('disconnected');
            // automatically try to reconnect on connection loss
            setWebSocketInstance(new WebSocket(URL));
        }
    }, [addMessage, webSocketInstance]);

    return (
        <div>
            <label htmlFor="name">
                Name:&nbsp;
                <input
                    type="text"
                    id={'name'}
                    placeholder={'Enter your name...'}
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
            </label>
            <ChatInput
                ws={webSocketInstance}
                onSubmitMessage={messageString => submitMessage(messageString)}
            />
            {messages.map((message, index) =>
                <ChatMessage
                    key={index}
                    message={message.message}
                    name={message.name}
                />,
            )}
        </div>
    );
}

export default Chat;
