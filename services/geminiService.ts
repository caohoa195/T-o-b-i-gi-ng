import { LessonMetadata, GeneratedContent, CustomGeneratedPlan, CustomTemplateConfig } from "../types";

export const generateLessonPlan = async (
  metadata: LessonMetadata,
  sourceMaterial: string
): Promise<GeneratedContent> => {
  const response = await fetch("/api/generate-lesson-plan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      metadata,
      sourceMaterial,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.message || "Có lỗi xảy ra khi tạo bài giảng.");
  }

  return data.data as GeneratedContent;
};

export const generatePlanFromCustomTemplate = async (
  templateText: string,
  sourceMaterial: string,
  metadata?: LessonMetadata,
  customConfig?: Partial<CustomTemplateConfig>
): Promise<CustomGeneratedPlan> => {
  const response = await fetch("/api/generate-from-template", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      templateText,
      sourceMaterial,
      metadata,
      customConfig,
    }),
  });


  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.message || "Có lỗi xảy ra khi tạo kế hoạch theo mẫu.");
  }

  return data.data as CustomGeneratedPlan;
};

