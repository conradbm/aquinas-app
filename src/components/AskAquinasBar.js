import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {FaPlus, FaMinus} from 'react-icons/fa';

class AskAquinasBar extends React.Component {

    state = {
        displayChatbox:false,
        displayChatboxStyle:"none",
    }

    /*
    static propTypes = {
        pageId: PropTypes.string.isRequired,
        appId: PropTypes.string.isRequired,

        shouldShowDialog: PropTypes.bool,
        htmlRef: PropTypes.string,
        minimized: PropTypes.bool,
        themeColor: PropTypes.string,
        loggedInGreeting: PropTypes.string,
        loggedOutGreeting: PropTypes.string,
        greetingDialogDisplay: PropTypes.oneOf(['show', 'hide', 'fade']),
        greetingDialogDelay: PropTypes.number,
        autoLogAppEvents: PropTypes.bool,
        xfbml: PropTypes.bool,
        version: PropTypes.string,
        language: PropTypes.string,
        debug: PropTypes.bool,
        onCustomerChatDialogShow: PropTypes.func,
        onCustomerChatDialogHide: PropTypes.func,
    };

    */
    render(){
        return(
            <div className="chatbar-footer">
                
            </div>
        )
    }
}

export default AskAquinasBar;