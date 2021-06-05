# parsemsg.js

A regular expression formatted message parser, written in functional Javascript.

## Usage

Include the javascript file in your page, then simply call `parse<appname>Message`:
```javascript
    var parsedWA = parseWhatsappMessage(yourText);
    var parsedYT = parseYoutubeMessage(yourText);
    var parsedSlack = parseSlackMessage(yourText);
    var parsedTC = parseTenorCardsMessage(yourText);
```

The parser will parse the contents of `yourText` as HTML.  

## Recognized Syntax

### Whatsapp, Youtube, Slack, Tenor.cards

- **bold** is marked with asterisks:
```
*bold*
```

- _italics_ is marked with underscores:
```
_italics_
```

- For Whatsapp and slack, ~Strikethrough~ is done using tilde characters:
```
~strikethrough~
```
For Youtube and tenor.cards, same is done using hyphen:
```
-strikethrough-
```

- For Whatsapp, monospaced text is added through ` ``` ` symbol.
- Slack, and tenor.cards support inline text using the ``` ` ``` symbol.

### Tenor.cards exclusive

- **Headers** are available using the `#` syntax:
```
# Heading 1
## Heading 2
### Heading 3
```

- **Links** are only available using the `[title](link_url)` syntax and **images** are only available using the `![title](image_url)` syntax:
```
[link_title](https://github.com/Chalarangelo/parse-md-js)
![image_tite](https://github.com/Chalarangelo/parse-md-js/image.png)
```

- **Line breaks** are supported using two or more space or newline characters.

## License

The source code is licensed under the MIT license.
