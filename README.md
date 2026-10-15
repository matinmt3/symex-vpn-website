# SYMEX VPN — Website Preview

نمونه‌کار لندینگ فارسی SYMEX VPN با شبیه‌ساز رابط اتصال و پیوند عمومی تلگرام.

این مخزن یک نمونه‌کار فرانت‌اند با HTML، CSS و JavaScript است. پیوند عمومی کسب‌وکار `https://t.me/symexvpn` از منبع حفظ شده است؛ هیچ کلید، کانفیگ VPN یا دادهٔ اتصال خصوصی همراه نیست. تا زمانی که منشأ سفارش مستقل تأیید نشده، این پروژه به‌عنوان نمونهٔ رابط و نه سابقهٔ مشتری معرفی می‌شود.

## امکانات

منوی واکنش‌گرا، کپی شناسهٔ عمومی، ماکاپ اتصال شبیه‌سازی‌شده، FAQ، پویانمایی و canvas تزئینی.

فونت‌ها و GSAP/ScrollTrigger به‌صورت محلی همراه پروژه‌اند؛ برای اجرای سایت CDN لازم نیست. تمام قیمت‌ها، آمار، بازخوردها و رفتارهای آزمایشی دادهٔ نمونه هستند. رزرو، پرداخت، عضویت خبرنامه و اتصال VPN واقعی از این صفحه انجام نمی‌شوند.

## اجرای محلی

Node.js 20 یا بالاتر، بدون نصب وابستگی:

```sh
npm start
```

نشانی: `http://127.0.0.1:8000`. روش جایگزین: `python -m http.server 8000 --bind 127.0.0.1`. سایت استاتیک است و روی GitHub Pages به build نیاز ندارد.

## تغییرات نسخهٔ قابل انتشار

- فایل‌های اصلی و دارایی‌های SVG حفظ شده‌اند.
- فونت‌های گوگل و انیمیشن‌ها با فایل‌های محلی دارای اعلان مجوز جایگزین شده‌اند.
- GSAP/ScrollTrigger همراه نسخهٔ 3.15.0 است؛ سرآیند حق نشر حفظ شده است.
- محدودهٔ نمایشی محصول در خود صفحه و README آشکار است.
- اطلاعات شخصی کاربران، کلید یا پایگاه دادهٔ واقعی وارد این مخزن نشده است.

برای تغییر محصولات یا متن‌ها، `script.js` و `index.html` را ویرایش کنید. سبک‌ها در `style.css` هستند. [منابع و مجوزها](docs/THIRD_PARTY.md) و [حقوق](LICENSE) همراه پروژه‌اند.

## English

A Persian RTL frontend portfolio demonstration. Business/client provenance is not independently verified; do not present this repository as a verified client commission. All sample metrics, prices and testimonials are illustrative. Forms do not submit to a backend, no payment is processed, and no VPN connection is established. Public business links intentionally supplied by the original source are retained. All runtime fonts and animation assets are bundled locally.
