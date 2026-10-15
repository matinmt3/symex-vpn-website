# وب‌سایت پریمیوم SYMEX VPN

این نسخه بر پایه فایل‌های قبلی سایت ساخته شده اما از حالت ساده به یک لندینگ مدرن، تیره، لوکس و انیمیشنی ارتقا داده شده است.

## فایل‌ها

- `index.html` ساختار کامل صفحه، سکشن‌ها، CTAها، متن‌های جدید و لینک‌های تلگرام
- `style.css` دیزاین سیستم، گلس‌مورفیسم، گرید، ریسپانسیو، افکت‌ها و حالت reduced-motion
- `script.js` منوی موبایل، کپی شناسه، دمو اتصال، GSAP/ScrollTrigger fallback، کارت‌های tilt، دکمه‌های magnetic، کانترها و canvas mesh
- `assets/favicon.svg` آیکون فعلی سایت
- `ROADMAP-FA.md` نقشه راه توسعه حرفه‌ای سایت

## وابستگی‌ها

این سایت هنوز استاتیک است و با هاست ساده هم اجرا می‌شود. برای انیمیشن‌های پیشرفته از CDNهای زیر استفاده شده است:

- GSAP
- ScrollTrigger
- Google Font: Vazirmatn

اگر CDNها لود نشوند، سایت همچنان نمایش داده می‌شود و انیمیشن‌ها با fallback ساده‌تر اجرا می‌شوند.

## اجرا

فایل `index.html` را با مرورگر باز کنید یا کل پوشه را روی هاست آپلود کنید.

پیشنهاد برای تست محلی:

```bash
python -m http.server 8080
```

بعد در مرورگر باز کنید:

```text
http://localhost:8080
```

## تغییر لینک تلگرام

لینک فعلی در تمام CTAها:

```text
https://t.me/symexvpn
```

شناسه کپی‌شونده:

```text
@symexvpn
```

برای تغییر، در `index.html` همه‌ی `https://t.me/symexvpn` و در `data-copy` مقدار `@symexvpn` را جایگزین کنید.

## چیزهایی که اضافه شد

- Hero جدید با متن قوی‌تر و حس محصول لوکس
- پس‌زمینه canvas mesh و cursor glow
- شبیه‌ساز اتصال داخل ماکاپ موبایل
- کارت‌های سه‌بعدی با tilt effect
- دکمه‌های magnetic
- GSAP entrance animations
- ScrollTrigger parallax و reveal
- کانترهای عددی
- مارکی متحرک برندینگ
- سکشن Immersive Web Design
- FAQ و CTA بازنویسی‌شده
- دسترسی‌پذیری بهتر: skip link، focus state، reduced motion
- CSS خوانا و قابل توسعه به‌جای فایل فشرده‌ی یک‌خطی

## نکته مهم

این نسخه با HTML + CSS + JavaScript ساخته شده، نه React. چون پروژه ارسالی استاتیک بود، کامپوننت‌های ReactBits مستقیماً نصب نشده‌اند؛ اما الگوهای آن مثل animated hero، text reveal، interactive cards و scroll-based motion با JavaScript و GSAP پیاده‌سازی شده‌اند.
