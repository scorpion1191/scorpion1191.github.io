function hideChatbot(){
    document.getElementsByClassName("chatbot-container")[0].style.display = "none";
    document.getElementsByClassName("chatbot-icon")[0].style.display = "block";
}

function showChatbot(){
    document.getElementsByClassName("chatbot-container")[0].style.display = "block";
    document.getElementsByClassName("chatbot-icon")[0].style.display = "none";
}

function addBotmessagesInScreen(msg){
    var container = document.getElementsByClassName("chatList")[0].getElementsByTagName("ul")[0];
    var node = document.createElement("LI");
    node.classList.add("bot") 
    var imageCont = document.createElement("Div"); 
    imageCont.classList.add("icon")
    var imageHold = document.createElement("P");
    imageHold.classList.add("chatImageCont")
    imageCont.appendChild(imageHold)
    var msgCont = document.createElement("Div"); 
    msgCont.classList.add("msg")
    var textnode = document.createTextNode(msg);    
    msgCont.appendChild(textnode);    
    node.appendChild(imageCont);
    node.appendChild(msgCont);
    container.appendChild(node);
}

function addClientmessagesInScreen(msg){
    var container = document.getElementsByClassName("chatList")[0].getElementsByTagName("ul")[0];
    var node = document.createElement("LI");
    node.classList.add("client") 
    var imageCont = document.createElement("Div"); 
    imageCont.classList.add("icon")
    var imageHold = document.createElement("P");
    imageHold.classList.add("chatImageCont")
    imageCont.appendChild(imageHold)
    var msgCont = document.createElement("Div"); 
    msgCont.classList.add("msg")
    var textnode = document.createTextNode(msg);    
    msgCont.appendChild(textnode);   
    node.appendChild(msgCont); 
    node.appendChild(imageCont);
    container.appendChild(node);
}

function getClientMsg(e,value){
    if (e.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        addClientmessagesInScreen(value);
        e.target.value = ""
        // Trigger the button element with a click
        df_text_query(value);
      }
}

function transformBotMsg(data){
    if(data && data['fulfillmentMessages']){
        addBotmessagesInScreen(data['fulfillmentText'])
    }else{
        addBotmessagesInScreen("Facing some technical issue , will surely get back to you in few moments")
    }
    var elmnt = document.getElementsByClassName("chatList")[0];
    elmnt.scrollTop = elmnt.scrollHeight;
}


function displayQuickReplies(data){

}

function df_text_query (queryText) {
    let says = {
        speaks: 'user',
        msg: {
            text : {
                text: queryText
            }
        }
    }

    fetch('https://anonymus-chatbot.herokuapp.com/api/df_text_query', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({text: queryText,userID:"my_portfolio"})
        }).then(response => response.json()).then((data) =>{
                transformBotMsg(data);
        }).catch((err) =>{
                transformBotMsg();
        })
};


function df_event_query(eventName) {

    const res = axios.post('https://anonymus-chatbot.herokuapp.com/api/df_event_query',  {event: eventName, userID: cookies.get('userID')});

    for (let msg of res.data.fulfillmentMessages) {
        let says = {
            speaks: 'bot',
            msg: msg
        }

        this.setState({ messages: [...this.state.messages, says]});
    }
};


