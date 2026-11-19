import { useEffect } from "react";

import { ScrollScrub } from "./scroll-scrub/scroll-scrub";
import { scrollScrubScenes, scrollScrubTheme } from "./scenes";
import { ANDROID_URL, IOS_URL, SITE_NAME } from "./site-config";


function Downloads() {
  return (
    <div className="or-hero-actions">
      <a className="or-btn-primary" href={ANDROID_URL}>
        Android
      </a>
      <a className="or-btn-text" href={IOS_URL}>
        iOS
      </a>
    </div>
  );
}

// Module constant on purpose: the scrub controller rebuilds if this identity changes.
const scenes = scrollScrubScenes.map((scene) => ({ ...scene, actions: <Downloads /> }));

const manifesto =
  "Cada sonrisa empieza con un buen registro. Ordena fichas, fotos y controles en un solo lugar, y dedica tu tiempo a lo importante.".split(
    " ",
  );

const marquee = ["Fichas", "Evolución", "Controles", "Citas", "Fotos", "Seguimiento"];

const panels = [
  { img: "/assets/evolution.jpg", tag: "01 · Evolución", alt: "Arcada desalineada y arcada alineada" },
  { img: "/assets/phone.jpg", tag: "02 · Fichas", alt: "Teléfono con la app de registro" },
  { img: "/assets/macro.jpg", tag: "03 · Controles", alt: "Detalle de un alineador" },
];

const stats = [
  { value: "01", label: "Ficha por paciente" },
  { value: "02", label: "Plataformas" },
  { value: "00", label: "Papeles que cargar" },
];

const steps = [
  { title: "Descarga la app", text: "Instálala en tu teléfono en menos de un minuto." },
  { title: "Configura tu consulta", text: "Agrega tu clínica y empieza con tus pacientes actuales." },
  { title: "Registra y da seguimiento", text: "Fichas, fotos y controles, siempre actualizados." },
];

const faqs = [
  {
    q: "¿En qué dispositivos funciona?",
    a: "Está disponible para Android e iOS. Descarga la versión de tu teléfono desde esta página.",
  },
  {
    q: "¿Para quién es la app?",
    a: "Para ortodoncistas y equipos de clínica que quieren llevar el registro de sus pacientes de forma ordenada.",
  },
  {
    q: "¿Cómo instalo la app?",
    a: "Toca el botón de tu sistema y sigue las indicaciones de instalación en tu teléfono.",
  },
  {
    q: "¿Dónde resuelvo dudas?",
    a: "Escríbenos desde los datos de contacto de la app y te ayudamos con la instalación y el uso.",
  },
];

