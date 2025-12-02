console.log("[System] Start Session.")

document.getElementById("login-form").addEventListener("submit", async(e) => {
    e.preventDefault(); // stop page reload

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const alert_msg = document.getElementById('alert_msg');

    // JS uses ! for NOT
    if (!username || !password) {
        alert_msg.innerText = "Please fill in both username and password.";
        return;
    }

    console.log("[System] Button Clicked")
    console.log("Username:", username);
    console.log("Password:", password);

    const response = await fetch("http://127.0.0.1:8000/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, password })
    });

    const data = await response.json();

    console.log("[System]", data.username, " is added")
});
