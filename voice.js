if (annyang) {
    const commands = {
      'hello': () => alert('Hello World'),
      'change the color to *color': color => {
        document.body.style.backgroundColor = color;
      },
      'navigate to :page': page => {
        const pageMap = {
          'home': 'index.html',
          'about': 'about.html',
          'matches': 'daily-matches.html?sportKey=soccer_epl&sportName=Soccer%20EPL'
        };
        if (pageMap[page]) {
          window.location.href = pageMap[page];
        }
      },
      'search for *team': team => {
        const sportSelect = document.getElementById('sport-select');
        if (sportSelect) {
          const selectedSportKey = sportSelect.value || 'soccer_epl';
          const sportName = sportSelect.options[sportSelect.selectedIndex]?.text || 'Soccer EPL';
          window.location.href = `daily-matches.html?sportKey=${selectedSportKey}&sportName=${sportName}&team=${encodeURIComponent(team)}`;
        }
      }
    };
  
    annyang.addCommands(commands);
    annyang.start();
  }
  