import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAdminDashboardHeader } from "../../../contexts";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import { showSuccessToast, showErrorToast } from "../../../utils/toastify";
import {
  useGetAppointmentSettings,
  useUpdateAppointmentSettings,
  useCreateSyncApiKey,
  useDeleteSyncApiKey,
  useToggleSyncApiKey,
  type Clinic,
  type SyncApiKey,
} from "../../../services/useSettings";
import { useGetAllClinics } from "../../../services/useClinics";

function AppointmentSettings() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const queryClient = useQueryClient();
  
  const { data, isLoading, error } = useGetAppointmentSettings();
  const { data: clinicsData } = useGetAllClinics(1, 100);
  const updateMutation = useUpdateAppointmentSettings();
  const createKeyMutation = useCreateSyncApiKey();
  const deleteKeyMutation = useDeleteSyncApiKey();
  const toggleKeyMutation = useToggleSyncApiKey();

  const settings = data?.data?.appointmentSettings;
  const clinics: Clinic[] = clinicsData?.data?.clinics || [];

  // Form state
  const [mode, setMode] = useState<"SIMPLE" | "ADVANCED">("SIMPLE");
  const [maxPerHour, setMaxPerHour] = useState(10);

  // New API Key form
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyClinicId, setNewKeyClinicId] = useState("");
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);
  const [showNewKey, setShowNewKey] = useState(false);

  useEffect(() => {
    setHeaderConfig({ title: "تنظیمات نوبت‌دهی" });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  useEffect(() => {
    if (settings) {
      setMode(settings.mode);
      setMaxPerHour(settings.maxAppointmentsPerHour);
    }
  }, [settings]);

  useEffect(() => {
    if (error) {
      showErrorToast("خطا در دریافت تنظیمات");
    }
  }, [error]);

  const handleSave = async () => {
    // جلوگیری از ذخیره حالت پیشرفته
    if (mode === "ADVANCED") {
      showErrorToast("حالت پیشرفته در حال توسعه می‌باشد. لطفاً از حالت ساده استفاده کنید.");
      setMode("SIMPLE");
      return;
    }

    try {
      await updateMutation.mutateAsync({
        appointmentMode: "SIMPLE", // همیشه SIMPLE ذخیره می‌شود
        maxAppointmentsPerHour: maxPerHour,
      });
      queryClient.invalidateQueries({ queryKey: ["appointmentSettings"] });
      showSuccessToast("تنظیمات با موفقیت ذخیره شد");
    } catch (error: any) {
      showErrorToast(error?.response?.data?.message || "خطا در ذخیره تنظیمات");
    }
  };

  const handleCreateApiKey = async () => {
    if (!newKeyName.trim()) {
      showErrorToast("نام کلید API الزامی است");
      return;
    }

    try {
      const response = await createKeyMutation.mutateAsync({
        name: newKeyName.trim(),
        clinicId: newKeyClinicId || null,
      });

      const newKey = response.data.syncApiKey;
      setNewlyCreatedKey(newKey.apiKey);
      setShowNewKey(false);

      queryClient.invalidateQueries({ queryKey: ["appointmentSettings"] });

      setNewKeyName("");
      setNewKeyClinicId("");
      showSuccessToast("کلید API ایجاد شد. آن را کپی کنید!");
    } catch (error: any) {
      showErrorToast(error?.response?.data?.message || "خطا در ایجاد کلید API");
    }
  };

  const handleDeleteApiKey = async (id: string, name: string) => {
    if (!confirm(`آیا از حذف کلید "${name}" مطمئن هستید؟`)) {
      return;
    }

    try {
      await deleteKeyMutation.mutateAsync(id);
      queryClient.invalidateQueries({ queryKey: ["appointmentSettings"] });
      showSuccessToast("کلید API حذف شد");
    } catch (error: any) {
      showErrorToast(error?.response?.data?.message || "خطا در حذف کلید API");
    }
  };

  const handleToggleApiKey = async (id: string) => {
    try {
      const response = await toggleKeyMutation.mutateAsync(id);
      queryClient.invalidateQueries({ queryKey: ["appointmentSettings"] });
      showSuccessToast(response.message);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "خطا در تغییر وضعیت کلید API"
      );
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showSuccessToast("کپی شد");
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("fa-IR");
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
        <h5 className="main-header mb-6">تنظیمات نوبت‌دهی</h5>

        <div className="space-y-8">
          {/* حالت نوبت‌دهی */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h6 className="text-lg font-estedad-semibold text-dark mb-4">
              حالت نوبت‌دهی
            </h6>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* حالت ساده */}
              <label
                className={`relative flex flex-col p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  mode === "SIMPLE"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  value="SIMPLE"
                  checked={mode === "SIMPLE"}
                  onChange={() => setMode("SIMPLE")}
                  className="sr-only"
                />
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      mode === "SIMPLE"
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }`}
                  >
                    {mode === "SIMPLE" && (
                      <i className="fas fa-check text-white text-xs"></i>
                    )}
                  </div>
                  <span className="text-lg font-estedad-semibold text-dark">
                    حالت ساده
                  </span>
                </div>
                <p className="text-sm text-gray-600 font-estedad-light leading-relaxed">
                  بدون بررسی تداخل نوبت‌ها. کاربران می‌توانند در هر ساعتی نوبت
                  بگیرند. مناسب برای کلینیک‌هایی که مدیریت نوبت را دستی انجام
                  می‌دهند.
                </p>
              </label>

              {/* حالت پیشرفته - در حال توسعه */}
              <div
                className={`relative flex flex-col p-6 rounded-xl border-2 transition-all ${
                  mode === "ADVANCED"
                    ? "border-gray-300 bg-gray-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-gray-300 bg-gray-200">
                    <i className="fas fa-lock text-gray-400 text-xs"></i>
                  </div>
                  <span className="text-lg font-estedad-semibold text-gray-500">
                    حالت پیشرفته
                  </span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-estedad-medium">
                    در حال توسعه
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-estedad-light leading-relaxed mb-3">
                  با بررسی تداخل نوبت‌ها و سینک با نرم‌افزار آفلاین. جلوگیری از
                  رزرو همزمان و مدیریت ظرفیت پزشکان.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800 font-estedad-medium">
                    <i className="fas fa-info-circle ml-2"></i>
                    این بخش در حال توسعه می‌باشد. لطفاً از حالت ساده استفاده کنید.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* تنظیمات حالت پیشرفته - غیرفعال */}
          {mode === "ADVANCED" && (
            <div className="bg-gray-50 rounded-xl border-2 border-gray-300 p-6 opacity-60">
              <div className="flex items-center gap-3 mb-4">
                <i className="fas fa-lock text-gray-400"></i>
                <h6 className="text-lg font-estedad-semibold text-gray-500">
                  تنظیمات حالت پیشرفته
                </h6>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800 font-estedad-medium">
                  <i className="fas fa-info-circle ml-2"></i>
                  این بخش در حال توسعه می‌باشد. لطفاً از حالت ساده استفاده کنید.
                </p>
              </div>
            </div>
          )}

          {/* مدیریت کلیدهای API - غیرفعال */}
          {mode === "ADVANCED" && (
            <div className="bg-gray-50 rounded-xl border-2 border-gray-300 p-6 opacity-60">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-yellow-800 font-estedad-medium">
                  <i className="fas fa-info-circle ml-2"></i>
                  این بخش در حال توسعه می‌باشد. لطفاً از حالت ساده استفاده کنید.
                </p>
              </div>
            </div>
          )}
          
          {/* مدیریت کلیدهای API - مخفی شده */}
          {false && mode === "ADVANCED" && (
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h6 className="text-lg font-estedad-semibold text-dark">
                  کلیدهای API سینک
                </h6>
                <button
                  onClick={() => {
                    setShowNewKeyForm(!showNewKeyForm);
                    setNewlyCreatedKey(null);
                  }}
                  className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition text-sm"
                >
                  <i className="fas fa-plus ml-2"></i>
                  ایجاد کلید جدید
                </button>
              </div>

              <p className="text-xs text-gray-500 mb-4">
                هر کلید API برای یک دستگاه/کلینیک استفاده می‌شود. می‌توانید کلید
                را به کلینیک خاصی محدود کنید.
              </p>

              {/* فرم ایجاد کلید جدید */}
              {showNewKeyForm && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                  <h6 className="text-md font-estedad-medium text-dark mb-3">
                    ایجاد کلید API جدید
                  </h6>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        نام کلید (مثال: سیستم منشی شعبه مرکزی)
                      </label>
                      <input
                        type="text"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        placeholder="نام دستگاه یا کلینیک"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        محدود به کلینیک (اختیاری)
                      </label>
                      <select
                        value={newKeyClinicId}
                        onChange={(e) => setNewKeyClinicId(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
                      >
                        <option value="">همه کلینیک‌ها</option>
                        {clinics.map((clinic) => (
                          <option key={clinic.id} value={clinic.id}>
                            {clinic.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleCreateApiKey}
                      disabled={createKeyMutation.isPending}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
                    >
                      {createKeyMutation.isPending ? "در حال ایجاد..." : "ایجاد کلید"}
                    </button>
                    <button
                      onClick={() => {
                        setShowNewKeyForm(false);
                        setNewlyCreatedKey(null);
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                      انصراف
                    </button>
                  </div>

                  {/* نمایش کلید جدید ایجاد شده */}
                  {newlyCreatedKey && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800 font-estedad-medium mb-2">
                        <i className="fas fa-exclamation-triangle ml-2"></i>
                        این کلید فقط یکبار نمایش داده می‌شود! آن را کپی کنید.
                      </p>
                      <div className="flex items-center gap-2">
                        <code
                          className={`flex-1 p-2 bg-white rounded border font-mono text-sm overflow-x-auto ${
                            showNewKey ? "" : "blur-sm select-none"
                          }`}
                        >
                          {newlyCreatedKey}
                        </code>
                        <button
                          onClick={() => setShowNewKey(!showNewKey)}
                          className="p-2 text-gray-600 hover:text-dark"
                          title={showNewKey ? "مخفی کردن" : "نمایش"}
                        >
                          <i
                            className={`fas ${showNewKey ? "fa-eye-slash" : "fa-eye"}`}
                          ></i>
                        </button>
                        <button
                          onClick={() => newlyCreatedKey && copyToClipboard(newlyCreatedKey)}
                          className="p-2 text-primary hover:text-primary/80"
                          title="کپی"
                        >
                          <i className="fas fa-copy"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* لیست کلیدهای موجود */}
              {settings && settings.syncApiKeys && settings.syncApiKeys.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-right p-3 font-estedad-medium">
                          نام
                        </th>
                        <th className="text-right p-3 font-estedad-medium">
                          کلینیک
                        </th>
                        <th className="text-right p-3 font-estedad-medium">
                          وضعیت
                        </th>
                        <th className="text-right p-3 font-estedad-medium">
                          آخرین استفاده
                        </th>
                        <th className="text-right p-3 font-estedad-medium">
                          عملیات
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {settings?.syncApiKeys?.map((key) => (
                        <tr key={key.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <span className="font-estedad-medium">
                              {key.name}
                            </span>
                          </td>
                          <td className="p-3">
                            {key.clinic ? (
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                {key.clinic.name}
                              </span>
                            ) : (
                              <span className="text-gray-400">همه کلینیک‌ها</span>
                            )}
                          </td>
                          <td className="p-3">
                            {key.isActive ? (
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                فعال
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                                غیرفعال
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-gray-500 text-xs">
                            {formatDate(key.lastUsedAt)}
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleToggleApiKey(key.id)}
                                className={`px-3 py-1 rounded text-xs transition ${
                                  key.isActive
                                    ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                    : "bg-green-100 text-green-700 hover:bg-green-200"
                                }`}
                                title={
                                  key.isActive ? "غیرفعال کردن" : "فعال کردن"
                                }
                              >
                                {key.isActive ? "غیرفعال" : "فعال"}
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteApiKey(key.id, key.name)
                                }
                                className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition"
                                title="حذف"
                              >
                                حذف
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <i className="fas fa-key text-4xl mb-3 opacity-30"></i>
                  <p>هنوز کلید API ایجاد نشده است</p>
                </div>
              )}
            </div>
          )}

          {/* راهنمای سینک - غیرفعال */}
          {false && mode === "ADVANCED" && (
            <div className="bg-sky-50 rounded-xl border border-sky-200 p-6">
              <h6 className="text-lg font-estedad-semibold text-sky-800 mb-3">
                <i className="fas fa-info-circle ml-2"></i>
                راهنمای سینک نرم‌افزار
              </h6>
              <div className="text-sm text-sky-700 space-y-2 font-estedad-light">
                <p>۱. نرم‌افزار پایتون را روی سیستم منشی نصب کنید.</p>
                <p>
                  ۲. یک کلید API برای هر دستگاه/کلینیک ایجاد کنید و آن را کپی
                  کنید.
                </p>
                <p>۳. کلید API را در تنظیمات نرم‌افزار وارد کنید.</p>
                <p>
                  ۴. آدرس سرور را تنظیم کنید:{" "}
                  <code className="bg-white px-2 py-0.5 rounded">
                    {window.location.origin}
                  </code>
                </p>
                <p>
                  ۵. <strong>شناسه کلینیک</strong> را از لیست کلینیک‌ها کپی کرده و
                  در نرم‌افزار وارد کنید.
                </p>
                <p>۶. بازه سینک را تنظیم کنید (پیشنهاد: هر ۱۵ دقیقه).</p>
              </div>
            </div>
          )}

          {/* دکمه ذخیره */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={updateMutation.isPending}
              className="purple-btn"
            >
              {updateMutation.isPending ? (
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

export default AppointmentSettings;
