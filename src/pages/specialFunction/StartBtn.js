import React from 'react';

import ChatBubbleContainer from './ChatBubbleContainer'

const StartBtn = (props) => {
    const selectorList = [
        { tag: 1, label: "👤 Account" },
        { tag: 2, label: "📦 Product" },
        { tag: 3, label: "💳 Payment" },
        { tag: 4, label: "🚚 Delivery" },
        { tag: 5, label: "📝 Feedback/Suggestion" },
        { tag: 6, label: "🛒 Order" },
    ];
    

    return (
        <div className = 'startBtn-container'>
            What brings you here today? Are you facing any challenges in a specific category, or is there a particular category you'd like to learn more about?.
            click on the category that best describes your needs.
            <ChatBubbleContainer props = {props} selectorList = {selectorList}/>
        </div>
    )
};

export default StartBtn;