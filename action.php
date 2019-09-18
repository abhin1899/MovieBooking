<?php
$res =  $_POST['json_string'];

// on reload the array is NULL;
// to reset just delete store.txt;
if($res!='[]'){
    $fp = fopen("store.txt","w");
    fwrite($fp, $res);
    fclose($fp);
}

$fp1 = fopen("store.txt","r");
echo fgets($fp1);
fclose($fp1)

?>
