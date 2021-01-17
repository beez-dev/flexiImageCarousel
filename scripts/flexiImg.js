class FlexiImg{

    static GLOBAL_IMAGE_COUNTER = 0;

    static ACTIVE_IMAGE_ID = 0;/* TC */

    constructor(imageCssProps={},copyAttributes = false, imageId = null,elementType = 'div'){
        this.elementType = elementType;
        this.cssProps = copyAttributes? {...imageCssProps}: imageCssProps;
        this.mFlexiId = (imageId == null)?FlexiImg.getUniqueImageId():imageId;
        this.domObj= null;
        this.x = 0;
        this.y = 0;
    }

    setXCoord(xCoord){
        this.x = xCoord;
    }

    setYCoord(yCoord){
        this.y = yCoord;
    }


    getXCoord(){
        return this.x;
    }

    getYCoord(){
        return this.y;
    }

    adjustCssProp(cssProp, propValue){
        this.cssProps[cssProp] = propValue;
    }

    adjustCssPropBulk(cssPropBulk){
        for(let property in cssPropBulk){
            this.adjustCssProp(property, cssPropBulk[property]);
        }
    }

    getProperty(key){
        return this.cssProps[key];
    }

    getFlexiID(){
        return this.mFlexiId;
    }

    setFlexiID(flexiId){
        this.mFlexiId = flexiId;
    }

    getCssProperties(){
        return this.cssProps;
    }

    getElementType(){
        return this.elementType;
    }

    setDomObj(object){
        this.domObj = object;
    }

    getDomObj(){
        return this.domObj;
    }

    update(cssProperties={}){
        if(this.getDomObj() != null){
            CssHelper.assignStyleProp(this.getDomObj(), cssProperties);
        }else{
            throw `FlexiImg object::${this} is not built yet, please build it first`;
        }
    }


    translate(x, y){
        this.setXCoord(this.getXCoord() + x);
        this.setYCoord(this.setYCoord() + y);

        this.update({
                "left":Measures.px(this.getXCoord()),
                "top": Measures.px(this.getYCoord())
            });
        
    }

    build(overrideCSSProperties=null){
        let imageElement = document.createElement(this.getElementType());

        CssHelper.assignStyleProp(imageElement, this.getCssProperties());

        if(overrideCSSProperties != null){
            CssHelper.assignStyleProp(imageElement, overrideCSSProperties);
        }

        this.setDomObj(imageElement);
        return this;
    }

    addOnClickListener(callbackFunction){
        if(this.getDomObj() != null){
            this.getDomObj().addEventListener("click",callbackFunction);
        }
    }

    static setActiveImageId(id){
        FlexiImg.ACTIVE_IMAGE_ID = id;
    }

    static getActiveImageId(id){
        return FlexiImg.ACTIVE_IMAGE_ID;
    }

    static getUniqueImageId(){
        let curGlobalId = FlexiImg.getGlobalImageCounter();
        FlexiImg.updateGlobalImageCounter();
        return curGlobalId;
    }

    static getGlobalImageCounter(){
        return FlexiImg.GLOBAL_IMAGE_COUNTER;
    }

    static updateGlobalImageCounter(){
        FlexiImg.GLOBAL_IMAGE_COUNTER += 1;
    }

}


