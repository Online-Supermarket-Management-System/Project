import React from 'react'

import ChatBubbleContainer from './ChatBubbleContainer'

const SelectorBox = (props) => {
    console.log(props)
    // Get options specific to the current tag
    const options = props.state.options && props.state.options[props.state.tag] ? props.state.options[props.state.tag] : [];

    console.log(options)

    return (
        <div className = 'startBtn-container'>
            What brings you here today? Please use the navigation below or ask me anything about our product.
            <ChatBubbleContainer props = {props} selectorList = {options}/>
        </div>
    )
}

export default SelectorBox