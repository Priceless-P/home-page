import { useEffect, useState } from 'react';
import Nav from '../Nav.jsx';
import Footer from '../Footer.jsx';
import { cx } from '../../lib/cx.js';

function useActiveSection(sections, offset = 160) {
  const [activeSection, setActiveSection] = useState(sections[0][0]);

  useEffect(() => {
    let frame;

    const update = () => {
      const readingLine = window.scrollY + offset;
      let nextSection = sections[0][0];

      for (const [id] of sections) {
        const section = document.getElementById(id);
        if (!section || section.offsetTop > readingLine) break;
        nextSection = id;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        nextSection = sections.at(-1)[0];
      }

      setActiveSection((current) => (current === nextSection ? current : nextSection));
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [sections, offset]);

  return activeSection;
}

export default function DocsLayout({
  current,
  sections,
  navigationLabel,
  hero,
  sidebarFooter,
  children,
  afterContent,
}) {
  const activeSection = useActiveSection(sections);

  return (
    <>
      <header className="sticky top-0 z-50 bg-bg-default pt-6 lg:pt-0">
        <Nav current={current} />
      </header>

      <main>
        {hero}

        <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-16 lg:grid-cols-[240px_minmax(0,1fr)] lg:py-24">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm text-body-alt">On this page</p>
            <nav
              aria-label={navigationLabel}
              className="mt-4 flex gap-4 overflow-x-auto pb-2 lg:flex-col lg:gap-2 lg:overflow-visible"
            >
              {sections.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={activeSection === id ? 'location' : undefined}
                  className={cx(
                    'shrink-0 border-b-2 px-0.5 pb-1 text-sm transition-colors lg:border-b-0 lg:border-l-2 lg:py-1 lg:pr-0 lg:pl-3',
                    activeSection === id
                      ? 'border-header-default font-medium text-header-default lg:border-blue-default'
                      : 'border-transparent text-body-alt hover:text-header-default',
                  )}
                >
                  {label}
                </a>
              ))}
            </nav>
            {sidebarFooter}
          </aside>

          <article className="flex min-w-0 flex-col gap-14">{children}</article>
        </div>

        {afterContent}
      </main>

      <Footer />
    </>
  );
}
