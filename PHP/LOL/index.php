<!DOCTYPE html>
<html lang="zh-cn">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bootstrap 101 Template</title>

  <!-- Bootstrap -->
  <link href="lib/css/bootstrap.min.css" rel="stylesheet">

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
      <![endif]-->
  <style>
    img {
      width: 242px;
      /*important 不要滥用   */
      height: 200px !important;
    }
    .panel-body{
      background-color: skyblue;
    }
  </style>
</head>

<body>
  <!--
      1.访问数据库 获取数据 =>假数据
      2.解析数据
      3.生成html机构
          <div class="col-sm-6 col-md-4">
            <div class="thumbnail">
              <img src="./images/1415693006769.png" alt="...">
              <div class="caption">
                <h3>亚索</h3>
                <p><a href="#" class="btn btn-primary" role="button">购买</a> <a href="#" class="btn btn-default" role="button">详情</a></p>
              </div>
            </div>
          </div>

    -->
  <div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">LOL - hero</h3>
        <form action="./LOL_detail.php" method="get">
            <input name="LOLHero" type="text" placeholder="请输入查询英雄的名字">
            <input type="submit" value="查询">
        </form>
    </div>
    <div class="panel-body">
      <div class="container">
        <div class="row">
          <?php
              // 1.引入文件 假数据
              include './data_lol_list.php';

              // 2.解析数据
              for ($i=0; $i <count($heroArr) ; $i++) { 
                echo ' <div class="col-sm-6 col-md-4">
                        <div class="thumbnail">
                          <img src="'.$heroArr[$i]['champion_icon'].'" alt="...">
                          <div class="caption">
                            <h3>'.$heroArr[$i]['champion_name'].'</h3>
                            <p><a href="" class="btn btn-primary" role="button">购买</a> 
                            <a href="./LOL_detail.php?LOLHero='.$heroArr[$i]['champion_name'].'".
                            
                            class="btn btn-default" role="button">详情</a></p>
                          </div>
                        </div>
                      </div>';
              }
          ?>
        </div>
      </div>
    </div>
  </div>
</body>

</html>
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="lib/js/jquery-1.12.4.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="lib/js/bootstrap.min.js"></script>