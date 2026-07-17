# Más allá de las pruebas unitarias · QA para Agentes de IA en AWS

Charla del **AWS GenAI Security Day 2026**. Estrategias de QA para agentes de IA, contadas como una analogía: **llevar un agente a producción es asegurar un aeropuerto** — capas, no una sola puerta.

Stack: [Strands Agents](https://strandsagents.com) · `strands-evals` · Amazon Bedrock Guardrails · Python. Slides con [Slidev](https://sli.dev).

## Las capas

| Gate | Control | Analogía |
|------|---------|----------|
| A1 | Evals deterministas (ToolCalled, Contains, …) | Detector de metales |
| B2 | Jueces LLM: calidad + trayectoria | El oficial que te observa |
| C3 | Fidelidad (FaithfulnessEvaluator) | Control de pasaportes |
| D4 | Red team + caos | Los encubiertos / TSA |
| E5 | Guardrails en runtime (Bedrock) | Puerta de embarque |

## Correr los slides

```bash
npm install
npm run dev      # abre en el navegador
```

Otros comandos:

```bash
npm run build    # SPA estática en dist/
npm run export   # PDF
```

## Autor

Kevin Lupera — Tech Lead @ Alegra · AWS Community Builder · AWS Solutions Architect Professional
[github.com/kevinlupera](https://github.com/kevinlupera) · [linkedin.com/in/kevin-lupera](https://linkedin.com/in/kevin-lupera)
