console.log("[System] Start Create Session.")

document.getElementById("create-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // stop page reload

    const username = document.getElementById("new-username").value.trim();
    const password = document.getElementById("new-password").value.trim();
    const alert_msg = document.getElementById('create-alert_msg');

    if (!username || !password) {
        alert_msg.innerText = "Please fill in both username and password.";
        alert_msg.style.color = "red";
        return;
    }

    console.log("[System] Button Clicked")
    console.log("Username:", username);
    console.log("Password:", password);

    const response = await fetch("http://127.0.0.1:8000/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.error) {
        alert_msg.innerText = data.error;
        alert_msg.style.color = "yellow"
        return;
    } else {
        alert_msg.innerText = "Account successfully created.";
        alert_msg.style.color = "lime";

        if (typeof loadUsers === "function") {
            loadUsers();
        }
    }

    console.log("[System]", data.username, " is added")
});
