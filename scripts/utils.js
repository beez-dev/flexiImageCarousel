class Measures{

    static px(value){
        return `${value}px`;
    }

    static percent(value){
        return `${value}%`;
    }

    static em(value){
        return `${value}em`;
    }
   
}


class CssHelper{

    static assignProp(domElement,bulkProperty){
        Object.keys(bulkProperty).forEach(
            function(property){
                domElement[property] = bulkProperty[property];
            }
        )
    }

    static assignStyleProp(domElement, bulkProperty){
        CssHelper.assignProp(domElement.style, bulkProperty);
    }

    static  assignStylePropBulk(domElements, bulkProperty){
        domElements.forEach(
            function(eachDomElement){
                CssHelper.assignStyleProp(eachDomElement, bulkProperty);
            }
        );
    }

}


class ObjectUtils{

    static propertyAppend(objectliteral, propertyObjectLiteral){
        for(let property in propertyObjectLiteral){
            objectliteral[property] = propertyObjectLiteral[property];
        }
    }

    static objectPrint(object){
        console.log("*********** printing : "+object+"************************");
        for(let prop in object){
            console.log(`key: ${prop} , value: ${object[prop]}`);
        }
    }


    static printFlexiObject(object, subProperty){
        console.log("*********** printing : "+object+"************************");
        for(let prop in object){
            console.log(`key: ${prop} , value: ${object[prop].getFlexiID()}`);
        }
    }

}