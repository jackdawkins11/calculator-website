# Calculator app
A webpage with a calculator and a list of recent calculations.

## Using it
The site is running live here: http://18.189.13.31/frontend/
Create an account, sign in, and then use the calculator and see recent calculations made by any of the users.

## Host it yourself
The backend uses PHP and MySQL. The frontend uses React with JSX. To set up:
* Set up a PHP server. On Ubuntu this is as simple as `sudo apt install apache2 mysql-server php7.2-cli php-mysql && sudo service apache2 start`
* Clone this repository to your server
* Set up the database. Create a MySQL user and put its username and password into the `backend/install.php` file in this repository. Run the command `php install.php`
* Set up a JSX preprocessor. You can do so by following the steps at the bottom of this page https://reactjs.org/docs/add-react-to-a-website.html
* Create a folder called `react_compiled` inside the `frontend` folder. Run the JSX preprocessor on all of the JavaScript files in the `frontend/react` folder and put the output into the `react_compiled` folder.

