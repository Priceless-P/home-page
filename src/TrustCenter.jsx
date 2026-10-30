import { useEffect, useRef, useState } from 'react';
import Art from './components/Art.jsx';
import Button from './components/Button.jsx';
import Check from './components/icons/Check.jsx';
import Close from './components/icons/Close.jsx';
import ArrowRightUp from './components/icons/ArrowRightUp.jsx';
import DocsLayout from './components/docs/DocsLayout.jsx';
import { DocTable, Section } from './components/docs/DocElements.jsx';
import { soc2Badge } from './lib/art.js';
import {
  CONTROLS,
  DATA_COLLECTED,
  NDA_DOCUMENTS,
  POLICIES,
  POLICY_OWNER,
  SUBPROCESSORS,
  TRUST_CENTER_EMAIL,
  TRUST_CENTER_UPDATED,
} from './data/trustCenter.js';

const PAGE_LINKS = [
  ['overview', 'Overview'],
  ['resources', 'Resources'],
  ['controls', 'Controls'],
  ['subprocessors', 'Subprocessors'],
];

const CONTROL_COUNT = Object.values(CONTROLS).reduce((total, items) => total + items.length, 0);

const CARD = 'flex flex-col gap-2 border border-border-default/70 bg-bg-primary p-5';

const matches = (query, ...fields) =>
  !query || fields.join(' ').toLowerCase().includes(query.trim().toLowerCase());

function NdaBadge() {
  return (
    <span className="shrink-0 bg-bg-info px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-header-default uppercase">
      NDA
    </span>
  );
}

function PolicyCard({ policy, onCopy }) {
  return (
    <article className={CARD}>
      <h4 className="font-medium text-header-default">{policy.title}</h4>
      <p className="text-sm leading-6 text-body-alt">{policy.purpose}</p>
      <div className="mt-2 flex items-center gap-4">
        <a
          href={policy.path}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1 text-sm font-semibold text-header-default hover:opacity-80"
        >
          View <ArrowRightUp />
        </a>
        <button
          type="button"
          onClick={() => onCopy(policy.path)}
          className="text-sm text-body-alt transition-colors hover:text-header-default"
        >
          Copy link
        </button>
      </div>
    </article>
  );
}

function NdaCard({ document: doc, onRequest }) {
  return (
    <article className={CARD}>
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-medium text-header-default">{doc.title}</h4>
        <NdaBadge />
      </div>
      <p className="text-sm leading-6 text-body-alt">{doc.description}</p>
      <button
        type="button"
        onClick={onRequest}
        className="mt-2 w-fit text-sm font-semibold text-header-default hover:opacity-80"
      >
        Request access
      </button>
    </article>
  );
}

const FIELD =
  'w-full border border-border-default bg-bg-default px-3 py-2 text-sm text-header-default focus:border-header-default focus:outline-none';

function NdaModal({ open, onClose, onSubmit }) {
  const dialog = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKeyDown);
    dialog.current?.querySelector('input')?.focus();
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="nda-title"
        className="relative w-full max-w-md bg-bg-default p-6"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-body-alt hover:text-header-default"
        >
          <Close />
        </button>

        <h3 id="nda-title" className="font-heading text-xl font-medium text-header-default">
          Request documents under NDA
        </h3>
        <p className="mt-2 text-sm leading-6 text-body-alt">
          Our SOC 2 Type 2 report, penetration test report and auditor engagement letter are shared
          under NDA. Tell us which you need and we&apos;ll be in touch.
        </p>

        <form className="mt-5 flex flex-col gap-3" onSubmit={onSubmit}>
          <label className="flex flex-col gap-1 text-xs font-medium text-header-default">
            Work email
            <input required type="email" name="email" placeholder="you@company.com" className={FIELD} />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-header-default">
            Company
            <input required type="text" name="company" placeholder="Company name" className={FIELD} />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-header-default">
            Reason for request
            <textarea
              required
              name="reason"
              rows={3}
              placeholder="Which documents, and why (vendor assessment, procurement review, etc.)"
              className={FIELD}
            />
          </label>
          <Button variant="primary" type="submit" label="Submit request" className="w-full" />
          <p className="text-center text-xs text-body-alt">
            Or email{' '}
            <a
              className="underline"
              href={`mailto:${TRUST_CENTER_EMAIL}?subject=Trust%20Center%20Document%20Request`}
            >
              {TRUST_CENTER_EMAIL}
            </a>{' '}
            directly.
          </p>
        </form>
      </div>
    </div>
  );
}

