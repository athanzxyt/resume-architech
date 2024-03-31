# resume-architech 
Maximizing job application success through an automatic resume tailor. Using Large Language Models and Semantic Vector Search to maximize candidate potential.
ArchiTech and are excited to use these technologies in future projects!

## Check it out!
[resumearchi.tech](https://resume-architech.onrender.com/)

![Home Screen](/readmeimg/HomeScreen.png)
![Projects](/readmeimg/projects.png)
![resume](/readmeimg/resume.png)

Run Backend:
```
python ./Back/server.py
```

Run Frontend:
```
cd ./Front
npm run dev
```

## Inspiration 💡
I'm sure all of you have also experienced the pain of trying to apply to hundreds of job postings only to hear back 4 months later that the position you applied to has already been filled. Well, we were sick of it! 

## What It Does ⚙️
Resume ArchiTech is a custom resume tailor that will help maximize your chances of success by hand-picking your projects and work experience for each job you apply to. A task that would normally take 10-20 minutes can now be done in seconds, maximizing the quantity and quality of your job applications.

## How We Build It 🛠️
Resume ArchiTech is an amalgamation of various cutting-edge technologies to make the tasks of resume tailoring for jobs possible. We run a Flask backend with a MongoDB database along with a React front end, hosted on Render.com. To automatically tailor your resume for every job application we use a combination of GitHub API scraping to automatically gather information about your proudest projects, OpenAIs GPT3.5-turbo to generate resume bullet points for all of your projects, a HuggingFace Semantic Search Model to match the most relevant projects and experiences to a job posting, and python DOCX to automatically generate a ready to go PDF and Word document that you can apply with right away!

## Challenges We Ran Into 🧱
UI:
One challenge we ran into was integrating all of the different parts of our app. We built up different parts of our App concurrently and integrating all of this in the front end was a big user experience challenge. 

Optimization:
Using so many different APIs and AI models at times created a lot of delay when tailoring a users experiences to a given job. We managed to work around this by implementing asynchronous requests to different APIs, for instance using asyncio to send all of our OpenAI calls simultaneously so that users with many projects wouldn't have to wait too long to generate their resume bullet points.
We also heavily optimized our scraping of users' GitHubs, by avoiding doing manual scraping and leveraging the GitHub API, which provides a lot of convenient data about user projects.

## Accomplishments that we're proud of 🎓
We believe our final webapp provides a very smooth and polished experience for the user to generate their custom-tailored resume which we are very proud of. This was our first time building an application using the OpenAI API, or Flask, and was a huge learning experience for using all of the different technologies that went into making this project a reality. We are extremely proud of how much we've learned while building ArchiTech and are excited to use these technologies in future projects!

## What's next for Resume ArchiTech 🚀
We want to continue developing bullet-point generation by using larger models trained on shorter sentences. We also want to improve our prompt engineering to more effectively implement the STAR (Situation, Task, Approach, Result) method for bullet-point generation.

Furthermore, we want to figure out our parallelization for semantic embeddings such that a user will be able to apply to more jobs quickly.

# Back-End Structure

1. **Expansion:** A user uploads all current background information either via text or file upload to be parsed. Then Resume Architech will work with the user bullet-by-bullet to improve and generate new bullet points using the STAR method, expanding their experience description to 10-100 bullets.
     - Prompt-Engineering.
2. **Selection:** Given a designated job description, perform a similarity search using vector embeddings. Rank all bullets based on their similarity. Then use keyword search to match certain bullets to keywords wanted in the description.
     - Semantic Search using a Vector Database
3. **Generation:** Given the ranked bullets, generate a one-page resume by removing the least useful bullets first until the designated information is one page.
     - Format using LaTeX.

# Front-End UI/UX

4. **Web-Hosting:** Host on Render.com with domain name resumearchi.tech
5. **Database:** Use MongoDB
6. **User Authentication:** Use Auth0.
