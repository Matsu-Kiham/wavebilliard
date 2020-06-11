'use strict';


//canvas上�?�座標位置確認用�?バッグ�?ール
 const canvas = document.getElementById("screen") ;
 const bullet = document.getElementById("bullet") ; 

 //canva.addEventListener("mousemove", (e) => {
     //var rect = e.target.getBoundingClientRect();
     //var x = e.clientX - rect.left
     //var y = e.clientY - rect.top
     //document.getElementById("debug").innerHTML = `${x}:${y}`
 //}); 

//スタート画面を描く関数
 function draw_start(canvas) {
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "28px serif";
    ctx.fillText("PRESS START", 110, 200);
  }
}




 

//ポケットを描く関数
function draw_pocket(canvas) {
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(40, 0);
      ctx.lineTo(40, 40);
      ctx.lineTo(0, 40);
      ctx.fillStyle = '#000000' ;
      ctx.fill();
  }
}

//キャンバスを消す関数
function clear_canvas(canvas) {
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

//ボールを描く関数
function draw_ball(canvas, x, y, k) {
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

      ctx.globalCompositeOperation = "destination-out" ;
      ctx.beginPath();
      ctx.arc(x,y,20,0,Math.PI*2,true);
      ctx.fill() ;
      ctx.globalCompositeOperation = "source-over" ;
      ctx.beginPath();
      ctx.arc(x,y,20,0,Math.PI*2,true);
      ctx.stroke();
      ctx.beginPath();
      ctx.font = "24px serif";
      ctx.fillStyle = '#000000' ;
      ctx.fillText(k + 1, x - 7, y + 7) ;
  }
}

//キャンバスを青く塗る関数
function draw_water(canvas) {
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(400, 0);
    ctx.lineTo(400, 400);
    ctx.lineTo(0, 400);
    ctx.fillStyle = '#7fffd4' ;
    ctx.fill();
  }
}

//波を描く関数
function draw_wave(canvas, ix, iy, T) {
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    
      ctx.beginPath();
      ctx.arc(ix,iy,80*T,0,Math.PI*2,true);
      ctx.stroke();
}
}

//弾数を描く関数
function draw_bullet(bullet, bullet_number) {
  if (bullet.getContext) {
    var ctx = bullet.getContext('2d');
   
    if (bullet_number > 0) {
    var k17 = 1 ;
    do {
      ctx.beginPath();
    ctx.moveTo((7 - k17)*30 - 3, 3);
    ctx.lineTo((7 - k17)*30 - 24, 3);
    ctx.lineTo((7 - k17)*30 - 24, 27);
    ctx.lineTo((7 - k17)*30 - 3, 27);
    ctx.fillStyle = '#000080' ;
    ctx.fill();
    k17 = k17 + 1 ;
    }
    while (k17 < bullet_number + 1) ;
  }
}
}

//弾数のキャンバスを消す関数
function clear_bullet(bullet) {
  if (bullet.getContext) {
    var ctx = bullet.getContext('2d');
    ctx.clearRect(0, 0, bullet.width, bullet.height);
  }
}

//ボールの中心の座標
var x = new Array(9) ;
var y = new Array(9) ;
//ボールの初期の中心の座標の計算
var N ;
//開始ボタンを押した時刻データ
var start_time ;
//ボールがポケットに落ちたかどうかの印
var pocket = new Array(9) ;
var k13 = 0 ;
do {
  pocket[k13] = 0 ;
  k13 = k13 + 1 ;
}
while (k13 < 9) ;
var pc = 0 ;
//弾数
var bullet_number = 6 ;

function first_position(canvas) {

  //弾数を描く
  draw_bullet(bullet,bullet_number) ;
  //開始時間を保存
  start_time = new Date() ;
    N = 0 ;
    
    do { 
      x[N] = Math.random()*360 + 20 ;
      y[N] = Math.random()*360 + 20 ;
      var k5 = 0 ;
      if (x[N] > 60) { k5 = 1 ; }
      if (y[N] > 60) { k5 = 1 ; }
      if (k5 > 0) {
      if (N > 0) {
        var k1 = 0 ;
        do {
          var k2 = 0 ;
          var k4 = 0 ;
          if (x[N] > 60) { k4 = 1 ; }
          if (y[N] > 60) { k4 = 1 ; }
          if (k4 > 0) {
          if (Math.abs(x[N] - x[k1]) < 40) { k2 = k2 + 1 ; }
          if (Math.abs(y[N] - y[k1]) < 40) { k2 = k2 + 1 ; }
          k1 = k1 + 1 ;
          if (k2 < 2) {
            if (N == k1) { k2 = 3 ; }
          ; }
        } else {
          k2 = 2 ;
        }
        }
        while (k2 < 1.5) ;
      }
      if (N < 1) { N = N + 1 ; }
      if (k2 > 2.5) { N = N + 1 ; }
    }
  }
    while (N < 9) ;
    //ボールの初期配置を描く
    clear_canvas(canvas) ;
    draw_water(canvas) ;
    var k3 = 0 ;
    do {
      draw_ball(canvas, x[k3], y[k3], k3) ;
      k3 = k3 + 1 ;
    }
    while (k3 < 9) ;
    //ポケットを描く
    draw_pocket(canvas) ;
  }
  
