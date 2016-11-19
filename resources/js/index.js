$(document).ready(function() {

    getBrands(0);
    $('#search').click(function() {
        var type = $('#water-type').val();
        //alert(type);
        getBrands(type);
    });


});
window.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);

var itemEntryCount = 0;
var subTotal = 0.00;

function addItemButtons() {
    $("[id^='add']").click(function() {
        var item = $(this).attr("id").substring(4);

        if (isNaN(parseInt($('#item-' + item).val())) || $('#item-' + item).val() < 1)
            $('#item-' + item).val(1);
        var totalPrice = parseFloat($('#price-' + item).html()) * parseInt($('#item-' + item).val());
        var addToCart = '<tr id="row-' + (itemEntryCount + 1) + '"><td class="remove-entry"><button type="button" class="btn btn-danger" id="cancel-' + (itemEntryCount + 1) + '">-</button></td>';
        addToCart += '<td id="qty' + (itemEntryCount + 1) + '" class="qty">' + $('#item-' + item).val() + '</td>';
        addToCart += '<td>' + $('#brand-' + item).html() + '</td>';
        addToCart += '<td id="subTot' + (itemEntryCount + 1) + '">' + totalPrice + '</td></tr></th>';
        $('#num-item').html(++itemEntryCount);
        subTotal += totalPrice;
        $('#total-price').html(subTotal.toFixed(2));

        $('.purchase').append(addToCart);

        $("[id^='cancel']").click(function() {

            //var item = $(this).attr("id").substring();
            var totalPrice = parseFloat($('#subTot' + itemEntryCount).html()) * parseInt($('#qty' + itemEntryCount).html());
            $('#row-' + (itemEntryCount)).remove();

            if (itemEntryCount > 0) {
                itemEntryCount--;
                subTotal -= totalPrice;
            }
            $('#num-item').html(itemEntryCount);
            $('#total-price').html(subTotal.toFixed(2));
        });


    });


    $("[id^='cancel']").click(function() {

        var item = $(this).attr("id").substring(7);
        var totalPrice = parseFloat($('#price-' + item).html()) * parseInt($('#item-' + item).val());
        $('#row-' + item).remove();

        if (itemEntryCount > 0) {
            itemEntryCount--;
            subTotal -= totalPrice;
        }
        $('#num-item').html(itemEntryCount);
        $('#total-price').html(subTotal.toFixed(2));


    });

}

function getBrands(tid) {
    $('.ajax-gif').fadeIn();
    $('.ajax-gif').html('<img src="' + base_url + 'resources/img/ajax-loader.gif">');
    $(".left-container").fadeOut("slow");
    $('.left').html('');


    $.ajax({
        type: "POST",
        dataType: "json",
        url: "brands",
        data: { "tid": tid },
        success: function(data) {
            //alert(JSON.stringify(data));
            parseData(data);
        },
        error: function(e) {

            alert(JSON.stringify(e));
        }
    });



}


function parseData(data) {

    $.each(data, function(index, obj) {
        productContainer(obj);
    });
    $('.ajax-gif').fadeOut();
    $(".left-container").fadeIn("slow");

    addItemButtons();

}

function productContainer(a) {
    var content = '<div class="well well-lg"><div class="image-container">';
    content += '<img src="' + base_url + 'resources/img/' + a.src + '">';
    content += '</div><div class="item-detail"><div class="product-detail">';
    content += '<p>Brand: <b id="brand-' + a.pid + '">' + a.brand + '</b></p>';
    content += '<p>Type: ' + a.name + ' </p><p>Price: PHP <span id="price-' + a.pid + '">' + a.price + '</span></p></div>';
    content += '<div class="product-order">item(s)<div class="input-append">';
    content += '<input type="number" class="num-item form-control" id="item-' + a.pid + '" placeholder="0">';
    content += '<button type="button" class="btn btn-success" id="add-' + a.pid + '">Add</button>';
    //content += '<button type="button" class="btn btn-danger" id="cancel-' + a.pid + '">Cancel</button>';
    content += '</div></div></div></div>';

    $('.left').append(content);


}