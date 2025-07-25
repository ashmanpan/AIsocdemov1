' AI SOC Scenarios PowerPoint Generator
' This script creates a PowerPoint presentation with all 16 AI SOC scenarios

Dim objPPT, objPresentation, objSlide, objTextBox
Dim slideIndex

' Create PowerPoint Application
Set objPPT = CreateObject("PowerPoint.Application")
objPPT.Visible = True

' Create new presentation
Set objPresentation = objPPT.Presentations.Add

' Set slide dimensions (16:9 widescreen)
objPresentation.PageSetup.SlideSize = 15 ' ppSlideSizeOnScreen16x9

slideIndex = 1

' Title Slide
Set objSlide = objPresentation.Slides.Add(slideIndex, 1) ' ppLayoutTitle
objSlide.Shapes(1).TextFrame.TextRange.Text = "AI-Powered Security Operations Center"
objSlide.Shapes(2).TextFrame.TextRange.Text = "16 Advanced Threat Detection & Response Scenarios" & vbCrLf & "Powered by AI Agent Collaboration"
slideIndex = slideIndex + 1

' Table of Contents
Set objSlide = objPresentation.Slides.Add(slideIndex, 2) ' ppLayoutText
objSlide.Shapes(1).TextFrame.TextRange.Text = "Scenario Overview"
objSlide.Shapes(2).TextFrame.TextRange.Text = _
    "1. Lateral Movement Detection" & vbCrLf & _
    "2. Insider Threat Detection" & vbCrLf & _
    "3. Dark Web Threat Tracking" & vbCrLf & _
    "4. OT/Satellite Network Security" & vbCrLf & _
    "5. LLM-Based Phishing Defense" & vbCrLf & _
    "6. Attack Story Reconstruction" & vbCrLf & _
    "7. Zero-Day Exploit Detection" & vbCrLf & _
    "8. Cloud Misconfiguration Detection" & vbCrLf & _
    "9. Adversarial ML Defense" & vbCrLf & _
    "10. Cryptojacking Detection" & vbCrLf & _
    "11. Network Config Drift Detection" & vbCrLf & _
    "12. Vulnerability Management" & vbCrLf & _
    "13. Long-Term APT Detection" & vbCrLf & _
    "14. eBPF Runtime Security" & vbCrLf & _
    "15. Container Security" & vbCrLf & _
    "16. Source Code Security"
slideIndex = slideIndex + 1

' Scenario 1: Lateral Movement Detection
Call CreateScenarioSlides(1, _
    "AI-Driven Lateral Movement Detection", _
    "Post-Breach Threat Hunting with AI Agents", _
    "Detect attacker movement across hybrid environments", _
    "Attackers moving laterally after initial compromise", _
    "EDR alerts|Windows Event logs|Network flow data|Authentication logs", _
    "Multiple failed auth attempts|Unusual service communications", _
    "Master Reasoning Agent: Orchestrates investigation|Credential Analysis Agent: Monitors auth tokens|Network Traversal Agent: Tracks connections|Behavioral Baseline Agent: Compares patterns|Sandbox Simulation Agent: Replicates attacks", _
    "IO Agent → MRA → Specialized Agents → Knowledge Graph", _
    "Immediate: Isolate compromised accounts|Investigation: Trace movement paths|Containment: Block attack vectors|Learning: Update detection patterns", _
    "Real-time threat detection|Automated response|Attack path visualization|Continuous learning")

' Scenario 2: Insider Threat Detection
Call CreateScenarioSlides(2, _
    "AI Agent for Insider Threat Detection", _
    "Behavioral Analytics for Internal Risk", _
    "Identify malicious insiders before data loss", _
    "Employees stealing sensitive data", _
    "HR systems|Email metadata|File access logs|Badge data", _
    "Abnormal data access|Sentiment changes|Policy violations", _
    "Behavioral Analytics Agent: Models patterns|Sentiment Analysis Agent: Processes communications|Data Movement Agent: Tracks file operations|Risk Scoring Agent: Calculates threat level", _
    "IO Agent → MRA → Analytics Agents → Risk Score → Actions", _
    "Monitoring: Enhanced logging|Prevention: Restrict access|Investigation: Deep analysis|Intervention: HR engagement", _
    "Early warning system|Peer group analysis|Risk-based approach|Privacy-preserving")

