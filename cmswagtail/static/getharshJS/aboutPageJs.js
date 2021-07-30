(function() {
    $("#contact-us-form").submit(
        function(e) {
            e.preventDefault();
            const $button = $('#contact-form-submit')
            $button.removeClass('btn-danger');
            $button.addClass('btn-primary');
            $button.text('Submitting Contact form');
            $.ajax({
                data: $(this).serialize(),
                type: 'POST',
                url: contactUrl,
                success: function() {
                    $button.removeClass('btn-primary');
                    swal('Success', 'Your Query has been sent', 'success')
                    $button.text('Submit Your Query.');
                },
                error: function() {
                    $button.addClass('btn-danger');
                    $button.text('Error', 'Your Query could not be sent', 'error');
                }
            });
        }
    )
})();
(function() {
    const elementId = window.location.hash.substr(1);
    const element = document.getElementById(elementId);
    if (element && element.classList.contains('tab-pane')) {
        element.classList.add('active', 'in');
        document.getElementById('aboutus') && document.getElementById('aboutus').classList.remove('active', 'in');
    }
    else {
        if (!document.getElementById('aboutus')) {
            document.querySelector('.tab-content [role=tabpanel]:first-child').classList.add('active');
        }
    }
    document.querySelector(`a[href=\"#${elementId}\"]`).parentElement.classList.add('active');
    document.querySelector('a[href="#aboutus"') && document.querySelector('a[href="#aboutus"').parentElement.classList.remove('active');
})();
(function() {
    const $descriptionSection = $('#about_section')
    const descriptionSectionInitialHtml = $descriptionSection.html();
    const teamMemberDivs = document.querySelectorAll('div.team-member-card');
    const fadeInOut = (element, callback, callback2 = null) => {
        element.fadeOut(function() {
            callback();
            element.fadeIn(callback2);
        })
    }
    let followBtns = $("#follow-btns");
    const getLink = (platform) => followBtns.children(`a.follow-url[social=${platform}]`).prop("href");
    const setLink = (platform, value) => {
        const ele = followBtns.children(`a.follow-url[social=${platform}]`);
        if (value) {
            ele.removeClass('hidden');
        }
        else {
            ele.addClass('hidden');
        }
        ele.prop("href", value);
    }
    const defaultLinks = {
        twitter: getLink("twitter"),
        linkedin: getLink("linkedin"),
        instagram: getLink("instagram"),
        github: getLink("github"),
        youtube: getLink("youtube"),
    }
    const pushLinks = (object) => {
        setLink("twitter", object.twitter);
        setLink("linkedin", object.linkedin);
        setLink("instagram", object.instagram);
        setLink("github", object.github);
        setLink("youtube", object.youtube);
    }
    teamMemberDivs.forEach((value) => {
        const getElementText = (attr) => { return value.querySelector(attr).textContent; }
        const personalDescription = getElementText("personal_description");
        const memberImageUrl = value.querySelector(".imgBx>img").src;
        const memberLinks = {
            twitter: getElementText('twitter'),
            linkedin: getElementText("linkedin"),
            instagram: getElementText("instagram"),
            github: getElementText("github"),
            youtube: getElementText("youtube"),
        };
        $(value).click(
            () => {
                window.scrollTo(0, 0);
                fadeInOut($descriptionSection, () => {
                    $descriptionSection.hide()
                    $descriptionSection.html(
                        `
              <div style="display: flex;justify-content: center;">
              <img style="height: 200px; text-align: center;" 
              src="${memberImageUrl}"> 
              </div>
              <p class="text-justify">${personalDescription}</p>
              <button class="btn btn-color-out content-close">Close</button>
              
              `
                    )
                    $descriptionSection.children(".content-close").click(
                        () => fadeInOut($descriptionSection,
                            () => {
                                $descriptionSection.html(descriptionSectionInitialHtml);
                                $("#content-hideable").show();
                                pushLinks(defaultLinks);
                                $("#follow-title").text(`Follow me.`)
                            }));
                    pushLinks(memberLinks);
                    $("#follow-title").text(`Follow ${getElementText('name')}.`)
                    $("#content-hideable").hide();
                })
            }
        )
    })
})();
