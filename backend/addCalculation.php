<?php

require "config.php";

function addCalculation( $dsn, $dbusername, $dbpassword ){
    session_start();
    if( isset( $_SESSION['primaryKey'] ) ){
        $userKey = $_SESSION['primaryKey'];
    }else{
        return (object) array( "error" => False, "hasSession" => False );
    }
    if( isset( $_POST['x']) && isset( $_POST['op']) && isset( $_POST['y']) && isset( $_POST['date']) ){
        $x = $_POST[ 'x' ];
        $op = $_POST[ 'op'] ;
        $y = $_POST[ 'y' ];
        $date = $_POST[ 'date' ];
    }else{
        return (object) array( "error" => False, "badParams" => True );
    }
    try{
        $pdo = new PDO( $dsn, $dbusername, $dbpassword );
        $sql = "INSERT INTO Calculations (X, Op, Y, UserKey, Date) VALUES ( ?, ?, ?, ?, ? )";
        $sth = $pdo->prepare( $sql );
        $error = !$sth->execute( array($x, $op, $y, $userKey, $date ) );
    }catch( PDOException $e ){
        $error = True;
    }
    return (object) array( "error" => $error );
}

echo json_encode( addCalculation($dsn, $dbusername, $dbpassword) );

?>