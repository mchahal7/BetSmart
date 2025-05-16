console.log('Script loaded');
console.log('Fetching sports...');

const sportSelect = document.getElementById('sport-select');
const viewMatchesBtn = document.getElementById('view-matches');
const teamSearch = document.getElementById('team-search');

const API_HOST = 'therundown-therundown-v1.p.rapidapi.com';
const API_KEY = 'eac111f617mshf534f8af13041b4p1b1d70jsn40a2e68bbf09';

// Fetch and populate sports dropdown
async function fetchSports() {
  try {
    const response = await fetch('https://therundown-therundown-v1.p.rapidapi.com/sports', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY,
      }
    });
    const data = await response.json();

    sportSelect.innerHTML = '<option value="">-- Select a Sport --</option>';
    data.sports.forEach(sport => {
      const option = document.createElement('option');
      option.value = sport.sport_id;
      option.textContent = sport.sport_name;
      sportSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching sports:', error);
    Toastify({
      text: "Failed to load sports. Please try again later.",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "#e74c3c",
    }).showToast();
  }
}

// Redirect to daily matches page with query params
viewMatchesBtn.addEventListener('click', () => {
  const selectedSportId = sportSelect.value;
  const teamQuery = teamSearch.value.trim();

  if (!selectedSportId) {
    Toastify({
      text: "Please select a sport first.",
      duration: 2000,
      gravity: "top",
      position: "center",
      backgroundColor: "#f39c12",
    }).showToast();
    return;
  }

  const sportName = sportSelect.options[sportSelect.selectedIndex].text;

  // Pass team query optionally and default date to today (can be changed later)
  const params = new URLSearchParams({
    sportId: selectedSportId,
    sportName: sportName,
    team: teamQuery,
    date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
  });

  window.location.href = `daily-matches.html?${params.toString()}`;
});

// Initialize dropdown on page load
fetchSports();
