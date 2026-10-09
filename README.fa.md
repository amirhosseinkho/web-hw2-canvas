> English version: [README.md](README.md)

# ابزار نقاشی ساده با React

## مقدمه

این پروژه یک ابزار نقاشی تعاملی است که با استفاده از React.js و JavaScript ES6+ توسعه یافته است. هدف از این پروژه، ایجاد یک رابط کاربری کامل برای ترسیم اشکال مختلف با قابلیت‌های پیشرفته مانند Drag and Drop، Undo/Redo، انتخاب رنگ و تنظیم اندازه است.

## ویژگی‌های پیاده‌سازی شده

### رابط کاربری اصلی
برنامه شامل چهار بخش اصلی است:

1. **Header (هدر)**: شامل فیلد ورودی برای عنوان نقاشی، دکمه‌های Undo/Redo، Import و Export
2. **Sidebar (نوار کناری)**: ابزارهای ترسیم، انتخاب رنگ و تنظیم اندازه
3. **Canvas (بوم ترسیم)**: منطقه اصلی برای ترسیم و جابجایی اشکال
4. **Footer (پایین صفحه)**: نمایش آمار تعداد هر نوع شکل

### ابزارهای ترسیم
شش نوع شکل مختلف پیاده‌سازی شده است:
- دایره (Circle): با استفاده از CSS border-radius
- مربع (Square): با استفاده از CSS width و height
- مثلث (Triangle): با استفاده از CSS border properties
- ستاره (Star): با استفاده از SVG polygon
- قلب (Heart): با استفاده از SVG path
- لوزی (Diamond): با استفاده از SVG polygon

