document.addEventListener("DOMContentLoaded", function () {
    let siteName = "portfolio"; 

    if (localStorage.getItem("user_location_" + siteName)) {
        console.log("Location already stored for", siteName);
        return; // Exit if already saved
    }

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;

                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`) // free we can use google's paid one for more accurate result
                    .then(response => response.json())
                    .then(data => {
                        let locationDetails = {
                            siteName: siteName,
                            latitude: lat,
                            longitude: lng,
                            city: data.address.city || data.address.town || "Unknown",
                            state: data.address.state || "Unknown",
                            country: data.address.country || "Unknown",
                            postalCode: data.address.postcode || "Unknown"
                        };

                        // Store location in localStorage
                        localStorage.setItem("user_location_" + siteName, JSON.stringify(locationDetails));
                        console.log("Location stored for", siteName, locationDetails);

                        // Send data to Google Sheets
                        sendLocationToGoogleSheets(locationDetails);
                    })
                    .catch(error => console.error("Error fetching location details:", error));
            },
            function (error) {
                console.error("Error getting location:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
});

function sendLocationToGoogleSheets(locationData) {
    let scriptURL = "https://script.google.com/macros/s/AKfycbzl8jN2GdBDgUixz44HRUSIQklis9y5SmnJ2GcUdqDqt7f2hPpHJGX0pQS8xfuPDdMWZg/exec"; // Replace with your Apps Script URL
    
    fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(locationData)
    })
    .then(() => console.log("Location sent"))
    .catch(error => console.error("Error sending location:", error));
}
