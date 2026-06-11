const TREE = `\
Researcher_YYYY_MainProjectName_SubProjectName/
├── 1_Background
│   ├── 1_Literature
│   │   └── Authors_year_title.pdf
│   ├── 2_Documentation
│   ├── 3_EthicsGovernance
│   │   ├── 1_EthicsApproval
│   │   └── 2_ConsentForms
│   └── 4_Reports
├── 2_Experiments
│   ├── 1_Experiment1
│   │   ├── 1_Materials
│   │   ├── 2_DataRaw
│   │   ├── 3_DataDerived
│   │   └── 4_Analysis
│   └── 2_Experiment2
│       ├── 1_Materials
│       ├── 2_DataRaw
│       ├── 3_DataDerived
│       └── 4_Analysis
└── 3_Dissemination
    ├── 1_Publications
    │   ├── 1_Draft
    │   └── 2_Submission
    ├── 2_Presentations
    └── 3_Posters`;

export function FolderStructure() {
  return (
    <pre style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre' }}>
      {TREE}
    </pre>
  );
}
