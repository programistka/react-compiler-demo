import { useState } from 'react';

// ❌ ISSUE 1: Mutating objects after creation
const ComponentWithMutation = () => {
  const [count, setCount] = useState(0);

  // React Compiler ERROR: Object mutation
  const config = { value: 1 };
  config.value = count; // Mutating after creation!

  return (
    <div>
      <h3>❌ Issue 1: Object Mutation</h3>
      <p>Config value: {config.value}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

// ❌ ISSUE 2: Mutating arrays
const ComponentWithArrayMutation = () => {
  const [items, setItems] = useState([1, 2, 3]);

  // React Compiler ERROR: Array mutation
  const newItems = items;
  newItems.push(4); // Direct mutation!

  return (
    <div>
      <h3>❌ Issue 2: Array Mutation</h3>
      <p>Items: {newItems.join(', ')}</p>
      <button onClick={() => setItems([...items, items.length + 1])}>
        Add Item
      </button>
    </div>
  );
};

// ❌ ISSUE 3: Conditional hook calls
const ComponentWithConditionalHook = ({ showCount }: { showCount: boolean }) => {
  // React Compiler ERROR: Conditional hook usage
  if (showCount) {
    const [count] = useState(0); // Hooks must be called unconditionally!
    return <div>Count: {count}</div>;
  }

  return <div>No count</div>;
};

// ❌ ISSUE 4: Mutating props
const ComponentMutatingProps = ({ data }: { data: { value: number } }) => {
  // React Compiler ERROR: Mutating props
  data.value = 100; // Never mutate props!

  return <div>Data: {data.value}</div>;
};

// ❌ ISSUE 5: Side effects during render
const ComponentWithSideEffect = () => {
  const [count, setCount] = useState(0);

  // React Compiler ERROR: Side effect during render
  document.title = `Count: ${count}`; // Side effects should be in useEffect!

  return (
    <div>
      <h3>❌ Issue 5: Side Effect During Render</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

// ❌ ISSUE 6: Using previous state incorrectly
const ComponentWithStaleState = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // React Compiler WARNING: Using stale state
    setCount(count + 1);
    setCount(count + 1); // This won't increment by 2!
    // Should use: setCount(prev => prev + 1)
  };

  return (
    <div>
      <h3>❌ Issue 6: Stale State</h3>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment Twice (broken)</button>
    </div>
  );
};

// ❌ ISSUE 7: Mutating state directly
const ComponentMutatingState = () => {
  const [user, setUser] = useState({ name: 'John', age: 25 });

  const updateAge = () => {
    // React Compiler ERROR: Direct state mutation
    user.age = 26; // Never mutate state directly!
    setUser(user); // This won't trigger re-render properly
  };

  return (
    <div>
      <h3>❌ Issue 7: Direct State Mutation</h3>
      <p>Age: {user.age}</p>
      <button onClick={updateAge}>Update Age</button>
    </div>
  );
};

// ❌ ISSUE 8: Derived state without proper dependencies
const ComponentWithDerivedState = ({ items }: { items: string[] }) => {
  // React Compiler WARNING: Derived state should be computed during render
  const [itemCount, setItemCount] = useState(items.length);

  // This is redundant - just compute it directly!
  // const itemCount = items.length; // Correct way

  return (
    <div>
      <h3>❌ Issue 8: Unnecessary Derived State</h3>
      <p>Item count: {itemCount}</p>
    </div>
  );
};

// ✅ CORRECT VERSION: How to fix the issues
const ComponentCorrect = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([1, 2, 3]);

  // ✅ No mutations - create new objects
  const config = { value: count };

  // ✅ Use functional updates for state
  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  // ✅ Create new array instead of mutating
  const handleAddItem = () => {
    setItems(prev => [...prev, prev.length + 1]);
  };

  return (
    <div>
      <h3>✅ Correct Implementation</h3>
      <p>Config: {config.value}</p>
      <p>Items: {items.join(', ')}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

const BadExamples = () => {
  const [showIssue, setShowIssue] = useState<number | null>(null);

  return (
    <div style={{ padding: '40px', minHeight: '100vh', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '16px', background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>React Compiler - Rules of React Violations</h1>
        <p style={{ color: '#ff6b6b', fontSize: '18px', marginBottom: '40px' }}>
          ⚠️ This file contains intentional violations of Rules of React.
          <br />
          Check ESLint errors in your IDE or run: <code style={{ background: '#1a1a1a', padding: '4px 8px', borderRadius: '4px' }}>yarn lint</code>
        </p>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Select an issue to view:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <button onClick={() => setShowIssue(1)} style={{ padding: '12px 20px', fontSize: '15px', background: '#2a2a2a', color: 'white', border: '1px solid #444', borderRadius: '8px', cursor: 'pointer' }}>Issue 1: Mutation</button>
            <button onClick={() => setShowIssue(2)} style={{ padding: '12px 20px', fontSize: '15px', background: '#2a2a2a', color: 'white', border: '1px solid #444', borderRadius: '8px', cursor: 'pointer' }}>Issue 2: Array Mutation</button>
            <button onClick={() => setShowIssue(5)} style={{ padding: '12px 20px', fontSize: '15px', background: '#2a2a2a', color: 'white', border: '1px solid #444', borderRadius: '8px', cursor: 'pointer' }}>Issue 5: Side Effects</button>
            <button onClick={() => setShowIssue(6)} style={{ padding: '12px 20px', fontSize: '15px', background: '#2a2a2a', color: 'white', border: '1px solid #444', borderRadius: '8px', cursor: 'pointer' }}>Issue 6: Stale State</button>
            <button onClick={() => setShowIssue(7)} style={{ padding: '12px 20px', fontSize: '15px', background: '#2a2a2a', color: 'white', border: '1px solid #444', borderRadius: '8px', cursor: 'pointer' }}>Issue 7: State Mutation</button>
            <button onClick={() => setShowIssue(99)} style={{ padding: '12px 20px', fontSize: '15px', background: '#2a7a2a', color: 'white', border: '1px solid #4a4', borderRadius: '8px', cursor: 'pointer' }}>✅ Correct Version</button>
          </div>
        </div>

        <div style={{ padding: '30px', border: '2px solid #ff6b6b', borderRadius: '12px', background: '#1a0a0a', minHeight: '300px' }}>
        {showIssue === 1 && <ComponentWithMutation />}
        {showIssue === 2 && <ComponentWithArrayMutation />}
        {showIssue === 5 && <ComponentWithSideEffect />}
        {showIssue === 6 && <ComponentWithStaleState />}
        {showIssue === 7 && <ComponentMutatingState />}
        {showIssue === 99 && <ComponentCorrect />}
        {showIssue === null && (
          <p style={{ color: '#888', fontSize: '18px', textAlign: 'center' }}>Select an issue above to see the problematic code</p>
        )}
        </div>

        <div style={{ marginTop: '40px', padding: '30px', background: 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%)', borderRadius: '12px', border: '1px solid #333' }}>
          <h4 style={{ fontSize: '24px', marginBottom: '16px' }}>🚨 Common Rules of React Violations:</h4>
          <ul style={{ textAlign: 'left', fontSize: '16px', lineHeight: '2' }}>
            <li>❌ Mutating objects/arrays after creation</li>
            <li>❌ Mutating props or state directly</li>
            <li>❌ Conditional hook calls</li>
            <li>❌ Side effects during render (use useEffect instead)</li>
            <li>❌ Using stale state values in updates</li>
            <li>❌ Unnecessary derived state</li>
          </ul>
          <h4 style={{ marginTop: '24px', fontSize: '24px', marginBottom: '16px' }}>✅ React Compiler will:</h4>
          <ul style={{ textAlign: 'left', fontSize: '16px', lineHeight: '2' }}>
            <li>✅ Detect these violations via ESLint</li>
            <li>✅ Prevent compilation if rules are broken</li>
            <li>✅ Help you write better, optimizable code</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BadExamples;
