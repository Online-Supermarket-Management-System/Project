import React from 'react';

const ChatBubbleContainer = ({props, selectorList}) => {
    const widgetAction = (tag) => {
        props.actions.widgetAction(tag)
    }

    return (
        <div className = 'chat-bubbleX-container'>
            {
                selectorList && selectorList.map((item) => {
                    return (
                        <div className="single-button" onClick={() => widgetAction(item.tag)} key = {item.tag}>
                            <span>{item && item.label}</span>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default ChatBubbleContainer;