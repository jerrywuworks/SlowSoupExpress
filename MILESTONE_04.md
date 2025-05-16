Milestone 04 - Final Project Documentation
===

NetID
---
jw7795

Name
---
Jerry Wu

Repository Link
---
https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-JerryWu0316

URL for deployed site 
---
/: https://cuddly-space-barnacle-rq7wjxx7x54fxp77-3000.app.github.dev

URL for form 1 (from previous milestone) 
---
/login: https://cuddly-space-barnacle-rq7wjxx7x54fxp77-3000.app.github.dev/login  
/signup: https://cuddly-space-barnacle-rq7wjxx7x54fxp77-3000.app.github.dev/signup

Special Instructions for Form 1
---
None

URL for form 2 (for current milestone)
---
/create: https://silver-telegram-qjv6wxxv4wwcrww-3000.app.github.dev/create

Special Instructions for Form 2
---
You need to log in before you create a new puzzle, so... 
* if you're not logged in, clicking `create puzzle` will lead you to `login` page
* if you already logged in, you should be fine

URL for form 3 (from previous milestone) 
---
/puzzle/:title: https://urban-cod-qjv6wxxv4qrc969q-3000.app.github.dev/puzzle/Example-Puzzle-From-Wikepedia

Special Instructions for Form 3
---
1. only the `Example-Puzzle-From-Wikepedia` is an actual puzzle... 
   1. I would strongly recommand to use this for testing 
   2. Or you can create and test your own puzzle (functionalities will work as long as the puzzle itself make sense)
2. Asking the question
   1. perhaps start with
      1. `Is there a third person in the story?`
      2. `Did someone die?`
   2. asking a question that cannot be answered with yes/no will trigger warning... but Llama 3.0 is a bit stupid, if err is triggered when it is not supposed to:
      1. try to capitalize the first letter
      2. try to add `?` to the end
      3. perhaps just switch to a different question
3. checking solution
   1. solution will pass if it is close enough to the truth
   2. for `Example-Puzzle-From-Wikepedia`, the truth is: 
      1. "The man had the hiccups, and his reason for requesting a drink of water was not to quench his thirst but to cure his hiccups. The bartender realized this and chose instead to cure the hiccups by frightening the man with the gun. Once the man realized that his hiccups were gone, he no longer needed a drink of water, gratefully thanked the bartender, and left."
      2. rephrase the given truth would also pass the test

---

First link to github line number(s) for constructor, HOF, etc.
---
[Puzzle HOF](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-JerryWu0316/blob/master/backend/app.mjs#L58&&#L65)

Second link to github line number(s) for constructor, HOF, etc.
---
[Groq Wrapper](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-JerryWu0316/blob/master/backend/groq.mjs#L26&&L75)

Short description for links above
---
* Puzzle HOF: retrieve list of all `puzzle` info from database; map is used to add `.authorName` and `.webTitle` in each entries locally
  * `.authorName` is added through referencing `user` table
  *  `.webTitle` is created by replacing all spaces in `title` with "-": this is later used for creating unique url for each puzzle
* Groq Wrapper: wraps the Groq API call to standardize settings, takes a given role and query, and returns a promise for the result.


Link to github line number(s) for schemas (db.js or models folder)
---
* [Schema Folder](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-JerryWu0316/tree/master/backend/schemas) 

Description of research topics above with points
---
1. 2 points - choosing the most cost-efficient LLM based on the requirements
2. 4 points - maintain session with passport.js
3. 4 points - incorperating LLM as the judge for `/puzzle/:title` page

Links to github line number(s) for research topics described above (one link per line)
---

1. [groq.mjs](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-JerryWu0316/blob/master/backend/groq.mjs#L47)
2. [auth.mjs](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-JerryWu0316/blob/master/backend/routes/auth.mjs/#L1&&L115), [app.mjs](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-JerryWu0316/blob/master/backend/app.mjs#L33&&L39)
3. [groq.mjs](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-JerryWu0316/blob/master/backend/groq.mjs#L1&&L101), [puzzle.mjs](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-JerryWu0316/blob/master/backend/routes/puzzle.mjs#L19&&L43)


Optional project notes 
--- 
None

Attributions
---
1. [passport.js authentication docs](http://passportjs.org/docs) -> [auth.mjs](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-JerryWu0316/blob/master/backend/routes/auth.mjs#L10&&L117), [app.mjs](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-JerryWu0316/blob/master/backend/app.mjs#L33&&L39)
2. [connect-mongo npm docs](https://www.npmjs.com/package/connect-mongo) -> [app.mjs](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-JerryWu0316/blob/master/backend/app.mjs#L37)
3. [adding adobe fonts to css](https://helpx.adobe.com/fonts/using/embed-codes.html) -> [layout.hbs](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-JerryWu0316/blob/master/backend/views/layout.hbs#L6)
4. [color palette](https://coolors.co/palette/ccd5ae-e9edc9-fefae0-faedcd-d4a373) -> [color styling of views in general](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-JerryWu0316/blob/master/backend/views/layout.hbs)
5. [Groq Documentation](https://www.reddit.com/r/reactjs/comments/twmild/autoresize_textarea_height_to_fit_the_content/) -> [groq.mjs](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-JerryWu0316/blob/master/backend/groq.mjs#L1&&L101)
