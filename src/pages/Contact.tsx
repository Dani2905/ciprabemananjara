import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRightIcon, EnvelopeIcon, MapPinIcon, PaperAirplaneIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { CmsApiError, submitContactForm } from '../lib/cmsApi';
import { getSitePagesContent, type SitePagesContent } from '../data/sitePages';

export default function Contact() {
  const { i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');
  const language = isFr ? 'fr' : 'en';
  const [pages, setPages] = useState<SitePagesContent>(getSitePagesContent);
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contact = pages.contact;
  const contactEmail = pages.contact.email.trim() || 'contact@rabemananjara.mg';
  const isApiContactMode = import.meta.env.VITE_CMS_MODE === 'api';
  const phoneLink = contact.phone.replace(/[^\d+]/g, '');

  useEffect(() => {
    const refresh = () => setPages(getSitePagesContent());
    window.addEventListener('sitePagesUpdated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('sitePagesUpdated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    if (isApiContactMode) {
      setIsSubmitting(true);
      setStatus('');
      try {
        const result = await submitContactForm({
          name: String(form.get('name') ?? ''),
          email: String(form.get('email') ?? ''),
          subject: String(form.get('subject') ?? ''),
          message: String(form.get('message') ?? ''),
          website: String(form.get('website') ?? ''),
        });
        setStatus(result.reference ? `${contact.formSent[language]} Réf. ${result.reference}.` : contact.formSent[language]);
        formElement.reset();
      } catch (error) {
        if (error instanceof CmsApiError && error.code === 'contact_not_configured') {
          setStatus(contact.formNotConfigured[language]);
        } else if (error instanceof CmsApiError && error.code === 'too_many_contact_requests') {
          setStatus(contact.formTooMany[language]);
        } else if (error instanceof CmsApiError && error.code === 'invalid_contact_request') {
          setStatus(contact.formInvalid[language]);
        } else {
          setStatus(contact.formDeliveryFailed[language]);
        }
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (!contactEmail) {
      setStatus(contact.formNotConfigured[language]);
      return;
    }
    const subject = encodeURIComponent(String(form.get('subject') || contact.title[language]));
    const body = encodeURIComponent(
      `${contact.formName[language]}: ${form.get('name')}\n${contact.formEmail[language]}: ${form.get('email')}\n\n${form.get('message')}`,
    );
    setStatus(contact.formEmailReady[language]);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <main className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <section className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">{contact.eyebrow[language]}</p>
        <div className="mt-5 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h1 className="text-5xl font-light leading-[1.06] sm:text-6xl">{contact.title[language]}</h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-gray-600">{contact.intro[language]}</p>
            <div className="mt-10 space-y-4">
              <div className="flex items-start gap-4 rounded-2xl border border-brand-border bg-white p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-surface text-brand-accent"><MapPinIcon className="h-[18px] w-[18px]" aria-hidden="true" /></span>
                <div><p className="font-semibold">{contact.addressLabel[language]}</p><p className="mt-1 text-sm text-gray-600">{contact.address[language]}</p></div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-brand-border bg-white p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-surface text-brand-accent"><PhoneIcon className="h-[18px] w-[18px]" aria-hidden="true" /></span>
                <div><p className="font-semibold">{contact.phoneLabel[language]}</p><a href={`tel:${phoneLink}`} className="mt-1 inline-block text-sm text-brand-accent underline decoration-brand-accent/40 underline-offset-4">{contact.phone}</a></div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-brand-border bg-white p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-surface text-brand-accent"><EnvelopeIcon className="h-[18px] w-[18px]" aria-hidden="true" /></span>
                <div><p className="font-semibold">{contact.emailLabel[language]}</p><a href={`mailto:${contactEmail}`} className="mt-1 inline-block text-sm text-brand-accent underline decoration-brand-accent/40 underline-offset-4">{contactEmail}</a></div>
              </div>
            </div>
            <p className="mt-6 text-xs leading-6 text-gray-500">{contact.supportNote[language]}</p>
          </div>

          <div className="rounded-[2rem] border border-brand-border bg-white p-6 shadow-sm sm:p-9">
            <form onSubmit={handleSubmit} aria-busy={isSubmitting} className="space-y-5">
              <label aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium text-gray-700">{contact.formName[language]}
                  <input required name="name" autoComplete="name" maxLength={120} className="mt-2 w-full rounded-xl border border-brand-border bg-brand-white px-4 py-3 text-sm outline-none transition focus:border-brand-accent" />
                </label>
                <label className="block text-sm font-medium text-gray-700">{contact.formEmail[language]}
                  <input required name="email" type="email" autoComplete="email" maxLength={254} className="mt-2 w-full rounded-xl border border-brand-border bg-brand-white px-4 py-3 text-sm outline-none transition focus:border-brand-accent" />
                </label>
              </div>
              <label className="block text-sm font-medium text-gray-700">{contact.formSubject[language]}
                <input required name="subject" maxLength={180} className="mt-2 w-full rounded-xl border border-brand-border bg-brand-white px-4 py-3 text-sm outline-none transition focus:border-brand-accent" />
              </label>
              <label className="block text-sm font-medium text-gray-700">{contact.formMessage[language]}
                <textarea required name="message" maxLength={5000} minLength={5} rows={6} className="mt-2 w-full resize-y rounded-xl border border-brand-border bg-brand-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-brand-accent" />
              </label>
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-full bg-brand-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-brand-accent disabled:cursor-wait disabled:opacity-60">
                {isSubmitting ? contact.formSending[language] : (isApiContactMode ? contact.formSend[language] : contact.formPrepare[language])} <PaperAirplaneIcon className="h-4 w-4" aria-hidden="true" />
              </button>
              {status && <p role="status" aria-live="polite" className="rounded-xl bg-brand-surface p-4 text-sm leading-6 text-gray-700">{status}</p>}
              <p className="text-xs leading-5 text-gray-500">{isApiContactMode ? contact.formApiNote[language] : contact.formDemoNote[language]}</p>
            </form>
          </div>
        </div>
      </section>
      <div className="mx-auto mt-16 max-w-6xl rounded-2xl bg-brand-surface p-6 text-sm leading-7 text-gray-600">
        {contact.urgentNote[language]}
        <ArrowUpRightIcon className="ml-1 inline h-4 w-4 text-brand-accent" aria-hidden="true" />
      </div>
    </main>
  );
}
