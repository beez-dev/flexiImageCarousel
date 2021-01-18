function main(){
    initialSetup();

    let flexiQueues = [];
    
    mFlexiAssetGroups.forEach(
        function(flexiAssetGroup){
            flexiQueues.push(new FlexiRoundQueue(flexiAssetGroup.mFlexiImages));
        }
    );

    /* ObjectUtils.printFlexiObject(flexiQueue.getFlexiQueueHash(), mFlexiIDKey);
    ObjectUtils.objectPrint(flexiQueue.getFlexiImgHash(), mFlexiIDKey); */

    function scroll(localFlexiQueue,distanceUnits, directiveFactor){
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
                        localFlexiQueue.roundShiftR();
                    }
                }
            }

            for(let eachImage in localFlexiQueue.getFlexiQueueHash()){
                localFlexiQueue.getFlexiQueueHash()[eachImage].translate(directiveTranslationFactor, 0);
            }

            translativeAccumulation += translationFactor;
            currentIteration += 1;
            if(currentIteration == mFlexiTransitionSmoothness){

                traversalDifferenceError =  totalDistanceToTraverse - translativeAccumulation;

                if(traversalDifferenceError > 0){
                    for(let eachImage in localFlexiQueue.getFlexiQueueHash()){
                        localFlexiQueue.getFlexiQueueHash()[eachImage].translate(directiveFactor * traversalDifferenceError, 0);
                    }
                }

                if(directiveFactor < 0){
                    for(let i=0; i < distanceUnits; i++){
                        localFlexiQueue.roundShiftL();
                        }
                }
                
                clearInterval(slideLoopFunction);
                //console.log("slideLoopFunction terminated");

            } }, ftdDelay() );
        
    }



    function ftdDelay(){
        return Math.floor(mFlexiTransitionDelay/mFlexiTransitionSmoothness ); 
    }

    function translationPerFTD(){
        return Math.floor(mFlexiContainerWidth/mFlexiTransitionSmoothness );
    }

    function leftArrowHandler(localFlexiQueue, localFlexiIndicators){
        let activeImagePosition = localFlexiQueue.getActiveImagePosition();
            let targetId = (activeImagePosition + 1)%localFlexiQueue.getElementCount();
            // if(targetId === -1){targetId = flexiQueue.getElementCount();}
            localFlexiQueue.setActiveImagePosition(targetId);

            for(let i =0; i < localFlexiIndicators.length; i++){

                if(localFlexiIndicators[i].getFlexiID() === targetId){
                    //console.log("match");
                    localFlexiIndicators[i].update({"background":mFlexiIndicatorHoverColor});
                }else{
                    //console.log("unmatch");
                    localFlexiIndicators[i].update({"background": mFlexiIndicatorColor});
                }
            }

            scroll(localFlexiQueue,1, -1);
    }

    function rightArrowHandler(localFlexiQueue, localFlexiIndicators){
        
        let activeImagePosition = localFlexiQueue.getActiveImagePosition();
            let targetId = (activeImagePosition - 1);
            if(targetId === -1){targetId = localFlexiQueue.getElementCount() - 1;}
            localFlexiQueue.setActiveImagePosition(targetId);

            for(let i =0; i < localFlexiIndicators.length; i++){
                if(localFlexiIndicators[i].getFlexiID() === targetId){
                    //console.log("match");
                    localFlexiIndicators[i].update({"background":mFlexiIndicatorHoverColor});
                }else{
                    //console.log("unmatch");
                    localFlexiIndicators[i].update({"background": mFlexiIndicatorColor});
                }
            }
            scroll(localFlexiQueue, 1, 1);
    }


    for(let flexiIndex; flexiIndex < flexiQueues.push(); flexiIndex++){

        let currentAssetGroup = mFlexiAssetGroups[i];
        let flexiQueue = flexiQueues[i];
        let mFlexiIndicators = currentAssetGroup.mFlexiIndicators;

        mFlexiIndicators.forEach(
            function(indicator){
                indicator.addOnClickListener(function(event){
                    flexiQueue.setHoldTransition(true);
                    let targetIndicatorId = indicator.getFlexiID();
                    let targetImagePosition = targetIndicatorId;
                    let targetDistance = flexiQueue.getActiveImagePosition() - targetImagePosition;
                    flexiQueue.setActiveImagePosition(targetIndicatorId);

                    for(let i =0; i < mFlexiIndicators.length; i++){
                        if(mFlexiIndicators[i].getFlexiID() === targetIndicatorId){
                            //console.log("match");
                            mFlexiIndicators[i].update({"background":mFlexiIndicatorHoverColor});
                        }else{
                            //console.log("unmatch");
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

                        scroll(flexiQueue,Math.abs(targetDistance), directiveFactor );

                    }

                });
            });

        
        

            currentAssetGroup.leftArrow.addOnClickListener(
                function(event){
                    flexiQueue.setHoldTransition(true);
                    currentAssetGroup.leftArrow.update({"background": "url(../images/icons/IC_leftArrow_Active.svg) center center no-repeat","backgroundSize": "contain"});
                    setTimeout(function(){
                        currentAssetGroup.leftArrow.update({"background":"url(../images/icons/IC_leftArrow.svg) center center no-repeat","backgroundSize": "contain"});
                    }, (mFlexiTransitionDelay+100));
                    leftArrowHandler(flexiQueue, currentAssetGroup.mFlexiIndicators);
                }
            );

            currentAssetGroup.rightArrow.addOnClickListener(
                function(event){
                    flexiQueue.setHoldTransition(true);
                    currentAssetGroup.rightArrow.update({"background": "url(../images/icons/IC_rightArrow_Active.svg) center center no-repeat","backgroundSize": "contain"});
                    setTimeout(function(){
                        currentAssetGroup.rightArrow.update({"background":"url(../images/icons/IC_rightArrow.svg) center center no-repeat","backgroundSize": "contain"});
                    }, (mFlexiTransitionDelay + 100) );
                    rightArrowHandler(flexiQueue, currentAssetGroup.mFlexiIndicators);            
                }
            );
            

        setInterval(
            function(){
                if(!flexiQueue.getHoldTransition()){
                    leftArrowHandler(flexiQueue,currentAssetGroup.mFlexiIndicators);
                }else{
                    flexiQueue.setHoldTransition(false);
                }
            }, (mFlexiHoldDelay+mFlexiTransitionDelay)); 
    
    
    }


}


window.onload = main;