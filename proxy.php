<?php
/**
 * Created by PhpStorm.
 * User: vit
 * Date: 19/06/2016
 * Time: 6:51 PM
 */
header('Access-Control-Allow-Origin: *');


//echo 'http://'.$_GET['call'];
echo file_get_contents(urldecode('http://'.$_GET['call']));