# Graph Report - frontend  (2026-05-18)

## Corpus Check
- 77 files · ~435,475 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 304 nodes · 353 edges · 30 communities (25 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e786b448`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 17|Community 17]]

## God Nodes (most connected - your core abstractions)
1. `contentService` - 9 edges
2. `examService` - 7 edges
3. `Backend Architecture Plan & Admin Panel: Krishna Engineering College (KEC)` - 7 edges
4. `leadershipService` - 6 edges
5. `4. Admin Panel Features & Controls (React Interface mapping to Go API)` - 6 edges
6. `Admin & Management Feature Proposals (KEC)` - 6 edges
7. `3. Critical Bugs & Structural Failures Detected` - 6 edges
8. `applicationService` - 5 edges
9. `departmentService` - 5 edges
10. `authService` - 5 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (30 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (14): adminAccountService, api, examService, facilityService, facultyService, leadershipService, pressMediaService, researchService (+6 more)

### Community 1 - "Community 1"
Cohesion: 0.04
Nodes (47): About, AdminLayout, AdminLogin, AdminManager, AdmissionKEC, AdmissionManager, AdvancedCodingRegistration, AffiliationAccreditation (+39 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (5): alumniService, fadeImgVariants, slides, textContainerVariants, textItemVariants

### Community 3 - "Community 3"
Cohesion: 0.1
Nodes (5): icons, affiliations, affiliations, colors, mainCategories

### Community 4 - "Community 4"
Cohesion: 0.1
Nodes (19): 📊 **1. Command Dashboard Overview**, 1. Technology Stack, 📋 **2. Application Management Hub**, 2. Project Directory Structure (Standard Go Layout), 📢 **3. Content & News Management (CMS)**, 3. Core Database Schema (Models), 4. Admin Panel Features & Controls (React Interface mapping to Go API), 🏢 **4. Department / Dynamic Site Configuration** (+11 more)

### Community 5 - "Community 5"
Cohesion: 0.11
Nodes (6): admissionService, placementService, columns, companiesData, customStyles, iconMap

### Community 6 - "Community 6"
Cohesion: 0.13
Nodes (5): contentService, bodyFont, colors, headingFont, NoticeBoard

### Community 7 - "Community 7"
Cohesion: 0.14
Nodes (13): 1.1 Technology Stack, 1.2 Database Core Schema, 1.3 Key API Endpoints, 2.1 Lead & Admission Management (CRM), 2.2 Dynamic Content Management System (CMS), 2.3 Maker-Checker Automation & Security (RBAC), 3.1 Performance & Payload Optimization, 3.2 Eradicating Critical Rendering Bugs (+5 more)

### Community 8 - "Community 8"
Cohesion: 0.17
Nodes (11): 🔴 1. Critical React State Violation (App Crash Risk), 1. Executive Summary, 🔴 2. Missing Form Fields (Data Collection Failure), 2. Performance Summary & Metrics, 3. Critical Bugs & Structural Failures Detected, 🟠 3. Invalid HTML Wrapping (Accessibility Break), 🟠 4. Hash Jumps Destroying Smooth Scroll, 4. Proposed Fix Timeline (+3 more)

### Community 9 - "Community 9"
Cohesion: 0.22
Nodes (5): AdminLayout(), getAdminUser(), GalleryAdminLayout(), getAdminUser(), authService

### Community 12 - "Community 12"
Cohesion: 0.29
Nodes (3): courseService, iconOptions, iconMap

### Community 13 - "Community 13"
Cohesion: 0.29
Nodes (6): 💼 1. Built-in CRM (Lead & Admission Management), 🛡️ 2. Maker-Checker System (Approval Workflows), 📂 3. Document Verification Portal, 💸 4. Payment Tracking & Fee Collection, 🎨 5. Homepage & UI Control Engine, Admin & Management Feature Proposals (KEC)

## Knowledge Gaps
- **109 isolated node(s):** `queryClient`, `Home`, `About`, `AdmissionKEC`, `FacilitiesPage` (+104 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `contentService` connect `Community 6` to `Community 0`, `Community 10`, `Community 11`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `queryClient`, `Home`, `About` to the rest of the system?**
  _109 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.04 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._