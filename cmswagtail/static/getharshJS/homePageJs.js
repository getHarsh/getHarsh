$(document).ready(function () {
    const fadeInOut = (element, callback, callback2 = null) => {
        element.fadeOut(function () {
            callback();
            element.fadeIn(callback2);
        })
    }
    $(".expand-project").click(function (e) {
        e.preventDefault();
        const $this = $(this);
        const divToCollapse = $(`#${$this.attr("coll")}`);
        const divToExpand = $(`#${$this.attr("exp")}`);
        const project = $(`#${$this.attr("project")}`);
        divToCollapse.css('overflow-y', 'hidden');
        const a = divToCollapse.find('.home-content .home-desc')
        a.addClass('right');
        divToCollapse.velocity({
            opacity: '0%',
        }, {
            duration: 500,
        }).then(() => {
            divToCollapse.addClass("hidden");
            divToExpand.removeClass("hidden");
            divToExpand.velocity({
                opacity: '100%'
            })
        }).then(() => {
            a.removeClass('right');
        });

    })
    $(".collapse-project").click(function (e) {
        e.preventDefault();
        const $this = $(this);
        const divToCollapse = $(`#${$this.attr("coll")}`);
        const divToExpand = $(`#${$this.attr("exp")}`);
        const project = $(`#${$this.attr("project")}`);
        const b = divToExpand.find('.desc1');
        b.addClass('left');
        divToExpand.velocity({
            opacity: '0%',
        }, {
            duration: 500,
        }).then(() => {
            divToExpand.addClass("hidden");
            divToCollapse.removeClass("hidden");
            divToCollapse.velocity({
                opacity: '100%'
            })
        }).then(() => {
            b.removeClass('left');
        });
    })
    $(".carousel-button").each(function () {
        const $this = $(this);
        const divToCollapse = $(`#${$this.attr("coll")}`);
        const divToExpand = $(`#${$this.attr("exp")}`);
        const project = $(`#${$this.attr("project")}`);
        let currBg = project.find(`.meta.hidden carousel *`).first();
        const BgUrl = (imageUrl) => imageUrl.text();
        divToExpand.children('picture').css('background-image', `url(${BgUrl(currBg)})`);



        const carouselNext = function () {
            currBg = currBg.next().length ? currBg.next() : currBg;
            console.log(BgUrl(currBg));
            divToExpand.children('.picture').html('')
            if (currBg.prop('tagName') === 'IMGURL') {
                divToExpand.children('.picture').css('background-image', `url(${BgUrl(currBg)})`);
            } else if (currBg.prop('tagName') === 'VIDEOURL') {
                divToExpand.children('.picture').css('background-image', ``);
                divToExpand.children('.picture').html(currBg.find('div').html())
            }
        };
        const carouselPrev = function () {
            currBg = currBg.prev().length ? currBg.prev() : currBg;
            console.log(BgUrl(currBg));
            divToExpand.children('.picture').html('')
            if (currBg.prop('tagName') === 'IMGURL') {
                divToExpand.children('.picture').css('background-image', `url(${BgUrl(currBg)})`);
            } else if (currBg.prop('tagName') === 'VIDEOURL') {
                divToExpand.children('.picture').css('background-image', ``);
                divToExpand.children('.picture').html(currBg.find('div').html())
            }
        };

        $this.children('.carousel-next').click(carouselNext);
        $this.children('.carousel-previous').click(carouselPrev);
    })
})
