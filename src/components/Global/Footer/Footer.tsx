import logoFooter from "../../../assets/logo-footer.svg";

const Footer = () => {
  return (
    <footer className=" bg-mainColor hidden lg:block text-white">
      <div className="max-w-full py-4 md:px-8 sm:max-w-5xl md:max-w-6xl  lg:max-w-[90rem] mx-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 py-32 md:grid-cols-4 gap-40">
          <div className="text-center md:text-right ">
            <h4 className="font-bold pb-4 border-b">الدورات</h4>
            <ul className="space-y-2 pt-6">
              <li>دورة اللغة الإنجليزية العامة</li>
              <li>دورة التحضير للأيلتس</li>
              <li>دورة التحضير للتوفل</li>
              <li>دورة بزنس انجلش</li>
            </ul>
          </div>
          <div className="text-center md:text-right">
            <h4 className="font-bold pb-4 border-b">الوجهات</h4>
            <ul className="space-y-2 pt-6">
              <li>المملكة المتحدة</li>
              <li>الولايات المتحدة الأمريكية</li>
              <li>أيرلندا</li>
              <li>أستراليا</li>
              <li>نيوزيلندا</li>
            </ul>
          </div>
          <div className="text-center md:text-right">
            <h4 className="font-bold pb-4 border-b ">فرص</h4>
            <ul className="space-y-2 pt-6">
              <li>أصبح شريك</li>
              <li>يوتوبيا ستدي أعمال</li>
              <li>الوظائف</li>
            </ul>
          </div>
          <div className="text-center md:text-right">
            <h4 className="font-bold pb-4 border-b">تواصل معنا</h4>
            <ul className="space-y-2 pt-6">
              <li>+966550808636</li>
              <li>Admin@Utopia.com</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 gap-4 flex flex-col lg:flex-row justify-center items-center pb-2 lg:justify-between">
          <p>جميع الحقوق محفوظة</p>
          <img src={logoFooter} alt="logo footer" />
          <p className="">الشروط والأحكام سياسة الخصوصية</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
