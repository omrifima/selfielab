var LOADER_CONTAINER = $("#loader");
var LOADER_INTERVAL = 1600;
var index = 0;
var LOADERS = [
  ["😋","Make a face"],
  ["🧀","Say cheese!"],
  ["📸","Get a photo"],
  ["💖","Share the love"]
]

$(document).ready(function() {
  
  var cycleLoader = function() {

    var selected = LOADERS[index];
    var selectedEmoji = selected[0];
    var selectedText = selected[1];
    
    // First transition out the old loader
    setTimeout(function(){
      LOADER_CONTAINER.children().addClass("animateOut");
    }, LOADER_INTERVAL - 300); 
    
 LOADER_CONTAINER.children(".emoji").last().remove();
    LOADER_CONTAINER.children(".text").last().remove();
    
    // Then animate in the new one
    LOADER_CONTAINER.append('<div class="emoji">' + selectedEmoji + '</div>');
    LOADER_CONTAINER.append('<div class="text">' + selectedText + '</div>');
    index++;
    if(index>=LOADERS.length)
      index=0;
  }
  
  setInterval(cycleLoader, LOADER_INTERVAL);  
  cycleLoader(); // Run first time without delay
  
});