' Scenario 3: Dark Web Threat Tracking
Call CreateScenarioSlides(3, _
    "Dark Web Intelligence & Prediction", _
    "AI-Powered Threat Actor Tracking", _
    "Predict attacks before they happen", _
    "Criminals planning attacks on dark web", _
    "Threat intel feeds|OSINT|Dark web forums|Paste sites", _
    "Company mentions|Industry targeting|Exploit discussions", _
    "Web Scraping Agent: Crawls underground|NLP Analysis Agent: Extracts intelligence|Actor Attribution Agent: Links identities|Predictive Modeling Agent: Forecasts attacks", _
    "Dark Web → Scraping → NLP Analysis → Attribution → Prediction", _
    "Intelligence: Create threat profiles|Warning: Alert on targeting|Preparation: Harden systems|Deception: Deploy honeypots", _
    "Proactive defense|Attack prediction|Threat actor tracking|Underground visibility")

' Scenario 4: OT/Satellite Network Security
Call CreateScenarioSlides(4, _
    "OT/Satellite Network Security", _
    "AI Protection for Critical Infrastructure", _
    "Detect threats in specialized networks", _
    "Attacks on industrial/satellite systems", _
    "SCADA systems|ICS logs|Sensor telemetry|Protocol analyzers", _
    "Anomalous readings|Protocol violations|Timing irregularities", _
    "Signal Analysis Agent: Time-series anomalies|Protocol Inspector Agent: Deep packet inspection|Physics Model Agent: Validates against laws|Safety System Agent: Monitors fail-safes", _
    "OT Network → Signal Analysis → Physics Validation → Safety Check", _
    "Immediate: Activate fail-safes|Isolation: Segment systems|Validation: Digital twin comparison|Recovery: Known-good restore", _
    "Physical process protection|Safety-first approach|Air-gap compatible|Real-time response")

' Scenario 5: LLM-Based Phishing Defense
Call CreateScenarioSlides(5, _
    "AI-Powered Phishing Defense", _
    "LLM Analysis at Enterprise Scale", _
    "Stop sophisticated phishing with AI", _
    "Advanced phishing campaigns - Millions of emails daily", _
    "Email gateways|User reports|URL reputation|Attachment analysis", _
    "Suspicious emails|Volume spikes|New techniques", _
    "LLM Email Decoder: Understands context|URL Analysis Agent: Sandboxes links|Campaign Correlation Agent: Links attempts|Visual Analysis Agent: Screenshot comparison", _
    "Email → LLM Analysis → URL/Attachment Check → Campaign Link", _
    "Block: Quarantine phishing|Remediate: Remove from mailboxes|Educate: Train users|Hunt: Find related campaigns", _
    "Context understanding|Campaign detection|Automated response|User education")

' Scenario 6: Attack Story Reconstruction
Call CreateScenarioSlides(6, _
    "Automated Incident Reconstruction", _
    "AI-Powered Attack Timeline", _
    "Understand the full attack story", _
    "Complete incident understanding from complex evidence", _
    "All security tools|Forensic artifacts|Network captures|System logs", _
    "Post-incident analysis|Breach confirmation", _
    "Forensic Timeline Agent: Orders events|Root Cause Agent: Finds initial entry|Impact Assessment Agent: Maps damage|Attribution Agent: Links to actors|Narrative Generation Agent: Creates report", _
    "Evidence → Timeline Creation → Root Cause → Impact → Report", _
    "Collection: Gather artifacts|Analysis: Reconstruct chain|Documentation: Comprehensive report|Presentation: Executive summary", _
    "Complete visibility|Automated analysis|Clear reporting|Lessons learned")

' Scenario 7: Zero-Day Detection
Call CreateScenarioSlides(7, _
    "Zero-Day Detection with AI", _
    "Finding Unknown Unknowns", _
    "Detect exploits without signatures", _
    "Unknown vulnerabilities with no signatures", _
    "Endpoint telemetry|Crash dumps|System calls|Memory snapshots", _
    "Unusual process behavior|Unexplained crashes|Memory anomalies", _
    "Behavioral Analysis Agent: Process patterns|Memory Forensics Agent: Heap/stack analysis|Syscall Monitor Agent: System sequences|Exploit Similarity Agent: Compare techniques", _
    "Anomaly → Behavioral Analysis → Memory Check → Similarity Score", _
    "Isolate: Contain processes|Capture: Preserve evidence|Analyze: Understand mechanics|Protect: Deploy mitigations", _
    "Signature-less detection|Behavioral analysis|Rapid response|Knowledge creation")

