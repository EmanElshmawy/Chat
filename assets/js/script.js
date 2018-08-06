$(document).ready(function () {


    /////// collapsebtn responsive layout  /////// 

    $('#contactListCollapse, #collapseBtn,  #contactListClose ').on('click', function () {

        $('#contactList, #content').toggleClass('active');
        $("overlay").toggleClass('overlay-active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');

    });
  

    /////// search on contact list /////// 

    $("#search").on("keyup", function () {

        var value = $(this).val().toLowerCase();
        $(".people .person .name").filter(function () {
            $(this).parent(".person").toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

    });


    //////// chat action active ////////

    // set the default active chat//

    $('.chat[data-chat=person1]').addClass('active-chat');
    $('.person[data-chat=person1]').addClass('active');
    var defaultImg = $(".person[data-chat=person1].active ").children(".personImg").attr("src");
    $(".main-img").attr('src', defaultImg);
    // append the name of the first chat //

    var activeName = $('.person[data-chat=person1]').children(".name").html();
    $(".top .name").html(activeName);

    //  navigation between contact chat//
    $('.left .person[data-chat]').on("click", function () {

        $('.chat[data-chat]').removeClass("active-chat");
        $('.person[data-chat]').removeClass("active");

        var activeChat = $(this).attr("data-chat");
        var name = $(this).children(".name").html();
        var img = $(this).children(".personImg").attr("src");
        //// top section in the chat window //
        $(".top .name").html(name);
        $(".main-img").attr('src', img);

        var activeperson = $(this, '.person[data-chat]').addClass("active");
        $('.chat[data-chat=' + activeChat + ']').addClass('active-chat');

    })

    //  typing and append massege on click//

    //////// append msg  /////// 

    $('#btn-chat').on("click", function (time) {

        if ($('#btn-input').val().trim() != '') {
            var message = $('#btn-input').val();

         
            $('<div class="bubble me"> <span class="text">'+ message + '</span> <Span class="time">12.36 PM</Span></div>').appendTo('.chat[data-chat].active-chat');
            $(".active .preview").html(message);
            $('#btn-input').val("");
            $('.person[data-chat].active').prependTo($('.person[data-chat]').parent());
            $(".chat-wrapper").animate({
                scrollTop: $(".chat-wrapper")[0].scrollHeight
            }, 1000);
        }
        
    })

    $("input[type='image']").click(function() {
        $("input[id='my_file']").click();
    });
    function previewImage(){
    var oFReader = new FileReader();
    oFReader.readAsDataURL($("#my_file").files[0]);

    }
    ///// enter btn append chat  /////// 
    $("#btn-input").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#btn-chat").click();
        }
    });

    var object = {};

    //////notification //////

    var onlinePerson = $(".online .name");
    var length = onlinePerson.length;

    if (onlinePerson) {
        for (var i = 0; i < length; i++) {

            var onlinePerson = $('.person[data-chat].online .name')[i].innerText;
            var parentOnline = $('.person[data-chat].online')[i].attributes["data-chat"].value
            object[parentOnline] = onlinePerson
        }
    }

    var myNotificationdiv = setInterval(myNotification, 8000);

    function myNotification() {
        for (var key in object) {
            console.log(key+"---"+object[key]);
            // if ($(".notifiaction") == null) {
            //     $(".notification").html(object[key]).css("background", "red");
            // } else {
            //     var alert = $(".notification");
            //     for (var i = 0; i <= alert.length; i++) {
            //         if (alert[i] == key) {
            //             $('.person[data-chat =' + key + ']').prependTo($('.person[data-chat]').parent());
            //         }
            //     }
            // }
        }
    }
    console.log(object);

});