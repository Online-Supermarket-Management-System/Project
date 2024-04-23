import React from 'react';

const MessageParser = ({ children, actions }) => {
  const { checker } = children.props.state;

  const parse = (message) => {
    const lowercaseMessage = message.toLowerCase(); // Convert the message to lowercase for case insensitivity
    if (lowercaseMessage.includes('hi') || lowercaseMessage.includes('hello')) {
      actions.handleHello();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;