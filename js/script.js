// Production code - Spinner element 
const spinner = document.getElementById("spinner");
document.getElementById("summarizeButton").addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    spinner.style.display = "block"; // Show the spinner until the response is received
    const currentUrl = window.location.href; // Get the current portfolio page URL

    // Production API endpoint
    const apiEndpoint = "https://portfolio-summarizer-4pc8gexho-shivams-projects-c0a530a5.vercel.app/";

    try {
        // Making the API call to the production endpoint
        const response = await fetch(`${apiEndpoint}?url=${encodeURIComponent(currentUrl)}`);
        console.log(response);
        const modal = document.getElementById("summaryModal");
        const resultElement = document.getElementById("result");

        if (response.ok) {
            const result = await response.json();
            console.log(result);
            // Function to create a list of items (e.g., Achievements, Skills, etc.)
            const createList = (items) => {
                return `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
            };

            // Function to format experience section
            const formatExperience = (experiences) => {
                return experiences.map(exp => `
                    <div>
                        <h3>${exp.Company || "No Company Name"} (${exp.Location || "No Location"})</h3>
                        <p><strong>Duration:</strong> ${exp.Duration || "N/A"}</p>
                        <h4>Achievements:</h4>
                        ${createList(exp.Achievements || ["No achievements available"])}
                    </div>
                `).join('');
            };

            // Function to format projects section
            const formatProjects = (projects) => {
                return projects.map(project => `
                    <div>
                        <h3>${project.Name || "No Project Name"}</h3>
                        <p><strong>Duration:</strong> ${project.Duration || "N/A"}</p>
                        <p>${project.Description || "No description available"}</p>
                    </div>
                `).join('');
            };

            // Generate formatted summary content
            const summary = result.summary;
            const formattedSummary = `
                <div class="summary-container">
                    <h3>Role</h3>
                    <p>${summary.Role || "No Role Available"}</p>
                    
                    <h3>Experience</h3>
                    ${formatExperience(summary.Experience || [])}
                    
                    <h3>Projects</h3>
                    ${formatProjects(summary.Projects || [])}
                    
                    <h3>Skills</h3>
                    ${createList(summary.Skills || ["No skills available"])}
                    
                    <h3>Description</h3>
                    <p>${summary.Description || "No description available"}</p>
                </div>
            `;

            // Display the content in the modal
            resultElement.innerHTML = formattedSummary;

            // Hide spinner and show modal
            spinner.style.display = "none";
            modal.style.display = "block";
        } else {
            resultElement.innerText = "Error: Unable to fetch summary.";
            spinner.style.display = "none";
            modal.style.display = "block";
        }
    } catch (error) {
        console.error('Error fetching the summary:', error);
        const modal = document.getElementById("summaryModal");
        const resultElement = document.getElementById("result");
        resultElement.innerText = "Error: Unable to fetch summary.";
        spinner.style.display = "none";
        modal.style.display = "block";
    }
});

// Modal close logic
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
