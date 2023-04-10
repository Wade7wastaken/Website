import requests
from bs4 import BeautifulSoup as bs
import json
import concurrent.futures

from utils import *

def unblocked66processgame(game):
    link = game.find("a")
    gameurl = "https://sites.google.com" + link["href"]
    name = link.get_text()

    print("Processing: " + name)

    if not exists(gameurl):
        return

    gamepage = requests.get(gameurl)
    if gamepage.status_code == 404:
        return
    gamesoup = bs(gamepage.content, "html.parser")

    buttons = gamesoup.find_all(attrs={"class": "w536ob"})

    if len(buttons) == 0:
        return [name, gameurl]
    elif len(buttons) == 1:
        return [name, gameurl]
    elif len(buttons) == 2:
        # button = buttons[1]
        # codesoup = bs(button.attrs["data-code"], "html.parser")
        # script = codesoup.find("script").string
        # lines = script.split()
        # xml = [x for x in lines if "xml" in x]
        # gameurl = xml[0][1:][:-2]
        embedurls = [x for x in (bs(buttons[1].attrs["data-code"],
                                 "html.parser").find("script").string.split()) if "xml" in x]
        if len(embedurls) == 0:
            return [name, gameurl]

        embedurl = embedurls[0][1:][:-2]

        if exists(embedurl):
            return [name, embedurl]
        else:
            return [name, gameurl]

    else:
        print("Error in " + name + ": More than 2 buttons")
        return [name, gameurl]


def unblocked66():
    url = "https://sites.google.com/site/unblockedgames66ez/home"
    page = requests.get(url)

    if debug:
        print("Request succeded")

    soup = bs(page.content, "html.parser")

    # find all game links
    games = soup.find_all(
        "div", class_="jYxBte Fpy8Db")

    games = soup.find_all(attrs={"class": "jYxBte Fpy8Db"})[0].contents

    with concurrent.futures.ThreadPoolExecutor() as executor:
        results = executor.map(unblocked66processgame, games)

        results = [x for x in results if x != None]

        return results