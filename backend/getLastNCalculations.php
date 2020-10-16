<?php

require "config.php";

function getLastNCalculations( $dsn, $dbusername, $dbpassword ){
    session_start();
    if( !isset( $_SESSION['primaryKey'] ) ){
        return (object) array( "error" => False, "hasSession" => False );
    }
    try{
        $pdo = new PDO( $dsn, $dbusername, $dbpassword );
        $sql = "SELECT  X, Op, Y, UserKey, Date FROM Calculations ORDER BY Date DESC LIMIT 10";
        $sth = $pdo->prepare( $sql );
        $error = !$sth->execute();
        $result = $sth->fetchAll();
    }catch( PDOException $e ){
        $error = True;
    }
    return (object) array( "error" => $error, "calculations" => $result );
}

echo json_encode( getLastNCalculations($dsn, $dbusername, $dbpassword) );

?>