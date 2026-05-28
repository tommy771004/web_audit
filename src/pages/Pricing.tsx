import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageContainer from "../components/layout/PageContainer";
import GlassCard from "../components/ui/GlassCard";
import GlowingButton from "../components/ui/GlowingButton";
import PageIntro from "../components/ui/PageIntro";
import SectionHeader from "../components/ui/SectionHeader";
import type { NavigateTo } from "../types/home";

interface PricingPageProps {
  onNavigate: NavigateTo;
}

interface PricingPlan {
  id: string;
  nameKey: string;
  priceKey: string;
  cadenceKey: string;
  descriptionKey: string;
  ctaKey: string;
  featureKeys: string[];
  glow: "purple" | "cyan" | "blue";
  badgeKey?: string;
}

interface FaqItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

const pageMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.45 },
};

export default function Pricing({ onNavigate }: PricingPageProps) {
  const { t } = useTranslation();

  const plans: PricingPlan[] = [
    {
      id: "blueprint",
      nameKey: "pricing.plans.blueprint.name",
      priceKey: "pricing.plans.blueprint.price",
      cadenceKey: "pricing.plans.blueprint.cadence",
      descriptionKey: "pricing.plans.blueprint.description",
      ctaKey: "pricing.plans.blueprint.cta",
      featureKeys: [
        "pricing.plans.blueprint.features.performance",
        "pricing.plans.blueprint.features.seo",
        "pricing.plans.blueprint.features.summary",
      ],
      glow: "blue",
    },
    {
      id: "optimization",
      nameKey: "pricing.plans.optimization.name",
      priceKey: "pricing.plans.optimization.price",
      cadenceKey: "pricing.plans.optimization.cadence",
      descriptionKey: "pricing.plans.optimization.description",
      ctaKey: "pricing.plans.optimization.cta",
      featureKeys: [
        "pricing.plans.optimization.features.performance",
        "pricing.plans.optimization.features.architecture",
        "pricing.plans.optimization.features.remediation",
      ],
      glow: "purple",
      badgeKey: "pricing.plans.optimization.badge",
    },
    {
      id: "partner",
      nameKey: "pricing.plans.partner.name",
      priceKey: "pricing.plans.partner.price",
      cadenceKey: "pricing.plans.partner.cadence",
      descriptionKey: "pricing.plans.partner.description",
      ctaKey: "pricing.plans.partner.cta",
      featureKeys: [
        "pricing.plans.partner.features.workshop",
        "pricing.plans.partner.features.roadmap",
        "pricing.plans.partner.features.followup",
      ],
      glow: "cyan",
    },
  ];

  const faqItems: FaqItem[] = [
    {
      id: "delivery",
      questionKey: "pricing.faq.delivery.question",
      answerKey: "pricing.faq.delivery.answer",
    },
    {
      id: "access",
      questionKey: "pricing.faq.access.question",
      answerKey: "pricing.faq.access.answer",
    },
    {
      id: "scope",
      questionKey: "pricing.faq.scope.question",
      answerKey: "pricing.faq.scope.answer",
    },
  ];

  return (
    <PageContainer className="relative z-10 flex flex-col gap-16 pb-16 pt-28 sm:pt-32 lg:gap-20 lg:pb-24">
      <motion.section {...pageMotion} className="max-w-4xl">
        <PageIntro
          eyebrow={t("pricing.badge")}
          title={t("pricing.title")}
          description={t("pricing.description")}
          descriptionClassName="max-w-3xl"
        />
      </motion.section>

      <motion.section {...pageMotion} className="space-y-8">
        <SectionHeader
          eyebrow={t("pricing.compareEyebrow")}
          title={t("pricing.compareTitle")}
          description={t("pricing.compareDescription")}
          className="max-w-3xl"
        />

        <div className="grid gap-6 xl:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: index * 0.08 }}>
              <GlassCard glow={plan.glow} className="h-full p-6 sm:p-8">
                <div className="flex h-full flex-col gap-6">
                  <div className="space-y-4">
                    {plan.badgeKey ? (
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-cyan">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>{t(plan.badgeKey)}</span>
                      </div>
                    ) : null}
                    <div className="space-y-2">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">{t(plan.nameKey)}</p>
                      <div className="flex items-end gap-3">
                        <span className="text-4xl font-semibold tracking-[-0.04em] text-white">{t(plan.priceKey)}</span>
                        <span className="pb-1 text-sm text-brand-muted">{t(plan.cadenceKey)}</span>
                      </div>
                    </div>
                    <p className="text-sm leading-7 text-brand-muted">{t(plan.descriptionKey)}</p>
                  </div>

                  <div className="space-y-3">
                    {plan.featureKeys.map((featureKey) => (
                      <div key={featureKey} className="flex items-start gap-3 text-sm text-white/85">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" />
                        <span>{t(featureKey)}</span>
                      </div>
                    ))}
                  </div>

                  <GlowingButton
                    className="mt-auto w-full justify-center"
                    loadingLabel={t("hero.loading")}
                    onClick={() => {
                      onNavigate("intake");
                    }}
                  >
                    {t(plan.ctaKey)}
                  </GlowingButton>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section {...pageMotion} className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <GlassCard glow="cyan" className="p-6 sm:p-8">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-cyan">{t("pricing.deliveryEyebrow")}</p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">{t("pricing.deliveryTitle")}</h2>
            <p className="text-base leading-8 text-brand-muted">{t("pricing.deliveryDescription")}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <GlowingButton
                className="justify-center"
                loadingLabel={t("hero.loading")}
                onClick={() => {
                  onNavigate("intake");
                }}
              >
                {t("pricing.primaryCta")}
              </GlowingButton>
              <GlowingButton
                className="justify-center"
                loadingLabel={t("hero.loading")}
                variant="ghost"
                onClick={() => {
                  onNavigate("report");
                }}
              >
                {t("pricing.secondaryCta")}
              </GlowingButton>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-4">
          <SectionHeader eyebrow={t("pricing.faqEyebrow")} title={t("pricing.faqTitle")} description={t("pricing.faqDescription")} />

          {faqItems.map((item) => (
            <GlassCard key={item.id} className="p-5">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">{t(item.questionKey)}</h3>
                <p className="text-sm leading-7 text-brand-muted">{t(item.answerKey)}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.section>
    </PageContainer>
  );
}
