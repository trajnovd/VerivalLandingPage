# VERIVAL Landing Page

Bilingual (SI/EN) landing page for **VERIVAL** and the **reValu8** AI-powered real estate valuation platform, built for the Slovenian market.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 7** (build tool & dev server)
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **React Three Fiber / Three.js** (3D background)
- **Lucide React** (icons)
- Custom i18n system (React Context, no external library)

## Project Structure

```
src/
├── App.tsx                    # Root component, wraps everything in LanguageProvider
├── main.tsx                   # Entry point
├── index.css                  # Tailwind imports & global styles
├── i18n/
│   ├── LanguageContext.tsx     # Language context provider (en/si toggle)
│   ├── en.ts                  # English translations
│   └── si.ts                  # Slovenian translations
├── components/
│   ├── Navbar.tsx             # Navigation + language switcher
│   ├── Hero.tsx               # Hero section with 3D background
│   ├── Features.tsx           # Product features (6 cards)
│   ├── About.tsx              # About / mission / values
│   ├── Team.tsx               # Team members (6 cards with photos)
│   ├── Testimonials.tsx       # "How It Works" (4 steps + 4 methodologies)
│   ├── Pricing.tsx            # "Early Access" pilot signup form
│   ├── CTA.tsx                # Call-to-action banner
│   ├── Footer.tsx             # Footer with columns + contact
│   └── ThreeBackground.tsx    # 3D animated background
public/
└── images/                    # Team member photos (JPEG)
```

## Prerequisites

- **Node.js** >= 18 (tested with v25.6)
- **npm** >= 9

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Type-check
npx tsc --noEmit

# Lint
npm run lint

# Production build (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```

---

## Migrating from GitHub to GitLab

The initial codebase was developed on GitHub (`https://github.com/trajnovd/VerivalLandingPage.git`). GitLab is now the **primary repository** — all ongoing development, CI/CD, and deployments happen here. The GitHub repo remains as a read-only archive.

### Step 1: Create the GitLab Project

1. Go to **GitLab** → **New Project** → **Import project** → **Repository by URL**
2. Enter: `https://github.com/trajnovd/VerivalLandingPage.git`
3. Set the project name (e.g. `verival-landing`) and visibility
4. Click **Create project** — GitLab imports the full repo with all history

### Step 2: Switch Your Local Clone to GitLab

```bash
# Navigate to your local clone
cd VerivalLandingPage

# Rename the GitHub remote (keep as archive reference)
git remote rename origin github

# Add GitLab as the new primary remote
git remote add origin https://gitlab.com/<your-group>/verival-landing.git

# Set GitLab as the default push/pull target
git push -u origin main

# Verify remotes
git remote -v
# origin   https://gitlab.com/<your-group>/verival-landing.git (fetch)
# origin   https://gitlab.com/<your-group>/verival-landing.git (push)
# github   https://github.com/trajnovd/VerivalLandingPage.git (fetch)
# github   https://github.com/trajnovd/VerivalLandingPage.git (push)
```

From now on, `git push` and `git pull` go to GitLab by default. The `github` remote is still there if you ever need to reference it.

### Step 3: Set Up CI/CD

