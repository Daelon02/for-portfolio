<?php

    //Даные телеграмм
    $token ='1509208531:AAH1AbthWUCXqDsM6EVg0pTB5ldykrNeadQ';
    $chatid = '-496705444';
    $success = 'Сообщение отправлено';
    $text_error = 'Форма не заполнена';
     
     
     
     
     
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){
     
    //Data from form
    $name = $_POST['name'];
    $email = $_POST['email'];
    $title = $_POST['title'];
     
    // Message
    $tmtext = array(
    "Name" => $name,
    "Email" => $email,
    "Title" => $title
    );
    //Putting everything into a message
    $txt='';
    foreach($tmtext as $key => $value) { 
         $txt .= "".$key.": ".$value."%0A"; 
      }
    #Send message
    fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chatid}&parse_mode=html&text={$txt}","r");
    } else {
      echo 'console.log('. json_encode( $name ) .')';
    }
     
?>