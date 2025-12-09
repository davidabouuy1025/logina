console.log("[System] Delete-All Loaded");

document.getElementById("delete-all-btn").addEventListener("click", async () => {
    const alertBox = document.getElementById("delete-alert");

    // safety confirmation
    const confirmDelete = confirm("⚠️ This will delete ALL accounts permanently.\nContinue?");
    if (!confirmDelete) return;

    // send DELETE request
    try {
        const response = await fetch("http://127.0.0.1:8000/delete_all", {
            method: "DELETE"
        });

        const data = await response.json();

        if (data.error) {
            alertBox.style.color = "red";
            alertBox.innerText = data.error;
            return;
        }

        alertBox.style.color = "lime";
        alertBox.innerText = "All accounts deleted successfully.";

        // optional: refresh account listing
        if (typeof loadUsers === "function") {
            loadUsers();
        }

    } catch (err) {
        alertBox.style.color = "red";
        alertBox.innerText = "Server error or offline.";
        console.error("[System] Delete-All Error:", err);
    }
});
