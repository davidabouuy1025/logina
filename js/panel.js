// toggle panel
const panel = document.getElementById("side-panel");
const toggleBtn = document.getElementById("toggle-panel");

toggleBtn.addEventListener("click", () => {
    panel.classList.toggle("expanded");
});

// switch sections
const sectionBtns = document.querySelectorAll(".section-btn");
const featureCards = document.querySelectorAll(".feature-card");

sectionBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const section = btn.dataset.section;

        featureCards.forEach(card => {
            if (card.id === section) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});
