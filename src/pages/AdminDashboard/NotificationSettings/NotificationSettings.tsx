import { useEffect, useState } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import { axiosInstance } from "../../../utils/axios";
import { showSuccessToast, showErrorToast } from "../../../utils/toastify";
import type { AxiosError } from "axios";

interface NotificationSettings {
  method: "SMS" | "EITAA" | "BOTH";
  hasEitaaToken: boolean;
}

function NotificationSettings() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  // Form state
  const [method, setMethod] = useState<"SMS" | "EITAA" | "BOTH">("SMS");
  const [eitaaToken, setEitaaToken] = useState("");
  const [showToken, setShowToken] = useState(false);

  // Test form state
  const [testToken, setTestToken] = useState("");
  const [testChatId, setTestChatId] = useState("");

  useEffect(() => {
    setHeaderConfig({ title: "تنظیمات نوتیفیکیشن" });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/settings/notifications");
      const data = response.data.data.notificationSettings;
      setSettings(data);
      setMethod(data.method);
    } catch (error) {
      console.error("Error fetching notification settings:", error);
      showErrorToast("خطا در دریافت تنظیمات");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    // اگر method ایتا یا هر دو است، توکن الزامی است
    if ((method === "EITAA" || method === "BOTH") && !eitaaToken.trim()) {
      showErrorToast("برای استفاده از ایتا، توکن API الزامی است");
      return;
    }

    try {
      setIsSaving(true);
      const response = await axiosInstance.patch("/settings/notifications", {
        method,
        eitaaApiToken: eitaaToken.trim() || null,
      });
      setSettings(response.data.data.notificationSettings);
      setEitaaToken(""); // Clear after save
      showSuccessToast("تنظیمات با موفقیت ذخیره شد");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      showErrorToast(err.response?.data?.message || "خطا در ذخیره تنظیمات");
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestConnection = async () => {
    if (!testToken.trim() || !testChatId.trim()) {
      showErrorToast("توکن API و شناسه کانال/گروه الزامی است");
      return;
    }

    try {
      setIsTesting(true);
      await axiosInstance.post("/settings/notifications/test-eitaa", {
        token: testToken.trim(),
        chatId: testChatId.trim(),
      });
      showSuccessToast("اتصال برقرار است! پیام تست ارسال شد.");
      // اگر تست موفق بود، می‌تونیم توکن رو در فرم اصلی هم بذاریم
      setEitaaToken(testToken.trim());
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      showErrorToast(err.response?.data?.message || "خطا در تست اتصال");
    } finally {
      setIsTesting(false);
    }
  };

  if (isLoading) {
    return (
      <main>
        <SectionContainer>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        </SectionContainer>
      </main>
    );
  }

  return (
    <main>
      <SectionContainer>
        <h5 className="main-header mb-6">تنظیمات نوتیفیکیشن منشی‌ها</h5>

        <div className="space-y-8">
          {/* انتخاب روش ارسال */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h6 className="text-lg font-estedad-semibold text-dark mb-4">
              روش ارسال نوتیفیکیشن به منشی‌ها
            </h6>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* SMS */}
              <label
                className={`relative flex flex-col p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  method === "SMS"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="method"
                  value="SMS"
                  checked={method === "SMS"}
                  onChange={() => setMethod("SMS")}
                  className="sr-only"
                />
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      method === "SMS"
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }`}
                  >
                    {method === "SMS" && (
                      <i className="fas fa-check text-white text-xs"></i>
                    )}
                  </div>
                  <span className="text-lg font-estedad-semibold text-dark">
                    فقط SMS
                  </span>
                </div>
                <p className="text-sm text-gray-600 font-estedad-light leading-relaxed">
                  نوتیفیکیشن‌ها فقط از طریق پیامک ارسال می‌شوند
                </p>
              </label>

              {/* EITAA */}
              <label
                className={`relative flex flex-col p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  method === "EITAA"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="method"
                  value="EITAA"
                  checked={method === "EITAA"}
                  onChange={() => setMethod("EITAA")}
                  className="sr-only"
                />
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      method === "EITAA"
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }`}
                  >
                    {method === "EITAA" && (
                      <i className="fas fa-check text-white text-xs"></i>
                    )}
                  </div>
                  <span className="text-lg font-estedad-semibold text-dark">
                    فقط ایتا
                  </span>
                </div>
                <p className="text-sm text-gray-600 font-estedad-light leading-relaxed">
                  نوتیفیکیشن‌ها فقط از طریق ایتا ارسال می‌شوند. منشی‌ها می‌توانند
                  از طریق ایتا نوبت را تایید/رد کنند
                </p>
              </label>

              {/* BOTH */}
              <label
                className={`relative flex flex-col p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  method === "BOTH"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="method"
                  value="BOTH"
                  checked={method === "BOTH"}
                  onChange={() => setMethod("BOTH")}
                  className="sr-only"
                />
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      method === "BOTH"
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }`}
                  >
                    {method === "BOTH" && (
                      <i className="fas fa-check text-white text-xs"></i>
                    )}
                  </div>
                  <span className="text-lg font-estedad-semibold text-dark">
                    هر دو
                  </span>
                </div>
                <p className="text-sm text-gray-600 font-estedad-light leading-relaxed">
                  نوتیفیکیشن‌ها هم از طریق SMS و هم از طریق ایتا ارسال می‌شوند
                </p>
              </label>
            </div>
          </div>

          {/* تنظیمات ایتا */}
          {(method === "EITAA" || method === "BOTH") && (
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h6 className="text-lg font-estedad-semibold text-dark mb-4">
                تنظیمات ایتا
              </h6>

              <div className="space-y-6">
                {/* تست اتصال */}
                <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
                  <h6 className="text-md font-estedad-medium text-blue-800 mb-3">
                    <i className="fas fa-flask ml-2"></i>
                    تست اتصال
                  </h6>
                  <p className="text-sm text-blue-700 mb-4 font-estedad-light">
                    ابتدا اتصال را تست کنید تا مطمئن شوید تنظیمات درست است
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        توکن API ایتا (برای تست)
                      </label>
                      <input
                        type="text"
                        value={testToken}
                        onChange={(e) => setTestToken(e.target.value)}
                        placeholder="توکن API از eitaayar.ir"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        شناسه کانال/گروه (برای تست)
                      </label>
                      <input
                        type="text"
                        value={testChatId}
                        onChange={(e) => setTestChatId(e.target.value)}
                        placeholder="شناسه کانال یا username"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleTestConnection}
                    disabled={isTesting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {isTesting ? (
                      <>
                        <i className="fas fa-spinner fa-spin ml-2"></i>
                        در حال تست...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-check ml-2"></i>
                        تست اتصال
                      </>
                    )}
                  </button>
                </div>

                {/* توکن API */}
                <div>
                  <label className="block text-sm font-estedad-medium text-dark mb-2">
                    توکن API ایتا
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    توکن API را از{" "}
                    <a
                      href="https://eitaayar.ir"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      eitaayar.ir
                    </a>{" "}
                    دریافت کنید
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type={showToken ? "text" : "password"}
                      value={eitaaToken}
                      onChange={(e) => setEitaaToken(e.target.value)}
                      placeholder="توکن API ایتا"
                      className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary text-dark font-estedad-light"
                    />
                    <button
                      onClick={() => setShowToken(!showToken)}
                      className="p-2 text-gray-600 hover:text-dark"
                      title={showToken ? "مخفی کردن" : "نمایش"}
                    >
                      <i
                        className={`fas ${showToken ? "fa-eye-slash" : "fa-eye"}`}
                      ></i>
                    </button>
                  </div>
                  {settings?.hasEitaaToken && !eitaaToken && (
                    <p className="text-xs text-green-600 mt-1">
                      <i className="fas fa-check-circle ml-1"></i>
                      توکن قبلاً تنظیم شده است
                    </p>
                  )}
                </div>

                {/* راهنما */}
                <div className="bg-sky-50 rounded-lg border border-sky-200 p-4">
                  <h6 className="text-sm font-estedad-semibold text-sky-800 mb-2">
                    <i className="fas fa-info-circle ml-2"></i>
                    راهنمای استفاده
                  </h6>
                  <div className="text-xs text-sky-700 space-y-1 font-estedad-light">
                    <p>• شناسه کانال/گروه ایتا برای هر کلینیک در بخش مدیریت کلینیک‌ها تنظیم می‌شود</p>
                    <p>• منشی‌ها می‌توانند از طریق ایتا نوبت را تایید/رد کنند</p>
                    <p>• در پیام ایتا لینک‌های تایید، رد و تماس با مراجع ارسال می‌شود</p>
                    <p>• برای ویرایش نوبت باید به پنل ادمین مراجعه کنید</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* دکمه ذخیره */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-50 font-estedad-medium"
            >
              {isSaving ? (
                <>
                  <i className="fas fa-spinner fa-spin ml-2"></i>
                  در حال ذخیره...
                </>
              ) : (
                <>
                  <i className="fas fa-save ml-2"></i>
                  ذخیره تنظیمات
                </>
              )}
            </button>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}

export default NotificationSettings;

