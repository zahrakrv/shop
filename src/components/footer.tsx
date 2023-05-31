import Link from 'next/link';

const Footer = () => {
  return (
    <div className="flex justify-between items-center text-blue-950 p-3 bg-[#D90132]">
      <div className="flex flex-col gap-6">
        <p>دسته بندی ها</p>
        <Link href="">
          <span> موبایل</span>
        </Link>
        <Link href="">
          <span> لب تاپ</span>
        </Link>

        <Link href="">
          <span> لوازم جانبی</span>
        </Link>

        <Link href="">
          <span> ساعت هوشمند</span>
        </Link>
      </div>
      {/* ////// */}
      <div className="flex flex-col gap-6">
        <Link href="">
          <span>تماس با ما</span>
        </Link>
        <Link href="">
          <span>درباره ما </span>
        </Link>
        <Link href="">
          <span>حریم خصوصی</span>
        </Link>
      </div>
      {/* /////// */}
      <div className="flex flex-col gap-6">
        <span>تلفن پشتیبانی:</span>
        <span>02177454545</span>
      </div>
    </div>
  );
};

export default Footer;
