# the-social-net

## Description 

This project was created to provide a back-end for a social network. It allows you to view,  create, update, and delete users and thoughts(messages). You are able to add and delete friends from a user's friend list. You are also able to add and remove reactions(comments) from a thought.The application uses Javascript, Node, and MongoDB(NoSQL).

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation

You'll need to install MongoDB for the project which instructions can be found at (https://studio3t.com/download/?utm_source=adwords&utm_medium=ppc&utm_term=%2Binstall%20%2Bmongodb&utm_campaign=GS+%7C+Long-Tail+%7C+US&hsa_net=adwords&hsa_ad=518166182321&hsa_src=g&hsa_ver=3&hsa_grp=60919003907&hsa_acc=1756351187&hsa_tgt=kwd-299630844937&hsa_mt=b&hsa_kw=%2Binstall%20%2Bmongodb&hsa_cam=1508066778&gclid=CjwKCAiAsNKQBhAPEiwAB-I5zQjEjKvJnJWh4sCNm3HMU0RCTma_uRFg105K-hc634o1EaRWa9Zx3BoCdWMQAvD_BwE)

Also you will need to install Insomnia for the project which can be found at (https://docs.insomnia.rest/)

After downloading and extracting the project from the zip, open the terminal and install these node packages

* npm init -y
* npm i express mongoose


## Usage 

[Showcase video Part 1](https://drive.google.com/file/d/1SQ5IIANf9i13U2hNjOq2xKBvzw5X25bH/view)
[Showcase video Part 2](https://drive.google.com/file/d/1aTMj0Xy9OOVR310ImXf3J-P6Weuo0DBk/view)
The links above is are to the application direction/showcase videos

Start the server by typing "npm start". Then use Insomnia to try the each of the routes.

User:
USE localhost:3001/api/users
-GET FindAll: it will show all users in the database.
-POST Create: allows you to create a new user. must put in json format.
example {
            "username": "lernantino",
            "email": "lernantino@gmail.com"
        }

USE localhost:3001/api/users/:id
-GET FindOne: it will show the user by the id specified by you.
-PUT Update: it will update the user by the id specified by you. must put in json format.
-Delete: it will delete the user by the id specified by you.

Thoughts:
USE localhost:3001/api/thoughts
-GET FindAll: it will show all thoughts in the database.
-POST Create: allows you to create a new thoughts. must put in json format.
example {
            "thoughtText": "Here's a cool thought...",
            "username": "lernantino",
            "userId": "5edff358a0fcb779aa7b118b"
        }

USE localhost:3001/api/thoughts/:id
-GET FindOne: it will show the thought by the id specified by you.
-PUT Update: it will update the thought by the id specified by you. must put in json format. use exact scheme in POST example to update.
-Delete: it will delete the thought by the id specified by you.

Friends:
USE localhost:3001/api/users/userId/friends/friendId
-POST AddFriend: it will add a friend (another user) to the user's friend list.
-Delete DeleteFriend: it will delete a friend from the user's friend list.

Reactions:
USE localhost:3001/api/thoughts/thoughtId/reactions
-POST AddReaction: it will add a reaction to a thought.
example {
	        "reactionBody": "Oh wow that's amazing",
	        "username": "sargentino"
        }
USE localhost:3001/api/thoughts/thoughtId/reactions/reactionId
-Delete RemoveReaction: it will remove a reaction from a thought.

## Contributing

No contribution necessary.

## Tests

You can test this application by populating the database by creating users, thoughts, and reactions through the post/create routes via Insomnia.

## Questions

Github: [austin-espinal](https://github.com/austin-espinal)   
Email: [austinespi@gmail.com](mailto:austinespi@gmail.com)  

The best way to reach me is through email. Github is also acceptable.