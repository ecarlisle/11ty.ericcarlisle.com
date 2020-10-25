const eleventyNavigationPlugin = require("@11ty/eleventy-navigation")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const format = require('date-fns/format')
const MarkdownIt = require('markdown-it')
const htmlmin = require('html-minifier')

module.exports = function(eleventyConfig) {

  // excerpt
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->"
  });

  // plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(syntaxHighlight)

  // filters
  eleventyConfig.addNunjucksFilter('dateFormat', value => {
    const date = Date.parse(value)
    return format(date, 'MMMM d, yyyy')
  })

  const mdRender = new MarkdownIt()
  eleventyConfig.addFilter('renderUsingMarkdown', (rawString) => {
    return mdRender.render(rawString)
  })

  // passthroughs
  eleventyConfig.addPassthroughCopy('img/**/*.*');
  eleventyConfig.addPassthroughCopy('css/**/*.*');

  // transforms
  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })
      return minified;
    }
    return content;
  })
  
  return {
    dir: {
      // folders
      input: '.',
      data: '_data',
      includes: '_includes',
      layouts: '_layouts',
      output: 'dist',

      // template configs
      dataTemplateEngine: 'njk',
      htmlTemplateEngine: 'njk',
      markdownTemplateEngine: 'njk',
      templateFormats: ['html', 'njk']
    }
  }
}