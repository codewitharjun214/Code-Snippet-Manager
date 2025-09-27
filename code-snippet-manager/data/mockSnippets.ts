
import type { Snippet } from '../types';

export const mockSnippets: Snippet[] = [
  {
    id: '1',
    title: 'React Functional Component',
    description: 'A simple functional component in React with TypeScript, using useState hook.',
    code: `import React, { useState } from 'react';

interface Props {
  initialCount: number;
}

const Counter: React.FC<Props> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Counter;`,
    language: 'typescript',
    tags: ['react', 'typescript', 'hook', 'frontend'],
    isFavorite: true,
    createdAt: new Date('2023-10-26T10:00:00Z').toISOString(),
  },
  {
    id: '2',
    title: 'Python Flask API Endpoint',
    description: 'A basic GET endpoint using the Flask framework in Python.',
    code: `from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify(message="Hello, World!")

if __name__ == '__main__':
    app.run(debug=True)`,
    language: 'python',
    tags: ['python', 'flask', 'api', 'backend'],
    isFavorite: false,
    createdAt: new Date('2023-10-25T14:30:00Z').toISOString(),
  },
  {
    id: '3',
    title: 'CSS Flexbox Centering',
    description: 'A utility class to center an element both horizontally and vertically using Flexbox.',
    code: `.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
    language: 'css',
    tags: ['css', 'flexbox', 'layout', 'styling'],
    isFavorite: true,
    createdAt: new Date('2023-10-24T09:15:00Z').toISOString(),
  },
    {
    id: '4',
    title: 'SQL Left Join',
    description: 'Example of a LEFT JOIN to select all records from the left table, and the matched records from the right table.',
    code: `SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID
ORDER BY Customers.CustomerName;`,
    language: 'sql',
    tags: ['sql', 'database', 'query', 'join'],
    isFavorite: false,
    createdAt: new Date('2023-10-22T18:00:00Z').toISOString(),
  },
];
