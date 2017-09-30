$( function() {
	$('.title').css( 'cursor', 'move' )
	$('#email-stats').draggable({ handle: 'h4'})
	$('#users-behavior').draggable({ handle: 'h4'})
	$('#todos').draggable({ handle: 'h4'})
	$('#xyz').draggable({ handle: 'h4'})
	$('#abc').draggable({ handle: 'h4'})

	$(".card").data({
		'originalLeft': $(".card").css('left'),
		'origionalTop': $(".card").css('top')
	});

	$(".card").dblclick(function() {
		$(".card").css({
			'left': $(".card").data('originalLeft'),
			'top': $(".card").data('origionalTop')
		});
	});


})