$(document).ready(function() {
    //$('#autoSubmit').submit();
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
var rowCount = 0;
//var userId = 0;

function addItemButtons(userId) {
    $("[id^='add']").click(function() {
        var item = $(this).attr("id").substring(4);
        if (isNaN(parseInt($('#item-' + item).val())) || $('#item-' + item).val() < 1)
            $('#item-' + item).val(1);
        var qty = parseInt($('#item-' + item).val());
        var itemPrice = parseFloat($('#price-' + item).html());
        var totalPrice = itemPrice * qty;
        subTotal += totalPrice;

        if ($(".purchase").find("#row-" + item).html() == undefined) {
            var addToCart = '<tr class="row" id="row-' + item + '">' +
                '<td id="qty-' + item + '">' + $('#item-' + item).val() + '</td>' +
                '<td>' + $('#brand-' + item).html() + '</td>' +
                '<td class="subTot" id="subTot-' + item + '">' + totalPrice + '</td>' +
                '<td class="remove-entry">' +
                '<button type="button" class="btn btn-danger" id="cancel-' + item + '">-</button>' +
                '</td>' +
                '<input id="qty" type="hidden" name="qty[]" value="' + qty + '"/>' +
                '<input type="hidden" name="pid[]" value="' + item + '"/>' +
                '<input type="hidden" name="uid[]" value="' + userId + '"/>' +
                '</tr>';

            $('#num-item').html(parseInt($('#num-item').html()) + qty);
            $("#qty-" + item).html(qty);
            $('#subTot-' + item).html(totalPrice);
            $('#total-price').html(subTotal.toFixed(2));
            $('.purchase').append(addToCart);
            $('#item-' + item).val("");

            assignDelete(item);
        } else {
            $("#qty-" + item).html(parseInt($("#qty-" + item).html()) + qty);
            $("#qty").val($("#qty-" + item).html());
            $('#subTot-' + item).html(parseInt($('#subTot-' + item).html()) + totalPrice);
            $('#num-item').html(parseInt($('#num-item').html()) + qty);
            $('#total-price').html(subTotal.toFixed(2));
        }
    });

    function assignDelete(rCount) {
        $("#cancel-" + rCount).click(function() {
            var subtotalPrice = parseFloat($('#subTot-' + rCount).html());
            itemEntryCount--;
            subTotal -= subtotalPrice;

            $('#num-item').html(parseInt($('#num-item').html()) - parseInt($('#qty-' + rCount).html()));
            $('#total-price').html(subTotal.toFixed(2));

            $('#row-' + rCount).remove();
        });
    }
}

function getItemsFromCart(pid) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "purchases",
        data: { "pid": pid },
        success: function(data) {
            //alert(JSON.stringify(data));
            parsePurchaseData(data);
        },
        error: function(e) {

            alert(JSON.stringify(e));
        }
    });
}


function getUser(uid) {
    $.ajax({
        type: 'POST',
        url: 'users',
        data: { 'uid': uid },
        success: function(data) {
            parseUser(data);
        },
        error: function(e) {

            alert(JSON.stringify(e));
        }
    });
}

var jsonData;

function parseUser(data) {
    jsonData = JSON.parse(data);
    addItemButtons(jsonData[0].uid);
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

function parsePurchaseData(data) {

    $.each(data, function(index, obj) {
        purchaseContainer(obj);
    });
    $(".purchase").fadeIn("slow");
}

function purchaseContainer(cartData) {

    var item = cartData.pid;
    //if (isNaN(parseInt($('#item-' + item).val())) || $('#item-' + item).val() < 1)
    //$('#item-' + item).val(1);
    var qty = cartData.item;
    var itemPrice = parseFloat($('#price-' + item).html());
    var totalPrice = itemPrice * qty;
    subTotal += totalPrice;


    var addToCart = '<tr class="row" id="row-' + item + '">' +
        '<td id="qty-' + item + '">' + qty + '</td>' +
        '<td>' + $('#brand-' + item).html() + '</td>' +
        '<td class="subTot" id="subTot-' + item + '">' + totalPrice + '</td>' +
        '<td class="remove-entry">' +
        '<button type="button" class="btn btn-danger" id="cancel-' + item + '">-</button>' +
        '</td>' +
        '<input type="hidden" name="qty[]" value="' + qty + '"/>' +
        '<input type="hidden" name="pid[]" value="' + item + '"/>' +
        '<input type="hidden" name="uid[]" value="' + jsonData[0].uid + '"/>' +
        '</tr>';

    $('#num-item').html(parseInt($('#num-item').html()) + parseInt(qty));
    $('#total-price').html(subTotal.toFixed(2));
    $('.purchase').append(addToCart);
    $('#item-' + item).val("");

    $("#cancel-" + item).click(function() {
        var subtotalPrice = parseFloat($('#subTot-' + item).html());
        itemEntryCount--;
        subTotal -= subtotalPrice;

        $('#num-item').html(parseInt($('#num-item').html()) - parseInt($('#qty-' + item).html()));
        $('#total-price').html(subTotal.toFixed(2));

        $('#row-' + item).remove();
    });
}


function parseData(data) {

    $.each(data, function(index, obj) {
        productContainer(obj);
    });
    $('.ajax-gif').fadeOut();
    $(".left-container").fadeIn("slow");

    getUser(1);

    getItemsFromCart();
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