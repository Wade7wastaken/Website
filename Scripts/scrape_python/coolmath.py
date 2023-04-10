import requests
from bs4 import BeautifulSoup as bs
import json
import concurrent.futures

from utils import *

def coolmath():
    output = []

    url = "https://www.coolmathgames.com/1-complete-game-list/view-all"
    page = requests.get(url)

    if debug:
        print("Request succeded")

    soup = bs(page.content, "html.parser")
    # find all game links
    games = soup.find_all(
        "div", class_="view-content")[2].find_all("span", class_="game-title")

    for game in games:
        link = game.contents[0]
        gameurl = "https://www.coolmathgames.com" + link["href"] + "/play"

        if game.parent.contents[-1]["class"][0] == 'icon-gamethumbnail-all-game-pg':
            continue

        if not exists(gameurl):
            continue

        name = link.get_text()

        output.append([name, gameurl])
        if debug:
            print([name, gameurl])
    return output