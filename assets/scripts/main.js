// Main Variables
let theInput = document.querySelector(".input");
let getButton = document.querySelector(".get__repo-btn");
let repoData = document.querySelector(".show__data");

getButton.onclick = function () {
  getRepo();
};

function fetchReop() {
  fetch(`https://api.github.com/users/${theInput.value}/repos`)
    .then((res) => {
      if (res.status === 404) {
        throw new Error("User not found");
      } else {
        return res.json();
      }
    })
    .then((repos) => {
      repoData.innerHTML = "";
      repos.forEach((repo) => {
        // Create The Main Div
        let mainDiv = document.createElement("div");

        // Create The Repo Info Div
        let repoInfo = document.createElement("div");
        repoInfo.className = "repo__info";

        // Create Repo Name Text
        let repoName = document.createTextNode(repo.name);

        // Append The Text To Main Div
        mainDiv.appendChild(repoName);

        // Create Repo URL
        let theUrl = document.createElement("a");

        // Create Repo Url Text
        let theurlText = document.createTextNode("Vist");

        // Add The HyperText Referance "href"
        theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

        // Set Attribute Blank

        theUrl.setAttribute("target", "_blank");

        // Append The Repo Url Text To Anour Tag
        theUrl.appendChild(theurlText);

        // Append Url Anchor To Repo Info Div
        repoInfo.appendChild(theUrl);

        // Create Start Count Span
        let starsSpan = document.createElement("span");

        // Create Stars Cont Text
        let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);

        // Append Stars Text To Stars Span
        starsSpan.appendChild(starsText);

        // Append Stars Span to Main Div
        repoInfo.appendChild(starsSpan);

        // Appent Repo info To Main Div
        mainDiv.appendChild(repoInfo);
        // Add Class on Main Div
        mainDiv.className = "repo__data";
        // Append The Main Div To Container
        repoData.appendChild(mainDiv);
      });
    })
    .catch((error) => {
      if (error.message === "User not found") {
        repoData.innerHTML = `<span>User not found.</span>`;
      }
    });
}

// Get Repos Functions
function getRepo() {
  if (theInput.value == "") {
    repoData.innerHTML = `<span>Please Write GitHub User Name.</span>`;
  } else {
    fetchReop();
  }
}
