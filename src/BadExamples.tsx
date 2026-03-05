import { useEffect, useState } from "react";

// ❌ ISSUE 1: Conditional hook calls
const ComponentWithConditionalHook = ({
  showCount,
}: {
  showCount: boolean;
}) => {
  // react-hooks/rules-of-hooks ERROR: Conditional hook usage
  if (showCount) {
    const [count] = useState(0); // Hooks must be called unconditionally!
    return <div>Count: {count}</div>;
  }

  return <div>No count</div>;
};

// ❌ ISSUE 2: Mutating props
const ComponentMutatingProps = ({ data }: { data: { value: number } }) => {
  // react-hooks/immutability ERROR: Mutating props
  data.value = 100; // Never mutate props!

  return <div>Data: {data.value}</div>;
};

// ❌ ISSUE 3: Side effects during render
const externalStore = { data: {} as Record<string, number> };
const ComponentWithSideEffect = ({ value }: { value: number }) => {
  // react-hooks/purity ERROR: Side effect during render
  externalStore.data["key"] = value; // Side effects should be in useEffect!

  return (
    <div>
      <h3>❌ Issue 3: Side Effect During Render</h3>
      <p>Value: {value}</p>
    </div>
  );
};

// ❌ ISSUE 4: Mutating state directly
const ComponentMutatingState = () => {
  const [user, setUser] = useState({ name: "John", age: 25 });

  const updateAge = () => {
    // react-hooks/immutability ERROR: Direct state mutation
    user.age = 26; // Never mutate state directly!
    setUser(user); // This won't trigger re-render properly
  };

  return (
    <div>
      <h3>❌ Issue 4: Direct State Mutation</h3>
      <p>Age: {user.age}</p>
      <button onClick={updateAge}>Update Age</button>
    </div>
  );
};

// ❌ ISSUE 5: Hook inside a loop
const ComponentWithHookInLoop = ({ items }: { items: number[] }) => {
  // react-hooks/rules-of-hooks ERROR: Hook inside a loop
  for (let i = 0; i < items.length; i++) {
    useState(items[i]); // Hooks cannot be called in loops
  }

  return <div>Items count: {items.length}</div>;
};

// ❌ ISSUE 6: Hook inside nested function
const ComponentWithNestedHook = () => {
  function createState() {
    // react-hooks/rules-of-hooks ERROR: Hook inside nested function
    const [count] = useState(0);
    return count;
  }

  const value = createState();

  return <div>Value: {value}</div>;
};

// ❌ ISSUE 7: Missing dependencies in useEffect
// Note: React Compiler correctly memoizes this component because the component
// itself is pure — the bug is inside useEffect, which is a separate concern.
const ComponentWithMissingDeps = ({ value }: { value: number }) => {
  useEffect(() => {
    console.log(value);
  }, []); // react-hooks/exhaustive-deps ERROR: Missing dependency 'value'

  return <div>Value: {value}</div>;
};

// ❌ ISSUE 8: Component defined inside render
const ComponentWithNestedComponent = () => {
  const [count] = useState(0);

  // react-hooks/rules-of-hooks ERROR: Unstable component definition
  const InnerComponent = () => {
    return <div>Inner count: {count}</div>;
  };

  return <InnerComponent />;
};

// ❌ ISSUE 9: Mutating object used by hooks
const ComponentMutatingDependency = () => {
  const [config] = useState({ enabled: true });

  // react-hooks/immutability ERROR: Mutation of reactive value
  config.enabled = false;

  return <div>Enabled: {String(config.enabled)}</div>;
};

