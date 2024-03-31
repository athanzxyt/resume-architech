from openai import AsyncOpenAI
import os
from dotenv import load_dotenv
import asyncio
import json



async def get_bullet_points(project_str, project_name=None, repos=None):
  # load env
  load_dotenv()
  client = AsyncOpenAI(
      # This is the default and can be omitted
      api_key=os.getenv("OPENAI_API_KEY"),
  )

  chat_completion = await client.chat.completions.create(
      messages=[
          {
              "role": "user",
              "content": f'Here is a GitHub project, please write me 5 resume bullet points using the STAR method, keeping each bullet point to one line: {project_str}',
          }
      ],
      model="gpt-3.5-turbo",
  )

  if repos != None and project_name != None:
    repos[project_name]['bullets'] = chat_completion.choices[0].message.content.split("\n")

  print(chat_completion.choices[0].message.content)
  return chat_completion.choices[0].message.content

async def get_multiple_bullets_async(repos):
  tasks = []
  for repo_name in repos:
    repo = repos[repo_name]
    # if len(repo.get('bullets',[])) != 0:
    #   continue
    print(repo_name)
    tasks.append(get_bullet_points(json.dumps(repo, sort_keys=True, indent=4), repo_name, repos))
  await asyncio.gather(*tasks)

def get_multiple_bullets(repos):
  asyncio.run(get_multiple_bullets_async(repos))
  # print(repos)
  return repos
  


if __name__ == "__main__":
  # get_bullet_points
  # print(get_bullet_points("This is a test project. It is a great project"))
  # print(get_bullet_points("This is a test project. It is a great project"))
  projects = {"p1": {"name":"This is a test project. It is a great project"}, "p2": {"name":"This is another different project. It is a great project"}}
  # print(json.dumps(projects['p1'], sort_keys=True, indent=4))
  print(get_multiple_bullets(projects))