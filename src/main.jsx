import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const githubUrl = "https://github.com/MpLebron/PyGeoModel";
const opengmsUrl = "https://geomodeling.njnu.edu.cn";
const pypiUrl = "https://pypi.org/project/PyGeoModel/";

const featureSections = [
  {
    title: "Discover model services from Python",
    body:
      "PyGeoModel exposes the OpenGMS model-service catalog through ordinary Python objects, so users can search candidate services, inspect metadata, and keep those decisions inside an urban data science workflow.",
    code: `from pygeomodel import GeoModeler

modeler = GeoModeler()
models = modeler.search_models("photovoltaic", limit=5)
pv_model = modeler.get_model(models[0].name)
pv_model.inputs`,
  },
  {
    title: "Invoke remote OpenGMS tasks",
    body:
      "Model services are submitted through a consistent API. Parameters and file inputs are normalized against service metadata, and the returned TaskResult records the task id, inputs, outputs, endpoint, and execution metadata.",
    code: `result = modeler.invoke(
    "Roof Photovoltaic Carbon Emission Reduction Potential Assessment Model",
    params={
        "system_efficiency": 0.8,
        "start_time": 201801,
        "end_time": 201812,
        "roof_vector_path": "data/rooftops.zip",
    },
    record_path="records/pv_task.json",
)`,
  },
  {
    title: "Use the optional Jupyter interface",
    body:
      "For exploratory notebook work, PyGeoModel adds widget-based support for model browsing, parameter configuration, service execution, context-aware recommendation, and knowledge-enhanced model explanation.",
    code: `modeler.show_models()
modeler.invoke_model(
    "Roof Photovoltaic Carbon Emission Reduction Potential Assessment Model"
)

recommendation = modeler.suggest_model()
answer = modeler.ask_model(model_name, question)`,
  },
  {
    title: "Export reproducible records",
    body:
      "Programmatic calls and notebook interactions can be written as JSON records. This makes GUI-assisted exploration auditable instead of hidden in transient interface state.",
    code: `modeler.last_result.to_json("records/task.json")
modeler.last_recommendation.to_json("records/recommendation.json")
modeler.last_answer.to_json("records/qa.json")`,
  },
];

const docsSections = [
  {
    group: "Getting started",
    items: [
      { id: "installation", label: "Installation" },
      { id: "configuration", label: "Configuration" },
      { id: "quick-start", label: "Quick start" },
    ],
  },
  {
    group: "Using PyGeoModel",
    items: [
      { id: "core-api", label: "Core Python API" },
      { id: "notebook-interface", label: "Notebook interface" },
      { id: "recommendation-qa", label: "Recommendation and Q&A" },
      { id: "records", label: "Execution records" },
    ],
  },
  {
    group: "Reference",
    items: [
      { id: "opengms-dependency", label: "OpenGMS dependency" },
      { id: "api-reference", label: "API reference" },
      { id: "testing", label: "Testing checklist" },
      { id: "limitations", label: "Limitations" },
    ],
  },
];

function App() {
  const path = window.location.pathname;
  return path.startsWith("/docs") ? <DocsPage /> : <LandingPage />;
}

function Logo({ compact = false }) {
  return (
    <a className={`brand ${compact ? "brandCompact" : ""}`} href="/">
      <span className="brandMark" aria-hidden="true">
        <svg viewBox="0 0 44 44">
          <path d="M12 8h20l9 14-9 14H12L3 22z" />
          <path d="M12 15h20M8 22h28M12 29h20M22 8v28" />
        </svg>
      </span>
      <span>PyGeoModel</span>
    </a>
  );
}

function LandingPage() {
  return (
    <div className="landing">
      <header className="homeHeader">
        <nav className="homeNav">
          <Logo />
          <div className="navLinks">
            <a href="/docs">Docs</a>
            <a href={githubUrl}>GitHub</a>
            <a href={opengmsUrl}>OpenGMS</a>
            <a href={pypiUrl}>PyPI</a>
          </div>
        </nav>
        <section className="hero">
          <img className="heroLogo" src="/assets/pygeomodel-logo.svg" alt="PyGeoModel" />
          <h1>A Python package for integrating geographic model services into urban data science workflows</h1>
          <ul className="heroFacts" aria-label="Project facts">
            <li>4,786 OpenGMS model-service records in the local catalog</li>
            <li>Python API with an optional Jupyter interface</li>
            <li>Structured execution, recommendation, and Q&A records</li>
            <li>Open source package for service-oriented model reuse</li>
          </ul>
          <div className="heroActions">
            <a className="primaryButton" href="/docs">Read the docs</a>
            <a className="primaryButton" href="#quickstart">Quick start</a>
            <a className="primaryButton" href={githubUrl}>GitHub</a>
          </div>
        </section>
        <div className="greenRule" />
      </header>

      <main className="homeMain">
        <section className="introBand" id="quickstart">
          <div>
            <h2>Model-service access where the analysis already happens</h2>
            <p>
              PyGeoModel connects OpenGMS model services with Python-based urban analysis. It keeps discovery,
              metadata inspection, remote task submission, result management, and notebook-based assistance in one
              computational workflow.
            </p>
          </div>
          <img src="/assets/model-service-diagram.svg" alt="PyGeoModel service workflow" />
        </section>

        <div className="featureStack">
          {featureSections.map((section, index) => (
            <FeatureBlock key={section.title} {...section} reverse={index % 2 === 1} />
          ))}
        </div>

        <section className="homeFooterLead">
          <h2>Documentation focused on reviewer-facing software practice</h2>
          <p>
            The documentation page covers installation, configuration, public API examples, notebook usage, record
            export, OpenGMS service dependency, testing, and current limitations.
          </p>
          <a className="secondaryButton" href="/docs">Open documentation</a>
        </section>
      </main>
      <footer className="landingFooter">
        <span>PyGeoModel documentation site</span>
        <span>Built with React and Vite, styled after Sphinx/Furo documentation.</span>
      </footer>
    </div>
  );
}

