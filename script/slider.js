var slider = new Slider;

function Slider()
{
    this.elem = null;
    this.nbrElem = 0;
    this.currentElem = 0;
    this.animation = 0;
    this.maxElem = 0;
    this.lastGotoSlide = 0;
    this.isMouseOver = false;
    this.autoSwitch = true;
    this.images = [];
};

Slider.prototype.init = function(elem, autoSwitch = true)
{
    this.elem = $(elem);
    this.autoSwitch = autoSwitch;
};

Slider.prototype.finalize = function()
{
    this.addPageCounter();
    this.addPrevNextButtons();
    this.addMiniatures();
    this.gotoSlide(1);
    $('#slider .next').click(this.next);
    $('#slider .previous').click(this.previous);
    $('#slider .miniatures .miniature').click(this.onMiniatureClick);
    $('#slider').mouseenter(this.onMouseMoveOver);
    $('#slider').mouseleave(this.onMouseMoveOut);
    this.onMouseMoveOver();

    if (this.autoSwitch === true)
    {
        setInterval(function()
        {
            if (slider.isMouseOver == true)
                return false;
            slider.next();
        }, 5000);
        this.isMouseOver = false;
    }
        
};

Slider.prototype.gotoSlide = function(nbr)
{
    if (this.getTime() - this.lastGotoSlide < 300) return false;
    if (nbr > this.nbrElem) return false;
    if (nbr == this.currentElem) return false;

    var currentSlide = this.elem.find(".slide:nth-child(" + nbr + ")");
    var currentPage = this.elem.find(".pagecounter span:nth-child(" + nbr + ")");

    this.currentElem = nbr;
    this.lastGotoSlide = this.getTime();
    this.elem.find(".slide").hide();
    this.elem.find(".pagecounter span").removeClass("selected");
    currentSlide.fadeIn(300);
    currentSlide.show();
    currentPage.addClass("selected");

    var miniature = $(".miniatures .miniature:nth-child(" + nbr + ")");
    var selector = $(".miniatures #selector");

    selector.animate(
    {
        left: miniature.position().left + 1.5,
        top: miniature.position().top + 1.5
    }, 400);
};

Slider.prototype.next = function()
{
    var nbr = parseInt(slider.currentElem, 10) + 1;
    if (nbr > slider.nbrElem)
    {
        nbr = 1;
    }
    slider.gotoSlide(nbr);
};

Slider.prototype.previous = function()
{
    var nbr = parseInt(slider.currentElem, 10) - 1;
    if (nbr < 1)
    {
        nbr = slider.nbrElem;
    }
    slider.gotoSlide(nbr);

};

Slider.prototype.addPageCounter = function()
{
    this.elem.append("<div class='pagecounter'></div>");
    for(var i = 1; i <= this.nbrElem; i++)
    {
        var browser = this.elem.find('.pagecounter');
        browser.append('<span>' + i + '</span>');
        browser.find('span').click(function()
        {
            slider.gotoSlide($(this).index() + 1);
        });
    }
};

Slider.prototype.addPrevNextButtons = function()
{
    this.elem.append("<div class='previous'></div>");
    this.elem.append("<div class='next'></div>");
};

Slider.prototype.addMiniatures = function()
{
    this.elem.append("<div class='miniatures'></div>");
    var miniatures = this.elem.find(".miniatures");

    for (var i = 0; i < this.images.length; i++)
    {
        miniatures.append("<div class='miniature'></div>");
        var lastMin = miniatures.find("div:last-child");
        lastMin.css({backgroundImage: 'url(' + this.images[i] + ')'});
    }
    miniatures.append('<div id="selector"></div>');
};

Slider.prototype.addSlide = function(title, img = "")
{
    if (img == "")
    {
        img = "https://unsplash.it/700/400?image=" + this.rand(0, 50);
    }
    this.nbrElem++;
    this.images.push(img);
    var imgTag = "<img src='" + img + "' alt='img" + this.nbrElem + "'/>";
    var pTag = "<p>" + title + "</p>";
    this.elem.append("<div class='slide'></div)");
    var slide = this.elem.find(".slide:last-child");
    slide.css({backgroundImage : 'url(' + img + ')'});
    slide.append(pTag);
};

Slider.prototype.getTime = function()
{
    return (new Date()).getTime();
};

Slider.prototype.rand = function(min, max)
{
    return Math.floor(Math.random() * max) + min;
};

Slider.prototype.onMouseMoveOver = function()
{
    slider.isMouseOver = true;
    slider.elem.find(".previous").animate({left: "0px", opacity: 1}
        , 100);
    slider.elem.find(".next").animate({right: "0px", opacity: 1}
        , 100);
};

Slider.prototype.onMouseMoveOut = function()
{
    slider.isMouseOver = false;
    slider.elem.find(".previous").animate({left: "-40px", opacity: 0}
        , 100);
    slider.elem.find(".next").animate({right: "-40px", opacity: 0}
        , 100);
};

Slider.prototype.onMiniatureClick = function()
{
    var nthChild = $(this).index() + 1;
    slider.gotoSlide(nthChild);
}

$(function()
{
    slider.init('#slider', true);
    slider.addSlide('Une jolie <a href="#">image</a>');
    slider.addSlide("C'est beau!", 'img/img2.jpg');
    slider.addSlide("42", 'img/img3.jpg');
    slider.addSlide('Une magnifique image random');
    slider.addSlide('Une magnifique image random');
    slider.addSlide('Une magnifique image random');
    slider.addSlide('Une magnifique image random');
    slider.addSlide('Une magnifique image random');
    slider.addSlide('Une magnifique image random');
    slider.addSlide('Une magnifique image random');
    slider.addSlide('Une magnifique image random');
    slider.addSlide('Une magnifique image random');
    slider.finalize();
});


