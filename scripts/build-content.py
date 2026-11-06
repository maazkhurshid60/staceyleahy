"""Builds content/generated.json and public/images from the staceyleahyhomes.com capture.

Run from the my-app folder:  python scripts/build-content.py
Source: ../../ (the capture: data/*.csv, pages/*.md, raw/*.html, media/)
"""
import csv
import json
import re
from datetime import datetime
from pathlib import Path

from PIL import Image

APP = Path(__file__).resolve().parent.parent
SRC = APP.parent.parent  # D:\seda preview\staceyleahy
MEDIA = SRC / "media"
PUBLIC = APP / "public"
OUT_JSON = APP / "content" / "generated.json"
SHARED = MEDIA / "images" / "_shared"


def read_csv(name):
    with open(SRC / "data" / name, encoding="utf-8-sig") as fh:
        return list(csv.DictReader(fh))


def export_image(src, dest, max_w=1920, quality=82):
    """Resize to at most max_w wide and save as a progressive JPEG; returns the public URL and size."""
    dest = PUBLIC / "images" / dest
    dest.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as original:
        original.draft("RGB", (max_w, max_w * 4))  # decode JPEGs at reduced size to save memory
        im = original.convert("RGB")
    if im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    im.save(dest, "JPEG", quality=quality, optimize=True, progressive=True)
    size = {"src": "/" + dest.relative_to(PUBLIC).as_posix(), "width": im.width, "height": im.height}
    im.close()
    return size


def first_sentences(text, limit=220):
    text = re.sub(r"\s+", " ", text or "").strip()
    out = ""
    for sentence in re.split(r"(?<=[.!?])\s+", text):
        if len(out) + len(sentence) > limit and out:
            break
        out = f"{out} {sentence}".strip()
    return out


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def tidy_markdown(md):
    """Undo the capture's spacing around links: '[x](url) .' -> '[x](url).'"""
    md = re.sub(r"\)\s+([.,;:!?])", r")\1", md)
    md = re.sub(r"[ \t]+\n", "\n", md)
    return md.replace("\u200b", "").strip()


def page_content(path):
    text = path.read_text(encoding="utf-8")
    return text.split("## Page content", 1)[1] if "## Page content" in text else text


manifest = list(csv.DictReader(open(MEDIA / "media-manifest.csv", encoding="utf-8-sig")))
by_url = {m["original_url"]: m for m in manifest}

