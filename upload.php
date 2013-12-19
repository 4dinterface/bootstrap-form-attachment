<?php
// Каталог, в который мы будем принимать файл:
$uploaddir = '/files/';
foreach ($_FILES['userfile']['name'] as $i => $name)
{
    $userfile = $uploaddir.basename($name);
 
    // Копируем файл из каталога для временного хранения файлов:
    if (move_uploaded_file($_FILES['userfile']['tmp_name'][$i], $userfile))
    {
        echo "<h3>Файл успешно загружен на сервер</h3>";
    }
    else
    {
        echo "<h3>Ошибка! Не удалось загрузить файл на сервер!</h3>"; exit;
    }
 
    // Выводим информацию о загруженном файле:
    echo "<h3>Информация о загруженном на сервер файле: </h3>";
    echo "<p><b>Оригинальное имя загруженного файла: ".$_FILES['userfile']['name'][$i]."</b></p>";
    echo "<p><b>Mime-тип загруженного файла: ".$_FILES['userfile']['type'][$i]."</b></p>";
    echo "<p><b>Размер загруженного файла в байтах: ".$_FILES['userfile']['size'][$i]."</b></p>";
    echo "<p><b>Временное имя файла: ".$_FILES['userfile']['tmp_name'][$i]."</b></p>";
}
 
?>