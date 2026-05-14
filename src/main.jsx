import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const packageVersion = "1.0.13";
const githubUrl = "https://github.com/MpLebron/PyGeoModel";
const caseUrl = "https://github.com/MpLebron/PyGeoModel-Case";
const binderUrl = "https://mybinder.org/v2/gh/MpLebron/PyGeoModel-Case/main?urlpath=/doc/tree/code.ipynb";
const opengmsUrl = "https://geomodeling.njnu.edu.cn";
const pypiUrl = `https://pypi.org/project/PyGeoModel/${packageVersion}/`;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const routePath = (path) => `${basePath}${path}`;
const assetPath = (path) => `${basePath}${path}`;

const statusItems = [
  { label: "PyPI", value: `v${packageVersion}` },
  { label: "Catalog", value: "4,786 records" },
  { label: "Case", value: "Binder ready" },
  { label: "Workflow", value: "Python first" },
];

const workflowSteps = [
  "Discover model services",
  "Inspect metadata",
  "Recommend candidates",
  "Invoke OpenGMS tasks",
  "Save returned outputs",
];

const featureSections = [
  {
    eyebrow: "Core API",
    title: "Programmatic access is the primary workflow",
    body:
      "PyGeoModel now exposes model-service discovery, metadata inspection, remote invocation, and output saving through explicit Python calls. The notebook case can therefore be rerun as a normal computational workflow instead of relying on transient GUI operations.",
    code: `from pygeomodel import GeoModeler

modeler = GeoModeler()
recommendation = modeler.suggest_model()

result = modeler.invoke(
    "Roof Photovoltaic Carbon Emission Reduction Potential Assessment Model",
    params={
        "system_efficiency": 0.8,
        "start_time": "2018-01",
        "end_time": "2018-12",
        "roof_vector_path": "data/xuanwu_rooftop.zip",
    },
)
saved_files = result.save(output_dir="./data/")`,
  },
  {
    eyebrow: "Model discovery",
    title: "Recommendations are returned as ranked candidates",
    body:
      "The recommendation workflow returns a primary model together with candidate models and relevant data resources. This keeps model discovery as an assisted comparison step while leaving the final research decision to the user.",
    code: `recommendation = modeler.suggest_model()

recommendation.primary_model
recommendation.candidates
recommendation.recommended_data`,
  },
  {
    eyebrow: "Execution",
    title: "Returned model outputs can be saved directly",
    body:
      "TaskResult.save() downloads returned output resources into the working directory. In version 1.0.13, OpenGMS data-node URLs are normalized through the public data gateway, which improves Binder compatibility for hosted reproduction.",
    code: `result = modeler.invoke(model_name, params=params)
saved_files = result.save(output_dir="./data/")

print(result.task_id)
print(saved_files)`,
  },
  {
    eyebrow: "Notebook interface",
    title: "Interactive widgets remain optional",
    body:
      "For exploratory notebook analysis, PyGeoModel still provides a Jupyter interface for browsing models, configuring parameters, asking model-specific questions, and reviewing rich notebook displays. The same package functions remain available underneath.",
    code: `modeler.show_models()
modeler.invoke_model("Absolute Humidity Model")

answer = modeler.ask_model(
    "Absolute Humidity Model",
    "What does the gas constant parameter mean?",
)`,
  },
];

const evidenceItems = [
  {
    title: "One-click case",
    body: "The rooftop photovoltaic potential case runs from a Binder-hosted notebook and uses PyGeoModel==1.0.13.",
    href: binderUrl,
    label: "Open Binder case",
  },
  {
    title: "Package release",
    body: "The current PyPI release contains the reworked Python API, structured notebook displays, and result saving fixes.",
    href: pypiUrl,
    label: "View PyPI release",
  },
  {
    title: "Open source code",
    body: "The GitHub repository provides the package source, tests, catalog data, and OpenGMS client implementation.",
    href: githubUrl,
    label: "View source",
  },
];

const docsSections = [
  {
    group: "Getting started",
    items: [
      { id: "installation", label: "Installation" },
      { id: "quick-start", label: "Quick start" },
      { id: "binder-case", label: "Binder case" },
    ],
  },
  {
    group: "Using PyGeoModel",
    items: [
      { id: "core-api", label: "Core Python API" },
      { id: "model-recommendation", label: "Model recommendation" },
      { id: "model-execution", label: "Model execution" },
      { id: "notebook-interface", label: "Notebook interface" },
      { id: "model-qa", label: "Model Q&A" },
    ],
  },
  {
    group: "Reference",
    items: [
      { id: "records-results", label: "Results and records" },
      { id: "opengms-dependency", label: "OpenGMS dependency" },
      { id: "api-reference", label: "API reference" },
      { id: "limitations", label: "Limitations" },
    ],
  },
];

