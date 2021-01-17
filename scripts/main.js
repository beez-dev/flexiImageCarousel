function main(){
    initialSetup();

    let flexiQueue = new FlexiRoundQueue(mFlexiImages);

    /* ObjectUtils.printFlexiObject(flexiQueue.getFlexiQueueHash(), mFlexiIDKey);
    ObjectUtils.objectPrint(flexiQueue.getFlexiImgHash(), mFlexiIDKey); */

    function scroll(distanceUnits, directiveFactor){
        /* distance Units- number of images to traverse */
        /* translationFactor - gives negative or positive direction */
        if(distanceUnits == 0)return;

        let totalDistanceToTraverse = distanceUnits * mFlexiContainerWidth;
        let translationFactor = Math.floor(totalDistanceToTraverse/mFlexiTransitionSmoothness) ;
        let directiveTranslationFactor = directiveFactor * translationFactor;
        let translativeAccumulation = 0;
        let currentIteration = 0;

        let slideLoopFunction = setInterval(function(){

            if(currentIteration == 0){
                if(directiveFactor > 0){
                    for(let i=0; i < distanceUnits; i++){
                        flexiQueue.roundShiftR();
                    }
                }
                
            }

            for(let eachImage in flexiQueue.getFlexiQueueHash()){
                flexiQueue.getFlexiQueueHash()[eachImage].translate(directiveTranslationFactor, 0);
            }
            translativeAccumulation += translationFactor;
            currentIteration += 1;
            if(currentIteration == mFlexiTransitionSmoothness){

                traversalDifferenceError =  totalDistanceToTraverse - translativeAccumulation;

                if(traversalDifferenceError > 0){
                    for(let eachImage in flexiQueue.getFlexiQueueHash()){
                        flexiQueue.getFlexiQueueHash()[eachImage].translate(directiveFactor * traversalDifferenceError, 0);
                    }
                }

                if(directiveFactor < 0){
                    for(let i=0; i < distanceUnits; i++){
                            flexiQueue.roundShiftL();
                        }
                }
                
                clearInterval(slideLoopFunction);
                console.log("slideLoopFunction terminated");

            } }, ftdDelay() );
        
    }

    // function linearTransition(x){
    //     let equation = Math.floor(mFlexiContainerWidth/mFlexiTransitionDelay * x); /* y2-y1=x2-x1 ::point slope form */
        
    //     return equation;
    // }


    function ftdDelay(){
        return Math.floor(mFlexiTransitionDelay/mFlexiTransitionSmoothness ); 
    }

    function translationPerFTD(){
        return Math.floor(mFlexiContainerWidth/mFlexiTransitionSmoothness );
    }



    mFlexiIndicators.forEach(
        function(indicator){
            indicator.addOnClickListener(function(event){
                
                let targetIndicatorId = indicator.getFlexiID();
                let targetImagePosition = targetIndicatorId;
                let targetDistance = flexiQueue.getActiveImagePosition() - targetImagePosition;
                flexiQueue.setActiveImagePosition(targetIndicatorId);

                for(let i =0; i < mFlexiIndicators.length; i++){
                    if(mFlexiIndicators[i].getFlexiID() === targetIndicatorId){
                        console.log("match");
                        mFlexiIndicators[i].update({"background":mFlexiIndicatorHoverColor});
                    }else{
                        console.log("unmatch");
                        mFlexiIndicators[i].update({"background": mFlexiIndicatorColor});
                    }
                }

                let directiveFactor = 0;

                if(targetDistance != 0){
                    if(targetDistance > 0){
                        directiveFactor = 1;
                    }else{
                        directiveFactor = -1;/* move towards the right */
                    }
                    scroll( Math.abs(targetDistance), directiveFactor );
                }

            });
        });


    leftArrow.addOnClickListener(
        function(event){
            
            let activeImagePosition = flexiQueue.getActiveImagePosition();
            let targetId = (activeImagePosition + 1)%flexiQueue.getElementCount();
            // if(targetId === -1){targetId = flexiQueue.getElementCount();}
            flexiQueue.setActiveImagePosition(targetId);

            for(let i =0; i < mFlexiIndicators.length; i++){
                if(mFlexiIndicators[i].getFlexiID() === targetId){
                    console.log("match");
                    mFlexiIndicators[i].update({"background":mFlexiIndicatorHoverColor});
                }else{
                    console.log("unmatch");
                    mFlexiIndicators[i].update({"background": mFlexiIndicatorColor});
                }
            }

            scroll(1, -1);
        }
    );


    rightArrow.addOnClickListener(
        function(event){
            
            let activeImagePosition = flexiQueue.getActiveImagePosition();
            let targetId = (activeImagePosition - 1);
            if(targetId === -1){targetId = flexiQueue.getElementCount() - 1;}
            flexiQueue.setActiveImagePosition(targetId);

            for(let i =0; i < mFlexiIndicators.length; i++){
                if(mFlexiIndicators[i].getFlexiID() === targetId){
                    console.log("match");
                    mFlexiIndicators[i].update({"background":mFlexiIndicatorHoverColor});
                }else{
                    console.log("unmatch");
                    mFlexiIndicators[i].update({"background": mFlexiIndicatorColor});
                }
            }
            scroll(1, 1);
        }
    );

}


window.onload = main;