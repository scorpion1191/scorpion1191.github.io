

 function isTouchDevice(){
     return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
 }
 var techstack = [{
	"Name":'HTML',
	"Percent":85
},{
	"Name":'CSS',
	"Percent":80
},{
	"Name":'Bootstrap',
	"Percent":70
},{
	"Name":'JavaScript',
	"Percent":75
},{
	"Name":'JQuery',
	"Percent":50
},{
	"Name":'AngularJs',
	"Percent":60
},{
	"Name":'ExtJs',
	"Percent":40
},{
	"Name":'NodeJs',
	"Percent":40
},{
	"Name":'C++',
	"Percent":30
},{
	"Name":'MongoDb',
	"Percent":20
},{
	"Name":'SQL',
	"Percent":20
}]
document.addEventListener("DOMContentLoaded", function(event) {
	console.log("DOM fully loaded and parsed");
	resizeWidthActElement();
	var subContainer = document.getElementsByClassName("subContainer");

	var myFunction = function(e) {
		let containerWidth = document.getElementsByClassName("container")[0].getBoundingClientRect().width;
    let subContainersLength = document.getElementsByClassName("subContainer").length-1 
	let activeElement = document.getElementsByClassName("Active")[0];
	var currentElement = getCurrentElement(e,'pageTitlelabel',);

	/*animation of pros and cons */
    let subcontainerWidth = (containerWidth < 900) ? 10 : 50 ;
      if(parseInt(currentElement.offsetWidth) <= 50){
        if(getIndexOfSubNav(currentElement.parentElement,activeElement) < getIndexOfSubNav(currentElement.parentElement,currentElement)){
          activeElement.style.width = ((containerWidth < 900) ? 10 : 50)+"px";
          currentElement.style.width = (containerWidth - (subcontainerWidth*subContainersLength)-20) +"px";
        }else{
          currentElement.style.width = (containerWidth - (subcontainerWidth*subContainersLength)-20) +"px";
          activeElement.style.width = ((containerWidth < 900) ? 10 : 50)+"px";
        }

        activeElement.classList.remove("Active");
        currentElement.classList.add("Active");

      }
	};

	for (var i = 0; i < subContainer.length; i++) {
		subContainer[i].getElementsByClassName('pageTitlelabel')[0].addEventListener('click', myFunction, false);
        document.getElementById('menu').getElementsByTagName('li')[i].addEventListener('click', myFunction, false);
	}


	window.addEventListener("resize", _.throttle(function(){
		resizeWidthActElement();
	},100));

	document.getElementsByClassName("about_container")[0].addEventListener("scroll", _.throttle(function(){
		toggleAnimationProCon();
	},100));



});
// document.getElementsByClassName("subContainer").addEventListener("click", function(e){
	
// });


function getCurrentElement(e,tagetValue){
    
    let currentElement;
    let containerWidth = document.getElementsByClassName("container")[0].getBoundingClientRect().width;
    
    let mobileDevice = (containerWidth < 900) ? true : false ;
    
    if(mobileDevice){
       currentElement = document.getElementsByClassName(e.srcElement.getAttribute('mobile-value'));
       document.getElementById("show-menu").checked = false;
    }
    currentElement = currentElement ? currentElement[0] : e.srcElement;
	if(currentElement.classList.contains(tagetValue)){
		return currentElement.parentElement;
	}else if(currentElement.parentElement.classList.contains(tagetValue)){
		return currentElement.parentElement.parentElement;
	}
}

function getIndexOfSubNav(parentContainer,childContainer){
	return Array.prototype.indexOf.call(parentContainer, childContainer)
 }

function resizeWidthActElement(){
    let containerWidth = document.getElementsByClassName("container")[0].getBoundingClientRect().width;
    let subContainersLength = document.getElementsByClassName("subContainer").length
    let activeElement = document.getElementsByClassName("Active")[0];
    let subcontainerWidth = (containerWidth < 900) ? 10 : 50 ;
    for (var i = 0; i < subContainersLength; i++) {
		document.getElementsByClassName("subContainer")[i].style.width = (subcontainerWidth)+"px";
	}
    activeElement.style.width = (containerWidth - (subcontainerWidth*(subContainersLength-1))-20) +"px";
}

function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    //var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}


function toggleAnimationProCon(){
	let prosdiv = document.getElementsByClassName("proscontainer")[0];
	let consdiv = document.getElementsByClassName("conscontainer")[0];

	if(isScrolledIntoView(document.getElementsByClassName("pros_cons")[0])){
		prosdiv.classList.add("pros");
		consdiv.classList.add("cons");
		
	}else{
		prosdiv.classList.remove("pros");
		consdiv.classList.remove("cons");
	}
}















