
$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results ? results[1] : '';
}

$.convertToSlug = function(Text) {
    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
}

let selectedCategory = $.convertToSlug(decodeURIComponent($.urlParam('q')));
if (selectedCategory) {
    $(`.categories:not(#${selectedCategory})`).hide();
    $(`input#checkbox-${selectedCategory}[type=checkbox]`).prop('checked', true);
    $('#show-all-btn').show();
} else {
    $('#show-all-btn').hide();
}

$('#show-all-btn').on('click', () => {
    $('.categories').show();
    $('#show-all-btn').hide();
    $('input[type=checkbox]').prop('checked', false);
})

$('input[type=checkbox]').on('click', (box) => {
    let turnedOn = [];
    $('input[type=checkbox]:checked').each((e, v) => {
        turnedOn.push(v.id.replace('checkbox-', ''));
    });
    if (turnedOn.length != 0) {
        $(`.categories`).hide();
        $('#show-all-btn').show();
    } else {
        $('#show-all-btn').hide();
        $(`.categories`).show();
    }
    turnedOn.forEach(ids => {
        $(`#${ids}`).show();
    })
})