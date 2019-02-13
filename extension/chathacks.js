// Load the KaTeX extension that supports copy-pasting of rendered math as TeX

// thanks you https://stackoverflow.com/a/14521482 !!

var link = document.createElement('link');
link.href="https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/contrib/copy-tex.css" 
link.rel="stylesheet"
link.type="text/css"

var script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/contrib/copy-tex.min.js";

document.head.appendChild(link);
document.head.appendChild(script);



// Add a 'message preview' box underneath the typing area:
var preview   = document.createElement('div');
preview.id = "preview";
preview.class = "message";
preview.style = "border-top-width: 1px; border-top-style: solid; border-color: inherit; padding-top: 1em;";
preview.innerHTML = '<span class="nick" style="color: inherit;">preview</span><pre id="textpreview" class="text"></pre>';
var chatform  = document.getElementById("chatform");
chatform.appendChild(preview);

// link the previewtext and the message text
var chatinput = document.getElementById("chatinput");
var previewtext = document.getElementById("textpreview");

// make the preview change whenever the input changes
chatinput.oninput = function () {
    console.log("INPUT DETECTED");
    // update the preview:
    updatePreview();
    updateInputSize();
}

updateInputSize();

// attach to the keydown event listener!
chatinput.addEventListener('keydown', function(e) {
    updatePreview();
    updateInputSize();
}, false);


function updatePreview() {
    // Temporary hotfix for \rule spamming, see https://github.com/Khan/KaTeX/issues/109
    previewtext.innerHTML = chatinput.value.replace(/\\rule|\\\\\s*\[.*?\]/g, '');
    if (document.getElementById('parse-latex').checked) {
        try {
            renderMathInElement(previewtext, {
                delimiters: [
                    { left: "$$", right: "$$", display: true },
                    { left: "$", right: "$", display: false },
                ]
            })
        } catch (e) {
            console.warn(e);
        }
    }
}

function updateInputSize() {
    var atBottom = isAtBottom();

    chatinput.style.height = 0;
    chatinput.style.height = chatinput.scrollHeight + 'px';
    preview.style.height = 0;
    preview.style.height = preview.scrollHeight + 'px';
    document.body.style.marginBottom = document.getElementById('footer').offsetHeight + 'px';

    if (atBottom) {
        window.scrollTo(0, document.body.scrollHeight);
    }
}

function isAtBottom() {
    return (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 1);
}