# --- Hand-picked page imagery -------------------------------------------------
picks = {
    "hero": (SHARED / "background__udueeti9hjxxcjmfn0aa.jpg", "home/hero-palms.jpg", 2400),
    "stacey": (MEDIA / "images/home/stacey-leahy-stands-in-a-white-blouse-and-black-tr__694b5e0b-7bbe-47ab-8110-ad78ed3cff16.jpg", "home/stacey-full.jpg", 1400),
    "neighborhoodCard": (SHARED / "background__vjmjok3mfhoo9fqvgkdq.jpg", "home/card-neighborhood.jpg", 1200),
    "askCard": (MEDIA / "images/concierge/dining-room-with-floor-to-ceiling-windows-a-statem__6581b15c-e69c-4d70-b57d-5f98b4c21c0e.jpg", "home/card-stacey-asks.jpg", 1200),
    "sell": (MEDIA / "images/concierge/cd8108e3-0ba1-4d71-8ab3-1ba0a2740266.jpg", "home/sell.jpg", 1600),
    "buy": (MEDIA / "images/home-valuation/modern-single-story-home-with-wood-and-stone-sidin__f967de39-f039-488e-ab2f-af5b64ce0bd1.jpg", "home/buy.jpg", 1600),
    "contact": (MEDIA / "images/concierge/light-wood-living-room-built-ins-with-warm-shelf-l__48df3a71-d75c-4e7e-ac96-387f2c800eeb.jpg", "home/contact.jpg", 1600),
    "filmPoster": (MEDIA / "video/v1_stacey-leahy-poster.jpg", "home/film-poster.jpg", 1920),
    "interiorKitchen": (MEDIA / "images/private-exclusives/open-plan-kitchen-and-living-room-with-a-white-isl__n5ytrtuuphlpce36xw0n.jpg", "pages/kitchen.jpg", 1600),
    "interiorLiving": (MEDIA / "images/private-exclusives/bright-living-room-with-a-white-sectional-sofa-bri__cca5566a-838b-4248-a9f0-109881f592ca.jpg", "pages/living.jpg", 1600),
    "interiorFireplace": (MEDIA / "images/concierge/b842eb33-bf2d-457a-82d4-2247fc763e66.jpg", "pages/fireplace.jpg", 1600),
    "interiorShelves": (MEDIA / "images/concierge/light-wood-living-room-built-ins-with-warm-shelf-l__48df3a71-d75c-4e7e-ac96-387f2c800eeb.jpg", "pages/shelves.jpg", 1600),
    "valuation": (MEDIA / "images/home-valuation/866f9c62-713a-4c0d-a44c-f04c30379cae.jpg", "pages/valuation.jpg", 1600),
    "aboutWide": (MEDIA / "images/about/e9594590-793c-4a79-83e3-292a37e22baa.jpg", "pages/about-wide.jpg", 2000),
    "neighborhoodsWide": (MEDIA / "images/neighborhoods/2b35f580-ea76-4e29-b15b-7e1e7c12015a.jpg", "pages/neighborhoods-wide.jpg", 2000),
    "contactWide": (MEDIA / "images/contact/bfd3a355-43a2-4eb8-80d4-fe297d2a0f1d.jpg", "pages/contact-wide.jpg", 2000),
    "auth": (SHARED / "background__3430c874-4d92-45db-9e58-3c168d5a3c2e.png", "pages/auth.jpg", 1600),
    "testimonialsWide": (MEDIA / "images/testimonials/897ece50-9f72-4369-8bed-350e7b316c07.jpg", "pages/testimonials-wide.jpg", 2000),
}
images = {key: export_image(src, dest, w) for key, (src, dest, w) in picks.items()}

# Portrait crop of Stacey: she fills the middle third of the full shot
full = Image.open(PUBLIC / "images" / "home" / "stacey-full.jpg")
fw, fh = full.size
card = full.crop((round(fw * 0.22), round(fh * 0.12), round(fw * 0.88), round(fh * 0.71)))
card.save(PUBLIC / "images" / "home" / "stacey-card.jpg", "JPEG", quality=86, optimize=True, progressive=True)
images["staceyCard"] = {"src": "/images/home/stacey-card.jpg", "width": card.width, "height": card.height}

video_dest = PUBLIC / "video" / "los-angeles-film.mp4"
video_dest.parent.mkdir(parents=True, exist_ok=True)
if not video_dest.exists():
    video_dest.write_bytes((MEDIA / "video" / "v1_stacey-leahy.mp4").read_bytes())