function wave(canvas,ix,iy) {
  
  //弾を一つ消費
  bullet_number = bullet_number - 1 ;

  var k6 = 0 ;
  //波がボールの中心を通過する時間=ボールが動き始める時間=Tm
  var Tm = new Array(9) ;
  do {
    if (pocket[k6] != 1) {
    //波の進む速度>ボールの進む速度
    Tm[k6] = Math.sqrt(Math.pow((x[k6] - ix),2) + Math.pow((y[k6] - iy),2))/80 ;
    }
    k6 = k6 + 1 ;
  }
  while (k6 < 9) ;
  
  var T = 0 ;
  var PT = 0.5 ;
  
  
    var intervalID = window.setInterval(function() {

  do {
    var k7 = 0 ;
    do {
      if (pocket[k7] != 1) {
      if (T > Tm[k7]) {
        //波はボールに初速を与える（t=T_0のとき，v=v_0）
        //ボールは運動方程式に従って動く
        //ボールの動きはx軸方向とy軸方向に分けて数値計算する．1次の近似式．
        //ボールは水面から摩擦を受けて自然に止まる
        if (x[k7] < ix) {
          x[k7] = x[k7] - 100/(1 + 3*Tm[k7]*(T - Tm[k7]))*0.1 ;
          y[k7] = y[k7] - (iy - y[k7])/(ix - x[k7])*100/(1 + 3*Tm[k7]*(T - Tm[k7]))*0.1 ;
        } else {
          x[k7] = x[k7] + 100/(1 + 3*Tm[k7]*(T - Tm[k7]))*0.1 ;
          y[k7] = y[k7] + (iy - y[k7])/(ix - x[k7])*100/(1 + 3*Tm[k7]*(T - Tm[k7]))*0.1 ;
        }
      }
    }
      k7 = k7 + 1 ;
    }
    while (k7 < 9) ;

    
    //ボール同士がぶつかったら，離れる．壁にぶつかったら跳ね返る（反射の法則）
    //ボールの動きを計算する→壁にぶつかってないか確認→ぶつかってたら反転移動する→ボール同士ぶつかってないか確認→ぶつかってたら引き離す
    //→壁にぶつかってないか確認→．．．すべてのボールが壁にもボールにもぶつかっていなければ描画
    do {
      var excl = 0 ;
      var k8 = 0 ;
      do {
        var k9 = k8 + 1 ;
        do {
          if (pocket[k8] != 1) {
            if (pocket[k9] != 1) {
          if (Math.abs(x[k8] - x[k9]) < 40) {
            if (Math.abs(y[k8] - y[k9]) < 40) {
            var delta_x = Math.abs(x[k8] - x[k9]) ;
            if (x[k8] > x[k9]) {
              x[k8] = x[k8] + (40 - delta_x) ;
              x[k9] = x[k9] - (40 - delta_x) ;
            } else {
              x[k8] = x[k8] - (40 - delta_x) ;
              x[k9] = x[k9] + (40 - delta_x) ;
            };
            var delta_y = Math.abs(y[k8] - y[k9]) ;
            if (y[k8] > y[k9]) {
              y[k8] = y[k8] + (40 - delta_y) ;
              y[k9] = y[k9] - (40 - delta_y) ;
            } else {
              y[k8] = y[k8] - (40 - delta_y) ;
              y[k9] = y[k9] + (40 - delta_y) ;
            };
            excl = 2 ;
            }
          }
        }
      }
          k9 = k9 + 1 ;
        }
        while (k9 < 9) ;
        k8 = k8 + 1 ;
      }
      while (k8 < 8) ;

      var k10 = 0 ;
      do {
        if (pocket[k10] != 1) {
        if ((x[k10] - 20) < 0) {
          x[k10] = x[k10] + 2*Math.abs(x[k10] - 20) ;
          excl = 2 ;
        }
        if ((x[k10] + 20) > 400) {
          x[k10] = x[k10] - 2*Math.abs(x[k10] - 380) ;
          excl = 2 ;
        }
        if ((y[k10] - 20) < 0) {
          y[k10] = y[k10] + 2*Math.abs(y[k10] - 20) ;
          excl = 2 ;
        }
        if ((y[k10] + 20) > 400) {
          y[k10] = y[k10] - 2*Math.abs(y[k10] - 380) ;
          excl = 2 ;
        }
      }
        k10 = k10 + 1
      }
      while (k10 < 9) ; 
    }
    while (excl > 1) ;
    
    
    

    //ボールの動きの計算間隔と描画時刻はあらかじめ決めておく．
    //例：計算間隔0.2秒，描画間隔1秒．0.2秒で計算を5回繰り返し，5回目の計算後の結果を描画．計算時間<描画間隔である必要
    T = T + 0.1 ;
  }
  while (T < (PT + 0.1)) ;

//すべての状態（波の位置，ボールの位置）を時間の関数として常に計算する
//出力は一度キャンバスを消してから，毎回すべて書き直す


  clear_canvas(canvas) ;
  draw_water(canvas) ;
  //波を描く
  draw_wave(canvas, ix, iy, T) ;
  //ポケットを描く
  draw_pocket(canvas) ;
  //ボールの配置を描く
  var k11 = 0 ;
  do {
    if (pocket[k11] != 1) {
    draw_ball(canvas, x[k11], y[k11], k11) ;
    }
    k11 = k11 + 1 ;
  }
  while (k11 < 9) ;



PT = PT + 0.5 ;

if (PT > 8) { 
  var k14 = 0 ;
  do {
    if (pocket[k14] != 1) {
      if (x[k14] < 40) {
        if (y[k14] < 40) {
          pocket[k14] = 1 ;
          pc = pc + 1 ;
          bullet_number = bullet_number + 3
          if (bullet_number > 6) { bullet_number = 6 ; }
        }
      }
    }
    k14 = k14 + 1 ;
  }
  while (k14 < 9) ;

  clear_canvas(canvas) ;
  draw_water(canvas) ;
  //波を描く
  draw_wave(canvas, ix, iy, T) ;
  //ポケットを描く
  draw_pocket(canvas) ;
  //ボールの配置を描く
  var k16 = 0 ;
  do {
    if (pocket[k16] != 1) {
    draw_ball(canvas, x[k16], y[k16], k16) ;
    }
    k16 = k16 + 1 ;
  }
  while (k16 < 9) ;

  //弾数を描く
  clear_bullet(bullet) ;
  draw_bullet(bullet, bullet_number) ;

  //ボールが順番に落ちなくても終わり（GAME OVER）
  var k15 = 0 ;
  if (pc > 0) {
  do {
    if (pocket[k15] !=1 ) { alert('GAME OVER') ; }
    k15 = k15 + 1 ;
  }
  while (pc > k15) ;

  //ボールがすべてポケットに落ちたら終わり（GAME CLEAR）
  //タイマーをつける
  if (pc == 9) { 
    var end_time = new Date() ;
    var start_hour = start_time.getHours() ;
    var start_minutes = start_time.getMinutes() ;
    var start_seconds = start_time.getSeconds() ;
    var end_hour = end_time.getHours() ;
    var end_minutes = end_time.getMinutes() ;
    var end_seconds = end_time.getSeconds() ;
    
    var elapsed_hour = end_hour - start_hour ;
    var elapsed_minutes = end_minutes - start_minutes ;
    var elapsed_seconds = end_seconds - start_seconds ;

    if (elapsed_hour < 0) { elapsed_hour = elapsed_hour + 24 ; }
    if (elapsed_minutes < 0) {
      elapsed_minutes = elapsed_minutes + 60 ;
      elapsed_hour = elapsed_hour - 1 ;
     }
    if (elapsed_seconds < 0) {
      elapsed_seconds = elapsed_seconds + 60 ;
      elapsed_minutes = elapsed_minutes - 1 ;
    }


    alert('GAME CLEAR!  ' + elapsed_hour + 'h' + elapsed_minutes + '\'' + elapsed_seconds + '\"') ;
  }
}

if (bullet_number < 1) {
  if (pc != 9) {
    alert('GAME OVER') ;
  }
}

  window.clearInterval(intervalID) ; }

    },500) ;





}


             

             // 再開ボタンを押したとき、ブラウザをリロードす�?
    // https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
    const restart = document.getElementById('restart');
    restart.addEventListener('click', function () {
      window.location.reload();
    });

draw_start(canvas) ;

//開始ボタンを押すと，始めのボールの位置を計算して描く
const start = document.getElementById('start');
start.addEventListener('click', function() { first_position(canvas,x,y,N) ; }, false);


canvas.addEventListener("click", (e) => {
  var rect = e.target.getBoundingClientRect();
  var ix = e.clientX - rect.left
  var iy = e.clientY - rect.top
  var k12 = 0 ;
  if (ix < 40) {
    if (iy < 40) {
      k12 = 1 ;
    } ;
  }
  if (k12 != 1) { wave(canvas,ix,iy) ; }
} ) ;