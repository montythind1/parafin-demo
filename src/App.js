import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { ParafinWidget } from "@parafin/react";
import { Header } from "./components/Header.tsx";
import { SideNav } from "./components/SideNav.tsx";

const SCENARIOS = [
  { key: "no_offers", label: "1) No offers available", personId: "person_cd34adc8-86c6-4ee5-a49d-d75356dfc2e1" },
  { key: "preapproved", label: "2) Pre-approved offer", personId: "person_30d52368-79f6-4e07-8582-78e37c0c57d3" },
  { key: "capital_otw", label: "3) Capital on its way", personId: "person_4dad4290-8c83-4853-9af8-eea7d169adb6" },
  { key: "outstanding", label: "4) Accepted + outstanding balance", personId: "person_b25a1f05-5309-413f-a2f9-e5e0e6f772c8" },
  // This is for the Live demo used for recording
  { key: "Demo", label: "5) Just for Live Demo End to End", personId: "person_90326680-d793-4a77-a378-ade5053b5792" },
];

function App() {
  const [scenarioKey, setScenarioKey] = useState("no_offers");
  const [token, setToken] = useState(null);
  const [tab, setTab] = useState("capital");
  const [personInfo, setPersonInfo] = useState(null);

  const scenario = SCENARIOS.find((s) => s.key === scenarioKey) || SCENARIOS[0];

   // Fetch token whenever scenario changes
  useEffect(() => {
    // Change to false to use production or sandbox production environment
    const isDevEnvironment = false;

    const fetchToken = async () => {
      // Fetch Parafin token from server
      const response = await axios.get(
        `/parafin/token/${scenario.personId}/${isDevEnvironment}`
    );
      setToken(response.data.parafinToken);
    };

    setToken(null);     // force loading + ensure new fetch
    fetchToken();
  }, [scenario.personId]);

  // Fetch person info whenever scenario changes
  useEffect(() => {
  const fetchPerson = async () => {
    try {
      const res = await axios.get(`/parafin/person/${scenario.personId}`);
      setPersonInfo(res.data);
    } catch (e) {
      setPersonInfo(null);
    }
  };

  fetchPerson();
  }, [scenario.personId]);

  if (!token) {
    return <LoadingShell>loading...</LoadingShell>;
  }

  return (
    <div>
      <Header />
      <ContentShell>
        <SideNav onClick={(newProduct) => setTab(newProduct)} />
        {tab === "capital" && (
          <PageShell>
            <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              marginBottom: 12,
            }}
            >
            <b>SELECT STATE:</b>
            <select 
              value={scenarioKey}
              onChange={(e) => setScenarioKey(e.target.value)}
            >
              {SCENARIOS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
             {personInfo && (
                <span style={{ opacity: 0.7 }}>
                  <b>Person:</b> {personInfo.first_name} {personInfo.last_name}
                </span>
              )}
            </div>
              <ParafinWidget
                key={scenario.personId}
                token={token}
                product="capital"
                externalBusinessId={undefined}
            />
          </PageShell>
        )}
        {tab === "analytics" && (
          <PageShell>
            <h2>Analytics</h2>
          </PageShell>
        )}
        {tab === "payouts" && (
          <PageShell>
            <h2>Payouts</h2>
          </PageShell>
        )}
      </ContentShell>
    </div>
  );
}

export default App;

const ContentShell = styled.div`
  display: flex;
  flex-direction: row;
`;

const LoadingShell = styled.div`
  padding: 20px;
`;

const PageShell = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 40px;
  max-width: 1100px;
`;
