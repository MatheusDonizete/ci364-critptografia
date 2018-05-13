const { decrypt } = require('./playfair');
const selectedWords = require('./selected-words.js').words.filter(e => !e.match(/\\/) && e.length > 2 && e.length < 7).map(e => e.replace(/j/ig, ''));
const allWords = require('./words.js').words.filter(e => ['a', 'e', 'o'].indexOf(e) > -1 || e.length > 1).map(w => w.toUpperCase()).filter(e => !e.match(/[\\|\.|\-]/)).map(e => e.replace(/j/ig, ''));

const mostCommon = ['da', 'de', 'do', 'ao', 'ai', 'rr', 'ss', 'sc', 'xc', 'xs', 'gu', 'qu', 'um', 'un', 'om', 'on', 'lh', 'nh', 'ch', 'am', 'an', 'ch', 'em', 'en', 'im', 'in',
    // "coisa",
    // "casa",
    // "tempo",
    // "ano",
    // "dia",
    // "vez",
    // "homem",
    // "senhor",
    // "senhora",
    // "moco",
    // "moca.",
    // "bom",
    // "grande",
    // "melhor",
    // "pior",
    // "certo",
    // "oltimo",
    // "proprio.",
    // "ser",
    // "ir",
    // "estar",
    // "ter",
    // "haver",
    // "fazer",
    // "dar",
    // "ficar",
    // "poder",
    // "ver.",
    // "não",
    // "mais",
    // "muito",
    // "ja",
    // "quando",
    // "mesmo",
    // "depois",
    // "ainda.",
    // "um",
    // "dois",
    // "primeiro",
    // "cem",
    // "mil",
    // "a",
    // "o",
    // "um",
    // "uma.",
    // "de",
    // "em",
    // "para",
    // "por",
    // "com",
    // "ate",
    // "e",
    // "mas",
    // "ou",
    // "tambem",
    // "se",
    // "assim",
    // "como",
    // "porque",
    // "que",
    // "eu",
    // "você",
    // "ele",
    // "este",
    // "esse",
    // "isso",
    // "sua"
].map(e => e.toLocaleUpperCase());

console.log('Started at: ', new Date());
function breaker(text) {
    let brokenText = [''];
    let score = [0];
    let key = [''];

    const checkValidity = (text) => {
        let scr = 0;
        mostCommon.forEach(e => {
            if (!!text.match(e)) {
                scr++;
            }
        });

        return scr;
    }
    console.log('Procurando...');
    selectedWords.forEach(e => {
        const txt = decrypt(e, text);
        const scr = checkValidity(txt);
        if (e === 'teste') {
            console.log(txt, scr)
        }

        if (scr > score[0]) {
            score = [scr];
            brokenText = [txt];
            key = [e];
        }

        if (score[0] === scr) {
            score.push(scr);
            brokenText.push(txt);
            key.push(e);
        }
    });

    return { text: brokenText, key, score };
}


console.log(JSON.stringify(breaker('EREGQCRCTRORTDTMRBAOABGEHRAPYG')));

console.log('finished at:', new Date()); 