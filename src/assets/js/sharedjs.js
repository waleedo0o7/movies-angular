function scrollToTop() {
    window.scrollTo(0, 0)
}

function removeLoadinScreen(){
    $("#loading-screen").css({
            transform : 'scale(3)',
            opacity : 0
        }
    );
    setTimeout(function(){
        $("#loading-screen").remove()
    } , 1000)
}

var controller = new ScrollMagic.Controller();

function pageHeaderEffect() {

    var bg = $(".bg , .overlay");

    var bgToZero = TweenMax.to(bg, 1, {
        scale: 2,
        opacity: 0.2,
    })


    // Create scrollmagic scene
    var parallaxScene = new ScrollMagic.Scene({
        triggerElement: bg, // <-- Use this to select current element
        triggerHook: 0.5,
        duration: '100%',
    })
    //.addIndicators() // add indicators (requires plugin)
    .setTween(bgToZero).addTo(controller);

    var introContainer = $(".movie-details-container .container");

    var hideContent = TweenMax.to(introContainer, 1, {
        y : '-150px',
        opacity: 0,
    })

    var parallaxScene2 = new ScrollMagic.Scene({
        triggerElement: hideContent, // <-- Use this to select current element
        triggerHook: 0.5,
        duration: '100%',
    })
    //.addIndicators() // add indicators (requires plugin)
    .setTween(hideContent).addTo(controller);
}
