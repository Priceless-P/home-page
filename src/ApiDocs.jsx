import Button from './components/Button.jsx';
import Art from './components/Art.jsx';
import ArrowRightUp from './components/icons/ArrowRightUp.jsx';
import DocsLayout from './components/docs/DocsLayout.jsx';
import { CodeBlock, DocTable, Endpoint, InlineCode, Section } from './components/docs/DocElements.jsx';
import { LINKS } from './config/links.js';
import { serverRack } from './lib/art.js';

const PAGE_LINKS = [
  ['quick-start', 'Quick start'],
  ['api-keys', 'API keys & permissions'],
  ['endpoints', 'Choose an endpoint'],
  ['hashrate', 'Hashrate'],
  ['workers', 'Workers'],
  ['shares-fees', 'Shares & fees'],
  ['earnings', 'Estimated earnings'],
  ['payouts', 'Confirmed payouts'],
  ['subaccounts', 'Subaccounts'],
  ['polling', 'Polling & limits'],
  ['errors', 'Errors & troubleshooting'],
  ['values', 'Reading the values'],
];

const PYTHON_EXAMPLE = `import json
import os
import urllib.request

request = urllib.request.Request(
    "https://api.dmnd.work/api/v1/user/hashrate",
    headers={
        "Authorization": "Bearer " + os.environ["DEMAND_MONITORING_TOKEN"],
        "Accept": "application/json",
    },
)
with urllib.request.urlopen(request, timeout=20) as response:
    snapshot = json.load(response)
print(snapshot)`;

const HASHRATE_RESPONSE = `{
  "account_id": "9223372036854775807",
  "observed_at": "2026-09-08T10:00:00Z",
  "pplns_hashrate": 150000000000000,
  "fpps_hashrate": 50000000000000,
  "total_hashrate": 200000000000000
}`;

const PAYOUT_RESPONSE = `{
  "payouts": [
    {
      "txid": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
      "output_index": 2,
      "kind": "fpps",
      "address": "<recorded Bitcoin address>",
      "amount_sats": 125000,
      "confirmed_at": 1788912000
    }
  ],
  "next_cursor": null,
  "as_of": 1788912300,
  "from": "2026-09-01",
  "to": "2026-09-09"
}`;

const SUBACCOUNT_RESPONSE = `{
  "account_id": "1234567890123456789",
  "observed_at": "2026-09-08T10:00:00Z",
  "pplns_hashrate": {"value": 150.0, "unit": "TH/s"},
  "fpps_hashrate": {"value": 50.0, "unit": "TH/s"},
  "total_hashrate": {"value": 200.0, "unit": "TH/s"}
}`;

