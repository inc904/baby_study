<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<?php
    // header("content-type:text/html;charset=utf-8");
    // print_r($_GET);
    // Array ( [LOLHero] => 亚索 ) 
    $heroName =  $_GET['LOLHero'];
    include './data_lol_detail.php';
    if($heroArr[$heroName]){
        $hero = $heroArr[$heroName];
        echo "<h2>".$hero["champion_title"]."--<span>".$hero["champion_name"]."</span></h2>";
        echo "<img src=".$hero["champion_icon"]." alt=".">";
        echo "<p>".$hero["champion_info"]."</p>";
        echo "<p>".$hero["champion_tags"]."</p>";
    }else{
        echo "查询的数据不存在！";
    }
    // Array ( [champion_icon] => images/1493291013439.jpg [champion_name] => 洛 [champion_title] => 幻翎 [champion_info] => 对洛特兰部落而言，瓦斯塔亚的洛是臭名远播的捣蛋鬼，同时也是有史以来最为出色的战舞舞者。 [champion_tags] => tags:辅助，突进，法术 ) 

        // print_r($hero);
        
?>
  <a href="./index.php">再考虑一下</a>

</body>
</html>