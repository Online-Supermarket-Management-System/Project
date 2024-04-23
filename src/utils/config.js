import { createChatBotMessage } from 'react-chatbot-kit'

import StartBtn from '../pages/specialFunction/StartBtn'
import SelectorBox from '../pages/specialFunction/SelectorBox'

const config = {
  initialMessages: [createChatBotMessage(`Welcome to Northway Advisor!`, {
    widget: "startBtn"
  })],
  botName: 'Northway Explorer',
  customStyles: {
    botMessageBox: {
      backgroundColor: '#5ccc9d'
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    }
  },
  widgets: [
    {
        widgetName: "startBtn",
        widgetFunc: (props) => <StartBtn {...props} />,
    },
    {
      widgetName: 'selectorBox',
      widgetFunc: (props) => <SelectorBox {...props} />,
    },
]
};

export default config;