' Scenario 8: Cloud Misconfiguration Detection
Call CreateScenarioSlides(8, _
    "Cloud Security Posture Management", _
    "AI-Driven Configuration Analysis", _
    "Prevent data breaches from misconfigs", _
    "Public cloud exposure from misconfigurations", _
    "Cloud APIs|CSPM tools|Asset inventories|Access logs", _
    "Public exposure alerts|Permission changes|New deployments", _
    "Resource Discovery Agent: Find assets|Permission Analysis Agent: Map IAM|Exposure Detection Agent: Find public access|Compliance Check Agent: Validate standards", _
    "Discovery → Permission Analysis → Exposure Check → Compliance", _
    "Immediate: Block public access|Audit: Review permissions|Remediate: Fix misconfigs|Monitor: Continuous checks", _
    "Prevent breaches|Compliance ready|Automated fixes|Multi-cloud support")

' Scenario 9: Adversarial ML Defense
Call CreateScenarioSlides(9, _
    "Defending AI Against AI", _
    "Adversarial Machine Learning Defense", _
    "Protect ML models from manipulation", _
    "Attacks on AI systems - Data poisoning, Model evasion", _
    "ML model metrics|Training pipelines|Prediction logs|Model behavior", _
    "Accuracy degradation|Unusual predictions|Training anomalies", _
    "Model Monitor Agent: Track metrics|Data Validation Agent: Check poisoning|Adversarial Detection Agent: Find attacks|Model Hardening Agent: Implement defenses", _
    "Model → Performance Monitor → Attack Detection → Defense", _
    "Detect: Identify attacks|Clean: Remove poison|Harden: Retrain safely|Monitor: Enhanced detection", _
    "Model protection|Attack detection|Automated defense|Continuous hardening")

' Scenario 10: Cryptojacking Detection
Call CreateScenarioSlides(10, _
    "Cryptojacking Detection", _
    "AI-Powered Resource Abuse Prevention", _
    "Stop unauthorized cryptocurrency mining", _
    "Hidden crypto miners causing cost explosion", _
    "Cloud billing|Resource metrics|Process lists|Network traffic", _
    "Cost spikes|CPU anomalies|Unknown processes|Mining pool connections", _
    "Resource Monitor Agent: CPU/GPU usage|Process Analysis Agent: Identify miners|Network Traffic Agent: Pool connections|Cost Analysis Agent: Financial impact", _
    "Resources → Usage Analysis → Process Check → Cost Impact", _
    "Terminate: Kill miners|Block: Firewall pools|Investigate: Find source|Prevent: Harden systems", _
    "Cost savings|Resource protection|Quick detection|Automated response")

' Scenario 11: Network Config Drift
Call CreateScenarioSlides(11, _
    "Network Configuration Management", _
    "AI-Powered Drift Detection", _
    "Maintain secure network configs", _
    "Unauthorized changes across thousands of devices", _
    "Device configs|Change logs|Backup systems|Compliance tools", _
    "Unauthorized changes|Compliance violations|Scheduled audits", _
    "Config Collection Agent: Gather configs|Drift Analysis Agent: Compare baselines|Impact Assessment Agent: Security implications|Remediation Agent: Plan fixes", _
    "Devices → Config Collection → Drift Analysis → Impact → Fix", _
    "Detect: Find drifts|Alert: Notify changes|Assess: Impact analysis|Remediate: Auto-rollback", _
    "Compliance ready|Change tracking|Automated rollback|Security hardening")

