# Tale
Tale is a minimal Jekyll theme curated for storytellers. Checkout the demo [here](https://chesterhow.github.io/tale/).

![Tale screenshot](http://i.imgur.com/pXZrtmo.png)

## Features
- Easy installation
- Compatible with GitHub Pages
- Responsive design (looks just as good on mobile)
- Syntax highlighting, with the help of Pygments
- Markdown and HTML text formatting
- Pagination of posts

## Installation
### As a Jekyll theme
1. Add this line to your `Gemfile`:

```ruby
gem "tale"
```

2. In `_config.yml` replace the `minima` theme with `tale`:

```yaml
theme: tale
```

3. Install the theme's gems and dependencies:

```bash
$ bundle
```

4. Rename `index.md` to `index.html`. Without this, the `jekyll-paginate` gem will not work.

5. Add these 2 lines in to `_config.yml`:

```yaml
permalink:      /:year-:month-:day/:title
paginate:       5
```

### As a Fork
1. Fork this repository

2. Delete the unnecessary files/folders: `CODE_OF_CONDUCT.md`, `LICENSE`, `README.md`, `tale.gemspec`

3. Delete the `baseurl` line in `_config.yml`:

```yaml
baseurl:        "/tale"   # delete this line
```

## Usage
Once you've installed the theme, you're ready to work on your Jekyll site. To start off, I would recommend updating `_config.yml` with your site's details.

To build and serve your site, run:

```bash
$ bundle exec jekyll serve
```

And you're all set! Head over to http://127.0.0.1:4000/ to see your site in action.

## Contributing
Found a bug or have a suggestion? Feel free to create an issue or make a pull request!

## License
See [LICENSE](https://github.com/chesterhow/tale/blob/master/LICENSE)
