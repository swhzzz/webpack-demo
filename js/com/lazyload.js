define(['jquery'], function () {
    var createLazyLoad = (function () {

        function LazyLoad($ct, $btn) {
            this.$ct = $ct;
            this.$btn = $btn;
            this.init();
            this.bind();
        }

        LazyLoad.prototype.init = function () {
            this.colsArr = [],
                this.newsWidth = 282,//设置新闻li的宽度
                this.pageIndex = 1,//不能等于0！！！等于0就重复了
                this.isrendered = true;//判断数据是否渲染完成
            var cols = parseInt(this.$ct.outerWidth(true) / this.newsWidth);

            for (var i = 0; i < cols; i++) this.colsArr[i] = 0;//初始化竖列高度
        }


        LazyLoad.prototype.bind = function () {

            var that = this
            this.$btn.on('click', function () {
                that.getNews();
            })
        }

        LazyLoad.prototype.getNews = function () {
            var _that = this;
            this.isrendered = false;//开始获取数据
            console.log(this.isrendered)
            
            $.ajax({
                url: 'https://platform.sina.com.cn/slide/album_tech',
                type: 'get',
                dataType: 'jsonp',
                jsonp: 'jsoncallback',
                data: {
                    page: this.pageIndex,
                    num: 6,
                    app_key: 1271687855
                },
                success: function (ret) {
                    var htmls = ''//拼接
                    for (var i = 0; i < ret.data.length; i++) {
                        htmls += '<li class="news"><a target="_blank" href=' + ret.data[i].cmnt_url;
                        htmls += '><img src=' + ret.data[i].img_url + '></a>';
                        htmls += '<h4>' + ret.data[i].short_name + '</h4>';
                        htmls += '<p>' + ret.data[i].short_intro + '</p></li>';
                    }

                    $.each($(htmls), function () {
                        var that = $(this);
                        that.find('img').on('load', function () {//等图片加载完再渲染元素，否则会导致元素重叠
                            var minValue = Math.min.apply(null, _that.colsArr);
                            minIndex = _that.colsArr.indexOf(minValue);
                            _that.$ct.append(that);
                                that.css({
                                    left: minIndex * that.outerWidth(true),
                                    top: minValue
                                })
                                console.log(minIndex)
                            console.log(_that.colsArr[minIndex])    
                            _that.colsArr[minIndex] += that.outerHeight(true);
                            var maxValue = Math.max.apply(null, _that.colsArr);//保存最长一列的高度，因为所有元素的都是absolute定位
                            _that.$ct.css('height', maxValue);//把高度赋值给容器的高度
                        })
                    })

                    _that.pageIndex++;
                    _that.isrendered = true;//渲染完成
                    
                }
            })

        }

        return {
            init: function ($ct, $btn) {
                new LazyLoad($ct, $btn)
            }
        }

    })()

    return createLazyLoad;
})