const BadExamples = () => {
  const [showIssue, setShowIssue] = useState<number | null>(null);

  return (
    <div className="p-10 min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-[48px] mb-4 bg-[linear-gradient(135deg,#ff6b6b_0%,#ee5a52_100%)] bg-clip-text text-transparent">
          React Compiler - Rules of React Violations
        </h1>
        <p className="text-[#ff6b6b] text-lg mb-10">
          ⚠️ This file contains intentional violations of Rules of React.
          <br />
          Check ESLint errors in your IDE or run:{" "}
          <code className="bg-[#1a1a1a] px-2 py-1 rounded">yarn lint</code>
        </p>

        <div className="mb-[30px]">
          <h2 className="text-[28px] mb-5">Select an issue to view:</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowIssue(1)}
              className="px-5 py-3 text-[15px] bg-[#2a2a2a] text-white border border-[#444] rounded-lg cursor-pointer"
            >
              Issue 1: Conditional Hooks
            </button>
            <button
              onClick={() => setShowIssue(2)}
              className="px-5 py-3 text-[15px] bg-[#2a2a2a] text-white border border-[#444] rounded-lg cursor-pointer"
            >
              Issue 2: Props Mutation
            </button>
            <button
              onClick={() => setShowIssue(3)}
              className="px-5 py-3 text-[15px] bg-[#2a2a2a] text-white border border-[#444] rounded-lg cursor-pointer"
            >
              Issue 3: Side Effects
            </button>
            <button
              onClick={() => setShowIssue(4)}
              className="px-5 py-3 text-[15px] bg-[#2a2a2a] text-white border border-[#444] rounded-lg cursor-pointer"
            >
              Issue 4: State Mutation
            </button>
            <button
              onClick={() => setShowIssue(5)}
              className="px-5 py-3 text-[15px] bg-[#2a2a2a] text-white border border-[#444] rounded-lg cursor-pointer"
            >
              Issue 5: Hook in Loop
            </button>
            <button
              onClick={() => setShowIssue(6)}
              className="px-5 py-3 text-[15px] bg-[#2a2a2a] text-white border border-[#444] rounded-lg cursor-pointer"
            >
              Issue 6: Nested Hook
            </button>
            <button
              onClick={() => setShowIssue(7)}
              className="px-5 py-3 text-[15px] bg-[#2a2a2a] text-white border border-[#444] rounded-lg cursor-pointer"
            >
              Issue 7: Missing Effect Deps
            </button>
            <button
              onClick={() => setShowIssue(8)}
              className="px-5 py-3 text-[15px] bg-[#2a2a2a] text-white border border-[#444] rounded-lg cursor-pointer"
            >
              Issue 8: Nested Component
            </button>
            <button
              onClick={() => setShowIssue(9)}
              className="px-5 py-3 text-[15px] bg-[#2a2a2a] text-white border border-[#444] rounded-lg cursor-pointer"
            >
              Issue 9: Mutating Hook Value
            </button>
          </div>
        </div>

        <div className="p-[30px] border-2 border-[#ff6b6b] rounded-xl bg-[#1a0a0a] min-h-[300px]">
          {showIssue === 1 && <ComponentWithConditionalHook showCount={true} />}
          {showIssue === 2 && <ComponentMutatingProps data={{ value: 42 }} />}
          {showIssue === 3 && <ComponentWithSideEffect value={5} />}
          {showIssue === 4 && <ComponentMutatingState />}
          {showIssue === 5 && <ComponentWithHookInLoop items={[1, 2, 3]} />}
          {showIssue === 6 && <ComponentWithNestedHook />}
          {showIssue === 7 && <ComponentWithMissingDeps value={5} />}
          {showIssue === 8 && <ComponentWithNestedComponent />}
          {showIssue === 9 && <ComponentMutatingDependency />}
          {showIssue === null && (
            <p className="text-[#888] text-lg text-center">
              Select an issue above to see the problem
            </p>
          )}
        </div>

        <div className="mt-10 p-[30px] bg-[linear-gradient(135deg,#2a2a2a_0%,#1f1f1f_100%)] rounded-xl border border-[#333]">
          <h4 className="text-2xl mb-4">
            🚨 Common Rules of React Violations:
          </h4>
          <ul className="text-left text-base leading-[2]">
            <li>❌ Conditional hook calls</li>
            <li>❌ Mutating props directly</li>
            <li>❌ Side effects during render (use useEffect instead)</li>
            <li>❌ Mutating state directly</li>
            <li>❌ Hooks in loops or nested functions</li>
            <li>❌ Missing useEffect dependencies</li>
            <li>❌ Component defined inside render</li>
            <li>❌ Mutating reactive values</li>
          </ul>
          <h4 className="mt-6 text-2xl mb-4">
            ✅ How violations are detected:
          </h4>
          <ul className="text-left text-base leading-[2]">
            <li>
              ✅ <code>react-hooks/rules-of-hooks</code> — Issues 1, 5, 6, 8
            </li>
            <li>
              <li>
                ✅ <code>react-hooks/exhaustive-deps</code> — Issue 7 (component is pure, bug is inside useEffect)
              </li>
            </li>
            <li>
              ✅ <code>react-hooks/immutability</code> — Issues 2, 4, 9
            </li>
            <li>
              ✅ <code>react-hooks/purity</code> — Issue 3
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BadExamples;
