# VideoInterviewPage

Functionality:
This is a Video Interview Page which helps HR to grade students by seeing their Question(s) videos implemented using HTML,CSS,JAVASCRIPT,JQUERY,BOOTSTRAP.

A candidate image is diplayed on the left side. In the middle video corresponding to a question comes and HR can grade it using Rating stars mechanism developed using Jquery
and can write comments corresponding to each question. Questions can be traversed using left and right buttons. After Reaching the last question ,clicking on right button 
will display the results i.e Rating and Comments for each question given so far by HR in form of table. You can modify the comments or Rating by traversing back using left button.
A Radar chart below the candidate image will be updated for each question as soon as rating for that question is given.

From Bootstrap, some designing of buttons,badges were done.
From Jquery, Rating mechanism(1 star to 5 star) was developed.
Javascript contains whole logic of the page.

You can Change number of questions by going to javascript there is a variable called "noOfQuestions", you can change it to any number, for the time being it is set to 5
and number of videos currently present is 5 also.

I have used map data structure to store comments and rating for each question , store for saving rating and store_comment for saving Comments related to questions.

index.php is just for deployed purpose on heroku.

Deployed Link: https://video-interview-page.herokuapp.com/
