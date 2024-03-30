import requests
from bs4 import BeautifulSoup
import json
from gpt import get_bullet_points


github_user = "Tim-gubski"


url = f"https://api.github.com/users/{github_user}/repos"
page = requests.get(url)
repos = page.json()

parsed_repos = {}
print(repos)
for repo in repos:
  print(repo['name'])
  languages = requests.get(repo['languages_url']).json()
  readme = requests.get(f"https://raw.githubusercontent.com/{github_user}/{repo['name']}/main/README.md").text
  parsed_repo = {"name":repo['name'], "url":repo['html_url'], "api_url":repo['url'], "languages":languages, "readme": readme}
  parsed_repos[repo['name']] = parsed_repo

good_projects = ['Sustainabite', 'flamenet']

for project_name in good_projects:
  project = json.dumps(parsed_repos[project_name], sort_keys=True, indent=4)
  bullet_points = get_bullet_points(project)
  parsed_repos[project_name]['bullet_points'] = bullet_points
  print("Project: ", project_name)
  print("Bullet Points: \n", bullet_points)


# repo_info = {}

# for repo in repo_links:
#   repo_name = repo.text.strip()
#   repo_info[repo_name] = {"repo_name": repo_name, "url": repo['href']}

#   # get the readme
#   url = f"https://raw.githubusercontent.com/Tim-gubski/{repo_name}/main/README.md"
#   readme = requests.get(url)
#   repo_info[repo_name]['readme'] = readme.text

#   # get the languages
#   url = f"https://api.github.com/repos/Tim-gubski/{repo_name}/languages"

# print(repo_info['Minecraft-at-Home'])





# print(page.text)