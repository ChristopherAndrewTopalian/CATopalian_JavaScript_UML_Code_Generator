// catopalian_javascript_universal_code_colorer.js

// THE AUTO-STYLER (The JS builds its own CSS)
function injectHighlighterStyles()
{
    // Safety check: don't inject it twice if the function runs again
    if (document.getElementById('universal-highlighter-styles'))
    {
        return;
    }

    let style = document.createElement('style');
    style.id = 'universal-highlighter-styles';

    // We write the CSS directly inside the JS using backticks
    style.innerHTML = `
        /* The Code Box */
        .custom-code {
            display: block;
            white-space: pre-wrap;
            word-wrap: break-word;
            overflow-x: hidden; 
            background-color: rgb(30, 30, 30);
            color: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 10px;
            border: 1px solid rgb(80, 80, 80);
            font-family: Consolas, monospace;
            font-size: 20px;
        }

        /* The Colors */
        .pink { color: rgb(255, 192, 203); }
        .green { color: rgb(100, 255, 100); }
        .yellow { color: rgb(255, 255, 0); }
        .flowControl { color: rgb(255, 165, 0); }
        .objects { color: rgb(0, 255, 255); }
        .magenta { color: rgb(255, 0, 255); }
        .lightGray { color: rgb(200, 200, 200); }
    `;

    // Inject it into the head of the HTML document
    document.head.appendChild(style);
}

