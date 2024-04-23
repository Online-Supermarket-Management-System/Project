import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hi there! How can I assist you?');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  const widgetAction = (tag) => {
    let message = ''
    let options = []

    if (tag === 1) {
      message = createChatBotMessage('Welcome to the Account section! How can I assist you today?',
          {
              widget: 'selectorBox'
          }
      );

      options = [
        { tag: 7, label: "🔒 Forgot Password" },
        { tag: 8, label: "📧 Forgot Email" },
        { tag: 9, label: "🔄 Change Details" },
        { tag: 10, label: "🔑 Change Password" },
        { tag: 11, label: "🛒 Past Purchases" },
        { tag: 12, label: "🗑️ Delete Account" },
        { tag: 13, label: "🛠️ Tech Issue" },
        { tag: 14, label: "🆕 Problem Creating New Account" },
        { tag: 15, label: "🔒 Security Concerns" }
    ]
  }  

    if (tag === 2) {
      message = createChatBotMessage('You just clicked Using ChatGPT',
        {
          widget: 'selectorBox'
        }
      )

      options = [
        { tag: 7, label: "outstanding balance" },
        { tag: 8, label: "E-Bill" }
      ]
    }
    if (tag === 3) {
      message = createChatBotMessage('You just clicked I have Questions',
        {
          widget: 'selectorBox'
        }
      )

      options = [
        { tag: 9, label: "📱 Mobile outstanding balance" },
        { tag: 10, label: "📧 Get E-Bill" }
      ]
    }

    if (tag === 7) {
      message = createChatBotMessage('If you have forgotten your password, you can click on the Forgot Password button on the login page. If you have forgotten your ID, kindly reach out to us by email (northway@gmail.com) or telephone (0771234567).');
  }  

    updateState(message, options, tag)
  }

  const updateState = (message, newOptions, tag) => {
    setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
        options: {
          ...prev.options,
          [tag]: newOptions, // Store options specific to the tag
        },
        tag: tag
    }))
}

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            widgetAction
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;