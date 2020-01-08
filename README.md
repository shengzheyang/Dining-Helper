# <img src="https://github.com/shengzheyang/Dining-Helper/blob/master/images/logo.png" width="50" height="50">&ensp;Dining-Helper

A chat extension for Facebook Messenger to help a group of people decide where to eat.

## Background
<img align="right" src="https://github.com/shengzheyang/Dining-Helper/blob/master/images/wswe2.png" width="534" height="300">
<div width="100">
In our daily life, we often come across a trivial but annoying question: Where should we eat?<br /><br />
This is the question we ask almost every time we hang out with our friends. We waste our valuable time arguing over something that rarely fits everyone's tastes. Can we solve this problem in an elegant way with the help of technology?<br /><br /><br /><br /></div>

## About Dining Helper

Dining Helper will help you solve this problem on your fingertips！Embedded in the Facebook Messenger app, it can give suggestions in the group chat right away according to the votes restaurants received and the distances they are from the users.

<img src="https://github.com/shengzheyang/Dining-Helper/blob/master/images/overview.jpg">

### Basic Features
- One of the users can create a new polling and set the deadline of this polling subject. Then this polling is ready for sharing to a group chat.
- All of the restaurant options are visible to every user in the polling panel but the options can only be modified by their owners.
- User can add or delete their desired restaurants as options before the polling end time. Multiple choice is supported.

### Advanced Features
- Users can select their own available times for the meal.
- When adding an option, users can search restaurants in an integrated map and pick the restaurant on the dropdown menu.
- Even before the pollind end time, users can view the real-time voting result at any time.

### Recommendation Algorithm
- Rank all mentioned restaurants according to the votes collected so far.
- Rank these restaurants given their distances to the users. (The closer the distance, the higher its rank)
- Give out the mutual available time of all users in the group.

Dining Helper could provide a recommended ranking list at the end of the algorithm. However, we think this would be presumptuous to combine the vote rank and distance rank in our own way. Hence, we can also simply give out the information and let the users make the final decision with these useful information.

## Programming Language
JavaScript

## Tools/IDE
React    Node.js    MongoDB    Visual Studio Code
