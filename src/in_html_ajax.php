<?php
session_start();
if(isset($_REQUEST['action'])){
    if($_REQUEST['action']=='login'){
        if(isset($_REQUEST['user_id'])){
            $_SESSION['user_id']=$_REQUEST['user_id'];
        }
        echo '1';
    }
    if($_REQUEST['action']=='exit'){
        $_SESSION['user_id']==NULL;
        echo '1';
    }
}else{
    echo '0';
}
?>