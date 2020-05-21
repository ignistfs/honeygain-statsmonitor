# honeygain-statsmonitor

A custom statistics monitor and estimator for Honeygain made in html,jquery and php.




# Features

  - 5 day progress chart
  - Payout estimator
  - Overview and progress per device
  - No bees
  
  
![generalinfo-screenshot](https://i.imgur.com/D931bt8.png) 
![devices-screenshot](https://i.imgur.com/OPVfrQQ.png)
![devices-screenshot2](https://i.imgur.com/3DAUY6p.png)

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
 2)Config script.js with your token id and db.php with your database info 

# Notes

 1)I am using a CORS proxy to route the requests to honeygain, I do not own it and therefore have no control over it.Sometimes when you make a refresh it may take some time or not work at all because the proxy is overloaded,just leave the page be and it should autorefresh. \
 2)I advise letting the autorefresh do his thing and not refresh in short interval of time for a better precision in calculating the rate per h (it's also less possible for the cors proxy to fail) \
 3)Please name your devices for the device progression function to work for each of them \
 4)It may be a hassle for some to install and run a web server on their computer, if so you can use 000webhost.com (https://www.000webhost.com/1191900.html - my reff link if you want) \
