'use strict';

var InputFieldBehaviour = (function () {

    var inputField;
    var placeholder;

    function setPlaceholderVisibility(){
        if(inputField.value === '' || inputField.value === null || inputField.value === undefined){
            placeholder.classList.remove('visible')
        } else {
            placeholder.classList.add('visible');
        }
    }
    
    function init(){
        inputField = document.querySelector('.todo__input-field');
        placeholder = document.querySelector('.todo__input-placeholder');
    }

    //public api
    return {
        init: init,
        setPlaceholderVisibility: setPlaceholderVisibility,
    };

})();