function useToast() {
  const [message, setMessage] = useState('');
  const timer = useRef(null);

  const show = (text) => {
    setMessage(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(''), 1800);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  const node = message && (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 z-100 -translate-x-1/2 bg-btn-bg px-4 py-2.5 text-sm text-btn-text shadow-lg"
    >
      {message}
    </div>
  );

  return [node, show];
}

export default function TrustCenter() {
  const [query, setQuery] = useState('');
  const [ndaOpen, setNdaOpen] = useState(false);
  const [toast, showToast] = useToast();

  const policies = POLICIES.filter((p) => matches(query, p.title, p.purpose));
  const ndaDocs = NDA_DOCUMENTS.filter((d) => matches(query, d.title, d.description));
  const attestations = ndaDocs.filter((d) => d.group === 'attestations');
  const otherResources = ndaDocs.filter((d) => d.group === 'other');

  const copyLink = (path) => {
    navigator.clipboard
      ?.writeText(window.location.origin + path)
      .then(() => showToast('Link copied'))
      .catch(() => showToast('Could not copy link'));
  };

  // Browser-native, as on the standalone page: each PDF opens in its own tab.
  const bulkDownload = () => {
    if (!window.confirm(`Open all ${POLICIES.length} documents in new tabs?`)) return;
    for (const policy of POLICIES) window.open(policy.path, '_blank', 'noopener');
  };

  const submitNda = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    const subject = encodeURIComponent(`Trust Center Document Request: ${data.company || ''}`);
    const body = encodeURIComponent(
      `Email: ${data.email}\nCompany: ${data.company}\nReason: ${data.reason}`,
    );
    window.location.href = `mailto:${TRUST_CENTER_EMAIL}?subject=${subject}&body=${body}`;
    setNdaOpen(false);
    showToast('Request prepared, sending via email');
  };

  return (
    <>
      <DocsLayout
        current="trust-center"
        sections={PAGE_LINKS}
        navigationLabel="Trust center sections"
        hero={
          <section className="relative overflow-hidden bg-bg-default px-6 py-20 lg:px-0 lg:py-2">
            <div className="mx-auto w-full px-3 lg:max-w-[1200px] lg:px-6 xl:px-0">
              <div className="mx-auto flex w-full flex-col items-start justify-between gap-10 py-16 lg:max-w-[1042px] lg:flex-row lg:items-center lg:gap-12">
                <div className="flex max-w-[580px] flex-col gap-[23px]">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium tracking-wide text-body-alt uppercase">
                      Trust &amp; compliance
                    </p>
                    <h1 className="font-heading text-2xl font-medium tracking-tight text-body-alt lg:text-3xl lg:tracking-normal">
                      Stop compromising,{' '}
                      <span className="text-header-default">own every hash.</span>
                    </h1>
                    <p className="max-w-[518px] text-base text-body-alt">
                      DMND empowers 100% of your operation for total sovereignty: miner-side block
                      templates, auditable history, and censorship-resistant profits.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" href="#resources" label="Browse documents" />
                    <Button variant="secondary" href="#controls" label="View controls" />
                  </div>
                </div>

                <Art
                  src={soc2Badge}
                  adaptive
                  loading="eager"
                  fetchPriority="high"
                  className="pointer-events-none h-[140px] w-[108.1px] max-w-none shrink-0 select-none lg:h-[215px] lg:w-[166px]"
                />
              </div>
            </div>
          </section>
        }
        sidebarFooter={
          <div className="mt-8 hidden bg-bg-primary p-4 lg:block">
            <p className="text-sm text-body-alt">Need a document under NDA?</p>
            <button
              type="button"
              onClick={() => setNdaOpen(true)}
              className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-header-default"
            >
              Request access <ArrowRightUp />
            </button>
          </div>
        }
      >
        <Section id="overview" title="Overview">
          <p className="text-sm text-body-alt">Updated {TRUST_CENTER_UPDATED}</p>

          <div>
            <h3 className="text-xs font-semibold tracking-wider text-body-alt uppercase">
              Compliance
            </h3>
            <div className="mt-4 flex w-fit items-center gap-4 border border-border-default/70 bg-bg-primary p-5">
              <div className="flex size-14 items-center justify-center rounded-full border border-border-default/70 bg-bg-default text-center text-[10px] leading-tight font-semibold text-body-alt">
                AICPA
                <br />
                SOC 2
              </div>
              <div>
                <p className="font-medium text-header-default">SOC 2</p>
                <p className="text-sm text-body-alt">AICPA · Type 2</p>
              </div>
            </div>
          </div>

          <div className="border border-border-default/70 bg-bg-primary p-6">
            <h3 className="font-medium text-header-default">Data and privacy</h3>
            <p className="mt-1 text-sm text-body-alt">Types of customer data DMND processes.</p>
            <ul className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              {DATA_COLLECTED.map(([label, collected]) => (
                <li
                  key={label}
                  className={collected ? 'flex items-center gap-2 text-body-default' : 'flex items-center gap-2 text-body-alt'}
                >
                  <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-bg-default text-header-default">
                    {collected ? <Check /> : <Close />}
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="resources" title="Resources">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              size="small"
              label="Bulk download"
              onClick={bulkDownload}
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search resources"
              aria-label="Search resources"
              className={`${FIELD} sm:w-64`}
            />
          </div>

          <div>
            <h3 className="font-medium text-header-default">3rd Party Attestations</h3>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {attestations.map((doc) => (
                <NdaCard key={doc.title} document={doc} onRequest={() => setNdaOpen(true)} />
              ))}
            </div>
            {attestations.length === 0 && <p className="mt-4 text-sm text-body-alt">No matches.</p>}
          </div>

          <div>
            <h3 className="font-medium text-header-default">Information Security Policies</h3>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {policies.map((policy) => (
                <PolicyCard key={policy.path} policy={policy} onCopy={copyLink} />
              ))}
            </div>
            {policies.length === 0 && <p className="mt-4 text-sm text-body-alt">No matches.</p>}
            <p className="mt-4 text-xs text-body-alt">
              Policy owner across all DMND policies: <strong>{POLICY_OWNER}</strong>
            </p>
          </div>

          <div>
            <h3 className="font-medium text-header-default">Other resources</h3>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {otherResources.map((doc) => (
                <NdaCard key={doc.title} document={doc} onRequest={() => setNdaOpen(true)} />
              ))}
            </div>
            {otherResources.length === 0 && (
              <p className="mt-4 text-sm text-body-alt">No matches.</p>
            )}
          </div>
        </Section>

        <Section id="controls" title="Controls">
          <p>
            DMND&apos;s {CONTROL_COUNT} active controls grouped by domain, tested as part of our SOC
            2 Type 2 audit. Updated {TRUST_CENTER_UPDATED}.
          </p>

          {Object.entries(CONTROLS).map(([domain, items]) => (
            <div key={domain} className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-medium text-header-default">{domain}</h3>
                <span className="text-xs text-body-alt">
                  {items.length} control{items.length === 1 ? '' : 's'}
                </span>
              </div>
              <DocTable
                headers={['Control', 'Description', 'Status']}
                rows={items.map(([name, description]) => [
                  <span key="control" className="font-medium text-header-default">{name}</span>,
                  description,
                  <span key="status" className="inline-flex items-center gap-1 text-header-default">
                    <Check />
                    <span className="sr-only">Active</span>
                  </span>,
                ])}
              />
            </div>
          ))}
        </Section>

        <Section id="subprocessors" title="Subprocessors">
          <p>{SUBPROCESSORS.length} active subprocessors.</p>
          <DocTable
            headers={['Name', 'Category', 'Country', 'Description', 'URL']}
            rows={SUBPROCESSORS.map((s) => [
              <span key="name" className="font-medium whitespace-nowrap text-header-default">{s.name}</span>,
              s.category,
              s.country,
              s.description,
              <a
                key="url"
                href={s.url}
                target="_blank"
                rel="noopener"
                className="whitespace-nowrap text-header-default underline"
              >
                {s.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </a>,
            ])}
          />
        </Section>
      </DocsLayout>

      <NdaModal open={ndaOpen} onClose={() => setNdaOpen(false)} onSubmit={submitNda} />
      {toast}
    </>
  );
}
