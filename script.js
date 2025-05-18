const API_KEY = 'd7f4b5041779c118d7b49d9f09df1b95';

const sportSelect = document.getElementById('sport-select');
const viewMatchesBtn = document.getElementById('view-matches');
const teamSearch = document.getElementById('team-search');

async function fetchSports() {
  try {
    const response = await fetch(`https://api.the-odds-api.com/v4/sports?apiKey=${API_KEY}`);
    const sports = await response.json();

    // this empties the dropdown and fills it with options
    sportSelect.innerHTML = '<option value="">-- Select a Sport --</option>';
    sports.forEach(sport => {
      const option = document.createElement('option');
      option.value = sport.key; // use sport key for fetching odds later
      option.textContent = sport.title;
      sportSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Failed to fetch sports:', error);
    alert('Failed to load sports. Please try again later.');
  }
}

viewMatchesBtn.addEventListener('click', () => {
  const selectedSportKey = sportSelect.value;
  const teamQuery = teamSearch.value.trim();

  if (!selectedSportKey) {
    alert('Please select a sport first.');
    return;
  }

  // takes you to the next page (daily-matches.html)
  const sportName = sportSelect.options[sportSelect.selectedIndex].text;
  window.location.href = `daily-matches.html?sportKey=${selectedSportKey}&sportName=${encodeURIComponent(sportName)}&team=${encodeURIComponent(teamQuery)}`;
});

if (annyang) {
  const commands = {
    'view matches': () => document.getElementById('view-matches').click(),
    'go to about': () => window.location.href = 'about.html',
    'search for *team': team => {
      document.getElementById('team-search').value = team;
    },
    'select sport *sport': sport => {
      const options = Array.from(document.getElementById('sport-select').options);
      const match = options.find(o => o.text.toLowerCase().includes(sport.toLowerCase()));
      if (match) sportSelect.value = match.value;
    }
  };

  annyang.addCommands(commands);
}

// third fetch call
fetch('http://localhost:3001/')
  .then(res => res.text())
  .then(data => console.log('Backend says:', data))
  .catch(err => console.error('Error talking to backend:', err));

fetchSports();
