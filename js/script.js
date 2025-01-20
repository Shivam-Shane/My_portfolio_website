document.getElementById("summarizeButton").addEventListener("click", async (event) => {

  event.preventDefault(); // Prevent default anchor behavior
  console.log("Summarize button clicked."); // Debugging message

  // const currentUrl = window.location.href; // Get the current portfolio page URL
  const currentUrl = "https://shivam-shane.github.io/My_portfolio_website/index.html"; // For testing purposes, replace with actual portfolio URL
  const apiEndpoint = "https://portfolio-summarizer-4pc8gexho-shivams-projects-c0a530a5.vercel.app/";
  const response = await fetch(`${apiEndpoint}?url=${encodeURIComponent(currentUrl)}`);

if (response.ok) {
  console.log("Request successful, but response is opaque.");
  // No access to response body
} else {
  console.error("Failed to fetch.");
}


  const modal = document.getElementById("summaryModal");
  const resultElement = document.getElementById("result");
});
//   if (response.ok) {
//     const result = await response.json();
//     resultElement.innerHTML = `<pre>${JSON.stringify(result.summary, null, 2)}</pre>`;
//     modal.style.display = "block"; // Show the modal
//   } else {
//     resultElement.innerText = "Error: Unable to fetch summary.";
//     modal.style.display = "block"; // Show the modal
//   }
// });

// Modal Close Logic
document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("summaryModal").style.display = "none";
});

// Close Modal when clicking outside of content
window.addEventListener("click", (event) => {
  const modal = document.getElementById("summaryModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
});