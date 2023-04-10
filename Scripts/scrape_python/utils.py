import requests
from bs4 import BeautifulSoup as bs
import json
import concurrent.futures

debug = True


def exists(url):
    return requests.head(url).status_code == 200