export default function App() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Lift-in reveals (transform only, content is always visible).
    const lifts = document.querySelectorAll<HTMLElement>(".or-lift");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    lifts.forEach((el) => io.observe(el));

    // Background videos only play while visible.
    const vids = document.querySelectorAll<HTMLVideoElement>("video.or-bgvideo");
    const vio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting && !reduce) void v.play().catch(() => undefined);
          else v.pause();
        });
      },
      { threshold: 0.2 },
    );
    vids.forEach((v) => vio.observe(v));

    if (reduce) {
      document.querySelectorAll(".or-w").forEach((w) => w.classList.add("on"));
      return () => {
        io.disconnect();
        vio.disconnect();
      };
    }

    const words = Array.from(document.querySelectorAll<HTMLElement>(".or-w"));
    const manifestoEl = document.querySelector<HTMLElement>(".or-manifesto");
    const panelsEls = Array.from(document.querySelectorAll<HTMLElement>(".or-panel"));
    const phoneStage = document.querySelector<HTMLElement>(".or-phone-stage");
    const finalEl = document.querySelector<HTMLElement>(".or-final");

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;

      if (manifestoEl) {
        const r = manifestoEl.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height * 0.9)));
        const n = Math.floor(p * words.length * 1.15);
        words.forEach((w, i) => w.classList.toggle("on", i < n));
      }
      panelsEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        const c = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.setProperty("--py", `${c * -40}px`);
        el.style.setProperty("--ps", `${1 - Math.min(1, Math.abs(c)) * 0.06}`);
      });
      if (phoneStage) {
        const r = phoneStage.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
        phoneStage.style.setProperty("--pr", `${-8 + p * 8}deg`);
        phoneStage.style.setProperty("--pz", `${0.86 + p * 0.14}`);
      }
      if (finalEl) {
        const r = finalEl.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, 1 - r.top / vh));
        finalEl.style.setProperty("--fs", `${1.12 - p * 0.12}`);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      vio.disconnect();
    };
  }, []);

  return (
    <div className="or-ui">
      <header className="or-nav">
        <a className="or-wordmark" href="#inicio">
          {SITE_NAME}
        </a>
        <a className="or-nav-box" href="#descargas">
          <span>{SITE_NAME}</span>
          <span>Descargar</span>
        </a>
      </header>

      <main id="inicio">
        <ScrollScrub scenes={scenes} theme={scrollScrubTheme} />

        <section className="or-manifesto" aria-label="Manifiesto">
          <p>
            {manifesto.map((w, i) => (
              <span key={i}>
                <span className="or-w">{w}</span>{" "}
              </span>
            ))}
          </p>
        </section>

        <div className="or-marquee" aria-hidden="true">
          <div className="or-marquee-track">
            {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>

        <section className="or-sticky" aria-labelledby="funciones-t">
          <div className="or-sticky-left">
            <p className="or-label">Lo esencial</p>
            <h2 className="or-title" id="funciones-t">
              Todo el caso, de un vistazo.
            </h2>
            <p className="or-body">
              Fichas clínicas, fotos y radiografías por visita, y el plan de tratamiento de cada
              paciente, en una interfaz sobria y rápida.
            </p>
          </div>
          <div className="or-sticky-right">
            {panels.map((p) => (
              <div className="or-panel" key={p.tag}>
                <img src={p.img} alt={p.alt} loading="lazy" width={1024} />
                <span className="or-panel-tag">{p.tag}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="or-full" aria-label="Detalle">
          <video
            className="or-bgvideo"
            src="/assets/world/macro-loop.mp4"
            poster="/assets/macro.jpg"
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          />
          <div className="or-bgshade" />
          <div className="or-full-copy">
            <h2 className="or-huge or-lift">
              Cada detalle,
              <br />
              registrado.
            </h2>
          </div>
        </section>

        <section className="or-phone-stage" aria-label="App móvil">
          <div className="or-phone-pin">
            <div className="or-phone-word" aria-hidden="true">
              Móvil
            </div>
            <img src="/assets/phone.jpg" alt="La app en un teléfono" loading="lazy" />
          </div>
        </section>

        <section className="or-stats" aria-label="En números">
          {stats.map((s) => (
            <div className="or-stat or-lift" key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </section>

        <section className="or-steps" aria-labelledby="pasos-t">
          <div className="or-steps-head or-lift">
            <p className="or-label">Cómo empezar</p>
            <h2 className="or-title" id="pasos-t">
              Tres pasos y listo.
            </h2>
          </div>
          {steps.map((s, i) => (
            <article className="or-step or-lift" key={s.title}>
              <i>0{i + 1}</i>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </section>

        <section className="or-faq" aria-labelledby="faq-t">
          <div className="or-lift">
            <p className="or-label">Preguntas</p>
            <h2 className="or-title" id="faq-t">
              Lo esencial, antes de instalar.
            </h2>
          </div>
          <div>
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="or-final" id="descargas" aria-labelledby="descargas-t">
          <img src="/assets/finale.jpg" alt="" loading="lazy" />
          <div className="or-final-copy">
            <h2 id="descargas-t">Descarga {SITE_NAME}</h2>
            <Downloads />
          </div>
        </section>
      </main>

      <footer className="or-foot">
        <span>{SITE_NAME}</span>
        <span>Registro de pacientes para ortodoncistas</span>
      </footer>
    </div>
  );
}
