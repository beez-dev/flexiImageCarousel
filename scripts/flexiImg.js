class FlexiImg{
    constructor(imageCssProps={},copyAttributes = false, imageId = null,elementType = 'div'){
        this.elementType = elementType;
        this.cssProps = copyAttributes? {...imageCssProps}: imageCssProps;
        this.mFlexiId = (imageId == null)?GlobalImageCounter.getUniqueImageId():imageId;
    }

    adjustCssProp(cssProp, propValue){
        this.cssProps[cssProp] = propValue;
    }

    adjustCssPropBulk(cssPropBulk){
        for(let property in cssPropBulk){
            this.adjustCssProp(property, cssPropBulk[property]);
        }
    }

    getFlexiID(){
        return this.mFlexiId;
    }

    getCssProperties(){
        return this.cssProps;
    }

    getElementType(){
        return this.elementType;
    }

    build(overrideCSSProperties=null){
        let imageElement = document.createElement(this.getElementType());

        CssHelper.assignStyleProp(imageElement, this.getCssProperties());

        if(overrideCSSProperties != null){
            CssHelper.assignStyleProp(imageElement, overrideCSSProperties);
        }

        return imageElement;
    }

}


