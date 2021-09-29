App = {}

App.error = function(erreur, titre) {
    $.alert({
        title: (!titre || typeof titre == 'undefined') ? 'Erreur !' : titre,
        content: erreur,
        type: 'red'
    });
};


/**
 * Display an success message
 * @param {String} message 
 * @param {Object} options 
 */
App.alertSuccess = function(message, options) {
    let parametres = $.extend({
        title: 'Success',
        callback: function() {}
    }, options);

    $.confirm({
        icon: 'fa fa-check',
        theme: 'modern',
        closeIcon: false,
        animation: 'scale',
        type: 'green',
        title: parametres.title,
        content: message,
        buttons: {
            formSubmit: { text: 'Ok', btnClass: 'btn-info', action: function() { parametres.callback(); } },
        }
    });
};
/**
 * Display an fail message
 * @param {String} message 
 * @param {Object} options 
 */
App.alertError = function(message, options) {
    let parametres = $.extend({
        title: 'Error',
        callback: function() {}
    }, options);

    $.confirm({
        icon: 'fa fa-times',
        theme: 'modern',
        closeIcon: false,
        animation: 'scale',
        type: 'red',
        title: parametres.title,
        content: message,
        buttons: {
            formSubmit: { text: 'Ok', btnClass: 'btn-info', action: function() { parametres.callback(); } },
        }
    });
};
/**
 * Display an fail message
 * @param {String} message 
 * @param {Object} options 
 */
App.alertInfo = function(message, options) {
    let parametres = $.extend({
        title: 'Error',
        callback: function() {}
    }, options);

    $.confirm({
        icon: 'fa fa-exclamation-circle',
        theme: 'modern',
        closeIcon: false,
        animation: 'scale',
        type: 'blue',
        title: parametres.title,
        content: message,
        buttons: {
            formSubmit: { text: 'Ok', btnClass: 'btn-info', action: function() { parametres.callback(); } },
        }
    });
};


/**
 * Display an confirmation dialog
 * @param {String} message 
 * @param {Object} options 
 */
App.confirm = function(message, options) {
        if (typeof options.buttons == 'undefined') {
            options.buttons = {}
        }
        let parametres = $.extend({
            title: 'Confirmation',
            confirm: function() {},
            cancel: function() {},
        }, options);
        parametres.buttons = $.extend(parametres.buttons, {
            cancel: { text: 'Non', btnClass: 'btn-danger', action: function() { parametres.cancel() } },
            confirm: { text: 'Oui', btnClass: 'btn-success', action: function() { parametres.confirm() } },
        })
        $.confirm({
            title: parametres.title,
            content: message,
            buttons: parametres.buttons
        });
    }
    /**
     * Affiche une boite de saisie
     * 
     * @param {String} message 
     * @param {Object} options 
     */
App.prompt = function(message, options) {
        let parametres = $.extend({
            title: 'Prompt !',
            submit: function() {},
            cancel: function() {},
        }, options)

        $.confirm({
            title: parametres.title,
            content: '<form action="" class="formName">' + message + '</form>',
            buttons: {
                cancel: { text: 'Annuler', action: function() { return parametres.cancel() } },
                submit: { text: 'Valider', btnClass: 'btn-blue', action: function() { return parametres.submit() } },
            },
            onContentReady: function() {
                var jc = this;
                this.$content.find('form').on('submit', function(e) {
                    e.preventDefault();
                    jc.$$formSubmit.trigger('click');
                });
            }
        });
    }
    /**
     * Show an information message
     * @param {String} message 
     * @param {String} titre 
     */
App.info = function(message, titre) {
    $.alert({
        title: (!titre || typeof titre == 'undefined') ? 'Informations !' : titre,
        content: message,
        type: 'blue'
    });
};
/**
 * Return a ramdom number between min and max value
 * 
 * @param {Integer} min 
 * @param {Integer} max
 * @return Integer 
 */
App.random = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * Ask a question
     * @param {String} question 
     * @param {Object} options 
     */
App.question = function(question, options) {
    let parametres = $.extend({
        title: 'Question !',
        buttons: {
            yes: { text: 'Oui', btnClass: 'btn-blue', action: function() {} },
            no: { text: 'Non', btnClass: 'btn-red', action: function() {} }
        },
    }, options)

    $.confirm({
        title: parametres.title,
        content: question,
        buttons: parametres.buttons,
        closeIcon: true,
    });
}

App.notifySuccess = function(message) {
    App.notif(message, {
        type: 'success',
        bgcolor: '#5bd747'
    })
}
App.notifyError = function(message) {
    App.notif(message, {
        type: 'error'
    })
}
App.notif = function(message, config) {
    notif($.extend({
        type: "info",
        msg: message,
        time: 15000
    }, config))
}

/**
 * @param {String} date
 * 
 * @return {String}
 */
