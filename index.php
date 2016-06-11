<?php
require __DIR__ . '/vendor/autoload.php';
// example request: http://uparts.dev/Example?method=sayHello&name=World
use Uparts\RestServer;

$rest = new RestServer('Uparts\TireSync');

$rest->handle();