// THE MASTER SYNTAX DICTIONARY
const syntaxRules = {
    js: {
        methods: ['abs',
            'acos',
            'acosh',
            'adoptNode',
            'alert',
            'appendChild',
            'asin',
            'asinh',
            'assert',
            'assign',
            'at',
            'atan',
            'atan2',
            'atanh',
            'atob',
            'back',
            'blur',
            'btoa',
            'cbrt',
            'ceil',
            'charAt',
            'charCodeAt',
            'clear',
            'clearInterval',
            'clearTimeout',
            'clearWatch',
            'click',
            'close',
            'closest',
            'clz32',
            'compile',
            'concat',
            'confirm',
            'constructor',
            'contains',
            'copyWithin',
            'cos',
            'cosh',
            'count',
            'createAttribute',
            'createComment',
            'createDocumentFragment',
            'createElement',
            'createEvent',
            'createTextNode',
            'decodeURI',
            'decodeURIComponent',
            'encodeURI',
            'encodeURIComponent',
            'endsWith',
            'entries',
            'error',
            'escape',
            'eval',
            'every',
            'exec',
            'execCommand',
            'exitFullscreen',
            'exp',
            'expm1',
            'fill',
            'filter',
            'find',
            'findIndex',
            'findLast',
            'findLastIndex',
            'flat',
            'flatMap',
            'floor',
            'focus',
            'forEach',
            'forward',
            'from',
            'fromCharCode',
            'fround',
            'fullscreenEnabled',
            'getDate',
            'getDay',
            'getAttribute',
            'getAttributeNode',
            'getBoundingClientRect',
            'getComputedStyle',
            'getCurrentPosition',
            'getElementById',
            'getElementsByClassName',
            'getElementsByName',
            'getElementsByTagName',
            'getFullYear',
            'getHours',
            'getItem',
            'getMilliseconds',
            'getMinutes',
            'getModifierState',
            'getMonth',
            'getNamedItem',
            'getSeconds',
            'getSelection',
            'getTargetRanges',
            'getTime',
            'getTimezoneOffset',
            'getUTCDate',
            'getUTCDay',
            'getUTCFullYear',
            'getUTCHours',
            'getUTCMilliseconds',
            'getUTCMinutes',
            'getUTCMonth',
            'getUTCSeconds',
            'getYear',
            'go',
            'group',
            'groupCollapsed',
            'groupEnd',
            'hasAttribute',
            'hasAttributes',
            'hasChildNodes',
            'hasFocus',
            'hypot',
            'importNode',
            'imul',
            'includes',
            'indexOf',
            'info',
            'insertAdjacentElement',
            'insertAdjacentHTML',
            'insertAdjacentText',
            'insertBefore',
            'isArray',
            'isDefaultNamespace',
            'isEqualNode',
            'isFinite',
            'isInteger',
            'isNaN',
            'isSafeInteger',
            'isSameNode',
            'isSupported',
            'isWellFormed',
            'item',
            'join',
            'key',
            'keys',
            'lastIndexOf',
            'localeCompare',
            'log',
            'log10',
            'log1p',
            'log2',
            'map',
            'match',
            'matches',
            'matchMedia',
            'max',
            'min',
            'moveBy',
            'moveTo',
            'namedItem',
            'normalize',
            'normalizeDocument',
            'now',
            'Number',
            'of',
            'open',
            'padEnd',
            'padStart',
            'parse',
            'parseFloat',
            'parseInt',
            'pop',
            'preventDefault',
            'print',
            'push',
            'querySelector',
            'querySelectorAll',
            'random',
            'reduce',
            'reduceRight',
            'reload',
            'remove',
            'removeAttribute',
            'removeAttributeNode',
            'removeChild',
            'removeEventListener',
            'removeItem',
            'repeat',
            'replace',
            'replaceAll',
            'replaceChild',
            'requestAnimationFrame',
            'requestFullscreen',
            'resizeBy',
            'resizeTo',
            'reverse',
            'round',
            'pow',
            'prompt',
            'removeEventListener',
            'removeNamedItem',
            'renameNode',
            'scroll',
            'scrollBy',
            'scrollIntoView',
            'scrollTo',
            'search',
            'setAttribute',
            'setAttributeNode',
            'setDate',
            'setFullYear',
            'setHours',
            'setInterval',
            'setItem',
            'setMilliseconds',
            'setMinutes',
            'setMonth',
            'setNamedItem',
            'setSeconds',
            'setTime',
            'setTimeout',
            'setUTCDate',
            'setUTCFullYear',
            'setUTCHours',
            'setUTCMilliseconds',
            'setUTCMinutes',
            'setUTCMonth',
            'setUTCSecond',
            'setYear',
            'shift',
            'sign',
            'sin',
            'sinh',
            'slice',
            'some',
            'sort',
            'splice',
            'split',
            'sqrt',
            'startsWith',
            'String',
            'stop',
            'stopImmediatePropagation',
            'stopPropagation',
            'stringify',
            'substr',
            'substring',
            'table',
            'tan',
            'tanh',
            'test',
            'time',
            'timeEnd',
            'trim',
            'trimStart',
            'trimEnd',
            'toDateString',
            'toGMTString',
            'toExponential',
            'toFixed',
            'toJSON',
            'toISOString',
            'toLocaleDateString',
            'toLocaleLowerCase',
            'toLocaleString',
            'toLocaleTimeString',
            'toLocaleUpperCase',
            'toLowerCase',
            'toPrecision',
            'toReversed',
            'toSorted',
            'toString',
            'toSpliced',
            'toTimeString',
            'toUpperCase',
            'toUTCString',
            'toWellFormed',
            'trace',
            'trim',
            'trunc',
            'unescape',
            'unshift',
            'UTC',
            'valueOf',
            'warn',
            'watchPosition',
            'with',
            'write',
            'writeln',

            'addEventListener',

            'ArcRotateCamera',
            'attachControl',
            'CreateGround',
            'CreateSphere',
            'HemisphericLight',
            'runRenderLoop',
            'StandardMaterial',

            'beginPath',
            'arc',
            'clearRect',
            'fillText',
            'getContext',
            'scale'], 
        events: ['onabort',
            'onafterprint',
            'onanimationend',
            'onanimationiteration',
            'onanimationstart',
            'onbeforeprint',
            'onbeforeunload',
            'onblur',
            'oncanplay',
            'oncanplaythrough',
            'onchange',
            'onclick',
            'oncontextmenu',
            'oncopy',
            'oncut',
            'ondblclick',
            'ondrag',
            'ondragend',
            'ondragenter',
            'ondragleave',
            'ondragover',
            'ondragstart',
            'ondrop',
            'ondurationchange',
            'onemptied',
            'onended',
            'onerror',
            'onfocus',
            'onfocusin',
            'onfocusout',
            'onfullscreenchange',
            'onfullscreenerror',
            'onhashchange',
            'oninput',
            'oninvalid',
            'onkeydown',
            'onkeypress',
            'onkeyup',
            'onLine',
            'onload',
            'onloadeddata',
            'onloadedmetadata',
            'onloadstart',
            'onmessage',
            'onmousedown',
            'onmouseenter',
            'onmouseleave',
            'onmousemove',
            'onmouseover',
            'onmouseout',
            'onmouseup',
            'onmousewheel',
            'onoffline',
            'ononline',
            'onopen',
            'onpagehide',
            'onpageshow',
            'onpaste',
            'onpause',
            'onplay',
            'onplaying',
            'onpopstate',
            'onprogress',
            'onratechange',
            'onresize',
            'onreset',
            'onscroll',
            'onsearch',
            'onseeked',
            'onseeking',
            'onselect',
            'onshow',
            'onstalled',
            'onstorage',
            'onsubmit',
            'onsuspend',
            'ontimeupdate',
            'ontoggle',
            'ontouchcancel',
            'ontouchend',
            'ontouchmove',
            'ontouchstart',
            'ontransitionend',
            'onunload',
            'onvolumechange',
            'onwaiting',
            'onwheel'],
        objects: ['Array',
            'console',
            'document',
            'window',
            'Date',
            'Error',
            'Math',
            'Number',
            'JSON',
            'Set',
            'String',

            'BABYLON'
        ],
        keywords: ["let", "const", "var", "function", "new", "class"],
        control: ["if", "else", "do", "while", "for", "forEach", "break", "continue", "return"],
        commentPattern: /(\/\/.*)/g 
    },
    py: {
        methods: [
            "print",
            "insert",
            "append",
            "pop",
            "len",
            "range",
            "clear",
            "copy",
            "count",
            "extend",
            "index",
            "remove",
            "reverse",
            "sort",
            'abs',
            'aiter',
            'all',
            'anext',
            'any',
            'ascii',
            'bin',
            'bool',
            'breakpoint',
            'bytearray',
            'bytes',
            'callable',
            'chr',
            'classmethod',
            'compile',
            'complex',
            'delattr',
            'dict',
            'dir',
            'divmod',
            'enumerate',
            'eval',
            'exec',
            'filter',
            'float',
            'format',
            'frozenset',
            'getattr',
            'globals',
            'hasattr',
            'hash',
            'help',
            'hex',
            'id',
            'input',
            'int',
            'isinstance',
            'issubclass',
            'iter',
            'len',
            'list',
            'locals',
            'map',
            'max',
            'memoryview',
            'min',
            'next',
            'object',
            'oct',
            'open',
            'ord',
            'pow',
            'print',
            'property',
            'range',
            'repr',
            'reversed',
            'round',
            'set',
            'setattr',
            'slice',
            'sorted',
            'staticmethod',
            'str',
            'sum',
            'super',
            'tuple',
            'type',
            'vars',
            'zip',
        ],               
        events: ["__init__", "__main__"], 
        objects: ["self", "cls"],
        keywords: ["def", "class", "import", "from", "global", "pass"],
        control: ["if", "elif", "else", "for", "while", "break", "continue", "return", "in"],
        commentPattern: /(#.*)/g 
    },
    lua: {
        methods: [
            "print",
            "error",
            "assert",
            "tostring",
            "tonumber",
            "type",
            "select",
            "unpack",
            "pairs",
            "ipairs",
            "next",
            "require",
            "pcall",
            "xpcall",
            "getmetatable",
            "setmetatable",
            "byte",
            "char",
            "find",
            "format",
            "gmatch",
            "gsub",
            "len",
            "lower",
            "match",
            "rep",
            "reverse",
            "sub",
            "upper",
            "split",
            "concat",
            "insert",
            "remove",
            "sort",
            "clear",
            "clone",
            "create",
            "freeze",
            "isfrozen",
            "abs",
            "acos",
            "asin",
            "atan",
            "atan2",
            "ceil",
            "cos",
            "cosh",
            "deg",
            "exp",
            "floor",
            "fmod",
            "frexp",
            "ldexp",
            "log",
            "log10",
            "max",
            "min",
            "modf",
            "pow",
            "rad",
            "random",
            "randomseed",
            "sin",
            "sinh",
            "sqrt",
            "tan",
            "tanh",
            "clamp",
            "noise",
            "round",
            "sign"
        ],
        events: [],
        objects: ["math", "table", "string", "coroutine"],
        keywords: ["function", "local", "end", "then", "do"],
        control: ["if", "elseif", "else", "for", "while", "repeat", "until", "break", "return", "in"],
        commentPattern: /(--.*)/g 
    }
};

// THE ESCAPE FUNCTION
function escapeHtml(code)
{
    return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// THE PROCESSING ENGINE (The Master Safe Box Architecture)
function processCodeString(rawCode, languageKey)
{
    let code = escapeHtml(rawCode);
    let rules = syntaxRules[languageKey] || syntaxRules['js'];

    // THE SAFE BOX
    let safeBox = [];

    // Helper function to lock text in the box and leave a placeholder
    function stash(htmlString)
    {
        safeBox.push(htmlString);
        return `__PH${safeBox.length - 1}__`;
    }

    // Stash Strings
    code = code.replace(/(["'`])(?:\\.|[^\\])*?\1/g, function(match)
    {
        return stash(`<span class="lightGray">${match}</span>`);
    });

    // Stash Comments
    code = code.replace(rules.commentPattern, function(match)
    {
        return stash(`<span class="green">${match}</span>`);
    });

    // Stash Dictionary Arrays
    if (rules.methods.length > 0)
    {
        let methodPattern = new RegExp(`\\b(${rules.methods.join('|')})\\b`, 'g');
        code = code.replace(methodPattern, match => stash(`<span class="yellow">${match}</span>`));
    }

    if (rules.events.length > 0)
    {
        let eventPattern = new RegExp(`\\b(${rules.events.join('|')})\\b`, 'g');
        code = code.replace(eventPattern, match => stash(`<span class="flowControl">${match}</span>`));
    }

    if (rules.objects.length > 0)
    {
        let objectPattern = new RegExp(`\\b(${rules.objects.join('|')})\\b`, 'g');
        code = code.replace(objectPattern, match => stash(`<span class="objects">${match}</span>`));
    }

    if (rules.keywords.length > 0)
    {
        let keywordPattern = new RegExp(`\\b(${rules.keywords.join('|')})\\b`, 'g');
        code = code.replace(keywordPattern, match => stash(`<span class="pink">${match}</span>`));
    }

    if (rules.control.length > 0)
    {
        let controlPattern = new RegExp(`\\b(${rules.control.join('|')})\\b`, 'g');
        code = code.replace(controlPattern, match => stash(`<span class="magenta">${match}</span>`));
    }

    // STASH CUSTOM METHODS (The Fix)

    code = code.replace(/(\w+)(?=\()/g, function(match)
    {
        // THE ESCAPE HATCH: If it is already a placeholder, leave it alone!
        if (match.startsWith('__PH')) { return match; }

        // Safety check: Ignore control words like if( or for(
        if (rules.control && rules.control.includes(match)) { return match; } 

        return stash(`<span class="yellow">${match}</span>`);
    });

    // Stash Numbers
    code = code.replace(/\b\d+\b/g, function(match)
    {
        return stash(`<span class="lightGray">${match}</span>`);
    });

    // UNPACK THE BOX
    // We swap the placeholders back to the raw HTML exactly in order
    for (let i = 0; i < safeBox.length; i++) {
        code = code.replace(`__PH${i}__`, safeBox[i]);
    }

    return code;
}


// THE PROCESSING ENGINE (The Master Safe Box Architecture)
function processCodeString2(rawCode, languageKey)
{
    let code = escapeHtml(rawCode);
    let rules = syntaxRules[languageKey] || syntaxRules['js'];

    // THE SAFE BOX
    let safeBox = [];

    // Helper function to lock text in the box and leave a placeholder
    function stash(htmlString)
    {
        safeBox.push(htmlString);
        return `__PH${safeBox.length - 1}__`;
    }

    // Stash Strings
    code = code.replace(/(["'`])(?:\\.|[^\\])*?\1/g, function(match)
    {
        return stash(`<span class="lightGray">${match}</span>`);
    });

    // Stash Comments
    code = code.replace(rules.commentPattern, function(match)
    {
        return stash(`<span class="green">${match}</span>`);
    });

    // Stash the Arrays (With safety checks for empty arrays!)
    if (rules.methods.length > 0)
    {
        let methodPattern = new RegExp(`\\b(${rules.methods.join('|')})\\b`, 'g');
        code = code.replace(methodPattern, match => stash(`<span class="yellow">${match}</span>`));
    }

    if (rules.events.length > 0)
    {
        let eventPattern = new RegExp(`\\b(${rules.events.join('|')})\\b`, 'g');
        code = code.replace(eventPattern, match => stash(`<span class="flowControl">${match}</span>`));
    }

    if (rules.objects.length > 0)
    {
        let objectPattern = new RegExp(`\\b(${rules.objects.join('|')})\\b`, 'g');
        code = code.replace(objectPattern, match => stash(`<span class="objects">${match}</span>`));
    }

    if (rules.keywords.length > 0)
    {
        let keywordPattern = new RegExp(`\\b(${rules.keywords.join('|')})\\b`, 'g');
        code = code.replace(keywordPattern, match => stash(`<span class="pink">${match}</span>`));
    }

    if (rules.control.length > 0)
    {
        let controlPattern = new RegExp(`\\b(${rules.control.join('|')})\\b`, 'g');
        code = code.replace(controlPattern, match => stash(`<span class="magenta">${match}</span>`));
    }


    if (rules.control.length > 0)
    {
        let controlPattern = new RegExp(`\\b(${rules.control.join('|')})\\b`, 'g');
        code = code.replace(controlPattern, match => stash(`<span class="magenta">${match}</span>`));
    }

    // STASH CUSTOM METHODS
    // This finds ANY word sitting right next to an open parenthesis "("
    code = code.replace(/(\w+)(?=\()/g, function(match)
    {
        // Safety check: Make sure we don't accidentally turn "if(" or "for(" yellow!
        if (rules.control && rules.control.includes(match)) { return match; } 
        
        return stash(`<span class="yellow">${match}</span>`);
    });

    // Stash Numbers
    code = code.replace(/\b\d+\b/g, function(match)
    {
        return stash(`<span class="lightGray">${match}</span>`);
    });

    // UNPACK THE BOX
    // We swap the placeholders back to the raw HTML exactly in order
    for (let i = 0; i < safeBox.length; i++) {
        code = code.replace(`__PH${i}__`, safeBox[i]);
    }

    return code;
}

// THE INITIATOR
function applyCustomHighlighting()
{
    // Fire the CSS injector first!
    injectHighlighterStyles();

    let codeBlocks = document.querySelectorAll('code.custom-code');

    for (let i = 0; i < codeBlocks.length; i++)
    {
        let block = codeBlocks[i];
        let rawText = block.textContent; 
        let lang = block.getAttribute('data-language');
        block.innerHTML = processCodeString(rawText, lang);
    }
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

