import cheerio from 'cheerio';

export const extractTextFromHTML = (html) => {
  const $ = (html?.length > 0) ? cheerio.load(html) : cheerio.load("<p></p>");
  const text = $.root().text() || '';
  const cleanedText = text.replace(/\n/g, '');
  return cleanedText.trim();
};
