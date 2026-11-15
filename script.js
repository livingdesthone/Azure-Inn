
// AZURE INN HOTEL
// Booking form interactions

document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById("booking-form");
    const checkin = document.getElementById("checkin");
    const checkout = document.getElementById("checkout");
    const bookingMessage = document.getElementById("booking-message");

    if (!bookingForm || !checkin || !checkout || !bookingMessage) {
        console.error("Booking form elements could not be found.");
        return;
    }

    // Set today's date as the earliest check-in date
    const today = new Date();
    const todayString = formatDate(today);

    checkin.min = todayString;
    checkout.min = todayString;

    // Update the earliest checkout date when check-in changes
    checkin.addEventListener("change", function () {
        if (!checkin.value) return;

        const selectedDate = new Date(checkin.value + "T00:00:00");
        selectedDate.setDate(selectedDate.getDate() + 1);

        const earliestCheckout = formatDate(selectedDate);

        checkout.min = earliestCheckout;

        if (checkout.value && checkout.value <= checkin.value) {
            checkout.value = "";
        }
    });

    // Handle booking form submission
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const checkinDate = checkin.value;
        const checkoutDate = checkout.value;

        if (!checkinDate || !checkoutDate) {
            showMessage("Please select both check-in and check-out dates.", "error");
            return;
        }

        if (checkoutDate <= checkinDate) {
            showMessage("Check-out must be after check-in.", "error");
            return;
        }

        showMessage(
            "Thank you for choosing Azure Inn! Your booking request interface is ready. Actual reservations will be enabled after we connect the hotel booking system.",
            "success"
        );
    });

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    function showMessage(message, type) {
        bookingMessage.textContent = message;
        bookingMessage.className = type;
    }
});
