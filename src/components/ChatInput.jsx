import React from 'react'
import PropTypes from 'prop-types'

const ChatInput = ({ onSubmitMessage }) => {
    const [message, setMessage] = React.useState('');

    return (
        <form
            action="."
            onSubmit={event => {
                event.preventDefault();
                onSubmitMessage(message);
                setMessage('');
            }}
        >
            <input
                type="text"
                placeholder="Enter message..."
                value={message}
                onChange={event => setMessage(event.target.value)}
            />
            <input type="submit" value="Send" />
        </form>
    );
};

ChatInput.propTypes = {
    onSubmitMessage: PropTypes.func.isRequired
};

export default ChatInput;
