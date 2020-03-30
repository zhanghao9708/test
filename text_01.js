$(function(){            
    ajaxs();
    ajaxs1()
})

// 导航条
$('.nav').on('mouseenter', 'li', function(e) {
    $('.line').css("left", e.currentTarget.offsetLeft + "px");
})
$('.nav').on('mouseleave', 'li', function () {
    $(".line").css("left", $('.on')[0].offsetLeft + "px");
})
$('.nav').on('click', 'li', function() {
    $('li').removeClass("on");
    $(this).addClass("on");
})


//轮播图
var speed = 5000;//时间
var num = 1; //循环遍历
var playtime8;

//定时器
playtime8 = setInterval(runPlay8, speed);

//定时函数
function runPlay8() {
    if (num > 3) {
        num = 0;
    }
    controlPlay8(num);
    num++;
}

//控制图片和图标变化
function controlPlay8(n) {
    $(".zbanner888 img").removeClass("show8").eq(n).addClass("show8");
    $(".znumber8 li").removeClass("zcurrent8").eq(n).addClass("zcurrent8");
}

//给整个轮播图绑定鼠标悬停事件
$(".zbox888").on("mouseenter", function () {
    //左右控制按钮显示
    $(".zfoot8").stop().fadeIn(500);

    //停止定时器
    clearInterval(playtime8);
})
$(".zbox888").on("mouseleave", function () {
    //左右按钮隐藏
    $(".zfoot8").stop().fadeOut(500);
    
    //重新定时
    playtime8 = setInterval(runPlay8, speed);
})

//给li控制图标绑定单击事件
$(".znumber8>li").on("click", function () {
    controlPlay8($(this).index());
    num = $(this).index() + 1;
})

$(".zright8").on("click", function () {
    if (num > 3) {
        num = 0;
    }
    controlPlay8(num);
    num++;
})

$(".zleft8").on("click", function () {
    num -= 2;
    if (num < 0) {
        num = 3;
    }
    //显示下一张
    controlPlay8(num);
    //保证m显示下一张
    num++;
})

// 曲线图
var myChart = echarts.init(document.getElementById('main'));
let value;
let xAxis;
let series;
function ajaxs(){
    //1.创建Ajax对象
    var myajax=new XMLHttpRequest()
myajax.open('GET','https://edu.telking.com/api/?type=month',true);
    //3.发送请求
    myajax.send(null);
    //4.接受返回的数据
    myajax.onreadystatechange=function(){ //1、onreadystatechange属性的使用时连接函数
        if(myajax.readyState==4){ //2、readyState是XMLHttpRequest对象的属性，所以要是对象.属性的方式访问
            if (myajax.status==200) {
                value = JSON.parse(myajax.responseText)
                xAxis = value.data.xAxis;
                series = value.data.series;
                options()  //3、js中+号连接字符串   4、XMLHttpRequest对象的responseText属性获取从服务器返回的数据
            }else{
                alert('失败'+myajax.status)
            }
        }
    }

}
// 指定图表的配置项和数据
function options() {
    console.log(xAxis,series)
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        title: {
            x:'450px',
            y:'10px',
            text: '曲线图数据展示'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            show:true,
            data: xAxis
        },
        yAxis: {
            type: 'value',
            name:"人"
        },
        series: [
        
            {
                name:'曲线图数据展示',
                itemStyle : { normal: {
                    label : {show: true},
                    color:'#07f7f7',
                    lineStyle:{ 
                        color:'#07f7f7' //改变折线颜色
                    } 
                    },},
                areaStyle: {
                    normal: {
                        color: '#07f7f77d' //改变区域颜色
                    }
                },
                type:'line',
                smooth: true,
                stack: '总量',
                data:series
            }
        ]
    };
    // // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}


// 饼状图
var myChart1 = echarts.init(document.getElementById('main1'));
// 柱状图
var myChart2 = echarts.init(document.getElementById('main2'));
let value1;
let xAxis1;
let series1;
function ajaxs1(){
    //1.创建Ajax对象
    var myajax1=new XMLHttpRequest()
    myajax1.open('GET','https://edu.telking.com/api/?type=week',true);
    //3.发送请求
    myajax1.send(null);
    //4.接受返回的数据
    myajax1.onreadystatechange=function(){ //1、onreadystatechange属性的使用时连接函数
        if(myajax1.readyState==4){ //2、readyState是XMLHttpRequest对象的属性，所以要是对象.属性的方式访问
            if (myajax1.status==200) {
                value1 = JSON.parse(myajax1.responseText)
                xAxis1 = value1.data.xAxis;
                series1 = value1.data.series;
                options1();
                options2();
            }else{
                alert('失败'+myajax1.status)
            }
        }
    }

}

function options1() {
    let datas = [];
    for(var i = 0; i < xAxis1.length; i++) {
        datas.push({value: series1[i],name: xAxis1[i]})
    }
    // console.log(datas)
    var option1 = {
        title: {
            x:'230px',
            y:'10px',
            text: '饼状图数据展示'
        }, 
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                data:datas
            }
        ]
    };
    myChart1.setOption(option1);
}
// 指定图表的配置项和数据
function options2() {
    var option2 = {
        title: {
            x:'230px',
            y:'10px',
            text: '柱状图数据展示'
        },
        tooltip: {},
        // legend: {
        //     data:['商品数']
        // },
        xAxis: {data:xAxis1},
        yAxis: {name:"商品数"},
        series: [{
            name: '商品数',
            type: 'bar',
            data: series1,
            barWidth: 20,   //柱状宽度
            itemStyle: {    //柱状颜色和圆角
                color: '#07f7f7',
            },
        }]
    };
    // // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);
}