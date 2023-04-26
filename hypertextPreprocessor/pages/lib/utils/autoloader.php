<?php


spl_autoload_register('customAutoLoader');

function customAutoLoader($className)
{
    $path = $_SERVER['DOCUMENT_ROOT'] . '/lib/classes/';
    $ext = '.php';
    $fullPath = $path . $className . $ext;

    if (!file_exists($fullPath))
        return false;


    include_once $fullPath;
}
