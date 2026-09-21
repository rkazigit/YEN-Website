# Youth Entrepreneurship Network (YEN) website

Five files, all in ONE flat folder (no sub-folders):

```
index.html    the whole website (design, animations and page in one file)
data.js       YOUR SETTINGS + opportunities + projects   <-- the file you'll edit
404.html      page shown for broken links
favicon.svg   the tiny icon in the browser tab
README.md     this guide (optional to upload)
```

IMPORTANT: `index.html` and `data.js` must sit next to each other at the top level of your GitHub repository. If the page ever looks like plain unstyled text, `index.html` is missing or was uploaded inside a folder.

## 1. Put it on GitHub

1. On github.com click **New repository**, name it (for example `yen-website`), keep it **Public**, click **Create repository**.
2. Click **uploading an existing file**. Unzip the download first, then drag ALL the files in (not the zip itself). Click **Commit changes**.
3. Go to **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. In a minute or two the site is live at `https://YOUR-USERNAME.github.io/yen-website/`.

## 2. Connect your Cloudflare domain

1. In GitHub, **Settings > Pages > Custom domain**: type your domain (for example `yourdomain.com`) and **Save**.
2. In Cloudflare, open your domain > **DNS > Records** and add:
   - Four **A** records, name `@`, pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One **CNAME** record, name `www`, pointing to `YOUR-USERNAME.github.io`
3. Set the proxy status of these records to **DNS only** (grey cloud) at first, so GitHub can verify the domain and issue HTTPS.
4. When GitHub shows "DNS check successful", tick **Enforce HTTPS**.
5. Optional: after HTTPS works you can switch the records to **Proxied** (orange cloud) and set Cloudflare **SSL/TLS** to **Full**.

DNS can take a few minutes to a few hours.

## 3. Edit your content

Open `data.js` (on GitHub: click the file, then the pencil icon, then **Commit changes**). The site updates in about a minute. It has three parts:

1. **Settings:** your real email, and an optional Formspree link so sign-ups arrive in your inbox.
2. **Opportunities board:** copy a block, change the words. Listings vanish automatically after their deadline.
3. **Projects:** the "Built by YEN" showcase.

The entries in there are EXAMPLES. Replace them with real ones and delete the `example: true` line.

## Before launch

- Set your real email in `data.js`.
- Replace the example opportunities and projects.
- If you collect details from anyone under 18, check what parent or guardian consent you need.
- Get permission before using anyone's photo, name or quote.

## Test on your computer

Keep all the files in one folder and double-click `index.html`.
