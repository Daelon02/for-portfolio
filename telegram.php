<?php
 
//Переменная $name,$phone, $mail получает данные при помощи метода POST из формы
$name = $_POST['user-name'];
$email = $_POST['user_email'];
$title = $_POST['user_title'];
 
//в переменную $token нужно вставить токен, который нам прислал @botFather
$token = "1509208531:AAGtyzlfLldE1OTEJtggnyTv3N3zjHTw_7A";
 
//нужна вставить chat_id 
$chat_id = "-496705444";
 
//Далее создаем переменную, в которую помещаем PHP массив
$arr = array(
  'Username: ' => $name,
  'Email: ' => $email,
  'Title: ' => $title
);
 
//При помощи цикла перебираем массив и помещаем переменную $txt текст из массива $arr
$txt = "<pre>";
foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b>".$value."\n".$title;
};
$txt .= "</pre>";
$txt = urlencode($txt);
 
//Осуществляется отправка данных в переменной $sendToTelegram
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
 
?>