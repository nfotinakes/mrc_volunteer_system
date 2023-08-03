
<a name="readme-top"></a>

<h1 align="center">MRC Volunteer System</h3>

  <p align="center">
    A tool for MRC Unit Coordinators to track, organize, and interact with MRC Volunteer Data
    <br />
    <br />
    <br />

  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#database">Database</a>
      <ul>
        <li><a href="#er-diagram">ER Diagram</a></li>
        <li><a href="#table-info">Table Info</a></li>
      </ul>
    </li>
    <li><a href="#server">Server</a></li>
    <li><a href="#client">Client</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Dashboard Screnshot](https://i.imgur.com/Fj5BTXj.png)

&emsp;The Medical Reserve Corp is a federal program of around 800 units and over 300,000 trained volunteers who assist with public health efforts throughout our communities. These efforts range from increasing public health literacy, prevention support, and eliminating health disparities, to disaster and emergency response support, such as during disease outbreaks, earthquakes, and floods. An organized and efficient system to contact and sort volunteer data can be essential for quickly mobilizing vital health volunteers when community first responders need support. 

&emsp;Funding and grants for local MRC units are often limited or competitive, which means MRC unit coordinators are often forced to develop their own systems for managing their local MRC volunteer network. Funds cannot usually be allocated to the development of specialized systems or purchasing pre-existing volunteer tracking software. The goal of the MRC Volunteer System is to provide a base full-stack web application for any MRC unit coordinator to use as a volunteer network management tool. This system will provide the means to store, edit, and organize all necessary information on volunteers, volunteer sites, and volunteer logs. Additional features include volunteer network analytics, CSV import capabilities, calendar event/note storage, and with this source code, the ability to customize as one sees fit! 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![MySQL][MySQL]][MySQL-url]
* [![React][React.js]][React-url]
* [![Node.js][Node.js]][Node-url]
* [![Express][Express]][Express-url]

The following sections will provide documentation and specifics on all aspects of the system, including database design, server and API specifics, and client-side functionality. See the table of contents at the top of the file for easy navigation to any section of this file. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Database

The MRC Volunteer System uses a relational database built with MySQL. To create the database schema, the associated file can be found in the project directory at:
```
server/data/mrc_volunteer.sh
```
Server environment variables are saved in the `.env` file. Edit accordingly to match your database.

Further detailed information on the database can be found in the following sections:


### ER Diagram

