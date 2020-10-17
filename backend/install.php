<?php

require "config.php";

$query = "create database $dbname; use $dbname; "
    . "create table Users( PrimaryKey int NOT NULL AUTO_INCREMENT, Username varchar( 100 ), Password varchar( 100 ), PRIMARY KEY( PrimaryKey )  );"
    . " create table Calculations( PrimaryKey int NOT NULL AUTO_INCREMENT, X varchar( 20 ), Op char(1), Y varchar(20), Val varchar(20), UserKey int, Date datetime, PRIMARY KEY( PrimaryKey ) );"
    ;

try{

    $connection = new PDO( "mysql:host=$dbhost", $dbusername, $dbpassword );

    $connection->exec( $query );

    echo "Created the database\n";

}catch( PDOException $e ){
    echo "Error installing database: " . $e->getMessage();
}

?>