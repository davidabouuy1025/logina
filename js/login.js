document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const alert_msg = document.getElementById('login-alert_msg');

    if (!username || !password) {
        alert_msg.innerText = "Please fill in both username and password.";
        return;
    }

    const response = await fetch("http://127.0.0.1:8000/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.error) {
        alert_msg.innerText = data.error;
        alert_msg.style.color = "red";
        return;
    }

    alert_msg.innerText = "Login successful!";
    alert_msg.style.color = "green";

    console.log("[System] Logged in:", data.username);
});
