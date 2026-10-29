import { Highlight, themes } from 'prism-react-renderer';

export function InlineCode({ children }) {
  return (
    <code className="rounded-xs bg-bg-secondary px-1.5 py-0.5 font-mono text-[0.875em] text-body-default">
      {children}
    </code>
  );
}

export function CodeBlock({ label, language = 'text', children }) {
  const code = String(children).trim();
  const copy = () => navigator.clipboard?.writeText(code);

  return (
    <div className="overflow-hidden border border-[#30363d] bg-[#0d1117] shadow-sm">
      <div className="flex items-center justify-between border-b border-[#30363d] bg-[#161b22] px-4 py-2 text-xs text-[#8b949e]">
        <span className="flex items-center gap-2">
          <span>{label}</span>
          {language !== 'text' && (
            <span className="rounded-xs border border-[#30363d] px-1.5 py-0.5 uppercase">
              {language}
            </span>
          )}
        </span>
        <button
          type="button"
          onClick={copy}
          className="font-medium text-[#c9d1d9] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        >
          Copy
        </button>
      </div>
      <Highlight theme={themes.vsDark} code={code} language={language}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="overflow-x-auto bg-[#0d1117] py-4 font-mono text-[13px] leading-6 sm:text-sm">
            <code>
              {tokens.map((line, lineIndex) => (
                <span
                  key={lineIndex}
                  {...getLineProps({ line })}
                  className="table min-h-6 w-full px-4"
                >
                  {tokens.length > 1 && (
                    <span
                      aria-hidden="true"
                      className="table-cell w-8 select-none pr-4 text-right text-[#484f58]"
                    >
                      {lineIndex + 1}
                    </span>
                  )}
                  <span className="table-cell">
                    {line.map((token, tokenIndex) => (
                      <span key={tokenIndex} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </span>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}

export function DocTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto border border-border-default/70">
      <table className="w-full min-w-[620px] border-collapse text-left text-sm">
        <thead className="bg-bg-primary text-header-default">
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-b border-border-default/70 px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-body-alt">
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-border-default/50 last:border-b-0">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-border-default/60 pt-10">
      <h2 className="font-heading text-2xl font-medium tracking-tight text-header-default lg:text-3xl lg:tracking-normal">
        {title}
      </h2>
      <div className="mt-5 flex flex-col gap-5 text-base leading-7 text-body-alt">{children}</div>
    </section>
  );
}

export function Endpoint({ path, scope, children }) {
  return (
    <div className="flex flex-col gap-4 bg-bg-primary p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="bg-btn-bg px-2 py-1 font-mono text-xs font-semibold text-btn-text">GET</span>
        <code className="font-mono text-sm font-semibold text-header-default">{path}</code>
      </div>
      {scope && <p className="text-sm text-body-alt">Requires {scope}</p>}
      {children}
    </div>
  );
}

export function DocFigure({ asset, alt, caption }) {
  return (
    <figure className="overflow-hidden border border-border-default/70 bg-white">
      <img
        src={asset.src}
        width={asset.width}
        height={asset.height}
        alt={alt}
        loading="eager"
        fetchPriority="low"
        decoding="async"
        className="h-auto w-full"
      />
      <figcaption className="border-t border-border-default/70 bg-bg-primary px-4 py-3 text-sm text-body-alt">
        {caption}
      </figcaption>
    </figure>
  );
}
