export type SupportedLocale = "en" | "zh-TW";

export type AppRoute = "home" | "pricing" | "report" | "intake" | "console";

export type AuditStatus = "idle" | "loading" | "error" | "success";

export interface NavLinkItem {
  id: string;
  route: AppRoute;
  section?: string;
  labelKey: string;
}

export type NavigateTo = (route: AppRoute, section?: string) => void;

export interface LocalizedContentItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
}

export interface WorkflowContentItem extends LocalizedContentItem {
  eyebrowKey: string;
}

export interface TrustPillItem {
  id: string;
  labelKey: string;
}

export interface LanguageOption {
  code: SupportedLocale;
  labelKey: string;
  shortLabelKey: string;
}