# --- Closings: every property page on the old site ------------------------------------
AREAS = {  # where the URL doesn't say, taken from each listing's own description
    "4822-van-noord-ave-apt-12": "Sherman Oaks",
    "79-baynard-cove-rd": "Hilton Head Island, SC",
    "14242-burbank-blvd-209": "Sherman Oaks",
    "543-n-plymouth-blvd": "Los Angeles",
    "3425-w-olive-ave": "Burbank",
    "323-n-lima-st": "Burbank",
    "7819-woodlake-ave": "West Hills",
    "634-s-citrus-avenue-los-angeles-ca-us-90036-bb25112409": "Hancock Park",
    "7135-hollywood-boulevard-407-los-angeles-ca-us-90046-sr23168917": "Hollywood",
    "7135-hollywood-boulevard-407-los-angeles-ca-us-90046-sr25046203": "Hollywood",
}
FEATURED = [  # shown on the home page, in this order
    "634-s-citrus-avenue-los-angeles-ca-us-90036-bb25112409",
    "302-n-lima-street-burbank-ca-us-91505-sr24104193",
    "12765-elkwood-street-north-hollywood-ca-us-91605-sr24070610",
    "4630-woodley-avenue-301-encino-ca-us-91436-25540709",
    "22253-del-valle-street-woodland-hills-ca-us-91364-pw22181397",
    "25772-calle-court-valencia-ca-us-91355-226001141",
]
FACTS = [  # label shown, CSV column
    ("Type", "Area & Lot: Type"),
    ("Style", "Area & Lot: Architecture Styles"),
    ("Year built", "Area & Lot: Year Built"),
    ("Living space", "Area & Lot: LIVING SPACE"),
    ("Lot size", "Area & Lot: LOT SIZE"),
    ("Bedrooms", "Interior: Total Bedrooms"),
    ("Full baths", "Interior: Full Bathrooms"),
    ("Stories", "Exterior: Stories"),
    ("Parking", "Exterior: Parking"),
    ("Pool", "Exterior: POOL"),
    ("View", "Area & Lot: View Description"),
    ("Fireplace", "Interior: Fireplace"),
    ("Flooring", "Interior: Flooring"),
    ("Cooling", "Exterior: Air Conditioning"),
    ("School district", "Area & Lot: School District"),
    ("HOA fees", "Financial: HOA Fees"),
    ("Lease term", "Financial: Lease Term"),
    ("MLS® ID", "Area & Lot: MLS� ID"),
]


CITIES = ["north-hollywood", "woodland-hills", "valley-glen", "sherman-oaks", "studio-city", "toluca-lake",
          "burbank", "encino", "northridge", "valencia", "west-hills"]


def area_for(slug, p):
    if slug in AREAS:
        return AREAS[slug]
    city = next((c for c in CITIES if f"-{c}-ca-us-" in slug), None)
    return city.replace("-", " ").title() if city else (p["Area & Lot: Neighborhood"] or "Los Angeles")


def gallery_for(slug, name):
    """Photos in the order the old listing page showed them."""
    page = (SRC / "raw" / f"properties__{slug}.html").read_text(encoding="utf-8", errors="ignore")
    files = []
    for url in re.findall(r"https://dlajgvw9htjpb\.cloudfront\.net/cms/[^\"'\s)]+?\.(?:jpe?g|png|webp)", page):
        f = by_url.get(url)
        if f and f["file"] not in files and "/properties/" in f["file"]:
            files.append(f["file"])
    if not files:
        files = [m["file"] for m in manifest if f"properties__{slug}" in m["pages"] and name in m["alt_text"]]
    return [MEDIA / f for f in files]


closings = []
for p in read_csv("properties.csv"):
    slug = p["url"].rstrip("/").rsplit("/", 1)[-1]
    photos = gallery_for(slug, p["name"])
    if not photos:
        continue
    status = p["Area & Lot: Status"].strip()
    leased = status == "Leased"
    date = (p.get("Area & Lot: Date Leased") if leased else p.get("Area & Lot: Date Sold")) or p.get("Area & Lot: Date Sold") or ""
    gallery = [export_image(f, f"closings/{slug[:60]}/{i:02d}.jpg", 1280, 80) for i, f in enumerate(photos[:12])]
    closings.append({
        "slug": slug,
        "name": p["name"].strip(),
        "area": area_for(slug, p),
        "status": status,
        "price": ((p.get("Financial: SALES PRICE") if not leased else p.get("Financial: Lease Price")) or p["price"]).strip(),
        "listPrice": p["price"].strip(),
        "closed": date.strip(),
        "year": (re.search(r"\d{4}", date or "") or [""])[0],
        "beds": p["Interior: Total Bedrooms"].strip(),
        "sqft": p["Area & Lot: LIVING SPACE"].replace("Sq.Ft.", "").strip(),
        "summary": first_sentences(p["description"]),
        "description": re.sub(r"\s+", " ", p["description"] or "").strip(),
        "facts": [{"label": label, "value": p[col].strip()} for label, col in FACTS if (p.get(col) or "").strip()],
        "featured": slug in FEATURED,
        "image": gallery[0],
        "gallery": gallery,
    })
