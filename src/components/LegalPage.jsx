import Nav from './Nav.jsx';
import Footer from './Footer.jsx';

export function LegalIntro({ children }) {
  return <p className="text-base leading-7 font-medium text-header-default">{children}</p>;
}

export function LegalHeading({ children }) {
  return (
    <h2 className="mt-6 font-heading text-xl font-medium tracking-tight text-header-default lg:text-2xl">
      {children}
    </h2>
  );
}

export default function LegalPage({ title, children }) {
  return (
    <>
      <header className="sticky top-0 z-50 bg-bg-default pt-6 lg:pt-0">
        <Nav current="legal" />
      </header>

      <main>
        <div className="mx-auto w-full max-w-[760px] px-6 py-16 lg:py-24">
          <h1 className="font-heading text-2xl font-medium tracking-tight text-header-default lg:text-3xl lg:tracking-normal">
            {title}
          </h1>

          <article className="mt-10 flex flex-col gap-5 text-base leading-7 text-body-alt">
            {children}
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
