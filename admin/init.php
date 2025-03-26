<?php

  include 'connect.php';
  //Routes
  $tpl = "includes/templates";
  $css = "layout/css";
  $js = "layout/js";

  ini_set('session.cookie_lifetime', 86400); // 1 jour
  ini_set('session.gc_maxlifetime', 86400);
  session_set_cookie_params(86400);
  ?>