order = {s: i for i, s in enumerate(FEATURED)}
closings.sort(key=lambda c: (order.get(c["slug"], 99), c["closed"] == "", -(int(c["year"]) if c["year"] else 0)))

# --- Neighborhoods ------------------------------------------------------------------------
NEIGHBORHOODS = [  # stats name, page slug, image
    ("Studio City", "studio-city", "background__vjmjok3mfhoo9fqvgkdq.jpg"),
    ("Burbank", "burbank", "background__ryntjxsf4t3jczgj10ns.jpg"),
    ("Toluca Lake", "toluca-lake", "background__pv2biku1a1zmmuasfr8h.jpg"),
    ("Westside", "westside", "background__udueeti9hjxxcjmfn0aa.jpg"),
    ("Los Angeles", "los-angeles", "background__kdx8paih5m7yjr6llfya.jpg"),
    ("Santa Clarita / Valencia", "santa-clarita-valencia", "background__98acff9b-270a-4c86-9cd0-ea9eeef6e789.jpg"),
]
stats = {r["name"]: r for r in read_csv("neighborhood-stats.csv")}
pois = read_csv("points-of-interest.csv")
cards = read_csv("listing-cards.csv")


def num(v, kind=float):
    try:
        return kind(float(str(v).replace(",", "").replace("%", "")))
    except ValueError:
        return None


neighborhoods = []
for name, slug, img in NEIGHBORHOODS:
    s = stats[name]
    page = (SRC / "pages" / "neighborhoods" / f"{slug}.md").read_text(encoding="utf-8")
    tagline = re.search(r"\*\*Meta description:\*\* (.+)", page)
    title = re.search(r"\*\*Page title:\*\* (.+)", page)
    # The old site lists Los Angeles (the whole city) at Walk Score 6, which is clearly an error; leave the scores out
    scores_ok = name != "Los Angeles"
    neighborhoods.append({
        "name": name,
        "slug": slug,
        "title": title.group(1).strip() if title else name,
        "tagline": tagline.group(1).strip() if tagline else "",
        "population": num(s["total_population"], int),
        "medianAge": num(s["median_age_years"]),
        "density": num(s["population_density_per_sq_mi"], int),
        "avgIncome": num(s["average_individual_income_usd"], int),
        "households": num(s["total_households"], int),
        "householdSize": num(s["average_household_size"]),
        "withChildren": num(s["households_with_children"], int),
        "withoutChildren": num(s["households_without_children"], int),
        "ages": [{"label": k.replace("age_", "").replace("_pct", ""), "value": num(s[k])} for k in s if k.startswith("age_")],
        "education": [{"label": k.replace("education_", ""), "value": num(s[k])} for k in s if k.startswith("education_")],
        "commute": [{"label": k.replace("commute_", "").replace("_pct", ""), "value": num(s[k])} for k in s if k.startswith("commute_")],
        "whiteCollar": num(s["white_collar_pct"]),
        "walkScore": num(s["walking_score"], int) if scores_ok else None,
        "walkRating": s["walking_score_rating"] if scores_ok else "",
        "bikeScore": num(s["bike_score"], int) if scores_ok else None,
        "bikeRating": s["bike_score_rating"] if scores_ok else "",
        "transitScore": num(s["transit_score"], int) if scores_ok else None,
        "transitRating": s["transit_score_rating"] if scores_ok else "",
        "places": [
            {"name": p["name"], "category": p["category"], "miles": num(p["distance_miles"]), "rating": num(p["rating_out_of_5"]), "reviews": num(p["reviews"], int)}
            for p in pois if p["neighborhood"] == name
        ],
        "listings": [
            {"name": c["name"], "price": c["price"], "address": c["address"], "status": c["status"], "beds": c["beds"], "baths": c["baths"], "sqft": c["sqft"]}
            for c in cards if c["found_on"].rstrip("/").endswith(f"/neighborhoods/{slug}")
        ][:9],
        "image": export_image(SHARED / img, f"neighborhoods/{slug}.jpg", 1600),
    })

