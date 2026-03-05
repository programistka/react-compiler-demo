import { useState } from 'react';
import GoodExamples from "./GoodExamples.tsx";
import BadExamples from "./BadExamples.tsx";

const App = () => {
  const [activeTab, setActiveTab] = useState<'good' | 'bad'>('good');

  return (
    <div>
      {/* Tab Navigation */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'linear-gradient(135deg, #1a1a1a 0%, #242424 100%)',
        borderBottom: '1px solid #333',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{
          display: 'flex',
          gap: '0',
          maxWidth: '100%'
        }}>
          <button
            onClick={() => setActiveTab('good')}
            style={{
              flex: 1,
              padding: '20px 32px',
              background: activeTab === 'good'
                ? 'linear-gradient(135deg, #646cff 0%, #535bf2 100%)'
                : 'transparent',
              color: 'white',
              border: 'none',
              borderBottom: activeTab === 'good' ? '4px solid #646cff' : '4px solid transparent',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: activeTab === 'good' ? '700' : '500',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            <span style={{ fontSize: '24px' }}>✅</span>
            <span>Good Examples</span>
          </button>
          <button
            onClick={() => setActiveTab('bad')}
            style={{
              flex: 1,
              padding: '20px 32px',
              background: activeTab === 'bad'
                ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)'
                : 'transparent',
              color: 'white',
              border: 'none',
              borderBottom: activeTab === 'bad' ? '4px solid #ff6b6b' : '4px solid transparent',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: activeTab === 'bad' ? '700' : '500',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            <span style={{ fontSize: '24px' }}>❌</span>
            <span>Bad Examples</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'good' ? <GoodExamples /> : <BadExamples />}
      </div>
    </div>
  );
};

export default App
