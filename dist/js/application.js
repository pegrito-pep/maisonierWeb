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
        "??": "&iexcl;",
        "??": "&cent;",
        "??": "&pound;",
        "??": "&curren;",
        "??": "&yen;",
        "??": "&brvbar;",
        "??": "&sect;",
        "??": "&uml;",
        "??": "&copy;",
        "??": "&ordf;",
        "??": "&laquo;",
        "??": "&raquo;",
        "??": "&reg;",
        "??": "&macr;",
        "??": "&deg;",
        "??": "&plusmn;",
        "??": "&sup2;",
        "??": "&sup3;",
        "??": "&acute;",
        "??": "&micro;",
        "??": "&para;",
        "??": "&middot;",
        "??": "&cedil;",
        "??": "&sup1;",
        "??": "&ordm;",
        "??": "&not;",
        "??": "&frac14;",
        "??": "&frac12;",
        "??": "&frac34;",
        "??": "&iquest;",
        "??": "&Agrave;",
        "??": "&Aacute;",
        "??": "&Acirc;",
        "??": "&Atilde;",
        "??": "&Auml;",
        "??": "&Aring;",
        "??": "&AElig;",
        "??": "&Ccedil;",
        "??": "&Egrave;",
        "??": "&Eacute;",
        "??": "&Ecirc;",
        "??": "&Euml;",
        "??": "&Igrave;",
        "??": "&Iacute;",
        "??": "&Icirc;",
        "??": "&Iuml;",
        "??": "&ETH;",
        "??": "&Ntilde;",
        "??": "&Ograve;",
        "??": "&Oacute;",
        "??": "&Ocirc;",
        "??": "&Otilde;",
        "??": "&Ouml;",
        "??": "&times;",
        "??": "&Oslash;",
        "??": "&Ugrave;",
        "??": "&Uacute;",
        "??": "&Ucirc;",
        "??": "&Uuml;",
        "??": "&Yacute;",
        "??": "&THORN;",
        "??": "&szlig;",
        "??": "&agrave;",
        "??": "&aacute;",
        "??": "&acirc;",
        "??": "&atilde;",
        "??": "&auml;",
        "??": "&aring;",
        "??": "&aelig;",
        "??": "&ccedil;",
        "??": "&egrave;",
        "??": "&eacute;",
        "??": "&ecirc;",
        "??": "&euml;",
        "??": "&igrave;",
        "??": "&iacute;",
        "??": "&icirc;",
        "??": "&iuml;",
        "??": "&eth;",
        "??": "&ntilde;",
        "??": "&ograve;",
        "??": "&oacute;",
        "??": "&ocirc;",
        "??": "&otilde;",
        "??": "&ouml;",
        "??": "&divide;",
        "??": "&oslash;",
        "??": "&ugrave;",
        "??": "&uacute;",
        "??": "&ucirc;",
        "??": "&uuml;",
        "??": "&yacute;",
        "??": "&thorn;",
        "??": "&yuml;",
        "??": "&OElig;",
        "??": "&oelig;",
        "??": "&Scaron;",
        "??": "&scaron;",
        "??": "&Yuml;",
        "??": "&fnof;",
        "??": "&circ;",
        "??": "&tilde;",
        "??": "&Alpha;",
        "??": "&Beta;",
        "??": "&Gamma;",
        "??": "&Delta;",
        "??": "&Epsilon;",
        "??": "&Zeta;",
        "??": "&Eta;",
        "??": "&Theta;",
        "??": "&Iota;",
        "??": "&Kappa;",
        "??": "&Lambda;",
        "??": "&Mu;",
        "??": "&Nu;",
        "??": "&Xi;",
        "??": "&Omicron;",
        "??": "&Pi;",
        "??": "&Rho;",
        "??": "&Sigma;",
        "??": "&Tau;",
        "??": "&Upsilon;",
        "??": "&Phi;",
        "??": "&Chi;",
        "??": "&Psi;",
        "??": "&Omega;",
        "??": "&alpha;",
        "??": "&beta;",
        "??": "&gamma;",
        "??": "&delta;",
        "??": "&epsilon;",
        "??": "&zeta;",
        "??": "&eta;",
        "??": "&theta;",
        "??": "&iota;",
        "??": "&kappa;",
        "??": "&lambda;",
        "??": "&mu;",
        "??": "&nu;",
        "??": "&xi;",
        "??": "&omicron;",
        "??": "&pi;",
        "??": "&rho;",
        "??": "&sigmaf;",
        "??": "&sigma;",
        "??": "&tau;",
        "??": "&upsilon;",
        "??": "&phi;",
        "??": "&chi;",
        "??": "&psi;",
        "??": "&omega;",
        "??": "&thetasym;",
        "??": "&Upsih;",
        "??": "&piv;",
        "???": "&ndash;",
        "???": "&mdash;",
        "???": "&lsquo;",
        "???": "&rsquo;",
        "???": "&sbquo;",
        "???": "&ldquo;",
        "???": "&rdquo;",
        "???": "&bdquo;",
        "???": "&dagger;",
        "???": "&Dagger;",
        "???": "&bull;",
        "???": "&hellip;",
        "???": "&permil;",
        "???": "&prime;",
        "???": "&Prime;",
        "???": "&lsaquo;",
        "???": "&rsaquo;",
        "???": "&oline;",
        "???": "&frasl;",
        "???": "&euro;",
        "???": "&image;",
        "???": "&weierp;",
        "???": "&real;",
        "???": "&trade;",
        "???": "&alefsym;",
        "???": "&larr;",
        "???": "&uarr;",
        "???": "&rarr;",
        "???": "&darr;",
        "???": "&harr;",
        "???": "&crarr;",
        "???": "&lArr;",
        "???": "&UArr;",
        "???": "&rArr;",
        "???": "&dArr;",
        "???": "&hArr;",
        "???": "&forall;",
        "???": "&part;",
        "???": "&exist;",
        "???": "&empty;",
        "???": "&nabla;",
        "???": "&isin;",
        "???": "&notin;",
        "???": "&ni;",
        "???": "&prod;",
        "???": "&sum;",
        "???": "&minus;",
        "???": "&lowast;",
        "???": "&radic;",
        "???": "&prop;",
        "???": "&infin;",
        "???": "&ang;",
        "???": "&and;",
        "???": "&or;",
        "???": "&cap;",
        "???": "&cup;",
        "???": "&int;",
        "???": "&there4;",
        "???": "&sim;",
        "???": "&cong;",
        "???": "&asymp;",
        "???": "&ne;",
        "???": "&equiv;",
        "???": "&le;",
        "???": "&ge;",
        "???": "&sub;",
        "???": "&sup;",
        "???": "&nsub;",
        "???": "&sube;",
        "???": "&supe;",
        "???": "&oplus;",
        "???": "&otimes;",
        "???": "&perp;",
        "???": "&sdot;",
        "???": "&lceil;",
        "???": "&rceil;",
        "???": "&lfloor;",
        "???": "&rfloor;",
        "???": "&lang;",
        "???": "&rang;",
        "???": "&loz;",
        "???": "&spades;",
        "???": "&clubs;",
        "???": "&hearts;",
        "???": "&diams;"
    }
}

/*------------------------------------------------------------
END HtmlEntities
------------------------------------------------------------*/