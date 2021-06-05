/***   Regex Markdown Parser by chalarangelo   ***/
// Replaces 'regex' with 'replacement' in 'str'
// Curry function, usage: replaceRegex(regexVar, replacementVar) (strVar)
const replaceRegex = function(regex, replacement){
	return function(str){
		return str.replace(regex, replacement);
	}
}
// Regular expressions for text formatting (a bit strict, but they work)
// Main:
const inlineCodeRegex = /(`)(.*?)\1/g;
const inlineCodeTripleRegex = /(```)(.*?)\1/g;
const boldRegex = /(\*)(.*?)\1/g;
const italicsRegex = /(_)(.*?)\1/g;
const strikethroughRegex = /(-)(.*?)\1/g;
const strikethroughTildeRegex = /(~)(.*?)\1/g;
// Extras:
const imageRegex = /!\[([^\[]+)\]\(([^\)]+)\)/g;
const linkRegex = /\[([^\[]+)\]\(([^\)]+)\)/g;
const headingRegex = /\n(#+\s*)(.*)/g;
const horizontalRuleRegex = /\n((\-{3,})|(={3,}))/g;
const unorderedListRegex = /(\n\s*(\-|\+)\s.*)+/g;
const orderedListRegex = /(\n\s*([0-9]+\.)\s.*)+/g;
const newlineRegex = /([ \n]{2,})/g;
const paragraphRegex = /\n+(?!<pre>)(?!<h)(?!<ul>)(?!<blockquote)(?!<hr)(?!\t)([^\n]+)\n/g;

// Main replacer functions
const inlineCodeReplacer = function(fullMatch, tagStart, tagContents){
	return '<code>' + tagContents + '</code>';
}
const boldReplacer = function(fullMatch, tagStart, tagContents){
	return '<strong>'+ tagContents + '</strong>';
}
const italicsReplacer = function(fullMatch, tagStart, tagContents){
	return '<em>'+ tagContents + '</em>';
}
const strikethroughReplacer = function(fullMatch, tagStart, tagContents){
	return '<del>' + tagContents + '</del>';
}

// Extras
const imageReplacer = function(fullMatch, tagTitle, tagURL){
	return '<img src="' + tagURL + '" alt="' + tagTitle + '" />';
}
const linkReplacer = function(fullMatch, tagTitle, tagURL){
	return '<a href="' + tagURL + '">' + tagTitle + '</a>';
}
const headingReplacer = function(fullMatch, tagStart, tagContents){
	return '\n<h' + tagStart.trim().length + '>' + tagContents + '</h' + tagStart.trim().length + '>';
}
const horizontalRuleReplacer = function(fullMatch){
	return '\n<hr />';
}
const newlineReplacer = function(fullMatch){
	return '<br />';
}
const unorderedListReplacer = function(fullMatch){
	let items = '';
	fullMatch.trim().split('\n').forEach( item => { items += '<li>' + item.substring(2) + '</li>'; } );
	return '\n<ul>' + items + '</ul>';
}
const orderedListReplacer = function(fullMatch){
	let items = '';
	fullMatch.trim().split('\n').forEach( item => { items += '<li>' + item.substring(item.indexOf('.')+2) + '</li>'; } );
	return '\n<ol>' + items + '</ol>';
}
const paragraphReplacer = function(fullMatch, tagContents){
	return '<p>' + tagContents + '</p>';
}

// Rules for Markdown parsing (use in order of appearance for best results)
const replaceInlineCodes = replaceRegex(inlineCodeRegex, inlineCodeReplacer);
const replaceInlineCodes3x = replaceRegex(inlineCodeTripleRegex, inlineCodeReplacer);
const replaceBold = replaceRegex(boldRegex, boldReplacer);
const replaceItalics = replaceRegex(italicsRegex, italicsReplacer);
const replaceceStrikethrough = replaceRegex(strikethroughRegex, strikethroughReplacer);
const replaceceStrikethroughTilde = replaceRegex(strikethroughTildeRegex, strikethroughReplacer);

const replaceImages = replaceRegex(imageRegex, imageReplacer);
const replaceLinks = replaceRegex(linkRegex, linkReplacer);
const replaceHeadings = replaceRegex(headingRegex, headingReplacer);
const replaceHorizontalRules = replaceRegex(horizontalRuleRegex, horizontalRuleReplacer);
const replaceNewline = replaceRegex(newlineRegex, newlineReplacer);
const replaceUnorderedLists = replaceRegex(unorderedListRegex, unorderedListReplacer);
const replaceOrderedLists = replaceRegex(orderedListRegex, orderedListReplacer);
const replaceParagraphs = replaceRegex(paragraphRegex, paragraphReplacer);

const replaceWhatsappMsg = function(str) {
  return replaceInlineCodes3x(
  				replaceceStrikethroughTilde(
  					replaceItalics(
  						replaceBold(str))));
}
// Parser for Whatsapp message
// Usage: parseWhatsappMessage(strVar)
const parseWhatsappMessage = function(str) {
	return replaceWhatsappMsg('\n' + str + '\n').trim();
}

const replaceYoutubeMsg = function(str) {
  return replaceItalics(
  				replaceBold(
  					replaceceStrikethrough(str)));
}
// Parser for Youtube comment
// Usage: parseYoutubeMessage(strVar)
const parseYoutubeMessage = function(str) {
	return replaceYoutubeMsg('\n' + str + '\n').trim();
}

const replaceSlackMsg = function(str) {
  return replaceInlineCodes(
				  replaceInlineCodes3x(
					  replaceceStrikethroughTilde(
	  					replaceItalics(
	  						replaceBold(str)))));
}
// Parser for Slack message
// Usage: parseSlackMessage(strVar)
const parseSlackMessage = function(str) {
	return replaceSlackMsg('\n' + str + '\n').trim();
}

const replaceTenorCardsMsg = function(str) {
  return replaceNewline(
	  			replaceHeadings(
					  replaceInlineCodes(
						  replaceceStrikethrough(
		  					replaceItalics(
		  						replaceBold(
		  							replaceLinks(
	  									replaceImages(str))))))));
}
// Parser for Tenor.cards message
// Usage: parseTenorCardsMessage(strVar)
const parseTenorCardsMessage = function(str) {
	return replaceTenorCardsMsg('\n' + str + '\n').trim();
}
