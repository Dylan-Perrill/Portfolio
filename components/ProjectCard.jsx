export default function ProjectCard({ title, description, tech = [], demo, code }) {
  return (
    <div className="card">
      <h3 style={{marginTop:0}}>{title}</h3>
      <p>{description}</p>
      {tech?.length ? (
        <div className="badges">
          {tech.map((t) => (
            <span className="badge" key={t}>{t}</span>
          ))}
        </div>
      ) : null}
      <div style={{display:"flex", gap:"0.5rem", marginTop:"0.5rem"}}>
        {demo && <a className="btn" href={demo} target="_blank" rel="noreferrer">Live demo</a>}
        {code && <a className="btn secondary" href={code} target="_blank" rel="noreferrer">Source</a>}
      </div>
    </div>
  );
}
