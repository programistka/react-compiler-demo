import { useState } from "react";

// Child component - normally we would use React.memo()
// But with React Compiler it's not needed!
const ExpensiveChild = ({ count, onIncrement }: { count: number; onIncrement: () => void }) => {
  console.log('ExpensiveChild rendering');

  return (
    <div style={{ padding: '30px', border: '2px solid #646cff', margin: '20px 0', borderRadius: '12px', background: '#0f0f0f' }}>
      <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Child Component (without memo)</h3>
      <p style={{ fontSize: '20px', marginBottom: '16px' }}>Count: <span style={{ color: '#646cff', fontWeight: 'bold' }}>{count}</span></p>
      <button onClick={onIncrement} style={{ padding: '12px 24px', fontSize: '16px' }}>Increment count</button>
    </div>
  );
};

// List item - normally we would also use React.memo()
const ListItem = ({ item, onRemove }: { item: string; onRemove: (item: string) => void }) => {
  console.log(`ListItem "${item}" rendering`);

  return (
    <li style={{ padding: '12px 16px', margin: '8px 0', background: '#1a1a1a', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #333' }}>
      <span style={{ fontSize: '16px' }}>{item}</span>
      <button
        onClick={() => onRemove(item)}
        style={{
          padding: '8px 16px',
          background: '#ff6b6b',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        Remove
      </button>
    </li>
  );
};

const GoodExamples = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('');

  // Normally we would use useCallback() for these functions
  // But with React Compiler it's not needed!
  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  const handleRemoveItem = (itemToRemove: string) => {
    setItems(prev => prev.filter(item => item !== itemToRemove));
  };

  const handleAddItem = () => {
    if (inputValue.trim()) {
      setItems(prev => [...prev, inputValue]);
      setInputValue('');
    }
  };

  // Normally we would use useMemo() for this expensive operation
  // But with React Compiler it's automatically memoized!
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(filter.toLowerCase())
  );

  // Normally we would use useMemo() for this calculation
  const expensiveCalculation = filteredItems.reduce((acc, item) => {
    // Simulating an expensive operation
    let result = 0;
    for (let i = 0; i < 1000; i++) {
      result += item.length;
    }
    return acc + result;
  }, 0);

  return (
    <div style={{ padding: '40px', minHeight: '100vh', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '16px', background: 'linear-gradient(135deg, #646cff 0%, #61dafb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>React Compiler Demo</h1>
        <p style={{ color: '#888', fontSize: '18px', marginBottom: '40px' }}>
          This component would normally require memo, useMemo and useCallback.
          <br />
          With React Compiler everything is automatically optimized! 🚀
        </p>

      {/* Child component with callback function - normally would need useCallback */}
      <ExpensiveChild count={count} onIncrement={handleIncrement} />

      {/* Result of "expensive" calculation - normally would need useMemo */}
      <div style={{ padding: '30px', background: '#1a1a1a', margin: '20px 0', borderRadius: '12px', border: '1px solid #333' }}>
        <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Expensive Calculation (without useMemo)</h3>
        <p style={{ fontSize: '20px', color: '#646cff' }}>Result: {expensiveCalculation}</p>
      </div>

      {/* List with filtering - normally would need useMemo and useCallback */}
      <div style={{ padding: '30px', border: '2px solid #61dafb', margin: '20px 0', borderRadius: '12px', background: '#0f0f0f' }}>
        <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>Items List (without memo on components)</h3>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="New item..."
            style={{ padding: '12px 16px', marginRight: '5px', minWidth: '300px', background: '#1a1a1a', border: '1px solid #333', color: 'white', borderRadius: '8px', fontSize: '16px' }}
          />
          <button onClick={handleAddItem} style={{ padding: '12px 24px', fontSize: '16px' }}>Add</button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter list..."
            style={{ padding: '12px 16px', minWidth: '300px', background: '#1a1a1a', border: '1px solid #333', color: 'white', borderRadius: '8px', fontSize: '16px' }}
          />
        </div>

        <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
          {filteredItems.map(item => (
            <ListItem
              key={item}
              item={item}
              onRemove={handleRemoveItem}
            />
          ))}
        </ul>

        <p style={{ fontSize: '14px', color: '#888', marginTop: '16px' }}>
          Number of items: {filteredItems.length} / {items.length}
        </p>
      </div>

      <div style={{ marginTop: '40px', padding: '30px', background: 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%)', borderRadius: '12px', border: '1px solid #333' }}>
        <h4 style={{ fontSize: '24px', marginBottom: '16px' }}>💡 What React Compiler does for you:</h4>
        <ul style={{ textAlign: 'left', fontSize: '16px', lineHeight: '2' }}>
          <li>✅ Automatically memoizes components (instead of React.memo)</li>
          <li>✅ Automatically memoizes values (instead of useMemo)</li>
          <li>✅ Automatically memoizes functions (instead of useCallback)</li>
          <li>✅ Optimizes re-rendering without manual intervention</li>
        </ul>
      </div>
      </div>
    </div>
  );
};

export default GoodExamples;
