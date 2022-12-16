# Star wars weather
This web app collects data every 30 minutes from a raspberry pi sense hat in Portsmouth, Hampshire. With the most current temperature value, it compares it with a planet from the fictional universe of Star Wars and presents it. It also stores each data point and shows it on the “raw” page. On this page, you can view the exact values recorded by the hat, graphs of the averages over time and other details, including the ability to download the whole set of data in the form of a CSV file.

This app is a node JS app made on the express framework; it also includes a python script to interact with the sense hat and SQLite to store the data. Further details of this can be found in the documentation section.

This is in no way endorsed by Star Wars and has been done before, Tom Scott made one that has since been removed, and the Star Wars app has a similar feature. 

Hosted at https://sww.tyway.net

Any pull requests, issues or ideas are welcome! 

# Setup and installation
To self-host this program, you need a raspberry pi and a sense hat; on the raspberry pi, you will need the latest version of node JS and python and the necessary libraries for python to talk to the sense hat (relevant documentation can be found on the raspberry pi website).

1.	Run the node program with `npm test`
2.	Then exit the program with `control c` (this is done to create the SQLite file)
3.	Then, whenever starting the page again, use `npm start` (this runs both the python and node programs)

*The docker file does not work as the node and python file start simultaneously, so the python file exits, meaning data is not collected.

# Documentation
## Architecture
This is a server client-based system with a backend SQLite database locally stored with the server. On the server, two scripts are run, a node server and a python script. Every 30 minutes (1800 seconds), the python script [get_sense_data.py] runs a function which collects the data from the sense hat and stores it in the database; it stores `uuid` `timestamp (unix epoch)` `temperature` `humidity` `pressure`. The node script is an express web server and REST API.

The client is a dynamic web page which is mostly client-side rendered, and it gets its data from the API. On the homepage, it just needs `\latest-temp` and then compares that data with a set of planets. The raw page has two main sections, current data and the graphs; the graphs use `/week-avg` and `/month-avg` all the calculations are done server-side; the client formats the data. Raw also gets `/current-data` `amt-of-rows` `avg-tmp` for the rest of the page.

## Database
The database only contains one table, `data`:
```
data{
  id varchar(36) PRIMARY KEY,
  date INT NOT NULL,
  temp REAL NOT NULL,
  humid REAL NOT NULL,
  press REAL NOT NULL
)
```

## API

### /all-data
This is a download request.

Exports a CSV of every row.

*time is converted to ISO timestamp 

### /latest-temp
A GET request.
responds with an object of the latest temperature and its timestamp

### /current-data
A GET request.

Responds with an object that contains the most recent timestamp, temperature, humidity, pressure.

### /avg-temp
A GET request.

Responds with an average of every temperature recorded.

### /week-avg
A GET request.

Responds with an object of the past 7 days, with each temperature average over that day

### /months-avg
A GET request.

Responds with an object of the past 12 months with each month’s average temperature

*if there is not 12 months’ worth of data, it will respond with the months it has

### /amt-of-rows
A GET request.

Responds with the row count from the database.
