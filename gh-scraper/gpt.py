from openai import OpenAI
import os
from dotenv import load_dotenv
from pathlib import Path


def get_bullet_points(project):
  # load env
  load_dotenv()
  client = OpenAI(
      # This is the default and can be omitted
      api_key=os.getenv("OPENAI_API_KEY"),
  )

  chat_completion = client.chat.completions.create(
      messages=[
          {
              "role": "user",
              "content": f'Here is a GitHub project, please write me 5 resume bullet points using the STAR method, keeping each bullet point to one line: {project}',
          }
      ],
      model="gpt-3.5-turbo",
  )

  return chat_completion.choices[0].message.content


if __name__ == "__main__":
  print(get_bullet_points("This is a test project. It is a great project"))