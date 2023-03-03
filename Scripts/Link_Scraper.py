import requests
from bs4 import BeautifulSoup as bs
import json
import concurrent.futures

debug = True


def exists(url):
    return requests.head(url).status_code == 200


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


def main():
    output = {}
    output["Coolmath Games"] = coolmath()
    output["Coolmath Games Mirror"] = edit()
    output["Unblocked Games 66 EZ"] = unblocked66()

    print("Coolmath Games: " + str(len(output["Coolmath Games"])))
    print("Coolmath Games Mirror: " +
          str(len(output["Coolmath Games Mirror"])))
    print("Unblocked Games 66 EZ: " +
          str(len(output["Unblocked Games 66 EZ"])))

    with open("data/scrapelinks.js", "w+") as f:
        f.write("const scrapelinks=")
        f.write(json.dumps(output, separators=(',', ':')))


if __name__ == "__main__":
    main()
