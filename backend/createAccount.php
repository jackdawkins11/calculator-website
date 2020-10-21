<?php

require "config.php";

/*
Checks for password strength. Returns object containing
    error (bool) set to true when the password is not strong
    message (string) string describing why the password failed
*/

function passwordIsStrong( $password ){
    $error = False;
    $message = "";
    if( strlen( $password ) < 10 ){
        $error = True;
        $message = "Password must be at least 10 characters";
    }else if(!preg_match("#[0-9]+#",$password)) {
        $error = True;
        $message = "Your password must contain at least 1 number";
    }else if(!preg_match("#[a-z]+#",$password)) {
        $error = True;
        $message = "Your password must contain at least 1 lowercase letter";
    }else if(!preg_match("#[A-Z]+#",$password)) {
        $error = True;
        $message = "Your password must contain at least 1 uppercase letter";
    }else if(!preg_match("#[\!\@\#\$\%\^\&\*\(\)]+#",$password)) {
        $error = True;
        $message = "Your password must contain at least 1 character from \"!@#$%^&*()\"";
    }
    return (object) array( "error" => $error, "message" => $message );
}

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
    createdAccount (bool) whether an account was created. only valid when error=False
    message (string) a message explaining what happend. only valid when created account=False
*/

function createAccount( $dsn, $dbusername, $dbpassword ){
    if( isset($_POST['username']) && isset($_POST['password']) ){
        $username = $_POST['username'];
        $password = $_POST['password'];
    }else{
        return (object)array("error" => True );
    }
    $passwordCheck = passwordIsStrong( $password );
    if( $passwordCheck->error ){
        return (object)array("error" => False, "createdAccount" => False,
            "message" => $passwordCheck->message );
    }
    $usernameAvailableRet = usernameAvailable( $username,
        $dsn, $dbusername, $dbpassword );
    if( $usernameAvailableRet->error ){
        return (object)array("error" => True );
    }
    if( !$usernameAvailableRet->available ){
        $message = "That username is in use.";
        return (object) array("error" => False, "createdAccount" => False, "message" => $message );
    }
    $error = createAccountAux( $username, $password,
        $dsn, $dbusername, $dbpassword );
    
    return (object)array("error" => $error, "createdAccount" => True );
}

echo json_encode( createAccount( $dsn, $dbusername, $dbpassword ) );

?>