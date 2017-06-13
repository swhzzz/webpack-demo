   function goTop(ct, target) {
        this.ct = ct;
        this.target = target;
        this.createNode();
        this.bindEvent();
        this.setCss();
    }
    goTop.prototype = {
        createNode: function () {
            if ($(window).scrollTop == 0) return;
            var htmls = '<div class="' + this.ct + '"><a href="javascript:void(0)" style="color: #fff" class="' + this.target + '"></a></div>';
            $('body').append($(htmls));
            $('.' + this.ct).hide();//插入之后隐藏，防止第一次进入页面没有滚动时，有回到顶部
        },
        setCss: function () {
            $('.' + this.ct).css({
                position: "fixed",
                width: 40,
                height: 30,
                bottom: 20,
                right: 20,
                backgroundColor: "purple",
                textAlign: "center",
            }),
            $('.'+this.target).css({
                display: "inline-block",
                borderTop: "10px solid transparent",
                borderBottom: "10px solid #fff",
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
            })

        },
        bindEvent: function () {
            var that = this;
            $(window).on('scroll', function () {
                if ($(window).scrollTop() > 500) {
                    $('.' + that.ct).fadeIn(500);
                } else {
                    $('.' + that.ct).fadeOut(500);
                }
            })

            $('.' + that.ct).on('click', function () {
                var timer = null;
                var scrollTop = $(window).scrollTop();
                timer = setInterval(function () {
                    if (scrollTop <= 0) clearInterval(timer);
                    scrollTop -= 30;
                    $(window).scrollTop(scrollTop);
                }, 1)
            })
        }
    }


module.exports=goTop;