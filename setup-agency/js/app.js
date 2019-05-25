$(document).ready(function () {
    let isPlay = true; // state of video switch
    // preloader
    $('.preloader').fadeOut();

    // navBtn
    $('.navBtn').on('click', () => {
        $('.navBtn').toggleClass('navBtn--action')
        $('.nav').toggleClass('nav--show')
    });
 // video switch  
 $('.video__switch-container').on('click',  ()=> {
      // 檢查第一個  video__switch-btn 元素是否包含 btnSlide的class
   //  const value = $('.video__switch-btn').hasClass('btnSlide');
   isPlay = !isPlay; 
    if (isPlay) {
        $('.video__switch-btn').removeClass('btnSlide');
 // 獲得第一個元素的名稱和值，play() 方法開始播放當前的影片
        $('#video').get(0).play();
    } else {
        $('.video__switch-btn').add('btnSlide');
        // 獲得第一個元素的名稱和值，play() 方法開始播放當前的影片
               $('#video').get(0).pause();
    }
 });
 // 從magnific.js 找code貼上
 // magnific popup 音箱效果
 $('#projects__modal').magnificPopup({
    delegate: 'a', // child items selector, by clicking on it popup will open
    type: 'image',
    gallery: {
     // options for gallery
     enabled: true
    }
    // other options
   });




})
