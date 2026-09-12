from __future__ import annotations

import json
import os
import sys
from pathlib import Path

report = Path("reports/cucumber-report.json")
total = passed = failed = skipped = 0

if report.exists():
    features = json.loads(report.read_text(encoding="utf-8"))
    for feature in features:
        for scenario in feature.get("elements", []):
            if scenario.get("type") != "scenario":
                continue

            total += 1
            statuses = [
                step.get("result", {}).get("status", "unknown")
                for step in scenario.get("steps", [])
            ]

            if any(status in {"failed", "ambiguous", "undefined", "pending", "unknown"}
                   for status in statuses):
                failed += 1
            elif any(status == "skipped" for status in statuses):
                skipped += 1
            else:
                passed += 1

browser = os.getenv("BROWSER", "browser").title()
icon = "✅" if report.exists() and failed == 0 else "❌"
headline = (
    f"{icon} {passed} passed, {failed} failed, {skipped} skipped"
    if report.exists()
    else "❌ Cucumber JSON report was not generated"
)

summary = f"""## {browser} scenario results

### {headline}

| Total | Passed | Failed | Skipped |
| ---: | ---: | ---: | ---: |
| {total} | {passed} | {failed} | {skipped} |

The HTML and JSON Cucumber reports are available in the workflow artifacts.
"""

print(headline)
if path := os.getenv("GITHUB_STEP_SUMMARY"):
    with Path(path).open("a", encoding="utf-8") as output:
        output.write(summary)

if path := os.getenv("GITHUB_OUTPUT"):
    with Path(path).open("a", encoding="utf-8") as output:
        output.write(f"passed={passed}\nfailed={failed}\nskipped={skipped}\n")

if not report.exists():
    print("::error title=Scenario report missing::Cucumber did not create its JSON report")
    sys.exit(1)

if failed:
    print(f"::error title={browser} scenarios failed::{failed} failed, {passed} passed")
else:
    print(f"::notice title={browser} scenarios passed::{passed} passed, {skipped} skipped")
