# Youth Entrepreneurship Network (YEN) website

A simple website with no build step. It is plain HTML, CSS and JavaScript, so GitHub can host it for free.

## Files

```
index.html              the whole page
404.html                shown when someone visits a link that doesn't exist
favicon.svg             the small icon in the browser tab
.nojekyll               tells GitHub to publish the files as they are (keep it)
css/styles.css          colors, fonts, layout
js/main.js              buttons, tabs, filters, form
js/config.js            YOUR SETTINGS: contact email + form link  <-- edit this
data/opportunities.js   the Opportunities board                    <-- edit often
data/projects.js        the "Built by YEN" projects                <-- edit often
```

## 1. Put it on GitHub

1. Sign in at github.com and click **New repository**. Name it anything (for example `yen-website`), keep it **Public**, then **Create repository**.
2. Click **uploading an existing file**, drag in everything from this folder (including the `css`, `js` and `data` folders and the `.nojekyll` file), and click **Commit changes**.
3. Go to **Settings > Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose branch **main** and folder **/ (root)**, then **Save**.
4. After a minute or two your site is live at `https://YOUR-USERNAME.github.io/yen-website/`.

## 2. Connect your Cloudflare domain

Use either a root domain (`yourdomain.com`) or a subdomain (`www.yourdomain.com`). Setting up both is best.

1. In GitHub, go to **Settings > Pages > Custom domain**, type your domain (for example `yourdomain.com`) and **Save**. GitHub adds a `CNAME` file to your repository for you.
2. In Cloudflare, open your domain and go to **DNS > Records**. Add:
   - Four **A** records for name `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`
   - One **CNAME** record for name `www` pointing to `YOUR-USERNAME.github.io`
3. Set each of these records' proxy status to **DNS only** (grey cloud) at first. This lets GitHub verify the domain and create your HTTPS certificate.
4. Back in GitHub **Settings > Pages**, wait for the green "DNS check successful" message, then tick **Enforce HTTPS**.
5. Optional: once HTTPS works, you can switch the Cloudflare records to **Proxied** (orange cloud). If you do, set **SSL/TLS > Overview** to **Full**.

DNS changes can take anywhere from a few minutes to a few hours.

## 3. Personalise it

- **Contact email and sign-up form:** open `js/config.js`. Put your real email in `email`. To receive sign-ups as emails, create a free form at formspree.io and paste its URL into `formEndpoint`. Until you do, the Send button opens the visitor's email app.
- **Opportunities and projects:** open `data/opportunities.js` and `data/projects.js`. Each has instructions at the top. Entries marked `example: true` show an "Example" tag, so delete that line once an entry is real. In GitHub you can edit a file by opening it and clicking the pencil icon, then **Commit changes**. The site updates in about a minute.
- **Wording, colors and fonts:** wording lives in `index.html`. Colors are the values at the top of `css/styles.css`.

## Before launch checklist

- Replace the example opportunities and projects with real ones (or delete them).
- Set your real email in `js/config.js`.
- If you collect information from people under 18, check what consent you need from parents or guardians and say how you use their details.
- If you add real testimonials or photos, get permission first.

## Test it on your computer

Double-click `index.html`. Everything works locally, no server needed.
