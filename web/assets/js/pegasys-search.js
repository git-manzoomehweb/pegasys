document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".reserve-field.departure-route").forEach(parent => {
        let departureElement = parent.querySelector(".auto-fit.clear-both.text-base.text-textColor");
        if (departureElement) {
            departureElement.textContent = "مبدا";
        }
    });
});
