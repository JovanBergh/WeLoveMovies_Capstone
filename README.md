# WeLoveMovies_Capstone


## Project Details

**Describe your problem-solving approach while building this capstone.  What steps did you take to understand the requirements, plan your solution, and implement the features?**

- My approach began with maintaining healthy Git practices and overall code hygiene, working incrementally and saving often. When it came to understanding and meeting the project requirements, I took it one step at a time and ensured repeatability before moving onto the next requirement. Once all tests were passing, I began working on integrating the frontend and posting to a mock production environment on Render. After passing initial tests, I spent sometime optimizing the source code and beginning to implement detailed HTTP logging. Though the project was specific to working with postgreSQL databases, I also entertained how other tools like mongoDB would integrate in a service like this, such as for the reviews section.

**Explain one key technical decision you made during your implementation.  Why did you choose this approach over other possible solutions?**

- I implemented my CORS logic in such a way where it could be called & configured centrally. As this is a security mechanism it deserves a special attention to detail, which is why I chose to try and make it easy to manage, and be mindful of the Principle of Least Privilege.
    - This is similar to how I tried to approach the theaters `queryBuilder` for knex, the database keys (and elsewhere).
    
**What is one area of backend engineering that you want to strengthen based on your experience developing this project?**

- The major area of backend engineering I'd like to strengthen would be bringing a proof-of-concept into something properly considered a Minimum Viable Product. In other words, creating, supporting & maintaining a valuable product or service to others. 

**AI use disclosure - Did you use any AI tools at any stage while preparing or developing this capstone?**
*Yes or No- If yes, briefly describe how you used them responsibly.*

- Yes, I did use `Microsoft's Copilot` for brainstorming, soundboarding and troubleshooting syntax & logic errors. 
    - The core structure and functionality of this application was built from the initial cloned repository provided by Chegg, in combination with changes made through knowledge & experience I've gained throughout the duration of my certification.
    - For tackling optional assignments and/or code optimizations, I did use AI for tool & best practice summarization, brainstorming, error parsing, in addition to sourcing relevant documentataion for further reading and application. 
        - Some examples of the above mention include:
            - Understanding SQLite nuances for JEST tests. This ultimately led to a more defined separation between test vs dev & prod environments.
            - Decoupling certain functionalities to minimize code redundancy and improve readability
            - Updating the Front End application's project dependencies to maintain proper security posture (retiring react-scripts for Parcel), and integrating with the backend to further test and refine functionality (this was an optional but worthwile endeavor giving invaluable exposure/experience toward fullstack development).
            - Giving better context to tools like `pino` which are valuable but tangental to the direct functionality of the application.
    
    - I find it important to note that, given the context of this project - forking off of a publically available repo and the intended purpose solely being for academia - I did provide source code and unredacted error logs during my interactions with Copilot. 
        - Aside from the aforementioned, this is not something that I would do. See below for my views on ethical / effictive AI workflows.

    - Additionally, though I did receive code suggestions, an estimated 89% - 95% of the code was manually written and restructured by me. I _did not_ use any AI coding agent directly integrated with my IDE (though providing source code is not substantively different in terms of suggestion).
        - Though I understand the utility in such a tool, I found it more useful to translate and apply the suggestions in my own way, and utilize copilot as a sounding board.

_Optional industry question  How would you use AI tools ethically and effectively in real backend engineering workflows (for example, for debugging, documentation lookups, or brainstorming improvements)?_

- I think utilizing AI in these workflows can be useful if applied appropriately, which depends on the step in your workflow.
    - Brainstorming and documentation shouldn't require any significant level of detail into the specifics of your project. It is possible to generalize enough in these context or to speak in hypotheticals in order to get a satisfactory response. 
        -  AI is not a good primary source and should be cross-referenced through more reliable references (ie source documentation)
    - During debugging, any superfluous or personal information should be redacted prior to providing any error information, and a best attempt should be made to first address the issue without help. Sometimes there's an error in your understanding which is resulting in your issue, so it can be useful to explain _how_ your code logic works as you would in your psuedocode. 


    - AI can be approached in the same fashion you might in a Stack Overflow, acknowledging it is a public forum without any assumed privacy. Corporate work should be done on a corporate account to provide transparency, security monitoring and non-repudiation. 
        - Doing corporate work on a personal AI account is akin to saving corporate emails to a personal email address or other similar practice of exfiltrating corporate data outside of it's secure boundary. 
        - Just like signing into a corporate machine, a Use of Conduct prior to gaining access to you corporate AI agent would do well in reminding users of the acceptable use policy
    - 