/**
 * 参考文献格式化：GB/T 7714-2015 / APA 7 / MLA 9 / Chicago note，以及 BibTeX。
 *
 * @module dsh-cite/format
 */
export function readStyle(raw) {
    if (raw === undefined || raw === null || raw === '')
        return 'gb-t-7714';
    if (raw === 'gb-t-7714' || raw === 'apa' || raw === 'mla' || raw === 'chicago')
        return raw;
    throw new Error('style 只支持 gb-t-7714 / apa / mla / chicago，收到：' + String(raw));
}
function fullName(author) {
    if (author.name !== '')
        return author.name;
    if (author.given !== '' && author.family !== '')
        return author.family + ' ' + author.given;
    return author.family !== '' ? author.family : author.given;
}
function initials(given) {
    return given
        .split(/[\s.-]+/)
        .filter((part) => part !== '')
        .map((part) => part[0].toUpperCase() + '.')
        .join(' ');
}
function apaName(author) {
    const family = author.family !== '' ? author.family : (author.name !== '' ? author.name : author.given);
    const initialsText = author.given !== '' ? initials(author.given) : '';
    return initialsText !== '' ? family + ', ' + initialsText : family;
}
function mlaName(author, first) {
    const name = fullName(author);
    const parts = name.trim().split(/\s+/);
    if (parts.length < 2)
        return name;
    if (first)
        return parts[0] + ', ' + parts.slice(1).join(' ');
    return parts.slice(1).join(' ') + ' ' + parts[0];
}
function gbtAuthors(authors) {
    if (authors.length === 0)
        return '佚名';
    const names = authors.map((author) => fullName(author));
    return names.length <= 3 ? names.join(', ') : names.slice(0, 3).join(', ') + ', 等';
}
function apaAuthors(authors) {
    if (authors.length === 0)
        return 'Anonymous';
    const names = authors.map(apaName);
    if (names.length === 1)
        return names[0];
    if (names.length === 2)
        return names[0] + ', & ' + names[1];
    if (names.length <= 20)
        return names.slice(0, -1).join(', ') + ', & ' + names[names.length - 1];
    return names.slice(0, 19).join(', ') + ', ... ' + names[names.length - 1];
}
function mlaAuthors(authors) {
    if (authors.length === 0)
        return 'Anonymous';
    if (authors.length === 1)
        return mlaName(authors[0], true);
    if (authors.length === 2)
        return mlaName(authors[0], true) + ', and ' + mlaName(authors[1], false);
    return mlaName(authors[0], true) + ', et al.';
}
function chicagoAuthors(authors) {
    if (authors.length === 0)
        return 'Anonymous';
    if (authors.length <= 3)
        return authors.map((author) => fullName(author)).join(', ');
    return fullName(authors[0]) + ', et al.';
}
function gbtTypeLabel(type, work) {
    switch (type) {
        case 'journal-article': return '[J]';
        case 'book':
        case 'monograph':
        case 'edited-book': return '[M]';
        case 'proceedings-article':
        case 'proceedings': return '[C]';
        case 'dissertation': return '[D]';
        case 'report': return '[R]';
        case 'standard': return '[S]';
        case 'patent': return '[P]';
        case 'posted-content':
        case 'dataset':
        case 'other': return work.url !== '' ? '[EB/OL]' : '[Z]';
        default: return work.url !== '' ? '[EB/OL]' : '[Z]';
    }
}
function yearText(work) {
    return work.year > 0 ? String(work.year) : 'n.d.';
}
function volumeIssuePages(work) {
    let text = work.volume;
    if (work.issue !== '')
        text += '(' + work.issue + ')';
    if (work.page !== '')
        text += (text !== '' ? ': ' : '') + work.page;
    return text;
}
function cleanupTitle(title) {
    return title.replace(/\s+/g, ' ').trim();
}
function titleOf(work) {
    return cleanupTitle(work.title !== '' ? work.title : '(无标题)');
}
/** 生成 GB/T 7714-2015 参考文献条目。 */
function buildGbt(work, lang) {
    const authors = gbtAuthors(work.authors);
    const title = titleOf(work);
    const label = gbtTypeLabel(work.type, work);
    if (work.type === 'journal-article' && work.containerTitle !== '') {
        let tail = work.containerTitle + ', ' + yearText(work);
        const vip = volumeIssuePages(work);
        if (vip !== '')
            tail += ', ' + vip;
        return authors + '. ' + title + label + '. ' + tail + '.';
    }
    if (work.type === 'book' || work.type === 'monograph' || work.type === 'edited-book') {
        let tail = work.publisher !== '' ? work.publisher + ', ' : '';
        tail += yearText(work);
        if (work.isbn !== '')
            tail += '. ISBN ' + work.isbn;
        return authors + '. ' + title + '[M]. ' + tail + '.';
    }
    if (work.containerTitle !== '' && work.type === 'proceedings-article') {
        return authors + '. ' + title + '[C]//' + work.containerTitle + '. ' + yearText(work) + '.';
    }
    const urlPart = work.url !== '' ? ' ' + work.url + '.' : '';
    const accessed = new Date().toISOString().slice(0, 10);
    return authors + '. ' + title + label + '. (' + yearText(work) + ')[' + (lang === 'zh' ? '引用日期 ' : 'cited ') + accessed + '].' + urlPart;
}
/** 生成 APA 7 参考文献条目。 */
function buildApa(work) {
    const authors = apaAuthors(work.authors);
    const title = titleOf(work);
    const year = yearText(work);
    if (work.type === 'journal-article' && work.containerTitle !== '') {
        let text = authors + ' (' + year + '). ' + title + '. ' + work.containerTitle;
        if (work.volume !== '')
            text += ', ' + work.volume;
        if (work.issue !== '')
            text += '(' + work.issue + ')';
        if (work.page !== '')
            text += ', ' + work.page;
        text += '. ';
        text += work.doi !== '' ? 'https://doi.org/' + work.doi : work.url;
        return text;
    }
    if (work.type === 'book' || work.type === 'monograph' || work.type === 'edited-book') {
        return authors + ' (' + year + '). ' + title + '. ' + (work.publisher !== '' ? work.publisher + '.' : '');
    }
    return authors + ' (' + year + '). ' + title + '. ' + (work.url !== '' ? work.url : '');
}
/** 生成 MLA 9 参考文献条目。 */
function buildMla(work) {
    const authors = mlaAuthors(work.authors);
    const title = titleOf(work);
    let text = authors + '. "' + title + '." ';
    if (work.containerTitle !== '')
        text += work.containerTitle + ', ';
    if (work.volume !== '')
        text += 'vol. ' + work.volume + ', ';
    if (work.issue !== '')
        text += 'no. ' + work.issue + ', ';
    text += yearText(work);
    if (work.page !== '')
        text += ', pp. ' + work.page;
    text += '.';
    if (work.doi !== '')
        text += ' https://doi.org/' + work.doi;
    return text;
}
/** 生成 Chicago（note 格式）引用。 */
function buildChicago(work) {
    const authors = chicagoAuthors(work.authors);
    const title = titleOf(work);
    let text = authors + ', "' + title + '"';
    if (work.containerTitle !== '')
        text += ', ' + work.containerTitle;
    if (work.volume !== '')
        text += ' ' + work.volume;
    if (work.issue !== '')
        text += ', no. ' + work.issue;
    text += ' (' + yearText(work) + ')';
    if (work.page !== '')
        text += ': ' + work.page;
    text += '.';
    if (work.doi !== '')
        text += ' https://doi.org/' + work.doi;
    return text;
}
/** 按样式生成引文。 */
export function buildCitation(work, style, lang = 'zh') {
    switch (style) {
        case 'gb-t-7714': return buildGbt(work, lang);
        case 'apa': return buildApa(work);
        case 'mla': return buildMla(work);
        case 'chicago': return buildChicago(work);
    }
}
function escapeLatex(value) {
    return value.replace(/[\\{}&%$#_~^]/g, (ch) => {
        switch (ch) {
            case '\\': return '\\textbackslash{}';
            case '{': return '\\{';
            case '}': return '\\}';
            case '&': return '\\&';
            case '%': return '\\%';
            case '$': return '\\$';
            case '#': return '\\#';
            case '_': return '\\_';
            case '~': return '\\textasciitilde{}';
            case '^': return '\\textasciicircum{}';
            default: return ch;
        }
    });
}
/** BibTeX 引用键只允许安全字符，空格/逗号/花括号等替换为下划线。 */
function sanitizeBibtexKey(value) {
    const cleaned = value.replace(/[^A-Za-z0-9_.:\/-]+/g, '_').replace(/^_+|_+$/g, '');
    return cleaned === '' ? 'work' : cleaned;
}
function bibtexType(work) {
    switch (work.type) {
        case 'journal-article': return 'article';
        case 'book':
        case 'monograph':
        case 'edited-book': return 'book';
        case 'proceedings-article':
        case 'proceedings': return 'inproceedings';
        case 'dissertation': return 'phdthesis';
        case 'report': return 'techreport';
        default: return 'misc';
    }
}
/** 生成 BibTeX 条目。 */
export function buildBibtex(work, key) {
    const first = work.authors[0];
    const firstWord = titleOf(work).split(/[^\p{L}\p{N}]+/u).find((part) => part !== '') ?? 'work';
    const baseKey = key !== undefined && key.trim() !== '' ? sanitizeBibtexKey(key.trim()) : ((first?.family ?? first?.name ?? 'author') + yearText(work) + firstWord).toLowerCase();
    const type = bibtexType(work);
    const fields = [];
    const authors = work.authors.map((author) => fullName(author)).join(' and ');
    if (authors !== '')
        fields.push('  author={' + escapeLatex(authors) + '}');
    fields.push('  title={' + escapeLatex(titleOf(work)) + '}');
    if (work.containerTitle !== '')
        fields.push(type === 'article' ? '  journal={' + escapeLatex(work.containerTitle) + '}' : '  booktitle={' + escapeLatex(work.containerTitle) + '}');
    if (work.year > 0)
        fields.push('  year={' + work.year + '}');
    if (work.volume !== '')
        fields.push('  volume={' + work.volume + '}');
    if (work.issue !== '')
        fields.push('  number={' + work.issue + '}');
    if (work.page !== '')
        fields.push('  pages={' + work.page + '}');
    if (work.publisher !== '')
        fields.push('  publisher={' + escapeLatex(work.publisher) + '}');
    if (work.doi !== '')
        fields.push('  doi={' + work.doi + '}');
    if (work.url !== '')
        fields.push('  url={' + escapeLatex(work.url) + '}');
    return '@' + type + '{' + baseKey + ',\n' + fields.join(',\n') + '\n}';
}
