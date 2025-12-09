console.log("[System] Delete-User Loaded");

document.getElementById("delete-user").addEventListener("click", async () => {
    const username = prompt("Enter username to delete:");

    if (!username) return;

    const alertBox = document.getElementById("delete-alert");

    const confirmDelete = confirm(`Delete '${username}' permanently?`);
    if (!confirmDelete) return;

    try {
        const response = await fetch(`http://127.0.0.1:8000/delete_user/${username}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (data.error) {
            alertBox.style.color = "red";
            alertBox.innerText = data.error;
            return;
        }

        alertBox.style.color = "lime";
        alertBox.innerText = `User '${username}' deleted.`;

        if (typeof loadUsers === "function") loadUsers();

    } catch (err) {
        alertBox.style.color = "red";
        alertBox.innerText = "Server error.";
        console.error(err);
    }
});
