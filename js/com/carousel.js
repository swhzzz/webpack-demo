define(['jquery'],function(){
    var createCarousel = (function () {

    function Carousel($ct) {
        this.$ct = $ct;
        this.init();
        this.bind();
        this.autoRoll();
    }

    Carousel.prototype.init = function () {
        this.$imgCt = this.$ct.find('.img-ct');
        this.$btn = this.$ct.find('.btn');
        this.$btnPre = this.$ct.find('.btn-pre');
        this.$btnNext = this.$ct.find('.btn-next');
        this.$bullet = this.$ct.find('.bullet');

        this.windowWidth=$(window).width();
        this.windowHeight=$(window).height();
        this.imgWidth = this.windowWidth;//获取图片的宽度
        this.imgHeight =this.windowHeight;
        this.$imgCt.find('img').width(this.imgWidth)
        this.$imgCt.find('img').height(this.windowHeight)
        this.$imgCt.height(this.windowHeight)
        this.$imgCt.width(this.windowWidth*this.imgLength)
            this.imgLength = this.$imgCt.children().length,//获取图片个数
            this.lastimg = this.$imgCt.children().last(),
            this.firstimg = this.$imgCt.children().first();

        this.curImgIndex = 0,
            this.isAnimationDone = true,
            this.timer = null;

        this.$imgCt.append(this.firstimg.clone());//拷贝第一张图片放到最后面
        this.$imgCt.prepend(this.lastimg.clone());//拷贝最后一张图片放到最前面
        this.$imgCt.width(this.imgWidth * (this.imgLength + 2));//计算拷贝后整体图片的宽度

        this.$imgCt.css('left', -this.imgWidth + 'px');//设定初始图片
    }

    Carousel.prototype.bind = function () {
        var _that = this;

        this.$ct.on('mouseenter', function () {
            _that.$btn.show();
        })

        this.$ct.on('mouseleave', function () {
            _that.$btn.hide();
        })

        this.$btnPre.on('mouseenter', function () {
            $(this).css('background-color', 'rgba(0,0,0,0.6)');
        })

        this.$btnPre.on('mouseleave', function () {
            $(this).css('background-color', 'rgba(0,0,0,0.15)');
        })

        this.$btnNext.on('mouseenter', function () {
            $(this).css('background-color', 'rgba(0,0,0,0.6)');
        })

        this.$btnNext.on('mouseleave', function () {
            $(this).css('background-color', 'rgba(0,0,0,0.15)');
        })

        this.$btnPre.on('click', function (e) {
            e.preventDefault();//阻止a标签跳转
            if (_that.isAnimationDone) _that.playPre(1);//检测动画是否已完成，未完成则不执行下一次动画
            clearInterval(_that.timer);//点击事件发生后，重启定时器
            _that.autoRoll();
        })

        this.$btnNext.on('click', function (e) {
            e.preventDefault();
            if (_that.isAnimationDone) _that.playNext(1);
            clearInterval(_that.timer);
            _that.autoRoll();
        })

        this.$bullet.on('click', 'li', function () {
            if (!_that.isAnimationDone) return
            clearInterval(_that.timer);
            _that.autoRoll();
            var targetImgIndex = $(this).index();//获取目标图片的下标
            if (targetImgIndex > _that.curImgIndex) {//判断当前图片下标与指定下标的图片个数
                _that.playNext(targetImgIndex - _that.curImgIndex)
            }
            if (targetImgIndex < _that.curImgIndex) {
                _that.playPre(_that.curImgIndex - targetImgIndex)
            }
        })
    }


    Carousel.prototype.playPre = function (n) {
        var _that = this;
        this.isAnimationDone = false;//动画开始后设置为false，再次点击不会触发点击事件
        this.curImgIndex -= n;//改变当前图片的下标
        this.$imgCt.animate({
            left: '+=' + this.imgWidth * n
        }, function () {
            _that.isAnimationDone = true;//动画完成后，设置为true，才可以继续触发点击事件
            if (_that.curImgIndex < 0) {
                _that.$imgCt.css('left', -_that.imgWidth * _that.imgLength + 'px');
                _that.curImgIndex = 7;
            }
        })
        this.setBullet();
    }

    Carousel.prototype.playNext = function (n) {
        var _that = this;
        this.isAnimationDone = false;
        this.curImgIndex += n;

        this.$imgCt.animate({
            left: '-=' + this.imgWidth * n
        }, function () {
            _that.isAnimationDone = true;
            if (_that.curImgIndex == _that.imgLength) {
                _that.$imgCt.css('left', -_that.imgWidth + 'px');
                _that.curImgIndex = 0;
            }
        })
        this.setBullet();
    }

    Carousel.prototype.setBullet = function () {
        if (this.curImgIndex == this.imgLength) {//由于animate是异步的，当最后一张图片执行playPre时，curImgIndex会变为8，而8是取不到的，不能给第一张图片添加active效果，故设置eq(0);这里eq(-1)可以取到最后一张图片
            this.$bullet.children()
                .removeClass('active').eq(0).addClass('active');
        } else {
            this.$bullet.children()
                .removeClass('active').eq(this.curImgIndex).addClass('active');
        }
    }

    Carousel.prototype.autoRoll = function () {
        var _that = this;
        this.timer = setInterval(function () {
            _that.playNext(1);
        }, 3000)
    }

    return {
        init: function ($ct) {
            $.each($ct, function (index, node) {
                new Carousel($(node))
            })
        }
    }
})()
return  createCarousel
})
