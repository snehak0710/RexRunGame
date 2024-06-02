var storedHighScorersString = localStorage.getItem("highScorers");
var storedHighScorers = JSON.parse(storedHighScorersString) || [];

// Sort the high scores array based on the scores in descending order
storedHighScorers.sort(function(a, b) {
  return b.score - a.score;
});

// Get the container element to display high scores
var highScoresContainer = document.getElementById("highScoresContainer");

// Check if there are high scores to display
if (storedHighScorers.length > 0) {
  // Create an ordered list to display high scores
  var highScoresList = document.createElement("ol");

  // Iterate through the sorted high scores and create list items
  storedHighScorers.forEach(function(highScorer) {
    var listItem = document.createElement("li");
    listItem.textContent = highScorer.name + " - " + highScorer.score;
    highScoresList.appendChild(listItem);
  });

  // Append the ordered list to the container
  highScoresContainer.appendChild(highScoresList);
} else {
  // Display a message if there are no high scores
  highScoresContainer.textContent = "No high scores yet.";
}
