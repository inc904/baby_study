<?php
    //单行注释
    /*
        多行注释  
    */
    // 分号一定要写！！！ 

    // 设置页面的编码格式。使用 PHP 的函数，
    // php 中有四千多个函数
    header('content-type:text/html;charset=utf-8');
    // header("Content-type: text/html; charset=gbk"); 

    // 输出语句
    echo 'hello world!';
    // 输出换行
    echo '<br>';
    echo '你好，世界！';
    // 变量的定义
    $name = '高桥蕨妹子';
    echo $name;
    // 数字
    $num = 123;
    echo $num;
    // 布尔值
    $male = false;
    // 逻辑语句
    if($male){
        echo '妹子';
    }else{
        echo '汉子';
    }
    $day = '周二';
    switch($day){
        case '周一':
            echo '上班';
        break;
        default:
            echo '休息！';
    }

    // for循环
    for($i = 0; $i < 3; $i++){
        echo '<br>';
        echo '感觉自己萌萌哒' . $i ;
    }
    echo '<br>';
    // while(){}
    
    // 定义数组 1
    $foodArr = array('黄焖鸡', '西兰花', '蛋炒饭');
    // echo  $foodArr[0];  错误

    // 直接 输出复杂类型
    print_r($foodArr);
    // 获取数组的长度
    $length = count($foodArr);
    for($i = 0; $i < $length; $i++){
        echo '<br>';
        echo $i.'===='.$foodArr[$i];
    }
    echo '<br>';
    echo '===';
    echo '<br>';

    // 定义数组 2，关系型数组
    $person = array('name'=>'吴京','film'=>'战狼','wife'=>'谢楠');
    echo $person['wife'];
    echo '<br>';

    // 遍历 数组
    # 也是注释吗？

    foreach ($person as $key => $value) {
        # code...
        echo $key.'====>'.$value.'<br>';
    }

    echo '<br>';

    $starArr = array(
        array('name'=>'吴京','film'=>'战狼','wife'=>'谢楠'),
        array('name'=>'谢霆锋','film'=>'新警察故事','wife'=>'谢楠'),
        array('name'=>'彭于晏','film'=>'悟空传','wife'=>'谢楠')
    );

    for($i = 0;$i < count($starArr); $i++){
        // echo '明星'.$starArr[$i]['name'].'出演了'.$starArr[$i]['film'].'好朋友是'.$starArr[$i]['wife'].'<br>';
        echo '<h2>'.'明星:'.$starArr[$i]['name'].'出演了'.$starArr[$i]['film'].'好朋友是'.$starArr[$i]['wife'].'</h2>';
    }

?>