import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRightIcon, BuildingOffice2Icon, BuildingStorefrontIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { getSitePagesContent, type SitePagesContent, type SimulatorIconKey } from '../data/sitePages';

const profileIcons = {
  office: BuildingOffice2Icon,
  store: BuildingStorefrontIcon,
  bulb: LightBulbIcon,
} satisfies Record<SimulatorIconKey, typeof BuildingOffice2Icon>;

export default function IpSimulator() {
  const { i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');
  const language = isFr ? 'fr' : 'en';
  const [content, setContent] = useState<SitePagesContent>(getSitePagesContent);
  const [selected, setSelected] = useState<string | null>(null);
  const simulator = content.home.simulator;
  const selectedProfile = simulator.profiles.find((profile) => profile.id === selected) ?? null;

  useEffect(() => {
    const refresh = () => setContent(getSitePagesContent());
    window.addEventListener('sitePagesUpdated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('sitePagesUpdated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  useEffect(() => {
    if (selected && !simulator.profiles.some((profile) => profile.id === selected)) setSelected(null);
  }, [selected, simulator.profiles]);

  return (
    <section className="overflow-hidden rounded-[2rem] bg-brand-black text-white">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
        <div className="p-8 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent-light">{simulator.eyebrow[language]}</p>
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">{simulator.title[language]}</h2>
          <p className="mt-4 text-sm leading-7 text-white/65">{simulator.intro[language]}</p>
          <p className="mt-8 text-xs leading-6 text-white/45">{simulator.disclaimer[language]}</p>
        </div>

        <div className="bg-white/[0.04] p-6 sm:p-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/45">{simulator.chooseProfile[language]}</p>
          {simulator.profiles.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {simulator.profiles.map((profile) => {
                const Icon = profileIcons[profile.icon] ?? BuildingOffice2Icon;
                return (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => setSelected(profile.id)}
                    aria-pressed={selected === profile.id}
                    className={`flex min-h-36 flex-col items-start justify-between rounded-2xl border p-5 text-left transition ${selected === profile.id ? 'border-brand-accent-light bg-white/10 ring-1 ring-brand-accent-light/50' : 'border-white/10 hover:border-white/35 hover:bg-white/[0.04]'}`}
                  >
                    <Icon className="h-6 w-6 text-brand-accent-light" aria-hidden="true" />
                    <span className="mt-5 text-sm font-semibold leading-5">{profile.label[language]}</span>
                    <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">{selected === profile.id ? simulator.selectedProfile[language] : simulator.chooseProcedure[language]}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="rounded-xl border border-white/10 p-4 text-sm text-white/55">{simulator.emptyText[language]}</p>
          )}

          {selectedProfile ? (
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.06] p-5 sm:p-6" aria-live="polite">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent-light">{simulator.procedureHeading[language]}</p>
              <p className="mt-3 text-sm leading-7 text-white/80">{selectedProfile.intro[language]}</p>
              <h3 className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-white/55">{simulator.stepsHeading[language]}</h3>
              <ol className="mt-3 grid gap-3 sm:grid-cols-2">
                {selectedProfile.steps.map((step, index) => (
                  <li key={step.id} className="flex gap-3 text-xs leading-5 text-white/70">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 font-display text-[10px] text-brand-accent-light">{String(index + 1).padStart(2, '0')}</span>
                    <span className="pt-0.5">{step[language]}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 rounded-xl bg-black/20 p-3 text-xs leading-5 text-white/75"><strong className="text-brand-accent-light">{simulator.focusPrefix[language]}</strong>{selectedProfile.focus[language]}</p>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-accent-light transition hover:text-white">
                {simulator.contactCta[language]} <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ) : simulator.profiles.length > 0 ? (
            <p className="mt-5 text-sm text-white/45">{simulator.emptyText[language]}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
