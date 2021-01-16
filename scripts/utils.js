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
        assignProp(domElement.style, bulkProperty);
    }

    static  assignStylePropBulk(domElements, bulkProperty){
        domElements.forEach(
            function(eachDomElement){
                assignStyleProp(eachDomElement, bulkProperty);
            }
        );
    }

}