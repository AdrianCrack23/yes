// ==UserScript==
// @name         Google Fuck You
// @namespace    http://violentmonkey.net/
// @version      1.6
// @description  Yo
// @author       L.L.
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
    const GMxhr = (typeof GM_xmlhttpRequest !== 'undefined') ? GM_xmlhttpRequest :
                  (typeof GM !== 'undefined' && GM.xmlHttpRequest ? GM.xmlHttpRequest : null);

    if (!GMxhr) {
        console.error("GM_xmlhttpRequest not avaible.");
        return;
    }

    let signalSent = false;

    function sendOkToLocalhost() {
        GMxhr({
            method: 'POST',
            url: 'http://localhost:5000/ok',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ message: 'reCAPTCHA solved!' }),
            onload: function(response) {
                console.log('Sent:', response.responseText);
            },
            onerror: function(error) {
                console.error('Error sending:', error);
            }
        });
    }

    function checkRecaptcha() {
        let recaptchaCheckbox = document.querySelector("#recaptcha-anchor");

        if (recaptchaCheckbox && recaptchaCheckbox.classList.contains("recaptcha-checkbox-checked")) {
            if (!signalSent) {
                sendOkToLocalhost();
                signalSent = true;
            }
        }
    }
    setInterval(checkRecaptcha, 2000);
})();
