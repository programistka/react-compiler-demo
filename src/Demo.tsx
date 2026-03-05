import { useState } from 'react';

// Child component - normally we would use React.memo()
// But with React Compiler it's not needed!
const ExpensiveChild = ({ count, onIncrement }: { count: number; onIncrement: () => void }) => {
  console.log('ExpensiveChild rendering');

  return (
    <div style={{ padding: '20px', border: '2px solid #646cff', margin: '10px 0' }}>
      <h3>Child Component (without memo)</h3>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>Increment count</button>
    </div>
  );
};

// List item - normally we would also use React.memo()
const ListItem = ({ item, onRemove }: { item: string; onRemove: (item: string) => void }) => {
  console.log(`ListItem "${item}" rendering`);

  return (
    <li style={{ padding: '5px', margin: '5px 0' }}>
      {item}
      <button
        onClick={() => onRemove(item)}
        style={{ marginLeft: '10px' }}
      >
        Remove
      </button>
    </li>
  );
};

const Demo = () => {
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
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>React Compiler Demo</h1>
      <p style={{ color: '#888', fontSize: '14px' }}>
        This component would normally require memo, useMemo and useCallback.
        <br />
        With React Compiler everything is automatically optimized! 🚀
      </p>

      {/* Child component with callback function - normally would need useCallback */}
      <ExpensiveChild count={count} onIncrement={handleIncrement} />

      {/* Result of "expensive" calculation - normally would need useMemo */}
      <div style={{ padding: '20px', background: '#1a1a1a', margin: '10px 0', borderRadius: '8px' }}>
        <h3>Expensive Calculation (without useMemo)</h3>
        <p>Result: {expensiveCalculation}</p>
      </div>

      {/* List with filtering - normally would need useMemo and useCallback */}
      <div style={{ padding: '20px', border: '2px solid #61dafb', margin: '10px 0' }}>
        <h3>Items List (without memo on components)</h3>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="New item..."
            style={{ padding: '8px', marginRight: '5px', minWidth: '200px' }}
          />
          <button onClick={handleAddItem}>Add</button>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter list..."
            style={{ padding: '8px', minWidth: '200px' }}
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

        <p style={{ fontSize: '12px', color: '#888' }}>
          Number of items: {filteredItems.length} / {items.length}
        </p>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#2a2a2a', borderRadius: '8px' }}>
        <h4>💡 What React Compiler does for you:</h4>
        <ul style={{ textAlign: 'left', fontSize: '14px' }}>
          <li>✅ Automatically memoizes components (instead of React.memo)</li>
          <li>✅ Automatically memoizes values (instead of useMemo)</li>
          <li>✅ Automatically memoizes functions (instead of useCallback)</li>
          <li>✅ Optimizes re-rendering without manual intervention</li>
        </ul>
      </div>
    </div>
  );
};

export default Demo;
