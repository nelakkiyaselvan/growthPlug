function registerEvents() {
    $('.bookBtn').off('click').on('click',function(){
        var self = $(this);

        if(self.hasClass('locBook')){
            var docLocDom = docLocation.map(constructLocDom);
            $('.cls_popup .mapContainer.docLoc').html(docLocDom);
            $('.cls_popup').show();
            $('.cls_popup .mapContainer.docLoc').show();
            preventScroll(true);
        }

    });

    $('.closeIcon').off('click').on('click',function(){
        let self = $(this);
        self.parent().hide();
        $('.cls_popup .mapContainer.docLoc, .cls_popup .mapContainer.docList').html('');
        $('.mapContainer.docAppoinment').hide();
        preventScroll(false);
    });

    $("#docBooking").submit(function(e) {
        e.preventDefault();
        $('.mask').show();
        $('.cls_popup').hide();
    });

    $('.closePop').off('click').on('click',function(){
        $('.closeIcon').trigger('click');
        $('.mask').hide();
    });

}

function preventScroll(prevent) {
    var prevScroll = {};
    if(prevent) {
        prevScroll = {"overflow":"hidden","height":"100%"};
    } else {
        prevScroll = {"overflow":"","height":""};
    }
    $('html').css(prevScroll);
    $('body').css(prevScroll);
}

function selectDoctor() {
    $('.cls_popup .mapContainer.docLoc').hide();
    $('.cls_popup .mapContainer.docList').show();
    var docListDom = docList.map(constructDocDom);
    var parentEle = $('.cls_popup .mapContainer.docList');
    parentEle.html(docListDom);
    parentEle.prepend('<div class="backToForm" onclick="backTo(this);">&lt;</div>');
}

function backTo(self) {
    var $self = $(self);
    var parEle = $self.parent();

    if($self.hasClass('appoinmentForm')){
        parEle.hide();
    } else {
        parEle.html('');
    }

    if(parEle.hasClass('docList')) {
        $('.mapContainer.docLoc').show();
    } else if(parEle.hasClass('docAppoinment')) {
        $('.mapContainer.docList').show();
    }
}

function constructDocDom(data) {
    return `<div class="mapImage">
                <img src="${data.image}">
                <div class="bookPopup">
                    <div class="bookDetail">
                        <p>${data.name}</p>
                        <p class="normalText">${data.department}</p>
                        <div class="bookBtn" onclick="getAppoinment(this)">Select Doctor &gt;</div>
                    </div>
                </div>
            </div>`
}

function getAppoinment(self) {
    $('.cls_popup .mapContainer.docList').hide();
    var $self = $(self);
    var parentEle = $('.cls_popup .mapContainer.docAppoinment');
    var imgParent = $self.parents('.mapImage');
    var docImg = $('img',imgParent).attr('src');
    var docName = $($self.siblings('p')[0]).text().trim();
    var docDept = $($self.siblings('p')[1]).text().trim();

    $('.docDetails .docImage img').attr('src',docImg);
    $('.docDetails .bookDetail p:first-child').text(docName);
    $('.docDetails .bookDetail p.normalText').text(docDept);
    $('.backToForm.appoinmentForm').length ? "" : parentEle.prepend('<div class="backToForm appoinmentForm" onclick="backTo(this);">&lt;</div>');
    $('.weekdays input[type=checkbox]:checked, .daySession input[type=checkbox]:checked').prop('checked',false);
    $('.clientDetails input').val('');
    
    parentEle.show();
}

function constructLocDom(data) {
    return `<div class="mapImage">
                <img src="img/location.png">
                <div class="bookPopup">
                    <h4>${data.location}</h4>
                    <div class="bookDetail">
                       <p class="normalText">${data.address}</p>
                        <p>${data.phone}</p>
                        <div class="bookBtn" onclick="selectDoctor();">Select Location &gt;</div>
                    </div>
                </div>
            </div>`;
}

$(document).ready(function(){
    registerEvents();
});