import os
from typing import Any, Dict, List

class InfographicRenderer:
    def render_infographic(self, data: Dict[str, Any], output_path: str) -> Dict[str, Any]:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        severity = data.get("severity", "HIGH")
        core_topic = data.get("core_topic", "Threat Intelligence")
        impact_summary = data.get("impact_summary", "Security incident requiring immediate attention.")
        metrics: List[Dict] = data.get("metrics", [])
        timeline: List[str] = data.get("timeline", [])
        threat_flow: List[str] = data.get("threat_flow", [])
        affected_systems: List[str] = data.get("affected_systems", [])
        indicators: List[str] = data.get("indicators", [])
        mitigation_flow: List[str] = data.get("mitigation_flow", [])

        # Severity colour
        sev_upper = severity.upper()
        sev_color = {"CRITICAL": "#7c3aed", "HIGH": "#ef4444", "MEDIUM": "#f59e0b", "LOW": "#10b981"}.get(sev_upper, "#ef4444")

        # ── METRIC CARDS (dynamic) ──────────────────────────────────────────
        metric_cards_svg = ""
        card_w, card_h, gap = 210, 110, 20
        card_x_start = 40
        for i, m in enumerate(metrics[:4]):
            cx = card_x_start + i * (card_w + gap)
            label = self._esc(str(m.get("label", "Metric")))
            value = self._esc(str(m.get("value", "—")))
            desc  = self._esc(str(m.get("description", ""))[:40])
            metric_cards_svg += f"""
  <g transform="translate({cx}, 110)">
    <rect width="{card_w}" height="{card_h}" fill="#1e293b" rx="8" stroke="#334155" stroke-width="1"/>
    <text x="14" y="32" fill="#94a3b8" font-family="sans-serif" font-size="11">{label}</text>
    <text x="14" y="68" fill="{sev_color}" font-family="sans-serif" font-size="30" font-weight="bold">{value}</text>
    <text x="14" y="94" fill="#64748b" font-family="sans-serif" font-size="10">{desc}</text>
  </g>"""

        # Fill remaining cards with Affected/Indicators counts if fewer than 3 metrics
        if len(metrics) < 1:
            metric_cards_svg += self._static_card(card_x_start, 110, card_w, card_h, "Threat Level", sev_upper, "Assessed severity", sev_color)
        if len(metrics) < 2:
            metric_cards_svg += self._static_card(card_x_start + card_w + gap, 110, card_w, card_h, "Affected Systems", str(len(affected_systems)) if affected_systems else "N/A", "Infrastructure nodes", "#38bdf8")
        if len(metrics) < 3:
            metric_cards_svg += self._static_card(card_x_start + 2*(card_w + gap), 110, card_w, card_h, "Indicators Found", str(len(indicators)) if indicators else "N/A", "IOC hashes and IPs", "#f59e0b")

        # ── TIMELINE (dynamic) ──────────────────────────────────────────────
        timeline_items_svg = ""
        for i, event in enumerate(timeline[:6]):
            ty = 310 + i * 26
            dot_color = sev_color if i == 0 else "#475569"
            timeline_items_svg += f"""
  <circle cx="58" cy="{ty}" r="5" fill="{dot_color}"/>
  <line x1="58" y1="{ty + 5}" x2="58" y2="{ty + 21}" stroke="#334155" stroke-width="1.5" stroke-dasharray="3,2"/>
  <text x="74" y="{ty + 4}" fill="#cbd5e1" font-family="sans-serif" font-size="11">{self._esc(str(event)[:80])}</text>"""

        # ── THREAT FLOW (dynamic) ───────────────────────────────────────────
        threat_flow_svg = ""
        for i, step in enumerate(threat_flow[:5]):
            fx = 460 + 0
            fy = 310 + i * 40
            arrow = "" if i == len(threat_flow[:5]) - 1 else f'<text x="{fx + 6}" y="{fy + 32}" fill="{sev_color}" font-size="14">↓</text>'
            threat_flow_svg += f"""
  <rect x="{fx}" y="{fy}" width="260" height="28" fill="#1e293b" rx="5" stroke="#334155"/>
  <text x="{fx + 10}" y="{fy + 18}" fill="#e2e8f0" font-family="sans-serif" font-size="11">{self._esc(str(step)[:40])}</text>
  {arrow}"""

        # ── MITIGATIONS (dynamic) ───────────────────────────────────────────
        miti_svg = ""
        for i, step in enumerate(mitigation_flow[:5]):
            my = 530 + i * 22
            miti_svg += f"""
  <text x="54" y="{my}" fill="#86efac" font-family="sans-serif" font-size="11">✓ {self._esc(str(step)[:90])}</text>"""

        # ── SVG HEIGHT (auto) ────────────────────────────────────────────────
        # min 700, grows with mitigation list
        total_h = max(750, 530 + len(mitigation_flow[:5]) * 22 + 40)

        svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 {total_h}" width="780" height="{total_h}">
  <!-- Background -->
  <rect width="780" height="{total_h}" fill="#0f172a" rx="14"/>

  <!-- Header bar -->
  <rect width="780" height="90" fill="#1e293b" rx="14"/>
  <rect y="76" width="780" height="14" fill="#1e293b"/>
  <rect x="40" y="24" width="6" height="42" fill="{sev_color}" rx="3"/>
  <text x="58" y="44" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="bold">{self._esc(core_topic[:70])}</text>
  <text x="58" y="68" fill="#94a3b8" font-family="sans-serif" font-size="12">{self._esc(impact_summary[:100])}</text>
  <!-- Severity badge -->
  <rect x="660" y="28" width="96" height="32" fill="{sev_color}" rx="6"/>
  <text x="708" y="50" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">{sev_upper}</text>

  <!-- Section: Metrics -->
  <text x="40" y="104" fill="#64748b" font-family="sans-serif" font-size="10" font-weight="bold" letter-spacing="1">KEY METRICS</text>
  {metric_cards_svg}

  <!-- Section: Timeline -->
  <text x="40" y="290" fill="#64748b" font-family="sans-serif" font-size="10" font-weight="bold" letter-spacing="1">EVENT TIMELINE</text>
  <line x1="58" y1="298" x2="58" y2="{290 + len(timeline[:6]) * 26 + 10}" stroke="#334155" stroke-width="1.5"/>
  {timeline_items_svg}

  <!-- Section: Threat Flow -->
  <text x="460" y="290" fill="#64748b" font-family="sans-serif" font-size="10" font-weight="bold" letter-spacing="1">ATTACK FLOW</text>
  {threat_flow_svg}

  <!-- Section: Mitigation -->
  <text x="40" y="515" fill="#64748b" font-family="sans-serif" font-size="10" font-weight="bold" letter-spacing="1">RECOMMENDED MITIGATIONS</text>
  <rect x="40" y="522" width="700" height="{len(mitigation_flow[:5]) * 22 + 16}" fill="#0f2718" rx="6" stroke="#166534"/>
  {miti_svg}

  <!-- Footer -->
  <text x="40" y="{total_h - 14}" fill="#334155" font-family="sans-serif" font-size="10">Generated by REVAMP AI Intelligence Platform</text>
  <text x="740" y="{total_h - 14}" fill="#334155" font-family="sans-serif" font-size="10" text-anchor="end">CONFIDENTIAL</text>
</svg>"""

        svg_file = output_path.replace(".json", ".svg")
        with open(svg_file, "w", encoding="utf-8") as f:
            f.write(svg)

        return {"json_data": data, "svg_path": svg_file}

    def _static_card(self, cx, cy, w, h, label, value, desc, color):
        return f"""
  <g transform="translate({cx}, {cy})">
    <rect width="{w}" height="{h}" fill="#1e293b" rx="8" stroke="#334155" stroke-width="1"/>
    <text x="14" y="32" fill="#94a3b8" font-family="sans-serif" font-size="11">{label}</text>
    <text x="14" y="68" fill="{color}" font-family="sans-serif" font-size="30" font-weight="bold">{value}</text>
    <text x="14" y="94" fill="#64748b" font-family="sans-serif" font-size="10">{desc}</text>
  </g>"""

    def _esc(self, text: str) -> str:
        """XML-escape a string for safe SVG embedding."""
        return (text
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace('"', "&quot;")
                .replace("'", "&#39;"))

infographic_renderer = InfographicRenderer()
