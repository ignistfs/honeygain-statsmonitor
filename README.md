# honeygain-statsmonitor

A custom statistics monitor and estimator for Honeygain made in html,jquery and php.




# Features

  - 5 day progress chart
  - Payout estimator
  - Overview and progress per device
  - Alert for inactive devices
  - **No bees**
  
  
![generalinfo-screenshot](https://i.imgur.com/OhygtOG.png) 
![devices-screenshot](https://i.imgur.com/aDzn5TZ.png)
![devices-screenshot2](https://i.imgur.com/PtP35Sq.png)
![devices-alertinactive](https://i.imgur.com/HZzVVKK.png)

# Requirements

  - PHP.
  - MYSQL.
  - Apache HTTP Server. \
Note : If you don't want to install these by yourself install xampp 

# Find your token id

1)Go to dashboard.honeygain.com \
2)Press F12 to enter console\
3)Click the "Network" tab and press F5\
4)Click on balances or devices and you should find your token id at the request headers as in the image below\
Make sure to copy it along with "Bearer"
![find your token id](https://i.imgur.com/YYOQpQ3.png) 


# Install 

 1)Copy all the files from the repo into your website directory.\
 2)Edit "functions/db.php" with your database info and "functions/config.php" with your token id

# Notes
 1)I advise letting the autorefresh do his thing and not refresh in short interval of time for a better precision in calculating the rate per h
 2)Please name your devices for the device progression function to work for each of them \
 3)It may be a hassle for some to install and run a web server on their computer, if so you can use 000webhost.com or awardspace.com 
