// Production code - Spinner element 
const spinner = document.getElementById("spinner");  // Get the spinner element to show/hide during loading

// Add event listener to the summarize button
document.getElementById("summarizeButton").addEventListener("click", async (event) => {
    event.preventDefault();  // Prevent default behavior of anchor tag (which would cause a page reload)
    spinner.style.display = "block";  // Show the spinner until the response is received
    const currentUrl = window.location.href;  // Get the current portfolio page URL

    // Production API endpoint for fetching summary
    const apiEndpoint = "https://portfolio-summarizer-4pc8gexho-shivams-projects-c0a530a5.vercel.app/";

    try {
        // Make the API call using the Fetch API and append the current URL as a query parameter
        const response = await fetch(`${apiEndpoint}?url=${encodeURIComponent(currentUrl)}`);

        const modal = document.getElementById("summaryModal");  // Get the modal element where the summary will be displayed
        const resultElement = document.getElementById("result");  // Get the result container to display the fetched summary

        // Check if the response from the API is successful (status code 200)
        if (response.ok) {
            const result = await response.json();  // Parse the JSON response from the API

                      // Parse the Markdown string into HTML using the marked library
          const htmlSummary = marked(markdownSummary);

          // Insert the HTML content into the resultElement
          resultElement.innerHTML = `<div style="white-space: pre-wrap; word-break: break-word;">${htmlSummary}</div>`;

            // Hide the spinner and show the modal containing the summary
            spinner.style.display = "none";  // Hide the spinner now that the content is loaded
            modal.style.display = "block";  // Show the modal with the summary content
        } else {
            // If the API response is not successful, show an error message
            resultElement.innerText = "Error: Unable to fetch summary.";
            spinner.style.display = "none";  // Hide the spinner
            modal.style.display = "block";  // Show the modal with error message
        }
    } catch (error) {
        // Catch and handle any errors that occur during the fetch operation (e.g., network issues)
        console.error('Error fetching the summary:', error);
        const modal = document.getElementById("summaryModal");
        const resultElement = document.getElementById("result");
        resultElement.innerText = "Error: Unable to fetch summary.";  // Show error message
        spinner.style.display = "none";  // Hide the spinner
        modal.style.display = "block";  // Show the modal with error message
    }
});

// Modal close logic - Close the modal when the close button is clicked
document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("summaryModal").style.display = "none";  // Hide the modal when close button is clicked
});

// Close Modal when clicking outside of content (click outside the modal)
window.addEventListener("click", (event) => {
  const modal = document.getElementById("summaryModal");
  if (event.target == modal) {
    modal.style.display = "none";  // Hide the modal if the user clicks outside the modal content
  }
});
