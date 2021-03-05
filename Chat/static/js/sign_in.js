Form.onsubmit = async (e) => {
    e.preventDefault();
    let response = await fetch('/api/sign/in/', {
        method: 'POST',
        body: new FormData(Form)
    });
    if (response.ok) {
        location.replace("/chat/");
    } else {
        let result = await response.json();
        alert(result.message);
    }
}; 