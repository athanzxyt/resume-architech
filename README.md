# resume-architech
Maximizing job application success through an automatic resume tailor. Using Large Language Models and Semantic Vector Search to maximize candidate potential.

# Structure

1. **Expansion:** A user uploads all current background information either via text or file upload to be parsed. Then Resume Architech will work with the user bullet-by-bullet to improve and generate new bullet points using the STAR method, expanding their experience description to 10-100 bullets.
2. **Selection:** Given a designated job description, perform a similarity search using vector embeddings. Rank all bullets based on the similarity. Then use keyword search to match certain bullets to keywords wanted in the description.
3. **Generation:** Given the ranked bullets, generate a one-page resume by removing least useful bullets first until the designated information is one page. Format using LaTeX.

https://www.resumematcher.fyi/
https://www.youtube.com/watch?v=UGazvOuWkZo&ab_channel=KirkWatson


Tailoring
  LLM
  Impact words, action verbs, quantifiable metrics

Finetuning
  Prompt/Response Pairs
  Make own dataset → annotate and make good bullet points

Prompt Engineering
  Keep giving it prompts (filters) until it’s tailored to the domain of resume writing

ATS (applicant tracking system)

INPUT: Job description // dump of experiences
OUTPUT: 1-pager fitting the job

Help user make a lot of good accurate data about their experience
  Interactive with user validation
  Wonsulting.ai
How to choose the data to match the job description with semantic search
  Choose lines based on semantic similarity
  Choose lines based on key word similarity -> requires job description
Format data into a 1 page PDF
  Rank all of them based and delete until it’s a page
  Then organize into reverse chronological order

Web Dev
  Google Auth to log in
  Database -> storing the user’s information in MongoDB
