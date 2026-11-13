# Youth Entrepreneurship Network (YEN): website and member system

This project has two parts that work together:

- **`docs/`** is the website (pages, design, content). It works on its own as a static site, so you can preview it on GitHub Pages first.
- **`worker/`** is the member system that runs on Cloudflare: access keys, login, the application inbox, the admin page and the FinWise AI coach.

Everything you edit regularly is in `docs/data-*.js` (plain text, no coding needed).

```
index.html                 sends GitHub visitors to /docs
wrangler.jsonc             Cloudflare settings (keep the name "yenetwork")
package.json               lets Cloudflare install its tools
docs/                      THE WEBSITE
  index.html courses.html library.html opportunities.html projects.html
  blog.html apply.html portal.html mbti.html finwise.html admin.html privacy.html 404.html
  site.css site.js          design and shared behaviour
  data-config.js            your email + Web3Forms key
  data-courses.js           branches, programs and the 37 YEN courses
  data-library.js           free resources + the list of member guides
  data-opportunities.js     the opportunities directory
  data-projects.js          Built by YEN + GTA expansion (with sources)
  data-blog.js              blog posts
  data-mbti.js              personality test questions and scoring
  data-preview.js           GitHub-preview only (see below)
  finwise-app.html/.js      the FinWise app
worker/
  index.js store.js         the member system (do not need to edit)
  content.js                MEMBER-ONLY content: full course outlines + YEN guides
scripts/                    helper scripts (optional)
```

---

## Step 1: Preview on GitHub (see how it looks before Cloudflare)

1. Unzip the download on your computer.
2. On github.com, create a **new repository** (Public), for example `yen-site`.
3. Click **uploading an existing file**. Drag **everything inside the unzipped folder** into the page: the `docs` folder, the `worker` folder, the `scripts` folder and all loose files. Drag the *folders*, not the files inside them one by one, so the folder structure is kept. Click **Commit changes**.
4. **Settings > Pages > Build and deployment**: Source **Deploy from a branch**, branch **main**, folder **/docs**, then **Save**. (If you pick **/ (root)** instead, it also works because the root has a redirect.)
5. After a minute or two open `https://YOUR-USERNAME.github.io/yen-site/`.

In this preview there is no server, so:
- The **member portal runs in demo mode**. On the login page use the key **`YEN-DEMO-PREVIEW`**. Everything members would see (outlines, guides, schedule) is shown, stored only in your browser.
- The **Apply** form opens your email app (or sends through Web3Forms if you add the key in step 3).
- The **admin page** and the **FinWise AI coach** need the live Cloudflare site.

## Step 2: Go live on Cloudflare (yenetwork.org)

1. Cloudflare dashboard > **Workers & Pages > Create > Import a repository** (the Workers option, not Pages "Upload assets"). Pick your repo and the `main` branch.
2. The project name must be **`yenetwork`** (it must match `name` in `wrangler.jsonc`). Leave the build command empty. The deploy command is `npx wrangler deploy`. Save and Deploy.
3. Open the Worker > **Settings > Variables and Secrets** and add these as **Secret** type:
   - `ADMIN_SECRET`: a long password only admins know (this protects the admin page).
   - `SESSION_SECRET`: a long random string (30+ characters) used to sign logins.
   - `ANTHROPIC_API_KEY`: your Claude API key (only needed for the FinWise AI coach).
   Then redeploy (Deployments > Retry, or commit any small change).
4. **Domain:** Worker > **Settings > Domains & Routes > Add > Custom domain**: `yenetwork.org` and also `www.yenetwork.org`. Cloudflare creates the records and HTTPS for you.
5. Visit `https://yenetwork.org`. Check `https://yenetwork.org/api/health`: it should show `"members":true,"admin":true`.

## Step 3: Make form emails reach contact@yenetwork.org

- Go to **web3forms.com**, enter **contact@yenetwork.org**, and they email you an access key. Paste it into `docs/data-config.js` (`web3formsAccessKey`) and commit.
- Make sure contact@yenetwork.org can actually receive mail. In Cloudflare: **Email > Email Routing**, create the address and forward it to your own inbox.
- On the live site every application is also saved in the **Admin > Applications** inbox, so nothing is lost if an email fails.

## Using the member system

1. Open `https://yenetwork.org/admin.html` and sign in with your `ADMIN_SECRET`.
2. **Applications** tab: read applications, mark them Shortlisted / Accepted / Declined, export a CSV. Click **View > Create access key** for someone you accept.
3. **Access keys** tab: create a key (name, role, how long it lasts). **The key is shown once.** Copy it and email it to the member. We only store a scrambled version, so it cannot be shown again. Revoke a key any time and that person is logged out immediately.
4. The member goes to **Member login**, enters the key, and sees: full course outlines, YEN guides and templates, their study schedule (with calendar download) and the AI coach.

Security notes: keys, passwords and logins live only in Cloudflare (never in GitHub). Login attempts are rate limited. FinWise AI use is limited per member (8 messages a minute, 60 a day) to control your Anthropic costs.

## Editing content

Open the file on GitHub, click the pencil, edit, **Commit changes**. The live site updates in about a minute.

| To change | Edit |
|---|---|
| Email, Web3Forms key | `docs/data-config.js` |
| Courses, programs | `docs/data-courses.js` (public overview) and `worker/content.js` (member outline) |
| Free library resources | `docs/data-library.js` |
| Member guides and templates | `worker/content.js` (text) and `docs/data-library.js` (title list) |
| Opportunities | `docs/data-opportunities.js` |
| Projects and expansion stats | `docs/data-projects.js` |
| Blog posts | `docs/data-blog.js` (copy a block to the top) |
| FinWise AI model | `wrangler.jsonc` (`FINWISE_MODEL`) |

If you change `worker/content.js` and want the GitHub preview to match, run `npm run preview-data` (or ask Claude to regenerate `docs/data-preview.js`).

## Important notes

- **Public repo:** GitHub Pages' free plan needs a Public repo. Anyone can read files in a public repo, including `worker/content.js` (the member course outlines and guides). The login protects the live site, but the text is not secret on GitHub. That is fine for learning material. Never put passwords or private data in any file. After launch you can make the repo Private; Cloudflare can still deploy from it.
- **Opportunities are curated, not live.** There is no public feed that lists Ontario youth opportunities. Each entry links to the official page; please re-check them every few months. Dates and amounts change.
- **Library links** point to well-known official sites. Click through them occasionally in case a page moves.
- **Personality explorer:** built on the open OEJTS 1.2 test (CC BY-NC-SA 4.0), not the official MBTI. Keep it free and non-commercial and keep the attribution on the page.
- **Privacy notice** (`privacy.html`) is a plain-language draft. Please have a lawyer or your board review it, especially because some applicants are under 18.
- **GTA statistics** come from the sources listed on the Projects page. Update them when new reports are published.
- Course codes are YEN's own and are not affiliated with any university.

## Run it on your computer (optional)

```
npm install
cp .dev.vars.example .dev.vars     (then edit the two secrets inside)
npm run dev                        opens http://localhost:8787
```