### انتخاب رنگ
سیستم انتخاب رنگ شامل 10 رنگ پیش‌فرض است:
- قرمز (#e74c3c)
- آبی (#3498db)
- نارنجی (#f39c12)
- سبز (#2ecc71)
- بنفش (#9b59b6)
- نارنجی تیره (#e67e22)
- فیروزه‌ای (#1abc9c)
- خاکستری تیره (#34495e)
- زرد (#f1c40f)
- صورتی (#e91e63)

### تنظیم اندازه
اسلایدر برای تنظیم اندازه اشکال از 20 پیکسل تا 100 پیکسل پیاده‌سازی شده است. این قابلیت به کاربران امکان کنترل دقیق اندازه اشکال را می‌دهد.

### Drag and Drop
سیستم جابجایی اشکال با استفاده از event handlers پیاده‌سازی شده است:
- onMouseDown: شروع عملیات drag
- onMouseMove: جابجایی شکل
- onMouseUp: پایان عملیات drag
- محاسبه offset برای جابجایی دقیق

### Undo/Redo
سیستم بازگشت و تکرار با استفاده از تاریخچه عملیات پیاده‌سازی شده است:
- ذخیره تمام حالت‌های نقاشی در آرایه history
- مدیریت index برای تعیین موقعیت فعلی
- جلوگیری از اضافه شدن عملیات Undo/Redo به تاریخچه

### Import/Export
سیستم ذخیره و بارگذاری با فرمت JSON:
- Export: تبدیل داده‌ها به JSON و دانلود فایل
- Import: خواندن فایل JSON و بازسازی نقاشی
- مدیریت خطاها در هنگام بارگذاری

## ساختار فایل‌ها

### کامپوننت‌های اصلی

**App.jsx**: کامپوننت اصلی که تمام state management و logic را مدیریت می‌کند
- مدیریت state برای اشکال، ابزار انتخاب شده، رنگ و اندازه
- پیاده‌سازی Undo/Redo logic
- مدیریت Import/Export operations

**Header.jsx**: هدر برنامه شامل:
- فیلد ورودی عنوان نقاشی
- کامپوننت UndoRedo
- دکمه‌های Import و Export

**Sidebar.jsx**: نوار کناری شامل:
- بخش ابزارهای ترسیم
- کامپوننت ColorPicker
- کامپوننت SizeSlider

**Canvas.jsx**: بوم ترسیم شامل:
- مدیریت Drag and Drop events
- رندر کردن اشکال
- محاسبه موقعیت دقیق

### کامپوننت‌های کمکی

**ShapeButton.jsx**: دکمه‌های ابزار ترسیم
- رندر SVG برای هر شکل
- مدیریت حالت active/inactive

**ColorPicker.jsx**: انتخاب رنگ
- نمایش رنگ‌های موجود در grid
- مدیریت انتخاب رنگ فعال

**SizeSlider.jsx**: تنظیم اندازه
- اسلایدر HTML5 با custom styling
- نمایش مقدار فعلی

**UndoRedo.jsx**: دکمه‌های بازگشت و تکرار
- مدیریت حالت disabled/enabled
- نمایش آیکون‌های مناسب

**Shape.jsx**: کامپوننت شکل
- رندر اشکال مختلف با CSS و SVG
- مدیریت استایل‌های پویا
- پشتیبانی از Drag and Drop

**Footer.jsx**: پایین صفحه
- نمایش آمار اشکال
- رندر کامپوننت‌های ShapeCount

**ShapeCount.jsx**: نمایش تعداد هر شکل
- رندر آیکون و تعداد
- پشتیبانی از تمام انواع اشکال

## تکنولوژی‌های استفاده شده

### Frontend
- **React.js 18.2.0**: کتابخانه اصلی برای ساخت رابط کاربری
- **JavaScript ES6+**: استفاده از arrow functions، destructuring، spread operator
- **CSS3**: Flexbox، Grid، Transitions، Animations
- **HTML5**: Semantic elements و modern APIs

### ویژگی‌های پیشرفته
- **State Management**: استفاده از useState و useCallback برای بهینه‌سازی
- **Event Handling**: مدیریت پیچیده mouse events برای Drag and Drop
- **File API**: استفاده از FileReader برای Import/Export
- **SVG**: رندر اشکال پیچیده مانند ستاره و قلب

## الگوریتم‌های پیاده‌سازی شده

### Undo/Redo Algorithm
```javascript
const addToHistory = useCallback((newShapes) => {
  if (!isUndoRedoAction.current) {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newShapes);
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
  }
  isUndoRedoAction.current = false;
}, [historyIndex]);
```

### Drag and Drop Algorithm
```javascript
const handleShapeDragStart = (event, shapeId) => {
  const rect = canvasRef.current.getBoundingClientRect();
  const shape = shapes.find(s => s.id === shapeId);
  if (shape) {
    setDraggedShape(shapeId);
    setDragOffset({
      x: event.clientX - rect.left - shape.x,
      y: event.clientY - rect.top - shape.y
    });
  }
};
```

### Shape Rendering Algorithm
هر شکل با الگوریتم خاص خود رندر می‌شود:
- اشکال ساده (دایره، مربع): CSS properties
- اشکال پیچیده (مثلث): CSS border trick
- اشکال SVG (ستاره، قلب، لوزی): SVG elements

## فرمت داده‌ها

### ساختار Shape Object
```javascript
{
  type: "circle|square|triangle|star|heart|diamond",
  x: number,        // موقعیت X
  y: number,        // موقعیت Y
  color: string,    // کد رنگ hex
  size: number,     // اندازه به پیکسل
  id: number        // شناسه یکتا
}
```

### فرمت فایل JSON
```json
{
  "title": "عنوان نقاشی",
  "shapes": [
    {
      "type": "circle",
      "x": 120,
      "y": 80,
      "color": "#e74c3c",
      "size": 60,
      "id": 1234567890
    }
  ]
}
```

## بهینه‌سازی‌های انجام شده

### Performance Optimization
- استفاده از useCallback برای جلوگیری از re-render غیرضروری
- استفاده از useRef برای مدیریت drag state
- بهینه‌سازی event handlers

### Code Organization
- جداسازی منطقی کامپوننت‌ها
- استفاده از props برای data flow
- مدیریت state در سطح مناسب

### User Experience
- انیمیشن‌های نرم برای تعامل
- feedback بصری برای عملیات
- مدیریت خطاها

## نحوه اجرا

### پیش‌نیازها
- Node.js نسخه 14 یا بالاتر
- npm یا yarn

### مراحل نصب
```bash
# کلون کردن پروژه
git clone <repository-url>
cd web-hw2

# نصب وابستگی‌ها
npm install

# اجرای برنامه
npm start
```

برنامه در آدرس `http://localhost:3000` قابل دسترسی خواهد بود.

## نحوه استفاده

### ترسیم شکل
1. انتخاب ابزار مورد نظر از نوار کناری
2. تنظیم رنگ و اندازه دلخواه
3. کلیک روی بوم در محل مورد نظر

### جابجایی شکل
- کلیک و نگه داشتن روی شکل
- کشیدن به موقعیت جدید
- رها کردن برای تثبیت موقعیت

### حذف شکل
- دوبار کلیک روی شکل مورد نظر

### عملیات Undo/Redo
- استفاده از دکمه‌های ↶ و ↷ در هدر
- Undo: بازگشت به حالت قبلی
- Redo: تکرار عملیات لغو شده

### ذخیره و بارگذاری
- Export: کلیک روی "خروجی گرفتن" برای دانلود فایل JSON
- Import: کلیک روی "وارد کردن" و انتخاب فایل JSON

## مشکلات حل شده

### Drag and Drop Challenges
- محاسبه دقیق offset برای جابجایی طبیعی
- مدیریت boundary canvas
- جلوگیری از تداخل با click events

### Undo/Redo Implementation
- مدیریت صحیح history stack
- جلوگیری از اضافه شدن عملیات Undo/Redo به تاریخچه
- بهینه‌سازی memory usage

### Shape Rendering
- پیاده‌سازی اشکال پیچیده با SVG
- مدیریت responsive sizing
- حفظ نسبت‌های صحیح

## نتیجه‌گیری

این پروژه موفق به پیاده‌سازی تمام قابلیت‌های درخواستی شده است:
- Drag and Drop کامل و روان
- سیستم Undo/Redo قابل اعتماد
- انتخاب رنگ و اندازه انعطاف‌پذیر
- ابزارهای ترسیم متنوع
- Import/Export با فرمت استاندارد

کد پروژه به صورت modular و قابل نگهداری نوشته شده و از بهترین practices در React استفاده می‌کند. 