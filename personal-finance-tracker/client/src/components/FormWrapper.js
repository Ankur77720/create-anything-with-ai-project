export default function FormWrapper({ title, children, onSubmit }) {
    return (
        <form onSubmit={onSubmit} style={styles.form}>
            <h2 style={styles.title}>{title}</h2>
            {children}
        </form>
    );
}

const styles = {
    form: {
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        maxWidth: "400px",
        margin: "60px auto",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    title: {
        textAlign: "center",
        color: "rgb(224, 83, 31)",
    }
};