App.parseDate = function(date) {
        date = new Date(date)
        let elt = [date.getFullYear(), (date.getMonth() + 1), date.getDate()]

        if (elt[1] < 10) {
            elt[1] = '0' + elt[1]
        }
        if (elt[2] < 10) {
            elt[2] = '0' + elt[2]
        }

        return elt.join('-')
    }
    /**
     * 
     * @param {String} start 
     * @param {String} end
     * 
     * @return {Object} 
     */
App.parseDateRange = function(start, end) {
    return {
        dateDebut: App.parseDate(start) + ' 00:00:00',
        dateFin: App.parseDate(end) + ' 23:59:59'
    }
}

/*
 * Impression
 * */
App.print = function(page) {
    if (page && typeof page != 'undefined') {
        var oPrntWin = window.open(page, '_blank', "width:1200;height:1200;left=300,top=100,menubar=no,toolbar=no,location=no,scrollbars=yes");
        oPrntWin.onload = function() {
            setTimeout(() => {
                oPrntWin.print();
            }, 500);
        };
        oPrntWin.onafterprint = function() {
            oPrntWin.close()
        }
    }
};



/*------------------------------------------------------------
BEGIN HtmlEntities
------------------------------------------------------------*/

App.htmlEntities = {
    decode: function(string) {
        var entityMap = this.map;
        for (var key in entityMap) {
            var entity = entityMap[key];
            var regex = new RegExp(entity, 'g');
            string = string.replace(regex, key);
        }
        string = string.replace(/&quot;/g, '"');
        string = string.replace(/&amp;/g, '&');
        return string;
    },

    encode: function(string) {
        var entityMap = this.map;
        string = string.replace(/&/g, '&amp;');
        string = string.replace(/"/g, '&quot;');
        for (var key in entityMap) {
            var entity = entityMap[key];
            var regex = new RegExp(key, 'g');
            string = string.replace(regex, entity);
        }
        return string;
    },

    map: {
        // "'": "&apos;", " ": "&nbsp;",
        "<": "&lt;",
        ">": "&gt;",
        "¡": "&iexcl;",
        "¢": "&cent;",
        "£": "&pound;",
        "¤": "&curren;",
        "¥": "&yen;",
        "¦": "&brvbar;",
        "§": "&sect;",
        "¨": "&uml;",
        "©": "&copy;",
        "ª": "&ordf;",
        "«": "&laquo;",
        "»": "&raquo;",
        "®": "&reg;",
        "¯": "&macr;",
        "°": "&deg;",
        "±": "&plusmn;",
        "²": "&sup2;",
        "³": "&sup3;",
        "´": "&acute;",
        "µ": "&micro;",
        "¶": "&para;",
        "·": "&middot;",
        "¸": "&cedil;",
        "¹": "&sup1;",
        "º": "&ordm;",
        "¬": "&not;",
        "¼": "&frac14;",
        "½": "&frac12;",
        "¾": "&frac34;",
        "¿": "&iquest;",
        "À": "&Agrave;",
        "Á": "&Aacute;",
        "Â": "&Acirc;",
        "Ã": "&Atilde;",
        "Ä": "&Auml;",
        "Å": "&Aring;",
        "Æ": "&AElig;",
        "Ç": "&Ccedil;",
        "È": "&Egrave;",
        "É": "&Eacute;",
        "Ê": "&Ecirc;",
        "Ë": "&Euml;",
        "Ì": "&Igrave;",
        "Í": "&Iacute;",
        "Î": "&Icirc;",
        "Ï": "&Iuml;",
        "Ð": "&ETH;",
        "Ñ": "&Ntilde;",
        "Ò": "&Ograve;",
        "Ó": "&Oacute;",
        "Ô": "&Ocirc;",
        "Õ": "&Otilde;",
        "Ö": "&Ouml;",
        "×": "&times;",
        "Ø": "&Oslash;",
        "Ù": "&Ugrave;",
        "Ú": "&Uacute;",
        "Û": "&Ucirc;",
        "Ü": "&Uuml;",
        "Ý": "&Yacute;",
        "Þ": "&THORN;",
        "ß": "&szlig;",
        "à": "&agrave;",
        "á": "&aacute;",
        "â": "&acirc;",
        "ã": "&atilde;",
        "ä": "&auml;",
        "å": "&aring;",
        "æ": "&aelig;",
        "ç": "&ccedil;",
        "è": "&egrave;",
        "é": "&eacute;",
        "ê": "&ecirc;",
        "ë": "&euml;",
        "ì": "&igrave;",
        "í": "&iacute;",
        "î": "&icirc;",
        "ï": "&iuml;",
        "ð": "&eth;",
        "ñ": "&ntilde;",
        "ò": "&ograve;",
        "ó": "&oacute;",
        "ô": "&ocirc;",
        "õ": "&otilde;",
        "ö": "&ouml;",
        "÷": "&divide;",
        "ø": "&oslash;",
        "ù": "&ugrave;",
        "ú": "&uacute;",
        "û": "&ucirc;",
        "ü": "&uuml;",
        "ý": "&yacute;",
        "þ": "&thorn;",
        "ÿ": "&yuml;",
        "Œ": "&OElig;",
        "œ": "&oelig;",
        "Š": "&Scaron;",
        "š": "&scaron;",
        "Ÿ": "&Yuml;",
        "ƒ": "&fnof;",
        "ˆ": "&circ;",
        "˜": "&tilde;",
        "Α": "&Alpha;",
        "Β": "&Beta;",
        "Γ": "&Gamma;",
        "Δ": "&Delta;",
        "Ε": "&Epsilon;",
        "Ζ": "&Zeta;",
        "Η": "&Eta;",
        "Θ": "&Theta;",
        "Ι": "&Iota;",
        "Κ": "&Kappa;",
        "Λ": "&Lambda;",
        "Μ": "&Mu;",
        "Ν": "&Nu;",
        "Ξ": "&Xi;",
        "Ο": "&Omicron;",
        "Π": "&Pi;",
        "Ρ": "&Rho;",
        "Σ": "&Sigma;",
        "Τ": "&Tau;",
        "Υ": "&Upsilon;",
        "Φ": "&Phi;",
        "Χ": "&Chi;",
        "Ψ": "&Psi;",
        "Ω": "&Omega;",
        "α": "&alpha;",
        "β": "&beta;",
        "γ": "&gamma;",
        "δ": "&delta;",
        "ε": "&epsilon;",
        "ζ": "&zeta;",
        "η": "&eta;",
        "θ": "&theta;",
        "ι": "&iota;",
        "κ": "&kappa;",
        "λ": "&lambda;",
        "μ": "&mu;",
        "ν": "&nu;",
        "ξ": "&xi;",
        "ο": "&omicron;",
        "π": "&pi;",
        "ρ": "&rho;",
        "ς": "&sigmaf;",
        "σ": "&sigma;",
        "τ": "&tau;",
        "υ": "&upsilon;",
        "φ": "&phi;",
        "χ": "&chi;",
        "ψ": "&psi;",
        "ω": "&omega;",
        "ϑ": "&thetasym;",
        "ϒ": "&Upsih;",
        "ϖ": "&piv;",
        "–": "&ndash;",
        "—": "&mdash;",
        "‘": "&lsquo;",
        "’": "&rsquo;",
        "‚": "&sbquo;",
        "“": "&ldquo;",
        "”": "&rdquo;",
        "„": "&bdquo;",
        "†": "&dagger;",
        "‡": "&Dagger;",
        "•": "&bull;",
        "…": "&hellip;",
        "‰": "&permil;",
        "′": "&prime;",
        "″": "&Prime;",
        "‹": "&lsaquo;",
        "›": "&rsaquo;",
        "‾": "&oline;",
        "⁄": "&frasl;",
        "€": "&euro;",
        "ℑ": "&image;",
        "℘": "&weierp;",
        "ℜ": "&real;",
        "™": "&trade;",
        "ℵ": "&alefsym;",
        "←": "&larr;",
        "↑": "&uarr;",
        "→": "&rarr;",
        "↓": "&darr;",
        "↔": "&harr;",
        "↵": "&crarr;",
        "⇐": "&lArr;",
        "⇑": "&UArr;",
        "⇒": "&rArr;",
        "⇓": "&dArr;",
        "⇔": "&hArr;",
        "∀": "&forall;",
        "∂": "&part;",
        "∃": "&exist;",
        "∅": "&empty;",
        "∇": "&nabla;",
        "∈": "&isin;",
        "∉": "&notin;",
        "∋": "&ni;",
        "∏": "&prod;",
        "∑": "&sum;",
        "−": "&minus;",
        "∗": "&lowast;",
        "√": "&radic;",
        "∝": "&prop;",
        "∞": "&infin;",
        "∠": "&ang;",
        "∧": "&and;",
        "∨": "&or;",
        "∩": "&cap;",
        "∪": "&cup;",
        "∫": "&int;",
        "∴": "&there4;",
        "∼": "&sim;",
        "≅": "&cong;",
        "≈": "&asymp;",
        "≠": "&ne;",
        "≡": "&equiv;",
        "≤": "&le;",
        "≥": "&ge;",
        "⊂": "&sub;",
        "⊃": "&sup;",
        "⊄": "&nsub;",
        "⊆": "&sube;",
        "⊇": "&supe;",
        "⊕": "&oplus;",
        "⊗": "&otimes;",
        "⊥": "&perp;",
        "⋅": "&sdot;",
        "⌈": "&lceil;",
        "⌉": "&rceil;",
        "⌊": "&lfloor;",
        "⌋": "&rfloor;",
        "⟨": "&lang;",
        "⟩": "&rang;",
        "◊": "&loz;",
        "♠": "&spades;",
        "♣": "&clubs;",
        "♥": "&hearts;",
        "♦": "&diams;"
    }
}

/*------------------------------------------------------------
END HtmlEntities
------------------------------------------------------------*/