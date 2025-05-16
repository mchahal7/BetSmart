from flask import Flask, render_template
import requests

app = Flask(__name__)

url = "https://therundown-therundown-v1.p.rapidapi.com/"
headers = {
    'x-rapidapi-host': "therundown-therundown-v1.p.rapidapi.com",
    'x-rapidapi-key': "d7f4b5041779c118d7b49d9f09df1b95"
}

nba_events = "sports/4/events"

def get_lines(line_periods):
    bets = {
        "moneylines": [],
        "spreads": [],
        "totals": []
    }
    for line_index in line_periods:
        line = line_periods[line_index]['period_full_game']
        affiliate = line['affiliate']['affiliate_name']
        bets["moneylines"].append(f"{line['moneyline']['moneyline_home']} : {line['moneyline']['moneyline_away']} {affiliate}")
        bets["spreads"].append(f"{line['spread']['point_spread_home']} : {line['spread']['point_spread_away']} {affiliate}")
        bets["totals"].append(f"over {line['total']['total_over']}; under {line['total']['total_under']} {affiliate}")
    return bets

@app.route("/")
def get_events():
    querystring = {"include":["all_periods","scores"]}
    response = requests.get(url + nba_events, headers=headers, params=querystring).json()
    events = []
    for event in response.get('events', []):
        event_data = {
            'time': event['event_date'],
            'place': f"{event['score']['venue_name']}, {event['score']['venue_location']}",
            'teams': f"{event['teams'][1]['name']} - {event['teams'][0]['name']}",
            'bets': get_lines(event['line_periods'])
        }
        events.append(event_data)
    return render_template('index.html', events=events)

if __name__ == "__main__":
    app.run(debug=True)
