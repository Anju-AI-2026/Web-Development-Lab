function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    hours = String(hours).padStart(2, "0");

    const time = `${hours}:${minutes}:${seconds} ${period}`;

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    const date = now.toLocaleDateString("en-US", options);

    document.getElementById("time").textContent = time;
    document.getElementById("date").textContent = date;
}

updateClock();
setInterval(updateClock, 1000);