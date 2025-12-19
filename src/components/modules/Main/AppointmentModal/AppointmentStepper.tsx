import React from "react";

type StepperStepId =
  | "clinic"
  | "doctor"
  | "patient-info"
  | "datetime"
  | "confirm";

type Step = "clinic" | "doctor" | "patient-info" | "datetime";

const APPOINTMENT_STEPS: { id: StepperStepId; label: string; icon: string }[] =
  [
    { id: "clinic", label: "انتخاب کلینیک", icon: "fas fa-clinic-medical" },
    { id: "doctor", label: "انتخاب پزشک", icon: "fas fa-user-md" },
    {
      id: "patient-info",
      label: "مشخصات مراجعه‌کننده",
      icon: "fas fa-id-card",
    },
    {
      id: "datetime",
      label: "تاریخ و ساعت نوبت",
      icon: "fas fa-calendar-check",
    },
    { id: "confirm", label: "تایید نهایی", icon: "fas fa-check-circle" },
  ];

interface AppointmentStepperProps {
  currentStep: Step;
}

export function AppointmentStepper({ currentStep }: AppointmentStepperProps) {
  const currentStepIndex = Math.max(
    APPOINTMENT_STEPS.findIndex((step) => step.id === currentStep),
    0
  );

  const currentStepData =
    APPOINTMENT_STEPS[currentStepIndex] ?? APPOINTMENT_STEPS[0];

  return (
    <>
      {/* استپر مراحل رزرو نوبت - دسکتاپ / تبلت */}
      <div className="mb-4 mt-2 hidden md:block">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-1">
          {APPOINTMENT_STEPS.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isActive = index === currentStepIndex;

            return (
              <div
                key={step.id}
                className="flex flex-1 items-center last:flex-none"
              >
                <div className="flex w-30 flex-col items-center gap-2">
                  <div
                    className={`flex size-10 items-center justify-center rounded-full border-2 shadow-sm transition-colors duration-200 ${
                      isCompleted
                        ? "bg-accent border-accent text-white"
                        : isActive
                        ? "bg-white border-accent text-accent"
                        : "bg-gray-200/70 border-gray-200 text-gray-400"
                    }`}
                  >
                    <i className={`${step.icon} text-sm`} />
                  </div>
                  <span
                    className={`text-[12px] font-estedad-medium ${
                      isActive ? "text-accent" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {index < APPOINTMENT_STEPS.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 flex-1 rounded-full ${
                      isCompleted ? "bg-accent" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* استپر مراحل رزرو نوبت - موبایل */}
      <div className="mb-4 mt-10 md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-accent text-white shadow-sm">
              <i className={`${currentStepData.icon} text-sm`} />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-gray-500">
                مرحله {currentStepIndex + 1} از {APPOINTMENT_STEPS.length}
              </span>
              <span className="text-sm font-estedad-medium text-dark">
                {currentStepData.label}
              </span>
            </div>
          </div>
          <div className="ml-2 flex-1 h-1 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{
                width: `${
                  ((currentStepIndex + 1) / APPOINTMENT_STEPS.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
