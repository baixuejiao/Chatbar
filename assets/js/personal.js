
var myScroll, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset, generatedCount = 0;

function pullDownAction () {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i;
		for (i=0; i<3; i++) {
			li = $("<section class='section'><ul><li class='section-content'><h4 class='section-content-title'>(Equal)-FASTEST-TEST-CENTURY-EVER!</h4><div class='section-content-text'>Congratulations to Pakistan Cricket Team skipper Misbah-ui-Haq on his new record:</div><div class='section-content-pic'></div></li><li class='section-footer'><span class='section-classify'>sport</span><span class='section-time'>18小时前</span><div class='section-review'><a href='' class='section-review-icon'></a><span class='section-review-num'>4</span></div><div class='section-favour'><a href='' class='section-favour-icon'></a><span class='section-favour-num'>1</span></div></li></ul></section>");
			$("#container").prepend(li);
		}
		myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

function pullUpAction () {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i;
		for (i=0; i<3; i++) {
			li = $("<section class='section'><ul><li class='section-content'><h4 class='section-content-title'>(Equal)-FASTEST-TEST-CENTURY-EVER!</h4><div class='section-content-text'>Congratulations to Pakistan Cricket Team skipper Misbah-ui-Haq on his new record:</div><div class='section-content-pic'></div></li><li class='section-footer'><span class='section-classify'>sport</span><span class='section-time'>18小时前</span><div class='section-review'><a href='' class='section-review-icon'></a><span class='section-review-num'>4</span></div><div class='section-favour'><a href='' class='section-favour-icon'></a><span class='section-favour-num'>1</span></div></li></ul></section>");
			$("#container").append(li);
		}
		myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;

	myScroll = new iScroll('wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉可以刷新';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开立即加载更多数据';
			}
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '松开立即刷新';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉可以刷新';
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开立即加载更多数据';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开立即加载更多数据';
				this.maxScrollY = pullUpOffset;
			}

		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '正在刷新...';				
				pullDownAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '正在加载数据...';				
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});
	
	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 100);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);

