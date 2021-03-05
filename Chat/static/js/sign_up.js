Form.onsubmit = async (e) => {
    e.preventDefault();
    let response = await fetch('http://127.0.0.1:8000/api/sign/up/', {
        method: 'POST',
        body: new FormData(Form)
    });
    if (response.ok) {
        location.replace("/sign/in/");
    } else {
        let result = await response.json();
        alert(result.message);
    }
};