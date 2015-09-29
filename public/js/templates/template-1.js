$(function() {
  $('.sortableSections').sortable({
    axis: 'y',
    tolerance: 'intersect',
    handle: '.section-handle',
    cancel: '.section-title',
    update: function(event, ui) {
      
    }
  });

  $('.sortableEntries').sortable({
    axis: 'y',
    tolerance: 'intersect',
    handle: '.entry',
    update: function(event, ui) {
      
    }
  });

  $('.section-handle').hover(function() {
    $(this).parent().css('border-color', '#000');
  }, function() {
    $(this).parent().css('border-color', 'transparent');
  });
});