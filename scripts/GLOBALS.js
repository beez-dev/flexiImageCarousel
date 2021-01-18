const mFlexiContainerName = "flexi-carousel";
const mFlexi_LANDSCAPE = "LANDSCAPE";
const mFlexi_PORTRAIT = "PORTRAIT";
const mFlexiContainer = document.getElementsByClassName(mFlexiContainerName)[0];
const mFlexiContainerWidth = mFlexiContainer.clientWidth;
const mFlexiContainerHeight = mFlexiContainer.clientHeight;
var mFlexiImgCount = 0;
const mFlexiContainerType = mFlexiContainer.clientWidth > mFlexiContainer.clientHeight ? mFlexi_LANDSCAPE:mFlexi_PORTRAIT;
const mFlexiContainerBGColor = "#ff0000;"

const mFlexiCarouselLeftArrowImg = 'images/icons/IC_leftArrow.svg';
const mFlexiCarouselRightArrowImg = 'images/icons/IC_rightArrow.svg';


const mFlexiIndicatorSize = indicatorSize;
const mFlexiIndicatorMarginRight = indicatorSpacing;
const mFlexiIndicatorMarginBottom = indicatorBottomSpacing;
const mFlexiIndicatorColor = indicatorColor;
const mFlexiIndicatorHoverColor = indicatorActiveColor;
const mFlexiIDKey = "mFlexiID";/* flexi queue */
const mFlexiQueueKey = "mFlexiQKey"

// const mFlexiSpeed = 1000;
// const mFlexiActivePosition = 0;

const mFlexiTransitionDelay = transitionDelay; /* millisecond */
const mFlexiHoldDelay = holdDelay;
const mFlexiTransitionSmoothness = transitionSmoothness;/*ftd units - frames per transition delay */

const mFlexiArrowHoverBG = "rgba(255, 255, 255, 0.22)";


// const mFlexiImageBufferSize = 4; /* possible optimization feature */

