<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <title>水果摊</title>
  <style>
    *{
        margin: 0;
        padding: 0;
    }
    body {
      background-color: hotpink;
      text-align: center;
    }
    h1{
        background: green;
    }
    ul{
        width: 80%;
        margin: 0 auto;
    }
    li{
        list-style: none;
        float: left;
        width: 30%;
        padding: 1%;
        border: 1px solid #ccc;
    } 
    li a {
        width: 100%;
    } 
    li img{
        width: 100%;
        height: 100%;
        vertical-align: middle;
    }
    li span {
        width: 100%;
        display: block;
        background: orange;
    }
  </style>
</head>

<body>
    <!-- 
      利用php生成页面
      引入其他的php页面
      $arr[0] = array('href' => 'detail/detail1.php?flag=banana','path' => 'img/banana1.jpg','name' => '香蕉');    
    -->
    <h1>水果超市</h1>
   <?php 
        include 'data_fruit_list.php';
        // print_r($arr);
        echo "<ul>";
        
        for($i = 0; $i < count($arr); $i++){
            echo '<li>';
            echo '<a href='. $arr[$i]['href'] .'>'.'点我看'.$arr[$i]['name'].'</a>';
            echo '<img src='. $arr[$i]['path'].' alt='.$arr[$i]['name'].'/>';
            echo '<span>'.$arr[$i]['name'].'</span>';
            echo '</li>';
        }
        echo "</ul>";

   ?>
  
</body>

</html>