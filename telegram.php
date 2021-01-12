<?php

    //Даные телеграмм
    $token ='1509208531:AAH1AbthWUCXqDsM6EVg0pTB5ldykrNeadQ';
    $chatid = '-496705444';   
        
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){
     
    //data from forms
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $title = trim($_POST['title']);
     
    // Message
    $tmtext = array(
    "Name" => $name,
    "Email" => $email,
    "Title" => $title
    );
    //putting everything into a message
    $txt='';
    foreach($tmtext as $key => $value) { 
         $txt .= "".$key.": ".$value."%0A"; 
      }
    #Send message
    fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chatid}&parse_mode=html&text={$txt}","r");
     
?>