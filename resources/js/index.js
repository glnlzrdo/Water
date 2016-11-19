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
var rowCount = 0;

function addItemButtons() {
    $("[id^='add']").click(function() {
        var item = $(this).attr("id").substring(4);
        rowCount++;
        if (isNaN(parseInt($('#item-' + item).val())) || $('#item-' + item).val() < 1)
            $('#item-' + item).val(1);
        var totalPrice = parseFloat($('#price-' + item).html()) * parseInt($('#item-' + item).val());
        var addToCart = '<tr class="row" id="row-' + rowCount + '">' +                    
                            '<td id="qty' + rowCount + '">' + $('#item-' + item).val() + '</td>' +
                            '<td>' + $('#brand-' + item).html() + '</td>' +
                            '<td class="subTot" id="subTot-' + rowCount + '">' + totalPrice + '</td>' +
                            '<td class="remove-entry">' +
                                '<button type="button" class="btn btn-danger" id="cancel-' + rowCount + '">-</button>' +
                            '</td>';
                        '</tr>';

        $('#num-item').html(++itemEntryCount);
        subTotal += totalPrice;
        $('#total-price').html(subTotal.toFixed(2));

        $('.purchase').append(addToCart);
        $('#item-' + item).val("");

        assignDelete(rowCount);
    });

    function assignDelete(rCount){
        $("#cancel-" + rCount).click(function() {            
            var subtotalPrice = parseFloat($('#subTot-' + rCount).html());
                itemEntryCount--;
                subTotal -= subtotalPrice;
            
            $('#num-item').html(itemEntryCount);
            $('#total-price').html(subTotal.toFixed(2));

            $('#row-' + rCount).remove();
        });
    }
        



/*
        $(document).on('click', "button.cancel", function(event) {
            row = $(event.target).parent().parent();
            itemEntryCount--;
            //alert(parseFloat($(this).parent().parent().find('td.subTot').html()));
            //subTotal -= parseFloat($(this).parent().parent().find('td.subTot').html());
            //$('#num-item').html(itemEntryCount);
            //$('#total-price').html(subTotal.toFixed(2));
            
            row.remove();
        });


           $(thisButton).click(function() {
                    itemEntryCount--;
                    subTotal -= parseFloat($(thisButton).parent().parent().find('td.subTot').html());
                
                $('#num-item').html(itemEntryCount);
                $('#total-price').html(subTotal.toFixed(2));
                $(thisButton).parent().parent().remove();

            });
 */       


 /*
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
    */

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