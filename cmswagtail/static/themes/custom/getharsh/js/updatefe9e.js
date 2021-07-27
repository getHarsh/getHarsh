jQuery(document).ready(function($) {
	if($('#toolbar-administration').length){
		$('header#topnav').css('top','80px');
	}
	$('#navigation > ul.navigation-menu > li.comets-megamenu > ul').addClass('megamenu');
	$('#navigation > ul.navigation-menu > li.comets-megamenu > ul.megamenu > li > ul').removeClass('submenu');
	$('#navigation > ul.navigation-menu > li.comets-megamenu > ul.megamenu > li.has-submenu').each(function() {
		var content = $(this).find('a').html();
		var title_content = '<li><span>'+content+'</span></li>';
		//$(this).children('a').wrap('<span></span>');
		$(this).children('a').remove();
		//$(this).children('ul').children('li').first().before(title_content);
		if($(this).children('ul').children('li').length){
			$(this).children('ul').children('li').first().before(title_content);
		}else{
			$(this).children('ul').html(title_content);
		}
	});
	$('header .search-form form .form-actions input[type=submit]').after('<i class="ti-search"></i>'); 
	$('.single-product-add .inline-form .form-actions input[type=submit]').after('<i class="ti-bag"></i>');
	$('.table.cart-comets.responsive-enabled tbody > tr > td:nth-child(2)').addClass('hidden-xs');
	$('.table.cart-comets.responsive-enabled thead > tr > th.image').addClass('hidden-xs');
	$('.table.cart-comets.responsive-enabled tbody > tr > td:first-child > input[type=submit]').val('');
	$('.table.cart-comets.responsive-enabled tbody > tr > td:first-child > input[type=submit]').after('<i class="ti-close"></i>');
	$('#page-checkout-comets #cart-pane table.cart-review').attr('class','table cart');
	$('.table.cart-comets').addClass('cart');
	$('.comets-product-item').each(function() {
		var content = $(this).find('.comets-hidden-element').html();
		$(this).find('.shop-product > .product-thumb > .add-to-cart-views').html(content);
	});
	$('.shop-product .product-overlay form.inline-form input[type=submit]').attr('class','btn btn-color-out btn-sm');
	$('img').each(function(){
	  	if($(this).attr('width') == undefined || $(this).attr('width') == '') {
	   		$(this).attr('width', $(this).width());
	   		$(this).attr('height', $(this).height());
	  	}
 	});
 	//alert('asdasd');
});
