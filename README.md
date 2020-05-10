# honeygain-statsmonitor

A custom statistics monitor and estimator for Honeygain made in html,jquery and php.




# Features :

  - 5 day progress chart
  - Payout estimator
  - Overview and progress per device
  - No bees
![generalinfo-screenshot](https://i.imgur.com/93htprw.png) 
![devices-screenshot](https://i.imgur.com/cJrxG0o.png)
![devices-screenshot2](https://i.imgur.com/3DAUY6p.png)

# Requirements :

  - PHP.
  - MYSQL.
  - Apache HTTP Server.
Note : If you don't want to install these by yourself install xampp 

# Find your token id:

1)Go to dashboard.honeygain.com \
2)Press F12 to enter console\
3)Click the "Network" tab and press F5\
4)Click on balances or devices and you should find your token id at the request headers as in the image below\
Make sure to copy it along with "Bearer"
![find your token id](https://i.imgur.com/YYOQpQ3.png) 


# Install :

 1)Copy all the files from the repo into your website directory.\
 2)Config script.js with your token id and db.php with your database info 

 
 And you are all set!
