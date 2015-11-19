<?php
getMessages();
function getMessages()
{
    $sql = "select * from messages order by code";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $messages = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        echo json_encode($messages);
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}';
    }
}

function getConnection()
{
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "111111";
    $dbname = "test";
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}