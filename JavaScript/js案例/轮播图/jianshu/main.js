var lunbor = (function(){
  function lunbor(lunbor_box,img_list){
      this.lunbor_box = lunbor_box;
      this.img_list = img_list;
      this.len = img_list.length;
      this.cur_index = 0; 
      this.init();
      lun = this
      Inter = setInterval(function(){lun.next()},2000)

      var el = window.document.body;//声明一个变量，默认值为body
      window.document.body.onmouseover = function(event){
          el = event.target;//鼠标每经过一个元素，就把该元素赋值给变量el
          console.log('当前鼠标在', el, '元素上');//在控制台中打印该变量
          // console.log('在', document.getElementById(lun.lunbor_box), '元素上');//在控制台中打印该变量
          if (el == document.getElementById(lun.lunbor_box)) {
              console.info("停止换图片")
              clearInterval(Inter)
              Inter = null
              console.info('Inter "'+ Inter +'"')
          }
          else{
              console.info("自动换图片")
              if(Inter==null){//判断计时器是否为空
                  Inter = setInterval(function(){lun.next()},2000)
              }
          }
      }
  }   

  lunbor.prototype.init = function() {
      this.set_bg();

      var dot_html = "";
      for(var i =0 ;i<this.len;i++){
          // dot_html += '\n          <div class="circle"></div>'
          dot_html += '<div flag="'+ i +'" class="circle"></div>'
      }
      var circle_box = document.querySelector("#" + this.lunbor_box + " .circle_box");
      circle_box.innerHTML = dot_html;

      this.set_dot_active();

      // 绑定点击事件
      this.bind_evnet();

  };

  lunbor.prototype.bind_evnet = function(){
      var right_btn = document.querySelector("#" + this.lunbor_box + " .right_btn");
      var left_btn = document.querySelector("#" + this.lunbor_box + " .left_btn");
      var lunbor_box = this;
      right_btn.onclick = function(){
          lunbor_box.next();
      }
      left_btn.onclick = function(){
          lunbor_box.last();
      }

      var circles = document.querySelectorAll("#" + this.lunbor_box + " .circle_box .circle");
      circles.forEach(function(data){
          var num = data.getAttribute("flag")
          console.info(num)
          data.onclick = function(){
              lunbor_box.set_num(num);
          }
      });
  }
  
  lunbor.prototype.set_num = function(num){
      this.cur_index = num;
      this.set_bg();
      this.set_dot_active();
  }

  lunbor.prototype.set_bg = function(){
      var lunbor_box = document.getElementById(this.lunbor_box)
      lunbor_box.style.background = "url(./img/"+ this.img_list[this.cur_index]+")"
      lunbor_box.style.backgroundSize = "cover";
  }

  lunbor.prototype.set_dot_active =function(){
      var circle_box = document.querySelector("#" + this.lunbor_box + " .circle_box");
      var children = circle_box.children;
      for(var i=0;i< children.length;i++){
          var child = children[i];
          child.classList.remove("active");
          if(i==this.cur_index) {
              child.classList.add("active")
          }
      }
  }

  lunbor.prototype.next = function(){
      var circle_box = document.querySelector("#" + this.lunbor_box + " .circle_box");
      var children = circle_box.children;
      if(this.cur_index < this.len -1){
          this.cur_index++;
      }else{
          this.cur_index = 0;
      }
      this.set_bg();
      this.set_dot_active();
  }

  lunbor.prototype.last = function(){
      var circle_box = document.querySelector("#" + this.lunbor_box + " .circle_box");
      var children = circle_box.children
      if(this.cur_index > 0){
          this.cur_index--;
      }else{
          this.cur_index = this.len - 1;
      }
      this.set_bg();
      this.set_dot_active();
  }

  return lunbor;
}());

