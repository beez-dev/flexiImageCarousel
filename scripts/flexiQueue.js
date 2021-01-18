
class FlexiRoundQueue{
    /* round queue implementation with useful methods and simple hash table */

    // static mFlexiRoundQueue = [];
    constructor(flexiObjects = []){
        this.mFlexiPosition = 0;
        this.mFlexiQueueHash = {};
        this.mFlexiImgHash = {};
        this.activeImagePosition = 0;
        this.elementCount = flexiObjects.length;
        /* TC */console.log("flexiQueue.js run");
        for(let i =0; i < flexiObjects.length; i++){
            this.add(flexiObjects[i]);
        }
        this.holdTransition = false;
    }

    getHoldTransition(){
        return this.holdTransition;
    }

    setHoldTransition(setToHold){
        this.holdTransition = setToHold;/* boolen expected */
    }

    getElementCount(){
        return this.elementCount;
    }

    setActiveImagePosition(position){
        this.activeImagePosition = position; 
    }

    getActiveImagePosition(){
        return this.activeImagePosition;
    }

    add(mFlexiObj){
        let availableKey = this.getFlexiPosition();
        this.mFlexiQueueHash[availableKey] = mFlexiObj;
        this.mFlexiImgHash[mFlexiObj.getFlexiID()] = availableKey;
        this.updateAvailablePosition();
    }

    roundShiftL(){
        let poppedFlexiObject = this.mFlexiQueueHash[0];
        let lastPosition = this.getFlexiPosition()-1;
        for(let i=0; i < lastPosition; i++){
            this.mFlexiQueueHash[i]= this.mFlexiQueueHash[i+1];
            this.mFlexiImgHash[this.mFlexiQueueHash[i].getFlexiID()]=i;
        }

        this.mFlexiQueueHash[lastPosition] = poppedFlexiObject;
        this.mFlexiImgHash[poppedFlexiObject.getFlexiID()] = lastPosition;

        poppedFlexiObject.setXCoord((this.mFlexiQueueHash[lastPosition - 1].getXCoord())+mFlexiContainerWidth);
        // poppedFlexiObject.setYCoord(this.mFlexiQueueHash[lastPosition - 1].getYCoord()); /* y coord is not altered, uncomment if required */
        poppedFlexiObject.refreshPosition();
        console.log("image roundShiftedL: ", poppedFlexiObject.getFlexiID() );
        return poppedFlexiObject;
    }

    
    roundShiftR(){
        let lastPosition = this.getFlexiPosition() - 1;
        let poppedFlexiObject = this.mFlexiQueueHash[lastPosition];
        for(let i=lastPosition; i > 0; i--){
            this.mFlexiQueueHash[i] = this.mFlexiQueueHash[i-1];
            this.mFlexiImgHash[this.mFlexiQueueHash[i].getFlexiID()]=i;
        }

        this.mFlexiQueueHash[0] = poppedFlexiObject;
        this.mFlexiImgHash[poppedFlexiObject.getFlexiID()] = 0;

        poppedFlexiObject.setXCoord( (this.mFlexiQueueHash[1].getXCoord()) - mFlexiContainerWidth );
        poppedFlexiObject.refreshPosition();
        // poppedFlexiObject.setYCoord(this.mFlexiQueueHash[1].getYCoord()); /* y coord is not altered, uncomment if required */
        console.log("image roundShiftedR: ", poppedFlexiObject.getFlexiID() );
        /*TODO*/
        return poppedFlexiObject;

    }

    roundShiftR_frontHead(){
        let lastPosition = this.getFlexiPosition() - 1;
        let poppedFlexiObject = this.mFlexiQueueHash[lastPosition];
        for(let i=lastPosition; i > 0; i--){
            this.mFlexiQueueHash[i] = this.mFlexiQueueHash[i-1];
            this.mFlexiImgHash[this.mFlexiQueueHash[i].getFlexiID()]=i;
        }

        // this.mFlexiQueueHash[0] = poppedFlexiObject;
        this.mFlexiImgHash[poppedFlexiObject.getFlexiID()] = 0;

        poppedFlexiObject.setXCoord( (this.mFlexiQueueHash[0].getXCoord()) - mFlexiContainerWidth );
        poppedFlexiObject.refreshPosition();
        // poppedFlexiObject.setYCoord(this.mFlexiQueueHash[1].getYCoord()); /* y coord is not altered, uncomment if required */
        console.log("image roundShiftedR: ", poppedFlexiObject.getFlexiID() );
        /*TODO*/
        return poppedFlexiObject;
    }


    getActiveImage(){
        return this.mFlexiQueueHash[0];//the image at position zero is the one that is always shown to the viewer; hence active
    }

    getFlexiQueueHash(){
        return this.mFlexiQueueHash;
    }

    getFlexiImgHash(){
        return this.mFlexiImgHash;
    }

    getFlexiQueuePosition(key){
        return this.getFlexiImgHash()[key];
    }

    getFlexiPosition(){
        return this.mFlexiPosition;
    }

    updateAvailablePosition(){
        this.mFlexiPosition += 1;
    }


}