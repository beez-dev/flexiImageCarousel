
function initialSetup(){

    /* testcode */console.log(mFlexiContainer.clientWidth);
    /* testcode */console.log(mFlexiContainer.clientHeight);



    let leftArrow = document.createElement("div");
    // leftArrow.style.background =  "url(../resources/smallSquare.jpg);" /*  `${mFlexiContainerBGColor} url("https://picsum.photos/200/300") center center no-repeat`; */
    leftArrow.style.background=`url("https://picsum.photos/200/300") center center no-repeat`;
    leftArrow.style.width = Measures.px(200);
    leftArrow.style.height  = Measures.px(200);

    mFlexiContainer.appendChild(leftArrow);
    
}