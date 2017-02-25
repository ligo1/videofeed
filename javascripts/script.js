(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6";
		fjs.parentNode.insertBefore(js, fjs);
	  }(document, 'script', 'facebook-jssdk'));
var data;
var items;
function success (d) {
	data = d;
	items = d.items;
	console.log(d);
	var len = Object.keys(d.items).length;
	for (var key in items) {
		
		
		    // skip loop if the property is from prototype
			if (!items.hasOwnProperty(key)) continue;

			var obj = items[key];

				var title = obj.title;
					if (title == null) { title = "Video"; }
				var views = obj.views;
					if (views == null) { views = 0; }
					else if (views > 999999) { views = (views/1000000).toFixed(1) + 'M'; }
					else if (views > 999) { views = (views/1000).toFixed(1) + 'K'; }
				var video;
				switch(obj.source) {
					case "youtube":
						video = "<div class='video-container'><iframe width='100%' height='auto' src='https://www.youtube.com/embed/" + obj.videoId + "' style='border:none;'></iframe></div>";
						break;
					case "facebook":
						video = "<div class='video-container non-youtube'><div class='fb-video' data-href='https://www.facebook.com/facebook/videos/" + obj.videoId + "/' data-show-text='false'><blockquote cite='https://www.facebook.com/facebook/videos/" + obj.videoId + "/' class='fb-xfbml-parse-ignore'></blockquote></div></div>";
						break;
					case "url":
						video = "<div class='video-container non-youtube'><video width='420' height='315' controls><source src='" + obj.url + "' type='video/mp4'><source src='" + obj.url + "' type='video/ogg'>Your browser does not support the video tag.</video></div>";
						break;
					default:
						video = "<div class='video-container no-video'>No video available</div>";
				}
				var str = "<div class='frame'><div class='item-header'><div class='item-title'>" + title + "</div><div class='item-views'>" + views + " views</div><div style='clear: both;'></div></div>" + video + "</div>";
				$(".ui-content").append(str);

	}
}
function fail(d) {
	alert("Something went wrong :(");
	console.log(d);
}

$(document).ready(function () {
	var url = "//cdn.playbuzz.com/content/feed/items";
	$.post(url,success,"json")
		.fail(fail);
});