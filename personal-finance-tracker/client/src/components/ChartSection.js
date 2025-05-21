import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [ "#00C49F", "#FF8042", "#FFBB28", "#8884d8", "#d62728", "#6a0dad", "#a83232" ];

export default function ChartSection({ transactions }) {
    const categoryData = {};

    transactions.forEach((tx) => {
        const key = `${tx.type}:${tx.category || "Other"}`;
        categoryData[ key ] = (categoryData[ key ] || 0) + Number(tx.amount);
    });

    const pieData = Object.entries(categoryData).map(([ key, value ]) => ({
        name: key.replace("income:", "Income - ").replace("expense:", "Expense - "),
        value,
    }));

    if (!pieData.length) return <p>No data to display.</p>;

    return (
        <div style={{ height: 320, marginTop: 40 }}>
            <h3>Category-wise Income & Expense</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        label
                        outerRadius={110}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[ index % COLORS.length ]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
