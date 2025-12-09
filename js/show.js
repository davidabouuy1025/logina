const username_list = document.getElementById('accounts-list');
const pagination = document.getElementById('pagination');

let users = [];
let usersPerPage = 10;
let currentPage = 1;

async function loadUsers() {
    const response = await fetch("http://127.0.0.1:8000/show");
    users = await response.json();

    if (users.length === 0) {
        username_list.innerHTML = "No accounts yet";
        pagination.innerHTML = "";
        return;
    }

    renderPage(currentPage);
    renderPagination();
}

function renderPage(page) {
    currentPage = page;

    username_list.innerHTML = ""; // clear

    const start = (page - 1) * usersPerPage;
    const end = start + usersPerPage;

    const pageUsers = users.slice(start, end);

    pageUsers.forEach(u => {
        const item = document.createElement("div");
        item.classList.add("user-item");
        item.innerHTML = `• ${u.username}`;
        username_list.appendChild(item);
    });
}

function renderPagination() {
    pagination.innerHTML = ""; // reset

    const pages = Math.ceil(users.length / usersPerPage);

    for (let i = 1; i <= pages; i++) {
        const btn = document.createElement("button");
        btn.classList.add("page-btn");
        btn.innerText = i;

        btn.addEventListener("click", () => {
            renderPage(i);
        });

        pagination.appendChild(btn);
    }
}

loadUsers();