# --- Stacey Asks: every article ---------------------------------------------------------------
posts = []
for r in read_csv("blog-posts.csv"):
    slug = r["url"].rstrip("/").rsplit("/", 1)[-1]
    md_path = SRC / "pages" / "blog" / f"{slug}.md"
    raw = md_path.read_text(encoding="utf-8")
    body = page_content(md_path)
    # Drop the repeated title, date line and share prompt at the top of the article
    body = re.sub(r"^\s*## .+?\n", "", body, count=1)
    body = re.sub(r"^\s*[A-Z][a-z]+ \d{1,2}, \d{4}\s*\n", "", body, count=1)
    body = re.sub(r"^\s*Share This On:\s*\n", "", body, count=1)
    sources = re.findall(r"^\s+- \[(.+?)\]\((https?://[^)]+)\)", raw.split("## Page content")[0], re.M)
    cover = next((m for m in manifest if f"blog__{slug}" in m["pages"].split("; ") and m["file"].startswith("images/blog/")), None)
    cover = cover or next((m for m in manifest if f"blog__{slug}" in m["pages"] and "background__" in m["file"]), None)
    words = len(re.findall(r"\w+", body))
    posts.append({
        "slug": slug,
        "title": r["title"].strip(),
        "date": r["date"].strip(),
        "iso": datetime.strptime(r["date"].strip(), "%B %d, %Y").date().isoformat(),
        "description": r["description"].strip(),
        "minutes": max(1, round(words / 230)),
        "body": tidy_markdown(body),
        "sources": [{"label": a, "href": b} for a, b in sources],
        "image": export_image(MEDIA / cover["file"], f"blog/{slug[:60]}.jpg", 1600) if cover else None,
    })
posts.sort(key=lambda p: p["iso"], reverse=True)

# --- Homes on the market (listing cards on the old site; MLS photos aren't licensed for reuse) ---
seen = set()
listings = []
for c in cards:
    if c["status"] not in ("For Sale", "Pending", "Active Under Contract") or not c["address"]:
        continue
    key = c["address"].lower()
    if key in seen:
        continue
    seen.add(key)
    city = c["address"].split(",")[-2].strip() if c["address"].count(",") >= 2 else ""
    listings.append({
        "name": c["name"] or c["address"].split(",")[0], "price": c["price"], "address": c["address"], "city": city, "status": c["status"],
        "beds": c["beds"], "baths": c["baths"], "sqft": c["sqft"],
    })
# Kept in the old site's order: her own featured listings first, then the areas she covers

testimonials = [{"quote": t["text"].strip(), "author": t["author"].strip()} for t in read_csv("testimonials.csv")]

# --- Terms & privacy: the old page is plain lines; short unpunctuated lines are its headings ---
terms_lines = []
for line in page_content(SRC / "pages" / "main" / "terms-and-conditions.md").splitlines():
    line = line.strip()
    if not line or line in ("## Privacy Policy", "#### PRIVACY POLICY AND TERMS OF USE"):
        continue
    if line.startswith("#"):
        line = "### " + line.lstrip("# ").strip()
    elif len(line) < 70 and not re.search(r"[.:;,]$", line) and line[0].isupper() and not line.startswith("Last Updated"):
        line = "### " + line
    terms_lines.append(line)
terms = tidy_markdown("\n\n".join(terms_lines))

OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
OUT_JSON.write_text(json.dumps({
    "images": images,
    "closings": closings,
    "neighborhoods": neighborhoods,
    "posts": posts,
    "listings": listings,
    "testimonials": testimonials,
    "terms": terms,
}, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"closings={len(closings)} gallery photos={sum(len(c['gallery']) for c in closings)} "
      f"neighborhoods={len(neighborhoods)} posts={len(posts)} listings={len(listings)} testimonials={len(testimonials)}")
