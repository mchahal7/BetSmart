const API_KEY = 'd7f4b5041779c118d7b49d9f09df1b95';

// reads value passed from homepage
const urlParams = new URLSearchParams(window.location.search);
const sportKey = urlParams.get('sportKey');
const sportName = urlParams.get('sportName') || 'Selected Sport';
const teamFilter = (urlParams.get('team') || '').toLowerCase();

const matchesContainer = document.getElementById('matches-container');
const sportNameElem = document.getElementById('sport-name');
const backHomeBtn = document.getElementById('back-home');

sportNameElem.textContent = sportName;

backHomeBtn.addEventListener('click', () => {
  window.location.href = 'betsmart.html';
});

// api to get today's matches and odds for the selected sport
async function fetchMatches() {
  try {
    const response = await fetch(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds/?regions=us&markets=h2h&apiKey=${API_KEY}`);
    const matches = await response.json();

    if (!matches || matches.length === 0) {
      matchesContainer.innerHTML = '<p>No matches found.</p>';
      return;
    }

    // filter matches to only those involving that team
    const filteredMatches = teamFilter
      ? matches.filter(match => {
          return match.home_team.toLowerCase().includes(teamFilter) || match.away_team.toLowerCase().includes(teamFilter);
        })
      : matches;

    if (filteredMatches.length === 0) {
      matchesContainer.innerHTML = '<p>No matches found for the specified team.</p>';
      return;
    }

    matchesContainer.innerHTML = '';

    // creating cards for each match
    filteredMatches.forEach(match => {
      const matchCard = document.createElement('div');
      matchCard.className = 'match-card';

      const teams = `${match.away_team} @al ${match.home_team}`;
      const commenceTime = new Date(match.commence_time).toLocaleString();

      const matchInfo = document.createElement('h3');
      matchInfo.textContent = `${teams} - ${commenceTime}`;
      matchCard.appendChild(matchInfo);

      const oddsDiv = document.createElement('div');
      oddsDiv.className = 'odds-container';

      // show odds from each bookmaker
      match.bookmakers.forEach(bookmaker => {
        const odds = bookmaker.markets.find(market => market.key === 'h2h');
        if (odds) {
          const oddsText = odds.outcomes.map(outcome => `${outcome.name}: ${outcome.price}`).join(', ');
          const bookmakerP = document.createElement('p');
          bookmakerP.innerHTML = `<strong>${bookmaker.title}</strong>: ${oddsText}`;
          oddsDiv.appendChild(bookmakerP);
        }
      });

      matchCard.appendChild(matchInfo);
      matchCard.appendChild(oddsDiv);
      // code for chart.js
      const chartCanvas = document.createElement('canvas');
      chartCanvas.width = 400;
      chartCanvas.height = 200;
      matchCard.appendChild(chartCanvas);

      const labels = [];
      const data = [];
      match.bookmakers.forEach(bookmaker => {
        const h2h = bookmaker.markets.find(market => market.key === 'h2h');
        if (h2h && h2h.outcomes.length >= 2) {
          labels.push(bookmaker.title);
          const avgPrice = h2h.outcomes.reduce((sum, outcome) => sum + outcome.price, 0) / h2h.outcomes.length;
          data.push(avgPrice.toFixed(2));
        }
      });
      
      // Render Chart.js bar chart
      new Chart(chartCanvas, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Average Odds',
            data,
            backgroundColor: 'rgba(0, 123, 255, 0.6)',
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } }
        }
      });
      matchesContainer.appendChild(matchCard);
    });

  } catch (error) {
    console.error('Error fetching matches:', error);
    alert('Failed to load matches. Please try again later.');
  }
}

if (annyang) {
    const commands = {
      'go back': () => window.location.href = 'betsmart.html',
      'go to about': () => window.location.href = 'about.html'
    };
  
    annyang.addCommands(commands);
  }
  
fetchMatches();
