const orderByMapper = {
    oldest: { timestamp: "asc" },
    newest: { timestamp: "desc" },
    completed: { completed: "desc" },
    notCompleted: { completed: "asc" }
}

export default orderByMapper;