// ==UserScript==
// @name         Google Fuck You
// @namespace    https://example.com
// @homepage     https://example.com
// @version      6.9
// @encoding     utf-8
// @description  A beautiful thing ruined by a period
// @author       L.L.
// @match        *://*/*
// @compatible   chrome
// @compatible   firefox
// @compatible   opera
// @compatible   safari
// @compatible   edge
// @downloadURL  https://raw.githubusercontent.com/AdrianCrack23/yes/refs/heads/main/orno.user.js
// @updateURL    https://raw.githubusercontent.com/AdrianCrack23/yes/refs/heads/main/orno.user.js
// @grant        GM.xmlHttpRequest
// @run-at       document-end
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
            method: 'GET',
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
