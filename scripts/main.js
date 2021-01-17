function main(){
    initialSetup();

    let flexiQueue = new FlexiRoundQueue(mFlexiImages);

    /* ObjectUtils.printFlexiObject(flexiQueue.getFlexiQueueHash(), mFlexiIDKey);
    ObjectUtils.objectPrint(flexiQueue.getFlexiImgHash(), mFlexiIDKey); */

    function scroll(distance, transitionDelay, translationFactor ,distanceTravelled = 0){
        
        for(let eachImage in flexiQueue.getFlexiQueueHash()){
            flexiQueue.getFlexiQueueHash()[eachImage].translate(translationFactor, 0);
        }
        flexiQueue.roundShiftL();
        console.log(distanceTravelled);
        distanceTravelled += 1;
        if(distanceTravelled != distance){
            setTimeout(
                function(){
                    scroll(distance, transitionDelay, translationFactor, distanceTravelled);
                },transitionDelay);
        }
    }

    mFlexiIndicators.forEach(
        function(indicator){
            indicator.addOnClickListener(function(event){
                let targetImageId = indicator.getFlexiID();
                let targetDistance = flexiQueue.getActiveImagePosition() - flexiQueue.getFlexiQueuePosition(targetImageId);

                if(targetDistance != 0){
                    if(targetDistance > 0){
                        translationFactor = mFlexiContainerWidth;
                    }else{
                        factor = -1*mFlexiContainerWidth;
                    }
                    
                    scroll(Math.abs(targetDistance), mFlexiTransitionDelay, factor, 0);
                }

            });
        });

}


window.onload = main;