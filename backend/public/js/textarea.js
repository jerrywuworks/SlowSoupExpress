document.querySelectorAll("textarea").forEach((textarea) => {
    textarea.addEventListener("input", () => {
        textarea.style.height = "auto"; // Reset height
        textarea.style.height = textarea.scrollHeight + "px"; // Expand to fit
    });
});