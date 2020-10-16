<?php

require "config.php";

/*
Checks if the username and password specified in the POST
request correspond to an account. Gets the PrimaryKey for a valid account.
Returns an object containing:
    error (bool) whether there was an error
    signedIn (bool) whether the username and password are correct. Only returned when error=False
    primaryKey (int) the account's primary key. Only returned when signedIn=True
*/

function signIn( $dsn, $dbusername, $dbpassword ){
    if( isset($_POST['username']) && isset($_POST['password']) ){
        $username = $_POST['username'];
        $password = $_POST['password'];
    }else{
        return (object)array("error" => True );
    }
    try{
        $pdo = new PDO( $dsn, $dbusername, $dbpassword );
        $sql = "SELECT PrimaryKey, Password FROM Users WHERE Username = ?";
        $sth = $pdo->prepare( $sql );
        $error = !$sth->execute( array($username) );
        $result = $sth->fetchAll();
    }catch( PDOException $e ){
        $error = True;
    }
    if( $error ){
        return (object)array("error" => True );
    }
    if( count( $result ) != 1 ){
        return (object)array("error" => False, "signedIn" => False );
    }
    $signedIn = $result[ 0 ][ "Password" ] == $password;
    $primaryKey = $result[ 0 ][ "PrimaryKey" ];
    if( $signedIn ){
        return (object)array("error" => False, "signedIn" => True, "primaryKey" => $primaryKey );
    }else{
        return (object)array("error" => False, "signedIn" => False );
    }
        
}

/*
Starts a session if the POST request contains a valid username and password.
Returns object containing:
    error (bool) whether there was an error
    hasSession (bool) whether a session was started
*/

function startSession( $dsn, $dbusername, $dbpassword ){
    $signInRet = signIn( $dsn, $dbusername, $dbpassword );
    if( $signInRet->error ){
        return (object)array("error" => True, "hasSession" => False );
    }else if( !$signInRet->signedIn ){
        return (object)array("error" => False, "hasSession" => False );
    }
    session_start();
    $_SESSION['username'] = $_POST['username'];
    $_SESSION['primaryKey'] = $signedIn->primaryKey;
    return (object)array("error" => False, "hasSession" => True );
}

echo json_encode( startSession( $dsn, $dbusername, $dbpassword ) );