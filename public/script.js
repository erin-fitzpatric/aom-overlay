async function fetchLeaderboard() {
  try {
    const response = await fetch("/api/leaderboard");
    const data = await response.json();

    const leaderboardElement = document.getElementById("leaderboard");

    // Check if data exists
    if (data.leaderboardStats.length > 0) {
      const stats = data.leaderboardStats[0];
      const totalGames = stats.wins + stats.losses;
      const winPercent = (stats.wins / totalGames) * 100;
      const statDiv = document.createElement("div");
      const name = data.statGroups[0].members[0].alias;
      statDiv.innerHTML = `
        <div class="flex items-center">
          <span class="stat">${name} - #${stats.rank}</span>
          <div style="color: white;">
            <span class="stat">W ${stats.wins} L ${stats.losses}</span>
            <span class="stat">${winPercent.toFixed(1)}%</span>
          </div>
        </div>
      `;
      leaderboardElement.appendChild(statDiv);
    } else {
      leaderboardElement.innerHTML = "<p>No data available.</p>";
    }
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
  }
}

// Fetch data when the page loads
window.onload = fetchLeaderboard;
