import { useState } from "react";

// Child component - normally we would use React.memo()
// But with React Compiler it's not needed!
const ExpensiveChild = ({ count, onIncrement }: { count: number; onIncrement: () => void }) => {
  console.log('ExpensiveChild rendering');

  return (
    <div className="p-[30px] border-2 border-[#646cff] my-5 rounded-xl bg-[#0f0f0f]">
      <h3 className="text-2xl mb-3">Child Component (without memo)</h3>
      <p className="text-xl mb-4">Count: <span className="text-[#646cff] font-bold">{count}</span></p>
      <button onClick={onIncrement} className="px-6 py-3 text-base">Increment count</button>
    </div>
  );
};

// List item - normally we would also use React.memo()
const ListItem = ({ item, onRemove }: { item: string; onRemove: (item: string) => void }) => {
  console.log(`ListItem "${item}" rendering`);

  return (
    <li className="px-4 py-3 my-2 bg-[#1a1a1a] rounded-lg flex justify-between items-center border border-[#333]">
      <span className="text-base">{item}</span>
      <button
        onClick={() => onRemove(item)}
        className="px-4 py-2 bg-[#ff6b6b] text-white border-none rounded-[6px] cursor-pointer text-sm font-medium"
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
    <div className="p-10 min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-[48px] mb-4 bg-[linear-gradient(135deg,#646cff_0%,#61dafb_100%)] bg-clip-text text-transparent">React Compiler Demo</h1>
        <p className="text-[#888] text-lg mb-10">
          This component would normally require memo, useMemo and useCallback.
          <br />
          With React Compiler everything is automatically optimized! 🚀
        </p>

      {/* Child component with callback function - normally would need useCallback */}
      <ExpensiveChild count={count} onIncrement={handleIncrement} />

      {/* Result of "expensive" calculation - normally would need useMemo */}
      <div className="p-[30px] bg-[#1a1a1a] my-5 rounded-xl border border-[#333]">
        <h3 className="text-2xl mb-3">Expensive Calculation (without useMemo)</h3>
        <p className="text-xl text-[#646cff]">Result: {expensiveCalculation}</p>
      </div>

      {/* List with filtering - normally would need useMemo and useCallback */}
      <div className="p-[30px] border-2 border-[#61dafb] my-5 rounded-xl bg-[#0f0f0f]">
        <h3 className="text-2xl mb-5">Items List (without memo on components)</h3>

        <div className="mb-5 flex gap-[10px] flex-wrap">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="New item..."
            className="px-4 py-3 mr-[5px] min-w-[300px] bg-[#1a1a1a] border border-[#333] text-white rounded-lg text-base"
          />
          <button onClick={handleAddItem} className="px-6 py-3 text-base">Add</button>
        </div>

        <div className="mb-5">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter list..."
            className="px-4 py-3 min-w-[300px] bg-[#1a1a1a] border border-[#333] text-white rounded-lg text-base"
          />
        </div>

        <ul className="text-left list-none p-0">
          {filteredItems.map(item => (
            <ListItem
              key={item}
              item={item}
              onRemove={handleRemoveItem}
            />
          ))}
        </ul>

        <p className="text-sm text-[#888] mt-4">
          Number of items: {filteredItems.length} / {items.length}
        </p>
      </div>

      <div className="mt-10 p-[30px] bg-[linear-gradient(135deg,#2a2a2a_0%,#1f1f1f_100%)] rounded-xl border border-[#333]">
        <h4 className="text-2xl mb-4">💡 What React Compiler does for you:</h4>
        <ul className="text-left text-base leading-[2]">
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
