# Auth. In order for the site to work, you need to generate a personal token at github.

# When you have it, place it in the .env file, in the setting GIT_API_KEY

# Follow this document to generate the personal token

https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

# GitHub Commits

Github commits api listings, using React, Redux and Octokit (Githubs ajax library)

# Setup

yarn or npm

# Build

yarn run start or npm run start
Installations, and setups will be taken care of running this command.

# Testing

To run the unit tests yarn test or npm run test

To run the one cypress test yarn cypress or npm run cypress

# Explanation

This app was built on a windows platform. One time, I ran into an issue where the html-webpack-plugin in this project
had an issue working on a Mac.
If this occurs, please downgrade, until you find a version that does work on a Mac.
I would have tested this myself, but I do not have access to a Mac.
If you cannot get this to run on a non-windows machine, due to any issues in 3rd party libraies, as described above,
please reach out to whomever and lets share a screen. At a min you can view the project running on my end, and at best
we can solve any issues that arise.
The issue I describe above with the html-webpack-plugin is the only one I have ever run across in my career.
However, it occured in a take home assessment and I was passed over, because they told me they could not get
my project up and running.
I later had a former co-worker try it out, and in having a mac, we discovered the problem.

## Navigation

I took a unique approach in setting up navigation, programmatically.
As I used redux-thunk, I wanted to be able to determine which route to go to, within the thunk.
In the end, I had redux set a url, and in places, a useEffect was used to then trigger navigation.
I also used the navigate function from react-router-dom in places as well.
Would I use this in production?
Probably not, but in doing research on this problem, I did come across react-navigation, which solves the issue of triggering route changes within a thunk. However, as it's originally a React-Native lib, and is now being ported to the web, the docs indicated that they still have more work to do, for a dev to use it in web development.
So I put my thoughts in place, but for production would look to use something like react-navigation.
Unfortunately, I did not have the time to generate a better solution.

# Requests

As mentioned above, in not being familiar with the githumb api, I used ocktokit, to fetch commits.
I do come across a possible glitch with the api. I could not find in the docs a property that was returned indicating how many pages of commits, existed in a repo. The response headers did contain a property called link.
It contained multiples urls depending on the repo. However, as I was using ocktokit and not setting the url, except in configuring the library, I could not use these urls directly.
I did attempt to parse out the value of the url related to the last page, as it had a page count.
However, I found this seemed to change with each request. Ie. the first request would have a link with a page=10, indicating their were 10 pages with commits. However on the next request, this would change, randomly, to another number, in the response in theeader.
I also noticed that if a total of 10 pages was indicated, I could only make 3 requests on one of my own repos.
So 3 pages of commits retrived, but the other 7, just returned the commits from page 3.
I abandon this and kept it simple.
A user can make requests until github determines you've reached the last page.  
When you have an empty array is returned in the response, and if it's empty, then I disabled the Load More button in the commits component.
If I had more time, I would have preferred to find out how I could obtain the number of pages, based on the property you can change for results per page, programmatically.  
But again, with work, a family and the amount of work that went into this repo, I did not have the time to dig further.
For production, I would have created or asked for a ticket to dig into the api further.
