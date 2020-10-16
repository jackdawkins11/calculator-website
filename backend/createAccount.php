<?php

require "config.php";

/*
Checks if the username is available. Returns object with two properties:
    error (bool) whether there was an error accessing the db
    available (bool) whether the name is available. Only valid when error=False
*/

function usernameAvailable( $username,
    $dsn, $dbusername, $dbpassword ){
    try{
        $pdo = new PDO( $dsn, $dbusername, $dbpassword );
        $sql = "SELECT Username FROM Users WHERE Username = ?";
        $sth = $pdo->prepare( $sql );
        $error = !$sth->execute( array($username) );
        $result = $sth->fetchAll();
        $available = count($result) == 0;
    }catch( PDOException $e ){
        $available = False;
        $error = True;
    }
    return (object)array("error" => $error, "available" => $available );
}

/*
Creates the account. Returns whether there was an error as a boolean.
*/

function createAccountAux( $username, $password,
    $dsn, $dbusername, $dbpassword ){
    try{
        $pdo = new PDO( $dsn, $dbusername, $dbpassword );
        $sql = "INSERT INTO Users (Username, Password) VALUES ( ?, ? )";
        $sth = $pdo->prepare( $sql );
        $error = !$sth->execute( array($username, $password) );
    }catch( PDOException $e ){
        $error = True;
    }
    return $error;
}

/*
Reads the POST parameters (username, password) and tries to create an account.
It returns an object containing:
    error (bool) whether there was an error accessing the db
    available (bool) whether the username is available. Only valid when error=False
*/

function createAccount( $dsn, $dbusername, $dbpassword ){
    if( isset($_POST['username']) && isset($_POST['password']) ){
        $username = $_POST['username'];
        $password = $_POST['password'];
    }else{
        return (object)array("error" => True, "available" => False );
    }
    $usernameAvailableRet = usernameAvailable( $username,
        $dsn, $dbusername, $dbpassword );
    if( $usernameAvailableRet->error || !$usernameAvailableRet->available ){
        return $usernameAvailableRet;
    }
    $error = createAccountAux( $username, $password,
        $dsn, $dbusername, $dbpassword );
    
    return (object)array("error" => $error, "available" => True );
}

echo json_encode( createAccount( $dsn, $dbusername, $dbpassword ) );