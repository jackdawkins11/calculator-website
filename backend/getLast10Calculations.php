<?php

require "config.php";

/*
Gets the 10 calculations from the db with the most
recent Date. Returns object with two objects:
    error (bool) whether there was an error
    calculations (2d array) the result of fetchAll()
*/

function getLast10CalculationsAux( $dsn, $dbusername, $dbpassword ){
    session_start();
    if( !isset( $_SESSION['primaryKey'] ) ){
        return (object) array( "error" => False, "hasSession" => False );
    }
    try{
        $pdo = new PDO( $dsn, $dbusername, $dbpassword );
        $sql = "SELECT  X, Op, Y, Val, UserKey, Date FROM Calculations ORDER BY Date DESC LIMIT 10";
        $sth = $pdo->prepare( $sql );
        $error = !$sth->execute();
        $result = $sth->fetchAll();
    }catch( PDOException $e ){
        $error = True;
    }
    return (object) array( "error" => $error, "calculations" => $result );
}

/*
Gets the username associated with the given key from the db.
Returns array with two objects
    error (bool) whether there was an error
    username (string) the username associaed with the given key. Only valid when error=False
*/

function getUsername( $userKey, $dsn, $dbusername, $dbpassword ){
    try{
        $pdo = new PDO( $dsn, $dbusername, $dbpassword );
        $sql = "SELECT  Username FROM Users WHERE PrimaryKey = ?";
        $sth = $pdo->prepare( $sql );
        $error = !$sth->execute( array($userKey) );
        $result = $sth->fetchAll();
    }catch( PDOException $e ){
        $error = True;
    }
    $username = "";
    if( !$error && count( $result ) != 1 ){
        $error = True;
    }else{
        $username = $result[ 0 ][ "Username" ];
    }
    return array( "error" => $error, "username" => $username );
}

/*
Gets the 10 most recent calculations from the db and adds the username
associated with each calculation to each calculation.
Returns object containing:
    error (bool) whether there was an error
    calculations (2d array) an array of calculations. Each calculation
    is an array containing data from the db.
*/

function getLast10Calculations( $dsn, $dbusername, $dbpassword ){
    $result = getLast10CalculationsAux($dsn, $dbusername, $dbpassword);
    if( $result->error ){
        return $result;
    }
    for( $i=0; $i < count( $result->calculations ); $i++ ){
        $getUsernameResult = getUsername( $result->calculations[ $i ][ 'UserKey'],
            $dsn, $dbusername, $dbpassword );
        if( $getUsernameResult[ 'error' ] ){
            $result->error = True;
        }        
        $result->calculations[ $i ][ 'Username' ] = $getUsernameResult[ 'username' ];
    }
    return $result;
}

echo json_encode( getLast10Calculations($dsn, $dbusername, $dbpassword) );

?>