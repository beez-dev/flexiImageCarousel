const mFlexiContainerName = "flexi-carousel";
const mFlexi_LANDSCAPE = "LANDSCAPE";
const mFlexi_PORTRAIT = "PORTRAIT";
const mFlexiContainer = document.getElementsByClassName(mFlexiContainerName)[0];
const mFlexiContainerWidth = mFlexiContainer.clientWidth;
const mFlexiContainerHeight = mFlexiContainer.clientHeight;
const mFlexiContainerType = mFlexiContainer.clientWidth > mFlexiContainer.clientHeight ? mFlexi_LANDSCAPE:mFlexi_PORTRAIT;
const mFlexiContainerBGColor = "#ff0000;"

const mFlexiCarouselLeftArrowImg = '../images/icons/IC_leftArrow.svg';
const mFlexiCarouselRightArrowImg = '../images/icons/IC_rightArrow.svg';


const mFlexiIndicatorSize = 10;
const mFlexiIndicatorMarginRight = 10;
const mFlexiIndicatorMarginBottom = 10;
const mFlexiIndicatorColor = "#ff0000";
const mFlexiIndicatorHoverColor = "#ffa500";
const mFlexiIDKey = "mFlexiID";

const mFlexiImageBufferSize = 4;


class GlobalImageCounter{
    static GLOBAL_IMAGE_COUNTER = 0;
    static ACTIVE_IMAGE_ID = 0;

    static setActiveImageId(id){
        GlobalImageCounter.ACTIVE_IMAGE_ID = id;
    }

    static getActiveImageId(id){
        return GlobalImageCounter.ACTIVE_IMAGE_ID;
    }

    static getUniqueImageId(){
        let curGlobalId = GlobalImageCounter.getGlobalImageCounter();
        GlobalImageCounter.updateGlobalImageCounter();
        return curGlobalId;
    }

    static getGlobalImageCounter(){
        return GlobalImageCounter.GLOBAL_IMAGE_COUNTER;
    }

    static updateGlobalImageCounter(){
        GlobalImageCounter.GLOBAL_IMAGE_COUNTER += 1;
    }
}
