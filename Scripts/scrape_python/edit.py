import requests
from bs4 import BeautifulSoup as bs
import json
import concurrent.futures

from utils import *

def editprocessgame(game):
    link = game.findChildren()[0]
    gameurl = "https://edit.coolmath-games.com" + link["href"] + "/play"

    if not exists(gameurl):
        return

    name = link.get_text()

    if debug:
        print([name, gameurl])
    return [name, gameurl]


def edit():
    url = "https://edit.coolmath-games.com/1-complete-game-list/view-all"
    page = requests.get(url)

    if debug:
        print("Request succeded")

    soup = bs(page.content, "html.parser")
    games = soup.find_all(
        "div", class_="view-content")[0].find_all("span", class_="game-title")

    with concurrent.futures.ThreadPoolExecutor() as executor:
        results = executor.map(editprocessgame, games)

        results = [x for x in results if x != None]

        return results