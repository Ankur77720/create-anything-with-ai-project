import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getTransactions, createTransaction } from "../utils/api.transaction";

export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const [ transactions, setTransactions ] = useState([]);
    const [ filter, setFilter ] = useState("all");
    const [ form, setForm ] = useState({ title: "", amount: "", type: "income" });

    // Fetch transactions on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTransactions(user.token);
                setTransactions(data);
            } catch (err) {
                alert("Failed to fetch transactions");
            }
        };
        fetchData();
    }, [ user.token ]);

    // Submit new transaction
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newTx = await createTransaction(form, user.token);
            setTransactions([ ...transactions, newTx ]);
            setForm({ title: "", amount: "", type: "income" });
        } catch (err) {
            alert("Failed to add transaction");
        }
    };

    // Filtered list
    const filteredTxs = transactions.filter((tx) =>
        filter === "all" ? true : tx.type === filter
    );

    return (
        <div style={styles.wrapper}>
            <header style={styles.header}>
                <h2>Welcome, {user.name}</h2>
                <button onClick={logout}>Logout</button>
            </header>

            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    name="title"
                    placeholder="Transaction title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />
                <input
                    name="amount"
                    type="number"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    required
                />
                <select
                    name="type"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <button type="submit">Add</button>
            </form>

            <div style={styles.filters}>
                <label>Filter:</label>
                <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                    <option value="all">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>

            <ul style={styles.list}>
                {filteredTxs.map((tx) => (
                    <li key={tx._id} style={styles[ tx.type ]}>
                        <strong>{tx.title}</strong> — ₹{tx.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    wrapper: {
        maxWidth: "600px",
        margin: "40px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginBottom: "20px",
    },
    filters: {
        marginBottom: "10px",
    },
    list: {
        listStyle: "none",
        padding: 0,
    },
    income: {
        backgroundColor: "#e6ffe6",
        padding: "10px",
        margin: "6px 0",
        borderRadius: "6px",
    },
    expense: {
        backgroundColor: "#ffe6e6",
        padding: "10px",
        margin: "6px 0",
        borderRadius: "6px",
    },
};
