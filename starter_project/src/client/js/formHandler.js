import { checkForUrl } from "./urlChecker";

const serverURL = "http://localhost:8000/sentiment";

const form = document.getElementById("urlForm");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const formText = document.getElementById("name").value;

  if (!checkForUrl(formText)) {
    alert("Please enter a valid URL");
    return;
  }

  sendData({ url: formText })
    .then((data) => {
      displayResults(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("sentimentType").innerHTML = "";
      document.getElementById("sentimentScore").innerHTML = "";
      document.getElementById("additionalInfo").innerHTML =
        "Error fetching sentiment analysis results. Please try again later.";
    });
}

async function sendData(data = {}) {
  const response = await fetch(serverURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}

function displayResults(data) {
  // Example of expected response structure
  const sentimentText = data.sentence_list[0].text || "N/A";
  const sentimentScore = data.score_tag || "N/A";
  const agreement = data.agreement || "N/A";
  const subjectivity = data.subjectivity || "N/A";
  const sentimentConfidence = data.confidence || "N/A";

  document.getElementById(
    "sentimentConfidence"
  ).innerHTML = `<strong>Sentiment Confidence:</strong> "${sentimentConfidence}"`;
  document.getElementById(
    "sentimentText"
  ).innerHTML = `<strong>Sentiment Text:</strong> "${sentimentText}"`;
  document.getElementById(
    "sentimentScore"
  ).innerHTML = `<strong>Sentiment Score:</strong> ${sentimentScore}`;
  document.getElementById("additionalInfo").innerHTML = `
        <strong>Agreement:</strong> ${agreement} <br />
        <strong>Subjectivity:</strong> ${subjectivity}
    `;
}

export { handleSubmit };
