// Create a function to generate project items
function createProjectItem(project) {
    const projectItem = document.createElement("li");
    projectItem.textContent = project.title;
    projectItem.addEventListener("click", () => {
        window.open(project.url, "_blank");
    });
    return projectItem;
}

// Fetch project data from an API or a JSON file
const projects = [
    {
        title: "Project 1",
        url: "https://www.example.com/project1"
    },
    {
        title: "Project 2",
        url: "https://www.example.com/project2"
    }
];

// Add project items to the project list
const projectList = document.getElementById("project-list");
projects.forEach(project => {
    const projectItem = createProjectItem(project);
    projectList.append(projectItem);
});