' Scenario 12: Vulnerability Management
Call CreateScenarioSlides(12, _
    "AI-Driven Vulnerability Management", _
    "From Detection to Remediation", _
    "Automate the entire patch cycle", _
    "Unpatched vulnerabilities requiring prioritization", _
    "Splunk logs|Vuln scanners|Asset inventory|Patch databases", _
    "New CVE announcements|Scanner alerts|Threat intel", _
    "Asset Discovery Agent: Find systems|Vulnerability Assessment Agent: Analyze impact|Patch Planning Agent: Create strategy|Test Automation Agent: Validate fixes|Deployment Agent: Execute changes", _
    "Discovery → Assessment → Planning → Testing → Deploy", _
    "Identify: Affected systems|Plan: Detailed MoP|Test: Sandbox validation|Deploy: Phased rollout", _
    "End-to-end automation|Risk-based approach|Safe deployment|Compliance tracking")

' Scenario 13: Long-Term APT Detection
Call CreateScenarioSlides(13, _
    "Multi-Year APT Detection", _
    "Finding Long-Term Persistent Threats", _
    "Detect breaches active for years", _
    "3+ year telecom breach - 27 million records stolen", _
    "Historical logs|CDR records|Billing systems|Network archives", _
    "Anomaly in subscriber access|External threat intel|Regulatory audit", _
    "Historical Analysis Agent: Years of data|Persistence Hunter Agent: Find backdoors|Data Exfiltration Agent: Track theft|Subscriber Impact Agent: Victim analysis|Forensic Archaeology Agent: Reconstruct logs", _
    "Historical Deep Dive → Persistence Hunt → Data Theft Analysis → Impact", _
    "Immediate: Full audit|Investigation: Multi-year forensics|Containment: Remove persistence|Notification: Regulatory compliance", _
    "Historical reconstruction|APT detection|Impact assessment|Future prevention")

' Scenario 14: eBPF Runtime Security
Call CreateScenarioSlides(14, _
    "Kernel-Level Security with eBPF", _
    "Runtime Protection at the Source", _
    "Stop threats at kernel level", _
    "Kernel exploits & container escapes", _
    "Isovalent Tetragon|Cilium|Kernel events|System calls", _
    "Kernel anomalies|Zero-day exploits|Container escapes|Rootkit activity", _
    "Kernel Behavior Agent: Syscall patterns|Container Security Agent: Runtime anomalies|Network Policy Agent: Cilium policies|Process Lineage Agent: Process trees|Runtime Protection Agent: Immediate action", _
    "Kernel Events → Behavior Analysis → Policy Check → Block/Allow", _
    "Immediate: Block syscalls|Containment: Isolate containers|Investigation: Capture context|Prevention: Update eBPF programs", _
    "< 1% overhead|Kernel-level blocking|Container-native|Real-time response")

' Scenario 15: Container Security
Call CreateScenarioSlides(15, _
    "Container Security Pipeline", _
    "From Registry to Runtime", _
    "Secure the container lifecycle", _
    "Vulnerable container images at scale", _
    "Container registries|CI/CD pipelines|Kubernetes clusters|Image scanners", _
    "New image push|Deployment events|CVE announcements|Scheduled scans", _
    "Registry Scanner Agent: Scan repositories|Supply Chain Agent: Track dependencies|Runtime Correlation Agent: Map to pods|Patch Intelligence Agent: Find fixes|Compliance Validator Agent: Policy checks", _
    "Registry → Scan → Runtime Mapping → Remediation → Deploy", _
    "Immediate: Block critical vulns|Scanning: Continuous analysis|Remediation: Auto-patch|Prevention: Admission control", _
    "Shift-left security|Supply chain protection|Automated remediation|Continuous monitoring")

' Scenario 16: Source Code Security
Call CreateScenarioSlides(16, _
    "Code Security at Scale", _
    "AI-Powered Repository Protection", _
    "Secure code before deployment", _
    "Code vulnerabilities & exposed secrets", _
    "GitHub/GitLab/Bitbucket|CI/CD systems|IDE plugins|Git hooks", _
    "Pull requests|Commits|Branch merges|Secret detection", _
    "Code Analysis Agent: SAST/DAST|Secret Hunter Agent: Credential detection|Dependency Checker Agent: Package vulns|License Compliance Agent: OSS validation|Malicious Code Agent: Backdoor detection", _
    "Code Push → Multi-Analysis → Risk Score → Block/Allow", _
    "Immediate: Block PR merge|Notification: Alert developers|Remediation: Auto-fix PRs|Prevention: Pre-commit hooks", _
    "Early detection|Developer-friendly|Automated fixes|Knowledge sharing")

