# Recipe Downloader

Swiss cookbook magazine Betty Bossi has a special offer during the self-isolation
period: all of their 120 books are freely available on their website to browse.

The books can be read using an online ebook reader but they can not be downloaded.

Using these scripts, it's possible to first download every single page as an image
and then in a next step, put those together to PDF files.

## Installation

Just clone this repository and install the dependencies (make sure you have
[Node and npm](https://www.nodejs.org) installed):

```bash
git clone git@github.com:MaxGfeller/recipe-downloader.git
cd recipe-downloader
npm install
```

To start downloading the ebooks, you need the file `books.json`. This is a JSON file
containing all the links to the books and their titles.

In case the provided `books.json` is ever outdated, you can manually make a new one.
For that you'll have to login to the Betty Bossi site and go to the recipe overview.
Now you'll have to manually execute the code in `snippet.js` for every page and copy
the results into the `books.json` file.

The next step is to download the images. This can be done as follows:

Open `index.js` and on line 16, enter your own cookie from the Betty Bossi portal (
you need to make an account). You can get the cookie by typing `document.cookie` into
the browser devtools.

After you've done that, just execute the following:

```bash
mkdir books
node index.js
```

This will take some time and it will download a lot of data - it's 120 books after all.

When it's done, there should be a lot of subfolders in the `books` folder - one for
every book. In those subfolders, there should be a lot of images.

The next step now is to create PDF files from those images. That can be done with the
next script:

```bash
mkdir books-pdf
node pdf-transform.js
```

It should not take too long and in the end there should be around 120 PDF files in the
`books-pdf` folder.

## Disclaimer

This is just a little tool to download data that is already provided to you for free,
by Betty Bossi. Don't share the downloaded data with anyone and respect it, should they
cancel the offer.
