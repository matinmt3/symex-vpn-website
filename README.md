# SYMEX VPN — Website Preview

نمونه‌کار لندینگ فارسی SYMEX VPN با شبیه‌ساز رابط اتصال و پیوند عمومی تلگرام.

این مخزن یک نمونه‌کار فرانت‌اند با HTML، CSS و JavaScript است. پیوند عمومی کسب‌وکار `https://t.me/symexvpn` از منبع حفظ شده است؛ هیچ کلید، کانفیگ VPN یا دادهٔ اتصال خصوصی همراه نیست. تا زمانی که منشأ سفارش مستقل تأیید نشده، این پروژه به‌عنوان نمونهٔ رابط و نه سابقهٔ مشتری معرفی می‌شود.

## امکانات

منوی واکنش‌گرا، کپی شناسهٔ عمومی، ماکاپ اتصال شبیه‌سازی‌شده، FAQ، پویانمایی و canvas تزئینی.

فونت‌ها و GSAP/ScrollTrigger به‌صورت محلی همراه پروژه‌اند؛ برای اجرای سایت CDN لازم نیست. آمار و وضعیت اتصال، نمونه و شبیه‌سازی رابط‌اند. دکمهٔ اتصال فقط ظاهر صفحه را تغییر می‌دهد و ارتباط VPN ایجاد نمی‌کند؛ پیوند عمومی کانال تلگرام از منبع حفظ شده است.

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

برای تغییر متن‌ها، پیوند عمومی و رفتار شبیه‌ساز، `script.js` و `index.html` را ویرایش کنید. سبک‌ها در `style.css` هستند. [منابع و مجوزها](docs/THIRD_PARTY.md) و [حقوق](LICENSE) همراه پروژه‌اند.

## English

A Persian RTL VPN landing-page interface preview. Business/client provenance is not independently verified; this repository is not presented as a verified client commission. Metrics and connection status are illustrative. The connection control only changes the interface and does not establish a VPN connection. The source's public Telegram channel is retained. All runtime fonts and animation assets are bundled locally.
