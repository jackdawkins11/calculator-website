<?php

/*
Check's if the client has a session. Returns object containing
    hasSession (bool) whether the client has a session
    username (string) the client's username. Only returned when hasSession=True
*/

function checkSession(){
    session_start();
    if( isset( $_SESSION['username'] ) && isset( $_SESSION['primaryKey'] ) ){
        return (object) array( "hasSession" => True, "username" => $_SESSION['username'] );
    }else{
        return (object) array( "hasSession" => False );
    }
}

echo json_encode( checkSession() );

?>