export default function ApiDocs() {
  return (
    <DocsLayout
      current="api"
      sections={PAGE_LINKS}
      navigationLabel="Documentation sections"
      hero={
        <section className="relative overflow-hidden bg-bg-default px-6 py-20 lg:px-0 lg:py-2">
          <div className="mx-auto w-full px-3 lg:max-w-[1200px] lg:px-6 xl:px-0">
            <div className="mx-auto flex w-full flex-col items-start justify-between gap-10 py-16 lg:max-w-[1042px] lg:flex-row lg:items-center lg:gap-12">
              <div className="flex max-w-[580px] flex-col gap-[23px]">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium tracking-wide text-body-alt uppercase">
                    Monitoring API
                  </p>
                  <h1 className="font-heading text-2xl font-medium tracking-tight text-body-alt lg:text-3xl lg:tracking-normal">
                    Your mining data, <span className="text-header-default">connected.</span>
                  </h1>
                  <p className="max-w-[518px] text-base text-body-alt">
                    Bring your DMND hashrate, workers, earnings, and payouts into the tools you already
                    use. Here’s how to get started.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" href="#quick-start" label="View request example" />
                  <Button variant="secondary" href="#endpoints" label="Explore the endpoints" />
                </div>
              </div>

              <Art
                src={serverRack}
                adaptive
                width={470}
                height={358}
                loading="eager"
                fetchPriority="high"
                className="api-hero-art pointer-events-none h-[286px] w-[350px] max-w-none shrink-0 select-none lg:h-[358px] lg:w-[470px]"
              />
            </div>
          </div>
        </section>
      }
      sidebarFooter={
        <div className="mt-8 hidden bg-bg-primary p-4 lg:block">
          <p className="text-sm text-body-alt">Need an API key?</p>
          <a
            href={LINKS.startMining}
            className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-header-default"
          >
            Open your dashboard <ArrowRightUp />
          </a>
        </div>
      }
    >
      <Section id="quick-start" title="Example API request">
        <p>
          The monitoring API lets your software read your mining activity automatically:
          account hashrate, worker status, share statistics, fees, estimated earnings, and
          confirmed payout-output history. Access is read-only.
        </p>
        <CodeBlock label="Base URL · the start of every request">
          https://api.dmnd.work/api/v1
        </CodeBlock>
        <p>This Python example reads the latest account hashrate. It uses:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>A dedicated monitoring token created for the exact account in API Keys.</li>
          <li>The <InlineCode>hashrate_read</InlineCode> permission.</li>
          <li>
            A secret manager that supplies the token as{' '}
            <InlineCode>DEMAND_MONITORING_TOKEN</InlineCode>.
          </li>
        </ul>
        <CodeBlock label="Python · no extra packages needed" language="python">
          {PYTHON_EXAMPLE}
        </CodeBlock>
        <p>
          The example makes one request, sets a timeout, prints the decoded response, and
          never logs the token. It does not retry. Add error handling and follow the polling
          guidance before scheduling repeated requests.
        </p>
        <p>
          The response contains your account ID, an <InlineCode>observed_at</InlineCode>{' '}
          timestamp, and separate PPLNS, FPPS, and total rates.
        </p>
      </Section>

      <Section id="api-keys" title="API keys & permissions">
        <p>
          A monitoring token is a secret that tells DMND which account and data your tool may
          access. Send it in the <InlineCode>Authorization</InlineCode> header on every request.
        </p>
        <CodeBlock label="Request header · replace the placeholder in your client" language="http">
          Authorization: Bearer &lt;token&gt;
        </CodeBlock>
        <p>
          Create a dedicated key in the dashboard, selecting the exact account and only the
          required scopes. Mining tokens and FPPS credentials do not work here. Clients should
          send no session cookies; when both are supplied, the bearer token decides the account
          and permissions.
        </p>
        <DocTable
          headers={['Permission (scope)', 'What it lets you read']}
          rows={[
            ['hashrate_read', 'Current and historical PPLNS, FPPS, and total hashrate.'],
            ['workers_read', 'Worker names, online status, hashrates, and accepted/rejected counters.'],
            ['rejects_read', 'Accepted and rejected share counter changes over a time window.'],
            ['fees_read', 'Pool and broker fee rates.'],
            ['earnings_read', 'Generated FPPS BTC, projected PPLNS BTC, and confirmed payout history.'],
          ]}
        />
        <p>
          Keep tokens private and give each key only the permissions needed. Versioned routes
          reject query-string credentials. Worker names and earnings can expose business
          activity; treat watcher links as secrets and keep credentials and sensitive responses
          out of logs, traces, alerts, support tickets, and link previews.
        </p>
        <h3 className="font-heading text-xl font-medium text-header-default">
          Expiry, replacement keys, and older integrations
        </h3>
        <p>
          Tokens have no expiration by default, though owners may set a future expiry. Each
          target account supports at most 100 active tokens. Create and verify a replacement
          before revoking an old key; already-authenticated requests may finish after revocation.
        </p>
        <p>
          Token creation and revocation happen in the signed-in dashboard. The dashboard can
          retrieve available secrets and watcher links. Only active dedicated monitoring-key
          records authenticate, including preserved historical keys.
        </p>
        <p>
          Legacy unversioned <InlineCode>/api</InlineCode> monitoring GET routes may accept one
          <InlineCode>token</InlineCode> query parameter for existing watcher workflows. Do not
          use this for new integrations. Duplicate credentials, mixed header/query credentials,
          and all query credentials on <InlineCode>/api/v1</InlineCode> are rejected.
        </p>
      </Section>

      <Section id="endpoints" title="Choose what you want to read">
        <p>
          Every path is relative to <InlineCode>https://api.dmnd.work/api/v1</InlineCode>. All
          endpoints use GET.
        </p>
        <DocTable
          headers={['I want to…', 'GET path', 'Permission']}
          rows={[
            ['Check current hashrate', '/user/hashrate', 'hashrate_read'],
            ['Chart past hashrate', '/user/hashrate/historical', 'hashrate_read'],
            ['List live workers', '/workers', 'workers_read'],
            ['Include offline workers', '/workers/all', 'workers_read'],
            ['Check accepted / rejected shares', '/user/share_stats', 'rejects_read'],
            ['Look up my fee rates', '/user/fees', 'fees_read'],
            ['Read daily estimated earnings', '/user/generated_btc', 'earnings_read'],
            ['Read confirmed payout outputs', '/user/payouts', 'earnings_read'],
          ]}
        />
        <p>
          These routes read the token’s account. Earnings and payouts include directly owned
          subaccounts. Use subaccount routes to select one exact account.
        </p>
        <p>
          Detailed PPLNS projections and the combined dashboard summary remain dashboard
          interfaces. Mining telemetry, payment initiation, registration, and session
          management are outside this API.
        </p>
      </Section>

      <Section id="hashrate" title="Hashrate">
        <Endpoint path="/user/hashrate" scope="hashrate_read">
          <p>
            Reads the latest account snapshot with separate PPLNS, FPPS, and total rates in raw
            hashes per second (H/s).
          </p>
        </Endpoint>
        <CodeBlock label="Example response" language="json">
          {HASHRATE_RESPONSE}
        </CodeBlock>
        <p>
          Snapshots are normally saved every two minutes from fresh worker telemetry. A worker
          is online while its latest telemetry is less than ten minutes old. Periodic snapshots
          can differ from an instantaneous miner reading.
        </p>
        <p>
          Check <InlineCode>observed_at</InlineCode> to distinguish stale collection from low
          hashrate. Before the first snapshot it is null and all rates are zero.
        </p>
        <h3 className="font-heading text-xl font-medium text-header-default">Looking back in time</h3>
        <Endpoint path="/user/hashrate/historical">
          <p>
            Returns snapshots in ascending timestamp order. <InlineCode>from</InlineCode> and{' '}
            <InlineCode>to</InlineCode> accept RFC3339 timestamps or UTC dates and default to the
            last 24 hours.
          </p>
        </Endpoint>
        <DocTable
          headers={['Parameter', 'How to use it']}
          rows={[
            ['from', 'Start timestamp or UTC date. A date begins at 00:00:00 UTC.'],
            ['to', 'End timestamp or UTC date. A date ends at 23:59:59 UTC.'],
          ]}
        />
        <p>
          A request covers at most seven days and returns at most 6,000 points. Roughly 100
          days are retained. Collect longer histories through fixed successive windows and
          remove duplicate boundary timestamps. An empty array means no snapshots exist in the
          requested window.
        </p>
      </Section>

      <Section id="workers" title="Workers">
        <Endpoint path="/workers · /workers/all" scope="workers_read">
          <p>
            Use <InlineCode>/workers</InlineCode> for live workers or{' '}
            <InlineCode>/workers/all</InlineCode> to include offline workers. Pages contain 200
            workers by default; <InlineCode>limit</InlineCode> supports up to 1,000.
          </p>
        </Endpoint>
        <p>
          Responses use <InlineCode>{'{"workers": [...], "next_cursor": "..."}'}</InlineCode>.
          Pass <InlineCode>next_cursor</InlineCode> back unchanged as{' '}
          <InlineCode>cursor</InlineCode>. It is opaque; null means the final page.
        </p>
        <DocTable
          headers={['Field', 'What it means']}
          rows={[
            ['name', 'The worker name.'],
            ['is_connected', 'Whether the worker is online.'],
            ['connected_at', 'Unix timestamp in milliseconds, or null.'],
            ['hashrate, fpps_hashrate', 'Raw H/s, including on subaccount worker routes.'],
            ['total_shares, rejected_shares', 'PPLNS counters; FPPS equivalents begin with fpps_.'],
          ]}
        />
        <p>
          Missing telemetry for a payout mode is null. Counters can reset, disconnected miners
          can affect changes between readings, and the worker list can change while pages are
          being fetched.
        </p>
      </Section>

      <Section id="shares-fees" title="Shares & fees">
        <h3 className="font-heading text-xl font-medium text-header-default">
          Check your rejection rate
        </h3>
        <Endpoint path="/user/share_stats?hours=24" scope="rejects_read">
          <p>
            Reports changes in accepted and rejected counters over a selected window.{' '}
            <InlineCode>hours</InlineCode> defaults to 24 and supports at most 168 hours.
          </p>
        </Endpoint>
        <p>
          The response contains <InlineCode>window_hours</InlineCode>, PPLNS and FPPS accepted
          and rejected counts, plus combined <InlineCode>accepted</InlineCode> and{' '}
          <InlineCode>rejected</InlineCode> values. Calculate the rejection ratio as rejected /
          (accepted + rejected) only when the denominator is non-zero. These values come from
          telemetry counter changes rather than an immutable record of every raw share.
        </p>
        <h3 className="font-heading text-xl font-medium text-header-default">
          Read your pool and broker fees
        </h3>
        <Endpoint path="/user/fees" scope="fees_read">
          <p>
            Returns <InlineCode>pool_fee</InlineCode> and <InlineCode>broker_fee</InlineCode> as
            fractions; <InlineCode>0.02</InlineCode> means 2%.
          </p>
        </Endpoint>
      </Section>

      <Section id="earnings" title="Estimated earnings, day by day">
        <Endpoint path="/user/generated_btc" scope="earnings_read · includes directly owned subaccounts">
          <p>
            Returns daily generated FPPS BTC and projected PPLNS BTC, newest day first. Every
            day is measured in UTC.
          </p>
        </Endpoint>
        <p>
          Estimated earnings are not confirmed payments. PPLNS projections can change and
          exclude amounts already earned from found blocks. The combined total is not a paid
          balance, payout guarantee, or settled accounting record; confirmed payout history is
          the source for transaction outputs.
        </p>
        <DocTable
          headers={['Parameter', 'How to use it']}
          rows={[
            ['date', 'One UTC day (YYYY-MM-DD). Do not combine with before or limit.'],
            ['before', 'Last UTC day to include, inclusive. Defaults to today.'],
            ['limit', 'Calendar days, not rows. Defaults to 30; maximum 100.'],
          ]}
        />
        <DocTable
          headers={['Field', 'What it means']}
          rows={[
            ['entry_day', 'Work day in YYYY-MM-DD UTC.'],
            ['fpps_btc_generated', 'Generated FPPS earnings in BTC.'],
            ['pplns_btc_generated', 'Cached future PPLNS projected BTC for the work day.'],
            ['btc_generated', 'Sum of FPPS and projected PPLNS values.'],
            ['hashrate', 'FPPS-derived daily H/s; zero for PPLNS-only days.'],
            ['pplns_hashrate', 'PPLNS H/s from accepted-share work; null means unavailable.'],
          ]}
        />
        <h3 className="font-heading text-xl font-medium text-header-default">
          Collecting older earnings
        </h3>
        <p>
          Request preceding calendar windows to collect older data. Missing mining days are
          omitted and do not imply that older data is unavailable. A request for one specific
          date with no earnings returns one zero-earnings row; its PPLNS rate still follows the
          separate recorded-work availability rules. The FPPS accumulator normally runs every
          five minutes.
        </p>
        <h3 className="font-heading text-xl font-medium text-header-default">
          Why PPLNS hashrate can be null
        </h3>
        <p>
          Keep null distinct from zero. Zero means a covered day was read successfully with no
          recorded PPLNS work. Null means unavailable because of age, incomplete coverage, or a
          temporary refresh problem. Unavailable values are never reported as zero.
        </p>
        <p>
          Coverage spans today and the previous 99 UTC days, starting no earlier than the first
          complete UTC day after the explicit-UTC timestamp migration. Older earnings remain
          available with a null PPLNS rate. Recorded work alone does not create an earnings row.
        </p>
        <p>
          Rates use accepted shares grouped by the UTC day recorded by the database. Delayed
          ingestion can move work to a later day; miner-supplied <InlineCode>ntime</InlineCode>
          does not choose the day. Completed days use{' '}
          <InlineCode>sum(difficulty) * 2^32 / 86400</InlineCode>; today uses elapsed whole
          seconds since UTC midnight. Values are rounded to two decimal places.
        </p>
        <p>
          This differs from worker telemetry, PPLNS reward-window difficulty, and the
          FPPS-derived hashrate field. For current monitoring, request today every two to five
          minutes. For older data use smaller windows and wait at least 60 seconds before
          retrying missing rates.
        </p>
        <p>
          Supplemental rates are cached for 60 seconds with up to 128 account/range entries,
          one concurrent refresh per server, and three attempts per target account per minute.
          Ownership is checked before cache lookup. Refreshes have a five-second SQL deadline;
          busy refreshes, exhausted budgets, errors, and invalid work return null without
          failing the earnings response. Failures are cached for 60 seconds.
        </p>
        <p>
          Unversioned dashboard earnings routes return all available history when parameters
          are omitted. New <InlineCode>/api/v1</InlineCode> integrations use bounded defaults.
        </p>
      </Section>

      <Section id="payouts" title="Confirmed payouts">
        <Endpoint path="/user/payouts" scope="earnings_read · includes directly owned subaccounts">
          <p>
            Reads confirmed FPPS and PPLNS outputs sent to recorded Bitcoin addresses, including
            inactive addresses. It excludes unrelated recipients, funding-address returns,
            unrelated deposits, and unconfirmed transactions. It never initiates payments or
            changes payout addresses.
          </p>
        </Endpoint>
        <p>
          This is address-associated history, not an ownership ledger. Address records have no
          effective ownership dates. If an address is also recorded against an account outside
          the requested group, the entire request returns{' '}
          <InlineCode>409 payouts-ambiguous-address</InlineCode> instead of guessing.
        </p>
        <DocTable
          headers={['Parameter', 'How to use it']}
          rows={[
            ['from, to', 'Inclusive UTC dates. Defaults to a 30-day window ending today; maximum 30 days.'],
            ['limit', 'Outputs per page, 1–100. Defaults to 100.'],
            ['cursor', 'Previous next_cursor unchanged; retain the same dates and target.'],
          ]}
        />
        <CodeBlock label="Example URL · use the same Bearer header">
          https://api.dmnd.work/api/v1/user/payouts?from=2026-09-01&to=2026-09-09&limit=100
        </CodeBlock>
        <CodeBlock label="Example response" language="json">
          {PAYOUT_RESPONSE}
        </CodeBlock>
        <ul className="list-disc space-y-2 pl-6">
          <li><InlineCode>amount_sats</InlineCode> is an integer, never floating-point BTC.</li>
          <li>Transaction ID and zero-based output index identify one unique output.</li>
          <li><InlineCode>kind</InlineCode> is <InlineCode>fpps</InlineCode> or <InlineCode>pplns</InlineCode>.</li>
          <li>Confirmed and snapshot timestamps are Unix seconds.</li>
          <li>A null next cursor marks the final page; rows sort newest first.</li>
        </ul>
        <p>
          An empty page means no matching outputs or no recorded recipient addresses. Failed or
          incomplete provider reads return errors rather than successful partial history.
        </p>
        <h3 className="font-heading text-xl font-medium text-header-default">
          When a payout snapshot changes
        </h3>
        <p>
          Bitcoin confirmations can change after a reorganization. On{' '}
          <InlineCode>409 payouts-cursor-changed</InlineCode>, restart the fixed window without a
          cursor and reconcile results using transaction ID and output index. Funding snapshots,
          requested dates, target accounts, or recipient-address changes can invalidate cursors.
        </p>
        <h3 className="font-heading text-xl font-medium text-header-default">
          Refresh limits and history coverage
        </h3>
        <p>
          Poll every few minutes, reuse collected pages, backfill fixed windows, and allow for a
          20-second provider deadline plus authentication and database time. Chain snapshots are
          cached up to 60 seconds, four windows per process. One provider fill runs at once, with
          at most six uncached windows per fixed minute. Follow <InlineCode>Retry-After</InlineCode>
          after a 429.
        </p>
        <p>
          Provider reads are capped at 20 pages per funding source, 1 MiB per upstream response,
          and 50,000 outputs per window. Older windows can hit scan depth even with few payouts.
          Missing configuration, provider failures, timeouts, incomplete scans, or inconsistent
          data return 503. Fresh history is required after cache expiry; stale results are not
          served when refresh fails.
        </p>
        <p>
          Funding inputs must match configured sources or the historical FPPS source{' '}
          <InlineCode>bc1qwk7rplr3ztrsvlcxujnxdvp77atpqawlh94wgw</InlineCode>. Authorized
          outputs are deduplicated. Payout-history endpoints exist only under{' '}
          <InlineCode>/api/v1</InlineCode>; address discovery and watcher links are separate.
        </p>
      </Section>

      <Section id="subaccounts" title="Monitoring subaccounts">
        <p>
          A token can read its own account and directly owned subaccounts when its selected
          permissions allow it. A key created for a subaccount cannot read its master account
          or sibling subaccounts.
        </p>
        <p>
          Replace <InlineCode>{'{id}'}</InlineCode> with the exact account ID. These routes
          select only that account and do not include any subaccounts it owns. Keep account IDs
          as strings: they are decimal strings, can be negative, and must not be converted to
          JavaScript numbers.
        </p>
        <DocTable
          headers={['GET path · exact target only', 'Permission']}
          rows={[
            ['/user/sub_account/{id}/hashrate', 'hashrate_read'],
            ['/user/sub_account/{id}/hashrate/historical', 'hashrate_read'],
            ['/user/sub_account/{id}/workers', 'workers_read'],
            ['/user/sub_account/{id}/share_stats', 'rejects_read'],
            ['/user/sub_account/{id}/fees', 'fees_read'],
            ['/user/sub_account/{id}/generated_btc', 'earnings_read'],
            ['/user/sub_account/{id}/payouts', 'earnings_read'],
          ]}
        />
        <h3 className="font-heading text-xl font-medium text-header-default">
          One important difference: hashrate units
        </h3>
        <p>
          Current and historical subaccount hashrate routes return each rate as a rounded{' '}
          <InlineCode>value</InlineCode>/<InlineCode>unit</InlineCode> object in TH/s or PH/s.
          Worker hashrates remain raw H/s.
        </p>
        <CodeBlock label="Example subaccount hashrate response" language="json">
          {SUBACCOUNT_RESPONSE}
        </CodeBlock>
        <p>
          An output sent to an address shared only inside an aggregate account group may appear
          in that group’s history, and each transaction ID/output-index pair appears once. An
          exact-account request returns <InlineCode>409 payouts-ambiguous-address</InlineCode>
          when the address has another recorded owner outside the selected target.
        </p>
      </Section>

      <Section id="polling" title="How often should I check?">
        <p>
          Poll current statistics every two to five minutes to match the snapshot cadence.
          Payouts can also be checked every few minutes.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Store collected data in your monitoring system and fetch only what you need.</li>
          <li>Stagger requests across accounts and limit concurrent requests.</li>
          <li>Set connection and request timeouts, allowing extra time for payout lookups.</li>
        </ul>
        <DocTable
          headers={['Budget', 'Requests', 'Shared by']}
          rows={[
            ['Per token', '240', 'All requests made with that token.'],
            ['Per token account', '600', 'All tokens for the same account.'],
            ['Per client IP', '1,200', 'Requests from that IP across protected API paths.'],
          ]}
        />
        <p>
          Budgets apply per server process and are not a guaranteed cluster-wide allowance.
          Payout lookups have additional limits, and edge protection or temporary capacity can
          reject traffic earlier. Always honor a 429 response. Supplemental PPLNS-rate refresh
          limits return null instead of failing the earnings response.
        </p>
        <p>
          When asked to slow down, wait at least the number of seconds in the{' '}
          <InlineCode>Retry-After</InlineCode> header, then add a small random delay.
        </p>
        <p>
          Account responses use <InlineCode>Cache-Control: private, no-store</InlineCode>. Never
          put bearer headers, API secrets, watcher links, or credential-creation responses in
          request logs, traces, or alerts.
        </p>
      </Section>

      <Section id="errors" title="When a request doesn’t work">
        <p>
          Error responses are JSON objects with string <InlineCode>code</InlineCode> and{' '}
          <InlineCode>message</InlineCode> fields. Use the HTTP status to decide whether to
          retry; diagnostic messages may change.
        </p>
        <DocTable
          headers={['HTTP status', 'What it means', 'What to do']}
          rows={[
            ['200', 'The request succeeded.', 'Read the result; empty data may be valid.'],
            ['400', 'Parameters, URL credentials, or limits are invalid.', 'Correct the request before retrying.'],
            ['401', 'The key is missing, invalid, revoked, or expired.', 'Check the bearer header and key; do not retry unchanged.'],
            ['403', 'The key lacks a scope or access to the account.', 'Check permissions and account access; do not retry unchanged.'],
            ['404', 'The endpoint or resource is unavailable.', 'Check the base URL, path, and requested resource.'],
            ['409', 'Payout attribution is ambiguous or the snapshot changed.', 'Use the error code and payout guidance below.'],
            ['429', 'A request or capacity budget was reached.', 'Wait for Retry-After plus a small random delay.'],
            ['500 / 503', 'The backend failed or is temporarily unavailable.', 'Retry transient failures with bounded exponential backoff.'],
          ]}
        />
        <h3 className="font-heading text-xl font-medium text-header-default">
          Two payout errors to handle differently
        </h3>
        <p>
          <InlineCode>payouts-ambiguous-address</InlineCode> means an address is also recorded
          against an account outside the requested group. The complete request returns 409
          rather than guessing attribution or silently omitting the address.
        </p>
        <p>
          <InlineCode>payouts-cursor-changed</InlineCode> means the pagination snapshot or
          request context changed. Restart the same fixed window without a cursor, then
          reconcile saved outputs with the replacement results.
        </p>
        <p>
          Retry transient server failures with bounded exponential backoff, and honor{' '}
          <InlineCode>Retry-After</InlineCode> when present. Do not repeatedly retry unchanged
          400, 401, or 403 responses.
        </p>
        <h3 className="font-heading text-xl font-medium text-header-default">
          Versioning and compatibility
        </h3>
        <p>
          Ignore response fields your client does not recognize. New fields may be added within
          v1; incompatible response or authentication changes require a new version and a
          documented migration. This interface does not imply an availability SLA.
        </p>
      </Section>

      <Section id="values" title="Reading the values">
        <dl className="grid gap-8 sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-header-default">Account and subaccount hashrate</dt>
            <dd className="mt-2">
              Account endpoints return raw H/s. Subaccount hashrate routes return rounded TH/s
              or PH/s value/unit objects. Worker rates remain raw H/s on both route families.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-header-default">Estimated earnings and payouts</dt>
            <dd className="mt-2">
              Generated-BTC combines generated FPPS BTC with cached future PPLNS projections.
              It is not a settled balance or payment promise. Payout history reports confirmed
              outputs associated with recorded addresses.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-header-default">Dates and timestamps</dt>
            <dd className="mt-2">
              Earnings days and payout windows use UTC. Worker connection times use Unix
              milliseconds; payout confirmation and snapshot times use Unix seconds.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-header-default">Missing PPLNS hashrate</dt>
            <dd className="mt-2">
              In earnings rows, null means unavailable. Zero means a covered day was read and
              contained no recorded work. Never replace null with zero.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-header-default">Pages of results</dt>
            <dd className="mt-2">
              Worker and payout responses use <InlineCode>next_cursor</InlineCode>; null marks
              the last page. Earnings use calendar-day windows instead.
            </dd>
          </div>
        </dl>
        <div className="mt-4 border border-border-default/70 bg-bg-primary p-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <h3 className="font-heading text-xl font-medium text-header-default">
              Monitoring keys are managed in the dashboard.
            </h3>
            <p className="mt-2">
              The request example uses a key with <InlineCode>hashrate_read</InlineCode> to read
              the account’s latest hashrate.
            </p>
          </div>
          <a
            href={LINKS.startMining}
            className="mt-5 inline-flex shrink-0 items-center gap-1 font-semibold text-header-default transition-colors hover:text-blue-default sm:mt-0"
          >
            Open your dashboard <ArrowRightUp />
          </a>
        </div>
      </Section>
    </DocsLayout>
  );
}