function App() {
  const path = window.location.pathname.replace(basePath, "") || "/";
  return path.startsWith("/docs") ? <DocsPage /> : <LandingPage />;
}

function Logo({ compact = false }) {
  return (
    <a className={`brand ${compact ? "brandCompact" : ""}`} href={routePath("/")}>
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
            <a href={routePath("/docs")}>Docs</a>
            <a href={binderUrl}>Case</a>
            <a href={githubUrl}>GitHub</a>
            <a href={opengmsUrl}>OpenGMS</a>
            <a href={pypiUrl}>PyPI</a>
          </div>
        </nav>

        <section className="hero">
          <div className="heroText">
            <p className="eyebrow">PyGeoModel {packageVersion}</p>
            <h1>Python access to OpenGMS geographic model services</h1>
            <p className="heroLead">
              A Python package for integrating geographic model services into urban data science workflows, with a
              programmatic API, optional Jupyter interface, ranked model recommendation, model Q&A, and Binder-ready
              case reproduction.
            </p>
            <div className="heroActions">
              <a className="primaryButton" href={routePath("/docs")}>Read the docs</a>
              <a className="secondaryButton" href={binderUrl}>Run the Binder case</a>
              <a className="ghostButton" href={githubUrl}>Source code</a>
            </div>
          </div>
          <div className="heroPanel" aria-label="Current package status">
            <img className="heroLogo" src={assetPath("/assets/pygeomodel-logo.svg")} alt="PyGeoModel" />
            <div className="statusGrid">
              {statusItems.map((item) => (
                <div className="statusItem" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      </header>

      <main className="homeMain">
        <section className="workflowBand" id="quickstart">
          <div>
            <p className="eyebrow">Current workflow</p>
            <h2>Model-service use can now be recorded as executable notebook code</h2>
            <p>
              The revised package places Python calls at the center of the case workflow. The Jupyter GUI remains useful
              for interactive exploration, but the reproducible path is now a concise sequence of package-level API
              calls.
            </p>
          </div>
          <ol className="workflowList">
            {workflowSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="evidenceGrid" aria-label="Reviewer-facing software evidence">
          {evidenceItems.map((item) => (
            <a className="evidenceCard" href={item.href} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span>{item.label}</span>
            </a>
          ))}
        </section>

        <div className="featureStack">
          {featureSections.map((section, index) => (
            <FeatureBlock key={section.title} {...section} reverse={index % 2 === 1} />
          ))}
        </div>

        <section className="homeFooterLead">
          <p className="eyebrow">Documentation scope</p>
          <h2>Written for package users and manuscript review</h2>
          <p>
            The documentation summarizes installation, quick-start examples, the core API, notebook interface, Binder
            case reproduction, OpenGMS dependency, result handling, and current limitations.
          </p>
          <a className="primaryButton" href={routePath("/docs")}>Open documentation</a>
        </section>
      </main>
      <footer className="landingFooter">
        <span>PyGeoModel documentation site</span>
        <span>Built with React and Vite.</span>
      </footer>
    </div>
  );
}

function FeatureBlock({ eyebrow, title, body, code, reverse }) {
  return (
    <section className={`featureBlock ${reverse ? "reverse" : ""}`}>
      <div className="featureCopy">
        <p className="eyebrow">{eyebrow}</p>
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

function OutputBlock({ title = "Example output", children }) {
  return (
    <div className="outputBlock">
      <div className="outputTitle">{title}</div>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}

function InlineCode({ children }) {
  return <code className="inlineCode">{children}</code>;
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
            <a href={routePath("/")}>Homepage</a>
            <a href={binderUrl}>Case</a>
            <a href={githubUrl}>GitHub</a>
            <a href={opengmsUrl}>OpenGMS</a>
            <a href={pypiUrl}>PyPI</a>
          </div>
          <div className="topSearch"><span>Search docs</span><kbd>Ctrl K</kbd></div>
        </div>
      </header>

      <div className="docsShell">
        <aside className={`leftSidebar ${navOpen ? "open" : ""}`} id="docs-sidebar">
          <div className="searchBox"><span>Search docs</span><kbd>Ctrl K</kbd></div>
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
          <p className="eyebrow">PyGeoModel {packageVersion}</p>
          <h1>Documentation</h1>
          <div className="docBadges" aria-label="Package metadata">
            <span>Python package</span>
            <span>OpenGMS services</span>
            <span>Binder case</span>
            <span>Optional Jupyter interface</span>
          </div>
          <p className="lead">
            PyGeoModel is a Python package for integrating geographic model services into urban data science workflows.
            It provides programmatic access to model-service discovery, metadata inspection, model recommendation,
            service invocation, output saving, and knowledge-enhanced model Q&A. The Jupyter interface is an optional
            exploratory use form built on top of the package API.
          </p>

          <DocSection id="installation" title="Installation">
            <p>Install the current release from PyPI in a clean Python environment.</p>
            <CodeBlock code={`pip install PyGeoModel==${packageVersion}`} />
          </DocSection>

          <DocSection id="quick-start" title="Quick start">
            <p>
              The shortest reproducible path is to instantiate <InlineCode>GeoModeler</InlineCode>, request model
              recommendation, invoke a selected OpenGMS model service, and save the returned output files.
            </p>
            <CodeBlock code={`from pygeomodel import GeoModeler

modeler = GeoModeler()
recommendation = modeler.suggest_model()

result = modeler.invoke(
    "Roof Photovoltaic Carbon Emission Reduction Potential Assessment Model",
    params={
        "system_efficiency": 0.8,
        "start_time": "2018-01",
        "end_time": "2018-12",
        "roof_vector_path": "data/xuanwu_rooftop.zip",
    },
)
saved_files = result.save(output_dir="./data/")`} />
            <OutputBlock>
{`RecommendationResult
  primary_model: Roof Photovoltaic Carbon Emission Reduction Potential Assessment Model
  candidates: 5 ranked model services
  relevant_data: data/xuanwu_rooftop.zip

TaskResult
  status: completed
  task_id: 6a04...
  outputs: 1 OpenGMS output resource
  downloaded_outputs: ./data/SolarCalculation-roofSloar.zip`}
            </OutputBlock>
          </DocSection>

          <DocSection id="binder-case" title="Binder case">
            <p>
              The demonstration case assesses rooftop photovoltaic potential in Xuanwu District, Nanjing. It uses the
              package-level API in a notebook so model recommendation, model execution, parameters, and output saving
              remain visible in the computational workflow.
            </p>
            <div className="linkRow">
              <a className="primaryButton" href={binderUrl}>Run the Binder notebook</a>
              <a className="secondaryButton" href={caseUrl}>View case repository</a>
            </div>
          </DocSection>

          <DocSection id="core-api" title="Core Python API">
            <p>
              The core API is intended for scriptable access to OpenGMS model services. It can be used in notebooks,
              scripts, tests, and reproducible case studies.
            </p>
            <table>
              <thead>
                <tr><th>Method</th><th>Purpose</th><th>Return value</th></tr>
              </thead>
              <tbody>
                <tr><td>search_models(query, limit)</td><td>Search local model-service metadata.</td><td>ModelSummary[]</td></tr>
                <tr><td>get_model(model_name)</td><td>Inspect inputs, outputs, states, md5, description, and tags.</td><td>ModelService</td></tr>
                <tr><td>suggest_model()</td><td>Return a primary recommendation, ranked candidates, and relevant data.</td><td>RecommendationResult</td></tr>
                <tr><td>invoke(model_name, params)</td><td>Submit an OpenGMS model-service task.</td><td>TaskResult</td></tr>
                <tr><td>ask_model(model_name, question)</td><td>Ask a model-specific question using OpenGMS knowledge and web-enabled literature-aware answering.</td><td>QAResult</td></tr>
              </tbody>
            </table>
          </DocSection>

          <DocSection id="model-recommendation" title="Model recommendation">
            <p>
              Recommendation is designed to support model discovery and comparison. It identifies candidate model
              services that are relevant to the user's task, data, and modeling context. The user's research design
              remains the basis for final model choice.
            </p>
            <CodeBlock code={`recommendation = modeler.suggest_model()

recommendation.primary_model
recommendation.candidates
recommendation.recommended_data`} />
            <OutputBlock title="Example ranked recommendation">
{`★ Rank 1  Roof Photovoltaic Carbon Emission Reduction Potential Assessment Model
          Recommended for rooftop PV potential assessment and carbon-emission reduction analysis.

  Rank 2  Urban Solar Potential Model
          Related candidate for estimating solar potential across urban roof surfaces.

  Rank 3  Solar Radiation Estimation Model
          Useful when the analysis focuses on location-specific solar radiation inputs.

Relevant data
  Local data: data/xuanwu_rooftop.zip
  Knowledge-base data: optional supplementary solar or climate resources`}
            </OutputBlock>
          </DocSection>

          <DocSection id="model-execution" title="Model execution">
            <p>
              Model execution submits parameters and file inputs to OpenGMS and returns a <InlineCode>TaskResult</InlineCode>.
              Use <InlineCode>save()</InlineCode> to download returned output resources into the current project.
            </p>
            <CodeBlock code={`result = modeler.invoke(model_name, params=params)
saved_files = result.save(output_dir="./data/")

result.task_id
result.outputs
saved_files`} />
            <OutputBlock title="Example task result">
{`TaskResult(
    model_name="Roof Photovoltaic Carbon Emission Reduction Potential Assessment Model",
    status="completed",
    task_id="6a04...",
    outputs=[
        {
            "statename": "SolarCalculation",
            "event": "roofSloar",
            "suffix": "zip",
            "url": "https://geomodeling.njnu.edu.cn/dataTransferServer/data/..."
        }
    ],
    downloaded_outputs=[
        "./data/SolarCalculation-roofSloar.zip"
    ]
)`}
            </OutputBlock>
            <div className="note">
              Version {packageVersion} normalizes OpenGMS internal data-node download URLs through the public data
              gateway before downloading output files. This improves compatibility with hosted notebook environments
              such as Binder.
            </div>
          </DocSection>

          <DocSection id="notebook-interface" title="Notebook interface">
            <p>
              The widget interface is an optional interactive form for exploratory analysis. It supports model browsing,
              parameter configuration, model execution, and model-specific Q&A while keeping the Python API available.
            </p>
            <CodeBlock code={`modeler.show_models()
modeler.invoke_model("Absolute Humidity Model")`} />
          </DocSection>

          <DocSection id="model-qa" title="Model Q&A">
            <p>
              Model Q&A returns a structured <InlineCode>QAResult</InlineCode>. In notebooks, answers are rendered as a
              clean rich display with sources. The answer is grounded in OpenGMS model metadata and can draw on
              literature-oriented web search when answering broader model questions.
            </p>
            <CodeBlock code={`answer = modeler.ask_model(
    "Absolute Humidity Model",
    "What does the gas constant parameter mean?",
)

answer.answer
answer.sources`} />
            <OutputBlock title="Example Q&A result">
{`QAResult
  question: What does the gas constant parameter mean?
  model_name: Absolute Humidity Model

  answer:
    The gas constant R links pressure, volume, amount of substance, and temperature
    in the ideal-gas relation. In the Absolute Humidity Model, it is used together
    with vapor pressure, molar mass of water, and temperature to convert vapor
    pressure into absolute humidity or water-vapor density.

  sources:
    - OpenGMS Knowledge Base: Absolute Humidity Model
    - Web or literature-oriented source returned by the web-enabled model`}
            </OutputBlock>
          </DocSection>

          <DocSection id="records-results" title="Results and records">
            <p>
              The primary reproducibility mechanism is executable Python code in the notebook. Returned objects also
              expose structured attributes and optional JSON export for users who want additional audit records.
            </p>
            <CodeBlock code={`result.model_name
result.params
result.outputs
result.downloaded_outputs

result.to_json("records/task.json")  # optional`} />
            <OutputBlock title="Example saved output list">
{`[
  "./data/SolarCalculation-roofSloar.zip"
]

Optional JSON record
  records/task.json
  records/recommendation.json
  records/qa.json`}
            </OutputBlock>
          </DocSection>

          <DocSection id="opengms-dependency" title="OpenGMS dependency">
            <p>
              PyGeoModel is a client package for OpenGMS model services. Local catalog search and metadata inspection
              are package-level operations, while online model execution depends on network connectivity and OpenGMS
              service availability.
            </p>
            <div className="note">
              OpenGMS is the long-term model-service infrastructure. PyGeoModel provides the Python package interface
              for discovery, invocation, notebook use, and result management.
            </div>
          </DocSection>

          <DocSection id="api-reference" title="API reference">
            <table>
              <thead>
                <tr><th>Object</th><th>Description</th></tr>
              </thead>
              <tbody>
                <tr><td>GeoModeler</td><td>Main entry point for catalog access, model recommendation, invocation, notebook interface, and Q&A.</td></tr>
                <tr><td>ModelService</td><td>Parsed OpenGMS model metadata including inputs, outputs, states, description, tags, and md5.</td></tr>
                <tr><td>TaskResult</td><td>Structured result of a submitted model-service task, including output metadata and downloaded output paths.</td></tr>
                <tr><td>RecommendationResult</td><td>Primary model recommendation, candidate list, relevant data resources, context, and raw response metadata.</td></tr>
                <tr><td>QAResult</td><td>Question, answer, model name, sources, context, and raw response metadata.</td></tr>
              </tbody>
            </table>
          </DocSection>

          <DocSection id="limitations" title="Limitations">
            <p>
              PyGeoModel does not independently validate every OpenGMS model service, and it does not execute models
              offline. Scientific validation remains model specific and should be assessed through OpenGMS metadata,
              related publications, manuals, calibration or validation studies, and the user's application context.
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
        <p>Copyright 2026, PyGeoModel authors. Built with React and Vite.</p>
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
