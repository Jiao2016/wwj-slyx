$(function(){
	var count=10;
	do{
		$(".scene").empty();
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 10; j++) {
				var islei=Math.random()>0.9;//雷的随机个数
				$("<div></div>").addClass(function(){//创建场景中的小块
					return "block"+(islei?" lei":"")
				}).mousedown(mousedownhandler)
				.data("pos",{x:i,y:j})
				.attr("id",i+"-"+j)
				.appendTo(".scene");
			}
		};
	}while($(".lei").length!=count)
	function mousedownhandler(e){
		e.preventDefault();
		if (e.which==1) {
			leftclick.call(this)
		}else if(e.which==3){
			rightclick.call(this)
		}
	}
	function leftclick(){
		if ($(this).hasClass("flag")) {
			return;
		};
		if($(this).hasClass("lei")){
			lose();
			// alert("你踩中啦！！！")
			// $(".lei").addClass("show")
		}else{
			$(this).addClass("num")
			var n=0;//计算雷的个数
			var pos=$(this).data("pos");
			for (var i = pos.x-1; i <= pos.x+1; i++) {
				for (var j = pos.y-1; j <= pos.y+1; j++) {
					if ($("#"+i+"-"+j).hasClass("lei")) {
						n++;
					};
				};
			};
			$(this).text(n);
			if (n==0) {
				for (var i = pos.x-1; i <= pos.x+1; i++) {
					for (var j = pos.y-1; j <= pos.y+1; j++) {
						if ($("#"+i+"-"+j).length!=0) {
							if (!$("#"+i+"-"+j).data("check")) {
								$("#"+i+"-"+j).data("check",true)
								leftclick.call($("#"+i+"-"+j)[0])//call里传元素对象
							};
						};
					};
				};
			};
		}
	}
	function rightclick(){
		if ($(this).hasClass("num")) {
			return;
		};
		if ($(this).hasClass("flag")) {
			$(".flagbox").text(function(index,num){
				num=parseInt(num);
				return ++num;
			})
		}else {
			if ($(".flag").length==count) {
				return;
			};
			$(".flagbox").text(function(index,num){
				num=parseInt(num);
				return --num;
			})
		};
		$(this).toggleClass("flag");
		if ($(".flag").filter(".lei").length==count) {
			alert("恭喜你！")
		};
	}
	// contextmenu——css5中出现,在页面中oncontextmenu事件单禁用右键菜单 
	// addEventListener()  事件监听
	$(document).on("contextmenu",false)
	var t=setInterval(function(){
		$(".time").text(function(index,n){
			var num=parseInt(n);
			return --num;
		})
	},1000)
	if ($(".time").text()==0) {
		lose();
		// alert("你踩中啦！！！")
		// $(".lei").addClass("show")
	};
	function lose(){
		alert("Game over!");
		clearInterval(t);
		$(".lei").addClass("show");
		$(".block:not(.lei)").addClass("num");
		$(".scene").css(".transform","none").css({border:"none",boxShadow:"none"});
		$(".block").each(function(index){
			$(this).css({border:0});
			var left=Math.random()*600-300;
			var top=Math.random()*200-100;
			var deg=Math.random()*90;
			$(this).animate({left:left,top:top},500,function(){
				$(this).css("transform","rotate("+deg+"deg)")
			})
		})
	}






})