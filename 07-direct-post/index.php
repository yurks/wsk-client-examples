<?php
include 'wsk-direct-post.inc.php';

header("Content-Type: text/html");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

  $wskSessionId = wskDirectPost("52ab62e8-f9fc-4986-8a4e-dc10573c21bd", $_POST);
  if ($wskSessionId) {
     $page = file_get_contents('results.html');
     print preg_replace('/%SESSION_ID_RECEIVED_FROM_SERVER%/m', $wskSessionId, $page);
  }

} else {
  include 'form.html';
}