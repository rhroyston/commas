/*
    JavaScript Immediately-Invoked Function Expression (IIFE) to
    automatically format numbers as you type in an HTML text area
    of text input.  Attached to text area or text input by adding 
    class 'commas' to target element.
    
    (c) 2016, Ron Royston, MIT License
    https://rack.pub
*/

(function() {

    var doc = document;
    var targetText = doc.getElementsByClassName('commas');
    var numArray = [];
    var backArray = [];
    var num = '';
    var numF = '';
    var regx = '';
    var thisChar = '';
    var lastChar = '';
    var str = '';
    var index = 0;

    for (var i = 0; i < targetText.length; i++) {

        targetText[i].addEventListener("keydown", function() {
            var key = event.keyCode;
            str = this.value;

            // if backspace or delete pressed
            if (key == 8 || key == 46) {
                backArray = [];
                index = str.length - 1;
                lastChar = str.charAt(index);

                //if lastChar is a number or a comma
                if (!isNaN(lastChar) || lastChar == ',') {
                    //look back until you find a character that is not a number or a comma
                    for (var i = str.length - 1; i >= 0; i--) {
                        if (str.charAt(i) == ' ') {
                            return;
                        }
                        //if(str.charAt(i)) is a number put it in array
                        else if (!isNaN(str.charAt(i)) || str.charAt(i) == ',') {
                            backArray.push(str.charAt(i));
                            //if(str.charAt(i)) is not a number or comma exit/return
                        }
                        else {
                            return;
                        }
                    }
                }
            }

            //if spacebar pressed
            if (key == 32) {
                if (backArray[1]) {
                    var dirty = backArray.reverse().slice(0, -1).join('');
                    var clean = dirty.replace(/\,/g, "");
                    var final = Number(clean).toLocaleString().toString();
                    var n = str.lastIndexOf(dirty);
                    if (n >= 0 && n + dirty.length >= str.length) {
                        str = str.substring(0, n) + final;
                    }
                    this.value = str;
                }
            }
        });

        targetText[i].addEventListener("keypress", function() {
            thisChar = this.value.slice(-1);

            if (!isNaN(thisChar)) {
                if (thisChar == ' ') {
                    num = numArray.join('');
                    numArray = [];
                    numF = Number(num).toLocaleString().toString();
                    regx = num + '(?!.*' + num + ')';
                    regx = new RegExp(regx);
                    var newVal = this.value.replace(regx, numF);
                    this.value = newVal;
                    return;
                }
                numArray.push(thisChar);
            }
            else {
                num = numArray.join('');
                numArray = [];
                numF = Number(num).toLocaleString().toString();
                regx = num + '(?!.*' + num + ')';
                regx = new RegExp(regx);
                var newVal = this.value.replace(regx, numF);
                this.value = newVal;
            }
        });

    }
}());