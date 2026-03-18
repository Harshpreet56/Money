import React, { useEffect, useState } from 'react';
import axios from "axios";


function App() {

  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  
  const [form, setForm] = useState({
    text: "",
    amount: "",
    type: "income",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/all");

   const incomeData = res.data.filter(item => item.type === "income");
    const expenseData = res.data.filter(item => item.type === "expense");

    setIncome(incomeData);
    setExpense(expenseData);
  }

   const handleAdd = async () => {
    if (!form.text || !form.amount) return;

    const res = await axios.post("http://localhost:5000/api/add", form);

    if (form.type === "income") {
      setIncome([...income, res.data]);
    } else {
      setExpense([...expense, res.data]);
    }

    setForm({ text: "", amount: "", type: "income" });
  };

  const handleDelete = async (id, type) => {
    await axios.delete(`http://localhost:5000/api/${id}`);

    if (type === "income") {
      setIncome(income.filter(item => item._id !== id));
    } else {
      setExpense(expense.filter(item => item._id !== id));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const totalIncome = income.reduce((a, b) => a + Number(b.amount), 0);
  const totalExpense = expense.reduce((a, b) => a + Number(b.amount), 0);
  const balance = totalIncome - totalExpense;


  return (
    <>
     <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 p-6 text-white">
      <div className="max-w-5xl mx-auto">

        <div className="mb-6">
          <h1 className="text-3xl font-bold">💰 Money Tracker</h1>
          <p className="text-gray-400">Manage your income and expenses</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl shadow">
            <p className="text-gray-300">Income</p>
            <h2 className="text-2xl font-bold text-green-400">₹{totalIncome}</h2>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl shadow">
            <p className="text-gray-300">Expense</p>
            <h2 className="text-2xl font-bold text-red-400">₹{totalExpense}</h2>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl shadow">
            <p className="text-gray-300">Balance</p>
            <h2 className="text-2xl font-bold text-blue-400">₹{balance}</h2>
          </div>
        </div>


        <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl mb-6 space-y-4">

          <div className="flex bg-gray-800 rounded-xl p-1 w-fit">
            <button
              onClick={() => setForm({ ...form, type: "income" })}
              className={`px-4 py-1 rounded-lg text-sm font-medium transition ${
                form.type === "income"
                  ? "bg-green-500 text-white"
                  : "text-gray-400"
              }`}
            >
              Income
            </button>

            <button
              onClick={() => setForm({ ...form, type: "expense" })}
              className={`px-4 py-1 rounded-lg text-sm font-medium transition ${
                form.type === "expense"
                  ? "bg-red-500 text-white"
                  : "text-gray-400"
              }`}
            >
              Expense
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              name="text"
              value={form.text}
              onChange={handleChange}
              placeholder="Description"
              className="bg-transparent border border-gray-600 p-2 rounded w-full focus:outline-none focus:border-blue-400"
            />

            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="bg-transparent border border-gray-600 p-2 rounded w-full md:w-40 focus:outline-none focus:border-blue-400"
            />

            <button
              onClick={handleAdd}
              className={`px-4 py-2 rounded font-semibold transition ${
                form.type === "income"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              + Add {form.type === "income" ? "Income" : "Expense"}
            </button>
          </div>

        </div>

        {/* Lists remain unchanged */}
        {/* Lists */}
<div className="grid md:grid-cols-2 gap-6">

  {/* Income */}
  <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl">
    <h2 className="text-lg font-semibold mb-3 text-green-400">Income</h2>

    <div className="max-h-64 overflow-y-auto space-y-2">
      {income.length === 0 ? (
        <p className="text-gray-400 text-sm">No income added</p>
      ) : (
        income.map((item) => (
          <div key={item._id} className="flex justify-between bg-green-500/10 p-2 rounded">
            <span>{item.text}</span>
            <span className="text-green-400">₹{item.amount}</span>
          </div>
        ))
      )}
    </div>
  </div>

  {/* Expense */}
  <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl">
    <h2 className="text-lg font-semibold mb-3 text-red-400">Expense</h2>

    <div className="max-h-64 overflow-y-auto space-y-2">
      {expense.length === 0 ? (
        <p className="text-gray-400 text-sm">No expenses added</p>
      ) : (
        expense.map((item) => (
          <div key={item._id} className="flex justify-between bg-red-500/10 p-2 rounded">
            <span>{item.text}</span>
            <span className="text-red-400">₹{item.amount}</span>
          </div>
        ))
      )}
    </div>
  </div>

</div>
      </div>
    </div>
    </>
  )
}

export default App