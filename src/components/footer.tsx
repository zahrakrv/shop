import Link from 'next/link';

const Footer = () => {
  return (
    <div className="p-4">
      <hr className="my-10"></hr>
      <div className="flex justify-between items-center">
        <div>
          <img src="logo.png" className="sm:w-44 w-44" />
          <div className="sm:flex">
            <p className="ml-6 text-sm p-3">تلفن پشتیبانی : 021 - 76767000</p>
            <p className="hidden sm:ml-6 sm:text-xl"> | </p>
            <p className="boreder border-r-slate-300 text-sm p-3">
              {' '}
              7 روز هفته، 24 ساعته پاسخگوی شما هستیم
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded border border-slate-300 cursor-pointer w-44 py-3 px-2 text-slate-500">
          <span>بازگشت به بالا</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
            className="fill-slate-500"
          >
            <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
          </svg>
        </div>
      </div>
      <div className="hidden sm:flex sm:justify-between md:p-4 mt-5 mb-5">
        <div className="text-slate-500 text-sm flex flex-col items-center justify-center">
          <img src="express-delivery.svg" />

          <p>امکان تحویل اکسپرس</p>
        </div>
        <div className="text-slate-500 text-sm flex flex-col items-center justify-center">
          <img src="cash-on-delivery.svg" />
          <p>امکان پرداخت در محل</p>
        </div>
        <div className="text-slate-500 text-sm flex flex-col items-center justify-center">
          <img src="support.svg" />
          <p>7 روز هفته، 24 ساعته</p>
        </div>
        <div className="text-slate-500 text-sm flex flex-col items-center justify-center">
          <img src="days-return.svg" />
          <p>هفت روز ضمانت بازگشت کالا</p>
        </div>
        <div className="text-slate-500 text-sm flex-col items-center justify-center">
          <img src="original-products.svg" />
          <p>ضمانت اصل بودن کالا</p>
        </div>
      </div>
      <div className="sm:flex sm:justify-between sm:items-start sm:p-3 sm:mt-6">
        <div className="flex gap-8 justify-between">
          <div className="flex flex-col gap-6">
            <p className="text-blue-950 text-xl">با مگامارکت</p>
            <Link href="">
              <span className="text-slate-500 text-sm"> اتاق خبر مگامگ </span>
            </Link>
            <Link href="">
              <span className="text-slate-500 text-sm"> فروش در مگامگ </span>
            </Link>

            <Link href="">
              <span className="text-slate-500 text-sm">فرصت های شغلی</span>
            </Link>

            <Link href="">
              <span className="text-slate-500 text-sm">
                {' '}
                گزارش تخلف در مگامگ
              </span>
            </Link>
            <Link href="/contact">
              <span className="text-slate-500 text-sm"> تماس با مگامگ</span>
            </Link>
            <Link href="/about">
              <span className="text-slate-500 text-sm"> درباره مگامگ</span>
            </Link>
          </div>
          {/* //////// */}
          <div className="flex mr-8 flex-col gap-6">
            <p className="text-blue-950 text-xl">خدمات مشتریان</p>
            <Link href="">
              <span className="text-slate-500 text-sm">
                {' '}
                پاسخ به پرسش های متداول
              </span>
            </Link>
            <Link href="">
              <span className="text-slate-500 text-sm">
                {' '}
                رویه های بازگرداندن کالا
              </span>
            </Link>

            <Link href="">
              <span className="text-slate-500 text-sm">شرایط استفاده </span>
            </Link>

            <Link href="">
              <span className="text-slate-500 text-sm"> حریم خصوصی</span>
            </Link>
            <Link href="">
              <span className="text-slate-500 text-sm"> گزارش باگ</span>
            </Link>
          </div>
        </div>
        {/* ////// */}
        <div className="hidden md:flex md:flex-col md:gap-6">
          <Link href="">
            <span className="text-blue-950 text-xl">
              راهنمای خرید از مگامارکت
            </span>
          </Link>
          <Link href="">
            <span className="text-slate-500 text-sm">نحوه ثبت سفارش</span>
          </Link>
          <Link href="">
            <span className="text-slate-500 text-sm">رویه ارسال سفارش</span>
          </Link>
          <Link href="">
            <span className="text-slate-500 text-sm">شیوه های پرداخت</span>
          </Link>
        </div>
        {/* /////// */}
        <div className="flex items-center mt-8 flex-col gap-6">
          <span className="text-blue-950 text-xl">همراه ما باشید!</span>
          <div className="flex gap-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              className="h-10 fill-slate-400"
            >
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
              className="h-10 fill-slate-400"
            >
              <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              className="h-10 fill-slate-400"
            >
              <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 640 512"
              className="h-10 fill-slate-400"
            >
              <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
            </svg>
          </div>
          <p>با ثبت ایمیل، از جدیدترین تخفیف ها باخبر شوید</p>
          <div>
            <input
              type="text"
              placeholder="ایمیل شما"
              className="bg-slate-100 rounded p-2"
            />
            <button className="bg-gray-400 rounded py-2 px-4 text-white cursor-pointer mr-4">
              {' '}
              ثبت
            </button>
          </div>
        </div>
      </div>
      <div className="flex-col sm:flex">
        <hr
          className="my-10
        "
        ></hr>
        <div className=" mb-12">
          <h1 className="font-bold text-xl text-blue-900 mb-6">
            فروشگاه اینترنتی مگامگ، بررسی، انتخاب و خرید آنلاین.
          </h1>
          <div className="whitespace-normal w-full break-words flex flex-wrap">
            <p className=" text-slate-400 text-sm mb-6">
              یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی
              متنوع، باکیفیت و دارای قیمت مناسب را در مدت زمانی کوتاه به دست
              مشتریان خود برساند و ضمانت بازگشت کالا هم داشته باشد؛ ویژگی‌هایی
              که فروشگاه اینترنتی دیجی‌کالا سال‌هاست بر روی آن‌ها کار کرده و
              توانسته از این طریق مشتریان ثابت خود را داشته باشد.{' '}
            </p>
            {/* <h1 className="font-bold text-slate-400 mb-6">
              کدام محصولات در دیجی‌کالا قابل سفارش هستند؟
            </h1>
            <p className="text-slate-400 text-sm mb-6">
              تقریبا می‌توان گفت محصولی وجود ندارد که دیجی‌کالا برای مشتریان خود
              در سراسر کشور فراهم نکرده باشد. شما می‌توانید در تمامی روزهای هفته
              و تمامی شبانه روز یا در روزهای خاصی مثل حراج شگفت انگیز دیجی‌کالا
              که محصولات دارای تخفیف عالی می‌شوند، سفارش خود را به سادگی ثبت
              کرده و در روز و محدوده زمانی مناسب خود، درب منزل تحویل بگیرید.
              بعضی از گروه‌های اصلی و زیر مجموعه‌های پرطرفدار محصولات دیجی‌کالا
              شامل مواردی می‌شود که در ادامه به معرفی آن‌ها می‌پردازیم.
            </p>
            <h1 className="font-bold text-slate-400 mb-6">کالای دیجیتال</h1>
            <p className="text-slate-400 text-sm mb-6">
              انواع گوشی موبایل از برندهای مختلفی مثل آیفون، گوشی سامسونگ، گوشی
              نوکیا، گوشی شیائومی، گوشی هواوی، و...، انواع کنسول بازی ps4 و ps5،
              انواع تبلت‌های پرطرفدار مثل تبلت سامسونگ نوت 10، انواع هندزفری مثل
              هندزفری بی سیم، تلوزیون از برندهای مختلف مثل تلویزیون سامسونگ،
              سونی و...، انواع مانیتور، کیس، کیبورد، مودم از برندهای مختلف مثل
              مودم ایرانسل، آنتن و ... تنها بخشی از محصولاتی هستند که زیر مجموعه
              کالای دیجیتال در دیجی‌کالا قرار دارند.
            </p>

            <h1 className="font-bold text-slate-400 mb-6">
              خودرو، ابزار و تجهیزات صنعتی
            </h1>
            <p className="text-slate-400 text-sm mb-6">
              انواع خودروهای ایرانی و خارجی از برندهای مطرحی مثل هوندا، کیا
              و...، موتور سیکلت از برندهایی مثل کویر موتور و...، لوازم جانبی
              خودرو مثل سیستم صوتی تصویر، ضبط و...، لوازم یدکی مثل دیسک و صفحه
              کلاج و... و لوازم مصرفی خودرو مثل کفپوش سانا در این گروه قرار
              می‌گیرند.
            </p>

            <h1 className="font-bold text-slate-400 mb-6">مد و پوشاک </h1>
            <p className="text-slate-400 text-sm mb-6">
              محصولاتی مثل انواع لباس مثل لباس مجلسی زنانه و مردانه، لباس راحتی،
              لباس ورزشی، اکسسوری، کیف، کفش، عینک آفتابی، لباس زیر، شال و روسری
              و... جزو مواردی هستند که می‌توانید آن‌ها را از برندهای مطرح ایرانی
              و خارجی موجود در دیجی کالا مثل آدیداس، نایکی، دبنهامز، آلدو، درسا
              و... خریداری کنید.
            </p> */}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="border border-2 border-slate-300 rounded w-28 h-32 p-2">
            <img src="rasane.webp" />
          </div>
          <div className="border border-2 border-slate-300 rounded w-24 h-32 p-2">
            <img src="kasbokar.webp" />
          </div>
          <div className="border border-2 border-slate-300 rounded w-28 h-32 p-2">
            <img src="enamad.webp" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
