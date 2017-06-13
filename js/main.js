window.$=require('./lib/jquery.min');
var goTop=require('./com/gotop');
var Carousel=require('./com/carousel');
var lazyload=require('./com/lazyload');
new goTop('gotop-wrap','gotop');
new Carousel.init($('.carousel-wrap') )
new lazyload.init($('.news-ct'),$('.btn-loadmore'))

