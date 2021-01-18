// /* TC */ - test code
var leftArrow = null;
var rightArrow = null;
var mFlexiImages = [];/* flexi wrappers for dom objects */
var mFlexiImagePaths = []; /* string literals for paths */
var mFlexiIndicators = []; /* dom objects for indicators */


function initialSetup(){

    /* TC */console.log("initialSetup.js run");

    CssHelper.assignStyleProp(mFlexiContainer,{
            "position":"relative",
            "border":"none", /* border is not allowed else height/width miscalculation */
            "overflow":"hidden"
        });
  

    let carouselArrowProp = {
            "background":"",/* addition order matters */
            "backgroundSize":"contain",
            "position":"absolute",
            "zIndex":2
        };


    let widthPercent = 5;
    let heightPercent = 15;

    
    carouselArrowProp["top"] = Measures.percent(50-(heightPercent/2));/* centering on the div */
    ObjectUtils.propertyAppend(carouselArrowProp,{
                "width": Measures.percent(widthPercent),
                "height":Measures.percent(heightPercent),
                "top":Measures.percent(50-(heightPercent/2))
                 });

                
    leftArrow = new FlexiImg(carouselArrowProp, false, -1);/* negative indices dont change dynamically */
    leftArrow.adjustCssProp("background", `url(${mFlexiCarouselLeftArrowImg}) center center no-repeat` );
    leftArrow.adjustCssProp("marginLeft", Measures.px("10"));
    leftArrow= leftArrow.build();
    mFlexiContainer.appendChild(leftArrow.getDomObj());

    rightArrow = new FlexiImg(carouselArrowProp, false, -2);
    rightArrow.adjustCssProp("background", `url(${mFlexiCarouselRightArrowImg}) center center no-repeat`);
    rightArrow.adjustCssProp("right", Measures.px(0));
    rightArrow.adjustCssProp("margin-right", Measures.px(10));
    rightArrow = rightArrow.build();
    mFlexiContainer.appendChild(rightArrow.getDomObj());

    rightArrow.getDomObj().addEventListener("mouseenter", enterEvent=>{
                    rightArrow.update({"backgroundColor":mFlexiArrowHoverBG} );
                    });

    rightArrow.getDomObj().addEventListener("mouseleave", enterEvent=>{
            setTimeout(function(){
                rightArrow.update({"backgroundColor":"#ffffff00"});
                }, 100);
            });

    leftArrow.getDomObj().addEventListener("mouseenter", enterEvent=>{
                    leftArrow.update({"backgroundColor":mFlexiArrowHoverBG} );
                    });

    leftArrow.getDomObj().addEventListener("mouseleave", enterEvent=>{
            setTimeout(function(){
                leftArrow.update({"backgroundColor":"#ffffff00"});
                }, 100);
            });

    let mFlexiImgTags = mFlexiContainer.getElementsByTagName("img");

    let mFlexiImgCount = mFlexiImgTags.length;
    let indicatorBottomMargin = 10;
    let indicatorMarginRight = 10;
    let carouselIndicatorProps = {
            "background":mFlexiIndicatorColor,
            "backgroundSize":"cover",
            "border":"none",
            "borderRadius":Measures.px(100),
            "width":Measures.px(mFlexiIndicatorSize),
            "height":Measures.px(mFlexiIndicatorSize),
            "margin-bottom":Measures.px(indicatorBottomMargin),
            "margin-right":Measures.px(indicatorMarginRight),
            "position":"absolute",
            "bottom": Measures.px(0),
            "left":"0px",
            "zIndex":2,
        };
    
    let totalFlexiIndicatorWidth = mFlexiImgCount * (mFlexiIndicatorSize + mFlexiIndicatorMarginRight - 1); /* -1 for rightmost margin is not counted */
    let flexiIndicatorSpacingFactor = mFlexiIndicatorSize + mFlexiIndicatorMarginRight;
    let mFlexiLeft = Math.floor(mFlexiContainerWidth/2) - ( Math.floor( totalFlexiIndicatorWidth/2 ) );  
    

   

    
    let mFlexiImageProperties = {
                                    "background":"",
                                    "width":Measures.px(mFlexiContainerWidth),
                                    "height":Measures.px(mFlexiContainerHeight),
                                    "backgroundSize":"cover",
                                    "position":"absolute",
                                    "top":Measures.px(0),
                                    "left":Measures.px(0),
                                    "zIndex":1
                                };
    Array.from(mFlexiImgTags).forEach(
        function(eachImageTag){
            let flexiImagePath = eachImageTag.getAttribute("src");
            mFlexiContainer.removeChild(eachImageTag);
            let carouselIndicator = new FlexiImg(carouselIndicatorProps, true);
            let flexiID = carouselIndicator.getFlexiID();
            carouselIndicator.adjustCssProp("left", Measures.px(mFlexiLeft));
            mFlexiLeft += flexiIndicatorSpacingFactor;
            carouselIndicator = carouselIndicator.build();/* conversion to a DOM element */
            let carouselIndicatorDomObj = carouselIndicator.getDomObj();
            /* carouselIndicatorDomObj.addEventListener("mouseenter", enterEvent=>{
                    CssHelper.assignStyleProp(carouselIndicatorDomObj,{"background":mFlexiIndicatorHoverColor} );
                    });

            carouselIndicatorDomObj.addEventListener("mouseleave", enterEvent=>{
                    CssHelper.assignStyleProp(carouselIndicatorDomObj,{"background":mFlexiIndicatorColor});
                    }); */

            // carouselIndicator.setAttribute(mFlexiIDKey, flexiID);
            carouselIndicator.setFlexiID(flexiID);

            mFlexiImagePaths.push(flexiImagePath);
            mFlexiIndicators.push(carouselIndicator);

            mFlexiContainer.appendChild(carouselIndicatorDomObj);

            let mFlexiImage = new FlexiImg(mFlexiImageProperties,true, flexiID);
            mFlexiImage.adjustCssProp("background",
                                          `url(${flexiImagePath}) center center no-repeat`);
            mFlexiImages.push(mFlexiImage.build());
        });

    mFlexiIndicators[0].update({"backgroundColor": mFlexiIndicatorHoverColor});

    
    mFlexiImages.forEach(function(image){

        // image.update({"left": Measures.px(image.getFlexiID() * mFlexiContainerWidth )});
        image.translate(image.getFlexiID() * mFlexiContainerWidth ,0);
        mFlexiContainer.appendChild(image.getDomObj());
    });
    
    
    
}