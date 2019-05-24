$(document).ready(function () {
    let isPlay = false; // state of video switch
    // preloader
    $('.preloader').fadeOut();

    // navBtn
    $('.navBtn').on('click', () => {
        $('.nav').toggleClass('nav--show');
    });
 // video switch  
 $('.video__switch-container').on('click',  ()=> {
      // 檢查第一個  video__switch-btn 元素是否包含 
   //  const value = $('.video__switch-btn').hasClass('btnSlide');
   isPlay = !isPlay;
    if (isPlay) {
        $('.video__switch-btn').removeClass('btnSlide');
 // 獲得第一個元素的名稱和值，play() 方法開始播放當前的影片
        $('#video').get(0).play();
    } else {
        $('.video__switch-btn').add('btnSlide');
        // 獲得第一個元素的名稱和值，play() 方法開始播放當前的影片
               $('#video').get(0).play();
    }

 });

})
