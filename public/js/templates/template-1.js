$(function() {
  $( ".sortableEducation" ).sortable({
    tolerance: "pointer",
    start: function(event, ui) {
      ui.item.css({
        'padding': '5px',
        'box-shadow': '-3px 4px 5px 0px rgba(0,0,0,0.75)'
      });
    },
    stop: function(event, ui) {
      console.log("stop");
      console.log(event);
      console.log(ui);
    },
    update: function(event, ui) {
      
    }
  });

  $( ".sortableEducation" ).disableSelection();

  $( ".sortableEmployment" ).sortable({
  tolerance: "pointer"
});
  $( ".sortableEmployment" ).disableSelection();
});