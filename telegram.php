<?php
 
//Переменная $name,$phone, $mail получает данные при помощи метода POST из формы
$name = $_POST['Name'];
$email = $_POST['Email'];
$title = $_POST['Title'];
 
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
foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};
 
//Осуществляется отправка данных в переменной $sendToTelegram
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
 
?>