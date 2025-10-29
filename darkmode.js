
setInitialTheme();

function setInitialTheme() {
    const body = document.body;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (prefersDark) {
        body.classList.add("night");
    } else {
        body.classList.add("day");
    }
}

function toggledarkmode() {
    const body = document.body;

    if (body.classList.contains("day")) {
        body.classList.remove("day");
        body.classList.add("night");
    } else {
        body.classList.remove("night");
        body.classList.add("day");
    }
}
