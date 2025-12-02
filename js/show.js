const username_list = document.getElementById('accounts-list');

async function loadUsers() {
    const response = await fetch("http://127.0.0.1:8000/show", {
        method: "GET"
    });

    const data = await response.json();   // convert to actual JSON array

    // If empty
    if (data.length === 0) {
        username_list.innerText = "No accounts yet";
        return;
    }

    // Build readable output
    let output = "";
    data.forEach(user => {
        output += `• ${user.username}<br>`;
    });

    username_list.style.color = "white";
    username_list.innerHTML = output;
}

loadUsers();