function FeatureBlock({ title, body, code, reverse }) {
  return (
    <section className={`featureBlock ${reverse ? "reverse" : ""}`}>
      <div className="featureCopy">
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <CodeBlock code={code} />
    </section>
  );
}

function CodeBlock({ code }) {
  return (
    <pre className="codeBlock">
      <code>{code}</code>
    </pre>
  );
}

function DocsPage() {
  const [navOpen, setNavOpen] = React.useState(false);
  const flatItems = docsSections.flatMap((section) => section.items);
  return (
    <div className="docsPage">
      <header className="docsTopbar">
        <div className="docsTopbarInner">
          <Logo compact />
          <button
            className="menuButton"
            type="button"
            aria-expanded={navOpen}
            aria-controls="docs-sidebar"
            onClick={() => setNavOpen((value) => !value)}
          >
            Menu
          </button>
          <div className="docsLinks">
            <a href="/">Homepage</a>
            <a href={githubUrl}>GitHub</a>
            <a href={opengmsUrl}>OpenGMS</a>
            <a href={pypiUrl}>PyPI</a>
          </div>
          <div className="topSearch"><span>Search ...</span><kbd>⌘ K</kbd></div>
        </div>
      </header>

      <div className="docsShell">
        <aside className={`leftSidebar ${navOpen ? "open" : ""}`} id="docs-sidebar">
          <div className="searchBox"><span>Search docs</span><kbd>⌘ K</kbd></div>
          {docsSections.map((section) => (
            <nav className="sidebarGroup" key={section.group} aria-label={section.group}>
              <p>{section.group}</p>
              {section.items.map((item) => (
                <a key={item.id} href={`#${item.id}`}>{item.label}</a>
              ))}
            </nav>
          ))}
        </aside>

        <article className="docsArticle">
          <h1>PyGeoModel</h1>
          <div className="docBadges" aria-label="Package metadata">
            <span>Python package</span>
            <span>OpenGMS services</span>
            <span>Jupyter interface</span>
            <span>Structured records</span>
          </div>
          <p className="lead">
            PyGeoModel is a Python package for integrating geographic model services into urban data science workflows.
            It provides programmatic access to model-service discovery, metadata inspection, service invocation, task
            submission, and result management. For exploratory notebook analysis, it further provides an interactive
            Jupyter interface for context-aware model recommendation and knowledge-enhanced model Q&A.
          </p>

          <DocSection id="installation" title="Installation">
            <p>Install the package from PyPI after creating a clean Python environment.</p>
            <CodeBlock code={`pip install PyGeoModel`} />
          </DocSection>

          <DocSection id="configuration" title="Configuration">
            <p>
              OpenGMS execution is an online service workflow. Configure the service token and optional endpoint
              overrides through environment variables.
            </p>
            <CodeBlock code={`export OGMS_TOKEN="your-opengms-token"
export OGMS_BASE_PORTAL_URL="https://geomodeling.njnu.edu.cn"
export OGMS_BASE_MANAGER_URL="https://geomodeling.njnu.edu.cn/modelItem"
export OGMS_BASE_DATA_URL="https://geomodeling.njnu.edu.cn/data"`} />
            <div className="note">
              PyGeoModel does not package private credentials. Tokens should be provided at runtime through the
              environment or a local configuration mechanism outside version control.
            </div>
          </DocSection>

          <DocSection id="quick-start" title="Quick start">
            <CodeBlock code={`from pygeomodel import GeoModeler

modeler = GeoModeler()
results = modeler.search_models("photovoltaic", limit=5)
model = modeler.get_model(results[0].name)

print(model.name)
print([item.name for item in model.inputs])`} />
          </DocSection>

          <DocSection id="core-api" title="Core Python API">
            <p>
              The core API is designed for users who want scriptable access to OpenGMS model services without relying on
              notebook widgets.
            </p>
            <table>
              <thead>
                <tr><th>Method</th><th>Purpose</th><th>Return value</th></tr>
              </thead>
              <tbody>
                <tr><td>search_models(query, limit)</td><td>Search local model-service metadata.</td><td>ModelSummary[]</td></tr>
                <tr><td>get_model(model_name)</td><td>Inspect inputs, outputs, states, md5, and description.</td><td>ModelService</td></tr>
                <tr><td>invoke(model_name, params)</td><td>Submit an OpenGMS model task.</td><td>TaskResult</td></tr>
              </tbody>
            </table>
            <CodeBlock code={`result = modeler.invoke(
    model.name,
    params={"system_efficiency": 0.8, "roof_vector_path": "rooftops.zip"},
    wait=True,
    record_path="records/task.json",
)`} />
          </DocSection>

          <DocSection id="notebook-interface" title="Notebook interface">
            <p>
              The notebook interface is an optional interactive form for exploratory analysis. It is built on top of the
              same package functions used by the core API.
            </p>
            <CodeBlock code={`modeler.show_models()
modeler.invoke_model("Roof Photovoltaic Carbon Emission Reduction Potential Assessment Model")

modeler.last_result
modeler.last_recommendation
modeler.last_answer`} />
          </DocSection>

          <DocSection id="recommendation-qa" title="Recommendation and Q&A">
            <p>
              Recommendation and Q&A are exposed as structured Python results, so notebook assistance can be inspected,
              stored, and discussed as part of the analysis record.
            </p>
            <CodeBlock code={`recommendation = modeler.suggest_model(
    context="Assess rooftop photovoltaic potential in Nanjing.",
    data_context="A zipped rooftop polygon dataset is available.",
)

answer = modeler.ask_model(
    recommendation.primary_model["name"],
    "What input data are required for this model?",
)`} />
          </DocSection>

          <DocSection id="records" title="Execution records">
            <p>
              TaskResult, RecommendationResult, and QAResult all provide to_json(path). These records document executed
              parameters, selected model metadata, returned outputs, recommendation context, and Q&A sources.
            </p>
            <CodeBlock code={`result.to_json("records/task.json")
recommendation.to_json("records/recommendation.json")
answer.to_json("records/qa.json")`} />
          </DocSection>

          <DocSection id="opengms-dependency" title="OpenGMS dependency">
            <p>
              PyGeoModel is a client package for OpenGMS model services. The package keeps the Python workflow stable,
              but model execution depends on network connectivity, a valid token, and the availability of the OpenGMS
              service infrastructure.
            </p>
            <div className="note">
              When a service endpoint is unavailable, users should keep the exported task record and contact the OpenGMS
              development team with the task id, model name, and request time.
            </div>
          </DocSection>

          <DocSection id="api-reference" title="API reference">
            <table>
              <thead>
                <tr><th>Object</th><th>Description</th></tr>
              </thead>
              <tbody>
                <tr><td>GeoModeler</td><td>Main user-facing entry point for catalog access, invocation, recommendation, and Q&A.</td></tr>
                <tr><td>ModelService</td><td>Parsed OpenGMS model metadata including inputs, outputs, states, description, tags, and md5.</td></tr>
                <tr><td>TaskResult</td><td>Serializable record of a submitted or completed model-service task.</td></tr>
                <tr><td>RecommendationResult</td><td>Structured result for model recommendation, candidate models, data suggestions, context, and trace.</td></tr>
                <tr><td>QAResult</td><td>Structured answer with question, model name, sources, context, and raw response metadata.</td></tr>
              </tbody>
            </table>
          </DocSection>

          <DocSection id="testing" title="Testing checklist">
            <ul>
              <li>Run unit tests with python -m unittest discover -s tests.</li>
              <li>Verify catalog loading returns 4,786 local model records.</li>
              <li>Run search_models("photovoltaic") and inspect the returned ModelSummary objects.</li>
              <li>Use a mocked OpenGMS client for offline TaskResult and record-export tests.</li>
              <li>Run online OpenGMS checks only after setting OGMS_TOKEN.</li>
            </ul>
          </DocSection>

          <DocSection id="limitations" title="Limitations">
            <p>
              PyGeoModel does not independently validate every model service in OpenGMS, and it does not execute models
              offline. Scientific validation remains model specific and should be assessed through OpenGMS metadata,
              related publications, manuals, calibration reports, and the user's application context.
            </p>
          </DocSection>
        </article>

        <aside className="rightSidebar">
          <p>On this page</p>
          {flatItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}>{item.label}</a>
          ))}
        </aside>
      </div>

      <footer className="docsFooter">
        <p>© 2026, PyGeoModel authors. Built with React and Vite, styled after Sphinx/Furo documentation.</p>
      </footer>
    </div>
  );
}

function DocSection({ id, title, children }) {
  return (
    <section id={id} className="docSection">
      <h2>{title}<a className="headerLink" href={`#${id}`}>#</a></h2>
      {children}
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);