Create `.gitlab-ci.yml` in the project root (see [GitLab CI/CD Pipeline](#gitlab-cicd-pipeline) below).

### Step 4: Configure Custom Domain & Deploy

See [Custom Domain Setup](#custom-domain-setup) and choose a deployment method.

---

## GitLab CI/CD Pipeline

Create a `.gitlab-ci.yml` in the project root:

```yaml
image: node:22-alpine

stages:
  - build
  - deploy

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week

# --- Choose ONE deployment method below ---

# METHOD 1: GitLab Pages (free hosting, custom domain supported)
pages:
  stage: deploy
  script:
    - mv dist public
  artifacts:
    paths:
      - public/
  only:
    - main

# METHOD 2: Deploy to VPS via SSH/rsync
# Uncomment this and comment out the 'pages' job above to use
# deploy:
#   stage: deploy
#   before_script:
#     - apk add --no-cache openssh-client rsync
#     - mkdir -p ~/.ssh
#     - echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_ed25519
#     - chmod 600 ~/.ssh/id_ed25519
#     - ssh-keyscan -H $DEPLOY_HOST >> ~/.ssh/known_hosts
#   script:
#     - rsync -avz --delete dist/ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
#     - ssh $DEPLOY_USER@$DEPLOY_HOST "systemctl reload nginx"
#   only:
#     - main
```

---

## Custom Domain Setup

The site will be served on a bought domain (e.g. `verival.si`). Setup depends on which deployment method you choose.

### Using GitLab Pages + Custom Domain

1. **Push the `.gitlab-ci.yml`** with the `pages` job enabled — wait for the first pipeline to pass
2. Go to **Settings → Pages** in your GitLab project
3. Click **New Domain** and enter your domain (e.g. `verival.si`)
4. GitLab will show you DNS records to add. Go to your domain registrar and create:

   | Type  | Name              | Value                                          |
   |-------|-------------------|-------------------------------------------------|
   | CNAME | `www`             | `<your-group>.gitlab.io`                        |
   | A     | `@` (root domain) | GitLab Pages IP (shown in the GitLab UI)        |
   | TXT   | `_gitlab-pages-verification-code` | Verification code shown by GitLab |

5. Check **Force HTTPS** in GitLab Pages settings — GitLab provisions a Let's Encrypt certificate automatically
6. DNS propagation can take up to 24–48 hours

> **Note:** If your domain is on the root (e.g. `verival.si` not `www.verival.si`), some registrars don't support CNAME on root. Use the A record instead, or check if your registrar supports ALIAS/ANAME records.

### Using a VPS + Custom Domain

1. **Enable the SSH deploy job** in `.gitlab-ci.yml` (uncomment Method 2, comment out Method 1)
2. **Add CI/CD variables** in GitLab → **Settings → CI/CD → Variables**:

   | Variable | Value | Protected | Masked |
   |----------|-------|-----------|--------|
   | `SSH_PRIVATE_KEY` | Your SSH private key contents | Yes | Yes |
   | `DEPLOY_HOST` | Server IP or hostname | Yes | No |
   | `DEPLOY_USER` | SSH user (e.g. `root`) | Yes | No |
   | `DEPLOY_PATH` | Remote path (e.g. `/var/www/verival.si/`) | Yes | No |

3. **Configure Nginx** on the VPS:

```nginx
server {
    listen 80;
    server_name verival.si www.verival.si;

    root /var/www/verival.si;
    index index.html;

    # SPA fallback — all routes serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache hashed assets aggressively
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Cache images
    location /images/ {
        expires 30d;
        add_header Cache-Control "public";
    }
}
```

4. **Enable HTTPS** with Certbot:

```bash
sudo apt install certbot python3-certbot-nginx   # Debian/Ubuntu
sudo certbot --nginx -d verival.si -d www.verival.si
```

5. **Point DNS** at your domain registrar:

   | Type | Name | Value |
   |------|------|-------|
   | A    | `@`  | Your VPS IP address |
   | A    | `www`| Your VPS IP address |

---

## Day-to-Day Workflow (for developers)

After migration, the standard workflow is:

```bash
# Pull latest from GitLab
git pull origin main

# Create a feature branch
git checkout -b feature/my-change

# Make changes, then push to GitLab
git push -u origin feature/my-change

# Create a Merge Request in GitLab UI
# After approval & merge → CI/CD auto-deploys to the live domain
```

---

## Environment Notes

- This is a **static SPA** — the build output (`dist/`) is plain HTML/JS/CSS with no server runtime needed
- The early access form currently uses a **mock submit** (setTimeout). Connect it to a real backend or form service (e.g. Supabase, Formspree) before going live
- Team photos are in `public/images/` and bundled as static assets
- No `.env` files or secrets are needed for the build
- The GitHub repo (`github` remote) is kept as a read-only archive — do not push updates there

## Useful Commands

```bash
npm run dev        # Start development server
npm run build      # Production build → dist/
npm run preview    # Serve dist/ locally
npm run lint       # Run ESLint
npx tsc --noEmit   # Type-check without emitting
```
