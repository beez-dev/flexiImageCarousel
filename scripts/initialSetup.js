// /* TC */ - test code

 class FlexiAssets{
     constructor(){
        this.leftArrow = null;
        this.rightArrow = null;
        this.mFlexiImages = [];/* flexi wrappers for dom objects */
        this.mFlexiImagePaths = []; /* string literals for paths */
        this.mFlexiIndicators = []; /* dom objects for indicators */
     }
 }




function initialSetup(){


    for(let flexiIndex = 0; flexiIndex < mFlexiContainers.length; flexiIndex++){

        let flexiAssetGroup = new FlexiAssets();
        let mFlexiContainer = mFlexiContainers[flexiIndex];

        mFlexiAssetGroups.push( flexiAssetGroup );

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

                    
        flexiAssetGroup.leftArrow = new FlexiImg(carouselArrowProp, false, -1);/* negative indices dont change dynamically */
        flexiAssetGroup.leftArrow.adjustCssProp("background", `url(${mFlexiCarouselLeftArrowImg}) center center no-repeat` );
        flexiAssetGroup.leftArrow.adjustCssProp("marginLeft", Measures.px("10"));
        flexiAssetGroup.leftArrow= flexiAssetGroup.leftArrow.build();
        mFlexiContainer.appendChild(flexiAssetGroup.leftArrow.getDomObj());

        flexiAssetGroup.rightArrow = new FlexiImg(carouselArrowProp, false, -2);
        flexiAssetGroup.rightArrow.adjustCssProp("background", `url(${mFlexiCarouselRightArrowImg}) center center no-repeat`);
        flexiAssetGroup.rightArrow.adjustCssProp("right", Measures.px(0));
        flexiAssetGroup.rightArrow.adjustCssProp("margin-right", Measures.px(10));
        flexiAssetGroup.rightArrow = flexiAssetGroup.rightArrow.build();
        mFlexiContainer.appendChild(flexiAssetGroup.rightArrow.getDomObj());

        flexiAssetGroup.rightArrow.getDomObj().addEventListener("mouseenter", enterEvent=>{
                        flexiAssetGroup.rightArrow.update({"backgroundColor":mFlexiArrowHoverBG} );
                        });

        flexiAssetGroup.rightArrow.getDomObj().addEventListener("mouseleave", enterEvent=>{
                setTimeout(function(){
                    flexiAssetGroup.rightArrow.update({"backgroundColor":"#ffffff00"});
                    }, 100);
                });

        flexiAssetGroup.leftArrow.getDomObj().addEventListener("mouseenter", enterEvent=>{
                        flexiAssetGroup.leftArrow.update({"backgroundColor":mFlexiArrowHoverBG} );
                        });

        flexiAssetGroup.leftArrow.getDomObj().addEventListener("mouseleave", enterEvent=>{
                setTimeout(function(){
                    flexiAssetGroup.leftArrow.update({"backgroundColor":"#ffffff00"});
                    }, 100);
                });

        let mFlexiImgTags = mFlexiContainer.getElementsByTagName("img");

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
        
        let totalFlexiIndicatorWidth = mFlexiImgTags.length * (mFlexiIndicatorSize + mFlexiIndicatorMarginRight - 1); /* -1 for rightmost margin is not counted */
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

                flexiAssetGroup.mFlexiImagePaths.push(flexiImagePath);
                flexiAssetGroup.mFlexiIndicators.push(carouselIndicator);

                mFlexiContainer.appendChild(carouselIndicatorDomObj);

                let mFlexiImage = new FlexiImg(mFlexiImageProperties,true, flexiID);
                mFlexiImage.adjustCssProp("background",
                                            `url(${flexiImagePath}) center center no-repeat`);
                flexiAssetGroup.mFlexiImages.push(mFlexiImage.build());
            });

        flexiAssetGroup.mFlexiIndicators[0].update({"backgroundColor": mFlexiIndicatorHoverColor});

        
        let fakeId = 0;
        flexiAssetGroup.mFlexiImages.forEach(function(image){

            // image.update({"left": Measures.px(image.getFlexiID() * mFlexiContainerWidth )});
            image.translate(fakeId * mFlexiContainerWidth ,0);
            mFlexiContainer.appendChild(image.getDomObj());
        });

    }
    
}