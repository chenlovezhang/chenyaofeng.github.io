let envelope_opened = false;

let content = {
	to			: "",
	from		: "",
	recipient	: "",
	text		: "",
	sign		: 0
};

$("#open").click(function () {

	if (!envelope_opened) {

		new Typed('.letter', {
			strings: [
				"^1000Dear&nbsp;&nbsp;zhangting" + content.to,
				content.recipient + "我最爱的臭宝<br>今天是2022年2月14日，这是今年跟你在一起的第一个情人节，虽然你不在我身边，但很开心我们能够出现在彼此的生活，成为彼此重要的人。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;提起笔，准备叙述我们故事的开始，却总是忍不住走神，真抱歉，情话没写出几个，但我却真真实实想了你一整天。说实话，最初喜欢你是见色起意，但追你并非心血来潮，始于心动，陷于温柔。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;余生的路还很长，请多多指教。&nbsp;&nbsp;&nbsp;今晚月色真美呀！" +
				content.text + "<br><br><p style='float:right; display:block; width:" + 
				content.sign + "px;'>^1000" +
				content.from + "^250より</p>"
			],
			typeSpeed: 100,
			backSpeed: 50
		});

		$('#open').find("span").eq(0).css('background-position', "0 -150px");

		envelope_opened = true;

		let player = document.getElementById('music');
		if (player.paused) {
			player.play();
			$('#music_btn').css("opacity", "1");
			$('#music_btn').css("display", "block");
		}
	}

});

function playPause() {
	let player = document.getElementById('music');
	let play_btn = $('#music_btn');

	if (player.paused) {
		player.play();
		play_btn.css("opacity", "1");
	}
	else {
		player.pause();
		play_btn.css("opacity", "0.2");
	}
}


function toBase64(audioURL) {
	window.URL = window.URL || window.webkitURL;
	let xhr = new XMLHttpRequest();
	xhr.responseType = "blob";
	xhr.open("GET", audioURL, true);
	xhr.onload = function () {
		if (this.status == 200) {
			let reader = new FileReader();
			reader.readAsDataURL(this.response);
			reader.onload = function () {
				$('#music').attr('src', reader.result);
				$('#envelope').fadeIn('slow');
				$('.heart').fadeOut('fast');
				let currentUrl = window.location.href;
				let firstIndex = currentUrl.indexOf("#");
				if (firstIndex <= 0) window.location.href = currentUrl + "#contact";
			};

		}
	}
	xhr.send(null);
}


window.onresize = function () {
	let cherry_container = $('#jsi-cherry-container');
	let canvas = cherry_container.find('canvas').eq(0);
	canvas.height(cherry_container.height());
	canvas.width(cherry_container.width());
	// Do scaling for sakura background when the window is resized
	loadingPage();
}

function loadingPage() {
	let heart_div = $('.heart');
	let heart_parent = heart_div.parent();
	let page_width = heart_parent.width();
	let page_height = heart_parent.height();
	let heart_width = heart_div.width();
	let heart_height = heart_div.height();
	heart_div.css('top', (page_height - heart_height) / 2);
	heart_div.css('left', (page_width - heart_width) / 2);
}

window.onload = function () {

	loadingPage();

	$.ajaxSettings.async = false;
	$.getJSON("./font/content.json", function (result) {
		content.to = result.to;
		content.from = result.from;
		content.recipient = result.recipient;
		content.text = result.text;
		content.sign = (2 + content.from.length) * 20;
		$('#recipient').append(content.to);
	});

	toBase64("./bgm/bgm.mp3");

	document.addEventListener('touchstart', function (event) {
		if (event.touches.length > 1) event.preventDefault();
	});

	let lastTouchEnd = 0;

	document.addEventListener('touchend', function (event) {

		let now = (new Date()).getTime();
		if (now - lastTouchEnd <= 300) event.preventDefault();
		lastTouchEnd = now;

	}, false);

	document.addEventListener('gesturestart', function (event) {
		event.preventDefault();
	});

	$('body').css('opacity', '1');
	$('#jsi-cherry-container').css('z-index', '-99');

}