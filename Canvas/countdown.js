// 固定大小
//var WINDOW_WIDTH = 1024;
// var WINDOW_HEIGHT = 768;
// var RADIUS = 8;
// var MARGIN_TOP = 60;
// var MARGIN_LEFT = 30;

//const endTime = new Date(2019, 4, 23, 12, 15, 36)
var endTime=new Date();
endTime.setTime(endTime.getTime()+3600*1000);
var curShowTimeSeconds = 0;

//空数组储存小球，通过push添加元素
var balls = [];
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#cc0000"];

window.onload = function () {
    
    //屏幕自适应
    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;

    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1

    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
    
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowSeconds();

    //控制一段时间后刷新上色并刷新当前时间与之前时间形成比较
    setInterval(function () {
        render(context);
        update();
    }
        ,
        50
    );

}

//返回时间差，单位为秒
function getCurrentShowSeconds() {
    var curtime = new Date();
    var ret = endTime.getTime() - curtime.getTime();
    ret = Math.round(ret / 1000);

    return ret >= 0 ? ret : 0;
}

//把getCurrentShowSeconds()返回的时间差给换算成多少小时、分钟、秒
//并且判断一段时间前的时间（curShowTimeSeconds）与当前时间（nextShowTimeSeconds）是否相等，若不相等，则对应的数字的对应点都会变成有色小球做抛物运动，并把当前时间（nextShowTimeSeconds）赋给之前的时间（curShowTimeSeconds）
function update() {

    var nextShowTimeSeconds = getCurrentShowSeconds();

    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60)
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60)
    var curSeconds = curShowTimeSeconds % 60;

    if (nextSeconds != curSeconds) {

        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHours / 10));
        }
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours % 10));
        }

        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
        }
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
        }

        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
        }
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10))
        }

        curShowTimeSeconds = nextShowTimeSeconds;
    }
    updateBalls()

    //打印共有多少个小球
    console.log(balls.length);
}

//定义小球的抛物运动的运动轨迹
function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;


        //碰撞检测，并且当y反方向速度小于某个值时直接归零
        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            if (balls[i].vy < 4) {
                balls[i].vy = 0;
            } else {
                balls[i].y = WINDOW_HEIGHT - RADIUS;
                balls[i].vy = -balls[i].vy * (0.3 + Math.random() * (0.5));
            }

        }
    }


    //计算在画布范围内的小球个数，并把在画布外的小球删除
    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
            balls[cnt++] = balls[i];
        }
    }

    //删除多余小球（索引cnt后面的）
    while (balls.length > cnt) {
        balls.pop();
    }

}

//添加随机上色的脱落小球
function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++)

        for (var j = 0; j < digit[num][i].length; j++)

            if (digit[num][i][j] == 1) {
                var aball = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1 + Math.random(),

                    vx: Math.pow(-1, Math.ceil(Math.random() * 100)) * 5,

                    vy: Math.ceil(Math.random() * 100) % 8,

                    color: colors[Math.ceil(Math.random() * 100) % 10]

                }
                balls.push(aball)
            }
}

//描绘小球，并为脱落状的小球上色
function render(cxt) {

    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);//对矩形画布进行刷新
    // var hours=12;
    // var minutes=22;
    // var seconds=15;

    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60)
    var seconds = curShowTimeSeconds % 60;

    // renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt)
    // renderDigit(MARGIN_LEFT + 140, MARGIN_TOP, parseInt(hours % 10), cxt)
    // renderDigit(MARGIN_LEFT + 280, MARGIN_TOP, 10, cxt)
    // renderDigit(MARGIN_LEFT+360, MARGIN_TOP, parseInt(minutes / 10), cxt)
    // renderDigit(MARGIN_LEFT+500, MARGIN_TOP, parseInt(minutes % 10), cxt)
    // renderDigit(MARGIN_LEFT+640, MARGIN_TOP, 10, cxt)
    // renderDigit(MARGIN_LEFT+720, MARGIN_TOP, parseInt(seconds / 10), cxt)
    // renderDigit(MARGIN_LEFT+860, MARGIN_TOP, parseInt(seconds % 10), cxt)
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt)
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt)
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt)
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);

    for (var i = 0; i < balls.length; i++) {

        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
        cxt.closePath();
        cxt.fill();

    }

}

//描绘本身数字颜色
function renderDigit(x, y, num, cxt) {

    cxt.fillStyle = "#005588";

    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();

                cxt.fill();
            }
        }
    }
}