' Summary Slide
Set objSlide = objPresentation.Slides.Add(slideIndex, 2) ' ppLayoutText
objSlide.Shapes(1).TextFrame.TextRange.Text = "AI SOC Benefits Summary"
objSlide.Shapes(2).TextFrame.TextRange.Text = _
    "• 24/7 Automated Threat Detection" & vbCrLf & _
    "• Reduced Response Time: Hours → Seconds" & vbCrLf & _
    "• Continuous Learning & Improvement" & vbCrLf & _
    "• Reduced False Positives by 80%" & vbCrLf & _
    "• Comprehensive Coverage Across All Vectors" & vbCrLf & _
    "• Proactive Threat Hunting" & vbCrLf & _
    "• Automated Remediation" & vbCrLf & _
    "• Knowledge Graph for Historical Intelligence"

MsgBox "Presentation created successfully with " & objPresentation.Slides.Count & " slides!", vbInformation, "Success"

' Subroutine to create scenario slides
Sub CreateScenarioSlides(scenarioNum, title, subtitle, keyPoint, challenge, dataSources, triggers, agents, workflow, actions, benefits)
    Dim sources, agentList, actionList, benefitList
    
    ' Slide 1: Title & Overview
    Set objSlide = objPresentation.Slides.Add(slideIndex, 1) ' ppLayoutTitle
    objSlide.Shapes(1).TextFrame.TextRange.Text = "Scenario " & scenarioNum & ": " & title
    objSlide.Shapes(2).TextFrame.TextRange.Text = subtitle & vbCrLf & "Key Point: " & keyPoint
    slideIndex = slideIndex + 1
    
    ' Slide 2: The Challenge
    Set objSlide = objPresentation.Slides.Add(slideIndex, 2) ' ppLayoutText
    objSlide.Shapes(1).TextFrame.TextRange.Text = "The Challenge"
    sources = Replace(dataSources, "|", vbCrLf & "• ")
    objSlide.Shapes(2).TextFrame.TextRange.Text = _
        "Threat: " & challenge & vbCrLf & vbCrLf & _
        "Data Sources:" & vbCrLf & "• " & sources & vbCrLf & vbCrLf & _
        "Triggers:" & vbCrLf & "• " & Replace(triggers, "|", vbCrLf & "• ")
    slideIndex = slideIndex + 1
    
    ' Slide 3: AI Agent Team
    Set objSlide = objPresentation.Slides.Add(slideIndex, 2) ' ppLayoutText
    objSlide.Shapes(1).TextFrame.TextRange.Text = "AI Agent Team"
    agentList = Replace(agents, "|", vbCrLf & "• ")
    objSlide.Shapes(2).TextFrame.TextRange.Text = "• " & agentList
    slideIndex = slideIndex + 1
    
    ' Slide 4: Agent Workflow
    Set objSlide = objPresentation.Slides.Add(slideIndex, 2) ' ppLayoutText
    objSlide.Shapes(1).TextFrame.TextRange.Text = "Agent Workflow"
    objSlide.Shapes(2).TextFrame.TextRange.Text = workflow
    slideIndex = slideIndex + 1
    
    ' Slide 5: Actions & Outcomes
    Set objSlide = objPresentation.Slides.Add(slideIndex, 2) ' ppLayoutText
    objSlide.Shapes(1).TextFrame.TextRange.Text = "Actions & Outcomes"
    actionList = Replace(actions, "|", vbCrLf & "• ")
    objSlide.Shapes(2).TextFrame.TextRange.Text = "• " & actionList
    slideIndex = slideIndex + 1
    
    ' Slide 6: Key Benefits
    Set objSlide = objPresentation.Slides.Add(slideIndex, 2) ' ppLayoutText
    objSlide.Shapes(1).TextFrame.TextRange.Text = "Key Benefits"
    benefitList = Replace(benefits, "|", vbCrLf & "✓ ")
    objSlide.Shapes(2).TextFrame.TextRange.Text = "✓ " & benefitList
    slideIndex = slideIndex + 1
End Sub