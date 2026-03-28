import { Hero } from "../components/Hero";

export default function Home() {
  return (
    <Hero title="Zane Morris" subtitle="Mechanical Engineer">
      <div className="hero-bio">
        <p>
          Hi, I&apos;m Zane. A Mechanical Engineering graduate from the
          University of Auckland, graduating May 2026. I&apos;m outgoing and
          highly motivated, I thrive across a range of environments and hold
          myself to a high standard in everything I take on. I&apos;m comfortable
          working under pressure, managing competing priorities, and staying
          focused in fast-paced settings.
        </p>
      </div>
      <div className="hero-profile">
        <img
          src="/images/home/index01.jpg"
          alt="Zane Morris"
          className="profile-img"
        />
        <div className="profile-btns">
          <a
            href="https://www.linkedin.com/in/z-morris"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="/ZaneResume.pdf" className="btn">
            Download CV
          </a>
        </div>
      </div>
    </Hero>
  );
}
