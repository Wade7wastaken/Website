import requests
from bs4 import BeautifulSoup as bs
import json
import concurrent.futures

debug = True


def _exists_old(url):
    page = requests.get(url)
    if page.status_code != 404:
        return True
    return False


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
    output = []

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

    # unblocked66processgame(games[3])

    # for game in games:
    # unblocked66processgame(game)

    with concurrent.futures.ThreadPoolExecutor() as executor:
        results = executor.map(unblocked66processgame, games)

        results = [x for x in results if x != None]

        return results


def google():
    return [
        ["Google Snake", "https://www.google.com/fbx?fbx=snake_arcade"],

        ["Google Minesweeper", "https://www.google.com/fbx?fbx=minesweeper"],

        ["Google Pacman", "https://www.google.com/fbx?fbx=pacman"],

        ["Google Tic-Tac-Toe", "https://www.google.com/fbx?fbx=tic_tac_toe"],

        ["Google Solitaire", "https://www.google.com/fbx?fbx=solitaire"],

        ["Google Doodle Baseball",
         "https://www.google.com/logos/2019/july4th19/r6/july4th19.html?hl=en&sdoodles=1"],

        ["Google Doodle Halloween",
         "https://www.google.com/logos/2020/halloween20/rc1/halloween20.html?hl=en&sdoodles=1"],

        ["All Google Doodles", "https://www.google.com/doodles"]
    ]


def main():
    output = {}
    output["coolmath"] = coolmath()
    output["edit"] = edit()
    output["unblocked66"] = unblocked66()
    output["google"] = google()

    output["names"] = {
        "coolmath": "Coolmath Games", "edit": "Coolmath Games Mirror", "unblocked66": "Unblocked Games 66 EZ", "google": "Google"
    }

    print("coolmath: " + str(len(output["coolmath"])))
    print("edit: " + str(len(output["edit"])))
    print("unblocked66: " + str(len(output["unblocked66"])))
    print("google: " + str(len(output["google"])))

    with open("data/links.js", "w+") as f:
        f.write("const links=")
        f.write(json.dumps(output, separators=(',', ':')))


if __name__ == "__main__":
    main()
