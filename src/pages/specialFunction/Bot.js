import React from 'react';

import Chatbot from 'react-chatbot-kit'
import config from '../utils/config';
import ActionProvider from '../utils/ActionProvider';
import MessageParser from '../utils/MessageParser';

import 'react-chatbot-kit/build/main.css'
import './Bot.css'

const Bot = () => {
    return (
        <div className='chat-bot-root'>
            <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
            />
        </div>
    );
};

export default Bot;