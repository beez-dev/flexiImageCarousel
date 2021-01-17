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
                    flexiQueue.roundShiftR();
                }
            }

            for(let eachImage in flexiQueue.getFlexiQueueHash()){
                flexiQueue.getFlexiQueueHash()[eachImage].translate(directiveTranslationFactor, 0);
            }
            translativeAccumulation += translationFactor;
            currentIteration += 1;
            if(currentIteration == mFlexiTransitionSmoothness){

                traversalDifferenceError =  totalDistanceToTraverse - translativeAccumulation;

                /* if(traversalDifferenceError > 0){
                    for(let eachImage in flexiQueue.getFlexiQueueHash()){
                        flexiQueue.getFlexiQueueHash()[eachImage].translate(directiveFactor * traversalDifferenceError, 0);
                    }
                } */

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
                /* TC */ console.log("targetImageId is: ", targetIndicatorId);
                /* TC */ console.log("intial active image position: ", flexiQueue.getActiveImagePosition());
                let targetImagePosition = targetIndicatorId;
                let targetDistance = flexiQueue.getActiveImagePosition() - targetImagePosition;
                /* TC */console.log('target image position is: ', targetImagePosition);
                /* TC */console.log('targetDistance is: ', targetDistance);
                flexiQueue.setActiveImagePosition(targetIndicatorId);
                console.log("new target image position: ", targetIndicatorId);
                let directiveFactor = 0;

                if(targetDistance != 0){
                    if(targetDistance > 0){
                        directiveFactor = 1;
                    }else{
                        directiveFactor = -1;
                    }
                    
                    scroll( Math.abs(targetDistance), directiveFactor );
                }

            });
        });

}


window.onload = main;