![ER Diagram](https://i.imgur.com/43fz6Ya.png)

### Table Info
volunteer
| Data Item | Type | Description |
| --- | --- | --- |
| volunteer_id | Integer | The volunteer's unique ID (Primary Key) |
| first_name | String | Volunteer first name |
| last_name | String | Volunteer last name |
| email | String | Volunteer email address (must be unique) |
| phone | String | Volunteer phone number |
| zipcode| String | Volunteer zipcode |
| status | Integer | Volunteer active status (active = 1, inactive = 0) |
| input_date | Datetime | Date volunteer was registered to system |
| licensure | String | Volunteer license type |
| license_num | String | Volunteer license number |
| license_exp | Datetime | Volunteer license expiration date |

<br />

site
| Data Item | Type | Description |
| --- | --- | --- |
| site_id | Integer | The Site's unique ID (Primary Key) |
| site_name | String | Site name |
| city | String | City site is located |
| zipcode| String | Site city's zipcode |
| address| String | Site street address |
| note | String | Optional field for a note or additional site info |

<br />

log 
| Data Item | Type | Description |
| --- | --- | --- |
| log_id | Integer | The Log's unique ID (Primary Key) |
| volunteer_id | Integer | The volunteer ID associated with the log (Foreign Key) |
| site_id | Integer | The site ID associated with the log (Foreign Key) |
| date | Datetime | Date of volunteer log |
| hours | Integer | The hours logged by volunteer |
| role | String | Volunteers role for the log |
| note | String | Optional field for a note or additional log info |

<br />

event
| Data Item | Type | Description |
| --- | --- | --- |
| id | String | Event unique ID (generated on frontend creation (Title + Date) |
| title | String | Event title |
| start | String | Event starting datetime (conversion handled in frontend) |
| end | String | Event ending datetime (conversion handled in frontend) |
| note | String | Optional field for a note or additional event info |

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- Server -->
## Server

The server routes are organized in the subdirectory `server/routes` routed from the `index.js` file to `Stats`, `Volunteer`, `Site`, and `Event` subfolders/routes.

This section will detail the endpoints and corresponding actions/response data from each REST endpoint.

### Stats


Return the sum of all volunteer hours logged in the system.

```
GET /stats/totalHours
```

Example response:
```json
[
    {
        "total_hours": "100"
    }
]
```
---
Return the six most recent volunteers added to the system.
```
GET /stats/recentVolunteers
```
Example response (only the first two shown):
```json
[
    {
        "volunteer_id": 33,
        "first_name": "Ron",
        "last_name": "Hammers",
        "input_date": "2023-07-23T07:00:00.000Z"
    },
    {
        "volunteer_id": 32,
        "first_name": "John",
        "last_name": "Jacobs",
        "input_date": "2023-07-23T07:00:00.000Z"
    },
```
---
Return the count of each type of license in the system.
```
GET /stats/licenseCount
```
Example response (only the first two shown):
```json
[
    {
        "Total": 8,
        "licensure": "MD"
    },
    {
        "Total": 3,
        "licensure": "RN"
    },
```
---
Returns the top 6 volunteers by total hours logged.
```
GET /stats/topHours
```
Example response (only the first two shown):
```json
[
    {
        "volunteer_id": 7,
        "first_name": "Molly",
        "last_name": "Olson",
        "total_hours": "30",
        "total_logs": 6
    },
    {
        "volunteer_id": 11,
        "first_name": "Eddie",
        "last_name": "Curry",
        "total_hours": "20",
        "total_logs": 3
    },
```
---
Return the sum of all volunteers in the system.
```
GET /stats/volunteerCount
```
Example response:
```json
[
    {
        "total_volunteers": 34
    }
]
```
---
Returns the sum of all sites in the system.
```
GET /stats/siteCount
```
Example response:
```json
[
    {
        "total_sites": 10
    }
]
```
---
### Volunteer
Return all volunteers from the database.
```
GET /volunteer
```
Example response (only first volunteer shown):
```json
[
    {
        "volunteer_id": 1,
        "first_name": "Tom",
        "last_name": "Jones",
        "email": "tjones@gmail.com",
        "phone": "(805) 555-9645",
        "zipcode": "93465",
        "status": 0,
        "input_date": "2022-01-17T08:00:00.000Z",
        "licensure": "MD",
        "license_num": "MD6745",
        "license_exp": "2025-08-15T07:00:00.000Z"
    },
```
---

Return all volunteer emails from the database.
```
GET /volunteer/emails
```
Example response (first two emails shown):
```json
[
    {
        "email": "tjones@gmail.com"
    },
    {
        "email": "sphillips@gmail.com"
    },
```
---

Return all volunteer names (volunteer_id and email as well) from the database (used when adding log)
```
GET /volunteer/names
```
Example response (first result shown):
```json
[
    {
        "volunteer_id": 21,
        "first_name": "Lewis",
        "last_name": "Armstrong",
        "email": "lewarmstrong@outlook.com"
    },
```
---

Delete volunteer  from the system by volunteer_id primary key
```
DELETE /volunteer/delete/{volunteer_id}
```
---
Add a new volunteer to the system
```
POST /volunteer/new
```
---
Add a new volunteer to the system (used when importing from CSV, status is set as active)
```
POST /volunteer/new/import
```
---
Update an existing volunteer in the system
```
PUT /volunteer/update/{volunteer_id}
```
---
### Site
Get all site info from database
```
GET /site
```
Example response (only one site shown):
```json
[
    {
        "site_id": 2,
        "site_name": "SLO Veterans Hall",
        "city": "San Luis Obispo",
        "zipcode": "93401",
        "note": ""
    },
```
---

Get site names and site_id from database (used when adding log)
```
GET /site/names
```
Example response (two sites shown):
```json
[
    {
        "site_id": 1,
        "site_name": "Generic"
    },
    {
        "site_id": 2,
        "site_name": "SLO Veterans Hall"
    },
```
---

Add a new site to the database
```
POST /site/new
```
---
Delete a site from the database by site_id
```
DELETE /site/delete/{site_id}
```
---
Update a sites info by site_id
```
PUT /site/update/{site_id}
```
---

### Log

Get all log info from database
```
GET /log
```
Example response (only one log shown):
```json
[
    {
        "log_id": 1,
        "first_name": "Molly",
        "last_name": "Olson",
        "email": "mololson@gmail.com",
        "site_name": "SLO Veterans Hall",
        "zipcode": "93401",
        "date": "2023-02-18T08:00:00.000Z",
        "hours": 4,
        "role": "Swabber",
        "note": ""
    },
```
---

Add new log to database
```
POST /log/new
```
---

Delete existing log from database by log_id
```
Delete /log/delete/{log_id}
```
---

Update existing log by log_id 
```
PUT /log/update/{log_id}
```
---

### Event

Get all event info from database
```
GET /event
```
Example response (only one event shown):
```json
[
    {
        "id": "PR Fairground2023-07-22",
        "title": "PR Fairground",
        "start": "2023-07-22",
        "end": "2023-07-23",
        "note": "Need 10 volunteers - Swab and Admin"
    },
```
---

Add new event to database
```
POST /event/new
```
---

Delete existing event from database by id
```
Delete /event/delete/{id}
```



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- Client -->
## Client

This section will outline some of the structure and libraries used within the components of the front end. For more detailed user use cases, see the following section, <a href="#usage">Usage</a>.

The client/front end is structured with each major page organized within the `src/scenes` subdirectory, with `index.jsx` as the main component, and any additional sub-components are located in that folder. Global components such as the Sidebar and Topbar are located in the `src/global` folder, and any additional components, such as analytical charts are
located in the `src/components` folder.

The client-side makes heavy use of the React library [Material UI](https://mui.com/) such as the following MUI components:
* [Box](https://mui.com/material-ui/react-box/)
* [Data Grid](https://mui.com/x/react-data-grid/)
* [Alert](https://mui.com/material-ui/react-alert/)
* [Dialog](https://mui.com/material-ui/react-dialog/)
* [Snackbar](https://mui.com/material-ui/react-snackbar/)
* [Material Icons](https://mui.com/material-ui/material-icons/)
* [Text Field](https://mui.com/material-ui/react-text-field/)
* [Button](https://mui.com/material-ui/react-button/)

#### Dashboard

The dashboard page is the first page rendered when loading the application. It displays analytical information about the data in the system via widgets. These widgets are set to display by using the [Box](https://mui.com/material-ui/react-box/) component and utilizing by setting the `display`  prop to `"grid"` and then setting the parameters with `gridTemplateColumns` and `gridAutoRows` to create a grid to map the sub-boxes which represent each widget. These widgets can then be set to size by editing the props `gridColumn` and `gridRow`.

The dashboard also utilizes the [Nivo](https://nivo.rocks/) library to create the box plot chart component used for the Licensure widget. 

#### Volunteer

The volunteer page utilizes the [MUI X Data Grid](https://mui.com/x/react-data-grid/) to display all volunteers saved in the database. Volunteer logs and adding a new volunteer are done via the [Dialog](https://mui.com/material-ui/react-dialog/) component.

#### Site

Site page functions similarly to the volunteer page utilizing the [MUI X Data Grid](https://mui.com/x/react-data-grid/) to display all site information in the database. 

#### Logs

Logs are displayed again using the [MUI X Data Grid](https://mui.com/x/react-data-grid/). Adding a new log fetches all volunteers and sites from the database, as a log must be associated with an existing volunteer and site.

#### Data Import

The data import page allows for the user to import volunteers via CSV files. The [Papa Parse](https://www.papaparse.com/) library helps in parsing files. The file headers must match the `volunteer` database headers in this version 1.0.

#### Calendar

The calendar page utilizes the [FullCalendar](https://fullcalendar.io/) component/API to create an interface for creating events and saving them to the database.

#### Styling

Site-wide styling, such as colors, are done via the [ThemeProvider](https://mui.com/material-ui/customization/theming/) of MUI. This allows for color palettes to be declared and the ability for swapping colors for light and dark mode. The color palette is created by 
selecting a color and using the VSCode Tailwind extension to create color gradients.

Further styling for MUI components is usually done using the `sx` prop utilized by most components such as the `Box` and `Data Grid`. More information on [Customization](https://mui.com/material-ui/customization/how-to-customize/).

The background image and logos are in the `/public/assets` sub-directory.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- Usage -->
## Usage

#### Dashboard
Upon loading the application, the Dashboard page will be displayed with analytical widgets. The navigational sidebar is collapsable and a 'dark mode'/'light mode' toggle switch is available in the top right.
<br/>

![Checking](https://drive.google.com/uc?id=1whJ_rLovjKiyg3BO7Zk4T5j94wXVD9mS)



https://github.com/nfotinakes/mrc_volunteer_system/assets/93119727/4101e9be-79df-440e-832c-086d136f4ad1




<!-- CONTACT -->
## Contact

Nicholas Fotinakes - [LinkedIn](https://www.linkedin.com/in/nfotinakes/) - nfotinakes@csumb.edu

Project Link: [https://github.com/nfotinakes/mrc_volunteer_system](https://github.com/nfotinakes/mrc_volunteer_system)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Put Resources HERE

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
[product-screenshot]: images/screenshot.png
[MySQL]: https://img.shields.io/badge/MySQL-black?style=for-the-badge&logo=mysql&logoColor=white&color=%234479A1
[MySQL-url]: https://www.mysql.com/
[React.js]: https://img.shields.io/badge/React-white?style=for-the-badge&logo=react&logoColor=white&color=%2361DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/Node.js-white?style=for-the-badge&logo=nodedotjs&logoColor=white&color=%23339933
[Node-url]: https://nodejs.org/en
[Express]: https://img.shields.io/badge/Express-white?style=for-the-badge&logo=express&logoColor=white&color=black
[Express-url]: https://expressjs.com/
