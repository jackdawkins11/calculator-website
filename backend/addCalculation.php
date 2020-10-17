<?php

require "config.php";

/*
Inserts the calculation specified by POST parameters into database.
Returns object with the following:
    error (bool) whether there was an error
    hasSession (bool) This is only set when this program fails
        because the client had no session
    badParams (bool) This is only set when the program fails
        because the client did not include all needed parameters
*/

function addCalculation( $dsn, $dbusername, $dbpassword ){
    session_start();
    if( isset( $_SESSION['primaryKey'] ) ){
        $userKey = $_SESSION['primaryKey'];
    }else{
        return (object) array( "error" => True, "hasSession" => False );
    }
    if( isset( $_POST['x']) && isset( $_POST['op']) && isset( $_POST['y'])
        && isset( $_POST['val']) && isset( $_POST['date']) ){
        $x = $_POST[ 'x' ];
        $op = $_POST[ 'op'] ;
        $y = $_POST[ 'y' ];
        $val = $_POST[ 'val' ];
        $date = $_POST[ 'date' ];
    }else{
        return (object) array( "error" => True, "badParams" => True );
    }
    try{
        $pdo = new PDO( $dsn, $dbusername, $dbpassword );
        $sql = "INSERT INTO Calculations (X, Op, Y, Val, UserKey, Date) VALUES ( ?, ?, ?, ?, ?, ? )";
        $sth = $pdo->prepare( $sql );
        $error = !$sth->execute( array($x, $op, $y, $val, $userKey, $date ) );
    }catch( PDOException $e ){
        $error = True;
    }
    return (object) array( "error" => $error );
}

echo json_encode( addCalculation($dsn, $dbusername, $dbpassword) );

?>