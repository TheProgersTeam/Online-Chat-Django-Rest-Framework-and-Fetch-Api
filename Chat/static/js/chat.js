// get a list of messages after opening the page
GetRequest();

// get a csrf token 
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// send our massege on server
async function PostRequest() {
    let response = await fetch('/api/message/', {
        method: 'POST',
        headers: {'X-CSRFToken': getCookie('csrftoken'), 'Content-Type': 'application/json'},
        body: JSON.stringify({'message_text': document.getElementById('message_text').value})
    });
}

// get messages list
async function GetRequest() {
    let response = await fetch('/api/message/', {
        method: 'GET',
    });
    // get server response
    let result = await response.json();
    if (response.ok) {

        // delete all messages from chat
        let chat = document.getElementById("chat");
        chat.remove();

        // create new chat container
        let div = document.createElement("div");
        div.id = "chat";
        document.getElementById("main").appendChild(div); 
        
        // add messages in chat container
        for (i in result.messages) {
            let div = document.createElement("div");
            div.id = "message";
            div.innerHTML = result.messages[i].creator + ' ~> ' + result.messages[i].message_text;
            document.getElementById("chat").appendChild(div); 
        };
    } else {
        alert(result.message);
    } 

    // time to restart messages list
    setTimeout(GetRequest, 1000);
} 