const API_HOST = 'therundown-therundown-v1.p.rapidapi.com';
const API_KEY = 'eac111f617mshf534f8af13041b4p1b1d70jsn40a2e68bbf09';

const urlParams = new URLSearchParams(window.location.search);
const sportId = urlParams.get('sportId');
const sportName = urlParams.get('sportName') || 'Selected Sport';
const teamFilter = (urlParams.get('team') || '').toLowerCase();
const selectedDate = urlParams.get('date') || new Date().toISOString().split('T')[0];

const matchesContainer = document.getElementById('matches-container');
const sportNameElem = document.getElementById('sport-name');
const dateElem = document.getElementById('date');
const backHomeBtn = document.getElementById('back-home');

sportNameElem.textContent = sportName;
dateElem.textContent = `Matches for ${selectedDate}`;

backHomeBtn.addEventListener('click', () => {
  window.location.href = 'betsmart.html'; // changed from index.html to your home page name
});

async function fetchMatches() {
  try {
    const eventsUrl = `https://${API_HOST}/sports/events?sport_id=${sportId}&date=${selectedDate}`;

    const response = await fetch(eventsUrl, {
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY
      }
    });

    const data = await response.json();

    if (!data.events || data.events.length === 0) {
      matchesContainer.innerHTML = '<p>No matches found for this date.</p>';
      return;
    }

    // Filter by team name if provided
    const filteredEvents = teamFilter
      ? data.events.filter(event =>
          event.teams.away.name.toLowerCase().includes(teamFilter) ||
          event.teams.home.name.toLowerCase().includes(teamFilter)
        )
      : data.events;

    if (filteredEvents.length === 0) {
      matchesContainer.innerHTML = '<p>No matches found for the specified team on this date.</p>';
      return;
    }

    matchesContainer.innerHTML = '';

    for (const event of filteredEvents) {
      const matchCard = document.createElement('div');
      matchCard.className = 'match-card';

      const teams = `${event.teams.away.name} vs ${event.teams.home.name}`;
      const startTime = new Date(event.event_time * 1000).toLocaleTimeString();

      const matchInfo = document.createElement('h3');
      matchInfo.textContent = `${teams} - ${startTime}`;
      matchCard.appendChild(matchInfo);

      const oddsDiv = document.createElement('div');
      oddsDiv.className = 'odds-container';

      const moneyline = event.odds?.moneyline;

      if (moneyline) {
        // If available, show the sportsbook site nicely
        const sportsbook = event.sites && event.sites.length > 0 ? event.sites[0].site_nice : 'N/A';

        const homeOdds = moneyline.home;
        const awayOdds = moneyline.away;
        const drawOdds = moneyline.draw;

        const oddsText = document.createElement('p');
        oddsText.innerHTML = `<strong>${sportsbook}</strong>: Home ${homeOdds}, Away ${awayOdds}${drawOdds ? ', Draw ' + drawOdds : ''}`;
        oddsDiv.appendChild(oddsText);
      } else {
        oddsDiv.textContent = 'No odds available';
      }

      matchCard.appendChild(oddsDiv);
      matchesContainer.appendChild(matchCard);
    }
  } catch (error) {
    console.error('Error fetching matches:', error);
    Toastify({
      text: "Failed to load matches. Please try again later.",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "#e74c3c",
    }).showToast();
  }
}

fetchMatches();
