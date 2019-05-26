$(document).ready(function () {
    let isPlay = true; // state of video switch
    // preloader
    $('.preloader').fadeOut();

    // navBtn
    $('.navBtn').on('click', () => {
        $('.navBtn').toggleClass('navBtn--action')
        $('.nav').toggleClass('nav--show')
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

    $('.accordion__btn').on('click', function () {
        console.log(this);

        // changec the other's state
        $('.accordion__btn').not(this).removeClass('rotate');
        // 指向 未被點擊的content(進行收合)
        //let a =  $('.accordion__btn').not(this).parent().next().slideUp()
        //console.log(a);
        $('.accordion__btn').not(this).parent().next().slideUp();

        // direction of arrow
        $(this).toggleClass('rotate');
        $(this).parent().next().slideToggle();
    });
    //  IIFE
    (function () {
        let data = [
            {
                id: 0,
                name: 'john doe',
                job: 'developer',
                text: `A biography, or simply bio, is a detailed description of a person's life.It involves more than just the basic facts like education, work, relationships, and death; it portrays a person's experience of these life events. Unlike a profile or curriculum vitae (résumé), a biography presents a subject's life story, highlighting various aspects of his or her life, including intimate details of experience, and may include an analysis of the subject's personality.`,
                favorites: ['eat', 'drink', 'sleep'],
                img: 'img/team-1.jpg'
            },
            {
                id: 1,
                name: 'tom orange',
                job: 'designer',
                text: `A biography, or simply bio, is a detailed description of a person's life.It involves more than just the basic facts like education, work, relationships, and death; it portrays a person's experience of these life events. Unlike a profile or curriculum vitae (résumé), a biography presents a subject's life story, highlighting various aspects of his or her life, including intimate details of experience, and may include an analysis of the subject's personality.`,
                favorites: ['paint', 'draw', 'run'],
                img: 'img/team-2.jpg'
            },
            {
                id: 2,
                name: 'albert cupid',
                job: 'accountant',
                text: `A biography, or simply bio, is a detailed description of a person's life.It involves more than just the basic facts like education, work, relationships, and death; it portrays a person's experience of these life events. Unlike a profile or curriculum vitae (résumé), a biography presents a subject's life story, highlighting various aspects of his or her life, including intimate details of experience, and may include an analysis of the subject's personality.`,
                favorites: ['math', 'physics', 'more math'],
                img: 'img/team-3.jpg'
            },
            {
                id: 4,
                name: 'dog hugo',
                job: 'intern',
                text: `A biography, or simply bio, is a detailed description of a person's life.It involves more than just the basic facts like education, work, relationships, and death; it portrays a person's experience of these life events. Unlike a profile or curriculum vitae (résumé), a biography presents a subject's life story, highlighting various aspects of his or her life, including intimate details of experience, and may include an analysis of the subject's personality.`,
                favorites: ['bark', 'run', 'bite'],
                img: 'img/team-4.jpg'
            },

        ]

        // click event
        $('.team-img__item').on('click', function () {
            $('.team-img__item').not(this).removeClass('active');
            $(this).addClass('active');
            //console.log(this);
            let id = $(this).attr('data-id'); // note
            //console.log(id);
            $('.team-info__member-name').text(data[id].name);
            // change the job
            $('.team-info__member-job').text(data[id].job);
            // change the text
            $('.team-info__member-text').text(data[id].text);
            // change favorites
            $('.team-info__member-single-favorite-text').each(function (index) {
                $(this).text(data[id].favorites[index]);
            });

            // 替換至被點擊的圖片  change photo
            //let NewImg =  $('.team-info__img').attr('src', data[id].img);
            //console.log(NewImg);
            $('.team-info__img').attr('src', data[id].img);
        });

    })();
    // owl carousel
    $('.owl-carousel').owlCarousel({
        loop: true,
        smartSpeed: 2000,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
    $(".owl-prev").html('<div><i class="fa fa-chevron-left"></i></div>');
    $(".owl-next").html('<div><i class="fa fa-chevron-right"></i></div>');

});
